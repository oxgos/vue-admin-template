<template>
  <div class="card-panel">
    <div class="card-panel-icon-wrapper" @click="() => handleClick(title)">
      <component :is="icon" :style="{ fontSize: '55px', color: color }" />
    </div>
    <div class="card-panel-description">
      <p class="card-panel-text">{{ title }}</p>
      <div class="card-panel-num" v-number="num"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from "vue";
import {
  UserOutlined,
  CommentOutlined,
  DollarCircleOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons-vue";
import { vNumber } from "@/directives/vNumber/index";

interface VCardProps {
  title: string;
  icon: string;
  num: number;
  color: string;
}

export default defineComponent({
  props: {
    title: {
      type: String as PropType<VCardProps["title"]>,
      default: "",
    },
    icon: {
      type: String as PropType<VCardProps["title"]>,
      default: "UserOutlined",
    },
    num: {
      type: Number as PropType<VCardProps["num"]>,
      default: 0,
    },
    color: {
      type: String as PropType<VCardProps["color"]>,
      default: "#40c9c6",
    },
  },
  emits: ["changeChartDataType"],
  setup(props, { emit }) {
    const handleClick = (title: string) => {
      emit("changeChartDataType", title);
    };

    return {
      ...toRefs(props),
      handleClick,
    };
  },
  components: {
    UserOutlined,
    CommentOutlined,
    DollarCircleOutlined,
    ShoppingCartOutlined,
  },
  directives: {
    number: vNumber,
  },
});
</script>

<style lang="less" scoped>
.card-panel {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 108px;
  cursor: pointer;
  font-size: 12px;
  position: relative;
  overflow: hidden;
  color: #666;
  background: #fff;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.05);
  &:hover {
    .card-panel-icon-wrapper {
      background: #ccc;
    }
  }
  .card-panel-icon-wrapper {
    padding: 16px;
    transition: all 0.38s ease-out;
    border-radius: 6px;
  }
  .card-panel-description {
    font-weight: bold;
    .card-panel-text {
      line-height: 18px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 22px;
      margin-bottom: 12px;
    }
    .card-panel-num {
      font-size: 20px;
    }
  }
}
</style>
