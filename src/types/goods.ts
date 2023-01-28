// Sku类型，最小库存单元 => 决定是否启用禁用
export type Sku = {
    id: string
    inventory: number
    oldPrice: string
    price: string
    skuCode: string
    // 当前存货单元(sku)的相关属性
    specs: {
        name:string,
        valueName: string
    }[]
}
// 商品的规格的值的类型
export type SpecValue = {
    desc: string // 描述
    name: string // 黑色 白色 绿色 墨绿色
    picture: string // 图片
    selected: boolean // 控制选中还是没选中
    disabled: boolean // 根据disabled属性控制按钮是否禁用
}
export type Spec = {
    name: string // 颜色
    values: SpecValue[]
}
// 商品模块的类型声明
export type GoodsInfo = {
    id: string
    name: string
    spuCode: string
    desc: string
    price: string
    oldPrice: string
    discount: number
    inventory: number
    salesCount: number
    commentCount: number
    collectCount: number
    mainVideos: any[]
    videoScale: number
    mainPictures: string[]
    isPreSale: boolean
    isCollect?: any
    recommends?: any
    userAddresses?: any
    evaluationInfo?: any
    categories: {
        id: string
        name: string
    }[]
    specs: Spec[]
    skus: Sku[]
}
