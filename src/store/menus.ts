import { defineStore } from "pinia";
import {
  menuMapping,
  PathType,
  RouterKeys,
} from "@/pages/Home/components/Menus/menuMapping";

const MENU_SESSION_KEY = "Menu";

export interface HistoryPathType extends PathType {
  fullPath: PathType[];
}

const Default_Path = menuMapping[RouterKeys.Dashboard_Key];

// 第一个参数是应用程序中 store 的唯一 id
export const useMenusStore = defineStore("menus", {
  state: () => {
    return {
      selectedKeys: [RouterKeys.Dashboard_Key] as RouterKeys[],
      openKeys: [] as RouterKeys[],
      collapsed: false,
      menusKeyPath: [Default_Path] as PathType[],
      historyPath: [
        {
          ...Default_Path,
          fullPath: [Default_Path],
        },
      ] as HistoryPathType[],
    };
  },
  actions: {
    getMenuSelectKeys() {
      try {
        const menuString = window.sessionStorage.getItem(MENU_SESSION_KEY);
        if (menuString) {
          const menusKeyPath = JSON.parse(menuString);
          this.menusKeyPath = menusKeyPath;
          const { selectedKeys, openKeys } =
            getKeysFromMenusKeyPath(menusKeyPath);
          if (this.collapsed) {
            this.openKeys = [];
          } else {
            this.openKeys = openKeys;
          }
          this.selectedKeys = selectedKeys;
        }
      } catch (e: any) {
        console.log(e);
      }
    },
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
      const { openKeys } = getKeysFromMenusKeyPath(this.menusKeyPath);
      if (this.collapsed) {
        this.openKeys = [];
      } else {
        this.openKeys = openKeys;
      }
    },
    resetMenu() {
      this.menusKeyPath = [Default_Path];
      this.selectedKeys = [RouterKeys.Dashboard_Key];
      this.openKeys = [];
      window.sessionStorage.removeItem(MENU_SESSION_KEY);
    },
    changeSelectKeys(keyPath: PathType[]) {
      this.menusKeyPath = keyPath;
      window.sessionStorage.setItem(MENU_SESSION_KEY, JSON.stringify(keyPath));
    },
    pushHistoryPath(keyPath: PathType[]) {
      let isExist = false;
      const currentPath = keyPath[keyPath.length - 1];
      for (let i = 0, len = this.historyPath.length; i < len; i++) {
        if (this.historyPath[i].pageName === currentPath.pageName) {
          isExist = true;
          break;
        }
      }
      if (!isExist) {
        this.historyPath.push({
          ...currentPath,
          fullPath: keyPath,
        });
      }
    },
  },
});

function getKeysFromMenusKeyPath(menusKeyPath: PathType[]) {
  const selectedKeys: RouterKeys[] = [];
  const openKeys: RouterKeys[] = [];

  if (menusKeyPath.length) {
    selectedKeys.push(menusKeyPath[menusKeyPath.length - 1].key);
    if (menusKeyPath.length > 1) {
      openKeys.push(
        ...menusKeyPath
          .slice(0, menusKeyPath.length - 1)
          .map((item) => item.key)
      );
    }
  }

  return {
    selectedKeys,
    openKeys,
  };
}
