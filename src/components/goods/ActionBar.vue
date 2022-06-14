<script lang="ts" setup name="actionBar">
import { getUserCheckAttend, userAttendProduct } from "@/api/user";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { addToCart } from "@/api/shopcart";
import { Dialog, Toast } from "vant";
import { userCreateOrder, userPayOrder } from "@/api/order";
const store = useStore();
const route = useRoute();
const router = useRouter();

interface GoodInfo {
  productId: string;
  brandId: string;
  categoryId: number;
  productName: string;
  pic: string;
  checkStatus: number;
  status: number;
  sale: number;
  price: number;
  detailDesc: string;
  stock: number;
  description: string;
}

// 用户收藏商品操作
const userId = ref(store.state.user.userId);
const productId = ref(String(route.query.productId));
const brandId = ref(String(route.query.brandId));

const props = defineProps({
  goodInfo: {
    type: Object,
    default: {},
  },
});

// 收藏商品
const star = ref(false);
onMounted(() => {
  console.warn("******", userId.value, productId.value);
  getUserCheckAttend(userId.value, productId.value).then((res: any) => {
    console.warn("收藏情况：", res);
    if (res.code === 20000) {
      if (res.message === "未收藏") {
        star.value = false;
      } else {
        star.value = true;
      }
    }
  });
});

const getstart = () => {
  userAttendProduct(userId.value, String(productId.value)).then((res: any) => {
    console.warn(res);
    if (res.code === 20000) {
      if (res.message === "收藏成功") {
        Toast.success({
          message: "收藏成功",
          onClose() {
            star.value = true;
          },
        });
      } else {
        Toast.success({
          message: "取消收藏",
          onClose() {
            star.value = false;
          },
        });
      }
    } else {
      Toast.fail({
        message: "请重试",
      });
    }
  });
};

// 店铺前往
const toBrand = () => {
  router.push({
    path: "/brand",
    query: {
      brandId: brandId.value,
    },
  });
};

// 购物车
const toShopCart = () => {
  router.push({
    path: "/shopcart",
  });
};

// 添加购物车
const addShopcart = () => {
  console.warn("props.goodInfo", props.goodInfo);
  const pic = props.goodInfo.pic;
  const productName = props.goodInfo.productName;
  const price = props.goodInfo.price;
  const quantity = 1;
  console.warn(quantity);
  addToCart(
    productId.value,
    userId.value,
    brandId.value,
    pic,
    productName,
    price,
    String(quantity)
  ).then((res: any) => {
    console.warn("添加购物车", res);
    if (res.code === 20000) {
      Toast.success({
        message: "成功加入购物车",
      });
    } else {
      Toast.fail({
        message: "加入失败，请重试",
      });
    }
  });
};

const onSubmit = () => {
  let list: any = [];
  const listItem = {
    brandId: brandId.value,
    payType: 0,
    totalAmount: props.goodInfo.price,
    status: 0,
    address: "HNUST",
    userId: userId.value,
  };
  list.push(listItem);
  console.warn("list", list);
  if (list.length !== 0) {
    Dialog.confirm({
      message: "确认支付",
    }).then(() => {
      userCreateOrder(list).then((res: any) => {
        console.warn(res);
        if (res.code === 20000) {
          // 执行订单创建操作
          let paylist: any = [];
          let payHasList: any = [];
          const listItem = {
            orderId: res.data.order[0].orderId,
            orderSn: res.data.order[0].orderSn,
            userId: userId.value,
            productId: props.goodInfo.productId,
            pic: props.goodInfo.pic,
            productName: props.goodInfo.productName,
            price: props.goodInfo.price,
            quantity: props.goodInfo.quantity,
            brought: {
              productId: props.goodInfo.productId,
              userId: userId.value,
            },
          };
          paylist.push(listItem);
          payHasList.push(props.goodInfo.productId);
          console.warn(paylist);
          userPayOrder(paylist).then((res: any) => {
            console.warn(res);
            if (res.code === 20000) {
              Toast.success({
                message: "支付成功",
              });
            } else {
              Toast.fail({
                message: "支付失败，请重试",
              });
            }
          });
        }
      });
    });
  } 
};
</script>

<template>
  <div>
    <van-action-bar>
      <van-action-bar-icon
        icon="shop"
        text="店铺"
        color="#ff5000"
        @click="toBrand()"
      />
      <van-action-bar-icon icon="cart-o" text="购物车" @click="toShopCart()" />
      <van-action-bar-icon
        :icon="star ? 'star' : 'star-o'"
        text="收藏"
        :color="star ? '#ff5000' : ''"
        @click="getstart()"
      />
      <van-action-bar-button
        type="warning"
        text="加入购物车"
        @click="addShopcart()"
      />
      <van-action-bar-button type="danger" text="立即购买" @click="onSubmit"/>
    </van-action-bar>
  </div>
</template>
