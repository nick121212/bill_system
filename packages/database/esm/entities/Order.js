var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, UpdateDateColumn, CreateDateColumn, } from "typeorm";
import { BaseEntity } from "./Base";
import { ProductCategoryEntity } from "./ProductCategory";
import { ProductUnitEntity } from "./ProductUnit";
let OrderEntity = class OrderEntity extends BaseEntity {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], OrderEntity.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], OrderEntity.prototype, "name", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], OrderEntity.prototype, "label", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], OrderEntity.prototype, "desc", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], OrderEntity.prototype, "price", void 0);
__decorate([
    OneToOne(() => ProductCategoryEntity),
    JoinColumn(),
    __metadata("design:type", ProductCategoryEntity)
], OrderEntity.prototype, "category", void 0);
__decorate([
    OneToOne(() => ProductUnitEntity),
    JoinColumn(),
    __metadata("design:type", ProductUnitEntity)
], OrderEntity.prototype, "unit", void 0);
__decorate([
    CreateDateColumn({ type: "datetime", name: "create_time" }),
    __metadata("design:type", Date)
], OrderEntity.prototype, "createTime", void 0);
__decorate([
    UpdateDateColumn({ type: "datetime", name: "update_time" }),
    __metadata("design:type", Date)
], OrderEntity.prototype, "updateTime", void 0);
OrderEntity = __decorate([
    Entity({
        name: "product",
    })
], OrderEntity);
export { OrderEntity };
//# sourceMappingURL=Order.js.map