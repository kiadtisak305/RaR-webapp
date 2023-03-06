<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
//import { collection, addDoc } from 'firebase/firestore'
//import { db } from '../main.js'
import { useRouter } from 'vue-router'

const router = useRouter()
//const email = ref("");
const password = ref('')
//const username = ref("");
const userId = ref({ regusername: '', regemail: '' })
const visible = ref(false)
const rules = ref({
  email: (v) => !!(v || '').match(/@/) || 'กรุณากรอก e-mail',
  required: (value) => !!value || 'กรุณากรอกรหัสผ่าน',
  length: (len) => (v) => (v || '').length >= len || `รหัสผ่านต้องมีความยาว ${len} ตัวขึ้นไป`
  /* password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/) || 'รหัสผ่านต้องประกอบด้วย อักขระพิมพ์ใหญ่-เล็ก และตัวเลข', */
})
/* async function addUserData() {
  try {
    const docRef = await addDoc(collection(db, 'user'), userId.value)
    console.log('Document written with ID: ', docRef.id)
  } catch (e) {
    console.error('Error adding document: ', e)
  }
  register();
} */

function register() {
  const auth = getAuth()
  createUserWithEmailAndPassword(auth, userId.value.regemail, password.value)
    .then(async (userCredential) => {
      // Signed in
      const user = userCredential.user
      await updateProfile(user, { displayName: userId.value.regusername })
      console.log('User = ' + user)

      router.push('/')
      alert('ระบบได้รับข้อมูลของคุณแล้ว')
      // ...
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      switch (errorCode) {
        case 'auth/invalid-email':
          alert('กรุณากรอก E-mail')
          break
        case 'auth/weak-password':
          alert('รหัสควรมีอย่างน้อย 6 ตัว')
          break
        case 'auth/internal-error':
          alert('กรุณากรอกรหัสผ่าน')
          break
        case 'auth/email-already-in-use':
          alert('ไม่สามารถลงทะเบียนด้วยบัญชีนี้ได้ \n' + 'เนื่องจากบัญชีนี้มีอยู่ในระบบแล้ว')
          break

        default:
          alert(errorMessage)
      }
      return

      // ..
    })
}

function back(){
  router.push("/")
}
</script>

<template>
  <div class="body py-4">
    <v-card class="card mx-auto pa-12 pb-8" elevation="20" max-width="448" rounded="lg">
      <div class="text">Username</div>
      <v-text-field
        density="compact"
        placeholder="Username"
        prepend-inner-icon="mdi-account"
        variant="outlined"
        v-model="userId.regusername"
      >
      </v-text-field>

      <div class="text">E - mail</div>

      <v-text-field
        density="compact"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        v-model="userId.regemail"
        :rules="[rules.email]"
      >
      </v-text-field>

      <div class="text">
        Password
      </div>

      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
        @keyup.enter="register()"
        v-model="password"
        :rules="[rules.required, rules.length(6)]"
      >
      </v-text-field>

      <v-btn
        block
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        @click="register()"
      >
      Sign up
      </v-btn>
      <div class="d-flex justify-space-around align-center flex-column flex-md-row">
        <v-btn rounded icon="mdi-arrow-left-bold" variant="outlined" @click="back()">
        </v-btn>
      </div>
    </v-card>
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
  font-family: 'Pattaya', sans-serif;
}
.card{
  margin-top: 6.2rem;
  margin-bottom: 6.5rem;
   font-family: 'Pattaya', sans-serif;
}
img{
  margin-right: 15px;
}
a{
  font-size: 18px;
}
.btn {
  font-size: 20px;
}
.text{
  font-family: 'Pattaya', sans-serif;
  font-size: 22px;
}
</style>