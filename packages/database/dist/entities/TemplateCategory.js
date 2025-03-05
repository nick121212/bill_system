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
exports.TemplateCategoryEntity = void 0;
const typeorm_1 = require("typeorm");
const Base_1 = require("./Base");
const ProductCategory_1 = require("./ProductCategory");
const Template_1 = require("./Template");
let TemplateCategoryEntity = class TemplateCategoryEntity extends Base_1.BaseEntity {
    id;
    template;
    category;
    createTime;
    updateTime;
};
exports.TemplateCategoryEntity = TemplateCategoryEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TemplateCategoryEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Template_1.TemplateEntity),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Template_1.TemplateEntity)
], TemplateCategoryEntity.prototype, "template", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => ProductCategory_1.ProductCategoryEntity),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", ProductCategory_1.ProductCategoryEntity)
], TemplateCategoryEntity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "datetime", name: "create_time" }),
    __metadata("design:type", Date)
], TemplateCategoryEntity.prototype, "createTime", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: "datetime", name: "update_time" }),
    __metadata("design:type", Date)
], TemplateCategoryEntity.prototype, "updateTime", void 0);
exports.TemplateCategoryEntity = TemplateCategoryEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: "template_category",
    })
], TemplateCategoryEntity);
//# sourceMappingURL=TemplateCategory.js.map