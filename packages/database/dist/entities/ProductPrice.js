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
exports.ProductPriceEntity = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const Base_1 = require("./Base");
const Customer_1 = require("./Customer");
const Product_1 = require("./Product");
let ProductPriceEntity = class ProductPriceEntity extends Base_1.BaseEntity {
};
exports.ProductPriceEntity = ProductPriceEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProductPriceEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ProductPriceEntity.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.Min)(10),
    (0, class_validator_1.Max)(100),
    (0, typeorm_1.Column)({ default: 100 }),
    __metadata("design:type", Number)
], ProductPriceEntity.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Product_1.ProductEntity),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Product_1.ProductEntity)
], ProductPriceEntity.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Customer_1.CustomerEntity),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Customer_1.CustomerEntity)
], ProductPriceEntity.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "datetime", name: "create_time" }),
    __metadata("design:type", Date)
], ProductPriceEntity.prototype, "createTime", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: "datetime", name: "update_time" }),
    __metadata("design:type", Date)
], ProductPriceEntity.prototype, "updateTime", void 0);
exports.ProductPriceEntity = ProductPriceEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: "product_price",
    })
], ProductPriceEntity);
//# sourceMappingURL=ProductPrice.js.map