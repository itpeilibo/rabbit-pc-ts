import XtxMessage from './message.vue'
import {h, render} from 'vue'
type Params = {
    type: 'success' | 'error' | 'warning'
    text: string,
    duration: number
}
// 往body中新增一个盒子
// 目前效果：如果有多个提示框，后面的提示框会将前面的覆盖 => 同时只能一个提示框
const divContainer = document.createElement('div')
divContainer.setAttribute('class','xtx-message-container')
document.body.appendChild(divContainer)
let timer: number = -1
export default function Message({type,text,duration = 2000}: Params){
    // 1. 创建虚拟dom
    const vNode = h(XtxMessage,{type,text})
    // 2. 动态render
    render(vNode,divContainer)
    // 3。 开一个延时器，到时间让他隐藏
    clearTimeout(timer)
    timer = window.setTimeout(() => {
        // 删除虚拟dom
        render(null,divContainer)
        // 将刚才新增的容器，从页面中移除
        // setTimeout(() => {
        //     document.body.removeChild(divContainer)
        // },3000)
    },duration)
}
Message.success = function (text: string,duration = 2000) {
    Message({
        type: 'success',
        text,
        duration
    })
}
Message.error = function (text: string,duration = 2000) {
    Message({
        type: 'error',
        text,
        duration
    })
}
Message.warning = function (text: string,duration = 2000) {
    Message({
        type: 'warning',
        text,
        duration
    })
}

// export default Message
