import { IStringIdentifiable } from 'pip-services3-commons-nodex';
import { AttachmentV1 } from './AttachmentV1';
export declare class ImageSetV1 implements IStringIdentifiable {
    constructor(id: string, title: string, picIds?: string[]);
    id: string;
    create_time: Date;
    title: string;
    pics?: AttachmentV1[];
    tags?: string[];
    all_tags?: string[];
}
