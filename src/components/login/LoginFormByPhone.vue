<script lang='ts' setup name="loginFormByPhone">
import { loginByPhone } from "@/api/login";
import { setToken } from "@/utils/cookies";
import { Toast } from "vant";
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";

interface LoginInfo {
  userPhone: string;
  userPassword: string;
  agreementCheck: boolean; // 协议
  ableLogin: boolean;
}

const loginInfo: LoginInfo = reactive({
  userPhone: "",
  userPassword: "",
  agreementCheck: false,
  ableLogin: computed(() => {
    if (
      loginInfo.userPhone.length > 10 &&
      loginInfo.userPassword.length > 5 &&
      loginInfo.agreementCheck === true
    )
      return true;
    else return false;
  }),
});

const router = useRouter();
// 父子组件函数
const emit = defineEmits(["handoffLogin"]);

const onHandoffLogin = () => {
  emit("handoffLogin");
};

let clickSubmit = ref(false);
const onSubmit = () => {
  clickSubmit.value = true;
  loginByPhone(loginInfo.userPhone, loginInfo.userPassword).then((res: any) => {
    if (res.data.code === 20000) {
      console.log("登录成功", res);
      Toast.success({
        message: "登录成功",
        onClose() {
          setToken(res.data.userId);
          clickSubmit.value = false;
          router.back();
        },
      });
    } else {
      console.log("登陆失败", res);
      Toast.fail({
        message: "登陆失败，请重试",
        onClose() {
          setToken(res.data.userId);
          clickSubmit.value = false;
        },
      });
    }
  });
};
</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="loginInfo.userPhone"
        name="userPhone"
        placeholder="请输入手机号"
        maxlength="11"
        class="px-0 py-2"
      >
        <template #left-icon>
          <van-icon name="phone" class="mr-3"></van-icon>
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
      <van-button
        block
        type="default"
        @click="onSubmit"
        color="#2A2A34"
        :disabled="!loginInfo.ableLogin || clickSubmit === true"
      >
        <span v-if="!clickSubmit">登录</span>
        <span v-else
          >登录中...&nbsp;&nbsp;<van-loading
            type="spinner"
            class="inline"
            size="1rem"
        /></span>
      </van-button>
    </div>
    <div
      class="text-xs mx-1rem mt-2 justify-between flex"
      style="color: #c7c7ce"
    >
      <span class="flex" @click="onHandoffLogin">用户名登录</span>
      <span class="flex">忘记密码</span>
    </div>
  </van-form>
</template>
