import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home-view.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/about-me-view.vue'),
    },
    {
      path: '/MapOfTracks',
      name: 'MapOfTracks',
      component: () => import('../views/map-of-tracks-view.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin-view.vue'),
    },
  ],
})

export default router