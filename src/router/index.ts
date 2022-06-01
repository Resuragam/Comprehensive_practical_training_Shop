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
                    redirect: '/home/recommend',
                    children: [
                        {
                            path: '/home/recommend',
                            name:'recommend',
                            component: () => import('@/view/home/Recommend.vue'),
                        },
                        {
                            path: '/home/:good',
                            name:"good",
                            component: () => import('@/view/home/Good.vue'),
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
    ]
})

export default router
