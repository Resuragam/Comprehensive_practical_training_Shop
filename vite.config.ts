import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport, { VantResolve } from 'vite-plugin-style-import'
import WindiCSS from 'vite-plugin-windicss'
import Icons from 'unplugin-icons/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    WindiCSS(),
    Icons({autoInstall: true}),
    styleImport({
      resolves: [VantResolve()],
    }),
  ]
})
