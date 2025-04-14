import apiClient from "../apiClient";
import type { Result } from "#/api";

export enum StatisticsApi {
  TOTAL_AMOUNT = "/statistics/totalAmount",
}

/**
 * 获取 客户数量\订单数量\订单总金额
 */
export const getTotalAmount = (params: {
  createTimeStart: string;
  createTimeEnd: string;
}): Promise<Result<any>> =>
  apiClient.get({ url: StatisticsApi.TOTAL_AMOUNT, params: { where: params } });
