<script lang='ts' setup name="shopcart">
import { deleteCartProducts, getUserCartProducts } from "@/api/shopcart";
import { Toast } from "vant";
import {
  computed,
  onActivated,
  onDeactivated,
  onMounted,
  reactive,
  ref,
} from "vue";
import { useStore } from "vuex";
const store = useStore();

interface ShopCartInfo {
  id: string;
  productId: string;
  userId: string;
  pic: string;
  productName: string;
  price: string;
  quantity: string;
  isDeleted: number;
}
const loading = ref(true);
const userId = ref(store.state.user.userId);
let checked = ref([]);
let shopCartData: Array<ShopCartInfo> = reactive([]);

const deleteProduct = (index: number, productId: string) => {
  checked.value.forEach((item, checkindex) => {
    if (item.productId === productId) {
      checked.value.splice(checkindex, 1);
    }
  });
  deleteCartProducts(productId).then((res: any) => {
    if (res.code === 20000) {
      Toast.success({
        message: "删除成功",
        onClose() {
          shopCartData.splice(index, 1);
        },
      });
    } else {
      Toast.fail({
        message: "请重试",
      });
    }
  });
};

onActivated(() => {
  getUserCartProducts(userId.value).then((res: any) => {
    console.warn(res);
    console.warn(checked);
    shopCartData.length = 0;
    if (res.code === 20000 && res.message !== "未查询到商品！") {
      res.data.list.forEach((item: any) => {
        shopCartData.push(item);
      });
    }
    loading.value = false;
  });
});

const price = computed(() => {
  let sum = 0;
  checked.value.forEach((item: any) => {
    sum = sum + Number(item.price) * 100 * Number(item.quantity);
  });
  return sum;
});

onDeactivated(() => {
  loading.value = true;
  // sessionStorage.setItem('checked',checked.value)
  checked.value.length = 0;
});

const ischecked = computed(() => {
  if (
    checked.value.length === shopCartData.length &&
    shopCartData.length != 0
  ) {
    return true;
  } else {
    return false;
  }
});

console.warn(checked);
const checkAll = () => {
  if (ischecked.value == false) {
    checked.value.length = 0;
    shopCartData.forEach((item: any) => {
      checked.value.push(item);
    });
  } else {
    checked.value.length = 0;
  }
};

const onSubmit = () => {};
</script>

<template>
  <div v-if="loading" class="text-center">
    <van-loading type="spinner" />
  </div>
  <div v-else>
    <div class="p-3 font-sans">
      <span class="font-600">购物车</span>
      <span class="textsm">({{ shopCartData.length }})</span>
    </div>
    <van-empty description="购物车空空如也" v-if="shopCartData.length === 0" />
    <van-checkbox-group v-model="checked">
      <van-checkbox
        :name="item"
        v-for="(item, index) in shopCartData"
        class="bg-white pl-2 mx-2 py-3"
        icon-size="1rem"
        ><div>
          <van-swipe-cell>
            <van-card
              :key="item.productId"
              :num="item.quantity"
              :price="item.price"
              :title="item.productName"
              :thumb="item.pic"
              class="bg-white p-1"
            >
            </van-card>
            <template #right>
              <van-button
                square
                color="#d4d4d4"
                text="删除"
                class="h-full w-10"
                @click="deleteProduct(index, item.productId)"
              />
            </template>
          </van-swipe-cell></div
      ></van-checkbox>
    </van-checkbox-group>
  </div>
  <van-submit-bar
    :price="price"
    button-text="提交订单"
    @submit="onSubmit"
    class="flxed bottom-50px"
  >
    <van-checkbox v-model="ischecked" @click="checkAll">全选</van-checkbox>
  </van-submit-bar>
  <div class="h-100px"></div>
</template>
