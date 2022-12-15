<template>
  <div class="drag-list">
    <TypingCard title="列表拖拽" :source="cardContent" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TypingCard from "@/components/TypingCard/index.vue";
import draggable from "@/assets/images/draggable.gif";

export default defineComponent({
  setup() {
    const cardContent = `你可以试着拖拽一下左侧导航菜单栏的某一项，它是可以拖拽的哦。
    本Demo是基于<a href="https://github.com/SortableJS/vue.draggable.next" target="_blank">vue.draggable.next</a>。
    <p><img src="${draggable}"/></p>`;

    return {
      cardContent,
    };
  },
  components: {
    TypingCard,
  },
});
</script>
