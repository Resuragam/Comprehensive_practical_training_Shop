<script lang='ts' setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const activePath = ref(route.path.split('/')[2]);

const onClickLeft = () => router.push("/my");

const identity = 1 // 此时均为获取当前用户的购买信息
</script>

<template>
  <van-nav-bar
    title="购买管理"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  <van-tabs v-model:active="activePath" color="#000000">
    <van-tab title="未发货" to="/pay/notdelivery" name="notdelivery">
      <router-view v-slot="{ Component }" :identity="identity">
        <keep-alive include="notDelivery">
          <component :is="Component"/>
        </keep-alive>
      </router-view>
    </van-tab>
    <van-tab title="未收货" to="/pay/delivery" name="delivery">
      <router-view v-slot="{ Component }" :identity="identity">
        <keep-alive include="delivery">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </van-tab>
    <van-tab title="已收货" to="/pay/receipt" name="receipt">
      <router-view v-slot="{ Component }" :identity="identity">
        <keep-alive include="receipt">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </van-tab>
  </van-tabs>
</template>
