<script lang="ts">
export default {
  name: "notDelivery",
};
</script>
<script lang='ts' setup>
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import {
  getOrderInfo,
  getNotDeliveryList,
  brandDeliveryGoods,
} from "@/api/order";
import { Toast } from "vant";

const store = useStore();
const userId = store.state.user.userId;
// const identity = store.state.user.identity;

const props = defineProps({
  identity: {
    type: String,
  }
})

const notDeliveryList: Array<Order.OrderInfo> = reactive([]); // 未支付的订单数据
const notDeliveryInfoList: Array<Order.OrderDetailsInfo> = reactive([]);

const loading = ref(true); // 优化加载

onMounted(() => {
  getNotDeliveryList(userId, String(props.identity)).then((res: any) => {
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
        loading.value = false;
      });
    } else {
      Toast.fail({
        message: "获取订单数据失败，请重试",
      });
    }
  });
});

// 商家发货
const deliveryGoods = (orderId: string, index: number) => {
  brandDeliveryGoods(orderId).then((res: any) => {
    if (res.code === 20000) {
      Toast.success({
        message: "发货成功",
        onClose() {
          notDeliveryInfoList.splice(index, 1);
        },
      });
    } else {
      Toast.fail("发货失败，请重试");
    }
  });
};

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
        v-if="notDeliveryInfoList.length === 0"
      />
      <div
        v-for="(notDeliveryInfoListItem, index) in notDeliveryInfoList"
        :key="notDeliveryInfoListItem.id"
      >
        <van-swipe-cell>
          <van-card
            :num="notDeliveryInfoListItem.quantity"
            :price="
              notDeliveryInfoListItem.price *
              Number(notDeliveryInfoListItem.quantity)
            "
            :title="notDeliveryInfoListItem.productName"
            :thumb="notDeliveryInfoListItem.pic"
            class="mb-2"
          />
          <template #right v-if="String(identity) === '0'">
            <van-button
              square
              text="发货"
              type="primary"
              class="primary-button h-full"
              @click="deliveryGoods(notDeliveryInfoListItem.orderId, index)"
            />
          </template>
        </van-swipe-cell>
      </div>
    </div>
  </van-pull-refresh>
</template>

<style>
</style>
