<script setup lang="tsx" name="XtxTabs">
import {toRef, toRefs, useSlots, VNode} from "vue";
import {provide} from "vue";

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    }
})
const emit = defineEmits<{
    (e: 'update:modelValue',newValue: String): void
}>()
// 需要获取到插槽内容，一方面要渲染插槽的内容，另一方面根据插槽的内容，动态创建导航

const slots = useSlots()
const clickFn = (item: VNode) => {
    emit('update:modelValue',item?.props?.name)
}

 // 将 modelValue 共享下去
const { modelValue } = toRefs(props)
provide('activeNameValue', modelValue)
const VNodeBox = () => {
    // 获取所有的默认插槽的节点
    const panes = slots.default?.()
    // 根据panes动态的生成导航
    const navs = (
        <nav>
            {
                panes?.map((item) => {
                    console.log('1211',item)
                    return <a class={{active: props.modelValue === item?.props?.name}}
                              onClick={() => clickFn(item)}
                              href="javascript:;">{item?.props?.label}</a>
                })
            }
        </nav>
    )
    return <div class="xtx-tabs">{[navs,panes]}</div>
}
</script>

<template>
    <VNodeBox></VNodeBox>
</template>

<style lang="less">
.xtx-tabs {
  background: #fff;

  > nav {
    height: 60px;
    line-height: 60px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;

    > a {
      width: 110px;
      border-right: 1px solid #f5f5f5;
      text-align: center;
      font-size: 16px;

      &.active {
        border-top: 2px solid @xtxColor;
        height: 60px;
        background: #fff;
        line-height: 56px;
      }
    }
  }
}
</style>
