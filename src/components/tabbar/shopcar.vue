<template>
  <div>
    <div class="shopcar-container">
      <!-- 商品展示 -->
      <div class="mui-card" v-for="(item,i) in shopcarinfo" :key="item.goods_id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <!-- 开关 -->
            <mt-switch v-model="$store.getters.getSelected[item.id]" @change="selectedChange(item.id,$store.getters.getSelected[item.id])"></mt-switch>
            <img :src="item.goods_url">
            <div class="shopcar-info">
              <h3>{{item.goods_title}}</h3>
              <p class="shopcar-numbox">
                <span class="shopcar-price">￥{{item.sell_price}}</span>
                <span>
                  <numbox
                    :shopCarCount="$store.getters.getShopcarCount[item.id]"
                    :goodsid="item.goods_id"
                  ></numbox>
                </span>
                <a href="#" @click.prevent="remove(item.goods_id,i)">删除</a>
              </p>
            </div>
            <!-- numbox -->
          </div>
        </div>
      </div>

      <!-- 商品结算 -->
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <div class="computed">
              <p>总计(不含运费)</p>
              <p>已勾选商品<b>{{$store.getters.getShopcarTotprice.count}}</b>件,总价:<b>￥{{$store.getters.getShopcarTotprice.totprice}}</b></p>
            </div>
            <mt-button type="danger">去结算</mt-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import numbox from "../subcomments/shopcar_numbox";
export default {
  data() {
    return {
      shopcarinfo: []
    };
  },
  created() {
    this.getShopcarInfo();
  },
  methods: {
    //获取购物车商品信息
    getShopcarInfo() {
      let ids = [];
      this.$store.state.shopCar.forEach(item => {
        ids.push(item.id);
      });
      //console.log(JSON.stringify(ids));
      if (ids.length <= 0) {
        return;
      }
      this.$http
        .post("http://119.23.71.230:11111/addshopcarinfo", { data: ids })
        .then(res => {
          if (res.data.code === "ok") {
            this.shopcarinfo = res.data.data;
          } else {
            Toast("加载失败");
          }
        });
    },
    //删除购物车商品
    remove(id, i) {
      this.shopcarinfo.splice(i, 1);
      this.$store.commit("removeShopcarCount", id);
    },
    //确认购物车商品的勾选状态
    selectedChange(id,val) {
      //console.log(id +'++++'+ val)
      this.$store.commit("updateShopcarSelect",{ id:id,selected:val })
    }
  },
  components: {
    numbox
  }
};
</script>

<style lang="scss" scoped>
.shopcar-container {
  .mui-card-content-inner {
    display: flex;
    align-items: center;
    img {
      width: 60px;
      height: 60px;
    }
    .shopcar-info {
      h3 {
        font-size: 14px;
      }
      .shopcar-numbox {
        .shopcar-price {
          color: red;
          font-size: 15px;
          font-weight: bold;
        }
      }
    }
  }
  .computed{
    b{
      color: red;
      font-size: 18px;
    }
  }
}
</style>

