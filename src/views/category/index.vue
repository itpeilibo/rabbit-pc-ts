<script lang="ts" name="TopCategory" setup>
import {useRoute} from 'vue-router'
import useStore from "@/store";
import {watch, watchEffect} from "vue";
import {storeToRefs} from "pinia";
import GoodsItem from './components/goods-item.vue'
const route = useRoute()
const {category,home} = useStore()
const {topCategory } = storeToRefs(category)
// 由于路由切换，组件没有换，还是同一个分类组件，只是根据不同的id渲染不同的分类
//  setup只会执行一次，就应该监听路由的变化，路由只要变了，就应该发送请求
// watch(
//     () => route.params.id,
//         (newVal) => {
//       if (!newVal) return
//       //     if(route.fullPath === '/category/${newValue}')
//   category.getTopCategory(route.params.id as string)
// },{
//       immediate:true
//     })
watchEffect(() => {
//  如果用到的数据，确实都需要依赖，依赖了就要变化 => watchEffect
//  有参数才发请求，没有参数直接return
  if (!route.params.id) return
  //这个请求，只在一级类目去发
  if (route.fullPath !== `/category/${route.params.id}`) return;
  category.getTopCategory(route.params.id as string)
})
home.getBannerList()
</script>
<template>
  <div class="top-category">
<!-- 为了和组件库统一 => 组件库都是这么处理的，我们这么封装，是和组件库同步了   -->
     <div class="container">
       <XtxBread>
         <XtxBreadItem to="/">首页</XtxBreadItem>
         <XtxBreadItem>{{category.topCategory.name}}</XtxBreadItem>
       </XtxBread>
       <XtxCarousel :slides="home.bannerList"
        autoplay
                    style="height: 500px"
       ></XtxCarousel>
       <!-- 所有二级分类 -->
       <div class="sub-list">
         <h3>全部分类</h3>
         <ul>
           <li v-for="item in topCategory.children" :key="item.id">
             <router-link :to="`/category/sub/${item.id}`">
               <img v-lazy="item.picture"/>
               <p>{{item.name}}</p>
             </router-link>

           </li>
         </ul>
       </div>
       <!-- 分类关联商品 -->
       <div class="ref-goods" v-for="item in category.topCategory.children">
         <div class="head">
           <h3>- {{item.name}} -</h3>
           <p class="tag">温暖柔软，品质之选</p>
           <XtxMore />
         </div>
         <div class="body">
           <GoodsItem v-for="goods in item.goods" :key="goods.id" :goods="goods"/>
         </div>
       </div>
     </div>
  </div>
</template>
<style scoped lang="less">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}
.ref-goods {
  background-color: #fff;
  margin-top: 20px;
  position: relative;
  .head {
    .xtx-more {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .tag {
      text-align: center;
      color: #999;
      font-size: 20px;
      position: relative;
      top: -20px;
    }
  }
  .body {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 65px 30px;
  }
}
</style>
