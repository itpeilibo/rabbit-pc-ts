import {defineStore} from 'pinia'
import request from "@/utils/request";
import {ApiRes} from "@/types/data";
import {GoodsInfo} from "@/types/goods";
export default defineStore('goods', {
    state: () => ({
    //    商品详细信息
        info: {} as GoodsInfo
    }),
    actions: {
        async getGoodsInfo(id:string) {
            const {data:res} = await request.get<ApiRes<GoodsInfo>>('/goods',{params:{id}})
            this.info = res.result
        },
        resetGoodsInfo() {
            this.info = {} as GoodsInfo
        }
    }
})

