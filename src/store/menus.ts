import { defineStore } from "pinia";

// 第一个参数是应用程序中 store 的唯一 id
export const useMenusStore = defineStore("menus", {
  state: () => {
    return {
      menusKeyPath: ["首页"] as string[],
    };
  },
  actions: {
    changeSelectKeys(keyPath: string[]) {
      this.menusKeyPath = keyPath;
    },
  },
});
