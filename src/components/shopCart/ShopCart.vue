<script lang="ts" setup>
import { userCreateOrder, userPayOrder } from "@/api/order";
import { deleteCartProducts, getUserCartProducts } from "@/api/shopcart";
import { Dialog, Toast } from "vant";
import { computed, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const userId = store.state.user.userId;

const shopCartData: Array<Order.OrderDetailsInfo> = reactive([]);
let checked = ref([]);

const loading = ref(true);

// 获取购物车数据
onMounted(() => {
  getUserCartProducts(userId).then((res: any) => {
    shopCartData.length = 0;
    console.warn(res);
    if (res.code === 20000 && res.message !== "未查询到商品！") {
      res.data.list.forEach((OrderDetailsInfoItem: Order.OrderDetailsInfo) => {
        shopCartData.push(OrderDetailsInfoItem);
      });
    }
    loading.value = false;
  });
});

// 删除购物车操作
const deleteProduct = (productId: string, index: number) => {
  deleteCartProducts(productId).then((res: any) => {
    if (res.code === 20000) {
      Toast.success({
        message: "删除成功",
        onClose() {
          shopCartData.splice(index, 1);
          checked.value.forEach((checkProduct: any, checkindex) => {
            if (checkProduct.productId === productId) {
              checked.value.splice(checkindex, 1);
            }
          });
        },
      });
    } else {
      Toast.fail({
        message: "删除失败，请重试",
      });
    }
  });
};

// 计算价格
const checkProductPrice = computed(() => {
  let flag = 0;
  checked.value.forEach((item: any) => {
    flag = flag + Number(item.price) * 100 * Number(item.quantity);
  });
  return flag;
});

// 检查购物车是否选择全部商品
const ischecked = computed(() => {
  return (
    checked.value.length === shopCartData.length && shopCartData.length != 0
  );
});

const onSubmit = () => {
  console.warn(checked.value);
  let payList: any = []; // 支付列表
  checked.value.forEach((item: any) => {
    const listItem = {
      brandId: item.brandId,
      payType: 0,
      totalAmount: String(Number(item.price) * Number(item.quantity)),
      status: 0,
      address: "HNUST",
      userId: userId,
    };
    payList.push(listItem);
  });
  console.warn("list", payList);
  if (payList.length !== 0) {
    Dialog.confirm({
      message: "确认支付",
    }).then(() => {
      userCreateOrder(payList).then((res: any) => {
        console.warn(res);
        if (res.code === 20000) {
          // 执行订单创建操作
          let paylist: any = [];
          let payHasList: any = [];
          checked.value.forEach((item: any, index: number) => {
            const listItem = {
              orderId: res.data.order[index].orderId,
              orderSn: res.data.order[index].orderSn,
              userId: userId,
              productId: item.productId,
              pic: item.pic,
              productName: item.productName,
              price: item.price,
              quantity: item.quantity,
              brought: {
                productId: item.productId,
                userId: userId,
              },
            };
            paylist.push(listItem);
            payHasList.push(item.productId);
          });
          console.warn("paylist:", paylist);
          userPayOrder(paylist).then((res: any) => {
            console.warn(res);
            if (res.code === 20000) {
              Toast.success({
                message: "支付成功",
                onClose() {
                  checked.value.length = 0;
                },
              });
              getUserCartProducts(userId).then((res: any) => {
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
  } else {
    Toast.fail("当前购物车没有订单");
  }
};

// 加载
</script>

<template>
  <div v-if="loading" class="text-center mt-2">
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
        v-for="(shopCartDataItem, index) in shopCartData"
        :name="shopCartDataItem"
        :key="shopCartDataItem.id"
        class="bg-white pl-2 mx-2 py-3"
        icon-size="1rem"
        ><div>
          <van-swipe-cell>
            <van-card
              :key="shopCartDataItem.productId"
              :num="shopCartDataItem.quantity"
              :price="shopCartDataItem.price"
              :title="shopCartDataItem.productName"
              :thumb="shopCartDataItem.pic"
              class="bg-white p-1"
            >
            </van-card>
            <template #right>
              <van-button
                color="#d4d4d4"
                text="删除"
                class="h-full"
                @click="deleteProduct(shopCartDataItem.productId, index)"
              />
            </template>
          </van-swipe-cell></div
      ></van-checkbox>
    </van-checkbox-group>
  </div>
  <van-submit-bar
    :price="checkProductPrice"
    button-text="提交订单"
    @submit="onSubmit"
    class="flxed bottom-50px"
  >
  </van-submit-bar>
  <div class="h-100px"></div>
</template>
