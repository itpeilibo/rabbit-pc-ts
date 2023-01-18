<script setup lang="ts">
import {ref} from "vue";

const rlag = ref(true)
</script>

<template>
  <button @click="rlag = !rlag">切换</button>
  <transition name="bounce">
    <div v-if="rlag" class="box">我是一个盒子</div>
  </transition>
</template>
<style scoped>
.box {
  width: 500px;
  height: 500px;
  background-color: pink;
}
/* transition 只能实现两个状态的动画，如果有多个状态的动画要显示(animation) */
@keyframes bounce {
  0% {
    transform: scale(0);
  }
  25% {
    transform: scale(2);
  }
  50% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}
.bounce-enter-active {
  animation: bounce 4s;
}
.bounce-leave-active {
  animation: bounce 4s reverse;
}
/* 只淡入，不放大的动画 */
.fade-enter-from {
  opacity: 0;
  width: 100px;
  height: 100px;
}
.fade-enter-active {
transition: all  1s;
}
.fade-enter-to {
  opacity: 1;
}
.test-leave-from {
  transform: translateX(0px);
  opacity: 1;
}
.test-leave-active {
transition: all 3s;
}
.test-leave-to {
  opacity: 0;
  transform: translateX(500px);
}

</style>
