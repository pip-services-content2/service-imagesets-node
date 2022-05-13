import { ConfigParams } from 'pip-services3-commons-nodex';
import { JsonFilePersister } from 'pip-services3-data-nodex';
import { ImageSetsMemoryPersistence } from './ImageSetsMemoryPersistence';
import { ImageSetV1 } from '../data/version1/ImageSetV1';
export declare class ImageSetsFilePersistence extends ImageSetsMemoryPersistence {
    protected _persister: JsonFilePersister<ImageSetV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
