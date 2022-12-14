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
    path: "/dashboard/guide",
  },
  vTable: {
    pageName: "表格",
    path: "/dashboard/vTable",
  },
  routerNest: {
    pageName: "路由嵌套",
    path: "/dashboard/routerNest",
  },
  vComponent: {
    pageName: "组件",
    path: "/dashboard/vComponent",
  },
};
