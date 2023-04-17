import {Profile} from "@/types/user";

const PROFILE_KEY = 'rabbit-pc-profile'
// 1. 设置个人信息
export const setProfile = (profile: Profile): void => {
    localStorage.setItem(PROFILE_KEY,JSON.stringify(profile))
}
// 2. 获取个人信息
export const getProfile = (): Profile => {
    return JSON.parse(localStorage.getItem(PROFILE_KEY) || '{}')
}
// 3. 删除个人信息
export const removeProfile = (): void => {
    localStorage.removeItem(PROFILE_KEY)
}
