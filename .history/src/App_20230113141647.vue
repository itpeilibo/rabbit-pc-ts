<script setup lang="ts">
import request from "@/utils/request";
async function getTest() {
  const res = await request.get("/home/index");
  console.log(res);
}
getTest();
</script>
<template>
  <div>我是app组件</div>
</template>
<style scoped lang="less">
@import "@/assets/styles/variables.less", @import "@/assets/styles/mixins.less";
</style>
