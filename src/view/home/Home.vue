<script lang='ts' setup name="home">
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import navbar from "@/components/home/Navbar.vue";
const route = useRoute();


console.log(route.path);
</script>

<template>
  <navbar></navbar>
  <router-view></router-view>
</template>
