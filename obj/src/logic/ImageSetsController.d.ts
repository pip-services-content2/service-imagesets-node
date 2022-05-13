import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';
import { ImageSetV1 } from '../data/version1/ImageSetV1';
import { IImageSetsController } from './IImageSetsController';
export declare class ImageSetsController implements IConfigurable, IReferenceable, ICommandable, IImageSetsController {
    private static _defaultConfig;
    private _dependencyResolver;
    private _persistence;
    private _attachmentsClient;
    private _attachmentsConnector;
    private _commandSet;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getImageSets(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<ImageSetV1>>;
    getImageSetById(correlationId: string, imagesetId: string): Promise<ImageSetV1>;
    createImageSet(correlationId: string, imageset: ImageSetV1): Promise<ImageSetV1>;
    updateImageSet(correlationId: string, imageset: ImageSetV1): Promise<ImageSetV1>;
    deleteImageSetById(correlationId: string, imagesetId: string): Promise<ImageSetV1>;
}
