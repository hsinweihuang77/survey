import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/Front',
      name: 'Front',
      component: () => import('../views/Front.vue')
    },
    {
      path: '/FillinSurvey/',
      name: 'FillinSurvey',
      component: () => import('../views/FillinSurvey.vue')
    },
    {
      path: '/Back',
      name: 'Back',
      component: () => import('../views/Back.vue')
    },
    {
      path: '/CreateSurvey/',
      name: 'CreateSurvey',
      component: () => import('../views/CreateSurvey.vue')
    },
    {
      path: '/CheckSurvey',
      name: 'CheckSurvey',
      component: () => import('../views/CheckSurvey.vue')
    },
    {
      path: '/Feedback',
      name: 'Feedback',
      component: () => import('../views/Feedback.vue')
    },
    {
      path: '/FeedbackDetail',
      name: 'FeedbackDetail',
      component: () => import('../views/FeedbackDetail.vue')
    },
    {
      path: '/Statistics',
      name: 'Statistics',
      component: () => import('../views/Statistics.vue')
    },
  ]
})

export default router
