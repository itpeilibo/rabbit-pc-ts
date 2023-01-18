<script lang="ts" setup name="HomePanel">
import { stringify } from "querystring";

defineProps({
  title: {
    type: String,
    default: "你好",
  },
});
</script>
<template>
  <div class="home-panel">
    <div class="container">
      <div class="head">
        <h3>新鲜好物<small>新鲜出炉 品质靠谱</small></h3>
        <XtxMore to="/"></XtxMore>
      </div>
      面板的内容
    </div>
  </div>
</template>

<style scoped lang="less">
.home-panel {
  background-color: #fff;
  .head {
    padding: 40px 0;
    display: flex;
    align-items: flex-end;
    h3 {
      flex: 1;
      font-size: 32px;
      font-weight: normal;
      margin-left: 6px;
      height: 35px;
      line-height: 35px;
      small {
        font-size: 16px;
        color: #999;
        margin-left: 20px;
      }
    }
  }
}
</style>
