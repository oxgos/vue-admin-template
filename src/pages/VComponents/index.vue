<template>
  <main class="v-component">
    <RouterView />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouterView } from "vue-router";
export default defineComponent({
  components: {
    RouterView,
  },
});
</script>
