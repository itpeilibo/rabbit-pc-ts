/// <reference types="vite/client" />
// 在这个命名空间下，可以声明很多的方法
declare namespace QC {
    type callbackFn = (openId: string) => void
    const Login: {
        signOut: () => void // 退出
        check: () => boolean
        getMe: (callback: callbackFn) => void
    }
    const api: (api: 'get_user_info') => {
        success: any
    }
}
