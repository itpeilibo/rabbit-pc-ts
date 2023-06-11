<script lang="ts" setup name="Numbox">
import { ref } from 'vue'
const dialogVisible = ref(false)


</script>
<template>
    <button @click="dialogVisible = true">按钮</button>
     <XtxDialog title="切换收货地址" v-model:visible="dialogVisible">
    <!--  默认插槽直接写-->
      <ul>
       <li>11111</li>
      </ul>
      <template #footer>
       <XtxButton type="gray" style="margin-right: 20px" @click="dialogVisible = false">取消</XtxButton>
       <XtxButton type="primary" @click="dialogVisible = false">确认</XtxButton>
      </template>
     </XtxDialog>
</template>

<style scoped lang="less">

</style>
