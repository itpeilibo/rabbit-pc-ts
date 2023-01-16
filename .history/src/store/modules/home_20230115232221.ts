import {defineStore} from 'pinia'
import request from "@/utils/request";
export default defineStore('home', {
    state() {
        return {
            bannerList: []
        }
    },
    actions: {
        async getBannerList() {
            const res = await request.get('/home/banner')
            console.log(res)
        }
    }
})
