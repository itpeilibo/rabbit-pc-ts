import { defineStore } from "pinia";
import request from "@/utils/request";
import {ApiRes} from "@/types/data";
import {CartItem} from "@/types/cart";
import useStore from "@/store";

type CheckObj = {
    isEffective: boolean
    nowPrice: number
    stock: number
}

const useCartStore = defineStore('cart', {
    // 状态
    state() {
        return {
            list: [] as CartItem[] // 购物车数组
        }
    },
    persist: {
        key:'rabbit_cart'
    },
    // 计算
    getters: {
        // 标记是否登录
        isLogin(): boolean {
            const { user } = useStore()
            return !!user?.profile?.token
            // return Boolean(user?.profile?.token)
        },
        // 基于原有的数据，进行筛选，筛选出有效的购物车列表
        // 计算有效商品列表 isEffective = true  filter
        effectiveList():CartItem[] {
            return this.list.filter(item => item.isEffective && item.stock > 0)
        },
        // 有效商品的总数量
        effectiveListCounts(): number {
            const total = this.effectiveList.reduce((sum,item,index) => {
                return sum + item.count
            },0)
            return total
        },
        // 有效总价 100.00
        effectiveListPrice(): string {
            const totalPrice = this.effectiveList.reduce((sum,item,index) => {
                return sum + item.count * +item.nowPrice
            },0)
            return  totalPrice.toFixed(2)
        },
        // 统计是否全部选中，设置是否全选
        isAllSelected(): boolean {
            return (
                this.effectiveList.every(item => item.selected) &&
                this.effectiveList.length !== 0
            )

        },
        // 已选择的列表
        selectedList(): CartItem[] {
            return this.effectiveList.filter(item => item.selected)
        },
        // 已选择的总数量
        selectedListCounts(): number {
            return this.selectedList.reduce((sum,item) => sum + item.count,0)
        },
        // 已选择的总价 => 保留两位小数的字符串
        selectedListPrice():string {
            return this.selectedList.reduce((sum,item) => sum + item.count * +item.nowPrice,0).toFixed(2)
        },


    },
    // 方法
    actions: {
        // 获取购物车列表
        async getCartList() {
            if (this.isLogin) {
                const {data:res} = await request.get<ApiRes<CartItem[]>>('/member/cart')
                this.list = res.result
            } else {
                this.list.forEach(async (cartItem) => {
                    const skuId = cartItem.skuId
                    const {data:res} = await request.get<ApiRes<CheckObj>>(`/goods/stock/${skuId}`)
                    const cartItemInfo = res.result
                    cartItem.nowPrice = (+cartItemInfo.nowPrice).toFixed(2)
                    cartItem.stock = cartItemInfo.stock
                    cartItem.isEffective = cartItem.isEffective
                })
            }
        },
        // 加入购物车
        async addCart(data:CartItem) {
            if (this.isLogin) {
                const {skuId,count} = data
                await request.post('/member/cart',{
                    skuId,
                    count
                })
                await this.getCartList()
            } else {
                console.log('本地操作',data)
                // 看 data.skuId 在 this.list 中 是否存在
                const goods = this.list.find(item => item.skuId === data.skuId)
                // (1) 已存在，数量上累加
                if (goods) {
                    goods.count += data.count
                // (2) 如果商品不存在，新增这个商品到数组中
                } else {
                    this.list.unshift(data)
                }
            }
        },
        // 删除购物车
        async deleteCart(skuIds: string[]) {
            if (this.isLogin) {
                await request.delete('/member/cart',{
                    //   params 中传递的参数，往地址栏拼接的
                    //   data 中传递的参数，往请求体中包装的
                    data: {
                        ids: skuIds
                    }
                })
                // 获取最新的购物车列表
                await this.getCartList()
            } else {
                // skuIds 数组，这些数组中项，都要删
                // 只要在 skuIds 数组中存在，就要删 => 都不留
                this.list = this.list.filter(item => !skuIds.includes(item.skuId))
            }
        },
        // 修改更新购物车商品 (数量，选中状态)
        async updateCart(
            skuId: string,
            data: {selected?: boolean,count?: number}
        ) {
           if (this.isLogin) {
               await request.put(`/member/cart/${skuId}`, data)
               // 重新获取购物车列表
               await this.getCartList()
           } else {
               const goods = this.effectiveList.find(item => item.skuId === skuId)
               if (data.selected !== undefined) {
                    goods!.selected = data.selected
               }
               if (data.count !== undefined) {
                   goods!.count = data.count
               }
           }
        },
        // 修改全选或者不全选
        async updateCartAllSelected(isSelected: boolean) {
           if (this.isLogin) {
               await request.put('/member/cart/selected',{
                   selected: isSelected
               })
               // 获取最新的购物车列表
               await this.getCartList()
           } else {
               this.list.forEach(item => {
                   item.selected = isSelected
               })
           }
        },

        // 清除购物车
        clearCart () {
            this.list = []
        },
        // 合并购物车 (只会在登录成功之后调用)
        async mergeLocalCart() {
            // 对现有的list数据，进行整理，发送请求到后台
            const data = this.list.map(item => {
                return {
                    skuId: item.skuId,
                    selected: item.selected,
                    count: item.count
                }
            })
            await request.post('/member/cart/merge',data)
            // 重新 获取购物车列表
            await this.getCartList()
        }
    },
});

export default useCartStore;
