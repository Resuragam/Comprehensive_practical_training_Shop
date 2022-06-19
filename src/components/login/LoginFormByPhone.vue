<script lang='ts' setup name="loginFormByPhone">
import { loginBrandByPhone } from "@/api/brand";
import { loginByPhone } from "@/api/login";
import { useStore } from "vuex";
// import { getToken,setToken} from "@/utils/cookies";
import { Toast } from "vant";
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";

const store = useStore();
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
      loginInfo.agreementCheck === true &&
      result.value !== ""
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

const result = ref("");
const showPicker = ref(false);
const columns = ["用户", "商家"];

let clickSubmit = ref(false);

const onConfirm = (value: any) => {
  result.value = value;
  showPicker.value = false;
};

const onSubmit = () => {
  clickSubmit.value = true;
  if (result.value === "用户") {
    loginByPhone(loginInfo.userPhone, loginInfo.userPassword).then(
      (res: any) => {
        if (res.code === 20000) {
          console.log("登录成功", res);
          Toast.success({
            message: "登录成功",
            onClose() {
              sessionStorage.setItem('token', res.data.token);
              store.commit("SET_IDENTITY", 1);
              store.commit("SET_USER_USERNAME", res.data.user.username);
              store.commit("SET_USER_AVATAR", res.data.user.avatar);
              store.commit("SET_USER_USERID", res.data.user.userId);
              store.commit("SET_USER_PHONE", res.data.user.phone);
              console.warn(store.state.user);
              console.warn(store);
              clickSubmit.value = false;
              router.push("/home");
            },
          });
        } else {
          console.log("登陆失败", res);
          Toast.fail({
            message: "登陆失败，请重试",
            onClose() {
              clickSubmit.value = false;
            },
          });
        }
      }
    );
  } else {
    loginBrandByPhone(loginInfo.userPhone, loginInfo.userPassword).then(
      (res: any) => {
        if (res.code === 20000) {
          console.log("登录成功", res);
          Toast.success({
            message: "登录成功",
            onClose() {
              sessionStorage.setItem('token', res.data.token);
              store.commit("SET_IDENTITY", 0);
              store.commit("SET_USER_USERNAME", res.data.brand.sroteName);
              store.commit("SET_USER_AVATAR", res.data.brand.avatar);
              store.commit("SET_USER_USERID", res.data.brand.brandId);
              store.commit("SET_USER_PHONE", res.data.brand.phone);
              console.warn(store);
              clickSubmit.value = false;
              router.push("/home");
            },
          });
        } else {
          console.log("登陆失败", res);
          Toast.fail({
            message: "登陆失败，请重试",
            onClose() {
              clickSubmit.value = false;
            },
          });
        }
      }
    );
  }
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
        placeholder="请输入密码"
        class="px-0 py-2"
        maxlength="16"
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
      <span class="flex" @click="router.push('/register')">注册账号</span>
    </div>
  </van-form>
</template>
