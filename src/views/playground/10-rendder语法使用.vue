<script setup lang="tsx">
import {ref} from "vue";
import Hello from "./Hello.vue";
// 1. 声明了数据,jsx中渲染使用 {} 渲染
// 2. 所有的指令，在jsx中不能用 包括v-if v-bind v-on v-for....
// 3. 动态绑定属性时，不能用 "" 引起来，要用 {}
// 4. 循环 => 利用map渲染
// 5. 逻辑判断 => 三元运算符 或者 && || 或者 函数封装后 if else

const money = ref(100)
const list = ref([
    { id: 1, content: "吃饭", done: true },
    { id: 2, content: "睡觉", done: false },
    { id: 3, content: "打代码", done: true },
]);
const fn = () => {
    money.value++
}
const MyBox = () => {
  if (money.value < 105) {
      return (
          <div>
              <Hello></Hello>
              <button onClick={fn}>挣钱</button>
          </div>
      )
  } else {
      return (
          <div>
              <h3>我是一个盒子-{money.value}</h3>
              <button onClick={fn}>挣钱</button>
              <ul>
                  {
                      list.value.map(item => (
                          <li key={item.id}>{item.content}</li>
                      ))
                  }
              </ul>
          </div>
      )
  }

}
</script>
<template>
    <MyBox></MyBox>
</template>
<style lang="scss" scoped>

</style>
