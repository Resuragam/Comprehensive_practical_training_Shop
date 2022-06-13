<script lang='ts' setup>
import { onMounted, reactive, ref } from "vue";
import GoodsCard from "@/components/goods/GoodsCard.vue";
import { useRoute, useRouter } from "vue-router";
import { getBrandAllProducts, getBrandInfo } from "@/api/brand";
import { getUserCheckAttendBrand, userAttendBrand } from "@/api/user";
import { Toast } from "vant";

const route = useRoute();
const router = useRouter();
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

interface BrandInfo {
  avatar: string;
  sroteName: string;
  attend: boolean;
  tagText: string;
}

const brandInfo: BrandInfo = reactive({
  avatar: "",
  sroteName: "",
  attend: false,
  tagText: "",
});
const brandId = ref(String(route.query.brandId));
const userId = ref(sessionStorage.getItem("userId"));
const goodsData: GoodsData = reactive({
  list: [],
});

const showloading = ref(true);
const loading = ref(false);
const finished = ref(false);
let current = ref(1);
const limit = ref(4);

onMounted(() => {
  getBrandInfo(brandId.value).then((res) => {
    console.warn("商家信息", res);
    brandInfo.avatar = res.data.brand.avatar;
    brandInfo.sroteName = res.data.brand.sroteName;
    getUserCheckAttendBrand(String(userId.value), String(brandId.value)).then(
      (res: any) => {
        console.warn(res);
        if (res.code === 20000) {
          if (res.message === "未关注") {
            brandInfo.attend = false;
            showloading.value = false;
            brandInfo.tagText = "未关注";
          } else {
            brandInfo.attend = true;
            showloading.value = false;
            brandInfo.tagText = "已关注";
          }
        }
      }
    );
  });
});
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

const attendBrand = () => {
  console.warn();
  userAttendBrand(String(userId.value), String(brandId.value)).then(
    (res: any) => {
      console.warn(res);
      if (res.code === 20000 && res.message === "关注成功") {
        Toast.success({
          message: "关注成功",
          onClose() {
            brandInfo.attend = true;
            brandInfo.tagText = "已关注";
          },
        });
      } else if (res.code === 20000 && res.message === "取消关注成功") {
        Toast.success({
          message: "取消关注",
          onClose() {
            brandInfo.attend = false;
            brandInfo.tagText = "未关注";
          },
        });
      }
    }
  );
};
</script>

<template>
  <div class="px-2 py-2 justify-between flex">
    <van-icon name="arrow-left" @click="router.back()" />
    <van-icon name="weapp-nav" />
  </div>
  <!-- <van-search
    v-model="searchValue"
    placeholder="请输入搜索商品"
    @search="onSearch"
  /> -->
  <div v-if="showloading" class="text-center">
    <van-loading type="spinner" />
  </div>
  <div v-else>
    <van-swipe-cell>
      <div class="flex p-2">
        <div class="flex"><img :src="brandInfo.avatar" alt="" /></div>
        <div class="pl-5">
          <div>{{ brandInfo.sroteName }}</div>
          <van-tag v-if="brandInfo.attend&&userId!==brandId" type="success" size="medium">{{
            brandInfo.tagText
          }}</van-tag>
          <van-tag v-else-if="brandInfo.attend===false&&userId!==brandId" type="default" size="medium">{{
            brandInfo.tagText
          }}</van-tag>
        </div>
      </div>
      <template #right v-if="userId!==brandId">
        <van-button
          v-if="brandInfo.attend"
          square
          class="h-full"
          @click="attendBrand()"
        >
          {{ brandInfo.attend ? "取消订阅" : "订阅" }}
        </van-button>
        <van-button
          v-else
          square
          type="primary"
          class="h-full"
          @click="attendBrand()"
        >
          {{ brandInfo.attend ? "取消订阅" : "订阅" }}
        </van-button>
      </template>
    </van-swipe-cell>
    <van-list
      v-model:loading="loading"
      :finished="finished"
      @load="onLoad"
      finished-text="没有更多商品了"
    >
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
  </div>
</template>
