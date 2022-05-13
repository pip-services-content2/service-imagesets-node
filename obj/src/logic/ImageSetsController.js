"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageSetsController = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const ImageSetsCommandSet_1 = require("./ImageSetsCommandSet");
const AttachmentsConnector_1 = require("./AttachmentsConnector");
class ImageSetsController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_nodex_2.DependencyResolver(ImageSetsController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
        this._attachmentsClient = this._dependencyResolver.getOneOptional('attachments');
        this._attachmentsConnector = new AttachmentsConnector_1.AttachmentsConnector(this._attachmentsClient);
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new ImageSetsCommandSet_1.ImageSetsCommandSet(this);
        return this._commandSet;
    }
    getImageSets(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.getPageByFilter(correlationId, filter, paging);
        });
    }
    getImageSetById(correlationId, imagesetId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.getOneById(correlationId, imagesetId);
        });
    }
    createImageSet(correlationId, imageset) {
        return __awaiter(this, void 0, void 0, function* () {
            let newImageSet = null;
            imageset.create_time = new Date();
            imageset.all_tags = pip_services3_commons_nodex_3.TagsProcessor.extractHashTags('#title');
            newImageSet = yield this._persistence.create(correlationId, imageset);
            yield this._attachmentsConnector.addAttachments(correlationId, newImageSet);
            return newImageSet;
        });
    }
    updateImageSet(correlationId, imageset) {
        return __awaiter(this, void 0, void 0, function* () {
            let oldImageSet = null;
            let newImageSet = null;
            imageset.all_tags = pip_services3_commons_nodex_3.TagsProcessor.extractHashTags('#title');
            oldImageSet = yield this._persistence.getOneById(correlationId, imageset.id);
            if (oldImageSet == null) {
                throw new pip_services3_commons_nodex_4.NotFoundException(correlationId, 'IMAGESET_NOT_FOUND', 'ImageSet ' + imageset.id + ' was not found').withDetails('imageset_id', imageset.id);
            }
            newImageSet = yield this._persistence.update(correlationId, imageset);
            yield this._attachmentsConnector.updateAttachments(correlationId, oldImageSet, newImageSet);
            return newImageSet;
        });
    }
    deleteImageSetById(correlationId, imagesetId) {
        return __awaiter(this, void 0, void 0, function* () {
            let oldImageSet = null;
            oldImageSet = yield this._persistence.deleteById(correlationId, imagesetId);
            yield this._attachmentsConnector.removeAttachments(correlationId, oldImageSet);
            return oldImageSet;
        });
    }
}
exports.ImageSetsController = ImageSetsController;
ImageSetsController._defaultConfig = pip_services3_commons_nodex_1.ConfigParams.fromTuples('dependencies.persistence', 'service-imagesets:persistence:*:*:1.0', 'dependencies.attachments', 'service-attachments:client:*:*:1.0');
//# sourceMappingURL=ImageSetsController.js.map