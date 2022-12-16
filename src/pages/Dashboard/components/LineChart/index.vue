<template>
  <v-echart :options="options"></v-echart>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, watchEffect } from "vue";
import VEchart from "@/components/VEchart/index.vue";

export default defineComponent({
  props: {
    expectedData: {
      type: Array as PropType<any>,
      default: () => [],
    },
    actualData: {
      type: Array as PropType<any>,
      default: () => [],
    },
  },
  setup(props) {
    const options = reactive<any>({
      backgroundColor: "#fff",
      grid: {
        left: 40,
        right: 40,
        bottom: 10,
        top: 40,
        containLabel: true,
      },
      tooltip: {
        trigger: "axis",
        padding: [5, 10],
      },
      xAxis: {
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        boundaryGap: false,
        axisTick: {
          show: false,
        },
      },
      yAxis: {
        axisTick: {
          show: false,
        },
        splitLine: {
          lineStyle: {
            opacity: 0.5,
          },
        },
      },
      legend: {
        data: ["expected", "actual"],
      },
      series: [
        {
          name: "expected",
          lineStyle: {
            color: "#FF005A",
            width: 2,
          },
          smooth: true,
          type: "line",
          data: [],
          animationDuration: 2800,
          animationEasing: "cubicInOut",
        },
        {
          name: "actual",
          smooth: true,
          type: "line",
          lineStyle: {
            color: "#3888fa",
            width: 2,
          },
          data: [],
          animationDuration: 2800,
          animationEasing: "quadraticOut",
        },
      ],
    });

    const initOptions = () => {
      options.series[0].data = props.expectedData;
      options.series[1].data = props.actualData;
    };

    watchEffect(() => {
      initOptions();
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
