<script lang="ts" setup name="Numbox">
//
import {ref} from "vue";

const money = ref(100)
const handleChange = (newMoney: number) => {
  money.value =newMoney
}
const count = ref(1)
</script>
<template>
  <div class="spec">
<!--    <XtxNum v-model:money="money" v-model="count" :min="1" :max="20"></XtxNum>-->
    <XtxButton type="primary" style="margin-left: 20px" size="mini">按钮</XtxButton>
    <XtxButton type="default" style="margin-left: 20px" size="mini">按钮</XtxButton>
    <XtxButton type="plain" style="margin-left: 20px" size="mini">按钮</XtxButton>
    <XtxButton type="gray" style="margin-left: 20px" size="mini">按钮</XtxButton>
  </div>
</template>

<style scoped lang="less">
.spec {
  margin-top: 100px;
}
</style>
