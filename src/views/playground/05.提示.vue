<script setup lang="ts">
import Confirm from '@/components/confirm/index'
  const logout = () => {
    Confirm({
      text: '你确定要退出本系统吗？',
      title: '温馨提示'
    }).then(() => {
      console.log('成功的函数')
    }).catch(() => {
      console.log('失败的函数')
    })
  }
</script>

<template>
  <div class="box">
    <button @click="logout">退出</button>
  </div>
</template>
<style scoped lang="less">

</style>
