<script setup lang="ts">
import {h, onMounted,render} from 'vue'
// 核心步骤
// 1. 使用 h 函数(createVNode函数) 创建虚拟dom结构
// 2. 使用 render 函数， 在指定的容器中，渲染VNode

// h方法三个参数：
// 参数1. 创建的虚拟dom的节点类型 比如：div h1 a img
// 一个HTML标签名、一个组件、一个异步组件、一个函数式组件
// 参数2. 虚拟dom的属性，是一个对象
// 参数3. 虚拟dom的节点的内容部分，可以是字符串，也可以是数组
const vNode = h('h1',{
  title: '不错',
  id: 'h1Element',
  className: 'content'
},'我是h1标签')
// render 方法两个参数
// 参数1： 要渲染的虚拟dom
// 参数2： 虚拟dom的挂载点，往哪个真是dom中渲染
onMounted(() => {
  render(vNode,document.querySelector('.box')!)
})
</script>

<template>
  <div class="box">

  </div>
</template>
<style scoped lang="less">
:deep(.content ){
  width: 200px;
  height: 50px;
  background-color: pink;
}
</style>
