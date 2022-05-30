import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store'
import { Button } from 'vant'
import 'virtual:windi.css'
const app = createApp(App);
app.use(router)
app.use(store)
app.use(Button)

app.mount('#app')

