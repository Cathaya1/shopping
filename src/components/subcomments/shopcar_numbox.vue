<template>
    <div class="mui-numbox" data-numbox-min="1" style="width:110px;height:30px">
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input id="test" class="mui-input-numbox" type="number" :value="shopCarCount" @change="countchanged" ref="numbox" readonly>
      <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
  data() {
    return {
      
    }
  },
  mounted() {
    mui('.mui-numbox').numbox()
  },
  methods: {
    //商品数量发生改变
    countchanged() {
      this.$store.commit("changeShopcarCount",{
        id: this.goodsid,
        count: this.$refs.numbox.value
      })
    },
  },
  props: ["shopCarCount","goodsid"]
};
</script>

<style lang="scss" scoped>
</style>

