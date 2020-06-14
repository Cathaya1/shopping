//抽离路由
import VueRouter from 'vue-router'
import home from './components/tabbar/home.vue'
import member from './components/tabbar/member.vue'
import shopcar from './components/tabbar/shopcar.vue'
import search from './components/tabbar/search.vue'
import newslist from './components/news/newslist.vue'
import newsinfo from './components/news/newsinfo.vue'
import photolist from './components/photos/photolist.vue'
import photoinfo from './components/photos/photoinfo.vue'
import goodslist from './components/goodslist/goodslist.vue'
import goodsinfo from './components/goodslist/goodsinfo.vue'
import comment from './components/subcomments/comment.vue'

//创建路由对象
const router = new VueRouter({
    routes: [
        { path: '/' , redirect: '/home' },
        { path: '/home', component: home },
        { path: '/member', component: member },
        { path: '/shopcar', component: shopcar },
        { path: '/search', component: search },
        { path: '/home/newslist', component: newslist },
        { path: '/home/newsinfo/:id', component: newsinfo },
        { path: '/home/photolist', component: photolist },
        { path: '/home/photoinfo/:id_title/:id', component: photoinfo },
        { path: '/home/goodslist', component: goodslist },
        { path: '/home/goodsinfo/:id', component: goodsinfo },
        { path: '/home/comment', component: comment }
    ],
    linkActiveClass: 'mui-active'
})

export default router