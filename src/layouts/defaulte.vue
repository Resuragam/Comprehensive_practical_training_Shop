<script lang='ts' setup>
import tarbar from "@/components/tarbar/Tarbar.vue";
</script>

<template name="layout">
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component"/>
    </keep-alive>
  </router-view>
  <div class="fixed bottom-0 left-0 w-100vw">
    <tarbar></tarbar>
  </div>
</template>

