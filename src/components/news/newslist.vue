<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newlist" :key="item.id">
        <router-link :to="'/home/newsinfo/' +item.id ">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body" >
            <h3>{{item.title}}</h3>
            <p class="mui-ellipsis">
              <span>发表时间:{{item.add_time | dateFormat}}</span>
              <span>点击次数：{{item.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      newlist: []
    };
  },
  created() {
    this.getnewlist();
  },
  methods: {
    //获取新闻列表
    getnewlist() {
      this.$http.get("http://119.23.71.230:11111/addnewlist").then(res => {
        if (res.data.code === "ok") {
          this.newlist = res.data.data;
        } else {
            Toast('加载失败')
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.mui-media-body {
  h3 {
    font-size: 14px;
  }
  .mui-ellipsis {
    font-size: 12px;
    color: #226aaf;
    display: flex;
    justify-content: space-between;
  }
}
</style>
