<script lang='ts' setup name="home">
import search from "@/components/home/Search.vue";
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<template>
  <div style="background-iamge:url('../../static/img/home/navbar.jpg')">
    <search></search>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>
