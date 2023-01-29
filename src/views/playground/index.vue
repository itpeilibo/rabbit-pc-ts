<script setup lang="ts">
import Son from "@/views/playground/components/Son.vue";
import {ref} from "vue";

const money = ref(100)
const car = ref('劳斯莱斯')
const score = ref(999)
const handleChange = (newMoney:number) => {
  if (newMoney < 90) {
    alert('今天花了10元钱')
  } else {
    money.value = newMoney
  }
}
</script>

<template>
<!--  普通传值-->
<!--  <h1>我是父组件 - {{money}}</h1>-->
<!--  <Son :money="money" @changeMoney="handleChange"></Son>-->
<!--  sync语法-->
<!--  <h1>我是父组件 - {{money}}</h1>-->
<!--  <Son :money.sync="money"></Son>-->
<!--  v-model语法-->
  <h1>我是父组件 - {{money}}- {{car}}</h1>
  <Son
      v-model:money="money"
      v-model:car="car"
      v-model:modelValue="score"
  ></Son>

</template>
<style scoped>

</style>
