import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

import "./assets/main.less";
import "./assets/reset.less";

const pinia = createPinia();

const app = createApp(App);

app.use(router).use(pinia).use(Antd).mount("#app");
