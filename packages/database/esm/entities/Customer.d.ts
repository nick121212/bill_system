import { DeliverType } from "../enums/DeliverType";
import { BaseEntity } from "./Base";
export declare class CustomerEntity extends BaseEntity<CustomerEntity> {
    id: number;
    fullname: string;
    contact: string;
    phone: string;
    email: string;
    address: string;
    deliver: DeliverType;
    level: number;
    discount: number;
    template: number;
    no: string;
    desc: string;
    createTime: Date;
    updateTime: Date;
}
