<script lang='ts' setup name="favorite">
import { deleteCartProducts } from "@/api/shopcart";
import { getUserAttendGoods, userAttendProduct } from "@/api/user";
import GoodsCard from "@/components/goods/GoodsCard.vue";
import { Toast } from "vant";
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

const userId = sessionStorage.getItem("userId");

const goodsData: GoodsData = reactive({
  list: [],
});
let loading = ref(true);

onMounted(() => {
  console.warn("发送请求");
  getUserAttendGoods(String(userId)).then((res: any) => {
    console.warn("成功拿到数据");
    console.log(res.data);
    if (res.code === 20000&&res.message!=="未收藏任何商品") {
      res.data.list.forEach((item: any) => {
        goodsData.list.push(item);
      });
    }
      loading.value = false;
  });
});

const onClickLeft = () => history.back();
const deleteProduct = (index: number, productId: string) => {
  userAttendProduct(String(userId), productId).then((res: any) => {
    console.warn(res)
    if (res.code === 20000) {
      Toast.success({
        message: "取消收藏",
        onClose() {
          goodsData.list.length = 0
          getUserAttendGoods(String(userId)).then((res: any) => {
            console.warn("成功拿到数据");
            console.log(res.data);
            if (res.code === 20000) {
              res.data.list.forEach((item: any) => {
                goodsData.list.push(item);
              });
              loading.value = false;
            }
          });
        },
      });
    } else {
      Toast.fail({
        message: "请重试",
      });
    }
  });
};
</script>

<template>
  <van-nav-bar
    title="我的收藏"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  <div v-if="loading === true" class="text-center">
    <van-loading type="spinner" />
  </div>
  <div v-else>
    <van-empty
      description="没有收藏的商品"
      v-if="goodsData.list.length===0"
    />
    <van-swipe-cell v-for="(item, index) in goodsData.list" class="m-2">
      <van-card
        :key="item.productId"
        :price="item.price"
        :title="item.productName"
        :thumb="item.pic"
        class="bg-white p-1"
      >
      </van-card>
      <template #right>
        <van-button
          square
          text="取消收藏"
          class="h-full"
          @click="deleteProduct(index, item.productId)"
          color="#d4d4d4"
        />
      </template>
    </van-swipe-cell>
  </div>
</template>
