import { BaseEntity } from "./Base";
export declare class TemplateEntity extends BaseEntity<TemplateEntity> {
    id: number;
    name: string;
    desc: string;
    status: number;
    createTime: Date;
    updateTime: Date;
    deletedDate: Date;
}
