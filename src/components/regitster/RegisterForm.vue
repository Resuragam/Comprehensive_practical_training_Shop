<script lang='ts' setup name="registerForm">
import { registerBrand, registerUser } from "@/api/register";
import { Toast } from "vant";
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";

interface RegisterInfo {
  userPhone: string;
  userPassword: string;
  userName: string;
  agreementCheck: boolean;
  ableLogin: boolean;
}

const registerInfo: RegisterInfo = reactive({
  userPhone: "",
  userPassword: "",
  userName: "",
  agreementCheck: false,
  ableLogin: computed(() => {
    if (
      registerInfo.userPhone.length > 10 &&
      registerInfo.userPassword.length > 5 &&
      registerInfo.userName.length > 5 &&
      registerInfo.agreementCheck === true
    )
      return true;
    else return false;
  }),
});
const result = ref("");
const showPicker = ref(false);
const columns = ["用户", "商家"];
const router = useRouter();
const clickSubmit = ref(false);
const onSubmit = () => {
  clickSubmit.value = true;
  if (result.value === "用户") {
    registerUser(
      registerInfo.userName,
      registerInfo.userPhone,
      registerInfo.userPassword
    ).then((res: any) => {
      if (res.code === 20000) {
        console.log("注册成功", res);
        Toast.success({
          message: "注册成功",
          onClose() {
            clickSubmit.value = false;
            router.back();
          },
        });
      } else {
        console.log("注册失败", res);
        Toast.fail({
          message: "注册失败，请重试",
          onClose() {
            clickSubmit.value = false;
          },
        });
      }
    });
  } else {
    registerBrand(
      registerInfo.userName,
      registerInfo.userPhone,
      registerInfo.userPassword
    ).then((res: any) => {
      if (res.code === 20000) {
        console.log("注册成功", res);
        Toast.success({
          message: "注册成功",
          onClose() {
            clickSubmit.value = false;
            router.back();
          },
        });
      } else {
        console.log("注册失败", res);
        Toast.fail({
          message: "注册失败，请重试",
          onClose() {
            clickSubmit.value = false;
          },
        });
      }
    });
  }
};

const onConfirm = (value: any) => {
  result.value = value;
  showPicker.value = false;
};
</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="registerInfo.userName"
        name="userName"
        placeholder="请输入至少六位的用户名"
        maxlength="16"
        class="px-0 py-2"
        :rules="[{ required: true, message: '请填写用户名' }]"
      >
        <template #left-icon>
          <van-icon name="friends" class="mr-3"></van-icon>
        </template>
      </van-field>
      <van-field
        v-model="registerInfo.userPhone"
        name="userPhone"
        placeholder="请输入手机号"
        maxlength="11"
        class="px-0 py-2"
        :rules="[{ required: true, message: '请填写手机号' }]"
      >
        <template #left-icon>
          <van-icon name="phone" class="mr-3"></van-icon>
        </template>
      </van-field>
      <van-field
        v-model="registerInfo.userPassword"
        type="password"
        name="userPassword"
        placeholder="请输入至少六位的密码"
        class="px-0 py-2"
        maxlength="16"
        :rules="[{ required: true, message: '请填写密码' }]"
      >
        <template #left-icon>
          <van-icon name="lock" class="mr-3"></van-icon>
        </template>
      </van-field>
      <van-field
        v-model="result"
        is-link
        readonly
        name="picker"
        placeholder="请选择身份"
        @click="showPicker = true"
        class="px-0 py-2"
      >
        <template #left-icon>
          <van-icon name="manager" class="mr-3"></van-icon>
        </template>
      </van-field>
      <van-popup v-model:show="showPicker" position="bottom">
        <van-picker
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
    </van-cell-group>
    <van-checkbox
      v-model="registerInfo.agreementCheck"
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
        :disabled="!registerInfo.ableLogin || clickSubmit === true"
      >
        <span v-if="!clickSubmit">注册</span>
        <span v-else
          >注册中...&nbsp;&nbsp;
          <van-loading type="spinner" class="inline" size="1rem" />
        </span>
      </van-button>
    </div>
    <div
      class="text-xs mx-1rem mt-2 justify-between flex"
      style="color: #c7c7ce"
    >
      <span class="flex" @click="router.push('/login')">用户登录</span>
    </div>
  </van-form>
</template>
