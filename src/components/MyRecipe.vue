<script setup>
import AppBar from '../components/layout/AppBar.vue'
import Navigation from '../components/layout/Navigation.vue'
import { ref, onMounted } from 'vue'
import { getAuth } from 'firebase/auth'
import { collection, getDocs, doc, deleteDoc, updateDoc, query, where } from 'firebase/firestore'
import { db } from '../main.js'
//import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'

//const router = useRouter()
const allRecipe = ref([])
const dialog = ref(false)
const displayName = ref('')
const email = ref('')
const recipe = ref({
  useremail: '',
  foodname: '',
  instructions: '',
  category: '',
  linkurl: '',
  status: '',
  ingredient1: '',
  ingredient2: '',
  ingredient3: '',
  ingredient4: '',
  ingredient5: '',
  ingredient6: '',
  ingredient7: '',
  ingredient8: '',
  ingredient9: '',
  ingredient10: '',
  measure1: '',
  measure2: '',
  measure3: '',
  measure4: '',
  measure5: '',
  measure6: '',
  measure7: '',
  measure8: '',
  measure9: '',
  measure10: ''
})
const auth = getAuth()
const user = auth.currentUser
if (user !== null) {
  displayName.value = user.displayName
  email.value = user.email
}
function showMyData() {
  if (user !== null) {
    user.providerData.forEach(async (profile) => {
      console.log('  Provider-specific UID: ' + profile.email)
      const userEmail = profile.email

      const q = query(collection(db, 'addrecipe'), where('useremail', '==', userEmail))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data())
        const myRecipe = ref({ id: doc.id, data: doc.data() })
        allRecipe.value.push(myRecipe.value)
      })
    })
  }
}
//แสดงข้อมูลจาก firebase
onMounted(() => {
  showMyData()
})
async function deleteMenu(id, index) {
  if (confirm('คุณต้องการลบรายการนี้หรือไม่ ?')) {
    await deleteDoc(doc(db, 'addrecipe', id))
    console.log('Delete document with ID:', id)
    allRecipe.value.splice(index, 1)
  }
}
//******************************************
const Edit = ref([])
function editRecipe(recipelist) {
  Edit.value = recipelist.id
  recipe.value = recipelist.data
  dialog.value = true
}
//******************************************
async function updateRecipe() {
  if (confirm('ยืนยันการแก้ไขเมนูนี้ ?')) {
    try {
      const washingtonRef = doc(db, 'addrecipe', Edit.value)
      // Set the "capital" field of the city 'DC'
      await updateDoc(washingtonRef, recipe.value)
      console.log('Update recipe success')
    } catch (e) {
      console.error('Update recipe error', e)
    }
    dialog.value = false
  }
}
//*****************************************
</script>

