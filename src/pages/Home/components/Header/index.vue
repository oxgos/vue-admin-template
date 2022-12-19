<template>
  <div class="header">
    <div class="header-top">
      <div class="header-left">
        <a-breadcrumb>
          <a-breadcrumb-item
            v-for="path in menusStore.menusKeyPath"
            :key="path.pageName"
            >{{ path.pageName }}</a-breadcrumb-item
          >
        </a-breadcrumb>
      </div>
      <div class="header-right">
        <a-popover placement="bottomRight" trigger="click">
          <template #content>
            <p @click="handleLogout" style="cursor: pointer">注销</p>
          </template>
          <a-avatar size="large">
            <template #icon><UserOutlined /></template>
          </a-avatar>
        </a-popover>
      </div>
    </div>
    <div class="header-bottom">
      <history-tag></history-tag>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { UserOutlined } from "@ant-design/icons-vue";
import { useMenusStore } from "@/store/menus";
import { useLoginStore } from "@/store/user";
import { message } from "ant-design-vue";
import { RES_OK } from "@/utils/request";
import { useRouter } from "vue-router";
import HistoryTag from "../HistoryTag/index.vue";

export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useLoginStore();
    const menusStore = useMenusStore();

    const handleLogout = async () => {
      try {
        const resp = await store.logout();
        if (resp.code === RES_OK) {
          router.push("/login");
        }
      } catch (e: any) {
        message.error(e.message);
      }
    };

    return {
      menusStore,
      handleLogout,
    };
  },
  components: {
    UserOutlined,
    HistoryTag,
  },
});
</script>

<style lang="less" scoped>
.header {
  padding: 0 20px;
  width: 100%;
  background-color: #fff;
  overflow: hidden;
  .header-top {
    padding-top: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 44px;
    .header-left {
      .ant-breadcrumb {
        font-size: 16px;
      }
    }
    .header-right {
      cursor: pointer;
    }
  }
  .header-bottom {
    padding: 6px 0;
  }
}
</style>
