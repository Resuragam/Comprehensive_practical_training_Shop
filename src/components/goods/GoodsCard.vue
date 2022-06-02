<script lang='ts' setup name="GoodsCard">
</script>

<template>
  <div class="p-2">
    <div
      class="bg-cover w-45vw h-30vh"
      style="
        background-image: url(https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png);
      "
    >
      <!-- <img
        src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        alt=""
        class=""
      /> -->
    </div>
    <div class="text-xs my-1" style="color: #30323f">
      卡片的标题 你既可以通过设置 header 来修改标题
    </div>
    <div class="flex justify-between">
      <span class="text-sm font-600 items-center">
        <span class="text-xs">¥</span>100
      </span>
      <span class="text-xs flex" style="color: #80808a">7000人付款</span>
    </div>
  </div>
</template>
