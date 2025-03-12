var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, JoinColumn, ManyToOne, } from "typeorm";
import { BaseEntity } from "./Base";
import { ProductEntity } from "./Product";
import { TemplateCategoryEntity } from "./TemplateCategory";
let TemplateCategoryProductEntity = class TemplateCategoryProductEntity extends BaseEntity {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], TemplateCategoryProductEntity.prototype, "id", void 0);
__decorate([
    ManyToOne(() => TemplateCategoryEntity),
    JoinColumn(),
    __metadata("design:type", TemplateCategoryEntity)
], TemplateCategoryProductEntity.prototype, "templateCategory", void 0);
__decorate([
    ManyToOne(() => ProductEntity),
    JoinColumn(),
    __metadata("design:type", ProductEntity)
], TemplateCategoryProductEntity.prototype, "product", void 0);
__decorate([
    CreateDateColumn({ type: "datetime", name: "create_time" }),
    __metadata("design:type", Date)
], TemplateCategoryProductEntity.prototype, "createTime", void 0);
__decorate([
    UpdateDateColumn({ type: "datetime", name: "update_time" }),
    __metadata("design:type", Date)
], TemplateCategoryProductEntity.prototype, "updateTime", void 0);
TemplateCategoryProductEntity = __decorate([
    Entity({
        name: "template_category_product",
    })
], TemplateCategoryProductEntity);
export { TemplateCategoryProductEntity };
//# sourceMappingURL=TemplateCategoryProduct.js.map