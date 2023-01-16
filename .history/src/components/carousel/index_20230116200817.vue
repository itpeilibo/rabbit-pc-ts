<script lang="ts" setup name="XtxCarousel">
import { BannerItem } from "@/types/data";
import { ref } from "vue";
// import { PropType } from "vue";
// 1. js的defineProps(对象的写法)
// defineProps({
//   slides: {
//     type: Array as PropType<BannerItem[]>,
//     required: true,
//   },
// });
// 2. defineProps<props类型>()
const props = defineProps<{
  slides: BannerItem[];
}>();
// 控制高亮的下标
const active = ref(0);
const onPrev = () => {
  active.value--;
  if (active.value < 0) {
    active.value = props.slides.length - 1;
  }
};
const onNext = () => {
  active.value++;
  if (active.value >= props.slides.length) {
    active.value = 0;
  }
};
</script>

<template>
  <div class="xtx-carousel">
    <!-- 轮播图主体（） -->
    <ul class="carousel-body">
      <li
        v-for="(item, index) in slides"
        :key="item.id"
        class="carousel-item"
        :class="{ fade: active === index }"
      >
        <RouterLink to="/">
          <img :src="item.imgUrl" alt="" />
        </RouterLink>
      </li>
    </ul>
    <!-- 左边箭头 -->
    <a href="javascript:;" class="carousel-btn prev" @click="onPrev"
      ><i class="iconfont icon-angle-left"></i
    ></a>
    <!-- 右边箭头 -->
    <a href="javascript:;" class="carousel-btn next" @click="onNext"
      ><i class="iconfont icon-angle-right"></i
    ></a>
    <div class="carousel-indicator">
      <span
        :class="{ active: active === index }"
        v-for="(item, index) in slides"
        :key="item.id"
      ></span>
    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
