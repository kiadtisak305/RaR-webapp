import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../components/LoginPage.vue'
import RegisterPage from '../components/RegisterPage.vue'
import RecipePageView from '../views/RecipePageView.vue'
import AddRecipe from '../components/AddRecipe.vue'
import MyRecipe from '../components/MyRecipe.vue'
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
      path: '/recipe',
      name: 'recipe',
      component: RecipePageView
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
      path: '/allrecipeview/:id',
      name: 'allrecipeview',
      component: AllRecipeView
    },

  ]
})

export default router
