<script lang='ts' setup>
import { onMounted, reactive } from "vue";
import { useStore } from "vuex";
import { getOrderInfo, getUserNoOrder } from "@/api/order";
import { Toast } from "vant";
const store = useStore();
const userId = store.state.user.userId;
const notDeliveryList: Array<Order.OrderInfo> = reactive([]); // 未支付的订单数据
const notDeliveryInfoList: Array<Order.OrderDetailsInfo> = reactive([]);

onMounted(() => {
  getUserNoOrder(userId).then((res: any) => {
    console.warn(res);
    if (res.code === 20000) {
      const promiseList: Array<any> = [];
      res.data.list.forEach((item: Order.OrderInfo) => {
        notDeliveryList.push(item);
      });
      notDeliveryList.forEach((notDeliveryListItem: Order.OrderInfo) => {
        promiseList.push(getOrderInfo(notDeliveryListItem.orderId));
      });
      Promise.all(promiseList).then((propmiseValue: any) => {
        console.warn(propmiseValue);
        propmiseValue.forEach((res: any) => {
          if (res.code === 20000) {
            notDeliveryInfoList.push(res.data.orderItem);
          }
        });
      });
    } else {
      Toast.fail({
        message: "获取订单数据失败，请重试",
      });
    }
  });
});
</script>

<template>
  <div>
    <div v-for="notDeliveryInfoListItem in notDeliveryInfoList">
      <van-card
        :num="notDeliveryInfoListItem.quantity"
        :price="notDeliveryInfoListItem.price * Number(notDeliveryInfoListItem.quantity)"
        :title="notDeliveryInfoListItem.productName"
        :thumb="notDeliveryInfoListItem.pic"
        class="mb-2"
      />
    </div>
  </div>
</template>

<style>
</style>
