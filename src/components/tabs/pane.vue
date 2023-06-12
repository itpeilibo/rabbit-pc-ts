<script setup lang="ts" name="XtxTabsPane">
defineProps<{
    label?: string
    name?: string
}>()
</script>

<template>
    <div class="xtx-tabs-panel">
        <slot></slot>
    </div>
</template>
