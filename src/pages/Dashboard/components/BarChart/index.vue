<template>
  <v-echart :options="options" :height="300"></v-echart>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import VEchart from "@/components/VEchart/index.vue";

export default defineComponent({
  setup() {
    const animationDuration = 3000;
    const options = reactive({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      grid: {
        top: 10,
        left: "2%",
        right: "2%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          axisTick: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: "pageA",
          type: "bar",
          stack: "vistors",
          barWidth: "60%",
          data: [79, 52, 200, 334, 390, 330, 220],
          animationDuration,
        },
        {
          name: "pageB",
          type: "bar",
          stack: "vistors",
          barWidth: "60%",
          data: [80, 52, 200, 334, 390, 330, 220],
          animationDuration,
        },
        {
          name: "pageC",
          type: "bar",
          stack: "vistors",
          barWidth: "60%",
          data: [30, 52, 200, 334, 390, 330, 220],
          animationDuration,
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
