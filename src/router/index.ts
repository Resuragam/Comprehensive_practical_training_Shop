import { defineAsyncComponent } from 'vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: defineAsyncComponent(() => import('@/layouts/index.vue')),
            name: "index",
            redirect: '/index',
            children: [
                {
                    path: '/index',
                    name: 'defaulte',
                    component: defineAsyncComponent(() => import('@/layouts/defaulte.vue')),
                    redirect: '/home',
                    children: [
                        {
                            path: '/home',
                            name: 'home',
                            component: defineAsyncComponent(() => import('@/view/home/Home.vue')),
                            redirect: '/home/goods',
                            children: [
                                {
                                    path: '/home/goods',
                                    name: "Goods",
                                    component: defineAsyncComponent(() => import('@/components/goods/Good.vue')),
                                }
                            ]
                        },
                        {
                            path: '/shopcart',
                            name: 'shopcart',
                            component: defineAsyncComponent(() => import('@/components/shopCart/ShopCart.vue')),
                        },
                        {
                            path: '/my',
                            name: 'my',
                            component: defineAsyncComponent(() => import('@/view/my/my.vue')),
                        },
                    ]
                },
                {
                    path: '/favorite',
                    name: 'favorite',
                    component: defineAsyncComponent(() => import('@/view/favorite/index.vue')),
                },
                {
                    path: '/search',
                    name: 'search',
                    component: defineAsyncComponent(() => import('@/view/search/index.vue')),
                },
                {
                    path: '/good',
                    name: "goodInfo",
                    component: defineAsyncComponent(() => import('@/view/goods/Index.vue')),
                },
                {
                    path: '/brand',
                    name: "brand",
                    component: defineAsyncComponent(() => import('@/view/brand/index.vue')),
                },
                {
                    path: '/pay',
                    name: "pay",
                    component: defineAsyncComponent(() => import('@/view/pay/index.vue')),
                    redirect: '/pay/notdelivery',
                    children: [
                        {
                            path: '/pay/notdelivery',
                            name: "userNotDelivery",
                            component: defineAsyncComponent(() => import('@/components/pay/NotDeliveryList.vue')),
                        },
                        {
                            path: '/pay/delivery',
                            name: "userDelivery",
                            component: defineAsyncComponent(() => import('@/components/pay/DeliveryList.vue')),
                        },
                        {
                            path: '/pay/receipt',
                            name: "userReceipt",
                            component: defineAsyncComponent(() => import('@/components/pay/ReceiptList.vue')),
                        }
                    ]
                },
                {
                    path: '/manager',
                    name: "manager",
                    component: defineAsyncComponent(() => import('@/view/manager/index.vue')),
                    redirect: '/manager/notdelivery',
                    children: [
                        {
                            path: '/manager/notdelivery',
                            name: "brandNotDelivery",
                            component: defineAsyncComponent(() => import('@/components/pay/NotDeliveryList.vue')),
                        },
                        {
                            path: '/manager/delivery',
                            name: "brandDelivery",
                            component: defineAsyncComponent(() => import('@/components/pay/DeliveryList.vue')),
                        },
                        {
                            path: '/manager/receipt',
                            name: "brandReceipt",
                            component: defineAsyncComponent(() => import('@/components/pay/ReceiptList.vue')),
                        }
                    ]
                },
                {
                    path: '/subscribe',
                    name: "subscribe",
                    component: defineAsyncComponent(() => import('@/view/subscribe/index.vue')),
                },
                {
                    path: '/login',
                    name: "login",
                    component: defineAsyncComponent(() => import('@/view/login/Login.vue')),
                },
                {
                    path: '/register',
                    name: "register",
                    component: defineAsyncComponent(() => import('@/view/register/Index.vue')),
                },
                {
                    path: '/test',
                    name: "test",
                    component: defineAsyncComponent(() => import('@/view/test/index.vue')),
                },
            ]
        },
    ]
})

export default router
