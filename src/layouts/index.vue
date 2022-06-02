<script lang='ts' setup name="index">
</script>

<template>
    <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component"/>
    </keep-alive>
  </router-view>
</template>

