import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

import SplashScreen from '@/views/SplashScreen.vue';
import LoginPage from '@/views/Login.vue';
import SalesPage from '@/views/Sales.vue';
import HomePage from '@/views/Home.vue';
import TransaksiPage from '@/views/Transaksi.vue';
import AboutPage from '@/views/About.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/splash' },

  { path: '/splash', name: 'Splash', component: SplashScreen },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/sales', name: 'Sales', component: SalesPage },
  { path: '/home', name: 'Home', component: HomePage },
  { path: '/transaksi', name: 'Transaksi', component: TransaksiPage },
  { path: '/about', name: 'About', component: AboutPage },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
