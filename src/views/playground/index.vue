<script setup lang="tsx">
import {ref} from "vue";

const activeName = ref('second')

// 订单状态
const orderStatus = [
    { name: 'all', label: '全部订单' },
    { name: 'unpay', label: '待付款' },
    { name: 'deliver', label: '待发货' },
    { name: 'receive', label: '待收货' },
    { name: 'comment', label: '待评价' },
    { name: 'complete', label: '已完成' },
    { name: 'cancel', label: '已取消' }
]
</script>
<template>
    <XtxTabs v-model="activeName">
        <XtxTabsPane label="用户管理" name="first">面板1</XtxTabsPane>
        <XtxTabsPane label="配置管理" name="second">面板2</XtxTabsPane>
        <XtxTabsPane label="角色管理" name="third">面板3</XtxTabsPane>
        <XtxTabsPane label="定时任务补偿" name="fourth">面板4</XtxTabsPane>
    </XtxTabs>
</template>
<style lang="scss" scoped>

</style>
