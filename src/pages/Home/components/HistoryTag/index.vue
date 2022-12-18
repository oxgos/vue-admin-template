<template>
  <div class="history-tag">
    <a-tag
      v-for="item in menuStore.historyPath"
      :key="item.key"
      :color="item.key === currentPath ? 'purple' : 'orange'"
      @click="() => handleClick(item)"
      >{{ item.pageName }}</a-tag
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRaw, watch } from "vue";
import { HistoryPathType, useMenusStore } from "@/store/menus";
import { useRoute, useRouter } from "vue-router";
import { menuMapping, RouterKeys } from "../Menus/menuMapping";

export default defineComponent({
  setup() {
    const menuStore = useMenusStore();
    const currentPath = ref<RouterKeys>(RouterKeys.Dashboard_Key);

    const router = useRouter();
    const route = useRoute();

    watch(
      () => route.name,
      (newName) => {
        if (newName) {
          currentPath.value = menuMapping[newName as RouterKeys].key;
        }
      }
    );

    const handleClick = (item: HistoryPathType) => {
      const { fullPath } = item;
      router.push(item.path);
      menuStore.changeSelectKeys(toRaw(fullPath));
    };

    return {
      menuStore,
      currentPath,
      handleClick,
    };
  },
});
</script>

<style lang="less" scoped>
.history-tag {
  .ant-tag {
    cursor: pointer;
  }
}
</style>
