<script lang="ts" setup name="XtxNumbox">
const props = defineProps({
  modelValue: {
    type: Number,
    default: 1
  },
  main: {
    type: Number,
    default: 1
  },
  max: {
    type: Number,
    default: 99
  }
})
const emit = defineEmits<{
  (e: 'update:modelValue',value: number): void
}>()
const add = () => {
  if (props.modelValue >= props.max) return
  emit('update:modelValue',props.modelValue + 1)
}
const sub = () => {
  if (props.modelValue <= props.main) return
  emit('update:modelValue',props.modelValue - 1)
}
</script>
<template>
  <div class="xtx-numbox">
    <div class="label">数量</div>
    <div class="numbox">
      <a href="javascript:;" @click="sub" :class="{not:props.modelValue <= props.main}">-</a>
      <input type="text" readonly :value="modelValue" />
      <a href="javascript:;" @click="add" :class="{not:props.modelValue >= props.max}">+</a>
    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-numbox {
  display: flex;
  align-items: center;
  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }
  .numbox {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;
    > a {
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;
      &.not {
        cursor: not-allowed;
      }
      &:first-of-type {
        border-right: 1px solid #e4e4e4;
      }
      &:last-of-type {
        border-left: 1px solid #e4e4e4;
      }
    }
    > input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
    }
  }
}
</style>
