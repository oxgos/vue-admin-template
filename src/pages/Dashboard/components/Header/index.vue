<template>
  <div class="header">
    <div class="header-left">
      <a-breadcrumb>
        <a-breadcrumb-item
          v-for="path in menusStore.menusKeyPath"
          :key="path"
          >{{ path }}</a-breadcrumb-item
        >
      </a-breadcrumb>
    </div>
    <div class="header-right">
      <a-popover placement="bottomRight" trigger="click">
        <template #content>
          <p>注销</p>
        </template>
        <a-avatar size="large">
          <template #icon><UserOutlined /></template>
        </a-avatar>
      </a-popover>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRaw } from "vue";
import { UserOutlined } from "@ant-design/icons-vue";
import { useMenusStore } from "@/store/menus";

export default defineComponent({
  setup() {
    const formState = reactive({
      account: null,
      password: "",
    });

    const menusStore = useMenusStore();

    return {
      formState,
      menusStore,
    };
  },
  components: {
    UserOutlined,
  },
});
</script>

<style lang="less">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  .header-right {
    cursor: pointer;
  }
}
</style>
