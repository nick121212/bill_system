"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateCategoryProductEntity = void 0;
const typeorm_1 = require("typeorm");
const Base_1 = require("./Base");
const Product_1 = require("./Product");
const TemplateCategory_1 = require("./TemplateCategory");
let TemplateCategoryProductEntity = class TemplateCategoryProductEntity extends Base_1.BaseEntity {
    id;
    templateCategory;
    product;
    createTime;
    updateTime;
};
exports.TemplateCategoryProductEntity = TemplateCategoryProductEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TemplateCategoryProductEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => TemplateCategory_1.TemplateCategoryEntity),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", TemplateCategory_1.TemplateCategoryEntity)
], TemplateCategoryProductEntity.prototype, "templateCategory", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Product_1.ProductEntity),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Product_1.ProductEntity)
], TemplateCategoryProductEntity.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "datetime", name: "create_time" }),
    __metadata("design:type", Date)
], TemplateCategoryProductEntity.prototype, "createTime", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: "datetime", name: "update_time" }),
    __metadata("design:type", Date)
], TemplateCategoryProductEntity.prototype, "updateTime", void 0);
exports.TemplateCategoryProductEntity = TemplateCategoryProductEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: "template_category_product",
    })
], TemplateCategoryProductEntity);
//# sourceMappingURL=TemplateCategoryProduct.js.map