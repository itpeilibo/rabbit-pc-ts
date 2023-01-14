import { defineStore } from 'pinia'
import request from '@/utils/request'
export default defineStore('category', {
  state() {
    return {
      list: []
    }
  },
  actions: {
     getCategoryList() {
      const res = request('')
    }
  }
})