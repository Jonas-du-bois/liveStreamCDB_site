import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { registerSW } from 'virtual:pwa-register'
import App from './App.vue'
import OnePageCDB from './components/OnePageCDB.vue'
import SingleStream from './components/SingleStream.vue'

// Enregistrement du service worker PWA
const updateSW = registerSW({
  onNeedRefresh() {
    // Une mise à jour est disponible
    if (confirm('Une nouvelle version est disponible. Mettre à jour ?')) {
      updateSW()
    }
  },
  onOfflineReady() {
    console.log('L\'application est prête pour une utilisation hors ligne')
  }
})

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: OnePageCDB
        },
        {
            path: '/stream/:id',
            component: SingleStream
        }
    ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')
