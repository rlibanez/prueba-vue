import { createRouter, createWebHistory } from 'vue-router';
import UsersView from '@/views/UsersView.vue';
import AboutView from '@/views/AboutView.vue';

const routes = [
  {
    path: '/users',
    component: UsersView
  },
  {
    path: '/users/:id',
    component: UsersView
  },
  {
    path: '/about',
    component: AboutView
  },
  {
    path: '/',
    redirect: '/users'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
