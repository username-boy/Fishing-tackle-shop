import {createRouter, createWebHistory} from 'vue-router'

// 四个主要的页面不能使用懒加载
import HomeView from '@/views/home/HomeView.vue' //主页
import CategoryView from "@/views/category/CategoryView" // 分类页
import CartView from '@/views/cart/CartView.vue' // 购物车页面
import MineView from "@/views/mine/MineView"  // 我的页面

const routes = [
    {
        path: '/',
        component: HomeView
    },
    {
        path: '/shopcar',
        component: CartView
    },
    {
        path: '/category',
        component: CategoryView
    },
    {
        path: '/mine',
        component: MineView
    },
    {
        path: '/cate',
        component: () => import('@/views/cate/Cate.vue')
    },

    {
        path: '/product-list',
        component: () => import("@/views/product/ProductList.vue")
    },
    {
        // 使用动态路由占位，id --> 表示商品的id
        path: '/product-detail/:id',
        component: () => import("@/views/product/ProductDetail.vue")
    },
    {
        path: '/userinfo/:userId',
        component: () => import("@/views/userinfo/UserInfo.vue")
    },
    {
        path: '/login',
        component: () => import("@/views/login/Login.vue")
    },
    {
        path: '/register',
        component: () => import("@/views/register/Register.vue")
    },
    {
        path: '/order',
        component: () => import("@/views/order/Order.vue")
    },
    {
        path: '/collect',
        component: () => import("@/views/collect/Collect.vue")
    },
    {
        path: '/my-address',
        component: () => import("@/views/address/MyAddress.vue")
    },
    {
        path: '/add-address',
        component: () => import("@/views/address/modules/AddAddress.vue")
    },
    {
        path: '/edit-address/:idx',
        component: () => import("@/views/address/modules/EditAddress.vue")
    },
    {
        path: '/wallet',
        component: () => import("@/views/wallet/Wallet.vue")
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
