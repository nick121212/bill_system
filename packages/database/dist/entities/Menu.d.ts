import { PermissionType } from "../enums/PermissionType";
import { BaseEntity } from "./Base";
export declare class MenuEntity extends BaseEntity<MenuEntity> {
    id: number;
    label: string;
    name: string;
    icon: string;
    type: PermissionType;
    route: string;
    order: number;
    component?: string;
    children: MenuEntity[];
    parent?: MenuEntity;
    parentId?: number;
    createTime: Date;
    updateTime: Date;
}
