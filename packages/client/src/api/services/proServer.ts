import apiClient from '../apiClient';
import type { ProductCategoryEntity } from '@bill/database/esm';

export enum ProductApi {
  LIST = '/product/',
  ADD = '/product/',
  UPDATE = '/product/:id',
  DELETE = '/product/:id'
}

/**
 * 获取产品
 */
export const getCategory = () => {
  return apiClient.get({ url: ProductApi.LIST });
};

/**
 * 新增产品
 */
export const createCategory = (data: ProductCategoryEntity) => {
  return apiClient.post({ url: ProductApi.ADD, data });
};

/**
 * 更新产品
 */
export const updateCategory = (id: number, data: ProductCategoryEntity) => {
  return apiClient.put({ url: `${ProductApi.UPDATE}/${id}`, data });
};

/**
 * 删除产品
 */
export const deleteCategory = (id: number) => {
  return apiClient.delete({ url: `${ProductApi.DELETE}/${id}` });
};
