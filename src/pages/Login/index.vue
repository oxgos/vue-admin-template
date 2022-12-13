<template>
  <main class="login-page">
    <div class="login-page-content">
      <h2 class="login-page-content-title">用户登录</h2>
      <a-form :model="formState">
        <a-form-item>
          <a-input v-model:value="formState.account" placeholder="请输入用户名">
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
          >
            <template #prefix
              ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
            /></template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="onSubmit" :style="{ width: '100%' }"
            >登录</a-button
          >
        </a-form-item>
        <a-form-item>
          <div
            class="tips-list"
            v-for="tips in accountTips"
            :key="tips.account"
          >
            <span>账号: {{ tips.account }}</span>
            <span
              >密码: {{ tips.password === "" ? "随便填" : tips.password }}</span
            >
          </div>
        </a-form-item>
      </a-form>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRaw } from "vue";
import { useRouter } from "vue-router";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";

export default defineComponent({
  setup() {
    const router = useRouter();
    const accountTips = ref([
      {
        account: "admin",
        password: "",
      },
      {
        account: "editor",
        password: "123456",
      },
      {
        account: "guest",
        password: "",
      },
    ]);
    const formState = reactive({
      account: "",
      password: "",
    });

    const errorMessage = () => {
      message.destroy();
      message.error("用户名或密码错误");
    };

    const onSubmit = () => {
      const { account, password } = toRaw(formState);
      const matchAccount = accountTips.value.find(
        (item) => item.account === account
      );
      if (
        !matchAccount ||
        (matchAccount.password != "" && matchAccount.password != password)
      ) {
        errorMessage();
        return;
      }
      router.push("/dashboard");
    };

    return {
      formState,
      accountTips,
      onSubmit,
    };
  },
  components: {
    UserOutlined,
    LockOutlined,
  },
});
</script>

<style lang="less">
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
