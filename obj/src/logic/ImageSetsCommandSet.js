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
exports.ImageSetsCommandSet = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_6 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_7 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_8 = require("pip-services3-commons-nodex");
const ImageSetV1Schema_1 = require("../data/version1/ImageSetV1Schema");
class ImageSetsCommandSet extends pip_services3_commons_nodex_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetImageSetsCommand());
        this.addCommand(this.makeGetImageSetByIdCommand());
        this.addCommand(this.makeCreateImageSetCommand());
        this.addCommand(this.makeUpdateImageSetCommand());
        this.addCommand(this.makeDeleteImageSetByIdCommand());
    }
    makeGetImageSetsCommand() {
        return new pip_services3_commons_nodex_2.Command("get_imagesets", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_nodex_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services3_commons_nodex_8.PagingParamsSchema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let filter = pip_services3_commons_nodex_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services3_commons_nodex_4.PagingParams.fromValue(args.get("paging"));
            return yield this._logic.getImageSets(correlationId, filter, paging);
        }));
    }
    makeGetImageSetByIdCommand() {
        return new pip_services3_commons_nodex_2.Command("get_imageset_by_id", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('imageset_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let imagesetId = args.getAsNullableString("imageset_id");
            return yield this._logic.getImageSetById(correlationId, imagesetId);
        }));
    }
    makeCreateImageSetCommand() {
        return new pip_services3_commons_nodex_2.Command("create_imageset", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('imageset', new ImageSetV1Schema_1.ImageSetV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let imageset = args.get("imageset");
            return yield this._logic.createImageSet(correlationId, imageset);
        }));
    }
    makeUpdateImageSetCommand() {
        return new pip_services3_commons_nodex_2.Command("update_imageset", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('imageset', new ImageSetV1Schema_1.ImageSetV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let imageset = args.get("imageset");
            return yield this._logic.updateImageSet(correlationId, imageset);
        }));
    }
    makeDeleteImageSetByIdCommand() {
        return new pip_services3_commons_nodex_2.Command("delete_imageset_by_id", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('imageset_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let imagesetId = args.getAsNullableString("imageset_id");
            return yield this._logic.deleteImageSetById(correlationId, imagesetId);
        }));
    }
}
exports.ImageSetsCommandSet = ImageSetsCommandSet;
//# sourceMappingURL=ImageSetsCommandSet.js.map