<script setup lang="ts" name="XtxTabsPane">
import {inject, Ref} from "vue";

defineProps<{
    label?: string
    name?: string
}>()

const activeNameValue = inject<Ref<string>>('activeNameValue')
</script>

<template>
    <div class="xtx-tabs-panel" v-show="activeNameValue === name">
        <slot></slot>
    </div>
</template>
