"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
const entities_1 = require("./entities");
__exportStar(require("./enums/index"), exports);
exports.default = [
    entities_1.UserEntity,
    entities_1.MenuEntity,
    entities_1.RoleEntity,
    entities_1.CustomerEntity,
    entities_1.ProductCategoryEntity,
    entities_1.ProductEntity,
    entities_1.ProductUnitEntity,
    entities_1.TemplateCategoryEntity,
    entities_1.TemplateCategoryProductEntity,
    entities_1.TemplateEntity,
];
//# sourceMappingURL=index.js.map