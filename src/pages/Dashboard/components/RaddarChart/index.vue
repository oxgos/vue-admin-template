<template>
  <v-echart :options="options" :height="300"></v-echart>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import VEchart from "@/components/VEchart/index.vue";

export default defineComponent({
  setup() {
    const options = reactive({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      radar: {
        radius: "66%",
        center: ["50%", "42%"],
        splitNumber: 8,
        splitArea: {
          areaStyle: {
            color: "rgba(127,95,132,.3)",
            opacity: 1,
            shadowBlur: 45,
            shadowColor: "rgba(0,0,0,.5)",
            shadowOffsetX: 0,
            shadowOffsetY: 15,
          },
        },
        indicator: [
          { name: "Sales", max: 10000 },
          { name: "Administration", max: 20000 },
          { name: "Information Techology", max: 20000 },
          { name: "Customer Support", max: 20000 },
          { name: "Development", max: 20000 },
          { name: "Marketing", max: 20000 },
        ],
      },
      legend: {
        left: "center",
        bottom: "10",
        data: ["Allocated Budget", "Expected Spending", "Actual Spending"],
      },
      series: [
        {
          type: "radar",
          symbolSize: 0,
          areaStyle: {
            normal: {
              shadowBlur: 13,
              shadowColor: "rgba(0,0,0,.2)",
              shadowOffsetX: 0,
              shadowOffsetY: 10,
              opacity: 1,
            },
          },
          data: [
            {
              value: [5000, 7000, 12000, 11000, 15000, 14000],
              name: "Allocated Budget",
            },
            {
              value: [4000, 9000, 15000, 15000, 13000, 11000],
              name: "Expected Spending",
            },
            {
              value: [5500, 11000, 12000, 15000, 12000, 12000],
              name: "Actual Spending",
            },
          ],
          animationDuration: 3000,
        },
      ],
    });

    return {
      options,
    };
  },
  components: {
    VEchart,
  },
});
</script>
