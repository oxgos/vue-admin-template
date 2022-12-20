<template>
  <main class="home">
    <div class="container">
      <div class="home-slider">
        <Menus />
      </div>
      <div class="home-content">
        <v-header />
        <RouterView />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import Menus from "./components/Menus/index.vue";
import VHeader from "./components/Header/index.vue";
export default defineComponent({
  components: {
    Menus,
    VHeader,
    RouterView,
  },
});
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  .container {
    display: flex;
    height: 100%;
    .home-slider {
      background: #001529;
      transition: all 0.2s;
    }
    .home-content {
      flex: 1;
      background-color: #f0f2f5;
      overflow-y: auto;
    }
    .ant-layout-header {
      padding: 0 20px;
      background-color: #fff;
    }
  }
}
</style>
