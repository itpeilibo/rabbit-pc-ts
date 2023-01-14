<script lang="ts" setup name="Layout">
import AppTopnav from "@/views/layout/components/app-topnav.vue";
import AppHeader from "@/views/layout/components/app-header.vue";
import AppFooter from "@/views/layout/components/app-footer.vue";
</script>
<template>
  <AppTopnav></AppTopnav>
  <AppHeader></AppHeader>
  <div>路由出口</div>
  <AppFooter>底部</AppFooter>
</template>

<style lang="less" scoped></style>
