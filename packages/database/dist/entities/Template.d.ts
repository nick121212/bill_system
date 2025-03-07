import { BaseEntity } from "./Base";
import { TemplateCategoryEntity } from "./TemplateCategory";
export declare class TemplateEntity extends BaseEntity<TemplateEntity> {
    id: number;
    name: string;
    desc: string;
    status: number;
    categories: TemplateCategoryEntity[];
    createTime: Date;
    updateTime: Date;
    deletedDate: Date;
}
