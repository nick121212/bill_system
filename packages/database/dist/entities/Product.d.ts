import { BaseEntity } from "./Base";
import { ProductCategoryEntity } from "./ProductCategory";
import { ProductUnitEntity } from "./ProductUnit";
export declare class ProductEntity extends BaseEntity<ProductEntity> {
    id: number;
    name: string;
    label: string;
    desc: string;
    price: number;
    cost: number;
    category: ProductCategoryEntity;
    unit: ProductUnitEntity;
    createTime: Date;
    updateTime: Date;
}
