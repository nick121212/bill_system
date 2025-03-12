import apiClient from '../apiClient';
import type { Result } from '#/api';
import type { ProductCategoryEntity } from '@bill/database/esm';

export enum ProductCategoryApi {
  LIST = '/product/categories',
  ADD = '/product/categories',
  UPDATE = '/product/categories/:id',
  DELETE = '/product/categories/:id'
}

/**
 * 获取商品分类
 */
export const getCategory = () =>
  apiClient.get<Result<ProductCategoryEntity[]>>({ url: ProductCategoryApi.LIST });

/**
 * 新增
 */
export const createCategory = (data: ProductCategoryEntity) =>
  apiClient.post({ url: ProductCategoryApi.ADD, data });

/**
 * 更新
 */
export const updateCategory = (id: number, data: ProductCategoryEntity) =>
  apiClient.put({ url: `${ProductCategoryApi.UPDATE}/${id}`, data });

/**
 * 删除
 */
export const deleteCategory = (id: number) =>
  apiClient.delete({ url: `${ProductCategoryApi.DELETE}/${id}` });
