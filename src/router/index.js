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
      path: '/SurveyDetailFront/:id',
      name: 'SurveyDetailFront',
      props: true,
      component: () => import('../views/SurveyDetailFront.vue')
    },
    {
      path: '/SurveyCheckFront/:id',
      name: 'SurveyCheckFront',
      props: true,
      component: () => import('../views/SurveyCheckFront.vue')
    },
    {
      path: '/SurveyChartFront/:id',
      name: 'SurveyChartFront',
      props: true,
      component: () => import('../views/SurveyChartFront.vue')
    },
    {
      path: '/Back',
      name: 'Back',
      component: () => import('../views/Back.vue')
    },
    {
      path: '/SurveyDetailBack/:id',
      name: 'SurveyDetailBack',
      props: true,
      component: () => import('../views/SurveyDetailBack.vue')
    },
    {
      path: '/CreateSurvey',
      name: 'CreateSurvey',
      component: () => import('../views/CreateSurvey.vue')
    },
    {
      path: '/CheckSurvey',
      name: 'CheckSurvey',
      component: () => import('../views/CheckSurvey.vue')
    },
  ]
})

export default router
