<script lang="ts">
export default {
  name: "HasAudit",
};
</script>

<script lang='ts' setup>
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import {
  getBrandHasAuditProduct,
  releaseProduct,
  unreleaseProduct,
} from "@/api/audit";
import { Toast } from "vant";

const store = useStore();
const userId = store.state.user.userId;

const hasAuditProductList: Array<Goods.GoodInfo> = reactive([]); // 已经审核的订单数据

let current = ref(1);
const listLoading = ref(false);
const finished = ref(false);
const limit = 4;

const onLoad = () => {
  setTimeout(() => {
    getBrandHasAuditProduct(userId, current.value, limit).then((res: any) => {
      if (res.code === 20000) {
        res.data.rows.forEach((item: any) => {
          hasAuditProductList.push(item);
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

// 商家上架商品
const brandReleaseProduct = (productId: string, index: number) => {
  releaseProduct(productId).then((res: any) => {
    if (res.code === 20000) {
      Toast.success({
        message: "上架成功",
        onClose() {
          hasAuditProductList[index].status = 1
        },
      });
    } else {
      Toast.fail("请重试");
    }
  });
};

// 商家下架商品
const brandUnReleaseProduct = (productId: string, index: number) => {
  unreleaseProduct(productId).then((res: any) => {
    if (res.code === 20000) {
      Toast.success({
        message: "下架成功",
        onClose() {
          hasAuditProductList[index].status = 0
        },
      });
    } else {
      Toast.fail("请重试");
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
    <div>
      <van-empty
        description="暂无已审核的商品"
        v-if="hasAuditProductList.length === 0 && finished"
      />
      <van-list
        v-model:loading="listLoading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div
          v-for="(hasAuditProductListItem, index) in hasAuditProductList"
          :key="hasAuditProductListItem.productId"
        >
          <van-swipe-cell>
            <van-card
              :price="hasAuditProductListItem.price"
              :tag="hasAuditProductListItem.status ? '已上架' : '未上架'"
              :title="hasAuditProductListItem.productName"
              :thumb="hasAuditProductListItem.pic"
              class="mb-2"
            />
            <template #right>
              <van-button
                square
                :text="hasAuditProductListItem.status?'商品下架':'商品上架'"
                type="primary"
                class="primary-button h-full"
                @click="
                  hasAuditProductListItem.status
                    ? brandUnReleaseProduct(
                        String(hasAuditProductListItem.productId),
                        index
                      )
                    : brandReleaseProduct(
                        String(hasAuditProductListItem.productId),
                        index
                      )
                "
              />
            </template>
          </van-swipe-cell>
        </div>
      </van-list>
    </div>
  </van-pull-refresh>
</template>

<style>
</style>
