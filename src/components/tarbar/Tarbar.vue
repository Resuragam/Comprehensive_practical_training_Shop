<script lang='ts' setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const active = ref(route.path.split("/")[1]);

</script>

<template>
  <van-tabbar v-model="active" active-color="#000000" route>
    <van-tabbar-item icon="shop" replace to="/home" name="home"
      >首页</van-tabbar-item
    >
    <van-tabbar-item icon="shopping-cart" replace to="/shopcart" name="shopcart"
      >购物车</van-tabbar-item
    >
    <van-tabbar-item icon="manager" replace to="/my" name="my"
      >我的</van-tabbar-item
    >
  </van-tabbar>
</template>
