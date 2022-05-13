import { ReferenceV1 } from 'client-attachments-node';
import { IAttachmentsClientV1 } from 'client-attachments-node';

import { ImageSetV1 } from '../data/version1/ImageSetV1';

export class AttachmentsConnector {

    public constructor(
        private _attachmentsClient: IAttachmentsClientV1
    ) {}

    private extractAttachmentIds(imageset: ImageSetV1): string[] {
        let ids: string[] = [];

        for (let pic of imageset.pics) {
            if (pic.id)
                ids.push(pic.id);
        }

        return ids;
    }

    public async addAttachments(correlationId: string, imageset: ImageSetV1): Promise<void> {
        
        if (this._attachmentsClient == null || imageset == null)
            return;
        

        let ids = this.extractAttachmentIds(imageset);
        let reference = new ReferenceV1(imageset.id, 'imageset');
        await this._attachmentsClient.addAttachments(correlationId, reference, ids);
    }

    public async updateAttachments(correlationId: string, oldImageSet: ImageSetV1, newImageSet: ImageSetV1): Promise<void> {
        
        if (this._attachmentsClient == null || oldImageSet == null || newImageSet == null)
            return;
        

        let oldIds = this.extractAttachmentIds(oldImageSet);
        let newIds = this.extractAttachmentIds(newImageSet);
        let reference = new ReferenceV1(newImageSet.id, 'imageset');
        await this._attachmentsClient.updateAttachments(correlationId, reference, oldIds, newIds);
    }

    public async removeAttachments(correlationId: string, imageset: ImageSetV1): Promise<void> {
        
        if (this._attachmentsClient == null || imageset == null)
            return;
        

        let ids = this.extractAttachmentIds(imageset);
        let reference = new ReferenceV1(imageset.id, 'imageset');
        await this._attachmentsClient.removeAttachments(correlationId, reference, ids);
    }

}