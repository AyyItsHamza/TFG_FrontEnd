import { createRouter, createWebHistory } from 'vue-router';
import Cookies from 'js-cookie';
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Songs from './components/Songs.vue';
import Admin from './components/Admin.vue';

const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/home', component: Home },
  { path: '/', redirect: '/Login'},
  { path: '/songs', component: Songs},
  { path: '/admin', component: Admin}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
