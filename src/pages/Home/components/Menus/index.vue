<template>
  <div>
    <div class="menu-header">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" />
      {{ userStore.userInfo?.name }}
    </div>
    <draggable
      :list="list"
      item-key="key"
      class="list-group"
      ghost-class="ghost"
      @start="dragging = true"
      @end="dragging = false"
    >
      <template #item="{ element }">
        <a-menu
          style="width: 200px"
          v-model:openKeys="openKeys"
          v-model:selectedKeys="selectedKeys"
          mode="inline"
          :theme="theme || 'dark'"
          @click="handleClickMenu"
        >
          <template v-if="!element.children">
            <a-menu-item :key="element.key">
              <template #icon v-if="element.icon">
                <component :is="element.icon" />
              </template>
              {{ element.title }}
            </a-menu-item>
          </template>
          <template v-else>
            <sub-menu :menu-info="element" :key="element.key" />
          </template>
        </a-menu>
      </template>
    </draggable>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import draggable from "vuedraggable";
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
import { useMenusStore } from "@/store/menus";
import { useLoginStore } from "@/store/user";
import { menuMapping } from "./menuMapping";
import SubMenu from "./SubMenu.vue";

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

    const list = ref([
      {
        key: "dashboard",
        title: "首页",
        icon: "HomeOutlined",
      },
      {
        key: "guide",
        title: "引导页",
        icon: "KeyOutlined",
      },
      {
        key: "roleTable",
        title: "用户表格",
        icon: "TableOutlined",
      },
      {
        key: "routerNest",
        title: "路由嵌套",
        icon: "KeyOutlined",
        children: [
          {
            key: "routerNestOne",
            title: "菜单1",
            children: [
              {
                key: "routerNestOneOne",
                title: "菜单1-1",
              },
              {
                key: "routerNestOneTwo",
                title: "菜单1-2",
                children: [
                  {
                    key: "routerNestOneTwoOne",
                    title: "菜单1-2-1",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        key: "vComponents",
        title: "组件",
        icon: "AppstoreOutlined",
        children: [
          {
            key: "dragList",
            title: "拖拽列表",
          },
        ],
      },
    ]);
    const dragging = ref(false);
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
      dragging,
      list,
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
    SubMenu,
    draggable,
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
