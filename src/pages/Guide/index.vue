<template>
  <div class="guide">
    <TypingCard title="引导页面" :source="cardContent" />
    <a-button type="primary" @click="guide" style="margin: 24px"
      >打开引导</a-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRaw } from "vue";
import TypingCard from "@/components/TypingCard/index.vue";
import Driver from "driver.js";
import "driver.js/dist/driver.min.css";
import steps from "./step";

export default defineComponent({
  setup() {
    const cardContent = `引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。
                       本Demo是基于<a href="https://github.com/kamranahmedse/driver.js" target="_blank">driver.js</a>`;

    const guide = function () {
      const driver = new Driver({
        animate: true,
        opacity: 0.75,
        doneBtnText: "完成",
        closeBtnText: "关闭",
        nextBtnText: "下一步",
        prevBtnText: "上一步",
      });
      driver.defineSteps(steps);
      driver.start();
    };

    return {
      guide,
      cardContent,
    };
  },
  components: {
    TypingCard,
  },
});
</script>
