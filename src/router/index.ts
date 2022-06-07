import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: import('@/layouts/index.vue'),
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
                    path: '/setting',
                    name: 'setting',
                    component: () => import('@/view/setting/index.vue'),
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
                    meta: {
                        keepAlive: false //需要被缓存
                    }
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
            ]
        },
    ]
})

export default router
