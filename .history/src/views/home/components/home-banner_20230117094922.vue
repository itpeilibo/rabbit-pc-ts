<script lang="ts" setup>
import useStore from "@/store";
import XtxCarousel from "@/components/carousel/index.vue";
import HomePanel from "@/views/home/components/home-panel.vue";
const { home } = useStore();
home.getBannerList();
</script>
<template>
  <!-- 首页轮播图 -->
  <div class="home-banner">
    <!-- 轮播图 -->
    <XtxCarousel
      :slides="home.bannerList"
      autoplay
      :duration="3000"
    ></XtxCarousel>
  </div>
  <!-- 新鲜好物 -->
  <!-- <XtxMore path=""></XtxMore> -->
  <HomePanel title="新鲜好物" subTitle="新鲜出炉 品质靠谱"></HomePanel>
  <!-- 人气推荐 -->
</template>

<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
  // background-color: pink;
  :deep(.xtx-carousel .carousel-btn.prev) {
    left: 270px !important;
  }
  :deep(.carousel-indicator) {
    padding-left: 250px;
  }
}
</style>
