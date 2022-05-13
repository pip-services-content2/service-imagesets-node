"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageSetsServiceFactory = void 0;
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const ImageSetsMongoDbPersistence_1 = require("../persistence/ImageSetsMongoDbPersistence");
const ImageSetsFilePersistence_1 = require("../persistence/ImageSetsFilePersistence");
const ImageSetsMemoryPersistence_1 = require("../persistence/ImageSetsMemoryPersistence");
const ImageSetsController_1 = require("../logic/ImageSetsController");
const ImageSetsHttpServiceV1_1 = require("../services/version1/ImageSetsHttpServiceV1");
class ImageSetsServiceFactory extends pip_services3_components_nodex_1.Factory {
    constructor() {
        super();
        this.registerAsType(ImageSetsServiceFactory.MemoryPersistenceDescriptor, ImageSetsMemoryPersistence_1.ImageSetsMemoryPersistence);
        this.registerAsType(ImageSetsServiceFactory.FilePersistenceDescriptor, ImageSetsFilePersistence_1.ImageSetsFilePersistence);
        this.registerAsType(ImageSetsServiceFactory.MongoDbPersistenceDescriptor, ImageSetsMongoDbPersistence_1.ImageSetsMongoDbPersistence);
        this.registerAsType(ImageSetsServiceFactory.ControllerDescriptor, ImageSetsController_1.ImageSetsController);
        this.registerAsType(ImageSetsServiceFactory.HttpServiceDescriptor, ImageSetsHttpServiceV1_1.ImageSetsHttpServiceV1);
    }
}
exports.ImageSetsServiceFactory = ImageSetsServiceFactory;
ImageSetsServiceFactory.Descriptor = new pip_services3_commons_nodex_1.Descriptor("service-imagesets", "factory", "default", "default", "1.0");
ImageSetsServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-imagesets", "persistence", "memory", "*", "1.0");
ImageSetsServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-imagesets", "persistence", "file", "*", "1.0");
ImageSetsServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-imagesets", "persistence", "mongodb", "*", "1.0");
ImageSetsServiceFactory.ControllerDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-imagesets", "controller", "default", "*", "1.0");
ImageSetsServiceFactory.HttpServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-imagesets", "service", "http", "*", "1.0");
//# sourceMappingURL=ImageSetsServiceFactory.js.map