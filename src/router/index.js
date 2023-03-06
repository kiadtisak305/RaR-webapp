import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../components/LoginPage.vue'
import RegisterPage from '../components/RegisterPage.vue'
import RecipePageView from '../views/RecipePageView.vue'
import RestaurantPageView from '../views/RestaurantPageView.vue'
import HomeView from '../views/HomeView.vue'
import AddRecipe from '../components/AddRecipe.vue'
import MyRecipe from '../components/MyRecipe.vue'
import AddRestaurant from '../components/AddRestaurant.vue'
import MyRestaurant from '../components/MyRestaurant.vue'
import AllRecipeView from '../views/AllRecipeView.vue'

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
    {
      path: '/addrecipe',
      name: 'addrecipe',
      component: AddRecipe
    },
    {
      path: '/myrecipe',
      name: 'myrecipe',
      component: MyRecipe
    },
    {
      path: '/addrestaurant',
      name: 'addrestaurant',
      component: AddRestaurant
    },
    {
      path: '/myrestaurant',
      name: 'myrestaurant',
      component: MyRestaurant
    },
    {
      path: '/allrecipeview/:id',
      name: 'allrecipeview',
      component: AllRecipeView
    },

  ]
})

export default router
