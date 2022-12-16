<template>
  <div class="role-table">
    <a-button class="editable-add-btn" @click="onAdd" style="margin: 8px 0"
      >添加用户</a-button
    >
    <a-table
      bordered
      :data-source="dataSource"
      :columns="columns"
      :loading="loading"
    >
      <template #operation="{ record }">
        <a
          @click="onEdit(record.id)"
          style="display: inline-block; margin-right: 10px"
          >编辑</a
        >
        <a-popconfirm
          v-if="dataSource.length"
          title="Sure to delete?"
          @confirm="onDelete(record.id)"
        >
          <a>删除</a>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
  <role-modal
    :visible="visible"
    :modalTitle="modalTitle"
    :handleCancel="closeModal"
    :editableData="editableData"
    @saveRole="onSave"
  ></role-modal>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { CheckOutlined, EditOutlined } from "@ant-design/icons-vue";
import { cloneDeep } from "lodash-es";
import type { UserInfo } from "@/apis/dao/user";
import { useLoginStore } from "@/store/user";
import { message } from "ant-design-vue";
import RoleModal from "./components/RoleModal/index.vue";

export default defineComponent({
  components: {
    CheckOutlined,
    EditOutlined,
    RoleModal,
  },

  setup() {
    const columns = [
      {
        title: "用户编码",
        dataIndex: "id",
      },
      {
        title: "用户名称",
        dataIndex: "name",
      },
      {
        title: "用户角色",
        dataIndex: "role",
      },
      {
        title: "描述",
        dataIndex: "description",
        width: "30%",
      },
      {
        title: "操作",
        dataIndex: "operation",
        slots: {
          customRender: "operation",
        },
      },
    ];
    const store = useLoginStore();
    const dataSource = ref<UserInfo[]>([]);
    const editableData = ref<UserInfo | null>(null);
    const loading = ref(false);
    const visible = ref(false);
    const modalTitle = ref("添加用户");

    const onAdd = () => {
      modalTitle.value = "添加用户";
      showModal();
    };

    const onEdit = (id: string) => {
      modalTitle.value = "编辑用户";
      showModal();
      editableData.value = cloneDeep(
        dataSource.value.filter((item) => id === item.id)[0]
      );
    };

    // 添加、编辑
    const onSave = async (user: UserInfo) => {
      let editUser = dataSource.value.find((item) => user.id === item.id);
      try {
        loading.value = true;
        // 编辑
        if (editableData.value) {
          await store.editUser(user);
          if (editUser) {
            Object.assign(editUser, user);
          }
        } else {
          // 添加
          await store.addUser(user);
          dataSource.value.push(cloneDeep(user));
        }
        closeModal();
      } catch (e: any) {
        message.error(e.message);
        throw e;
      } finally {
        loading.value = false;
      }
    };

    // 删除
    const onDelete = async (id: string) => {
      try {
        await store.deleteUser(id);
        dataSource.value = dataSource.value.filter((item) => item.id !== id);
      } catch (e: any) {
        message.error(e.message);
      }
    };

    const showModal = () => {
      visible.value = true;
    };

    const closeModal = () => {
      editableData.value = null;
      visible.value = false;
    };

    onMounted(async () => {
      try {
        loading.value = true;
        const { data: users } = await store.getUsers();
        dataSource.value = users;
      } catch (e: any) {
        message.error(e.message);
        throw e;
      } finally {
        loading.value = false;
      }
    });

    return {
      columns,
      dataSource,
      editableData,
      modalTitle,
      visible,
      loading,
      onDelete,
      onAdd,
      onEdit,
      onSave,
      showModal,
      closeModal,
    };
  },
});
</script>
<style lang="less">
.role-table {
  padding: 0 20px;
}
.editable-cell {
  position: relative;
  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 24px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
  }

  .editable-cell-icon {
    margin-top: 4px;
    display: none;
  }

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }

  .editable-add-btn {
    margin-bottom: 8px;
  }
}
.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}
</style>
