<script lang='ts' setup name="login">
import loginForm from '../components/login/LoginForm.vue';
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
      <loginForm></loginForm>
    </div>
  </div>
</template>
