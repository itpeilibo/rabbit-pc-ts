<script lang="ts" setup name="Numbox">
import { ref } from 'vue'
const dialogVisible = ref(false)


</script>
<template>
    <div class="father">
        <button @click="dialogVisible = true">按钮</button>
    </div>
    <Teleport to="body">
        <XtxDialog title="切换收货地址" v-model:visible="dialogVisible">
            <!--  默认插槽直接写-->
            <ul>
                <li>11111</li>
            </ul>
            <!--
              position: fixed；坑
              1. 默认相对于整个浏览器
              2. 如果祖辈元素，设置了 transform 变换
              => position: fixed 就是相对于这个变换的祖辈元素定位了
            -->
            <template #footer>
                <XtxButton type="gray" style="margin-right: 20px" @click="dialogVisible = false">取消</XtxButton>
                <XtxButton type="primary" @click="dialogVisible = false">确认</XtxButton>
            </template>
        </XtxDialog>
    </Teleport>

</template>

<style scoped lang="less">

</style>
