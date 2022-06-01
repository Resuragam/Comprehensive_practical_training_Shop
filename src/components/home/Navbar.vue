<script lang='ts' setup name="navbar">
import { ref } from "vue";
import { Toast } from "vant";
const value = ref("");
const onSearch = (val:any) => Toast(val);
const onClickButton = () => Toast(value.value);
</script>

<template>
  <div>
    <van-search
      v-model="value"
      show-action
      label="地址"
      placeholder="请输入搜索关键词"
      @search="onSearch"
    >
      <template #action>
        <div @click="onClickButton">搜索</div>
      </template>
    </van-search>
  </div>
</template>
