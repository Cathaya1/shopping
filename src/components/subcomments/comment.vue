<template>
  <div>
    <div class="comment_container">
      <h3>发表评论</h3>
      <hr>
      <textarea placeholder="请输入评论内容(最多输入100字)" maxlength="100" v-model="message"></textarea>
      <mt-button type="primary" size="large" @click="subcmt">发表评论</mt-button>
      <div class="cmt_list" v-for="(item,i) in subcomments" :key="item.id">
        <div class="cmt_item">
          <div class="cmt_title">第{{i+1}}楼&nbsp;&nbsp;用户：匿名用户&nbsp;发表时间：{{item.date | dateFormat}}</div>
          <div class="cmt_body">{{item.message}}</div>
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
      subcomments: [],
      message: ""
    };
  },
  created() {
    this.getcomments();
    
  },
  methods: {
    //获取评论
    getcomments() {
      this.$http.get("http://119.23.71.230:11111/addcomments").then(res => {
        if (res.data.code === "ok") {
          this.subcomments = res.data.data;
        } else {
          Toast("加载失败");
        }
      });
    },
    //提交评论
    subcmt() {
      let date = new Date();
      if (this.message.length === 0) {
        Toast("评论内容不能为空！");
      } else {
        this.$http
          .post("http://119.23.71.230:11111/addsubcomments", {
            message: this.message,
            date: date
          })
          .then(res => {
            if (res.data.code === "ok") {
              let comments = {
                date: date,
                message: this.message
              };
              this.subcomments.unshift(comments);
              this.message = "";
            } else {
              Toast("Loading");
            }
          });
      }
    },
    //下拉刷新

  }
};
</script>

<style lang="scss" scoped>
.comment_container {
  h3 {
    font-size: 16px;
  }
  textarea {
    margin: 0;
    height: 100px;
    font-size: 13px;
  }
  .cmt_list {
    padding-top: 5px;
    font-size: 13px;
    .cmt_item {
      .cmt_title {
        padding: 10px;
        background-color: #ccc;
      }
      .cmt_body {
        padding: 10px;
      }
    }
  }
}
</style>

