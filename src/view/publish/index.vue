<script lang='ts' setup>
import { brandReleaseProduct } from "@/api/goods";
import { Toast } from "vant";
import { reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const route = useRoute();
const store = useStore();

const brandId = store.state.user.userId;

const onClickLeft = () => router.push("/my");

const productPublishFormData: Goods.GoodInfo = reactive({
  brandId: brandId, // 商家id
  categoryId: "0", // 类别id example: 0,1,2,3,4,5,6分别对应鞋类、潮服、手表、箱包、配饰、数码
  productName: "", // 商品名字
  pic: "", // 商品图片
  sale: "0", // 销量
  price: "", // 商品价格
  detailDesc: "", // 商品详情
  stock: "0", // 库存数量
  description: "", // 商品描述
});

// 选择器参数
const showPicker = ref(false);
const pickerResult = ref("");
const columns = ["鞋类", "潮服", "手表", "箱包", "配饰", "数码"];
const onConfirm = (value: string, index: number) => {
  pickerResult.value = value;
  productPublishFormData.categoryId = String(index);
  showPicker.value = false;
};

const onSubmit = () => {
  brandReleaseProduct(
    productPublishFormData.brandId,
    String(productPublishFormData.categoryId),
    productPublishFormData.productName,
    productPublishFormData.pic,
    String(productPublishFormData.sale),
    String(productPublishFormData.price),
    productPublishFormData.detailDesc,
    String(productPublishFormData.stock),
    productPublishFormData.description
  ).then((res: any) => {
    console.warn(res);
    if (res.code === 20000) {
      Toast.success({
        message: "发布成功",
        onClose() {
          location.reload();
        },
      });
    } else {
      Toast.fail("发布失败，请重试");
    }
  });
};
</script>

<template>
  <van-nav-bar
    title="商品发布"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  <van-form @submit="onSubmit">
    <van-field
      v-model="productPublishFormData.productName"
      name="商品名称"
      label="商品名"
      placeholder="请输入商品名"
      :rules="[{ required: true, message: '请填写商品名' }]"
    />
    <van-field
      v-model="pickerResult"
      is-link
      readonly
      name="picker"
      label="类别"
      placeholder="点击选择商品类别"
      @click="showPicker = true"
    />
    <van-popup v-model:show="showPicker" position="bottom">
      <van-picker
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
    <van-field
      v-model="productPublishFormData.price"
      name="价格"
      label="价格"
      placeholder="请输入商品价格"
      :rules="[{ required: true, message: '请填写商品价格' }]"
    />
    <van-field
      v-model="productPublishFormData.pic"
      name="商品图片"
      label="商品图片"
      placeholder="请输入商品图片链接"
      :rules="[{ required: true, message: '请填写商品图片链接' }]"
    />
    <div class="text-center my-2">
      <van-image width="100" height="130" :src="productPublishFormData.pic" />
    </div>
    <van-field
      v-model="productPublishFormData.detailDesc"
      name="商品详情"
      label="商品详情"
      placeholder="请输入商品详情链接"
      :rules="[{ required: true, message: '请填写商品详情图片链接' }]"
    />
    <div class="text-center my-2">
      <van-image
        width="100"
        height="130"
        :src="productPublishFormData.detailDesc"
      />
    </div>
    <van-field
      v-model="productPublishFormData.description"
      name="商品描述"
      label="商品描述"
      placeholder="请输入商品描述链接"
      :rules="[{ required: true, message: '请填写商品描述图片链接' }]"
    />
    <div class="text-center my-2">
      <van-image
        width="100"
        height="130"
        :src="productPublishFormData.description"
      />
    </div>
    <div class="m-5">
      <van-button round-4 block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
  <div class="h-2"></div>
</template>