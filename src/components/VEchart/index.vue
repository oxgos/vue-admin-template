<template>
  <div class="chart-wrapper">
    <div
      ref="el"
      :style="{ height: `${height === -1 ? '400px' : height + 'px'}` }"
      class="chart"
    ></div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  toRaw,
  watch,
} from "vue";
import * as echarts from "echarts";
import type { EChartsType } from "echarts";
import bus, { RESIZE_CHART } from "@/utils/bus";

export default defineComponent({
  props: {
    options: {
      type: Object,
      default: () => null,
    },
    height: {
      type: Number,
      default: -1,
    },
  },
  setup(props) {
    const el = ref<HTMLDivElement>();
    let chartIns: EChartsType;

    const initChart = () => {
      if (el.value) {
        if (!chartIns) {
          chartIns = echarts.init(el.value);
        }
        if (props.options) {
          chartIns.clear();
          chartIns.setOption(toRaw(props.options));
        }
      }
    };

    const handleResize = () => {
      nextTick(() => {
        const wrapperWidth = document
          .getElementsByClassName("chart-wrapper")[0]
          .getBoundingClientRect().width;
        if (el.value && chartIns) {
          chartIns.resize({
            width: parseInt(wrapperWidth.toString()),
          });
        }
      });
    };

    onMounted(() => {
      initChart();
      window.addEventListener("resize", handleResize);
      bus.on(RESIZE_CHART, handleResize);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", handleResize);
      bus.off(RESIZE_CHART, handleResize);
    });

    watch(props.options, () => {
      if (chartIns) {
        initChart();
      }
    });

    return {
      el,
    };
  },
});
</script>

<style lang="less" scoped>
.chart-wrapper {
  position: relative;
  width: 100%;
  .chart {
    width: 100%;
  }
}
</style>
