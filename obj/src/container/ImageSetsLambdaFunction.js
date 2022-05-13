"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.ImageSetsLambdaFunction = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_aws_nodex_1 = require("pip-services3-aws-nodex");
const ImageSetsServiceFactory_1 = require("../build/ImageSetsServiceFactory");
class ImageSetsLambdaFunction extends pip_services3_aws_nodex_1.CommandableLambdaFunction {
    constructor() {
        super("imagesets", "Image library function");
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-imagesets', 'controller', 'default', '*', '*'));
        this._factories.add(new ImageSetsServiceFactory_1.ImageSetsServiceFactory());
    }
}
exports.ImageSetsLambdaFunction = ImageSetsLambdaFunction;
exports.handler = new ImageSetsLambdaFunction().getHandler();
//# sourceMappingURL=ImageSetsLambdaFunction.js.map