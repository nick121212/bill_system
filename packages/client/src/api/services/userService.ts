import type { AxiosResponse } from 'axios';
import type { UserEntity } from '@bill/database/esm';

import apiClient from '../apiClient';
import type { UserToken } from '#/entity';

export interface SignInReq {
  username: string;
  password: string;
  agree: boolean;
}

export interface SignUpReq extends SignInReq {
  email: string;
}
export type SignInRes = UserToken & { user: UserEntity };

export enum UserApi {
  SignIn = '/auth/sign-in',
  SignUp = '/auth/signup',
  Logout = '/auth/sign-out',
  Refresh = '/auth/refresh',
  User = '/auth/profile',
}

const signin = (data: SignInReq) =>
  apiClient.post<AxiosResponse<SignInRes>>({ url: UserApi.SignIn, data });
const signup = (data: SignUpReq) =>
  apiClient.post<SignInRes>({ url: UserApi.SignUp, data });
const logout = () => apiClient.post({ url: UserApi.Logout });
const findById = () =>
  apiClient.get<AxiosResponse<UserEntity>>({ url: `${UserApi.User}` });

export default {
  signin,
  signup,
  findById,
  logout,
};
