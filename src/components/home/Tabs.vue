<script lang='ts' setup name="tabs">
import { ref, onBeforeUnmount, reactive, onMounted } from "vue";
import { useRoute,useRouter } from "vue-router";
import { selectAll } from "../../api/category";
import good from "@/components/goods/Good.vue";

const route = useRoute();

interface CategoryItem {
  categoryId: number;
  categoryName: string;
}


// const active = ref(Number(route.params.categoryId));
const active = ref(1);

let categoryList: Array<CategoryItem> = reactive([]);

onMounted(() => {
  selectAll().then((res: any) => {
    res.data.list.forEach((element: any) => {
      categoryList.push(element);
    });
  });
});

onBeforeUnmount(() => {
  console.warn("tabs即将被销毁");
});

</script>

<template>
  <van-tabs v-model:active="active" color="#000000" swipeable>
    <van-tab v-for="categoryListItem in categoryList" :title="categoryListItem.categoryName">
      <!-- <router-view name="good"></router-view> -->
      <good :categoryId="active + 1"></good>
    </van-tab>
  </van-tabs>
</template>
