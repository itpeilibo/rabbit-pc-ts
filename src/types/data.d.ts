// 所有接口的通用类型
export interface ApiRes <T>{
    code: string,
    msg: string,
    result: T
}
//单个接口的类型
export interface CategoryItem {
    id: string,
    name: string,
    picture: string
}
