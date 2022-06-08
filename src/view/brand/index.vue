<script lang='ts' setup>
import { onMounted, reactive, ref } from "vue";
import GoodsCard from "@/components/goods/GoodsCard.vue";
import { useRoute } from "vue-router";
import { getBrandAllProducts } from "@/api/brand";

const route = useRoute();
const searchValue = ref("");
const onSearch = () => {};

interface GoodInfo {
  productId: string;
  brandId: string;
  categoryId: number;
  productName: string;
  pic: string;
  checkStatus: number;
  status: number;
  sale: number;
  price: number;
  detailDesc: string;
  stock: number;
  description: string;
}

interface GoodsData {
  list: Array<GoodInfo>;
}
const brandId = ref(String(route.query.brandId));

const goodsData: GoodsData = reactive({
  list: [],
});

const loading = ref(false);
const finished = ref(false);
let current = ref(1);
const limit = ref(4);
const onLoad = () => {
  console.warn("发送请求");
  setTimeout(() => {
    getBrandAllProducts(brandId.value, current.value, limit.value).then(
      (res: any) => {
        console.warn("成功拿到数据");
        console.log(res.data);
        if (res.code === 20000) {
          res.data.rows.forEach((item: any) => {
            goodsData.list.push(item);
          });
          // 加载状态结束
          loading.value = false;
          current.value = current.value + 1;
          // 数据全部加载完成
          if (res.data.rows.length < limit.value) {
            finished.value = true;
            console.warn(goodsData.list);
          }
        }
      }
    );
  }, 500);
};
</script>

<template>
  <van-search
    v-model="searchValue"
    placeholder="请输入搜索商品"
    @search="onSearch"
  />
  <van-list v-model:loading="loading" :finished="finished" @load="onLoad" finished-text="没有更多商品了">
    <template #default>
      <lazy-component class="inline-grid grid-cols-2">
        <GoodsCard
          v-for="item in goodsData.list"
          :key="item.categoryId"
          :goodInfo="item"
        ></GoodsCard>
      </lazy-component>
      <!-- <GoodsCard v-for="item in goodsData.list"></GoodsCard> -->
    </template>
    <template #loading> <van-loading type="spinner" /> </template>
  </van-list>
</template>
