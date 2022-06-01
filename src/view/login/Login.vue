<script lang='ts' setup name="login">
import { ref } from "vue";
import loginFormByPhone from "@/components/login/LoginFormByPhone.vue";
import loginFormByUserName from "@/components/login/loginFormByUserName.vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

const route = useRoute()
const router = useRouter()
let checkedByTool = ref(true);
console.warn(route.path)
const handoffLogin = () => {
  checkedByTool.value = !checkedByTool.value;
};
</script>

<template>
  <div class="m-2">
    <div>
      <van-icon name="cross" @click="router.back()"/>
    </div>
    <div class="">
      <img
        src="@/assets/login/illustrations.svg"
        alt=""
        class="h-240px m-auto"
      />
    </div>
    <div v-show="checkedByTool">
      <loginFormByPhone @handoffLogin="handoffLogin"></loginFormByPhone>
    </div>
    <div v-show="!checkedByTool">
      <loginFormByUserName @handoffLogin="handoffLogin"></loginFormByUserName>
    </div>
  </div>
</template>
