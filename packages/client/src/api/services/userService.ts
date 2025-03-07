import apiClient from "../apiClient";
import type { UserInfo, UserToken } from "#/entity";

export interface SignInReq {
	username: string;
	password: string;
}

export interface SignUpReq extends SignInReq {
	email: string;
}
export type SignInRes = UserToken & { user: UserInfo };

export enum UserApi {
	SignIn = "/auth/sign-in",
	SignUp = "/auth/signup",
	Logout = "/auth/sign-out",
	Refresh = "/auth/refresh",
	User = "/auth/profile",
}

const signin = (data: SignInReq) =>
	apiClient.post<SignInRes>({ url: UserApi.SignIn, data });
const signup = (data: SignUpReq) =>
	apiClient.post<SignInRes>({ url: UserApi.SignUp, data });
const logout = () => apiClient.post({ url: UserApi.Logout });
const findById = (id: string) =>
	apiClient.get<UserInfo[]>({ url: `${UserApi.User}` });

export default {
	signin,
	signup,
	findById,
	logout,
};
