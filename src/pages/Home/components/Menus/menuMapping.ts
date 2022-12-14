type MenuMapping = Record<
  string,
  {
    pageName: string;
    path: string;
  }
>;
export const menuMapping: MenuMapping = {
  dashboard: {
    pageName: "首页",
    path: "/dashboard",
  },
  guide: {
    pageName: "引导页",
    path: "/guide",
  },
  vTable: {
    pageName: "表格",
    path: "/v-table",
  },
  routerNest: {
    pageName: "路由嵌套",
    path: "/router-nest",
  },
  routerNestOne: {
    pageName: "菜单1",
    path: "/router-nest",
  },
  routerNestOneOne: {
    pageName: "菜单1-1",
    path: "/router-nest/router-one-one",
  },
  routerNestOneTwo: {
    pageName: "菜单1-2",
    path: "",
  },
  routerNestOneTwoOne: {
    pageName: "菜单1-2-1",
    path: "/router-nest/router-one-two-one",
  },
  vComponents: {
    pageName: "组件",
    path: "/v-components",
  },
  dragList: {
    pageName: "拖拽列表",
    path: "/v-components/drag-list",
  },
};
