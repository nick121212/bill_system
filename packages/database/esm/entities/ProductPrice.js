var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Max, Min } from "class-validator";
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, UpdateDateColumn, CreateDateColumn, } from "typeorm";
import { BaseEntity } from "./Base";
import { CustomerEntity } from "./Customer";
import { ProductEntity } from "./Product";
let ProductPriceEntity = class ProductPriceEntity extends BaseEntity {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ProductPriceEntity.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], ProductPriceEntity.prototype, "price", void 0);
__decorate([
    Min(10),
    Max(100),
    Column({ default: 100 }),
    __metadata("design:type", Number)
], ProductPriceEntity.prototype, "discount", void 0);
__decorate([
    OneToOne(() => ProductEntity),
    JoinColumn(),
    __metadata("design:type", ProductEntity)
], ProductPriceEntity.prototype, "product", void 0);
__decorate([
    OneToOne(() => CustomerEntity),
    JoinColumn(),
    __metadata("design:type", CustomerEntity)
], ProductPriceEntity.prototype, "customer", void 0);
__decorate([
    CreateDateColumn({ type: "datetime", name: "create_time" }),
    __metadata("design:type", Date)
], ProductPriceEntity.prototype, "createTime", void 0);
__decorate([
    UpdateDateColumn({ type: "datetime", name: "update_time" }),
    __metadata("design:type", Date)
], ProductPriceEntity.prototype, "updateTime", void 0);
ProductPriceEntity = __decorate([
    Entity({
        name: "product_price",
    })
], ProductPriceEntity);
export { ProductPriceEntity };
//# sourceMappingURL=ProductPrice.js.map