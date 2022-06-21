<script lang="ts">
export default {
  name: "NotAudit",
};
</script>

<script lang='ts' setup>
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import {
  getBrandNotAuditProduct,
} from "@/api/audit";
import { Toast } from "vant";

const store = useStore();
const userId = store.state.user.userId;

const notAuditProductList: Array<Goods.GoodInfo> = reactive([]); // 已经审核的订单数据

let current = ref(1);
const listLoading = ref(false);
const finished = ref(false);
const limit = 4;

const onLoad = () => {
  setTimeout(() => {
    getBrandNotAuditProduct(userId, current.value, limit).then((res: any) => {
      if (res.code === 20000) {
        res.data.rows.forEach((item: any) => {
          notAuditProductList.push(item);
        });
        // 加载状态结束
        listLoading.value = false;
        current.value = current.value + 1;
        // 数据全部加载完成
        if (res.data.rows.length < limit) {
          finished.value = true;
        }
      }
    });
  }, 500);
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
    <div>
      <van-empty
        description="暂无已审核的商品"
        v-if="notAuditProductList.length === 0 && finished"
      />
      <van-list
        v-model:loading="listLoading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div
          v-for="(notAuditProductListItem, index) in notAuditProductList"
          :key="notAuditProductListItem.productId"
        >
          <van-card
            :price="notAuditProductListItem.price"
            :tag="notAuditProductListItem.status ? '已上架' : '未上架'"
            :title="notAuditProductListItem.productName"
            :thumb="notAuditProductListItem.pic"
            class="mb-2"
          />
        </div>
      </van-list>
    </div>
  </van-pull-refresh>
</template>

<style>
</style>
