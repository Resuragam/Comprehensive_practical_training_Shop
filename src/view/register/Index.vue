<script lang='ts' setup>
import { useRouter } from "vue-router";
import registerForm from "@/components/regitster/RegisterForm.vue";
const router = useRouter();
</script>

<template>
  <div class="m-2">
    <div>
      <van-icon name="cross" @click="router.back()" />
    </div>
    <div class="p-10 text-lg font-sans text-center tracking-wider">注册后继续操作</div>
    <div>
        <register-form></register-form>
    </div>
  </div>
</template>