<template>
  <v-card>
    <v-layout>
      
      <AppBar />
      <Navigation />
      <!--************************************ Main Start *****************************************-->
      <v-main>
        <div class="Table">
          <v-card class="mx-auto px-9 py-15" max-width="auto" min-height="649" max-height="auto">
            <v-table>
              <thead>
                <tr>
                  <th class="text-center">รูปภาพ</th>
                  <th class="text-center">รายการอาหาร</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(recipelist, index) in allRecipe" :key="index">
                  <td class="text-center">
                    <img :src="recipelist.data.linkurl" alt="" width="200" height="110" />
                  </td>
                  <td>
                    <p class="text-left">{{ recipelist.data.foodname }}</p>
                  </td>
                  <td>
                    <div>
                      <v-btn class="btnedit" variant="text" @click="editRecipe(recipelist)">
                        <Icon
                          icon="material-symbols:edit-square-outline"
                          color="blue"
                          width="35"
                          height="35"
                        />
                      </v-btn>
                      <v-btn
                        class="btndelete"
                        variant="text"
                        @click="deleteMenu(recipelist.id, index)"
                      >
                        <Icon icon="ic:outline-delete-outline" color="red" width="40" height="40" />
                      </v-btn>
                    </div>
                  </td>
                </tr>
              </tbody>
            </v-table>

            <!-- ************************************** Dialog *****************************************-->
            <v-container>
              <v-dialog v-model="dialog">
                <v-card class="mx-auto">
                  <v-container>
                    <div class="forminput">
                      <v-form>
                        <v-row>
                          <v-col>
                            <v-text-field
                              prepend-icon="mdi-account"
                              readonly
                              variant="plain"
                              v-model="recipe.useremail"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-select
                              prepend-icon="mdi-publish"
                              label="สถานะแชร์"
                              :items="['ส่วนตัว', 'สาธารณะ']"
                              variant="outlined"
                              v-model="recipe.status"
                            ></v-select>
                          </v-col>
                          <v-col>
                            <v-select
                              label="กรุณาเลือกชนิดอาหาร"
                              :items="[
                                'แกง',
                                'ผัด',
                                'ยำ',
                                'ทอด',
                                'ต้ม',
                                'ปิ้งย่าง',
                                'เครื่องเคียง'
                              ]"
                              variant="outlined"
                              v-model="recipe.category"
                            ></v-select>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-text-field
                              prepend-icon="mdi-link"
                              label="Url รูปภาพ"
                              type="url"
                              variant="outlined"
                              v-model="recipe.linkurl"
                            ></v-text-field>
                          </v-col>
                          <v-col>
                            <v-text-field
                              prepend-icon="mdi-food"
                              label="ชื่ออาหาร"
                              type="text"
                              variant="outlined"
                              v-model="recipe.foodname"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-textarea
                              label="วิธีทำ"
                              variant="outlined"
                              auto-grow
                              rows="1"
                              row-height="15"
                              v-model="recipe.instructions"
                            ></v-textarea>
                          </v-col>
                        </v-row>
                        <v-col class="text-center" style="margin-bottom: 1rem">
                          <h3>วัตถุดิบ</h3>
                        </v-col>
                        <v-row>
                          <v-col>
                            <v-text-field
                              label="1."
                              type="text"
                              variant="outlined"
                              v-model="recipe.ingredient1"
                            ></v-text-field>
                          </v-col>
                          <v-col>
                            <v-text-field
                              label="ปริมาณ"
                              type="text"
                              variant="outlined"
                              v-model="recipe.measure1"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-text-field
                              label="2."
                              type="text"
                              variant="outlined"
                              v-model="recipe.ingredient2"
                            ></v-text-field>
                          </v-col>
                          <v-col>
                            <v-text-field
                              label="ปริมาณ"
                              type="text"
                              variant="outlined"
                              v-model="recipe.measure2"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-text-field
                              label="3."
                              type="text"
                              variant="outlined"
                              v-model="recipe.ingredient3"
                            ></v-text-field>
                          </v-col>
                          <v-col>
                            <v-text-field
                              label="ปริมาณ"
                              type="text"
                              variant="outlined"
                              v-model="recipe.measure3"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-text-field
                              label="4."
                              type="text"
                              variant="outlined"
                              v-model="recipe.ingredient4"
                            ></v-text-field>
                          </v-col>
                          <v-col>
                            <v-text-field
                              label="ปริมาณ"
                              type="text"
                              variant="outlined"
                              v-model="recipe.measure4"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-text-field
                              label="5."
                              type="text"
                              variant="outlined"
                              v-model="recipe.ingredient5"
                            ></v-text-field>
                          </v-col>
                          <v-col>
                            <v-text-field
                              label="ปริมาณ"
                              type="text"
                              variant="outlined"
                              v-model="recipe.measure5"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-text-field
                              label="6."
                              type="text"
                              variant="outlined"
                              v-model="recipe.ingredient6"
                            ></v-text-field>
                          </v-col>
                          <v-col>
                            <v-text-field
                              label="ปริมาณ"
                              type="text"
                              variant="outlined"
                              v-model="recipe.measure6"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-text-field
                              label="7."
                              type="text"
                              variant="outlined"
                              v-model="recipe.ingredient7"
                            ></v-text-field>
                          </v-col>
                          <v-col>
                            <v-text-field
                              label="ปริมาณ"
                              type="text"
                              variant="outlined"
                              v-model="recipe.measure7"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-text-field
                              label="8."
                              type="text"
                              variant="outlined"
                              v-model="recipe.ingredient8"
                            ></v-text-field>
                          </v-col>
                          <v-col>
                            <v-text-field
                              label="ปริมาณ"
                              type="text"
                              variant="outlined"
                              v-model="recipe.measure8"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-text-field
                              label="9."
                              type="text"
                              variant="outlined"
                              v-model="recipe.ingredient9"
                            ></v-text-field>
                          </v-col>
                          <v-col>
                            <v-text-field
                              label="ปริมาณ"
                              type="text"
                              variant="outlined"
                              v-model="recipe.measure9"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-text-field
                              label="10."
                              type="text"
                              variant="outlined"
                              v-model="recipe.ingredient10"
                            ></v-text-field>
                          </v-col>
                          <v-col>
                            <v-text-field
                              label="ปริมาณ"
                              type="text"
                              variant="outlined"
                              v-model="recipe.measure10"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-form>
                    </div>
                    <v-row justify="center" style="margin-bottom: 2rem">
                      <div style="margin-right: 1rem">
                        <v-btn color="green" @click="updateRecipe(recipe)"> บันทึก </v-btn>
                      </div>
                      <div style="margin-left: 1rem">
                        <v-btn color="red" @click="dialog = false"> ยกเลิก </v-btn>
                      </div>
                    </v-row>
                  </v-container>
                </v-card>
              </v-dialog>
            </v-container>
          </v-card>
        </div>
      </v-main>
      <!--************************************ Main End *****************************************-->
    </v-layout>
  </v-card>
</template>

<style scoped>
.btnedit {
  margin-right: 0.5rem;
}
.forminput {
  min-width: 700px;
  padding: 2rem;
  text-align: center;
}
.btndelete {
  margin-left: 0.5rem;
}
</style>
