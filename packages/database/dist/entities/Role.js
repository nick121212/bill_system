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
exports.RoleEntity = void 0;
const typeorm_1 = require("typeorm");
const Base_1 = require("./Base");
const Menu_1 = require("./Menu");
let RoleEntity = class RoleEntity extends Base_1.BaseEntity {
};
exports.RoleEntity = RoleEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RoleEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RoleEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RoleEntity.prototype, "label", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RoleEntity.prototype, "desc", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], RoleEntity.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], RoleEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Menu_1.MenuEntity),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], RoleEntity.prototype, "menus", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "datetime", name: "create_time" }),
    __metadata("design:type", Date)
], RoleEntity.prototype, "createTime", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: "datetime", name: "update_time" }),
    __metadata("design:type", Date)
], RoleEntity.prototype, "updateTime", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], RoleEntity.prototype, "deletedDate", void 0);
exports.RoleEntity = RoleEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: "role",
    })
], RoleEntity);
//# sourceMappingURL=Role.js.map