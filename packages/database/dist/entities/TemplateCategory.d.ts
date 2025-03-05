import { BaseEntity } from "./Base";
import { ProductCategoryEntity } from "./ProductCategory";
import { TemplateEntity } from "./Template";
export declare class TemplateCategoryEntity extends BaseEntity<TemplateCategoryEntity> {
    id: number;
    template: TemplateEntity;
    category: ProductCategoryEntity;
    createTime: Date;
    updateTime: Date;
}
