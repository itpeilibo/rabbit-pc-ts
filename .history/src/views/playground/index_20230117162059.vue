<script setup lang="ts">
import { useIntersectionObserver } from "@vueuse/core";
import { ref } from "vue";
const target = ref(null);
// useIntersectionObserver
// 参数1：要监视的目标元素
useIntersectionObserver(target, ([{ isIntersecting }], observerElement) => {
  console.log(isIntersecting, observerElement);
});
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
