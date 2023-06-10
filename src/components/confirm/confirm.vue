<script lang="ts" setup name="XtxConfirm">
import XtxButton from '../button/index.vue'
import {onMounted, PropType, ref} from "vue";
defineProps({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  confirmCallback: {
    type: Function as PropType<() => void >
  },
  cancelCallback: {
    type: Function as PropType<() => void>
  }
})
const isShow = ref(false)
onMounted(() => {
  // 这个延迟时间，可以短一些，但是不能删，因为要等初始状态完完全全被页面渲染出来才行
  setTimeout(() => {
    isShow.value = true
  },20)
})
</script>
<template>
   <div class="xtx-confirm" :class="{fadeIn: isShow}">
     <div class="wrapper" :class="{fadeIn: isShow}">
       <div class="header">
         <h3>{{title}}</h3>
         <a href="JavaScript:;" class="iconfont icon-close-new" @click="cancelCallback"></a>
       </div>
       <div class="body">
         <i class="iconfont icon-warning"></i>
         <span>{{text}}</span>
       </div>
       <div class="footer">
         <XtxButton size="mini" type="gray" @click="cancelCallback">取消</XtxButton>
         <XtxButton size="mini" type="primary" @click="confirmCallback">确认</XtxButton>
       </div>
     </div>
   </div>
</template>

<style scoped lang="less">
.xtx-confirm {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 8888;
  background: rgba(0, 0, 0, 0); // 纯透明
  &.fadeIn {
    transition: all 0.4s;
    background-color: rgba(0,0,0,0.5); // 纯黑半透明
  }
  .wrapper {
    width: 400px;
    background: #fff;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    &.fadeIn {
      transition: all 0.4s;
      transform: translate(-50%,-50%);
      opacity: 1;
    }
    .header,
    .footer {
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
    }
    .body {
      padding: 20px 40px;
      font-size: 16px;
      .icon-warning {
        color: @priceColor;
        margin-right: 3px;
        font-size: 16px;
      }
    }
    .footer {
      text-align: right;
      .xtx-button {
        margin-left: 20px;
      }
    }
    .header {
      position: relative;
      h3 {
        font-weight: normal;
        font-size: 18px;
      }
      a {
        position: absolute;
        right: 15px;
        top: 15px;
        font-size: 20px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #999;
        &:hover {
          color: #666;
        }
      }
    }
  }
}
.confirm {
  &-enter {
    &-from {
      //transform: translate3d(0, -75px, 0);
      opacity: 0;
    }
    &-active {
      transition: all 0.5s;
    }
    &-to {
      //transform: none;
      opacity: 1;
    }
  }
}
</style>
