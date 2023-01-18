<script setup lang="ts">
import { useIntersectionObserver } from "@vueuse/core";
import { ref } from "vue";
const target = ref(null);
// useIntersectionObserver
// 参数1：要监视的目标元素
// 参数2：回调函数（元素是否在可视区，变化时，会触发）
useIntersectionObserver(target, ([{ isIntersecting }], observerElement) => {});
</script>

<template>
  <div style="heigth: 300px" class="box"></div>
  <img ref="target" />
</template>

<style scoped>
.box {
  height: 2000px;
}
</style>
