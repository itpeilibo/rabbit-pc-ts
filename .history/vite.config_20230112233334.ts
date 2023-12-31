import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 用的是 node 的语法，需要用 require
const path = require('path')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})