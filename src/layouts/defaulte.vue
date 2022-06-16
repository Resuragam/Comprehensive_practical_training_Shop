<script lang='ts' setup name="defaulte">

import tarbar from "@/components/tarbar/Tarbar.vue";

</script>
<template>
  <!-- <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component"/>
    </keep-alive>
  </router-view> -->
  <router-view></router-view>
  <div class="fixed bottom-0 left-0 w-100vw">
    <tarbar></tarbar>
  </div>
</template>

