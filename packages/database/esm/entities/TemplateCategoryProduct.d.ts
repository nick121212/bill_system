import { BaseEntity } from "./Base";
import { ProductEntity } from "./Product";
import { TemplateCategoryEntity } from "./TemplateCategory";
export declare class TemplateCategoryProductEntity extends BaseEntity<TemplateCategoryProductEntity> {
    id: number;
    templateCategory: TemplateCategoryEntity;
    product: ProductEntity;
    createTime: Date;
    updateTime: Date;
}
