import XtxSkeleton from '@/components/skeleton/index.vue'
import XtxCarousel from '@/components/carousel'
import {App} from "vue";
export default {
    // app 创建出来的应用实例 => 类型是固定的 => vue库内部会提供好实例类型的
    install(app:App) {
        app.component('XtxSkeleton',XtxSkeleton)
        app.component('XtxSkeleton',XtxSkeleton)
    }
}

