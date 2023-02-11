import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/category/:name',
    name: 'Category',
    component: () => import('../views/CategoryView.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
