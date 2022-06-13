import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport, { VantResolve } from 'vite-plugin-style-import'
import WindiCSS from 'vite-plugin-windicss'
import Icons from 'unplugin-icons/vite'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  base:'./',
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
    open: true,
    port: 8006,
    proxy: {
      '/api': {
        target: 'http://101.43.184.159:8006',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      },
    }
  },
  // server: {
  //   // 服务器主机名
  //   host: 'localhost',
  //   // 端口号
  //   port: 3333, // 不知为何更改会有问题
  //   // 设为 true 时若端口已被占用则会直接退出，
  //   // 而不是尝试下一个可用端口
  //   strictPort: true,
  //   cors: true, // 默认启用并允许任何源
  //   open: true, // 在服务器启动时自动在浏览器中打开应用程序
  //   // https.createServer()配置项
  //   https: false,
  //   // 反向代理配置，注意rewrite写法，开始没看文档在这里踩了坑
  //   proxy: {
  //     '/api': {
  //       target: 'http://101.43.184.159:8005', // 代理接口
  //       changeOrigin: true,
  //       rewrite: path => path.replace(/^\/api/, ''),
  //     },
  //   },
  // },
})
