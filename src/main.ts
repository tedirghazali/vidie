import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import HomePage from './pages/HomePage.vue'
import CalendarPage from './pages/CalendarPage.vue'
import TablePage from './pages/TablePage.vue'
import InvoicePage from './pages/InvoicePage.vue'
import './assets/alga-v1.min.css'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/calendar', component: CalendarPage },
    { path: '/table', component: TablePage },
    { path: '/invoice', component: InvoicePage }
  ]
})

createApp(App).use(router).mount('#app')
