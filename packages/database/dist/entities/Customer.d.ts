import { DeliverType } from "../enums/DeliverType";
export declare class CustomerEntity {
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
}
