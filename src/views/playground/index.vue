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
    <XtxTabs v-model:modelValue="activeName">
        <XtxTabsPane label="用户管理" name="all">面板1 - 全部内容 </XtxTabsPane>
        <XtxTabsPane
            v-for="(item,index) in orderStatus"
            :label="item.label"
            :name="item.name"
        >面板{{ index + 1}}</XtxTabsPane>
    </XtxTabs>
</template>
<style lang="scss" scoped>

</style>
