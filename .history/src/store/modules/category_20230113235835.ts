import { defineStore } from 'pinia'
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