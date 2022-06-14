<script lang='ts' setup>
import { ref } from "vue";
const loading = ref(false);
const onRefresh = () => {
  location.reload();
};
</script>

<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh" class="h-full">
    <router-view></router-view>
  </van-pull-refresh>
</template>

