import { defineAsyncComponent } from 'vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('@/layouts/index.vue'),
            name: "index",
            redirect: '/index',
            children: [
                {
                    path: '/index',
                    name: 'defaulte',
                    component: () => import('@/layouts/defaulte.vue'),
                    redirect: '/home',
                    children: [
                        {
                            path: '/home',
                            name: 'home',
                            component: () => import('@/view/home/Home.vue'),
                            redirect: '/home/goods',
                            children: [
                                {
                                    path: '/home/goods',
                                    name: "Goods",
                                    component: () => import('@/components/goods/Good.vue'),
                                }
                            ]
                        },
                        {
                            path: '/shopcart',
                            name: 'shopcart',
                            component: () => import('@/components/shopCart/ShopCart.vue'),
                        },
                        {
                            path: '/my',
                            name: 'my',
                            component: () => import('@/view/my/my.vue'),
                        },
                    ]
                },
                {
                    path: '/favorite',
                    name: 'favorite',
                    component: () => import('@/view/favorite/index.vue'),
                },
                {
                    path: '/search',
                    name: 'search',
                    component: () => import('@/view/search/index.vue'),
                },
                {
                    path: '/good',
                    name: "goodInfo",
                    component: () => import('@/view/goods/Index.vue'),
                },
                {
                    path: '/brand',
                    name: "brand",
                    component: () => import('@/view/brand/index.vue'),
                },
                {
                    path: '/pay',
                    name: "pay",
                    component: () => import('@/view/pay/index.vue'),
                    redirect: '/pay/notdelivery',
                    children: [
                        {
                            path: '/pay/notdelivery',
                            name: "userNotDelivery",
                            component: () => import('@/components/pay/NotDeliveryList.vue'),
                        },
                        {
                            path: '/pay/delivery',
                            name: "userDelivery",
                            component: () => import('@/components/pay/DeliveryList.vue'),
                        },
                        {
                            path: '/pay/receipt',
                            name: "userReceipt",
                            component: () => import('@/components/pay/ReceiptList.vue'),
                        }
                    ]
                },
                {
                    path: '/manager',
                    name: "manager",
                    component: () => import('@/view/manager/index.vue'),
                    redirect: '/manager/notdelivery',
                    children: [
                        {
                            path: '/manager/notdelivery',
                            name: "brandNotDelivery",
                            component: () => import('@/components/pay/NotDeliveryList.vue'),
                        },
                        {
                            path: '/manager/delivery',
                            name: "brandDelivery",
                            component: () => import('@/components/pay/DeliveryList.vue'),
                        },
                        {
                            path: '/manager/receipt',
                            name: "brandReceipt",
                            component: () => import('@/components/pay/ReceiptList.vue'),
                        }
                    ]
                },
                {
                    path: '/subscribe',
                    name: "subscribe",
                    component: () => import('@/view/subscribe/index.vue'),
                },
                {
                    path: '/audit',
                    name: "audit",
                    component: () => import('@/view/audit/index.vue'),
                    redirect: '/audit/notAudit',
                    children: [
                        {
                            path: '/audit/notAudit',
                            name: "goodsNotAudit",
                            component: () => import('@/components/audit/NotAudit.vue'),
                        },
                        {
                            path: '/audit/hasAudit',
                            name: "goodsAudit",
                            component: () => import('@/components/audit/HasAudit.vue'),
                        },
                    ]
                },
                {
                    path: '/login',
                    name: "login",
                    component: () => import('@/view/login/Login.vue'),
                },
                {
                    path: '/register',
                    name: "register",
                    component: () => import('@/view/register/Index.vue'),
                },
                {
                    path: '/test',
                    name: "test",
                    component: () => import('@/view/test/index.vue'),
                },
            ]
        },
    ]
})

export default router
