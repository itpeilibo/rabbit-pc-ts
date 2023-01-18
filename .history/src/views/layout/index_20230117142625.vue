<script lang="ts" setup name="Layout">
import AppTopnav from "@/views/layout/components/app-topnav.vue";
import AppHeader from "@/views/layout/components/app-header.vue";
import AppFooter from "@/views/layout/components/app-footer.vue";
import AppHeaderSticky from "@/views/layout/components/app-header-sticky.vue";
</script>
<template>
  <AppTopnav></AppTopnav>
  <!--  默认展示的导航-->
  <AppHeader></AppHeader>
  <!--  滚动距离超过 78px 显示的导航-->
  <AppHeaderSticky></AppHeaderSticky>
  <main class="app-body">
    <!-- 路由出口 -->
    <RouterView></RouterView>
  </main>
  <AppFooter></AppFooter>
</template>

<style lang="less" scoped>
.app-body {
  min-height: 600px;
}
</style>
