<script lang='ts' setup name="GoodsCard">
import { reactive } from "vue";
import { useRouter } from "vue-router";
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

const props = defineProps({
  goodInfo: {
    type: Object,
    default: {},
  },
});

const router = useRouter();

const toGood = () => {
  router.push({
    path: "/good",
    query: {
      productId: props.goodInfo.productId,
      brandId:props.goodInfo.brandId
    },
  });
};
</script>

<template>
  <div class="p-2" @click="toGood()">
    <div
      class="bg-cover w-45vw h-30vh"
      :style="{ backgroundImage: 'url(' + props.goodInfo.pic + ')' }"
    ></div>
    <div class="text-xs my-1" style="color: #30323f">
      {{ props.goodInfo.productName }}
    </div>
    <div class="flex justify-between">
      <span class="text-sm font-600">
        <span class="text-xs">¥</span>{{ props.goodInfo.price }}
      </span>
      <span class="text-xs leading-5" style="color: #80808a"
        >{{ props.goodInfo.sale }}人付款</span
      >
    </div>
  </div>
</template>
