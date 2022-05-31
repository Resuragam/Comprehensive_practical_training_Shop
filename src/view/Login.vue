<script lang='ts' setup name="login">
import { ref } from "vue";
import loginFormByPhone from "../components/login/LoginFormByPhone.vue";
import loginFormByUserName from "../components/login/loginFormByUserName.vue";

let checkedByTool = ref(true);

const handoffLogin = () => {
  checkedByTool.value = !checkedByTool.value;
};
</script>

<template>
  <div class="m-2">
    <div>
      <van-icon name="cross" />
    </div>
    <div class="">
      <img
        src="../assets/login/illustrations.svg"
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
