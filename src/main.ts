import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store'
import * as Vant from 'vant'
import 'vant/lib/index.css';
import 'virtual:windi.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { Lazyload } from 'vant';

const app = createApp(App)
app.use(router)
app.use(store)

app.use(Lazyload, {
    lazyComponent: true,
});
// vant组件
app.use(Vant)
app.use(ElementPlus)
app.mount('#app')
console.log('here')
