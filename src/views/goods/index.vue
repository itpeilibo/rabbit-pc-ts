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
const {goods} = useStore()
const route = useRoute()
const count = ref(5)
watchEffect(() => {
  const id = route.params.id
  // 必须id存在，且是商品页才发请求
  if (id && route.fullPath === `/goods/${id}`) {
    goods.resetGoodsInfo()
    goods.getGoodsInfo(id as string)
  }
})
const { info } = storeToRefs(goods)
const changeSku = (skuId: string) => {
  const sku = info.value.skus.find(item => item.id === skuId)
  if (sku) {
    info.value.inventory = sku.inventory // 更新库存
    info.value.price = sku.price // 更新价格
    info.value.oldPrice = sku.oldPrice // 更新老价格
  }
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
                <XtxButton type="primary" style="margin-top: 20px">加入购物车</XtxButton>
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
