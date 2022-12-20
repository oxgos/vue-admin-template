<template>
  <a-card :title="title">
    <div :style="{ display: 'none' }" ref="sourceNode" v-html="source"></div>
    <div ref="outputNode"></div>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, toRefs } from "vue";
import Typing, { TypingOpts } from "@/utils/typing";

interface TypingCardProps {
  title: string;
  source: TypingOpts["source"];
}

export default defineComponent({
  props: {
    title: {
      type: String as PropType<TypingCardProps["title"]>,
      default: "",
    },
    source: {
      type: String as PropType<string>,
      default: null,
    },
  },
  setup(props) {
    const sourceNode = ref<Node>();
    const outputNode = ref<Node>();

    onMounted(() => {
      const typing = new Typing({
        source: sourceNode.value,
        output: outputNode.value,
        delay: 30,
      });
      typing.start();
    });
    return {
      ...toRefs(props),
      sourceNode,
      outputNode,
    };
  },
});
</script>
