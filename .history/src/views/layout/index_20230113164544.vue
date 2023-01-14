<script lang="ts" setup name="Layout">
import AppTopnav from "@/views/layout/components/app-topnav.vue";
import AppHeader from "@/views/layout/components/app-header.vue";
import AppFooter from "@/views/layout/components/app-footer.vue";
</script>
<template>
  <AppTopnav></AppTopnav>
  <AppHeader></AppHeader>
  <main class="app-body">
    <!-- 路由出口 -->
  </main>
  <AppFooter></AppFooter>
</template>

<style lang="less" scoped></style>
