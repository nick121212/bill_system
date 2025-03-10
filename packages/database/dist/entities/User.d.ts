import { BaseEntity } from "./Base";
import { RoleEntity } from "./Role";
export declare class UserEntity extends BaseEntity<UserEntity> {
    id: number;
    fullname: string;
    company: string;
    email: string;
    password: string;
    avatar: string;
    address: string;
    role: RoleEntity;
    roleId: number;
    isActive: boolean;
    createTime: Date;
    updateTime: Date;
}
