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
//   
  interface BannerItem {
    id: string;
    imgUrl: string;
    hrefUrl: string;
    type: string;
}
interface RootObject {
  code: string;
  msg: string;
  result: Result[];
}

interface Result {
  id: string;
  name: string;
  desc: string;
  price: string;
  picture: string;
  discount?: any;
  orderNum: number;
}