import { defineStore } from "pinia";
import {
  addUserApi,
  deleteUserApi,
  editUserApi,
  getUsersApi,
  loginApi,
  logoutApi,
  UserInfo,
} from "@/apis/dao/user";

const USER_SESSION_KEY = "Userinfo";

// 第一个参数是应用程序中 store 的唯一 id
export const useLoginStore = defineStore("login", {
  state: () => {
    return {
      userInfo: null as UserInfo | null,
    };
  },
  actions: {
    isLogin() {
      const user = window.sessionStorage.getItem(USER_SESSION_KEY);
      return !!user;
    },
    getUserInfo() {
      if (!this.userInfo) {
        try {
          const userString = window.sessionStorage.getItem(USER_SESSION_KEY);
          if (userString) {
            this.userInfo = JSON.parse(userString);
          }
        } catch (e: any) {
          console.log(e);
        }
      }
    },
    async login(account: string) {
      try {
        const resp = await loginApi(account);
        const userInfo: UserInfo = {
          ...resp.data.userInfo,
          token: resp.data.token,
        };
        this.userInfo = userInfo;
        window.sessionStorage.setItem(
          USER_SESSION_KEY,
          JSON.stringify(userInfo)
        );
        return resp;
      } catch (e: any) {
        throw e;
      }
    },
    async logout() {
      try {
        const data = await logoutApi();
        this.userInfo = null;
        window.sessionStorage.removeItem(USER_SESSION_KEY);
        return data;
      } catch (e: any) {
        throw e;
      }
    },
    async getUsers() {
      try {
        const users = await getUsersApi();
        return users;
      } catch (e: any) {
        throw e;
      }
    },
    async addUser(user: UserInfo) {
      try {
        const resp = await addUserApi(user);
        return resp;
      } catch (e: any) {
        throw e;
      }
    },
    async editUser(user: UserInfo) {
      try {
        const resp = await editUserApi(user);
        return resp;
      } catch (e: any) {
        throw e;
      }
    },
    async deleteUser(id: string) {
      try {
        const resp = await deleteUserApi(id);
        return resp;
      } catch (e: any) {
        throw e;
      }
    },
  },
});
