import {defineStore} from 'pinia'
import request from "@/utils/request";
import { BannerItem,ApiRes,GoodItem,HotGoods} from '@/types/data';
export default defineStore('home', {
    state() {
        return {
            bannerList: [] as BannerItem[],
            newGoodList: [] as GoodItem[],
            hotGoodsList: [] as HotGoods[]
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
            this.newGoodList = res.result
            console.log(res.result);
        },
        // 首页主体-人气推荐
        async getHotList() {
            const { data: res } = await request.get<ApiRes<GoodItem[]>>('/home/new')
        }
    }
})