<script lang='ts' setup>
import { getToken } from "@/utils/cookies";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter()
const active = ref(route.path.split("/")[1]);

const myClick = ()=>{
  const token = sessionStorage.getItem('token')
  console.warn(token)
  if(token === null){
    router.push('/login')
  }else{
    router.push('/my')
  }
}
console.log('tarbar加载')
</script>

<template>
  <van-tabbar v-model="active" active-color="#000000" route>
    <van-tabbar-item icon="shop" replace to="/home" name="home"
      >首页</van-tabbar-item
    >
    <van-tabbar-item icon="shopping-cart" replace to="/shopcart" name="shopcart"
      >购物车</van-tabbar-item
    >
    <van-tabbar-item icon="manager" @click="myClick" name="my" replace to="/my"
      >我的</van-tabbar-item
    >
  </van-tabbar>
</template>
