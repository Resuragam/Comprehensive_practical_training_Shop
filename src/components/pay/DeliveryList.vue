<script lang="ts">
export default {
  name: "delivery",
};
</script>

<script lang='ts' setup>
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { getOrderInfo, getDeliveryList, userConfirmProduct } from "@/api/order";
import { Toast } from "vant";

const store = useStore();
const userId = store.state.user.userId;
// const identity = store.state.user.identity;

const props = defineProps({
  identity: {
    type: String,
  }
})

const deliveryList: Array<Order.OrderInfo> = reactive([]); // 未支付的订单数据
const deliveryInfoList: Array<Order.OrderDetailsInfo> = reactive([]);

const loading = ref(true); // 优化加载

onMounted(() => {
  getDeliveryList(userId, String(props.identity)).then((res: any) => {
    console.warn(res);
    console.warn("发送请求");
    if (res.code === 20000) {
      const promiseList: Array<any> = [];
      res.data.list.forEach((item: Order.OrderInfo) => {
        deliveryList.push(item);
      });
      deliveryList.forEach((deliveryListItem: Order.OrderInfo) => {
        promiseList.push(getOrderInfo(deliveryListItem.orderId));
      });
      Promise.all(promiseList).then((propmiseValue: any) => {
        console.warn(propmiseValue);
        propmiseValue.forEach((res: any) => {
          if (res.code === 20000) {
            deliveryInfoList.push(res.data.orderItem);
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

// 商家收货
const confirmGoods = (orderId: string, index: number) => {
  userConfirmProduct(orderId).then((res: any) => {
    if (res.code === 20000) {
      Toast.success({
        message: "收货成功",
        onClose() {
          deliveryInfoList.splice(index, 1);
        },
      });
    } else {
      Toast.fail("收货失败，请重试");
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
        v-if="deliveryInfoList.length === 0"
      />
      <div
        v-for="(deliveryInfoListItem, index) in deliveryInfoList"
        :key="deliveryInfoListItem.id"
      >
        <van-swipe-cell>
          <van-card
            :num="deliveryInfoListItem.quantity"
            :price="
              deliveryInfoListItem.price * Number(deliveryInfoListItem.quantity)
            "
            :title="deliveryInfoListItem.productName"
            :thumb="deliveryInfoListItem.pic"
            class="mb-2"
          />
          <template #right v-if="String(identity) === '1'">
            <van-button
              square
              text="收货"
              type="primary"
              class="primary-button h-full"
              @click="confirmGoods(deliveryInfoListItem.orderId, index)"
            />
          </template>
        </van-swipe-cell>
      </div>
    </div>
  </van-pull-refresh>
</template>

<style>
</style>
