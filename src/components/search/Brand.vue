<script lang='ts' setup name="brand">
import { reactive, ref } from "vue";
import { searchBrand } from "../../api/search";
const list = ref([]);
interface BrandInfo {
  brandId: string;
  sroteName: string;
  avatar: string;
  categoryId: string;
}

const brandInfo: Array<BrandInfo> = reactive([]);

const props = defineProps({
  storeName: {
    type: String,
  },
});
const onLoad = () => {
    searchBrand(String(props.storeName), 1, 100).then((res: any) => {
      console.warn(res)
  });
};
</script>

<template>
  <div>
    <van-list @load="onLoad">
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
  </div>
</template>
