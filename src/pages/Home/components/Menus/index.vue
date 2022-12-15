<template>
  <div>
    <div class="menu-header">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" />
      {{ userStore.userInfo?.name }}
    </div>
    <a-menu
      style="width: 200px"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      :theme="theme || 'dark'"
      @click="handleClickMenu"
    >
      <a-menu-item key="dashboard">
        <template #icon>
          <HomeOutlined />
        </template>
        首页
      </a-menu-item>
      <a-menu-item key="guide">
        <template #icon>
          <KeyOutlined />
        </template>
        引导页
      </a-menu-item>
      <a-menu-item key="roleTable">
        <template #icon>
          <TableOutlined />
        </template>
        用户表格
      </a-menu-item>
      <a-sub-menu key="routerNest">
        <template #icon>
          <ClusterOutlined />
        </template>
        <template #title>路由嵌套</template>
        <a-sub-menu key="routerNestOne" title="菜单1">
          <a-menu-item key="routerNestOneOne">菜单1-1</a-menu-item>
          <a-sub-menu key="routerNestOneTwo" title="菜单1-2">
            <a-menu-item key="routerNestOneTwoOne">菜单1-2-1</a-menu-item>
          </a-sub-menu>
        </a-sub-menu>
      </a-sub-menu>
      <a-sub-menu key="vComponents">
        <template #icon>
          <AppstoreOutlined />
        </template>
        <template #title>组件</template>
        <a-menu-item key="dragList">拖拽列表</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
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
import { menuMapping } from "./menuMapping";
import { useLoginStore } from "@/store/user";

interface MenusProps {
  theme?: string;
  selectedKeys?: string[];
  openKeys?: string[];
}

export default defineComponent({
  props: ["theme", "selectedKeys", "openKeys"],
  setup(props: MenusProps) {
    const router = useRouter();
    const userStore = useLoginStore();
    const menusStore = useMenusStore();

    const state = reactive({
      selectedKeys: props.selectedKeys || ["首页"],
      openKeys: props.openKeys || [],
    });

    const handleClickMenu = ({ keyPath }: { keyPath: string[] }) => {
      const paths = [];
      const selectedKeys = [];
      for (const key of keyPath) {
        paths.push(menuMapping[key].path);
        selectedKeys.push(menuMapping[key].pageName);
      }
      menusStore.changeSelectKeys(selectedKeys);
      router.push(paths[paths.length - 1]);
    };

    return {
      userStore,
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

<style lang="less" scoped>
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
