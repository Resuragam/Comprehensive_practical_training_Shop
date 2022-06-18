<script lang="ts">
export default {
  name: "Home",
};
</script>

<script lang='ts' setup>
import { ref, reactive, onMounted } from "vue";
import { selectAll } from "../../api/category";
import search from "@/components/home/Search.vue";

interface CategoryItem {
  categoryId: number;
  categoryName: string;
}

const activePath = ref(0); // 控制tabs

let categoryList: Array<CategoryItem> = reactive([]);

onMounted(() => {
  selectAll().then((res: any) => {
    res.data.list.forEach((categoryItem: CategoryItem) => {
      categoryList.push(categoryItem);
    });
  });
});

</script>

<template>
  <search></search>
  <van-tabs v-model:active="activePath" color="#000000" swipeable>
    <van-tab
      v-for="categoryListItem in categoryList"
      :title="categoryListItem.categoryName"
      :name="categoryListItem.categoryId"
    >
      <router-view v-slot="{ Component }" :categoryId="Number(activePath)">
        <keep-alive include="Good">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </van-tab>
  </van-tabs>
</template>
