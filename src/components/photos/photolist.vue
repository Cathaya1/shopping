<template>
  <div class="photolist-container">
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item',item.id == 1? 'mui-active':'']"
            v-for="item in photolist"
            :key="item.phototitle"
            @click="getphotos(item.id)"
          >{{item.phototitle}}</a>
        </div>
      </div>
    </div>
    <ul>
      <router-link v-for="item in photos" :key="item.photos_url" :to="'/home/photoinfo/'+item.id_title+'/'+ item.photos_id" tag="li">
        <img v-lazy="item.photos_url">
        <div class="photos-info">
          <h3>{{item.photos_info}}</h3>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      photolist: [],
      photos: []
    };
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  created() {
    this.getphototitle();
    this.getphotos(1);
  },
  methods: {
    //获取滚动条信息
    getphototitle() {
      this.$http.get("http://119.23.71.230:11111/addphototitle").then(res => {
        if (res.data.code === "ok") {
          this.photolist = res.data.data;
        } else {
          Toast("加载失败");
        }
      });
    },
    //获取图片
    getphotos(id) {
      this.$http
        .get("http://119.23.71.230:11111/addphotos", { params: { id } })
        .then(res => {
          if (res.data.code === "ok") {
            this.photos = res.data.data;
          } else {
            Toast("Loading");
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  touch-action: pan-y;
  list-style: none;
}
.photolist-container {
  background-color: #fff;
  ul {
    margin: 0;
    padding: 10px;
    li {
      text-align: center;
      margin-bottom: 25px;
      img {
        width: 100%;
        height: 100%;
        box-shadow: 0 0 9px #999;
      }
      img[lazy="loading"] {
        width: 40px;
        height: 300px;
        margin: auto;
      }
      .photos-info {
        h3 {
          font-weight: normal;
          font-size: 12px;
          text-align: left;
          color: #333;
        }
      }
    }
  }
}
</style>

