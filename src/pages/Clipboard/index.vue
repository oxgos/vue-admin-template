<template>
  <div class="clipboard">
    <div class="copy-wrapper">
      <h3>点击下方的Copy按钮，可将以下文字复制到剪贴板</h3>
      <input id="copy" :value="copyValue" type="text" />
      <a-button
        class="copyBtn"
        type="primary"
        @click="copy"
        data-clipboard-target="#copy"
        >复制文本</a-button
      >
    </div>
    <div class="cut-wrapper">
      <h3>点击下方的Cut按钮，可将以下文字剪切到剪贴板</h3>
      <input id="cut" :value="cutValue" type="text" />
      <a-button
        class="cutBtn"
        type="primary"
        @click="cut"
        data-clipboard-action="cut"
        data-clipboard-target="#cut"
        >剪切文本</a-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, reactive, toRefs } from "vue";
import ClipboardJS from "clipboard";
import { message } from "ant-design-vue";

export default defineComponent({
  setup() {
    const clipboardCopy = new ClipboardJS(".copyBtn");
    var clipboardCut = new ClipboardJS(".cutBtn");
    const state = reactive({
      copyValue:
        "复制我复制我复制我复制我复制我复制我复制我复制我复制我复制我复制我复制我复制我复制我复制我复制我复制我复制我复制我复制我复制我复制我复制我复制我复制我复制我复制我复制我复制我复制我复制我复制我复制我复制我复制我复制我复制我复制我复制我复制我",
      cutValue:
        "剪切我剪切我剪切我剪切我剪切我剪切我剪切我剪切我剪切我剪切我剪切我剪切我剪切我剪切我剪切我剪切我剪切我剪切我",
    });

    const copy = () => {
      message.success("复制成功");
    };
    const cut = () => {
      message.success("剪切成功");
    };

    onBeforeUnmount(() => {
      clipboardCopy.destroy();
      clipboardCut.destroy();
    });

    return {
      ...toRefs(state),
      copy,
      cut,
    };
  },
});
</script>

<style lang="less" scoped>
.clipboard {
  padding: 20px;
  h3 {
    margin-bottom: 10px;
    font-size: 16px;
  }
  .cut-wrapper {
    margin-top: 20px;
  }
  #copy {
    width: 600px;
  }
  #cut {
    width: 600px;
  }
}
</style>
