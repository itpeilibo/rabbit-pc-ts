<script setup lang="ts">
import request from "@/utils/request";
async function getTest() {
  const res = await request.get("/home/index");
  console.log(res);
}
getTest();
</script>
<template>
  <div class="box">我是app组件</div>
</template>
<style scoped lang="less">
@import "@/assets/styles/variables.less";
@import "@/assets/styles/mixins.less";
.box {
  width: 300px;
  height: 300px;
  background-color: @xtxColor;
  .hoverShadow();
}
</style>
