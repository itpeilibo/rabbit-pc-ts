<script setup lang="tsx" name="XtxTabs">
import {toRef, toRefs, useSlots, VNode} from "vue";
import {provide} from "vue";
import it from "node:test";

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    }
})
const emit = defineEmits<{
    (e: 'update:modelValue',newValue: String): void
    (e: 'tab-click:modelValue',obj: {tab: VNode; index: number}): void
}>()
// 需要获取到插槽内容，一方面要渲染插槽的内容，另一方面根据插槽的内容，动态创建导航

const slots = useSlots()
const clickFn = (item: VNode,index: number) => {
    emit('update:modelValue',item?.props?.name)
    emit('tab-click',{
        tab: item,
        index: index
    })
}

 // 将 modelValue 共享下去
const { modelValue } = toRefs(props)
provide('activeNameValue', modelValue)
const VNodeBox = () => {
    // 获取所有的默认插槽的节点
    const defaultArr = slots.default?.()
    const panes:any = []

    // 遍历 defaultArr，对每个节点做判断，分别进行处理
    defaultArr?.forEach((item: any) => {
        console.log('type',item)
        if (item.type.name === 'XtxTabsPane') {
            panes.push(item)
        } else {
            // 不是XtxTabsPane组件
            // 再做判断，处理 v-for 的情况
            if (item.children) {
                // 遍历children,动态往panes中推
                item.children.forEach((paen: any) => {
                    panes.push(paen)
                })
            }
        }
    })

    // 根据panes动态的生成导航
    const navs = (
        <nav>
            {
                panes?.map((item: any,index: number) => {
                    console.log('1211',item)
                    return <a class={{active: props.modelValue === item?.props?.name}}
                              onClick={() => clickFn(item,index)}
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
