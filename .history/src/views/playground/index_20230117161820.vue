<script setup lang="ts">
import { useIntersectionObserver } from "@vueuse/core";
import { ref } from "vue";
const target = ref(null);

useIntersectionObserver(target, ([obj], observerElement) => {
  console.log(arr, observerElement);
});
</script>

<template>
  <div style="heigth: 300px" class="box"></div>
  <img ref="target" />
</template>

<style scoped></style>
