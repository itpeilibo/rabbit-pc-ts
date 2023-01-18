<script setup lang="ts">
import { useIntersectionObserver } from "@vueuse/core";
import { ref } from "vue";
const target = ref<HTMLImageElement | null>(null);
// useIntersectionObserver
// 参数1：要监视的目标元素
// 参数2：回调函数（元素是否在可视区，变化时，会触发）
const { stop } = useIntersectionObserver(
  target,
  ([{ isIntersecting }], observerElement) => {
    // isIntersecting 标记是否进入可视区
    if (isIntersecting) {
      // 设置img的src
      target.value!.src =
        "https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/popular_1.jpg";
    }
  }
);
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
