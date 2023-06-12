<script lang="ts" setup name="AppTopnav">
import useStore from '@/store'
import router from "@/router";
import Message from "@/components/message";
import Confirm from "@/components/confirm";
const {user} = useStore()
const logoutFn = () => {
  Confirm({
    title:'温馨提示',
    text:'亲~你确认要进行退出操作吗？'
  }).then(() => {
    user.logout()
    router.push('/login')
    Message.success('退出成功')
  }).catch(()=> {
    console.log('取消')
  })

}
</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
      <template v-if="user.profile.token">
        <li>
          <a @click="$router.push('/member')" href="javascript:;"><i class="iconfont icon-user"></i>{{user.profile.nickname || user.profile.account}}</a>
        </li>
        <li><a href="javascript:;" @click="logoutFn">退出登录</a></li>
      </template>

      <template v-else>
        <li><RouterLink to="/login">请先登录</RouterLink></li>
        <li><a href="javascript:;">免费注册</a></li>
      </template>

        <li><a href="javascript:;" @click="$router.push('/member/order')">我的订单</a></li>
        <li><a href="javascript:;">会员中心</a></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li>
          <a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped lang="less">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: @xtxColor;
        }
      }
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
