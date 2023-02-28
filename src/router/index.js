import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../components/LoginPage.vue'
import RegisterPage from '../components/RegisterPage.vue'
import RecipePageView from '../views/RecipePageView.vue'
import RestaurantPageView from '../views/RestaurantPageView.vue'
import ResetPass from '../components/ResetPass.vue'
import HomeView from '../views/HomeView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginPage
    }, 
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    }, 
    {
      path: '/reset',
      name: 'reset',
      component: ResetPass
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/recipe',
      name: 'recipe',
      component: RecipePageView
    },
    {
      path: '/restaurant',
      name: 'restaurant',
      component: RestaurantPageView
    },

  ]
})

export default router
