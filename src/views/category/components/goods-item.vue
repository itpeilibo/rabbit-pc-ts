<script lang="ts" setup name="GoodsItem">
import {defineProps, PropType} from "vue";
import {CateGoodsItem} from "@/types/data";
// defineProps({
//   goods: {
//     type:Object as PropType<GoodItem>,
//     default: () => {}
//   }
// })
// vue + ts 写法
defineProps<{ goods:CateGoodsItem  }>()
</script>

<template>
  <RouterLink :to="`/goods/${goods.id}`" class="goods-item">
    <img
        v-lazy="goods.picture"
        alt=""
    />
    <p class="name ellipsis">{{goods.name}}</p>
    <p class="desc ellipsis">{{goods.desc}}</p>
    <p class="price">&yen;{{goods.price}}</p>
  </RouterLink>
</template>


<style scoped lang="less">
.goods-item {
  display: block;
  width: 220px;
  padding: 20px 30px;
  text-align: center;
  .hoverShadow();
  img {
    width: 160px;
    height: 160px;
  }
  p {
    padding-top: 10px;
  }
  .name {
    font-size: 16px;
  }
  .desc {
    color: #999;
    height: 29px;
  }
  .price {
    color: @priceColor;
    font-size: 20px;
  }
}
</style>
