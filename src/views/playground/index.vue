<script setup lang="tsx">
import {ref} from "vue";
import * as dgram from "dgram";

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

const handleFn = (obj:any) => {
    console.log('obj',obj)
}
</script>
<template>
    <XtxTabs v-model="activeName" @tab-click="handleFn">
        <XtxTabsPane
            v-for="(item,index) in orderStatus"
            :label="item.label"
            :name="item.name"
        >面板{{ index + 1}}</XtxTabsPane>
    </XtxTabs>
</template>
<style lang="scss" scoped>

</style>
