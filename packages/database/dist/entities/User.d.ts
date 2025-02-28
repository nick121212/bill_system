export declare class UserEntity {
    id: number;
    fullname: string;
    email: string;
    password: string;
    avatar: string;
    address: string;
    isActive: boolean;
    constructor(partial: Partial<UserEntity>);
}
