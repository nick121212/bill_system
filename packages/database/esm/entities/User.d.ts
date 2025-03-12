import { BaseEntity } from "./Base";
import type { MenuEntity } from "./Menu";
import { RoleEntity } from "./Role";
export declare class UserEntity extends BaseEntity<UserEntity> {
    id: number;
    fullname: string;
    company?: string;
    email: string;
    password: string;
    avatar: string;
    address: string;
    phone: string;
    role: RoleEntity;
    roleId: number;
    isActive: boolean;
    permissions?: MenuEntity[];
    validateDate?: number;
    createTime: Date;
    updateTime: Date;
    deletedDate: Date;
}
