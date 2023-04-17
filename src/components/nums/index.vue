<script lang="ts" setup name="XtxNum">
//

const props  = defineProps({
  money: {
    type: Number,
    default: 0
  },
  modelValue: {
    type: Number,
    default:1
  },
   min: {
    type: Number,
     default: 1
   },
   max: {
    type:Number,
     default: 20
   },
   showLabel: {
    type: Boolean,
     default: false
   }
})

const emit = defineEmits<{
  (e: 'update:money',newMoney: number): void
  (e: 'update:modelValue',value: number): void
}>()
const changeMoney = () => {
  emit('update:money',props.money +  32)
}
const sub = () => {
  if (props.modelValue <= props.min) return
  emit('update:modelValue',props.modelValue - 1)
}
const add = () => {
  if (props.modelValue >= props.max) return
  emit('update:modelValue',props.modelValue + 1)
}
const handleChange = (e: Event) => {
  // 通过类型断言，让ts知道目前元素的类型
  const element = e.target as HTMLInputElement
  console.log(e.target)
  let value = +element.value
  if (isNaN(value)) value = 1
  if (value >= props.max) value = props.max
  if (value <= props.min) value = props.min
  emit('update:modelValue',value)
  // _this.$forceUpdate()
}
</script>
<template>
  <h3>我是{{money}}</h3>
  <button @click="changeMoney">花钱</button>
  <div class="xtx-numbox">
    <div class="label" v-if="showLabel"><slot>数量</slot></div>
    <div class="numbox">
      <a href="javascript:;" @click="sub" :class="{not: props.modelValue <= props.min}">-</a>
      <input type="text" :value="modelValue" @change="handleChange($event)"/>
      <a href="javascript:;" @click="add" :class="{not: props.modelValue >= props.max}">+</a>
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
