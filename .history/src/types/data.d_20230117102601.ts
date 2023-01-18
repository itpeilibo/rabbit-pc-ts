// 所有接口的通用类型
export interface ApiRes <T>{
    code: string,
    msg: string,
    result: T
}
export interface CategoryGoods {
    desc:string
    id:string
    name:string
    picture:string
    price:string
}
//单个接口的类型
export interface CategoryItem {
    id: string,
    name: string,
    picture: string,
    children: CategoryItem[],
    goods: CategoryGoods[]
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