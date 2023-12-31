// 所有接口的通用类型
export interface ApiRes <T>{
    code: string,
    msg: string,
    result: T
}
export interface CateGoodsItem {
    desc:string
    id:string
    name:string
    picture:string
    price:string
}
//单个分类的类型
export interface CategoryItem {
    id: string,
    name: string,
    picture: string,
    children: CategoryItem[],
    goods: CateGoodsItem[],
    parentId: string,
    parentName: string,
    open:boolean
}
//   轮播每一项的类型声明
export interface BannerItem {
    id: string;
    imgUrl: string;
    hrefUrl: string;
    type: string;
}
export interface GoodItem {
  id: string;
  name: string;
  desc: string;
  price: string;
  picture: string;
  discount?: any;
  orderNum: number;
}
// 首页主体-人气推荐
export interface HotGoods {
    id: string
    picture: string
    title: string
    alt: string
  }
export interface Brand  {
    id: string
    name: string
    nameEn: string
    logo: string
    picture: string
    type?: any
    desc: string
    place: string
}

// 首页商品推荐
export interface HomeProduct {
    id: string
    name: string
    picture: string
    saleInfo: string
    children: {
        id: string
        name: string
    }[]
    goods: {
        id: string
        name: string
        desc: string
        price: string
        picture: string
        discount?: any
    }[]
}

export interface Special {
    creator: string
    isDelete: number
    createTime: string
    updateTime: string
    id: string
    classificationId: string
    title: string
    summary: string
    lowestPrice: number
    cover: string
    detailsUrl: string
    collectNum: number
    viewNum: number
    replyNum: number
}
// 顶级分类类型
export type TopCategory = {
    id: string
    name: string
    picture: string
    children: CategoryItem[]
}

export type SaleProperty = {
    id: string
    name: string
    properties: {
        id: string
        name: string
    }[]
}

export interface SubCategory {
    id: string
    name: string
    picture?: any
    parentId: string
    parentName: string
    brands: {
        id: string
        name: string
        nameEn: string
        logo: string
        picture: string
        type?: any
        desc: string
        place: string
    }[]
    saleProperties: SaleProperty[],
    goods: GoodItem[]
}
