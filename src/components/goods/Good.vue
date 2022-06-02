<script lang='ts' setup name="good">
import GoodsCard from '@/components/goods/GoodsCard.vue';
const recommendGoods = [1,2,3,4,5,6,7,8,9,10]
</script>

<template>
  <div class="inline-grid grid-cols-2">
    <GoodsCard v-for="item in recommendGoods">
    </GoodsCard>
  </div>
  <div class="h-50px">

  </div>
</template>
