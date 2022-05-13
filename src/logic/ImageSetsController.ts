import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { DependencyResolver } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';
import { TagsProcessor } from 'pip-services3-commons-nodex';
import { NotFoundException } from 'pip-services3-commons-nodex';
import { IAttachmentsClientV1 } from 'client-attachments-node';

import { ImageSetV1 } from '../data/version1/ImageSetV1';
import { IImageSetsPersistence } from '../persistence/IImageSetsPersistence';
import { IImageSetsController } from './IImageSetsController';
import { ImageSetsCommandSet } from './ImageSetsCommandSet';
import { AttachmentsConnector } from './AttachmentsConnector';

export class ImageSetsController implements IConfigurable, IReferenceable, ICommandable, IImageSetsController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'service-imagesets:persistence:*:*:1.0',
        'dependencies.attachments', 'service-attachments:client:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(ImageSetsController._defaultConfig);
    private _persistence: IImageSetsPersistence;
    private _attachmentsClient: IAttachmentsClientV1;
    private _attachmentsConnector: AttachmentsConnector;
    private _commandSet: ImageSetsCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IImageSetsPersistence>('persistence');

        this._attachmentsClient = this._dependencyResolver.getOneOptional<IAttachmentsClientV1>('attachments');
        this._attachmentsConnector = new AttachmentsConnector(this._attachmentsClient);
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new ImageSetsCommandSet(this);
        return this._commandSet;
    }

    public async getImageSets(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<ImageSetV1>> {
        return await this._persistence.getPageByFilter(correlationId, filter, paging);
    }

    public async getImageSetById(correlationId: string, imagesetId: string): Promise<ImageSetV1> {
        return await this._persistence.getOneById(correlationId, imagesetId);
    }

    public async createImageSet(correlationId: string, imageset: ImageSetV1): Promise<ImageSetV1> {
        let newImageSet: ImageSetV1 = null;

        imageset.create_time = new Date();
        imageset.all_tags = TagsProcessor.extractHashTags('#title');

        newImageSet = await this._persistence.create(correlationId, imageset);
        await this._attachmentsConnector.addAttachments(correlationId, newImageSet);

        return newImageSet;
    }

    public async updateImageSet(correlationId: string, imageset: ImageSetV1): Promise<ImageSetV1> {
        let oldImageSet: ImageSetV1 = null;
        let newImageSet: ImageSetV1 = null;
        
        imageset.all_tags = TagsProcessor.extractHashTags('#title');

        oldImageSet = await this._persistence.getOneById(correlationId, imageset.id);

        if (oldImageSet == null) {
            throw new NotFoundException(
                correlationId,
                'IMAGESET_NOT_FOUND',
                'ImageSet ' + imageset.id + ' was not found'
            ).withDetails('imageset_id', imageset.id);
        }

        newImageSet = await this._persistence.update(correlationId, imageset);

        await this._attachmentsConnector.updateAttachments(correlationId, oldImageSet, newImageSet);

       return newImageSet;
    }

    public async deleteImageSetById(correlationId: string, imagesetId: string): Promise<ImageSetV1> {
        let oldImageSet: ImageSetV1 = null;

        oldImageSet = await this._persistence.deleteById(correlationId, imagesetId);

        await this._attachmentsConnector.removeAttachments(correlationId, oldImageSet);
        
        return oldImageSet;
    }

}
