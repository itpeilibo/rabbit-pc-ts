import {defineStore} from 'pinia'
import request from "@/utils/request";
import {Profile} from "@/types/user";
import {ApiRes} from "@/types/data";
import {getProfile, removeProfile, setProfile} from "@/utils/storage";
import useStore from "@/store";
export default defineStore('user', {
    state() {
        return {
        //    个人信息 => 从本地取
            profile: getProfile()
        }
    },
    actions: {
    //    用户名和密码登录
        async login(account: string,password: string) {
            const {data:res} = await request.post<ApiRes<Profile>>('/login',{
                account,
                password
            })
            this.profile = res.result
            // 往本地存
            setProfile(res.result)
            const { cart } = useStore()
            await cart.mergeLocalCart()
        },
        // 手机号和验证码登录
        async mobileLogin(mobile: string, code: string) {
            const {data:res} = await request.post<ApiRes<Profile>>('/login/code', {
                mobile,
                code
            })
            // 1. 保存用户信息到 state 中
            this.profile = res.result
            // 往本地存
            setProfile(res.result)
            const { cart } = useStore()
            await cart.mergeLocalCart()
        },
        // qq登录
        async qqLogin(openId: string) {
            const {data:res} = await request.post('/login/social',{
                unionId: openId,
                source: 6
            })
            this.profile = res.result
            setProfile(res.result)
            const { cart } = useStore()
            await cart.mergeLocalCart()

        },
    //    提供绑定的 active 登录
        async qqBindLogin(openId: string,mobile: string, code: string) {
            const {data:res} = await request.post('/login/social/bind',{
                mobile,
                code,
                unionId: openId,
            })
            this.profile = res.result
            // 往本地存
            setProfile(res.result)
            const { cart } = useStore()
            await cart.mergeLocalCart()

        },
    //    获取短信验证码
        async sendMobileCode(mobile: string) {
            await request.get('/login/code',{
                params: {
                    mobile
                }
            })
        },

        // 绑定qq的短信验证码
        async sendQQBindMsg(mobile: string) {
            const {data:res} = await request.get('/login/social/code', {
                params: {
                    mobile
                }
            })
            this.profile = res.result
            setProfile(res.result)
        },
        // 无账号无绑定，获取短信验证码
// 绑定qq的短信验证码
        async sendQQPathMsg(mobile: string) {
            await request.get('/register/code', {
                params: {
                    mobile
                }
            })
        },
        // 无账号无绑定，完善信息进行登录
        async qqPatchLogin(data: any) {
            const res = await request.post<ApiRes<Profile>>(
                `/login/social/${data.openId}/complement`,
                data
            )
            // 1. 保存用户信息到 state 中
            this.profile = res.data.result
            setProfile(res.data.result)
        },
        // 退出
        logout() {
            // 清除个人信息
            this.profile = {} as Profile
            removeProfile()
            // 清空清除购物车信息
            const {cart} = useStore()
            cart.clearCart()

        }
    }
})
