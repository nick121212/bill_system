var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, ManyToMany, JoinTable, DeleteDateColumn, } from "typeorm";
import { BaseEntity } from "./Base";
import { MenuEntity } from "./Menu";
let RoleEntity = class RoleEntity extends BaseEntity {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], RoleEntity.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], RoleEntity.prototype, "name", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], RoleEntity.prototype, "label", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], RoleEntity.prototype, "desc", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], RoleEntity.prototype, "order", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], RoleEntity.prototype, "status", void 0);
__decorate([
    ManyToMany(() => MenuEntity),
    JoinTable(),
    __metadata("design:type", Array)
], RoleEntity.prototype, "menus", void 0);
__decorate([
    CreateDateColumn({ type: "datetime", name: "create_time" }),
    __metadata("design:type", Date)
], RoleEntity.prototype, "createTime", void 0);
__decorate([
    UpdateDateColumn({ type: "datetime", name: "update_time" }),
    __metadata("design:type", Date)
], RoleEntity.prototype, "updateTime", void 0);
__decorate([
    DeleteDateColumn(),
    __metadata("design:type", Date)
], RoleEntity.prototype, "deletedDate", void 0);
RoleEntity = __decorate([
    Entity({
        name: "role",
    })
], RoleEntity);
export { RoleEntity };
//# sourceMappingURL=Role.js.map