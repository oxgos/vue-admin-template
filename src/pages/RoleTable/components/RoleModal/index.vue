<template>
  <a-modal
    :visible="visible"
    @update:visibe="handleModalVisble"
    :title="modalTitle"
    okText="确定"
    cancelText="取消"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item ref="id" label="用户ID" name="id">
        <a-input v-model:value="formState.id" disabled />
      </a-form-item>
      <a-form-item ref="name" label="用户名称" name="name">
        <a-input v-model:value="formState.name" :maxLength="64" />
      </a-form-item>
      <a-form-item ref="role" label="角色名称" name="role">
        <RoleSelector v-model:value="formState.role" />
      </a-form-item>
      <a-form-item ref="description" label="描述" name="description">
        <a-textarea v-model:value="formState.description" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRaw, toRefs, watch } from "vue";
import RoleSelector from "../RoleSelector/index.vue";

import { v4 as uuidv4 } from "uuid";
import type { UserInfo } from "@/apis/dao/user";

interface RoleModalProps {
  visible: boolean;
  modalTitle: string;
  editableData?: UserInfo;
  handleCancel: () => void;
}

export default defineComponent({
  props: ["visible", "modalTitle", "editableData", "handleCancel"],
  emits: ["saveRole", "deleteRole", "update:visible"],
  setup(props: RoleModalProps, ctx) {
    const formRef = ref();
    const formState = reactive({
      id: uuidv4(),
      name: "",
      role: "",
      description: "",
    });
    const rules = {
      name: [
        {
          required: true,
          message: "请输入用户名称",
          trigger: "blur",
        },
        {
          min: 1,
          max: 10,
          message: "长度大于1小于10",
          trigger: "blur",
        },
      ],
      role: [
        {
          required: true,
          message: "请输入角色名称",
          trigger: "blur",
        },
      ],
    };

    const handleModalVisble = (flag: boolean) => {
      ctx.emit("update:visible", flag);
    };

    const resetForm = () => {
      formState.id = uuidv4();
      formState.name = "";
      formState.role = "";
      formState.description = "";
    };

    const handleOk = (_: PointerEvent) => {
      formRef.value
        .validate()
        .then(() => {
          ctx.emit("saveRole", toRaw(formState));
        })
        .catch((err: any) => {
          console.log("error", err);
        });
    };

    watch(props, (newProps) => {
      if (newProps.editableData) {
        const { id, name, role, description } = toRaw(newProps.editableData);
        formState.id = id;
        formState.name = name;
        formState.role = role;
        formState.description = description;
      }
      if (!newProps.visible) {
        resetForm();
      }
    });

    return {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 18,
      },
      formRef,
      formState,
      rules,
      ...toRefs(props),
      handleOk,
      handleModalVisble,
    };
  },
  components: {
    RoleSelector,
  },
});
</script>
