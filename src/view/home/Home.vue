<script lang='ts' setup name="home">
import search from "@/components/home/Search.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
// location.reload()
const loading = ref(false);

</script>

<template>
  <search></search>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
