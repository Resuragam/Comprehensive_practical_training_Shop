<script lang="ts">
export default {
  name: "Good",
};
</script>

<script lang='ts' setup name="good">
import { getGoodsByCategoryId } from "@/api/goods";
import GoodsCard from "@/components/goods/GoodsCard.vue";
import { reactive, ref } from "vue";

const props = defineProps({
  categoryId: {
    type: Number,
  },
});

const goodsInfoList: Array<Goods.GoodInfo> = reactive([]);

// 分页加载
const loading = ref(false);
const finished = ref(false);
let current = ref(1);
const limit = ref(4);
const onLoad = () => {
  // console.warn('加载数据...')
  setTimeout(() => {
    getGoodsByCategoryId(
      current.value,
      limit.value,
      Number(props.categoryId)
    ).then((res: any) => {
      if (res.code === 20000) {
        res.data.rows.forEach((item: any) => {
          goodsInfoList.push(item);
        });
        // 加载状态结束
        loading.value = false;
        current.value = current.value + 1;
        // 数据全部加载完成
        if (res.data.rows.length < limit.value) {
          finished.value = true;
        }
      }
    });
  }, 500);
};
</script>

<template>
  <van-list v-model:loading="loading" :finished="finished" @load="onLoad">
    <template #default>
      <div class="inline-grid grid-cols-2">
        <GoodsCard
          v-for="goodsInfoListItem in goodsInfoList"
          :key="goodsInfoListItem.categoryId"
          :goodInfo="goodsInfoListItem"
        ></GoodsCard>
      </div>
    </template>
    <template #loading> <van-loading type="spinner" /> </template>
  </van-list>
  <div class="h-50px"></div>
</template>

<style>
</style>