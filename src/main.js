import Vue from 'vue'
import App from './App.vue'

//导入路由包
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//导入格式化时间插件
import moment from 'moment'
//定义全局过滤器
Vue.filter('dateFormat',function(dataStr,pattern = 'YYYY-MM-DD hh:mm:ss') {
  return moment(dataStr).format(pattern)
})

//导入Mint-UI的组件
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

//导入MUI样式
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

//导入图片查看器
import VuePreview from 'vue2-preview'
Vue.use(VuePreview)

//导入axios并配置
import axios from 'axios'
axios.defaults.headers['Content-type'] = 'application/json';
Vue.prototype.$http = axios;

//导入vuex并配置
import Vuex from 'vuex'
Vue.use(Vuex)


let shopCar = JSON.parse(localStorage.getItem('shopCar') || '[]')
const store = new Vuex.Store({
  state: {
    shopCar: shopCar
  },
  mutations: {
    //添加商品至购物车
    addToShopcar(state,goodsinfos) {
      let flag = false;
      state.shopCar.some(item => {
        if(item.id == goodsinfos.id) {
          item.count += parseInt(goodsinfos.count);
          flag = true;
          return true;
        }
      })
      if(!flag) {
        state.shopCar.push(goodsinfos)
      }
      localStorage.setItem('shopCar',JSON.stringify(state.shopCar))
    },
    //修改购物车商品数量
    changeShopcarCount(state,goodsinfos) {
      state.shopCar.some(item =>{
        if(item.id == goodsinfos.id) {
          item.count = parseInt(goodsinfos.count);
          return true;
        }
      })
      localStorage.setItem('shopCar',JSON.stringify(state.shopCar))
    },
    //删除购物车商品
    removeShopcarCount(state,id) {
      state.shopCar.some((item,i) =>{
        if(item.id == id) {
          state.shopCar.splice(i,1);
          return true;
        }
      })
      localStorage.setItem('shopCar',JSON.stringify(state.shopCar))
    },
    //同步购物车商品勾选状态
    updateShopcarSelect(state,obj) {
      state.shopCar.some(item =>{
        if(item.id == obj.id) {
          item.selected = obj.selected;
        }
      })
      localStorage.setItem('shopCar',JSON.stringify(state.shopCar))
    }
  },
  getters: {
    //获取所有购物商品数量
    getAllCount(state) {
      let badgeCount = 0;
      state.shopCar.forEach(item => {
        badgeCount += item.count;
      });
      return badgeCount;
    },
    //获取购物车商品数量
    getShopcarCount(state) {
      let obj = {};
      state.shopCar.forEach(item =>{
        obj[item.id] = item.count;
      })
      return obj;
    },
    //获取商品购买状态
    getSelected(state) {
      let obj = {};
      state.shopCar.forEach(item =>{
        obj[item.id] = item.selected;
      })
      return obj;
    },
    //计算商品总价与总件数
    getShopcarTotprice(state) {
      let obj = {
        count: 0,
        totprice: 0
      }
      state.shopCar.forEach(item => {
        if(item.selected) {
          obj.count += item.count;
          obj.totprice += item.count*item.price;
        }
      })
      return obj;
    }
  }
})


Vue.config.productionTip = false

import router from './router'

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
