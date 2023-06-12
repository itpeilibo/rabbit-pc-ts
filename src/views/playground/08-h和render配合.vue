<script lang="ts" setup>
// 演示语法：h 配合 render使用
// 语法1：
// （1）利用 h 创建虚拟dom
import {h, onMounted, render} from "vue";

const vNode = h('h1',{title: '大标题'},'这是内容')

onMounted(() => {
    // (2) 利用 render 往盒子中渲染 
    render(vNode, document.querySelector('.box')!)
})
</script>
<template>
<div class="box"></div>
</template>

<style scoped lang="less">

</style>
