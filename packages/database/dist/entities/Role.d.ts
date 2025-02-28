import { BaseEntity } from "./Base";
export declare class RoleEntity extends BaseEntity<RoleEntity> {
    id: number;
    name: string;
    label: string;
    desc: string;
    order: number;
    status: number;
    createTime: Date;
    updateTime: Date;
}
