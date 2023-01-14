import { defineStore } from 'pinia'
import from ''
export default defineStore('category', {
  state() {
    return {
      list: []
    }
  },
  actions: {
     async getCategoryList() {
      const res = await request('')
    }
  }
})