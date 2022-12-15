<template>
  <div class="chart-wrapper">
    <div
      ref="el"
      :style="{ height: `${height === -1 ? '400px' : height + 'px'}` }"
    ></div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  toRaw,
  watch,
} from "vue";
import * as echarts from "echarts";
import type { EChartsType } from "echarts";

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
    const chartIns = ref<EChartsType>();

    const initChart = () => {
      if (el.value) {
        if (!chartIns.value) {
          chartIns.value = echarts.init(el.value);
        }
        if (props.options) {
          chartIns.value.clear();
          chartIns.value.setOption(toRaw(props.options));
        }
      }
    };

    const handleResize = () => {
      if (el.value && chartIns.value) {
        chartIns.value.resize();
      }
    };

    onMounted(() => {
      initChart();

      window.addEventListener("resize", handleResize);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });

    watch(props.options, () => {
      if (chartIns.value) {
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
}
</style>
