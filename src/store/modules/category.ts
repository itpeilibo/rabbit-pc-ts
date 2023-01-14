import { defineStore } from 'pinia'
import request from '@/utils/request'
import {ApiRes,CategoryItem} from '@/types/data'
export default defineStore('category', {
  state() {
    return {
      list: [] as CategoryItem[]
    }
  },
  actions: {
      async getAllCategory() {
          const {data:res} = await request.get<ApiRes<CategoryItem[]>>('/home/category/head')
         this.list = res.result
      },
  }
})
