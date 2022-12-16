<template>
  <a-card style="width: 100%">
    <template #cover>
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        height="361"
      />
    </template>
    <a-card-meta :title="store.userInfo?.name">
      <template #avatar>
        <a-avatar
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          :size="64"
        />
      </template>
      <template #description>
        <div>
          Vue
          <a-progress :percent="40" />
        </div>
        <div>
          Typescript
          <a-progress :percent="70" />
        </div>
        <div>
          Css
          <a-progress :percent="70" />
        </div>
        <div>
          React
          <a-progress :percent="100" />
        </div>
      </template>
    </a-card-meta>
  </a-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useLoginStore } from "@/store/user";

export default defineComponent({
  setup() {
    const store = useLoginStore();
    return {
      store,
    };
  },
});
</script>
