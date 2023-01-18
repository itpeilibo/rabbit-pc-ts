<script setup lang="ts">
import { ref } from "vue";
const target = ref(null);
</script>

<template>
  <div style="heigth: 300px" class="box"></div>
  <img ref="target" />
</template>

<style scoped></style>
