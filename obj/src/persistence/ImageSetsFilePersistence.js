"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageSetsFilePersistence = void 0;
const pip_services3_data_nodex_1 = require("pip-services3-data-nodex");
const ImageSetsMemoryPersistence_1 = require("./ImageSetsMemoryPersistence");
class ImageSetsFilePersistence extends ImageSetsMemoryPersistence_1.ImageSetsMemoryPersistence {
    constructor(path) {
        super();
        this._persister = new pip_services3_data_nodex_1.JsonFilePersister(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }
    configure(config) {
        super.configure(config);
        this._persister.configure(config);
    }
}
exports.ImageSetsFilePersistence = ImageSetsFilePersistence;
//# sourceMappingURL=ImageSetsFilePersistence.js.map