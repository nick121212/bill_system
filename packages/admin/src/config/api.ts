import axios, { type AxiosRequestConfig, type AxiosError, type AxiosResponse } from "axios";
import { configure } from "axios-hooks";
import { toast } from "sonner";
import { ApiStatusCode } from "@bill/database/esm";

import { useAuthStore } from "@/stores/authStore";
import type { ApiResult } from "@/types/apiResult";

// 创建 axios 实例
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: { "Content-Type": "application/json;charset=utf-8" },
});

// 请求拦截
axiosInstance.interceptors.request.use(
  (config) => {
    const userInfo = useAuthStore.getState();

    // 在请求被发送之前做些什么
    config.headers.Authorization =
      `Bearer ${userInfo.auth.accessToken}` || "";
    return config;
  },
  (error) => {
    // 请求错误时做些什么
    return Promise.reject(error);
  }
);

// 响应拦截
axiosInstance.interceptors.response.use(
  (res: AxiosResponse<ApiResult>) => {
    if (!res.data) throw new Error("请求出错，请稍候重试");

    const { code, data, message } = res.data;
    // 业务请求成功
    const hasSuccess = data && code === ApiStatusCode.SUCCESS;
    if (hasSuccess) {
      res.data = data as any;
      res.statusText = code;

      return res;
    }

    // 业务请求错误
    throw new Error(message || "请求出错，请稍候重试");
  },
  (error: AxiosError<ApiResult>) => {
    const { response, message } = error || {};

    const errMsg =
      response?.data?.message || message || "请求出错，请稍候重试";
    toast.error(errMsg, {
      position: "top-center",
    });

    const status = response?.status;
    const userInfo = useAuthStore.getState();

    if (status === 401) {
      userInfo.auth.resetAccessToken();
    }
    
    return Promise.reject(error);
  }
);

configure({ axios: axiosInstance });

class APIClient {
  get<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: "GET" });
  }

  post<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: "POST" });
  }

  put<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: "PUT" });
  }

  delete<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: "DELETE" });
  }

  request<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      axiosInstance
        .request<unknown, AxiosResponse<Result>>(config)
        .then((res: AxiosResponse<Result>) => {
          resolve(res as unknown as Promise<T>);
        })
        .catch((e: Error | AxiosError) => {
          reject(e);
        });
    });
  }
}
export default new APIClient();
