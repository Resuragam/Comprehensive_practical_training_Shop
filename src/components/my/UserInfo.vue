<script lang='ts' setup name="userInfo">
import { ref } from 'vue';
const avatar = ref(sessionStorage.getItem('avatar'))
const userName = ref(sessionStorage.getItem('userName'))
</script>

<template>
  <div class="p-2" style="background-color: #fafafa">
    <div class="flex">
      <van-image
        round
        width="3rem"
        height="3rem"
        :src="avatar"
      />
      <span class="items-center flex ml-2">{{userName}}</span>
    </div>
  </div>
</template>
