<template>
  <div>
    <div class="photosinfo-container" v-for="item in photosmsg" :key="item.photos_id">
      <h3 class="photosinfo-title">{{item.photos_info}}</h3>
      <p class="photosinfo-subtitle">
        <span>发表时间：{{item.photos_date | dateFormat}}</span>
        <span>点击次数:{{item.photos_click}}</span>
      </p>
      <hr>
      <div>
        <vue-preview
          :list="list"
          :thumbImageStyle="{width: '80px', height: '80px', margin: '10px'}"
          :previewBoxStyle="{border: '1px solid #eee'}"
          :tapToClose="true"
          @close="closeHandler"
          @destroy="destroyHandler"
        />
      </div>
      <div class="photosinfo-content"><p>{{item.photos_msg}}</p></div>
      <photocomments></photocomments>
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
      id_title: this.$route.params.id_title,
      photosmsg: [],
      list: []
    };
  },
  created() {
    this.getphotosmsg();
    this.getphotosinfo();
  },
  methods: {
    //获取图片信息
     getphotosmsg() {
      this.$http
        .get("http://119.23.71.230:11111/addphotosmsg", { params: { id:this.id, id_title:this.id_title } })
        .then(res => {
          if (res.data.code === "ok") {
            this.photosmsg = res.data.data;
          } else {
            Toast("加载失败");
          }
        });
    }, 
    //获取缩略图
    getphotosinfo() {
      this.$http
        .get("http://119.23.71.230:11111/addphotosinfo", {
          params: { id: this.id, id_title: this.id_title }
        })
        .then(res => {
          if (res.data.code === "ok") {
            this.list = res.data.data;
            this.list.forEach(item =>{
              item.src = item.photosinfo_url;
              item.w = 600;
              item.h = 600;
            })
          } else {
            Toast("加载失败");
          }
        });
    },
    // 即将关闭的时候，调用这个处理函数
    closeHandler() {
      console.log("closeHandler");
    },
    // 完全关闭之后，调用这个函数清理资源
    destroyHandler() {
      console.log("destroyHandler");
    }
  },
  components: {
    photocomments: comment
  }
};
</script>

<style lang="scss" scoped>
.photosinfo-container {
  .photosinfo-title{
    font-size: 14px;
    text-align: center;
    margin: 15px 0;
    color: #226aff;
  }
  .photosinfo-subtitle{
    font-size: 13px;
    color: #999;
    display: flex;
    justify-content: space-between;
  }
}
</style>

