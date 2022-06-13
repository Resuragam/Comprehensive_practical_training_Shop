<script lang='ts' setup name="search">
import { useRoute, useRouter } from "vue-router";
import { onMounted, reactive, ref } from "vue";
import { searchBrand, searchProduct } from "@/api/search";
const route = useRoute();
const active = ref(0);
const router = useRouter();
const loading = ref(false);

console.warn(route.query);
const searchValue = ref(String(route.query.question));
interface BrandInfo {
  brandId: string;
  avatar: string;
  sroteName: string;
}

interface BrandInfoData {
  list: Array<BrandInfo>;
}

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

const goodsData: GoodsData = reactive({
  list: [],
});

const brandInfoData: BrandInfoData = reactive({
  list: [],
});

onMounted(() => {
  brandInfoData.list.length = 0;
  goodsData.list.length = 0;
  searchBrand(String(route.query.question), 1, 100).then((res: any) => {
    console.warn(res);
    if (res.code === 20000) {
      res.data.rows.forEach((item: any) => {
        brandInfoData.list.push(item);
      });
    }
  });
  searchProduct(String(route.query.question), 1, 100).then((res: any) => {
    console.warn(res);
    if (res.code === 20000) {
      res.data.rows.forEach((item: any) => {
        goodsData.list.push(item);
      });
    }
  });
});

const onSearch = () => {
  console.warn("开始查询");
  brandInfoData.list.length = 0;
  goodsData.list.length = 0;
  searchBrand(searchValue.value, 1, 100).then((res: any) => {
    console.warn(res);
    if (res.code === 20000) {
      res.data.rows.forEach((item: any) => {
        brandInfoData.list.push(item);
      });
    }
  });
  searchProduct(searchValue.value, 1, 100).then((res: any) => {
    console.warn(res);
    if (res.code === 20000) {
      res.data.rows.forEach((item: any) => {
        goodsData.list.push(item);
      });
    }
  });
};

const toGoods = (brandId:string,productId:string) => {
  router.push({
    path: '/good',
    query: {
      brandId,
      productId
    }
  })
}

const toBrand = (brandId:string) => {
  router.push({
    path: '/brand',
    query: {
      brandId,
    }
  })
}
</script>

<template>
  <div class="px-2 flex">
    <div class="flex items-center">
      <van-icon
        name="arrow-left"
        @click="router.back()"
        class="flex items-center"
      />
    </div>
    <van-search
      class="w-full"
      v-model="searchValue"
      placeholder="请输入搜索关键词"
      @search="onSearch"
    />
  </div>
  <van-tabs v-model:active="active" color="#000000">
    <van-tab title="商品">
      <div v-if="loading === true" class="text-center pt-2">
        <van-loading type="spinner" />
      </div>
      <div v-else class="pt-2">
        <van-card
          v-for="item in goodsData.list"
          :key="item.productId"
          :price="item.price"
          :title="item.productName"
          :thumb="item.pic"
          class="bg-white p-1"
          @click="toGoods(item.brandId,item.productId)"
        >
        </van-card>
      </div>
    </van-tab>
    <van-tab title="店家">
      <div v-if="loading === true" class="text-center pt-2">
        <van-loading type="spinner" />
      </div>
      <div v-else class="pt-2">
        <div class="flex p-2" v-for="item in brandInfoData.list" @click="toBrand(item.brandId)">
          <div class="flex"><img :src="item.avatar" alt="" /></div>
          <div class="pl-5">
            <div>{{ item.sroteName }}</div>
          </div>
        </div>
      </div>
    </van-tab>
  </van-tabs>
</template>
