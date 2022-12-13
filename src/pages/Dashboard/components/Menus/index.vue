<template>
  <div>
    <div class="menu-header">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" />
      Gavin Guo
    </div>
    <a-menu
      style="width: 200px"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      :theme="theme || 'dark'"
      @click="handleClickMenu"
    >
      <a-menu-item key="首页">
        <template #icon>
          <HomeOutlined />
        </template>
        首页
      </a-menu-item>
      <a-menu-item key="引导页">
        <template #icon>
          <KeyOutlined />
        </template>
        引导页
      </a-menu-item>
      <a-menu-item key="表格">
        <template #icon>
          <TableOutlined />
        </template>
        表格
      </a-menu-item>
      <a-sub-menu key="路由嵌套">
        <template #icon>
          <ClusterOutlined />
        </template>
        <template #title>路由嵌套</template>
        <a-sub-menu key="菜单1" title="菜单1">
          <a-menu-item key="菜单1-1">菜单1-1</a-menu-item>
          <a-sub-menu key="菜单1-2" title="菜单1-2">
            <a-menu-item key="菜单1-2-1">菜单1-2-1</a-menu-item>
          </a-sub-menu>
        </a-sub-menu>
      </a-sub-menu>
      <a-sub-menu key="组件">
        <template #icon>
          <AppstoreOutlined />
        </template>
        <template #title>组件</template>
        <a-menu-item key="拖拽列表">拖拽列表</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, toRaw } from "vue";
import { useMenusStore } from "@/store/menus";
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
  HomeOutlined,
  KeyOutlined,
  ClusterOutlined,
  TableOutlined,
} from "@ant-design/icons-vue";

interface MenusProps {
  theme?: string;
  selectedKeys?: string[];
  openKeys?: string[];
}

export default defineComponent({
  props: ["theme", "selectedKeys", "openKeys"],
  setup(props: MenusProps) {
    const state = reactive({
      selectedKeys: props.selectedKeys || ["首页"],
      openKeys: props.openKeys || [],
    });
    const menusStore = useMenusStore();

    const handleClickMenu = ({ keyPath }: { keyPath: string[] }) => {
      menusStore.changeSelectKeys(toRaw(keyPath));
    };

    return {
      ...toRefs(props),
      ...toRefs(state),
      handleClickMenu,
    };
  },
  components: {
    MailOutlined,
    CalendarOutlined,
    AppstoreOutlined,
    SettingOutlined,
    HomeOutlined,
    KeyOutlined,
    ClusterOutlined,
    TableOutlined,
  },
});
</script>

<style lang="less">
.menu-header {
  padding-left: 24px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 64px;
  color: #fff;
  .logo {
    margin-right: 8px;
    width: 30px;
    height: 30px;
  }
}
</style>
