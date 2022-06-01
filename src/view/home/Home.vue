<script lang='ts' setup name="home">
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
const route = useRoute();

// 控制navbr
const navbarActive = ref(0);
console.log(route.path);
</script>

<template>
  <navbar></navbar>
</template>
