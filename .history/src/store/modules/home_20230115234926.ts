import {defineStore} from 'pinia'
import request from "@/utils/request";
import { BannerItem,ApiRes } from '@/types/data';
export default defineStore('home', {
    state() {
        return {
            bannerList: []
        }
    },
    actions: {
        async getBannerList() {
            const res = await request.get<ApiRes>('/home/banner')
            console.log(res)
        }
    }
})
