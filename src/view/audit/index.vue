<script lang='ts' setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const activePath = ref(route.path.split("/")[2]);
const onClickLeft = () => router.push("/my");
</script>

<template>
  <van-nav-bar
    title="商品审核"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  <van-tabs v-model:active="activePath" color="#000000">
    <van-tab title="未审核" to="/audit/notAudit" name="goodsNotAudit">
      <router-view v-slot="{ Component }">
        <keep-alive include="NotAudit">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </van-tab>
    <van-tab title="已审核" to="/audit/hasAudit" name="goodsAudit">
      <router-view v-slot="{ Component }">
        <keep-alive include="HasAudit">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </van-tab>
  </van-tabs>
</template>
