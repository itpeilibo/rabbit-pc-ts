<script lang="ts" setup name="Carousel">
import {BannerItem} from "@/types/data";
import {onMounted, onUnmounted, PropType, ref} from "vue";
const props = defineProps({
  slides: {
    type: Array as PropType<BannerItem[]>,
    required: true
  },
  autoPlay: {
    type: Boolean,
    default: false
  },
  duration: {
    type: Number,
    default: 3000
  }
})

const active = ref(0)
// 左箭头
const prev = () => {
if (active.value <= 0) {
  active.value = props.slides.length - 1
} else {
  active.value--
}
}
const next = () => {
  if (active.value >= props.slides.length -1) {
    active.value = 0
  } else {
    active.value++
  }
}
const play = () => {
  if (!props.autoPlay) return
  timer =  window.setInterval(() => {
    next()
  },props.duration)
}
const stop = () => {
  clearInterval(timer)
}
let timer = -1
onMounted(() => {
  play()
})
onUnmounted(() => {
  stop()
})
</script>

  <template>
    <div class="xtx-carousel" @mouseenter="stop" @mouseleave="play">
      <ul class="carousel-body">
        <li class="carousel-item" :class="{fade: active === index}" v-for="(item,index) in slides" :key="item.id">
          <RouterLink :to="item.hrefUrl">
            <img :src="item.imgUrl" alt="" />
          </RouterLink>
        </li>
      </ul>
      <a href="javascript:;" class="carousel-btn prev" @click="prev">
        <i class="iconfont icon-angle-left"></i>
      </a>
      <a href="javascript:;" class="carousel-btn next" @click="next">
        <i class="iconfont icon-angle-right"></i>
      </a>
      <div class="carousel-indicator">
        <span  @mouseenter="active = index" v-for="{item,index} in slides" :key="index" :class="{active: active === index}"></span>
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
