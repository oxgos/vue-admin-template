import { createRouter, createWebHistory } from "vue-router";
import Login from "@/pages/Login/index.vue";
import Home from "@/pages/Home/index.vue";

const Dashboard = () => import("@/pages/Dashboard/index.vue");
const Guide = () => import("@/pages/Guide/index.vue");
const VTable = () => import("@/pages/VTable/index.vue");
const VComponents = () => import("@/pages/VComponents/index.vue");
const DragList = () => import("@/pages/VComponents/DragList/index.vue");
const RouterNest = () => import("@/pages/RouterNest/index.vue");
const RouterOneOne = () => import("@/pages/RouterNest/router1-1.vue");
const RouterOneTwoOne = () => import("@/pages/RouterNest/router1-2-1.vue");

console.log(RouterOneOne);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
    },
    {
      path: "/",
      name: "home",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Home,
      children: [
        {
          path: "dashboard",
          name: "dashboard",
          component: Dashboard,
        },
        {
          path: "guide",
          name: "guide",
          component: Guide,
        },
        {
          path: "/v-table",
          name: "vTable",
          component: VTable,
        },
        {
          path: "v-components",
          name: "vComponents",
          component: VComponents,
          children: [
            {
              path: "drag-list",
              name: "dragList",
              component: DragList,
            },
          ],
        },
        {
          path: "router-nest",
          name: "routerNest",
          component: RouterNest,
          children: [
            {
              path: "router-one-one",
              name: "routerOneOne",
              component: RouterOneOne,
            },
            {
              path: "router-one-two-one",
              name: "RouterOneTwoOne",
              component: RouterOneTwoOne,
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
  ],
});

export default router;
