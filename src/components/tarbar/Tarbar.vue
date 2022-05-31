<script lang='ts' setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
const active = ref('home')

</script>

<template>
  <van-tabbar v-model="active" active-color="#000000">
    <van-tabbar-item icon='shop' to="/home" name="home">首页</van-tabbar-item>
    <van-tabbar-item icon='shopping-cart' to="/shopcart" name="shopcart">购物车</van-tabbar-item>
    <van-tabbar-item icon='manager' to="/my" name="my">我的</van-tabbar-item>
  </van-tabbar>
</template>
