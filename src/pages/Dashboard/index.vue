<script lang="ts">
import { defineComponent, reactive, ref, toRaw } from "vue";
import Menus from "./components/Menus/index.vue";
import VHeader from "./components/Header/index.vue";
export default defineComponent({
  setup() {
    const accountTips = ref([
      {
        account: "admin",
        password: "",
      },
      {
        account: "editor",
        password: "123456",
      },
      {
        account: "guest",
        password: "",
      },
    ]);
    const formState = reactive({
      account: "",
      password: "",
    });

    return {
      formState,
    };
  },
  components: {
    Menus,
    VHeader,
  },
});
</script>

<template>
  <main class="dashboard">
    <a-layout>
      <a-layout-sider>
        <Menus />
      </a-layout-sider>
      <a-layout>
        <a-layout-header>
          <v-header />
        </a-layout-header>
        <a-layout-content>Content</a-layout-content>
      </a-layout>
    </a-layout>
  </main>
</template>

<style lang="less">
.dashboard {
  width: 100%;
  height: 100%;
  .ant-layout {
    height: 100%;
    .ant-layout-header {
      padding: 0 20px;
      background-color: #fff;
    }
  }
}
</style>
