<script lang='ts' setup name="search">
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter()
const searchvalue = ref("nike");
const onSearch = () => { 
  router.push({
    path: "/search",
    query: {
      question:searchvalue.value===''?'nike':searchvalue.value
    }
  })
};
</script>
<template>
  <div>
    <div>
      <van-search
        v-model="searchvalue"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
      >
        <template #action>
          <div class="h-34px">
            <div class="text-center font-mono font-600 leading-5">ALL</div>
            <div class="text-xs leading-3">分类</div>
          </div>
        </template>
      </van-search>
    </div>
  </div>
</template>
