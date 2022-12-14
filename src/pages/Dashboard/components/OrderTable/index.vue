<template>
  <a-table :columns="columns" :data-source="data.items" :loading="loading">
    <template #tags="{ text: tag }">
      <span>
        <a-tag :color="tag === 'success' ? 'green' : 'red'">
          {{ tag.toUpperCase() }}
        </a-tag>
      </span>
    </template>
  </a-table>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import { message } from "ant-design-vue";
import { useDashboardStore } from "@/store/dashboard";
import { RES_OK } from "@/utils/request";
import type { DataType } from "@/apis/dao/dashboard";

interface DataReactive {
  items: DataType[];
}

const columns = [
  {
    title: "Order_no",
    dataIndex: "order_no",
    key: "order_no",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Tags",
    key: "tag",
    dataIndex: "tag",
    slots: {
      customRender: "tags",
    },
  },
];

export default defineComponent({
  setup() {
    const store = useDashboardStore();
    const data = reactive<DataReactive>({
      items: [],
    });
    const loading = ref(false);

    const fetchData = async () => {
      try {
        loading.value = true;
        const resp = await store.getOrders();
        if (resp.code === RES_OK) {
          data.items = resp.data;
        }
      } catch (e: any) {
        message.error(e.message);
        throw e;
      } finally {
        loading.value = false;
      }
    };

    onMounted(async () => {
      fetchData();
    });

    return {
      columns,
      data,
      loading,
    };
  },
});
</script>
