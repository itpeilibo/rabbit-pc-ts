<script name="CallbackBind" lang="ts" setup>
// 获取QQ头像和昵称
import {ref} from "vue";
import {QQUserInfo, QQUserInfoRes} from "@/types/user";
import {useField, useForm} from "vee-validate";
import {codeRule, mobileRule} from "@/utils/validate";
import useStore from "@/store";
import Message from "@/components/message";
import {useCountDown} from "@/utils/hooks";
import router from "@/router";
const {user} = useStore()
const qqInfo = ref<QQUserInfo>({} as QQUserInfo)
let openId = ''
// 1. 判断QQ是否登录
if (QC.Login.check()) {
  // 2. 获取QQ的信息
  QC.api('get_user_info').success((res: QQUserInfoRes) => {
    qqInfo.value = res.data
  })
  // 3. 立刻获取openId
  QC.Login.getMe((id) => {
    openId = id
  })
}
const {validate, resetForm} = useForm({
  validationSchema: {
    mobile: mobileRule,
    code: codeRule
  }
})
const {value: mobile,errorMessage: mobileError} = useField<string>('mobile')
const {value: code,errorMessage: codeError} = useField<string>('code')
const {time,start} = useCountDown(60)
const send = async () => {
  if (time.value > 0) return
  await user.sendQQBindMsg(mobile.value)
  // 添加提示
  Message.success('发送验证码成功')
  // 开启倒计时
  start()
}
const bind = async () => {
  // 先校验
  const res = await validate()
  if (!res.valid) return

  // 校验通过，发请求进行绑定
  await user.qqBindLogin(openId,mobile.value,code.value)
  Message.success('QQ绑定成功')
  await router.push('/')
}

</script>
<template>
  <div class="xtx-form">
    <div class="user-info">
      <img
          :src="qqInfo.figureurl"
          alt=""
      />
      <p>Hi，{{qqInfo.nickname}} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <input class="input" v-model="mobile" type="text" placeholder="绑定的手机号" />
      </div>
      <div class="error" v-if="mobileError">{{mobileError}}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <input v-model="code" class="input" type="text" placeholder="短信验证码" />
        <span class="code" @click="send">{{time === 0 ? '发送验证码' : `${time}s后发送`}}</span>
      </div>
      <div class="error" v-if="codeError">{{codeError}}</div>
    </div>
    <a href="javascript:;" class="submit" @click="bind">立即绑定</a>
  </div>
</template>

<style scoped lang="less">
.user-info {
  width: 320px;
  height: 70px;
  margin: 0 auto;
  display: flex;
  background: #f2f2f2;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 25px;
  img {
    background: #f2f2f2;
    width: 50px;
    height: 50px;
  }
  p {
    padding-left: 10px;
  }
}
.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 80px;
  color: #999;
  &:hover {
    cursor: pointer;
  }
}
</style>
