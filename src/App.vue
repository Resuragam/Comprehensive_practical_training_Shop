<script lang='ts' setup>
import { ref } from "vue";
const loading = ref(false);
const onRefresh = () => {
  location.reload();
};
</script>

<template>
  <router-view></router-view>
</template>

