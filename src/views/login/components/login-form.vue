<script lang="ts" setup name="LoginForm">
import useStore from "@/store/index";
import {ref, watch} from "vue";
import Message from "@/components/message";
import {useRouter} from "vue-router";
import {useField, useForm} from "vee-validate";

const router = useRouter()
const type = ref<'account' | 'mobile'>('account')
const {user} = useStore()

const changeFn = () => {
  console.log('值已修改')
}
// 添加校验
const { validate,resetForm } = useForm({
// 设置初始值
// initialValues

// 设置校验规则
validationSchema: {
  account(value: string) {
  //  校验1：非空校验，return 的就是错误信息
    if (!value) return '请输入用户名'
  //  校验2：6-20个字符，必须以字母开头 正则
    if (!/^[a-zA-Z]\w{5,19}$/.test(value)) return '必须是字母开头的6-20个字符'
  // 如果校验通过，需要return true，其他说有情况，都是失败
    return true
  },
  password(value: string) {
    if (!value) return '请输入密码'
    if (!/^\w{6,12}$/.test(value)) return '必须是6-12位字符'
    return true
  },
  isAgree(value: string) {
    if (!value) return '请输入许可'
    return true
  },
  mobile(value: string) {
    if (!value) return '请输入手机号'
    if (!/^1[3-9]\d{9}$/.test(value)) return '手机号格式有误'
  },
  code(value: string) {
    if (!value) return '请输入验证码'
    if (!/^\d{6}$/.test(value)) return '验证码格式有误'
  }
}
})
// value：用于和表单绑定的响应式数据
// errorMessage：错误信息提示，用于实时展示
const {value: account,errorMessage: accountError } = useField<string>('account')
const {value: password,errorMessage: passError} = useField<string>('password')
const {value: isAgree,errorMessage: isAgreeError} = useField<boolean>('isAgree')
const {value: mobile,errorMessage: mobileError,validate:validateMobile} = useField<string>('mobile')
const {value: code,errorMessage: codeError} = useField<string>('code')
const login = async () => {
  // 登陆前的校验
  const res = await validate()
  // 没有校验通过，直接 return
  if (!res.valid) return
  try {
    await user.login(account.value,password.value)
    Message.success('登录成功')
    await router.push('/')
  } catch (e) {
    Message.error('用户名或者密码错误')
  }
}

// 处理切换重置
watch(type,() => {
  // 一旦触发，说明切换了，直接重置
  resetForm()
})
// 处理发送验证码逻辑
const mobileRef = ref<HTMLInputElement | null>(null)
const time = ref(0) // 倒计时的秒数
let timeId = -1 // 定时器的id
const send = async () => {
  // 如果是在倒计时的过程中，不让send被重复点击的
  if (time.value > 0) return
// 后手机号通过校验，校验结果为 true 才发送验证码
//   const res = await validateMobile()
//   if (!res.valid) {
//     mobileRef.value?.focus()
//   }
//     await user.sendMobileCode(mobile.value)
//     Message.success('获取验证码成功')
  // 实现验证码
  time.value = 5
  timeId = window.setInterval(() => {
    time.value--
    if (time.value <= 0) {
      clearInterval(timeId)
    }
  },1000)
}
</script>
<template>
  <div class="account-box">
    <div class="toggle">
      <a href="javascript:;" @click="type = 'account'" v-if="type === 'mobile'">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a href="javascript:;" @click="type = 'mobile'" v-else>
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>
    <div class="form">
      <template v-if="type === 'account'">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <input v-model="account" type="text" placeholder="请输入用户名" />
          </div>
           <div class="error" v-if="accountError"><i class="iconfont icon-warning" />{{accountError}}</div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <input v-model="password" type="password" placeholder="请输入密码" />
          </div>
          <div class="error" v-if="passError"><i class="iconfont icon-warning" />{{passError}}</div>
        </div>
      </template>
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <input ref="mobileRef" v-model="mobile" type="text" placeholder="请输入手机号" />
          </div>
          <div class="error" v-if="mobileError"><i class="iconfont icon-warning" />{{mobileError}}</div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <input v-model="code" type="text" placeholder="请输入验证码" />
            <span class="code" @click="send">
              {{time === 0 ? '发送验证码' : `${time}秒后发送`}}
            </span>
          </div>
          <div class="error" v-if="codeError"><i class="iconfont icon-warning" />{{codeError}}</div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
          <XtxCheckbox v-model="isAgree" @change="changeFn">我已同意</XtxCheckbox>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
        <div class="error" v-if="isAgreeError"><i class="iconfont icon-warning" />{{isAgreeError}}</div>
      </div>
      <a href="javascript:;" class="btn" @click="login">登录</a>
    </div>
    <div class="action">
      <img
          src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
          alt=""
      />
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      cursor: pointer;
    }
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
