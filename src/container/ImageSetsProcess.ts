import { DefaultRpcFactory } from 'pip-services3-rpc-nodex';
import { DefaultSwaggerFactory } from 'pip-services3-swagger-nodex';
import { ProcessContainer } from 'pip-services3-container-nodex';

import { ImageSetsServiceFactory } from '../build/ImageSetsServiceFactory';


export class ImageSetsProcess extends ProcessContainer {

    public constructor() {
        super("imagesets", "Image library microservice");
        this._factories.add(new ImageSetsServiceFactory);
        this._factories.add(new DefaultRpcFactory);
        this._factories.add(new DefaultSwaggerFactory);
    }

}
