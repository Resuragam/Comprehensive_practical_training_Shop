<script lang='ts' setup name="tabs">
import { ref, onBeforeUnmount, reactive, onMounted } from "vue";
import { useRoute,useRouter } from "vue-router";
import { selectAll } from "../../api/category";
import good from "@/components/goods/Good.vue";
interface CategoryItem {
  categoryId: number;
  categoryName: string;
}
const route = useRoute();
const router = useRouter();
console.warn(route)
const active = ref(0);

let categoryList: Array<CategoryItem> = reactive([]);

onMounted(() => {
  selectAll().then((res: any) => {
    console.warn(res)
    res.data.list.forEach((element: any) => {
      categoryList.push(element);
    });
    console.warn(categoryList);
  });
});

onBeforeUnmount(() => {
  console.warn("tabs即将被销毁");
});

</script>

<template>
  <van-tabs v-model:active="active" color="#000000" swipeable>
    <van-tab v-for="item in categoryList" :title="item.categoryName">
      <!-- <router-view name="good"></router-view> -->
      <good :categoryId="active + 1"></good>
    </van-tab>
  </van-tabs>
</template>
