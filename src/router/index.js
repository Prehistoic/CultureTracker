import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/SettingsView.vue')
  },
  {
    path: '/category/:type',
    name: 'Category',
    component: () => import('../views/CategoryView.vue')
  },
  {
    path: '/category/:type/asset/:id',
    name: 'Details',
    component: () => import('../views/AssetDetailsView.vue')
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: () => import('../views/WishlistView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
