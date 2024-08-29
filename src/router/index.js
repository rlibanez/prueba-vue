import { createRouter, createWebHistory } from 'vue-router';
import AuthorsView from '@/views/AuthorsView.vue';
import AuthorsDetailView from '@/views/AuthorsDetailsView.vue';
import BookDetailView from '@/views/BooksDetailsView.vue';
import AboutView from '@/views/AboutView.vue';
import AuthorCreateView from '@/views/AuthorCreateView.vue';
import BookCreateView from '@/views/BookCreateView.vue';
import BooksView from '@/views/BooksView.vue';

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
    path: '/create-author',
    component: AuthorCreateView
  },
  {
    path: '/create-book',
    component: BookCreateView
  },
  {
    path: '/',
    redirect: '/authors'
  },
  {
    path: '/books',
    component: BooksView
  },
  {
    path: '/books/:id',
    component: BookDetailView,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
