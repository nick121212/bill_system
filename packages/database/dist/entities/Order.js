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
exports.OrderEntity = void 0;
const typeorm_1 = require("typeorm");
const ProductCategory_1 = require("./ProductCategory");
const ProductUnit_1 = require("./ProductUnit");
const Base_1 = require("./Base");
let OrderEntity = class OrderEntity extends Base_1.BaseEntity {
    id;
    name;
    label;
    desc;
    price;
    category;
    unit;
    createTime;
    updateTime;
};
exports.OrderEntity = OrderEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrderEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrderEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrderEntity.prototype, "label", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrderEntity.prototype, "desc", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrderEntity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => ProductCategory_1.ProductCategoryEntity),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", ProductCategory_1.ProductCategoryEntity)
], OrderEntity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => ProductUnit_1.ProductUnitEntity),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", ProductUnit_1.ProductUnitEntity)
], OrderEntity.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "datetime", name: "create_time" }),
    __metadata("design:type", Date)
], OrderEntity.prototype, "createTime", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: "datetime", name: "update_time" }),
    __metadata("design:type", Date)
], OrderEntity.prototype, "updateTime", void 0);
exports.OrderEntity = OrderEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: "product",
    })
], OrderEntity);
//# sourceMappingURL=Order.js.map