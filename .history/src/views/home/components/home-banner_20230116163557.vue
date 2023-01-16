<script lang="ts" setup>
import useStore from "@/store";
import XtxCarousel from "@/components/carousel/index.vue";
const { home } = useStore();
home.getBannerList();
</script>
<template>
  <div class="home-banner">
    <!-- 轮播图 -->
    <XtxCarousel></XtxCarousel>
  </div>
</template>

<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
  background-color: pink;
  :deep(.carousel-btn .prev) {
    left: 270px !important;
  }
}
</style>
