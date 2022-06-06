<script lang='ts' setup name="good">
import { getGoodsByCategoryId } from "@/api/goods";
import GoodsCard from "@/components/goods/GoodsCard.vue";
import { onMounted, reactive, ref } from "vue";

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

const props = defineProps({
  categoryId: {
    type: Number,
  },
});

const goodsData: GoodsData = reactive({
  list: [],
});

const loading = ref(false);
const finished = ref(false);
let current = ref(1);
const limit = ref(4);
// onMounted(() => {
//   getGoodsByCategoryId(1, 4, Number(props.categoryId)).then((res: any) => {
//     console.warn("成功拿到数据");
//     console.log(res.data.data);
//     if (res.data.code === 20000) {
//       res.data.data.rows.forEach((item: any) => {
//         goodsData.list.push(item);
//       });
//     }
//   });
// });
const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  console.warn("发送请求");
  setTimeout(() => {
    getGoodsByCategoryId(
      current.value,
      limit.value,
      Number(props.categoryId)
    ).then((res: any) => {
      console.warn("成功拿到数据");
      console.log(res.data.data);
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
    });
  }, 500);
};
</script>

<template>
  <!-- <div class="inline-grid grid-cols-2">
    <GoodsCard v-for="item in goodsData.list"></GoodsCard>
    <GoodsCard v-for="item in recommendGoods"> </GoodsCard>
  </div> -->
  <van-list v-model:loading="loading" :finished="finished" @load="onLoad">
    <template #default>
      <lazy-component class="inline-grid grid-cols-2">
        <GoodsCard v-for="item in goodsData.list" :key="item.categoryId" :goodInfo="item"></GoodsCard>
      </lazy-component>
      <!-- <GoodsCard v-for="item in goodsData.list"></GoodsCard> -->
    </template>
    <template #loading> <van-loading type="spinner" /> </template>
  </van-list>
  <div class="h-50px"></div>
</template>

<style>
</style>