<script lang='ts' setup name="search">
import search from "@/components/home/Search.vue";
import brand from "@/components/search/Brand.vue";
import product from "@/components/search/Product.vue";
import { useRoute } from "vue-router";
import { ref } from "vue";
const route = useRoute()
const active = ref(0);
const loading = ref(false);
console.warn(route.query)
const searchValue = ref('');
const onSearch = () => {};
</script>

<template>
  <van-search
    v-model="searchValue"
    placeholder="请输入搜索关键词"
    @search="onSearch"
  />
  <van-tabs v-model:active="active" color="#000000">
    <van-tab title="全部商品">
      <div v-if="loading === true" class="text-center pt-2">
        <van-loading type="spinner" />
      </div>
      <div v-else class="pt-2">
        <brand :store-name="searchValue"></brand>
        <!-- <brand></brand> -->
        <product></product>
      </div>
    </van-tab>
    <van-tab title="商品">
      <div v-if="loading === true" class="text-center pt-2">
        <van-loading type="spinner" />
      </div>
      <div v-else class="pt-2">
        <product></product>
      </div>
    </van-tab>
    <van-tab title="店家">
      <div v-if="loading === true" class="text-center pt-2">
        <van-loading type="spinner" />
      </div>
      <div v-else class="pt-2">
        <brand :store-name="searchValue"></brand>
      </div>
    </van-tab>
  </van-tabs>
</template>
