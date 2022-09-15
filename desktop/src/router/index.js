import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'chartUpload',
    component: () => import('../views/ChartUpload.vue')
  },
  {
    path: '/chart',
    redirect: '/',
    children: [
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
