import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableLambdaFunction } from 'pip-services3-aws-nodex';
import { ImageSetsServiceFactory } from '../build/ImageSetsServiceFactory';

export class ImageSetsLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("imagesets", "Image library function");
        this._dependencyResolver.put('controller', new Descriptor('service-imagesets', 'controller', 'default', '*', '*'));
        this._factories.add(new ImageSetsServiceFactory());
    }
}

export const handler = new ImageSetsLambdaFunction().getHandler();