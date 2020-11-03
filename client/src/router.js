import Vue from 'vue'
import Router from "vue-router";
import Home from "./components/Home.vue";
import Shop from "./components/Shop.vue";
import Favorite from "./components/Favorite.vue";

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/shop',
            name: 'shop',
            component: Shop
        },
        {
            path: '/favorite',
            name: 'favorite',
            component: Favorite
        },
    ]
})

export default router