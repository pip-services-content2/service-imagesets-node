import { IStringIdentifiable } from 'pip-services3-commons-nodex';

import { AttachmentV1 } from './AttachmentV1';

export class ImageSetV1 implements IStringIdentifiable {

    public constructor(id: string, title: string, picIds?: string[]) {
        this.id = id;
        this.title = title;
        this.pics = [];
        this.create_time = new Date();
    }

    /* Identification */
    public id: string;

    /* Automatically set fields */
    public create_time: Date;

    /* Content */
    public title: string;
    public pics?: AttachmentV1[];

    /* Search */
    public tags?: string[];
    public all_tags?: string[];
}
