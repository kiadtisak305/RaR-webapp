<script setup>
import AppBar from '../components/layout/AppBar.vue'
import Navigation from '../components/layout/Navigation.vue'
import { ref } from 'vue'
import { getAuth } from 'firebase/auth'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../main.js'
import { useRouter } from 'vue-router'
const router = useRouter()

const recipe = ref({
  useremail: '',
  foodname: '',
  instructions: '',
  category: '',
  categoryother: '',
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

const displayName = ref('')
const email = ref('')
//แสดงชื่อและEmail ของผู้ใช้ปัจจุบัน ****************
const auth = getAuth()
const user = auth.currentUser
if (user !== null) {
  displayName.value = user.displayName
  email.value = user.email
  //-----------------------------------------
  user.providerData.forEach((profile) => {
    console.log('  Provider-specific UID: ' + profile.email)
    recipe.value.useremail = profile.email
  })
}
//********************************************
async function addData() {
  try {
    const docRef = await addDoc(collection(db, 'addrecipe'), recipe.value)
    console.log('Document written with ID: ', docRef.id)
    alert('เพิ่มข้อมูลเรียบร้อย')
    router.push('myrecipe')
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}
</script>

<template>
  <v-card class="body">
    <v-layout>
      <AppBar />
      <Navigation />

      <!--******************************** Main Start ********************************-->
      <v-main>
        <v-sheet
          class="form mx-auto px-9 py-15"
          elevation="15"
          max-width="1000"
          min-height="649"
          max-height="auto"
        >
          <div class="forminput">
            <v-form>
              <div v-if="recipe.status == 'ส่วนตัว'">
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      prepend-icon="mdi-account"
                      readonly
                      variant="plain"
                      v-model="recipe.useremail"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-select
                      prepend-icon="mdi-incognito"
                      label="สถานะแชร์"
                      :items="['ส่วนตัว', 'สาธารณะ']"
                      variant="outlined"
                      v-model="recipe.status"
                    ></v-select>
                  </v-col>
                </v-row>
              </div>
              <div v-else>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      prepend-icon="mdi-account"
                      readonly
                      variant="plain"
                      v-model="recipe.useremail"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-select
                      prepend-icon="mdi-publish"
                      label="สถานะแชร์"
                      :items="['ส่วนตัว', 'สาธารณะ']"
                      variant="outlined"
                      v-model="recipe.status"
                    ></v-select>
                  </v-col>
                </v-row>
              </div>
              <div v-if="recipe.category == 'อื่นๆ'">
                <v-row
                  ><v-col>
                    <v-select
                      prepend-icon="mdi-select"
                      label="กรุณาเลือกชนิดอาหาร"
                      :items="[
                        'แกง',
                        'ผัด',
                        'ยำ',
                        'ทอด',
                        'ต้ม',
                        'ปิ้งย่าง',
                        'เครื่องเคียง',
                        'อื่นๆ'
                      ]"
                      variant="outlined"
                      v-model="recipe.category"
                    ></v-select>
                  </v-col>
                  <v-col>
                    <v-text-field
                      prepend-icon="mdi-pencil"
                      label="รายละเอียดชนิดอาหาร"
                      type="text"
                      variant="outlined"
                      v-model="recipe.categoryother"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
              </div>
              <div v-else>
                <v-row>
                  <v-col>
                    <v-select
                      prepend-icon="mdi-select"
                      label="กรุณาเลือกชนิดอาหาร"
                      :items="[
                        'แกง',
                        'ผัด',
                        'ยำ',
                        'ทอด',
                        'ต้ม',
                        'ปิ้งย่าง',
                        'เครื่องเคียง',
                        'อื่นๆ'
                      ]"
                      variant="outlined"
                      v-model="recipe.category"
                    ></v-select>
                  </v-col>
                  <v-col>
                    <v-text-field
                      prepend-icon="mdi-lock"
                      readonly
                      label="รายละเอียดชนิดอาหาร"
                      type="text"
                      variant="plain"
                      v-model="recipe.categoryother"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
              </div>
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
            <div class="addbtn">
              <v-btn color="green" width="150" height="60" @click="addData()">
                <p>เพิ่มข้อมูล</p>
              </v-btn>
            </div>
          </div>
        </v-sheet>
      </v-main>
      <!--******************************** Main End ********************************-->
    </v-layout>
  </v-card>
</template>

<style scoped>
.body {
  background-image: url(@/assets/bg.jpg);
  width: 100%;
  height: 100%;
  background-repeat: repeat-x;
  background-attachment: fixed;
  background-position: top center;
}
.forminput {
  min-width: 500px;
  padding: 4rem;
  text-align: center;
}
.form {
  margin-left: 5rem;
  margin-top: 5rem;
  margin-bottom: 5rem;
  margin-right: 5rem;
  font-family: 'Pattaya', sans-serif;
  font-size: 22px;
}
.addbtn {
  text-align: center;
  margin-top: 2rem;
}
p {
  font-size: 22px;
}
</style>
