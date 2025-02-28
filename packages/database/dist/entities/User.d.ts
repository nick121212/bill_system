import { BaseEntity } from "./Base";
export declare class UserEntity extends BaseEntity<UserEntity> {
    id: number;
    fullname: string;
    email: string;
    password: string;
    avatar: string;
    address: string;
    isActive: boolean;
    createTime: Date;
    updateTime: Date;
}
