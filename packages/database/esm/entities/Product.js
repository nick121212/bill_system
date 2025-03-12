var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, UpdateDateColumn, CreateDateColumn, DeleteDateColumn, ManyToOne, } from "typeorm";
import { BaseEntity } from "./Base";
import { ProductCategoryEntity } from "./ProductCategory";
import { ProductUnitEntity } from "./ProductUnit";
let ProductEntity = class ProductEntity extends BaseEntity {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ProductEntity.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], ProductEntity.prototype, "name", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], ProductEntity.prototype, "label", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], ProductEntity.prototype, "desc", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], ProductEntity.prototype, "price", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], ProductEntity.prototype, "cost", void 0);
__decorate([
    ManyToOne(() => ProductCategoryEntity),
    JoinColumn(),
    __metadata("design:type", ProductCategoryEntity)
], ProductEntity.prototype, "category", void 0);
__decorate([
    ManyToOne(() => ProductUnitEntity),
    JoinColumn(),
    __metadata("design:type", ProductUnitEntity)
], ProductEntity.prototype, "unit", void 0);
__decorate([
    CreateDateColumn({ type: "datetime", name: "create_time" }),
    __metadata("design:type", Date)
], ProductEntity.prototype, "createTime", void 0);
__decorate([
    UpdateDateColumn({ type: "datetime", name: "update_time" }),
    __metadata("design:type", Date)
], ProductEntity.prototype, "updateTime", void 0);
__decorate([
    DeleteDateColumn(),
    __metadata("design:type", Date)
], ProductEntity.prototype, "deletedDate", void 0);
ProductEntity = __decorate([
    Entity({
        name: "product",
    })
], ProductEntity);
export { ProductEntity };
//# sourceMappingURL=Product.js.map