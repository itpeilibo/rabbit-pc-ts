<script setup lang="ts" name="GoodsSku">
import {GoodsInfo, Spec, SpecValue} from "@/types/goods";
import bwPowerSet from "@/utils/bwPowerSet";
// sku组件的基本使用:
// 1. (必须)传入 商品信息对象 => 拥有了启用禁用，选择功能
// 2. (可选)传入 skuId      => 默认回显，默认让一些规格选中
// 3. 当全部规格选完的时候，就是确定了一个sku，需要子传父，将skuId 传给父即可
const props = defineProps<{
  goods: GoodsInfo
  skuId?: string
}>()
const emit = defineEmits<{
  (e: 'changeSku',skuId:string): void
}>()
const SPAGStr = '+'
// 修改按钮的选中状态
const changeSelected = (spec:Spec,spceValue:SpecValue) => {
  if (spceValue.disabled) return
  if(spceValue.selected) {
    spceValue.selected = false
  } else {
  //  排他
    spec.values.forEach(v => v.selected = false)
    spceValue.selected = true
  }
  // 一旦按钮被重新选择了,按钮状态也会随之需要更新
  updateDisabledStatus()
//  (1) 判断，是否所有可选规格，都选择
  const  selectdArr = getSelectedSpec().filter(item => item)
  if (selectdArr.length === props.goods.specs.length) {
  // (2) 说明全部选中,将得到的数组，转成字符串，去pathMap中找对应的skuId
    const key = selectdArr.join(SPAGStr) // 蓝色+30cm+日本
    const result = pathMap[key]
    const skuId = result[0] // 这个skuId是唯一值
    emit('changeSku',skuId)
  }
}

type PathMapObj = {
  [key: string]: string[]
}
// 一进入页面，控制启用禁用状态 =》 需要路径字典
// 基于数据skus,得到路径字典
const getPathMap = () => {
  const pathMap:PathMapObj = {}
  // 1. 过滤所有的skus,得到有效的skus(库存 > 0)
  const skus = props.goods.skus.filter(item => item.inventory > 0)
  // 2. 遍历所有的skus,获取sku的子集,进行处理
  skus.forEach(sku => {
  // 3. 整理数据,整理得到[属性1,属性2,属性3]
    const arr = sku.specs.map(item => item.valueName)

  // 4. 基于整理的属性列表,求子集
    const powerSet = bwPowerSet(arr)
    powerSet.forEach(sub => {
      const key = sub.join(SPAGStr)
      if (key in pathMap) {
        pathMap[key].push(sku.id)
      } else {
        pathMap[key] = [sku.id]
      }
    })

  // 5. 遍历子集,将子集的数据,往pathMap中整理
    //  (1) 如果筛选条件,不存在,新开一个属性,存
    //  (2) 如果筛选条件,已存在,在已有属性上,累加
  })
  return pathMap
}
// 更新启用禁用状态
const updateDisabledStatus = () => {
  const selectArr = getSelectedSpec() // ['','','日本']
//  根据路径字典 => 更新所有的按钮specValue的状态
  props.goods.specs.forEach((spec,index) => {
    // 判断规格中某个值是否要被禁用
    spec.values.forEach(specValue => {
      const tempArr = [...selectArr]
      tempArr[index] = specValue.name
      // 得到组合后转成字符串的key '黑色+日本'
      const key = tempArr.filter(item => item).join(SPAGStr)
      if (key in pathMap) {
      //  存在,说明有库存,不禁用
        specValue.disabled = false
      } else {
        // 不存在,说明没有库存,禁用
        specValue.disabled = true
      }
    })
  })
}
// 获取当前的选中状态
const getSelectedSpec = () => {
  // 根据现有的所有按钮,进行遍历,将选中的值,按照下标存入数组
  const arr = ['','','']
  props.goods.specs.forEach((spec,index) => {
    // spec.values.forEach(specValue => {
    //   console.log('666',specValue.selected)
    // })
    const tempObj = spec.values.find(specValue => specValue.selected)
    arr[index]= tempObj ? tempObj.name : ''
  })
  return arr
}
// 获取当前的选中状态
const initSelectedSpec = () => {
  if (!props.skuId) return
  const sku = props.goods.skus.find((item,index) => item.id === props.skuId)
  if (!sku) return
//  基于sku.specs,让按钮设置成选中状态
  props.goods.specs.forEach((spec,index) => {
    // find
    const text = sku.specs[index].valueName
    const specValue = spec.values.find(item => item.name === text)
    specValue!.selected = true
  })
}
// 1. 获取路径字典
const pathMap = getPathMap()
// 先设置默认选中
initSelectedSpec()
// 初始化时，控制所有按钮的状态
updateDisabledStatus()
</script>
<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.name">
      <dt>{{item.name}}</dt>
      <dd>
        <template v-for="sub in item.values" :key="sub.name">
          <img
              v-if="sub.picture"
              :class="{selected: sub.selected,disabled: sub.disabled}"
              :src="sub.picture"
              alt=""
              @click="changeSelected(item,sub)"
          />
          <span v-else @click="changeSelected(item,sub)" :class="{selected: sub.selected,disabled:sub.disabled}">{{sub.name}}</span>
        </template>
      </dd>
    </dl>
<!--    <dl>-->
<!--      <dt>尺寸</dt>-->
<!--      <dd>-->
<!--        <span class="disabled">10英寸</span>-->
<!--        <span class="selected">20英寸</span>-->
<!--        <span>30英寸</span>-->
<!--      </dd>-->
<!--    </dl>-->
<!--    <dl>-->
<!--      <dt>版本</dt>-->
<!--      <dd>-->
<!--        <span>美版</span>-->
<!--        <span>港版</span>-->
<!--      </dd>-->
<!--    </dl>-->
  </div>
</template>

<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        margin-top: 5px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 30px;
        padding: 0 20px;
        margin-top: 5px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>

