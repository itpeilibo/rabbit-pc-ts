<script setup lang="ts">
import {useCountDown} from "@/utils/hooks";

const {time,start} = useCountDown(1000)
const changeFn = () => {
  if (time.value > 0) return
  start()
}
</script>

<template>
  <div class="box">
<!--    <XtxMessage></XtxMessage>-->
    <button @click="changeFn">登录--{{time}}</button>
  </div>
</template>
<style scoped lang="less">

</style>
