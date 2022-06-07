<script lang='ts' setup name="setting">
import userInfo from "@/components/my/UserInfo.vue";
import { useRouter } from "vue-router";
const router = useRouter()

</script>

<template>
  <div class="h-screen p-2" style="background-color: #fafafa">
    <div class="text-left mb-2 ">
      <van-icon
        name="arrow-left"
        size="1rem"
        @click="router.back()"
      />
    </div>
    <userInfo></userInfo>
  </div>
</template>
