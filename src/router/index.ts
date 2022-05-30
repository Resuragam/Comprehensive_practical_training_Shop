import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/login',
            name: "login",
            component: () => import('../view/Home.vue'),
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('../view/Home.vue'),
        }
  ]
})

export default router
