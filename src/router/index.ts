import { createRouter, createWebHashHistory } from 'vue-router'
import layout from '@/layouts/defaulte.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: layout,
            redirect: '/home',
            children: [
                {
                    path: '/home',
                    name: 'home',
                    component: () => import('../view/home/Home.vue'),
                },
                {
                    path: '/shopcart',
                    name: 'shopcart',
                    component: () => import('../view/shopCart/ShopCart.vue'),
                },
                {
                    path: '/my',
                    name: 'my',
                    component: () => import('../view/my/my.vue'),
                },
            ]
        },
        {
            path: '/login',
            name: "login",
            component: () => import('../view/login/Login.vue'),
        },
    ]
})

export default router
