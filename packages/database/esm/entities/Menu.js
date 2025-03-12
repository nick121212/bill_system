var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, PrimaryGeneratedColumn, TreeChildren, TreeParent, CreateDateColumn, UpdateDateColumn, Tree, } from "typeorm";
import { BaseEntity } from "./Base";
let MenuEntity = class MenuEntity extends BaseEntity {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], MenuEntity.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], MenuEntity.prototype, "label", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], MenuEntity.prototype, "name", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], MenuEntity.prototype, "icon", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], MenuEntity.prototype, "type", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], MenuEntity.prototype, "route", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], MenuEntity.prototype, "order", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], MenuEntity.prototype, "component", void 0);
__decorate([
    TreeChildren(),
    __metadata("design:type", Array)
], MenuEntity.prototype, "children", void 0);
__decorate([
    TreeParent(),
    __metadata("design:type", MenuEntity)
], MenuEntity.prototype, "parent", void 0);
__decorate([
    CreateDateColumn({ type: "datetime", name: "create_time" }),
    __metadata("design:type", Date)
], MenuEntity.prototype, "createTime", void 0);
__decorate([
    UpdateDateColumn({ type: "datetime", name: "update_time" }),
    __metadata("design:type", Date)
], MenuEntity.prototype, "updateTime", void 0);
MenuEntity = __decorate([
    Entity({
        name: "menu",
    }),
    Tree("closure-table")
], MenuEntity);
export { MenuEntity };
//# sourceMappingURL=Menu.js.map