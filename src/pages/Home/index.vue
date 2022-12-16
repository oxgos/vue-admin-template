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
        <a-layout-content>
          <RouterView />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </main>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRaw } from "vue";
import { RouterView } from "vue-router";
import Menus from "./components/Menus/index.vue";
import VHeader from "./components/Header/index.vue";
export default defineComponent({
  components: {
    Menus,
    VHeader,
  },
});
</script>

<style lang="less" scoped>
.dashboard {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  .ant-layout {
    height: 100%;
    .ant-layout-header {
      padding: 0 20px;
      background-color: #fff;
    }
  }
}
</style>
