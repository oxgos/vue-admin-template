import { createRouter, createWebHistory } from "vue-router";
import Login from "@/pages/Login/index.vue";
import Dashboard from "@/pages/Dashboard/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Dashboard,
      children: [],
    },
  ],
});

export default router;
