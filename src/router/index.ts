import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: import('@/layouts/index.vue'),
            name: "index",
            redirect: '/login',
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
                                    name: "tabs",
                                    component: () => import('@/components/home/Tabs.vue'),
                                }
                            ]
                        },
                        {
                            path: '/shopcart',
                            name: 'shopcart',
                            component: () => import('@/view/shopCart/ShopCart.vue'),
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
                },
                {
                    path: '/manager',
                    name: "manager",
                    component: () => import('@/view/manager/index.vue'),
                },
                {
                    path: '/subscribe',
                    name: "subscribe",
                    component: () => import('@/view/subscribe/index.vue'),
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
