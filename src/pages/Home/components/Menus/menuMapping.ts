export interface PathType {
  pageName: string;
  key: RouterKeys;
  path: string;
}

export type MenuMapping = Record<string, PathType>;

export enum RouterKeys {
  Home_Key = "home",
  Login_Key = "login",
  Dashboard_Key = "dashboard",
  Guide_Key = "guide",
  RoleTable_Key = "roleTable",
  RouterNest_Key = "routerNest",
  RouterNestOne_Key = "routerNestOne",
  RouterNestOneOne_key = "routerNestOneOne",
  RouterNestOneTwo_key = "routerNestOneTwo",
  RouterNestOneTwoOne_key = "routerNestOneTwoOne",
  VComponents_key = "vComponents",
  DragList_key = "dragList",
  Clipboard_key = "clipboard",
}

export const menuMapping: MenuMapping = {
  [RouterKeys.Dashboard_Key]: {
    pageName: "首页",
    key: RouterKeys.Dashboard_Key,
    path: "/dashboard",
  },
  [RouterKeys.Guide_Key]: {
    pageName: "引导页",
    key: RouterKeys.Guide_Key,
    path: "/guide",
  },
  [RouterKeys.RoleTable_Key]: {
    pageName: "用户表格",
    key: RouterKeys.RoleTable_Key,
    path: "/role-table",
  },
  [RouterKeys.RouterNest_Key]: {
    pageName: "路由嵌套",
    key: RouterKeys.RouterNest_Key,
    path: "/router-nest",
  },
  [RouterKeys.RouterNestOne_Key]: {
    pageName: "菜单1",
    key: RouterKeys.RouterNestOne_Key,
    path: "/router-nest",
  },
  [RouterKeys.RouterNestOneOne_key]: {
    pageName: "菜单1-1",
    key: RouterKeys.RouterNestOneOne_key,
    path: "/router-nest/router-one-one",
  },
  [RouterKeys.RouterNestOneTwo_key]: {
    pageName: "菜单1-2",
    key: RouterKeys.RouterNestOneTwo_key,
    path: "",
  },
  [RouterKeys.RouterNestOneTwoOne_key]: {
    pageName: "菜单1-2-1",
    key: RouterKeys.RouterNestOneTwoOne_key,
    path: "/router-nest/router-one-two-one",
  },
  [RouterKeys.VComponents_key]: {
    pageName: "组件",
    key: RouterKeys.VComponents_key,
    path: "/v-components",
  },
  [RouterKeys.DragList_key]: {
    pageName: "拖拽列表",
    key: RouterKeys.DragList_key,
    path: "/v-components/drag-list",
  },
  [RouterKeys.Clipboard_key]: {
    pageName: "剪切板",
    key: RouterKeys.Clipboard_key,
    path: "/clipboard",
  },
};

export const menulist = [
  {
    key: RouterKeys.Dashboard_Key,
    title: "首页",
    icon: "HomeOutlined",
  },
  {
    key: RouterKeys.Guide_Key,
    title: "引导页",
    icon: "KeyOutlined",
  },
  {
    key: RouterKeys.RoleTable_Key,
    title: "用户表格",
    icon: "TableOutlined",
  },
  {
    key: RouterKeys.RouterNest_Key,
    title: "路由嵌套",
    icon: "KeyOutlined",
    children: [
      {
        key: RouterKeys.RouterNestOne_Key,
        title: "菜单1",
        children: [
          {
            key: RouterKeys.RouterNestOneOne_key,
            title: "菜单1-1",
          },
          {
            key: RouterKeys.RouterNestOneTwo_key,
            title: "菜单1-2",
            children: [
              {
                key: RouterKeys.RouterNestOneTwoOne_key,
                title: "菜单1-2-1",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: RouterKeys.VComponents_key,
    title: "组件",
    icon: "AppstoreOutlined",
    children: [
      {
        key: RouterKeys.DragList_key,
        title: "拖拽列表",
      },
    ],
  },
  {
    key: RouterKeys.Clipboard_key,
    title: "剪切板",
    icon: "CopyOutlined",
  },
];
