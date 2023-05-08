import { createRouter, createWebHistory } from 'vue-router';
import Cookies from 'js-cookie';
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';

function requireAuth(to, from, next) {
  const isAuthenticated = Cookies.get('access_token');
  if (isAuthenticated) {
    next('/home');
  } else {
    next('/login');
  }
}

const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/home', component: Home },
  { path: '/', redirect: '/Login'}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
