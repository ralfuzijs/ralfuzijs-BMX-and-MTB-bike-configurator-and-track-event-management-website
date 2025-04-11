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
    // Add the user login route
    {
      path: '/login',
      name: 'user-login',
      component: () => import('@/views/user-login-view.vue'),
    },
    // Add user profile route (placeholder for now)
    {
      path: '/user-profile',
      name: 'user-profile',
      component: () => import('@/views/user-view.vue'),
      meta: { requiresUserAuth: true }
    },
  ],
})

// Navigation guard to check authentication for routes that require it
router.beforeEach((to, from, next) => {
  const { checkAuth } = useAuth();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresUserAuth = to.matched.some(record => record.meta.requiresUserAuth);
  
  if (requiresAuth && !checkAuth()) {
    // Redirect to admin login page if admin auth required
    next({ name: 'admin-login' });
  } else if (requiresUserAuth && !localStorage.getItem('user_token')) {
    // Redirect to user login page if user auth required
    next({ name: 'user-login' });
  } else {
    next();
  }
});

export default router