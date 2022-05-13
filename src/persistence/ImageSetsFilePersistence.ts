import { ConfigParams } from 'pip-services3-commons-nodex';
import { JsonFilePersister } from 'pip-services3-data-nodex';

import { ImageSetsMemoryPersistence } from './ImageSetsMemoryPersistence';
import { ImageSetV1 } from '../data/version1/ImageSetV1';

export class ImageSetsFilePersistence extends ImageSetsMemoryPersistence {
	protected _persister: JsonFilePersister<ImageSetV1>;

    public constructor(path?: string) {
        super();

        this._persister = new JsonFilePersister<ImageSetV1>(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }

    public configure(config: ConfigParams): void {
        super.configure(config);
        this._persister.configure(config);
    }

}