import { IAttachmentsClientV1 } from 'client-attachments-node';
import { ImageSetV1 } from '../data/version1/ImageSetV1';
export declare class AttachmentsConnector {
    private _attachmentsClient;
    constructor(_attachmentsClient: IAttachmentsClientV1);
    private extractAttachmentIds;
    addAttachments(correlationId: string, imageset: ImageSetV1): Promise<void>;
    updateAttachments(correlationId: string, oldImageSet: ImageSetV1, newImageSet: ImageSetV1): Promise<void>;
    removeAttachments(correlationId: string, imageset: ImageSetV1): Promise<void>;
}
