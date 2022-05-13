"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageSetsProcess = void 0;
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const pip_services3_swagger_nodex_1 = require("pip-services3-swagger-nodex");
const pip_services3_container_nodex_1 = require("pip-services3-container-nodex");
const ImageSetsServiceFactory_1 = require("../build/ImageSetsServiceFactory");
class ImageSetsProcess extends pip_services3_container_nodex_1.ProcessContainer {
    constructor() {
        super("imagesets", "Image library microservice");
        this._factories.add(new ImageSetsServiceFactory_1.ImageSetsServiceFactory);
        this._factories.add(new pip_services3_rpc_nodex_1.DefaultRpcFactory);
        this._factories.add(new pip_services3_swagger_nodex_1.DefaultSwaggerFactory);
    }
}
exports.ImageSetsProcess = ImageSetsProcess;
//# sourceMappingURL=ImageSetsProcess.js.map