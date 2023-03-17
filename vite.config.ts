import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // 路径别名
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src') }
    ]
  },
})