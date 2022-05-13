import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableHttpService } from 'pip-services3-rpc-nodex';

export class ImageSetsHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/imagesets');
        this._dependencyResolver.put('controller', new Descriptor('service-imagesets', 'controller', 'default', '*', '1.0'));
    }
}