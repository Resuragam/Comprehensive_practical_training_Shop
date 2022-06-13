<script lang='ts' setup name="subscribe">
import { getUserAttendBrand, userAttendBrand } from "@/api/user";
import { Toast } from "vant";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
interface BrandInfo {
  brandId: string;
  avatar: string;
  sroteName: string;
}

interface BrandInfoData {
  list: Array<BrandInfo>;
}

const userId = ref(sessionStorage.getItem("userId"));

const brandInfoData: BrandInfoData = reactive({
  list: [],
});
let loading = ref(true);

onMounted(() => {
  console.warn("发送请求");
  getUserAttendBrand(String(userId.value)).then((res: any) => {
    console.warn("成功拿到数据");
    console.log(res.data);
    if (res.code === 20000) {
      res.data.list.forEach((item: any) => {
        brandInfoData.list.push(item);
      });
      loading.value = false;
    }
  });
});

const onClickLeft = () => history.back();

const attendBrand = (brandId: string) => {
  console.warn();
  userAttendBrand(String(userId.value), brandId).then((res: any) => {
    console.warn(res);
    if (res.code === 20000 && res.message === "取消关注成功") {
      Toast.success({
        message: "取消关注成功",
        onClose() {
          brandInfoData.list.length = 0;
          getUserAttendBrand(String(userId.value)).then((res: any) => {
            console.warn("成功拿到数据");
            console.log(res.data);
            if (res.code === 20000) {
              res.data.list.forEach((item: any) => {
                brandInfoData.list.push(item);
              });
              loading.value = false;
            }
          });
        },
      });
    }
  });
};

const toBrand = (brandId: string) => {
  console.warn(brandInfoData.list)
  router.push({
    path: '/brand',
    query: {
      brandId,
    }
  })
}
</script>

<template>
  <van-nav-bar
    title="我的订阅"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  <div v-if="loading === true" class="text-center">
    <van-loading type="spinner" />
  </div>
  <div v-else>
    <van-empty description="没有订阅的商铺" v-if="brandInfoData.list.length === 0" />
    <van-swipe-cell v-for="item in brandInfoData.list">
      <div class="flex p-2"  @click="toBrand(item.brandId)">
        <div class="flex"><img :src="item.avatar" alt="" /></div>
        <div class="pl-5">
          <div>{{ item.sroteName }}</div>
        </div>
      </div>
      <template #right>
        <van-button square class="h-full" @click="attendBrand(item.brandId)"
          >取消订阅
        </van-button>
      </template>
    </van-swipe-cell>
  </div>
</template>
