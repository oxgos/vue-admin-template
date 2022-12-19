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
      <template
        v-for="col in ['id', 'name', 'role', 'description']"
        #[col]="{ text, record }"
        :key="col"
      >
        <div>
          <a-input
            v-if="editableData[record.id]"
            v-model:value="editableData[record.id][col]"
            style="margin: -5px 0"
            :disabled="col === 'id'"
          />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template #operation="{ record }">
        <template v-if="editableData[record.id]">
          <a
            @click="onSave(record)"
            style="display: inline-block; margin-right: 10px"
            >保存</a
          >
          <a
            @click="onCancel(record.id)"
            style="display: inline-block; margin-right: 10px"
            >取消</a
          >
        </template>
        <template v-else>
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
      </template>
    </a-table>
  </div>
  <role-modal
    :visible="visible"
    :modalTitle="'添加用户'"
    :handleCancel="closeModal"
    @saveRole="onSave"
  ></role-modal>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRaw } from "vue";
import { CheckOutlined, EditOutlined } from "@ant-design/icons-vue";
import { cloneDeep } from "lodash-es";
import type { UserInfo } from "@/apis/dao/user";
import { useLoginStore } from "@/store/user";
import { message } from "ant-design-vue";
import RoleModal from "./components/RoleModal/index.vue";

type EditableDataType = Record<string, UserInfo>;

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
        slots: {
          customRender: "id",
        },
      },
      {
        title: "用户名称",
        dataIndex: "name",
        slots: {
          customRender: "name",
        },
      },
      {
        title: "用户角色",
        dataIndex: "role",
        slots: {
          customRender: "role",
        },
      },
      {
        title: "描述",
        dataIndex: "description",
        width: "30%",
        slots: {
          customRender: "description",
        },
      },
      {
        title: "操作",
        dataIndex: "operation",
        slots: {
          customRender: "operation",
        },
        width: "10%",
      },
    ];
    const store = useLoginStore();
    const dataSource = ref<UserInfo[]>([]);
    const editableData = reactive<EditableDataType>({});
    const loading = ref(false);
    const visible = ref(false);

    const onAdd = () => {
      showModal();
    };

    // 编辑模式
    const onEdit = (id: string) => {
      editableData[id] = cloneDeep(
        dataSource.value.filter((item) => id === item.id)[0]
      );
    };

    // 添加、编辑
    const onSave = async (user: UserInfo) => {
      let editUser = dataSource.value.find((item) => user.id === item.id);
      try {
        loading.value = true;
        // 编辑
        if (editableData[user.id]) {
          const newUser = toRaw(editableData[user.id]);
          await store.editUser(newUser);
          if (editUser) {
            Object.assign(editUser, newUser);
            delete editableData[user.id];
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

    // 取消
    const onCancel = (id: string) => {
      delete editableData[id];
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
      visible,
      loading,
      onDelete,
      onCancel,
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
