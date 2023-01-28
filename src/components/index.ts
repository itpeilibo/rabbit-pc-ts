import XtxSkeleton from '@/components/skeleton/index.vue'
import XtxCarousel from '@/components/carousel/index.vue'
import XtxMore from './more/index.vue'
import Bread from './Bread/index.vue'
import BreadItem from './Bread/Item.vue'
import XtxCity from  './city/index.vue'
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

