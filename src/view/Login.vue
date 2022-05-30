<script lang='ts' setup name="login">
import { ref } from "vue";
const username = ref("");
const password = ref("");
const onSubmit = (values: any) => {
  console.log("submit", values);
};
const checked = ref("1");
</script>

<template>
  <div class="m-2">
    <div>
      <van-icon name="cross" />
    </div>
    <div class="">
      <img src="../assets/login/illustrations.svg" alt="" class="h-240px m-auto "/>
    </div>
    <div>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="username"
            name="用户名"
            placeholder="请输入手机号"
            maxlength="11"
            class="px-0 py-2" 
          >
            <template #left-icon>
              <van-icon name="phone" class="mr-3"></van-icon>
            </template>
          </van-field>
          <van-field
            v-model="password"
            type="password"
            name="密码"
            placeholder="密码"
            class="px-0 py-2"
          >
            <template #left-icon>
              <van-icon name="lock" class="mr-3"></van-icon>
            </template>
          </van-field>
        </van-cell-group>
        <van-radio-group v-model="checked" class="mx-1rem my-2">
          <van-radio
            name="1"
            class="text-xs"
            checked-color="#15C8C2"
            icon-size="0.75rem"
          >
            <template #default>
              <div style="color:#ABAABA">
                已阅读并同意
                <span style="color: black">用户协议</span>、
                <span style="color: black">隐私协议</span>和
                <span style="color: black">买家须知</span>
              </div>
            </template>
          </van-radio>
        </van-radio-group>
        <div class="mx-1rem">
          <van-button block type="primary" native-type="submit">
            登录
          </van-button>
        </div>
        <div class="text-xs mx-1rem mt-2 justify-between flex" style="color:#C7C7CE">
          <span class="flex">用户名登录</span>
          <span class="flex">忘记密码</span>
        </div>
      </van-form>
    </div>
  </div>
</template>
