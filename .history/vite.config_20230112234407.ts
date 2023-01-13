import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 用的是 node 的语法，需要用 require,安装一个类型声明文件
// yarn add @types/node -D
// npm i @types/node -D
// const path = require('path')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port:3000
  }
})