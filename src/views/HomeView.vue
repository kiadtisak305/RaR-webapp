<script setup>
import { RouterLink, RouterView } from 'vue-router';

</script>

<template>
    <header>
        <div>
            <h1>Home</h1>
        </div>
        <div class="wrapper">
            <nav>
                <RouterLink to="recipe">Recipe</RouterLink>
                <RouterLink to="restaurant">Restaurant</RouterLink>
            </nav>
        </div>
    </header>


    <RouterView />
</template>

<style scoped>

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}
nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}
</style>