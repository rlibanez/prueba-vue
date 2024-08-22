import { createRouter, createWebHistory } from 'vue-router';
import UsersView from '@/views/UsersView.vue';

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
    path: '/',
    redirect: '/users'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
