<script lang='ts' setup name="tools">
import { useRouter } from "vue-router";
const router = useRouter()
const toFavorite = () => {
    router.push({
        path: "/favorite",
    })
}

const toSubscribe = () => {
    router.push({
        path: "/subscribe",
    })
}
</script>

<template>
  <div class="inline-grid grid-cols-2 bg-white w-full rounded my-2" style="font-family:Arial,Helvetica,sans-serif;">
      <div class="flex justify-between p-2" @click="toFavorite()">
          <div class="flex text-sm font-semibold">
              <span class="mr-1"><van-icon name="star-o" size="1rem" color="#000000" class="font-semibold"/></span>
              <span class="flex items-center text-sm">收藏</span>
          </div>
          <div class="flex text-xs">
              <span class="flex items-center" style="color:#B6B5BF">11</span>
              <span class="flex items-center"><van-icon name="arrow" color="#B6B5BF"/></span>
          </div>
      </div>
      <!-- <div class="flex justify-between p-2">
          <div class="flex text-sm font-semibold">
              <span class="mr-1"><van-icon name="send-gift-o" size="1rem" color="#000000" class="font-semibold"/></span>
              <span class="flex items-center text-sm">我有</span>
          </div>
          <div class="flex text-xs">
              <span class="flex items-center"  style="color:#B6B5BF">9</span>
              <span class="flex items-center"><van-icon name="arrow" color="#B6B5BF"/></span>
          </div>
      </div> -->
      <!-- <div class="flex justify-between p-2">
          <div class="flex text-sm font-semibold">
              <span class="mr-1"><van-icon name="underway-o" size="1rem" color="#000000" class="font-semibold"/></span>
              <span class="flex items-center text-sm">足迹</span>
          </div>
          <div class="flex text-xs">
              <span class="flex items-center"  style="color:#B6B5BF">2</span>
              <span class="flex items-center"><van-icon name="arrow" color="#B6B5BF"/></span>
          </div>
      </div> -->
      <div class="flex justify-between p-2" @click="toSubscribe()">
          <div class="flex text-sm font-semibold">
              <span class="mr-1"><van-icon name="shop-collect-o" size="1rem" color="#000000" class="font-semibold"/></span>
              <span class="flex items-center text-sm">订阅</span>
          </div>
          <div class="flex text-xs"  style="color:#B6B5BF">
              <span class="flex items-center">8</span>
              <span class="flex items-center"><van-icon name="arrow" color="#B6B5BF"/></span>
          </div>
      </div>
  </div>
</template>
