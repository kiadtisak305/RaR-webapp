<script setup>
import AppBar from '../components/layout/AppBar.vue'
import Navigation from '../components/layout/Navigation.vue'
import { ref, onMounted } from 'vue'
import { getAuth } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../main.js'
import { useRouter } from 'vue-router'

const displayName = ref('')
const email = ref('')

const auth = getAuth()
const user = auth.currentUser
if (user !== null) {
  displayName.value = user.displayName
  email.value = user.email
}

const router = useRouter()
const allRecipe = ref([])

async function showPublicData() {
  const q = query(collection(db, 'addrecipe'), where('status', '==', 'สาธารณะ'))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, ' => ', doc.data())
    const myRecipe = ref({ id: doc.id, data: doc.data() })
    allRecipe.value.push(myRecipe.value)
  })
}
//แสดงข้อมูลจาก firebase
onMounted(() => {
  showPublicData()
})
//******************************************
function viewRecipeDetail(id) {
  router.push({ name: 'allrecipeview', params: { id: id } })
}
//******************************************
const model = null
//*****************************************
</script>

<template>
  <v-layout>
    <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->
    <AppBar />
    <Navigation />

    <!--************************************ Main Start *****************************************-->
    <v-main>
      <v-sheet class="slide mx-auto" elevation="15" max-width="1200" color="#bfc1c2">
        <v-slide-group v-model="model" class="pa-4" selected-class="bg-success" show-arrows>
          <v-slide-group-item v-slot="{ isSelected, selectedClass }">
            <v-card
              class="card"
              v-for="list in allRecipe"
              :key="list.data.status"
              :class="['ma-4', selectedClass]"
              @click="viewRecipeDetail(list.id)"
            >
              <v-img
                class="imgslide align-end text-white"
                height="180"
                :src="list.data.linkurl"
                cover
              >
              </v-img>
              <div class="d-flex fill-height align-center justify-center">
                <v-scale-transition>
                  <v-icon v-if="isSelected" class="icon" icon="mdi-close-circle-outline"></v-icon>
                </v-scale-transition>
              </div>
            </v-card>
          </v-slide-group-item>
        </v-slide-group>
      </v-sheet>

      <!--*************************************** รายการอาหาร ****************************************-->
      <v-card
        class="mx-auto"
        elevation="15"
        max-width="1200"
        color="#bfc1c2 "
        style="margin-top: 2rem"
      >
        <v-container>
          <v-row>
            <v-col cols="12" md="3" v-for="list in allRecipe" :key="list.data.status">
              <v-card class="mx-auto" elevation="15" @click="viewRecipeDetail(list.id)">
                <v-img class="align-end text-white" height="180" :src="list.data.linkurl" cover>
                </v-img>
                <v-card-title class="text1">{{ list.data.foodname }}</v-card-title>
                <v-card-subtitle class="text2 me-1"> {{ list.data.useremail }} </v-card-subtitle>

                <v-card-text>
                  <div class="text3">ประเภทอาหาร: {{ list.data.category }}</div>

                  <div></div>
                </v-card-text>

                <v-card-actions>
                  <v-btn color="orange">  </v-btn>

                  <v-btn color="orange">  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-main>
    <!--************************************ Main End *****************************************-->
  </v-layout>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Pattaya&display=swap');

.text {
  font-family: 'Pattaya', sans-serif;
  font-size: 18px;
  color: rgb(255, 255, 255);
}
.text1 {
  font-family: 'Pattaya', sans-serif;
  font-size: 22px;
  color: rgb(0, 0, 0);
}
.text2{
  font-family: 'Pattaya', sans-serif;
}
.text3{
  font-family: 'Pattaya', sans-serif;
  font-size: 16px;
}
.slide {
  margin-top: 2rem;
}
.imgslide {
  border: solid 9px darkgoldenrod;
  border-radius: 15px;
}
.card {
  border-radius: 15px;
  width: 200px;
  height: 150px;
}
.icon{
  size: 28px;
}
</style>
