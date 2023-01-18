import {onBeforeMount, onBeforeUnmount, onMounted, ref} from "vue";
import {useIntersectionObserver} from "@vueuse/core";
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
