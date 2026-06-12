import ui from '@nuxt/ui/vue-plugin'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Index from './pages/Index.vue'
import './style.css'

const router = createRouter({
  routes: [
    { path: '/', component: Index },
  ],
  history: createWebHistory(),
})

const app = createApp(App)

app.use(router)
app.use(ui)

app.mount('#app')
