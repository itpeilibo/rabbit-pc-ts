<script setup lang="ts">
// import {h, onMounted,render} from 'vue'
import Message from "@/components/message/index";
// // 这里是在拿组件的整个配置项，基于 .vue组件，创建虚拟dom 和 全局组件没有关系
// const vNode = h(XtxMessage,{type: 'error'},'登录成功')
// onMounted(() => {
//   render(vNode,document.querySelector('.box')!)
// })
const changeFn = () => {
  // Message({
  //   type: "success",
  //   text: '登录成功',
  //   duration: 4000
  // })
  Message.success('登录成功',3000)
}
</script>

<template>
  <div class="box">
<!--    <XtxMessage></XtxMessage>-->
    <button @click="changeFn">登录</button>
  </div>
</template>
<style scoped lang="less">

</style>
