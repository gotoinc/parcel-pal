import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router.js'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import './assets/css/main.css'
import { makeServer } from './mock-api/server.js'

makeServer()

const app = createApp(App)

app.use(router)
app.use(ElementPlus)

app.mount('#app')
