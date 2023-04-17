import {onBeforeMount, onBeforeUnmount, onMounted, onUnmounted, ref} from "vue";
import {useIntersectionObserver, useIntervalFn} from "@vueuse/core";
// 组件数据懒加载
export function useLazyData(apiFn: () => void) {
    const target = ref(null)
    const {stop} = useIntersectionObserver(target,([{isIntersecting}])=> {
        if (isIntersecting) {
            stop()
            apiFn()
        }
    },{
        threshold: 0
    })
    return target
}
// 可以动态获取屏幕的y值
export function useScrollY() {
  const y = ref(0)
  const onScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    y.value = scrollTop
  }
  onMounted(() => {
    window.addEventListener('scroll',onScroll)
  })
// beforestroy 准备要卸载组件了，事件清一清
  onMounted(() => {
    window.removeEventListener('scroll',onScroll)
  })
  return y
}

export function useCountDown(count: number = 60) {
    const time = ref(0) // 倒计时的秒数
    const {pause,resume} = useIntervalFn(() => {
        time.value--
        if (time.value <= 0) pause()
    },1000,{
        immediate:false
    })
    const start = () => {
        time.value = count
        resume()
    }
    // 如果组件被卸载了，也要清除定时器
    // onUnmounted(() => {
    //     pause()
    // })
    return {
        time,
        start
    }
}
