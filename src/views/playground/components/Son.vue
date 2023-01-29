<script setup lang="ts">
const props = defineProps({
  money: {
    type: Number,
    default: 0
  },
  car: {
    type: String,
    default: '小黄车'
  },
  modelValue: {
    type:Number,
    default:111
  }
})
const emit = defineEmits<{
  (e:'update:money',newMoney: number): void
  (e:'update:car',newMoney: string): void
  (e:'update:modelValue',newMoney: string): void
}>()
const changeMoney = () => {
  emit('update:money',props.money-2)
}
const changeCar = () => {
  emit('update:car','宝马车')
}
const changeScore = () => {
  emit('update:modelValue',props.modelValue + 1)
}
</script>

<template>
<div>
  <h2>我是son组件 - {{money}} - {{car}} - {{modelValue}}</h2>
  <button @click="changeMoney">点我</button>
  <button @click="changeCar">换车</button>
  <button @click="changeScore">+分</button>
</div>
</template>
<style scoped>

</style>
