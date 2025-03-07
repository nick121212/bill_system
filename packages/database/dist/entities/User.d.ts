import { BaseEntity } from "./Base";
import { RoleEntity } from "./Role";

export declare class UserEntity extends BaseEntity<UserEntity> {
    id: number;
    fullname: string;
    email: string;
    password: string;
    avatar: string;
    address: string;
    role: RoleEntity;
    isActive: boolean;
    createTime: Date;
    updateTime: Date;
}
