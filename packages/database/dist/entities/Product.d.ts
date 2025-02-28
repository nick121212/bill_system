import { ProductCategoryEntity } from "./ProductCategory";
import { ProductUnitEntity } from "./ProductUnit";
import { BaseEntity } from "./Base";
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
