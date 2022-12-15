<template>
  <a-card :title="title">
    <div :style="{ display: 'none' }" ref="sourceNode" v-html="source"></div>
    <div ref="outputNode"></div>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Typing, { TypingOpts } from "@/utils/typing";

interface TypingCardProps {
  title: string;
  source: TypingOpts["source"];
}

export default defineComponent({
  props: ["title", "source"],
  setup(props: TypingCardProps) {
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
      source: props.source,
      title: props.title,
      sourceNode,
      outputNode,
    };
  },
});
</script>
