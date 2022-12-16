<template>
  <main class="login-page">
    <div class="login-page-content">
      <a-spin :spinning="spinning">
        <h2 class="login-page-content-title">用户登录</h2>
        <a-form :model="formState">
          <a-form-item>
            <a-input
              v-model:value="formState.account"
              placeholder="请输入用户名"
              :maxlength="64"
            >
              <template #prefix
                ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
              /></template>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              v-model:value="formState.password"
              type="password"
              placeholder="请输入用户密码"
              :maxlength="64"
            >
              <template #prefix
                ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
              /></template>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              @click="onSubmit"
              :style="{ width: '100%' }"
              >登录</a-button
            >
          </a-form-item>
          <a-form-item>
            <div
              class="tips-list"
              v-for="username in ['admin', 'editor', 'guest']"
              :key="username"
            >
              <span>账号: {{ username }}</span>
              <span>密码: 随便填</span>
            </div>
          </a-form-item>
        </a-form>
      </a-spin>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRaw } from "vue";
import { useRouter } from "vue-router";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { RES_OK } from "@/utils/request";
import { useLoginStore } from "@/store/user";

export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useLoginStore();
    const spinning = ref(false);
    const formState = reactive({
      account: "",
      password: "",
    });

    const errorMessage = (msg: string) => {
      message.destroy();
      message.error(msg);
    };

    const onSubmit = async () => {
      try {
        const { account } = toRaw(formState);
        spinning.value = true;
        const resp = await store.login(account);
        if (resp.code === RES_OK) {
          router.push("/dashboard");
        } else {
          if (resp.message) {
            errorMessage(resp.message);
          }
        }
      } catch (e: any) {
        errorMessage(e.message);
        throw e;
      } finally {
        spinning.value = false;
      }
    };

    return {
      spinning,
      formState,
      onSubmit,
    };
  },
  components: {
    UserOutlined,
    LockOutlined,
  },
});
</script>

<style lang="less" scoped>
.login-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #2d3a4b;
  .login-page-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -70%);
    width: 320px;
    padding: 30px 30px 0;
    background-color: #fff;
    box-shadow: 0 0 10px 2px rgb(40 138 204 / 16%);
    border-radius: 3px;
    z-index: 10;
    .login-page-content-title {
      margin-bottom: 30px;
      font-size: 18px;
      line-height: 1.5;
      text-align: center;
    }
    .tips-list {
      line-height: 40px;
      color: rgba(0, 0, 0, 0.65);
      span:last-child {
        margin-left: 10px;
      }
    }
  }
}
</style>
