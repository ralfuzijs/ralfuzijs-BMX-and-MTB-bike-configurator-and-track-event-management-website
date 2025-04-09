import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home-view.vue'
import { useAuth } from '@/composables/useAuth'

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
      path: '/admin/login',
      name: 'admin-login',
      component: () => import('@/admin/views/admin-login-view.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/admin/views/admin-view.vue'),
      meta: { requiresAuth: true }
    },
  ],
})

// Navigation guard to check authentication for routes that require it
router.beforeEach((to, from, next) => {
  const { checkAuth } = useAuth();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  
  if (requiresAuth && !checkAuth()) {
    // Redirect to login page if not authenticated
    next({ name: 'admin-login' });
  } else {
    next();
  }
});

export default router