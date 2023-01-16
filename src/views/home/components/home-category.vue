<script lang="ts" setup name="HomeCategory">
import useStore from "@/store";
import {computed, ref} from "vue";
// import XtxSkeleton from '@/components/skeleton/index.vue'
const {category} = useStore()

//实现思路
// 1.鼠标进入某个 li，记录id
// 2.根据记录的 id，动态的获取1需要展示 layer goods数据
const categoryId = ref('')
const handleEnter = (id:string) => {
  if (!id) return
  categoryId.value = id
}
const goods = computed(() => {
  const itemObj = category.list.find(item => item.id === categoryId.value)
  return itemObj?.goods
})
</script>
<template>
  <div class="home-category" @mouseleave="categoryId = ''">
<!--    菜单-->
    <ul class="menu">
      <li v-for="(item,index) in category.list"
          :key="index"
          @mouseenter="handleEnter(item.id)"
          :class="{active: item.id === categoryId}"

      >
        <RouterLink to="/">{{item.name}}</RouterLink>
<!--   提供的假数据，没有children，后台返回的数据，万一没有children，也会报错     -->
<!--        template 是 vue 内置的模板标签，不会渲染任何结构，只是用于划分结构快-->
       <template v-if="item.children">
         <RouterLink to="/" v-for="sub in item.children?.slice(0, 2)" :key="sub.id">
           {{sub.name}}
         </RouterLink>
       </template>
        <template v-else>
          <XtxSkeleton style="margin-left:5px " :width="60" :height="30" bg="rgba(255, 255, 255, 0.2)" :animated=true :fade=true></XtxSkeleton>
          <XtxSkeleton style="margin-left:10px " :width="60" :height="30" bg="rgba(255, 255, 255, 0.2)" :animated=true :fade=true></XtxSkeleton>
        </template>
      </li>
    </ul>
    <!-- 弹层 -->
    <div class="layer" v-if="goods">
      <h4>分类推荐 <small>根据您的购买或浏览记录推荐</small></h4>
      <ul>
        <li v-for="item in goods" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="">
            <div class="info">
              <p class="name ellipsis-2">{{item.name}}</p>
              <p class="desc ellipsis">{{item.desc}}</p>
              <p class="price"><i>¥</i>{{item.price}}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>

  </div>
</template>

<style scoped lang="less">
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;
  .menu {
    li {
      padding-left: 40px;
      height: 55px;
      line-height: 55px;
      &:hover,
      &.active {
        background: @xtxColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
  .layer {
    width: 990px;
    height: 500px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    left: 250px;
    top: 0;
    display: none;
    padding: 0 15px;
    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;
      small {
        font-size: 16px;
        color: #666;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;
        &:nth-child(3n) {
          margin-right: 0;
        }
        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;
          &:hover {
            background: #e3f9f4;
          }
          img {
            width: 95px;
            height: 95px;
          }
          .info {
            padding-left: 10px;
            line-height: 24px;
            width: 190px;
            .name {
              font-size: 16px;
              color: #666;
            }
            .desc {
              color: #999;
            }
            .price {
              font-size: 22px;
              color: @priceColor;
              i {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
  &:hover {
    .layer {
      display: block;
    }
  }
}
</style>
