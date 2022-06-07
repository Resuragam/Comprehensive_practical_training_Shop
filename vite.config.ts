import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport, { VantResolve } from 'vite-plugin-style-import'
import WindiCSS from 'vite-plugin-windicss'
import Icons from 'unplugin-icons/vite'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, 'src'), // 路径别名
    },
    extensions: ['.js', '.json', '.ts'] // 使用路径别名时想要省略的后缀名，可以自己 增减
  },
  plugins: [
    vue(),
    WindiCSS(),
    Icons({ autoInstall: true }),
    styleImport({
      resolves: [VantResolve()],
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://101.43.184.159:8005/api',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      },
    }
  }
})
