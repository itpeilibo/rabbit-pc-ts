import XtxConfirm from './confirm.vue'
import {h, render} from 'vue'

// 准备 container 容器，存放弹层元素
const div = document.createElement('div')
div.setAttribute('class','xtx-confirm-container')
document.body.appendChild(div)

type ParamsType = {
    text: string,
    title: string,
}
export default function Confirm ({text,title}: ParamsType){
   return new Promise((resolve, reject) => {
        const confirmCallback = () => {
            resolve('确认') // => 将来，就会执行 .then 中的函数
            // 关闭弹框
            render(null,div)
        }
        const cancelCallback = () => {
            reject('取消') // => 将来，就会执行 .catch 中的函数
            // 关闭弹框
            render(null,div)
        }
        // 1. 创建虚拟dom h(某组件，标签属性，子节点)
        // 通过标签属性，给组件通过props传值
        const vNode = h(XtxConfirm,{
            text,
            title,
            confirmCallback,
            cancelCallback
        })
        // 2. 动态render到容器
        render(vNode,div)

        // 准备一个容器 render的目的
        // 不会和其他组件render封装冲突 Message组件 / Confirm组件
    })
}
