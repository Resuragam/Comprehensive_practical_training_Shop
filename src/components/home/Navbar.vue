<script lang='ts' setup name="navbar">
import { ref } from "vue";
import { Toast } from "vant";
const value = ref("");
const active = ref(0);
const onSearch = (val: any) => Toast(val);
const onClickButton = () => Toast(value.value);
</script>

<template>
  <div>
    <div>
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
      >
        <template #action>
          <div class="h-34px">
            <div class="text-center font-mono font-600 leading-5">ALL</div>
            <div class="text-xs leading-3">分类</div>
          </div>
        </template>
      </van-search>
    </div>
    <div>
      <van-tabs v-model:active="active" color="#000000">
        <van-tab v-for="index in 8" :title="'标签 ' + index">
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
