import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import OnePageCDB from './components/OnePageCDB.vue'
import SingleStream from './components/SingleStream.vue'

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
