<template>
  <a-select
    :value="value"
    @select="handleSelectorInput"
    placeholder="请选择角色"
    style="width: 100%"
  >
    <a-select-option
      v-for="roleKey in RoleKeys"
      :value="roleKey"
      :key="roleKey"
      >{{ RoleMapping[roleKey] }}</a-select-option
    >
  </a-select>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";

export enum RoleKeys {
  admin = "admin",
  editor = "editor",
  guest = "guest",
}

export enum RoleMapping {
  admin = "管理员",
  editor = "编辑员",
  guest = "游客",
}

export default defineComponent({
  props: {
    value: {
      type: String,
    },
  },
  emits: ["update:value"],
  setup(props, { emit }) {
    const handleSelectorInput = (value: RoleKeys) => {
      emit("update:value", value);
    };

    return {
      ...toRefs(props),
      RoleKeys,
      RoleMapping,
      handleSelectorInput,
    };
  },
});
</script>
