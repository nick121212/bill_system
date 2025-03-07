import { BaseEntity } from "./Base";
import { MenuEntity } from "./Menu";
export declare class RoleEntity extends BaseEntity<RoleEntity> {
    id: number;
    name: string;
    label: string;
    desc: string;
    order: number;
    status: number;
    menus: MenuEntity[];
    createTime: Date;
    updateTime: Date;
}
