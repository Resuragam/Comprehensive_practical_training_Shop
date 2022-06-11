<script lang='ts' setup name="shopcart">
import { userCreateOrder, userPayOrder } from "@/api/order";
import { deleteCartProducts, getUserCartProducts } from "@/api/shopcart";
import { Dialog, Toast } from "vant";
import { computed, onActivated, onDeactivated, reactive, ref } from "vue";
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
  checked.value.forEach((item:any, checkindex) => {
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
    shopCartData.forEach((item:any) => {
      checked.push(item);
    });
  } else {
    checked.value.length = 0;
  }
};

const onSubmit = () => {
  console.warn(checked.value);
  let list: any = [];
  checked.value.forEach((item: any) => {
    const listItem = {
      brandId: item.brandId,
      payType: 0,
      totalAmount: String(Number(item.price) * Number(item.quantity)),
      status: 0,
      address: "HNUST",
      userId: userId.value,
    };
    list.push(listItem);
  });
  console.warn("list", list);
  Dialog.confirm({
    message: "确认支付",
  }).then(() => {
    userCreateOrder(list).then((res: any) => {
      console.warn(res);
      if (res.code === 20000) {
        // 执行订单创建操作
        let paylist: any = [];
        let payHasList: any = [];
        checked.value.forEach((item: any, index: number) => {
          const listItem = {
            orderId: res.data.order[index].orderId,
            orderSn: res.data.order[index].orderSn,
            userId: userId.value,
            productId: item.productId,
            pic: item.pic,
            productName: item.productName,
            price: item.price,
            quantity: item.quantity,
            brought: {
              productId: item.productId,
              userId: userId.value,
            },
          };
          paylist.push(listItem);
          payHasList.push(item.productId);
        });
        console.warn(paylist);
        userPayOrder(paylist).then((res: any) => {
          console.warn(res);
          if (res.code === 20000) {
            Toast.success({
              message: "支付成功",
              onClose() {
                payHasList.forEach((item: any) => {
                  deleteCartProducts(item).then((res) => {
                    console.warn("支付成功删除购物车");
                  });
                });
              },
            });
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
          } else {
            Toast.fail({
              message: "支付失败，请重试",
            });
          }
        });
      }
    });
  });
};
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
                color="#d4d4d4"
                text="删除"
                class="h-full"
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
