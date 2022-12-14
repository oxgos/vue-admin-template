import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
// import request from "@/utils/request";

import "./assets/main.less";
import "./assets/reset.less";

import "./mock";

const pinia = createPinia();

const app = createApp(App);

// (app as any).$http = request;

app.use(router).use(pinia).use(Antd).mount("#app");
