import { createRouter, createWebHistory } from "vue-router";
import Login from "@/pages/Login/index.vue";
import Home from "@/pages/Home/index.vue";
import { useLoginStore } from "@/store/user";
import { useMenusStore } from "@/store/menus";
import { RouterKeys } from "@/pages/Home/components/Menus/menuMapping";

const Dashboard = () => import("@/pages/Dashboard/index.vue");
const Guide = () => import("@/pages/Guide/index.vue");
const RoleTable = () => import("@/pages/RoleTable/index.vue");
const VComponents = () => import("@/pages/VComponents/index.vue");
const DragList = () => import("@/pages/VComponents/DragList/index.vue");
const RouterNest = () => import("@/pages/RouterNest/index.vue");
const RouterOneOne = () => import("@/pages/RouterNest/router1-1.vue");
const RouterOneTwoOne = () => import("@/pages/RouterNest/router1-2-1.vue");
const Clipboard = () => import("@/pages/Clipboard/index.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
    },
    {
      path: "/",
      name: RouterKeys.Home_Key,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Home,
      children: [
        {
          path: "dashboard",
          name: RouterKeys.Dashboard_Key,
          component: Dashboard,
        },
        {
          path: "guide",
          name: RouterKeys.Guide_Key,
          component: Guide,
        },
        {
          path: "/role-table",
          name: RouterKeys.RoleTable_Key,
          component: RoleTable,
        },
        {
          path: "v-components",
          name: RouterKeys.VComponents_key,
          component: VComponents,
          children: [
            {
              path: "drag-list",
              name: RouterKeys.DragList_key,
              component: DragList,
            },
          ],
        },
        {
          path: "router-nest",
          name: RouterKeys.RouterNest_Key,
          component: RouterNest,
          children: [
            {
              path: "router-one-one",
              name: RouterKeys.RouterNestOneOne_key,
              component: RouterOneOne,
            },
            {
              path: "router-one-two-one",
              name: RouterKeys.RouterNestOneTwoOne_key,
              component: RouterOneTwoOne,
            },
          ],
        },
        {
          path: "/clipboard",
          name: RouterKeys.Clipboard_key,
          component: Clipboard,
        },
      ],
    },
    {
      path: "/login",
      name: RouterKeys.Login_Key,
      component: Login,
    },
  ],
});

router.beforeEach((to, from) => {
  const userstore = useLoginStore();
  const menusstore = useMenusStore();
  if (
    // 检查用户是否已登录
    !userstore.isLogin() &&
    to.name !== "login"
  ) {
    // 将用户重定向到登录页面
    return { name: "login" };
  } else {
    userstore.getUserInfo();
    menusstore.getMenuSelectKeys();
  }
});

export default router;
