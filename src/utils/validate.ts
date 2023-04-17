export function accountRule(value: string) {
    //  校验1：非空校验，return 的就是错误信息
    if (!value) return '请输入用户名'
    //  校验2：6-20个字符，必须以字母开头 正则
    if (!/^[a-zA-Z]\w{5,19}$/.test(value)) return '必须是字母开头的6-20个字符'
    // 如果校验通过，需要return true，其他说有情况，都是失败
    return true
}
export function passwordRule(value: string) {
    if (!value) return '请输入密码'
    if (!/^\w{6,12}$/.test(value)) return '必须是6-12位字符'
    return true
}
export function isAgreeRule(value: string) {
    if (!value) return '请输入许可'
    return true
}
export function mobileRule(value: string) {
    if (!value) return '请输入手机号'
    if (!/^1[3-9]\d{9}$/.test(value)) return '手机号格式有误'
    return true
}
export function codeRule(value: string) {
    if (!value) return '请输入验证码'
    if (!/^\d{6}$/.test(value)) return '验证码格式有误'
    return true
}
export function rePasswordRule(value: string, { form }: any) {
    if (!value) return '请输入确认密码'
    if (!/^\w{6,24}$/.test(value)) return '密码是6-12个字符'
    // 校验密码是否一致  form表单数据对象
    if (value !== form.password) return '两次输入的密码不一致'
    return true
}
