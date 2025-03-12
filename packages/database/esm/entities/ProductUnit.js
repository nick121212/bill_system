var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, } from "typeorm";
import { BaseEntity } from "./Base";
let ProductUnitEntity = class ProductUnitEntity extends BaseEntity {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ProductUnitEntity.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], ProductUnitEntity.prototype, "name", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], ProductUnitEntity.prototype, "label", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], ProductUnitEntity.prototype, "desc", void 0);
__decorate([
    CreateDateColumn({ type: "datetime", name: "create_time" }),
    __metadata("design:type", Date)
], ProductUnitEntity.prototype, "createTime", void 0);
__decorate([
    UpdateDateColumn({ type: "datetime", name: "update_time" }),
    __metadata("design:type", Date)
], ProductUnitEntity.prototype, "updateTime", void 0);
ProductUnitEntity = __decorate([
    Entity({
        name: "product_unit",
    })
], ProductUnitEntity);
export { ProductUnitEntity };
//# sourceMappingURL=ProductUnit.js.map