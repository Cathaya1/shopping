<template>
  <div></div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  created() {
    this.toast()
  },
  methods: {
    toast() {
      Toast({
      message: "功能开发中",
      duration: 1000
    })
    }
  },
}
</script>

<style>
</style>
