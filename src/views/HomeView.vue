<script setup>
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'
const router = useRouter()

function toRecipe() {
  router.push('recipe')
}
function toRestaurant() {
  router.push('restaurant')
}
</script>

<template>
  <div class="body">
    <div class="py-1">
      <v-card class="card mx-auto pa-12 pb-8" color="#f4f0ec " elevation="20" max-width="448" rounded="lg">
        <div class="text-center" style="margin-bottom: 2rem">
          <h3>เลือกสิ่งที่คุณสนใจ</h3>
        </div>
        <v-btn elevation="15" color="#b6130a" block class="mb-8" width="400" height="100" @click="toRecipe()">
          <div class="icon1">
            <Icon icon="ep:food" width="50" height="50" />
          </div>
          <h4>สูตรอาหาร</h4>
        </v-btn>

        <v-btn elevation="15" color="#b6130a" block class="mb-8" width="400" height="100" @click="toRestaurant()">
          <div class="icon2">
            <Icon icon="medical-icon:restaurant" width="50" height="50" />
          </div>
          <h4>ร้านอาหาร</h4>
        </v-btn>
      </v-card>
    </div>
  </div>
</template>

<style scoped>
.body {
  background-image: url(@/assets/bgapp.jpg);
  width: 100%;
  height: 100%;
  background-repeat: repeat-x;
  background-attachment: fixed;
  background-position: top center;
}
h3{
  font-family: 'Pattaya', sans-serif;
  font-size: 36px;
  color: rgb(120, 57, 13);
}
h4{
  font-family: 'Pattaya', sans-serif;
  font-size: 24px;
  color: white;
}
.icon1 {
  margin-right: 1rem;
  color: white;
}
.icon2 {
  margin-right: 1rem;
  color: white;
}
.card {
  margin-top: 9rem;
  margin-bottom: 9.7rem;
}
</style>
