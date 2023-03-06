<script setup>
import AppBar from '../components/layout/AppBar.vue'
import Navigation from '../components/layout/Navigation.vue'
import { ref, onMounted } from 'vue'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../main.js'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
const allRecipe = ref([])
onMounted(() => {
  showRecipeData()
})
async function showRecipeData() {
  const docRef = doc(db, 'addrecipe', id)
  const docSnap = await getDoc(docRef)
  try {
    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data())
      const docRecipe = ref({ data: docSnap.data() })
      allRecipe.value.push(docRecipe.value)
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!')
    }
  } catch (error) {
    console.log('show data error =>', error)
  }
}
</script>

<template>
  <v-card>
    <v-layout>
      <AppBar />
      <Navigation />
      <v-main>
        <v-card v-for="show in allRecipe" :key="show.data.foodname">
          <v-col cols="6">
            <v-card>
              <v-img
                class="mx-auto"
                height="300"
                :lazy-src="show.data.linkurl"
                max-width="500"
                :src="show.data.linkurl"
              >
                <template v-slot:placeholder>
                  <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                  </div>
                </template>
              </v-img>
            </v-card>
          </v-col>
        </v-card>
      </v-main>
    </v-layout>
  </v-card>
</template>
