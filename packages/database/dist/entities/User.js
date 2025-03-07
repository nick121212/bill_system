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
exports.UserEntity = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const Base_1 = require("./Base");
const Role_1 = require("./Role");
let UserEntity = class UserEntity extends Base_1.BaseEntity {
    id;
    fullname;
    email;
    password;
    avatar;
    address;
    role;
    isActive;
    createTime;
    updateTime;
};
exports.UserEntity = UserEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "fullname", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Role_1.RoleEntity),
    __metadata("design:type", Role_1.RoleEntity)
], UserEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "datetime", name: "create_time" }),
    __metadata("design:type", Date)
], UserEntity.prototype, "createTime", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: "datetime", name: "update_time" }),
    __metadata("design:type", Date)
], UserEntity.prototype, "updateTime", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: "user",
    }),
    (0, typeorm_1.Unique)(["email", "fullname"])
], UserEntity);
//# sourceMappingURL=User.js.map