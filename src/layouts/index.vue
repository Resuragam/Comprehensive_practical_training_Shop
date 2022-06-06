<script lang='ts' setup name="index">
</script>

<template>
    <router-view v-slot="{ Component }">
    <keep-alive include="defaulte" exclude="goodInfo">
      <component :is="Component"/>
    </keep-alive>
  </router-view>
</template>

