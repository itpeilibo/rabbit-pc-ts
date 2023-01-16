import { defineStore } from 'pinia'
import request from '@/utils/request'
import {ApiRes,CategoryItem} from '@/types/data'
import {topCategory} from '../constants'
const defaultCategory = topCategory.map((item) => {
    return {
        name: item
    }
})
export default defineStore('category', {
  state() {
    return {
      list: defaultCategory as CategoryItem[]
    }
  },
  actions: {
      async getAllCategory() {
          const {data:res} = await request.get<ApiRes<CategoryItem[]>>('/home/category/head')
         // 这里对后台返回回来的数据进行加工，新增一个属性 open，标记
         // 默认所有都隐藏
          res.result.forEach(item => {
              item.open = false
          })
         this.list = res.result
      },
      show(id: string) {
        const itemObj = this.list.find(item => item.id === id)
          itemObj!.open = true
      },
      hide(id:string) {
        const itemObj = this.list.find(item => item.id === id)
          itemObj!.open = false
      }
  }
})
