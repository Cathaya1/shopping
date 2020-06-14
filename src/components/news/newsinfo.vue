<template>
  <div>
    <div class="newsinfo-container" v-for="item in newsinfo" :key="item.id">
      <h3 class="newsinfo-title">{{item.title}}</h3>
      <p class="newsinfo-subtitle">
        <span>发表时间：{{item.add_time | dateFormat}}</span>
        <span>点击次数:{{item.click}}</span>
      </p>
      <div class="newsinfo-content">{{item.content}}</div>
      <hr>
      <subcomment></subcomment>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import comment from "../subcomments/comment";
export default {
  data() {
    return {
      id: this.$route.params.id,
      newsinfo: {}
    };
  },
  created() {
    this.getnewsinfo();
  },
  methods: {
    //获取新闻信息
    getnewsinfo() {
      this.$http.get("http://119.23.71.230:11111/addnewsinfo", { params: { id: this.id } }).then(res => {
        if (res.data.code === "ok") {
          this.newsinfo = res.data.data;
        } else {
          Toast("加载失败");
        }
      });
    }
  },
  components: {
    subcomment: comment
  }
};
</script>

<style lang="scss" scoped>
.newsinfo-container {
  padding: 0 4px;
  .newsinfo-title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: red;
  }
  .newsinfo-subtitle {
    font-size: 13px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }
  .newsinfo-content{
      font-size: 14px;
      text-indent: 2em
  }
}
</style>
