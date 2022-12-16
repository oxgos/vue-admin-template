import { defineStore } from "pinia";

const MENU_SESSION_KEY = "Menu";

// 第一个参数是应用程序中 store 的唯一 id
export const useMenusStore = defineStore("menus", {
  state: () => {
    return {
      menusKeyPath: ["首页"] as string[],
    };
  },
  actions: {
    getMenuSelectKeys() {
      try {
        const menuString = window.sessionStorage.getItem(MENU_SESSION_KEY);
        if (menuString) {
          this.menusKeyPath = JSON.parse(menuString);
        }
      } catch (e: any) {
        console.log(e);
      }
    },
    resetMenu() {
      this.menusKeyPath = ["首页"];
      window.sessionStorage.removeItem(MENU_SESSION_KEY);
    },
    changeSelectKeys(keyPath: string[]) {
      this.menusKeyPath = keyPath;
      window.sessionStorage.setItem(MENU_SESSION_KEY, JSON.stringify(keyPath));
    },
  },
});
