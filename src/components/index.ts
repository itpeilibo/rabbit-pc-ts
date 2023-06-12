import XtxSkeleton from '@/components/skeleton/index.vue'
import XtxCarousel from '@/components/carousel/index.vue'
import XtxMore from './more/index.vue'
import Bread from './Bread/index.vue'
import BreadItem from './Bread/Item.vue'
import XtxCity from  './city/index.vue'
import XtxNumbox from './numbox/index.vue'
import XtxNum from '@/components/nums/index.vue'

import XtxButton from './button/index.vue'
import XtxCheckbox from './checkbox/index.vue'
import XtxMessage from './message/message.vue'
import XtxDialog from '@/components/dialog/index.vue'
import XtxSwitch from '@/components/switch/index.vue'
import XtxTabs from '@/components/tabs/index.vue'
import XtxTabsPane from '@/components/tabs/pane.vue'
import Carousel from './lunbotu/index.vue'
import {App} from "vue";
import {useIntersectionObserver} from "@vueuse/core";
import defaultImg from '@/assets/images/200.png'
export default {
    // app 创建出来的应用实例 => 类型是固定的 => vue库内部会提供好实例类型的
    install(app:App) {
        app.component('XtxSkeleton',XtxSkeleton)
        app.component(XtxCarousel.name, XtxCarousel)
        app.component(XtxMore.name, XtxMore)
        app.component(Bread.name, Bread)
        app.component(BreadItem.name, BreadItem)
        app.component(BreadItem.name, BreadItem)
        app.component(XtxCity.name, XtxCity)
        app.component(XtxNumbox.name, XtxNumbox)
        app.component(XtxButton.name, XtxButton)
        app.component(XtxCheckbox.name, XtxCheckbox)
        app.component(XtxMessage.name, XtxMessage)
        app.component(Carousel.name, Carousel)
        app.component(XtxNum.name, XtxNum)
        app.component(XtxDialog.name, XtxDialog)
        app.component(XtxSwitch.name, XtxSwitch)
        app.component(XtxTabs.name, XtxTabs)
        app.component(XtxTabsPane.name, XtxTabsPane)
        app.directive('lazy', {
            mounted(el,binding) {
                //  el 目标元素,binding 指令相关的信息
                const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
                    if (isIntersecting) {
                        // 停止监听
                        stop()
                    }
                })
                el.src = binding.value
                // 如果图片加载失败，显示一张默认的图片
                el.onerror = () => {
                    // 设置加载失败的图片
                    el.src = defaultImg
                }
            }
        })
    }
}

