<script lang='ts' setup>
import userInfo from "@/components/my/UserInfo.vue";
import tools from "@/components/my/tools.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const router = useRouter();
const store = useStore();
const identity = sessionStorage.getItem("identity");
const toBrand = () => {
  console.warn(identity);
  console.warn(typeof identity);
  router.push("/manager")
};

const toAudit = () => {
  router.push("/audit")
}
</script>

<template>
  <div class="h-screen p-2" style="background-color: #fafafa">
    <userInfo></userInfo>
    <tools></tools>
    <div class="flex justify-between p-2 bg-white" @click="router.push('/pay')">
      <div class="flex text-sm font-semibold">
        <span class="mr-1"
          ><van-icon
            name="cart-circle-o"
            size="1rem"
            color="#000000"
            class="font-semibold"
        /></span>
        <span class="flex items-center text-sm">用户购买管理</span>
      </div>
      <div class="flex text-xs">
        <span class="flex items-center" style="color: #b6b5bf"></span>
        <span class="flex items-center"
          ><van-icon name="arrow" color="#B6B5BF"
        /></span>
      </div>
    </div>
    <div class="flex justify-between p-2 bg-white" @click="toBrand()" v-if="identity==='0'">
      <div class="flex text-sm font-semibold">
        <span class="mr-1"
          ><van-icon
            name="more-o"
            size="1rem"
            color="#000000"
            class="font-semibold"
        /></span>
        <span class="flex items-center text-sm">商家管理</span>
      </div>
      <div class="flex text-xs">
        <span class="flex items-center" style="color: #b6b5bf"></span>
        <span class="flex items-center"
          ><van-icon name="arrow" color="#B6B5BF"
        /></span>
      </div>
    </div>
    <div class="flex justify-between p-2 bg-white" @click="toAudit()" v-if="identity==='0'">
      <div class="flex text-sm font-semibold">
        <span class="mr-1"
          ><van-icon
            name="apps-o"
            size="1rem"
            color="#000000"
            class="font-semibold"
        /></span>
        <span class="flex items-center text-sm">商品审核</span>
      </div>
      <div class="flex text-xs">
        <span class="flex items-center" style="color: #b6b5bf"></span>
        <span class="flex items-center"
          ><van-icon name="arrow" color="#B6B5BF"
        /></span>
      </div>
    </div>
  </div>
</template>
