<script lang='ts' setup name="loginFormByPhone">
import { computed, reactive } from "vue";

interface LoginInfo {
  userName: string;
  userPassword: string;
  agreementCheck: boolean; // 协议
  ableLogin: boolean;
}

const loginInfo: LoginInfo = reactive({
  userName: "",
  userPassword: "",
  agreementCheck: false,
  ableLogin: computed(() => {
    if (loginInfo.userName.length > 5 && loginInfo.userPassword.length > 5)
      return true;
    else return false;
  }),
});

// 父子组件函数
const emit = defineEmits(["handoffLogin"]);

const onHandoffLogin = () => {
  emit("handoffLogin");
};

const onSubmit = () => {};
</script>

<template>
  <van-form>
    <van-cell-group inset>
      <van-field
        v-model="loginInfo.userName"
        name="userName"
        placeholder="请输入用户名"
        maxlength="11"
        class="px-0 py-2"
      >
        <template #left-icon>
          <van-icon name="friends" class="mr-3"/>
        </template>
      </van-field>
      <van-field
        v-model="loginInfo.userPassword"
        type="password"
        name="userPassword"
        placeholder="密码"
        class="px-0 py-2"
        maxlength="16"
      >
        <template #left-icon>
          <van-icon name="lock" class="mr-3"></van-icon>
        </template>
      </van-field>
    </van-cell-group>
    <van-checkbox
      v-model="loginInfo.agreementCheck"
      class="mx-1rem my-2 text-xs"
      checked-color="#15C8C2"
      icon-size="0.75rem"
    >
      <template #default>
        <div style="color: #abaaba">
          已阅读并同意
          <span style="color: black">用户协议</span>、
          <span style="color: black">隐私协议</span>和
          <span style="color: black">买家须知</span>
        </div>
      </template>
    </van-checkbox>
    <div class="mx-1rem">
      <van-button block type="default" @click="onSubmit" color="#2A2A34" :disabled="!loginInfo.ableLogin">
        登录
      </van-button>
    </div>
    <div
      class="text-xs mx-1rem mt-2 justify-between flex"
      style="color: #c7c7ce"
    >
      <span class="flex" @click="onHandoffLogin">手机号登录</span>
      <span class="flex">忘记密码</span>
    </div>
  </van-form>
</template>
