<template>
  <div>
    <div class="goodslist-container">
      <div class="goods-item" v-for="item in goodslist" :key="item.id" @click='togoodsinfo(item.id)'>
        <img :src="item.goods_url">
        <h3>{{item.goods_title}}</h3>
        <div class="goods-info">
          <p class="goods-price">
            <span class="sell-price">￥{{item.sell_price}}</span>
            <span class="old-price">￥{{item.old_price}}</span>
          </p>
          <p class="goods-number">
            <span>热卖中</span>
            <span>剩{{item.goods_number}}件</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      goodslist: []
    };
  },
  created() {
    this.getGoodslist();
  },
  methods: {
    togoodsinfo(id) {
        this.$router.push({ path:'/home/goodsinfo/'+id })
    },
    getGoodslist() {
      this.$http.get("http://119.23.71.230:11111/addgoodslist").then(res => {
        if (res.data.code === "ok") {
          this.goodslist = res.data.data;
        } else {
          Toast("加载失败");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.goodslist-container {
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
  justify-content: space-between;
  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 292px;
    img {
      width: 100%;
    }
    h3 {
      font-size: 14px;
    }
    .goods-info {
      .goods-price {
        .sell-price {
          color: red;
          font-size: 16px;
        }
        .old-price {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 12px;
        }
      }
      .goods-number {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>

