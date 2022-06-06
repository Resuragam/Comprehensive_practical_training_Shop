<script lang='ts' setup name="actionBar">
import { ref } from 'vue';
// 用户收藏商品操作
const star = ref(false)
</script>

<template>
  <div>
      <van-action-bar>
        <van-action-bar-icon icon="shop-o" text="店铺" />
        <van-action-bar-icon icon="cart-o" text="购物车" />
        <van-action-bar-icon icon="star-o" text="收藏" />
        <van-action-bar-button type="warning" text="加入购物车" />
        <van-action-bar-button type="danger" text="立即购买" />
      </van-action-bar>
    </div>
</template>
