var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, ManyToOne, Unique, DeleteDateColumn, } from "typeorm";
import { BaseEntity } from "./Base";
import { RoleEntity } from "./Role";
let UserEntity = class UserEntity extends BaseEntity {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    IsNotEmpty(),
    Column(),
    __metadata("design:type", String)
], UserEntity.prototype, "fullname", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], UserEntity.prototype, "company", void 0);
__decorate([
    IsEmail(),
    Column(),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    IsNotEmpty(),
    Exclude(),
    Column(),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], UserEntity.prototype, "avatar", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], UserEntity.prototype, "address", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], UserEntity.prototype, "phone", void 0);
__decorate([
    ManyToOne(() => RoleEntity),
    __metadata("design:type", RoleEntity)
], UserEntity.prototype, "role", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], UserEntity.prototype, "roleId", void 0);
__decorate([
    Column({ default: true }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "isActive", void 0);
__decorate([
    Column({ default: 30 }),
    __metadata("design:type", Number)
], UserEntity.prototype, "validateDate", void 0);
__decorate([
    CreateDateColumn({ type: "datetime", name: "create_time" }),
    __metadata("design:type", Date)
], UserEntity.prototype, "createTime", void 0);
__decorate([
    UpdateDateColumn({ type: "datetime", name: "update_time" }),
    __metadata("design:type", Date)
], UserEntity.prototype, "updateTime", void 0);
__decorate([
    DeleteDateColumn(),
    __metadata("design:type", Date)
], UserEntity.prototype, "deletedDate", void 0);
UserEntity = __decorate([
    Entity({
        name: "user",
    }),
    Unique(["email", "fullname"])
], UserEntity);
export { UserEntity };
//# sourceMappingURL=User.js.map