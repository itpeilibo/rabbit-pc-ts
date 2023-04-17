<script lang="ts" setup>
import useStore from '@/store'
import {useRoute} from "vue-router";
import {watchEffect,ref} from "vue";
import {storeToRefs} from "pinia";
import GoodsImage from '@/views/goods/components/goods-image.vue'
import GoodsSales from './components/goods-sales.vue'
import GoodName from './components/goods-name.vue'
import GoodsSku from './components/goods-sku.vue'
import GoodsDetail from  './components/goods-detail.vue'
import GoodsHot from './components/goods-hot.vue'
import Message from "@/components/message";
import {CartItem} from "@/types/cart";
import it from "node:test";
const {goods,cart} = useStore()
const { info } = storeToRefs(goods)
const route = useRoute()
const count = ref(5)
const currentSkuId = ref('')
watchEffect(() => {
  const id = route.params.id
  // 必须id存在，且是商品页才发请求
  if (id && route.fullPath === `/goods/${id}`) {
    goods.resetGoodsInfo()
    goods.getGoodsInfo(id as string)
  }
})
const changeSku = (skuId: string) => {
  currentSkuId.value = skuId
  const sku = info.value.skus.find(item => item.id === skuId)
  if (sku) {
    info.value.inventory = sku.inventory // 更新库存
    info.value.price = sku.price // 更新价格
    info.value.oldPrice = sku.oldPrice // 更新老价格
  }
}

const addCart = async () => {
// 判断是否选中了某个sku
  if (!currentSkuId.value) {
    Message.warning('请选择完整的规格')
    return
  }
  const sku = info.value.skus.find(item => item.id === currentSkuId.value)
  const arr = sku?.specs.map(item => `${item.name}: ${item.valueName}`)
  const attrText = arr?.join(' ')
   await cart.addCart({
     // 本地添加
     id: info.value.id, // 商品id
     name: info.value.name, // 商品名称
     picture: info.value.mainPictures[0], // 商品图片
     price: info.value.price, // 价格
     count: count.value, // 数量
     skuId: currentSkuId.value, // skuId
     attrsText: attrText || '', // 规格描述 => 黑色 国产 41
     selected: true, // 是否选中
     nowPrice: info.value.price, // 现价
     stock: info.value.inventory, // 库存
     isEffective: true, // 是否有效
   })
  Message.success('加入购物车成功')
}
</script>
<template>
  <div class="xtx-goods-page">
    <div class="container"  >
          <div v-if="info.categories">
            <!-- 面包屑 -->
            <XtxBread>
              <XtxBreadItem to="/">首页</XtxBreadItem>
              <XtxBreadItem :to="`/category/${info.categories[1].id}`">{{info.categories[1].name}}</XtxBreadItem>
              <XtxBreadItem :to="`/category/${info.categories[0].id}`">{{info.categories[0].name}}</XtxBreadItem>
              <XtxBreadItem>{{info.name}}</XtxBreadItem>
            </XtxBread>
            <!-- 商品信息 -->
            <div class="goods-info">
              <div class="media">
<!--                图片 hooks函数库-->
                <GoodsImage :images="info.mainPictures"></GoodsImage>
                <GoodsSales :goods="info"></GoodsSales>
              </div>
              <div class="spec">
<!--                商品名称-->
                <GoodName :goods="info"></GoodName>
<!--                SKU组件，选择规格-->
                <GoodsSku :goods="info" @changeSku="changeSku"></GoodsSku>
<!--                数字选择框-->
                <XtxNumbox v-model="count" :max="10" :main="1"></XtxNumbox>
<!--                按钮组件 -->
                <XtxButton type="primary" style="margin-top: 20px" @click="addCart">加入购物车</XtxButton>
              </div>
            </div>
            <!-- 商品详情 -->
            <div class="goods-footer">
              <div class="goods-article">
                <!-- 商品+评价 -->
                <div class="goods-tabs">
                    <GoodsDetail :goods="info"></GoodsDetail>
                </div>
              </div>
              <!-- 24热榜+专题推荐 -->
              <div class="goods-aside"></div>
            </div>
          </div>
<!--        占位的-->
        <div v-else>
          <!-- 面包屑 -->
          <XtxBread>
            <XtxBreadItem to="/">首页</XtxBreadItem>
          </XtxBread>
          <!-- 商品信息 -->
          <div class="goods-info"></div>
          <!-- 商品详情 -->
          <div class="goods-footer">
            <div class="goods-article">
              <!-- 商品+评价 -->
              <div class="goods-tabs"></div>
            </div>
            <!-- 24热榜+专题推荐 -->
            <div class="goods-aside">
              <!-- 24热榜+专题推荐 -->
                <GoodsHot :type="1" />
                <GoodsHot :type="2" />
                <GoodsHot :type="3" />
            </div>
          </div>
        </div>
  </div>

  </div>
</template>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
