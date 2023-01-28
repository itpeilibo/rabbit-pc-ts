<script lang="ts" setup name="XtxCity">
// 组件对外输出的信息格式
export type CityResult ={
  provinceCode: string, provinceName: string, cityCode: string, cityName: string, countyCode: string, countyName: string
}
// 城市列表类型
export type AreaListObj = {
  code: string
  level: number
  name: string
  areaList: AreaListObj[]
}

import {ref, watch} from "vue";
import axios from "axios";
import { onClickOutside } from '@vueuse/core'
defineProps<{
  userAddress?: string
}>()
const emit = defineEmits<{
  (e:'changeCity',value: CityResult): void
}>()
const active = ref(false)
const cityList = ref<AreaListObj[]>([])
const cacheList = ref<AreaListObj[]>([])
const target = ref(null)
const toggle = () => {
  active.value = !active.value
}
// 选择城市的结果集
const changeResult = ref({
  // 省
  provinceCode: '',
  provinceName: '',
  // 市
  cityCode: '',
  cityName: '',
  // 区
  countyCode: '',
  countyName: ''
})
// 选择省市区
const selectCity = (city:AreaListObj) => {
  // 处理省份
  if (city.level === 0) {
    changeResult.value.provinceCode = city.code
    changeResult.value.provinceName = city.name
    cityList.value = city.areaList
  }
  // 处理城市
  if (city.level === 1) {
    changeResult.value.cityCode = city.code
    changeResult.value.cityName = city.name
    cityList.value = city.areaList
  }
  // 处理区
  if (city.level === 2) {
    changeResult.value.countyCode = city.code
    changeResult.value.countyName = city.name
    // 关闭弹窗
    active.value = false
    // 子传父
    emit('changeCity',changeResult.value)
  }
}
const getCityList = async () => {
  const {data:res} = await axios.get<AreaListObj[]>('https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json')
  cityList.value = res
  cacheList.value = res
}
getCityList()

// 监听弹框的关闭，只要弹框关了，就需要重置数据
watch(active,(value) => {
  if (!value) {
    cityList.value = cacheList.value
  }
})
onClickOutside(target,(e) => {
  active.value = false
})

</script>
<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggle" :class="{active: active}">
      <span class="value" v-if="userAddress">{{userAddress}}</span>
      <span class="placeholder" v-else>请选择配送地址</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-show="active">
      <span @click="selectCity(item)" class="ellipsis" v-for="item in cityList" :key="item.code">{{item.name}}</span>
    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
