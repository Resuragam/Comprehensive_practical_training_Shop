import { createRouter, createWebHistory } from 'vue-router'
import layout from '@/layouts/defaulte.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: layout,
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
})

export default router
