<script lang="ts" setup name="XtxCheckbox">
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits<{
  (e: 'update:modelValue',value: boolean): void
  (e: 'change',value:boolean):void
}>()
const change = () => {
  emit('update:modelValue',!props.modelValue)
  emit('change',!props.modelValue)
}
</script>

<template>
  <div class="xtx-checkbox" @click="change">
    <i class="iconfont icon-checked" v-if="modelValue"></i>
    <i class="iconfont icon-unchecked" v-else></i>
    <span><slot></slot></span>
  </div>
</template>

<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
