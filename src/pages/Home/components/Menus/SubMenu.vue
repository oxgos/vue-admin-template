<template>
  <a-sub-menu :key="menuInfo.key">
    <template #icon v-if="menuInfo.icon">
      <component :is="menuInfo.icon" />
    </template>
    <template #title>{{ menuInfo.title }}</template>
    <template v-for="item in menuInfo.children" :key="item.key">
      <template v-if="!item.children">
        <a-menu-item :key="item.key">
          <template #icon v-if="item.icon">
            <component :is="item.icon" />
          </template>
          {{ item.title }}
        </a-menu-item>
      </template>
      <template v-else>
        <sub-menu :menu-info="item" :key="item.key" />
      </template>
    </template>
  </a-sub-menu>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
import { AppstoreOutlined, KeyOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  props: {
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    return {
      ...toRefs(props),
    };
  },
  components: {
    KeyOutlined,
    AppstoreOutlined,
  },
});
</script>
