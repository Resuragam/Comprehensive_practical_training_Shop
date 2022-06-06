<script lang='ts' setup name="goodInfo">
import { getGoodsByGoodId } from "@/api/goods";
import store from "@/store";
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import actionBar  from "@/components/goods/ActionBar.vue";

const route = useRoute();
const router = useRouter();
const productId = String(route.query.productId);
const loading = ref(true);
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

const goodsData: GoodInfo = reactive({
  productId: productId,
  brandId: "",
  categoryId: 0,
  productName: "",
  pic: "",
  checkStatus: 0,
  status: 0,
  sale: 0,
  price: 0,
  detailDesc: "",
  stock: 0,
  description: "",
});

let images: Array<string> = [];
onMounted(() => {
  console.warn(productId);
  getGoodsByGoodId(productId).then((res) => {
    console.warn(res);
    // 轮播图图片设置
    goodsData.pic = res.data.product.pic
    goodsData.detailDesc = res.data.product.detailDesc
    goodsData.description = res.data.product.description
    images.push(goodsData.pic);
    images.push(goodsData.detailDesc);
    images.push(goodsData.description);
    // 产品信息
    goodsData.brandId = res.data.product.brandId;
    goodsData.categoryId = res.data.product.categoryId;
    goodsData.productName = res.data.product.productName;
    goodsData.price = res.data.product.price;
    goodsData.sale = res.data.product.sale;
    goodsData.stock = res.data.product.stock;
    console.log(goodsData);
    console.warn('userid:',store.state.userId)
    loading.value = false;
  });
});
</script>
<!-- <script>
export default {
  name:"goodInfo"
}
</script> -->
<template>
  <div class="px-2 py-2 justify-between flex">
    <van-icon name="arrow-left" @click="router.back()"/>
    <van-icon name="weapp-nav" />
  </div>
  <div v-if="loading" class="text-center">
    <van-loading type="spinner" />
  </div>
  <div v-else>
    <div class="py-2">
      <!-- <van-swipe :autoplay="3000" lazy-render :height="300">
        <van-swipe-item v-for="image in images" :key="image">
          <img :src="image" />
        </van-swipe-item>
      </van-swipe> -->
      <img :src="goodsData.pic" alt="">
    </div>
    <div class="flex justify-between m-2">
      <div class="flex text-lg font-sans font-600">
        <span class="text-sm flex leading-7">￥</span>{{ goodsData.price }}
      </div>
      <div class="flex leading-7 text-xs" style="color: #80808a">{{ goodsData.sale }}人付款</div>
    </div>
    <div class="m-2">
      {{ goodsData.productName }}
    </div>
    <div>
      <img :src="goodsData.detailDesc" alt="">
    </div>
    <div>
      <img :src="goodsData.description" alt="">
    </div>
    <div class="h-50px"></div>
    <actionBar></actionBar>
  </div>
</template>
