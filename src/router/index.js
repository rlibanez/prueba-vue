import { createRouter, createWebHistory } from 'vue-router';
import UsersView from '@/views/UsersView.vue';
import UsersDetailView from '@/views/UsersDetailsView.vue';
import AboutView from '@/views/AboutView.vue';
import CreateView from '@/views/CreateView.vue';

const routes = [
  {
    path: '/users',
    component: UsersView
  },
  {
    path: '/users/:id',
    component: UsersDetailView
  },
  {
    path: '/about',
    component: AboutView
  },
  {
    path: '/create',
    component: CreateView
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
