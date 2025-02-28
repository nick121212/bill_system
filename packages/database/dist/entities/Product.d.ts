import { ProductCategoryEntity } from "./ProductCategory";
import { ProductUnitEntity } from "./ProductUnit";
export declare class ProductEntity {
    id: number;
    name: string;
    label: string;
    desc: string;
    category: ProductCategoryEntity;
    unit: ProductUnitEntity;
}
