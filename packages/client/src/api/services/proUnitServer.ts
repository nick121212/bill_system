import apiClient from '../apiClient';
import type { Result } from '#/api';
import type { ProductUnitEntity } from '@bill/database/esm';

export enum ProductUnitApi {
  LIST = '/product/units',
  ADD = '/product/units',
  UPDATE = '/product/units/:id',
  DELETE = '/product/units/:id',
}

interface ProductUnitList {
  rows: ProductUnitEntity[];
  count: number;
}

/**
 * 获取商品单位
 */
export const getUnit = (): Promise<Result<ProductUnitList>> =>
  apiClient.get({ url: ProductUnitApi.LIST });

/**
 * 新增
 */
export const createUnit = (data: ProductUnitEntity) =>
  apiClient.post({ url: ProductUnitApi.ADD, data });

/**
 * 更新
 */
export const updateUnit = (id: number, data: ProductUnitEntity) =>
  apiClient.put({ url: `${ProductUnitApi.UPDATE}/${id}`, data });

/**
 * 删除
 */
export const deleteUnit = (id: number) =>
  apiClient.delete({ url: `${ProductUnitApi.DELETE}/${id}` });
