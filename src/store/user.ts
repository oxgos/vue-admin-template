import { defineStore } from "pinia";

// 第一个参数是应用程序中 store 的唯一 id
export const useLoginStore = defineStore("login", {
  state: () => {
    return {
      isLogin: false,
    };
  },
  actions: {
    login() {
      this.isLogin = true;
    },
    logout() {
      this.isLogin = false;
    },
  },
});
