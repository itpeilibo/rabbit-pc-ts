import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import vueJsx from '@vitejs/plugin-vue-jsx'
// 用的是 node 的语法，需要用 require,安装一个类型声明文件
// yarn add @types/node -D
// npm i @types/node -D
// const path = require('path')
import {resolve} from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    reactivityTransform:true
  }),
    vueSetupExtend(),
    vueJsx()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  server: {
    host: "www.corho.com",
    port:8080,
    open: true, // 帮我们打开浏览器
    cors: true, // 允许开发时 ajax 跨域
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `
          @import "@/assets/styles/variables.less";
          @import "@/assets/styles/mixins.less";
        `
      }
    }
  }
})
