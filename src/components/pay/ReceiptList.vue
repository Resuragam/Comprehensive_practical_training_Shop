<script lang="ts">
export default {
  name: "receipt",
};
</script>
<script lang='ts' setup>
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { getOrderInfo, getreciptList } from "@/api/order";
import { Toast } from "vant";

const store = useStore();
const userId = store.state.user.userId;
const identity = store.state.user.identity;

const receiptList: Array<Order.OrderInfo> = reactive([]); // 未支付的订单数据
const receiptInfoList: Array<Order.OrderDetailsInfo> = reactive([]);

const loading = ref(true); // 优化加载

onMounted(() => {
  getreciptList(userId, identity).then((res: any) => {
    console.warn(res);
    if (res.code === 20000) {
      const promiseList: Array<any> = [];
      res.data.list.forEach((item: Order.OrderInfo) => {
        receiptList.push(item);
      });
      receiptList.forEach((receiptListItem: Order.OrderInfo) => {
        promiseList.push(getOrderInfo(receiptListItem.orderId));
      });
      Promise.all(promiseList).then((propmiseValue: any) => {
        console.warn(propmiseValue);
        propmiseValue.forEach((res: any) => {
          if (res.code === 20000) {
            receiptInfoList.push(res.data.orderItem);
          }
        });
        loading.value = false;
      });
    } else {
      Toast.fail({
        message: "获取订单数据失败，请重试",
      });
    }
  });
});

// 下拉刷新加载
const isLoading = ref(false);
const onRefresh = () => {
  location.reload();
  isLoading.value = false;
};
</script>

<template>
  <van-pull-refresh
    v-model="isLoading"
    success-text="刷新成功"
    @refresh="onRefresh"
  >
    <div v-if="loading" class="text-center m-2">
      <van-loading type="spinner" />
    </div>
    <div v-else>
      <van-empty
        description="暂无未收货的商品"
        v-if="receiptInfoList.length === 0"
      />
      <div
        v-for="receiptInfoListItem in receiptInfoList"
        :key="receiptInfoListItem.id"
      >
        <van-card
          :num="receiptInfoListItem.quantity"
          :price="
            receiptInfoListItem.price * Number(receiptInfoListItem.quantity)
          "
          :title="receiptInfoListItem.productName"
          :thumb="receiptInfoListItem.pic"
          class="mb-2"
        />
      </div>
    </div>
  </van-pull-refresh>
</template>

<style>
</style>
