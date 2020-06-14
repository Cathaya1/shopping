<template>
  <div>
    <div class="goodsinfo-container" v-for="item in goodsinfo" :key="item.goods_id">
      <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
        <div class="global" v-show="flag" ref="global"></div>
      </transition>

      <!-- 商品轮播图 -->
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-swipe :auto="4000">
              <mt-swipe-item v-for="item in goodslunbo" :key="item.goods_id">
                <img :src="item.goods_url">
              </mt-swipe-item>
            </mt-swipe>
          </div>
        </div>
      </div>

      <!-- 商品价格 -->
      <div class="mui-card">
        <div class="mui-card-header">{{item.goods_title}}</div>
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <p class="goods-price">
              市场价：
              <span class="old-price">{{item.old_price}}</span>&nbsp;&nbsp;
              销售价：
              <span class="sell-price">{{item.sell_price}}</span>
            </p>
            <p class="goods-number">
              购买数量：
              <numbox @getcount="getCount" :max="item.goods_number"></numbox>
            </p>
            <p class="goods-button">
              <mt-button type="primary" size="small">立即购买</mt-button>&nbsp;&nbsp;
              <mt-button type="danger" size="small" @click="addToShopcar">加入购物车</mt-button>
            </p>
          </div>
        </div>
      </div>

      <!-- 商品参数 -->
      <div class="mui-card">
        <div class="mui-card-header">商品参数</div>
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <p>商品货号:{{item.goods_item}}</p>
            <p>库存情况:{{item.goods_number}}</p>
            <p>上架时间:{{item.goods_time | dateFormat}}</p>
          </div>
        </div>
        <div class="mui-card-footer">
          <mt-button type="primary" size="large" @click="toComment">商品评论</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import numbox from "../subcomments/goodsinfo_numbox";
export default {
  data() {
    return {
      goodslunbo: [],
      goodsinfo: [],
      id: this.$route.params.id,
      flag: false,
      count: 1
    };
  },
  created() {
    this.getGoodslunbo();
    this.getGoodsinfo();
  },
  components: {
    numbox
  },
  methods: {
    //获取商品轮播图
    getGoodslunbo() {
      this.$http
        .get("http://119.23.71.230:11111/addgoodslunbo", {
          params: { id: this.id }
        })
        .then(res => {
          if (res.data.code === "ok") {
            this.goodslunbo = res.data.data;
          } else {
            Toast("加载失败");
          }
        });
    },
    //获取商品详情
    getGoodsinfo() {
      this.$http
        .get("http://119.23.71.230:11111/addgoodsinfo", {
          params: { id: this.id }
        })
        .then(res => {
          if (res.data.code === "ok") {
            this.goodsinfo = res.data.data;
          } else {
            Toast("加载失败");
          }
        });
    },
    //跳转到评论页面
    toComment() {
      this.$router.push({ path: "/home/comment" });
    }, 
    //加入购物车动画
    addToShopcar() {
      this.flag = !this.flag;
      //console.log(this.goodsinfo[0].goods_id)
      let goodsinfos = {
        id: this.goodsinfo[0].goods_id,
        count: this.count,
        price: this.goodsinfo[0].sell_price,
        selected: true
      };
      this.$store.commit('addToShopcar',goodsinfos)
    },
    beforeEnter(el) {
      el.style.transform = 'translate(0,0)';
    },
    enter(el, done) {
      el.offsetWidth;
      //getBoundingClientRect()
      //console.log(this.$refs.global);
      //console.log(document.getElementById("badge"));
      const globalPosition_left = this.$refs.global[0].offsetLeft;
      const globalPosition_top = this.$refs.global[0].offsetTop;
      const badgePosition_left = document
        .getElementById("badge")
        .offsetLeft;
      const badgePosition_top = document
        .getElementById("badge")
        .offsetTop;
      const global_x = globalPosition_left - badgePosition_left;
      const global_y = globalPosition_top - badgePosition_top;
      el.style.transform = `translate(${global_x}px,${global_y}px)`;
      el.style.transition = "all 0.5s cubic-bezier(.17,.67,.83,.67) ";
      done();
    },
    afterEnter() {
      this.flag = !this.flag;
    },
    getCount(count) {
      this.count = count;
      //console.log("父组件拿到的numbox值为："+this.count)
    }
  }
};
</script>

<style lang="scss" scoped>
.goodsinfo-container {
  .global {
    width: 18px;
    height: 18px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    top: 408px;
    left: 149px;
    z-index: 99;
  }
  .mint-swipe {
    height: 200px;
    .mint-swipe-item {
      text-align: center;
      img {
        width: 80%;
        height: 100%;
      }
    }
  }
  .goods-price {
    .old-price {
      text-decoration: line-through;
    }
    .sell-price {
      color: red;
      font-size: 16px;
    }
  }
}
</style>

