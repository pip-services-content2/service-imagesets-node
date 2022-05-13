"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageSetV1Schema = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const AttachmentV1Schema_1 = require("./AttachmentV1Schema");
class ImageSetV1Schema extends pip_services3_commons_nodex_1.ObjectSchema {
    constructor() {
        super();
        /* Identification */
        this.withOptionalProperty('id', pip_services3_commons_nodex_3.TypeCode.String);
        this.withRequiredProperty('title', pip_services3_commons_nodex_3.TypeCode.String);
        /* Generic request properties */
        this.withOptionalProperty('create_time', pip_services3_commons_nodex_3.TypeCode.DateTime); //TypeCode.DateTime);
        /* Common properties */
        this.withOptionalProperty('title', pip_services3_commons_nodex_3.TypeCode.String);
        this.withOptionalProperty('pics', new pip_services3_commons_nodex_2.ArraySchema(new AttachmentV1Schema_1.AttachmentV1Schema()));
        /* Search */
        this.withOptionalProperty('tags', new pip_services3_commons_nodex_2.ArraySchema(pip_services3_commons_nodex_3.TypeCode.String));
        this.withOptionalProperty('all_tags', new pip_services3_commons_nodex_2.ArraySchema(pip_services3_commons_nodex_3.TypeCode.String));
    }
}
exports.ImageSetV1Schema = ImageSetV1Schema;
//# sourceMappingURL=ImageSetV1Schema.js.map