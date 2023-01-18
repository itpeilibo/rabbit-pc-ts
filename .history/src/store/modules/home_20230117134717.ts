import {defineStore} from 'pinia'
import request from "@/utils/request";
import { BannerItem,ApiRes } from '@/types/data';
import { GoodItem } from '../../types/data';
export default defineStore('home', {
    state() {
        return {
            bannerList: [] as BannerItem[],
            newGoodList: [] as GoodItem[]
        }
    },
    actions: {
        async getBannerList() {
            const { data: res } = await request.get<ApiRes<BannerItem[]>>('/home/banner')
            this.bannerList = res.result
        },
        // 请求内容数据
        async getNewList() {
            const { data: res } = await request.get<ApiRes<GoodItem[]>>('/home/new')
            this.newGoodList = res
            console.log(res);
        }
    }
})