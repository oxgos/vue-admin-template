import { defineStore } from "pinia";
import { getOrdersApi } from "@/apis/dao/dashboard";

// 第一个参数是应用程序中 store 的唯一 id
export const useDashboardStore = defineStore("dashboard", {
  actions: {
    async getOrders() {
      try {
        const orders = await getOrdersApi();
        return orders;
      } catch (e: any) {
        throw e;
      }
    },
  },
});
