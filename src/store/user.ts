import { defineStore } from "pinia";
import request, { RES_OK } from "@/utils/request";

const USER_SESSION_KEY = "Userinfo";

export interface UserInfo {
  id: string;
  role: string;
  name: string;
  avatar: string;
  description: string;
  token?: string;
}

interface LoginResponse {
  code: number;
  message?: string;
  token: string;
  userInfo: UserInfo;
}

// 第一个参数是应用程序中 store 的唯一 id
export const useLoginStore = defineStore("login", {
  state: () => {
    return {
      userInfo: null,
    };
  },
  actions: {
    isLogin() {
      const user = window.sessionStorage.getItem(USER_SESSION_KEY);
      return !!user;
    },
    async login(account: string): Promise<LoginResponse> {
      try {
        const resp = await request.post("/login", {
          account,
        });
        const data: LoginResponse = resp.data;
        const userInfo: UserInfo = {
          ...data.userInfo,
          token: data.token,
        };
        window.sessionStorage.setItem(
          USER_SESSION_KEY,
          JSON.stringify(userInfo)
        );
        return data;
      } catch (e: any) {
        throw e;
      }
    },
    async logout() {
      try {
        const { data } = await request.post("/logout");
        window.sessionStorage.removeItem(USER_SESSION_KEY);
        return data;
      } catch (e: any) {
        throw e;
      }
    },
  },
});
