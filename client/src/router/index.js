import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/chart',
    redirect: '/',
    children: [
      {
        path: 'list',
        name: 'chartList',
        component: () => import('../views/CharstList.vue')
      },
      {
        path: 'user',
        name: 'chartUser',
        component: () => import('../views/UserCharts.vue')
      },
      {
        path: ':id',
        name: 'chart',
        component: () => import('../views/ChartView.vue'),
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
