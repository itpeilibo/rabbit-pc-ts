import { defineStore } from 'pinia'
import request from '@/utils/request'
export default defineStore('category', {
  state() {
    return {
      list: []
    }
  },
  actions() {
    async getCategoryList() {
      const res = request('')
    }
  }
})