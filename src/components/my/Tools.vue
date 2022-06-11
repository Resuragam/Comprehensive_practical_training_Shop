<script lang='ts' setup name="tools">
import { useRouter } from "vue-router";
const router = useRouter();
const toFavorite = () => {
  router.push({
    path: "/favorite",
  });
};

const toSubscribe = () => {
  router.push({
    path: "/subscribe",
  });
};
</script>

<template>
  <div class="flex justify-between p-2 bg-white" @click="toFavorite()">
    <div class="flex text-sm font-semibold ">
      <span class="mr-1"
        ><van-icon
          name="star-o"
          size="1rem"
          color="#000000"
          class="font-semibold"
      /></span>
      <span class="flex items-center text-sm">收藏</span>
    </div>
    <div class="flex text-xs">
      <span class="flex items-center" style="color: #b6b5bf"></span>
      <span class="flex items-center"
        ><van-icon name="arrow" color="#B6B5BF"
      /></span>
    </div>
  </div>
  <div class="flex justify-between p-2 bg-white" @click="toSubscribe()">
    <div class="flex text-sm font-semibold">
      <span class="mr-1"
        ><van-icon
          name="shop-collect-o"
          size="1rem"
          color="#000000"
          class="font-semibold"
      /></span>
      <span class="flex items-center text-sm">订阅</span>
    </div>
    <div class="flex text-xs" style="color: #b6b5bf">
      <span class="flex items-center"></span>
      <span class="flex items-center"
        ><van-icon name="arrow" color="#B6B5BF"
      /></span>
    </div>
  </div>
</template>
