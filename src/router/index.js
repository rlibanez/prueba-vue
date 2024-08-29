import { createRouter, createWebHistory } from 'vue-router';
import AuthorsView from '@/views/AuthorsView.vue';
import AuthorsDetailView from '@/views/AuthorsDetailsView.vue';
import AboutView from '@/views/AboutView.vue';
import CreateView from '@/views/CreateView.vue';

const routes = [
  {
    path: '/authors',
    component: AuthorsView
  },
  {
    path: '/authors/:id',
    component: AuthorsDetailView
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
    redirect: '/authors'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
