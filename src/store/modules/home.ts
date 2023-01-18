import {defineStore} from 'pinia'
import request from "@/utils/request";
import {BannerItem, ApiRes, GoodItem, HotGoods, Brand, HomeProduct, Special} from '@/types/data';
export default defineStore('home', {
    state() {
        return {
            bannerList: [] as BannerItem[],
            newGoodList: [] as GoodItem[],
            hotGoodList: [] as HotGoods[],
            brandList: [] as Brand[],
            productList: [] as HomeProduct[],
            specialList: [] as Special[],
        }
    },
    actions: {
        async getBannerList() {
            const { data: res } = await request.get<ApiRes<BannerItem[]>>('/home/banner')
            this.bannerList = res.result
        },
        // 请求内容数据
        async getNewList() {
            setTimeout(async () => {
                const { data: res } = await request.get<ApiRes<GoodItem[]>>('/home/new')
                this.newGoodList = res.result
            },500)
        },
        // 首页主体-人气推荐
        async getHotList() {
            setTimeout(async () => {
                const { data: res } = await request.get<ApiRes<HotGoods[]>>('/home/hot')
                this.hotGoodList = res.result
            },500)
        },
        // 获取品牌数据
        async getBrandList() {
            setTimeout(async () => {
                const res = await request.get<ApiRes<Brand[]>>('/home/brand')
                this.brandList = res.data.result
            },500)
        },
        async getProductList() {
            const res = await request.get<ApiRes<HomeProduct[]>>('/home/goods')
            this.productList = res.data.result
        },
        async getSpecialList() {
            const res = await request.get<ApiRes<Special[]>>('/home/special')
            this.specialList = res.data.result
        },
    }
})
