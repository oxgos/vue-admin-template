import request from "@/utils/request";
import type { ResponsePattern } from "../types";

export interface UserInfo {
  id: string;
  role: string;
  name: string;
  avatar?: string;
  description: string;
  token?: string;
}

export interface LoginResponse {
  token: string;
  userInfo: UserInfo;
}

export const loginApi = (
  account: string
): Promise<ResponsePattern<LoginResponse>> => {
  return request.post("/login", {
    account,
  });
};

export const logoutApi = (): Promise<ResponsePattern> => {
  return request.post("/logout");
};

export const getUsersApi = (): Promise<ResponsePattern<UserInfo[]>> =>
  request.get("/user/list");

export const addUserApi = (user: UserInfo): Promise<ResponsePattern> =>
  request.post("/user/add", user);

export const editUserApi = (user: UserInfo): Promise<ResponsePattern> =>
  request.post("/user/edit", user);

export const deleteUserApi = (id: string): Promise<ResponsePattern> =>
  request.post("/user/delete", { id });
