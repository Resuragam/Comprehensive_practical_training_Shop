<script lang='ts' setup>
import {
  getOrderInfo,
  getUserNoOrder,
  getUserOrder,
  recipitOrderUser,
  userConfirmProduct,
} from "@/api/order";
import { Toast } from "vant";
import { onMounted, reactive, ref } from "vue";
const onClickLeft = () => history.back();
const active = ref(0);
const userId = ref(sessionStorage.getItem("userId"));
// 未发货数据
const noOrderLoading = ref(true);
const OrderLoading = ref(true);
const receiptLoading = ref(true);
interface OrderInfo {
  orderId: string;
  userId: string;
  brandId: string;
  orderSn: string;
  payType: number;
  totalAmount: string;
  status: number;
  createTime: string;
  deliveryTime: string;
  receiveTime: string;
  address: string;
}

interface OrderItemInfo {
  id: string;
  orderId: string;
  orderSn: string;
  pic: string;
  price: number;
  productId: string;
  productName: string;
  quantity: string;
}

const orderNoInfoData: Array<OrderInfo> = reactive([]);
const orderNoItemInfo: Array<OrderItemInfo> = reactive([]);

const orderInfoData: Array<OrderInfo> = reactive([]);
const orderItemInfo: Array<OrderItemInfo> = reactive([]);

const receiptInfoData: Array<OrderInfo> = reactive([]);
const receiptItemInfo: Array<OrderItemInfo> = reactive([]);
onMounted(() => {
  getUserNoOrder(String(userId.value)).then((res: any) => {
    console.warn(res);
    if (res.code === 20000) {
      res.data.list.forEach((item: any) => {
        orderNoInfoData.push(item);
      });
      const promiseList: any = [];
      orderNoInfoData.forEach((item) => {
        promiseList.push(getOrderInfo(item.orderId));
      });
      Promise.all(promiseList).then((val: any) => {
        console.warn(val);
        val.forEach((res: any) => {
          if (res.code === 20000) {
            const item = {
              id: res.data.orderItem.id,
              orderId: res.data.orderItem.orderId,
              orderSn: res.data.orderItem.orderSn,
              pic: res.data.orderItem.pic,
              price: res.data.orderItem.price,
              productId: res.data.orderItem.productId,
              productName: res.data.orderItem.productName,
              quantity: res.data.orderItem.quantity,
            };
            orderNoItemInfo.push(item);
          }
        });
        noOrderLoading.value = false;
      });
    }
  });
  getUserOrder(String(userId.value)).then((res: any) => {
    console.warn(res);
    if (res.code === 20000) {
      res.data.list.forEach((item: any) => {
        orderInfoData.push(item);
      });
      const promiseList: any = [];
      orderInfoData.forEach((item) => {
        promiseList.push(getOrderInfo(item.orderId));
      });
      Promise.all(promiseList).then((val: any) => {
        console.warn(val);
        val.forEach((res: any) => {
          if (res.code === 20000) {
            const item = {
              id: res.data.orderItem.id,
              orderId: res.data.orderItem.orderId,
              orderSn: res.data.orderItem.orderSn,
              pic: res.data.orderItem.pic,
              price: res.data.orderItem.price,
              productId: res.data.orderItem.productId,
              productName: res.data.orderItem.productName,
              quantity: res.data.orderItem.quantity,
            };
            orderItemInfo.push(item);
          }
        });
        OrderLoading.value = false;
      });
    }
  });
  recipitOrderUser(String(userId.value)).then((res: any) => {
    console.warn(res);
    if (res.code === 20000) {
      res.data.list.forEach((item: any) => {
        receiptInfoData.push(item);
      });
      const promiseList: any = [];
      receiptInfoData.forEach((item) => {
        promiseList.push(getOrderInfo(item.orderId));
      });
      Promise.all(promiseList).then((val: any) => {
        console.warn(val);
        val.forEach((res: any) => {
          if (res.code === 20000) {
            const item = {
              id: res.data.orderItem.id,
              orderId: res.data.orderItem.orderId,
              orderSn: res.data.orderItem.orderSn,
              pic: res.data.orderItem.pic,
              price: res.data.orderItem.price,
              productId: res.data.orderItem.productId,
              productName: res.data.orderItem.productName,
              quantity: res.data.orderItem.quantity,
            };
            receiptItemInfo.push(item);
          }
        });
        receiptLoading.value = false;
      });
    }
  });
});

// 已经发货数据
const pushOrder = (index: number, orderId: string) => {
  userConfirmProduct(orderId).then((res: any) => {
    console.warn(res);
    if (res.code === 20000) {
      console.warn(res);
      Toast.success({
        message: "收货成功",
        onClose() {
          orderItemInfo.splice(index, 1);
        },
      });
    }
  });
};
</script>

<template>
  <van-nav-bar
    title="购买管理"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  <div>
    <van-tabs v-model:active="active" color="#000000">
      <van-tab title="未发货">
        <template #title>
          <van-icon name="phone-circle-o" />
          未发货
        </template>
        <div v-if="noOrderLoading" class="text-center">
          <van-loading type="spinner" />
        </div>
        <div v-else>
          <div v-if="noOrderLoading === false && orderNoItemInfo.length === 0">
            <van-empty description="暂无未发货的商品" />
          </div>
          <div v-for="item in orderNoItemInfo">
            <van-card
              :key="item.productId"
              :num="item.quantity"
              :price="item.price"
              :title="item.productName"
              :thumb="item.pic"
              class="mb-2"
            >
            </van-card>
          </div>
        </div>
      </van-tab>
      <van-tab title="已发货">
        <template #title>
          <van-icon name="gold-coin-o" />
          已发货
        </template>
        <div v-if="OrderLoading" class="text-center">
          <van-loading type="spinner" />
        </div>
        <div v-else>
          <div v-if="OrderLoading === false && orderItemInfo.length === 0">
            <van-empty description="暂无已发货的商品" />
          </div>
          <div v-for="(item, index) in orderItemInfo">
            <van-swipe-cell>
              <van-card
                :key="item.productId"
                :num="item.quantity"
                :price="item.price"
                :title="item.productName"
                :thumb="item.pic"
                class="mb-2"
              >
              </van-card>
              <template #right>
                <van-button
                  color="#d4d4d4"
                  text="收货"
                  class="h-full"
                  @click="pushOrder(index, item.orderId)"
                />
              </template>
            </van-swipe-cell>
          </div>
        </div>
      </van-tab>
      <van-tab title="已收货">
        <template #title>
          <van-icon name="completed" />
          已收货
        </template>
        <div v-if="receiptLoading" class="text-center">
          <van-loading type="spinner" />
        </div>
        <div v-else>
          <div v-if="receiptLoading === false && receiptItemInfo.length === 0">
            <van-empty description="暂无已收货的商品" />
          </div>
          <div v-for="(item, index) in receiptItemInfo">
            <van-card
              :key="item.productId"
              :num="item.quantity"
              :price="item.price"
              :title="item.productName"
              :thumb="item.pic"
              class="mb-2"
            >
            </van-card>
          </div>
        </div>
      </van-tab>

    </van-tabs>
  </div>
</template>
