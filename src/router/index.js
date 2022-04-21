import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
    {
        path: "/",
        redirect: "/layout" // 重定向
    },
    {
        path: "/layout",
        component: () => import('@/views/Layout'),
        redirect: "/layout/home", // 重定向
        children: [
            {
                path: "home",
                component: () => import('@/views/Home'),
                // meta保存额外路由信息
                meta: {
                    title: "Home"
                }
            },
            {
                path: "search",
                component: () => import('@/views/Search'),
                meta: {
                    title: "Search"
                }
            }
        ]
    },
    {
        path: "/play",
        component: () => import('@/views/Play')
    }
]
const router = new VueRouter({
    routes
})
export default router
