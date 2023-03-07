<script setup>
import { ref } from 'vue'
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
const router = useRouter()
const displayName = ref('')
const email = ref('')

const auth = getAuth()
const user = auth.currentUser
if (user !== null) {
  displayName.value = user.displayName
  email.value = user.email
}
function logout() {
  const auth = getAuth()
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      if (confirm('คุณต้องการออกจากระบบ ?')) {
        router.push('/')
      }
    })
    .catch((error) => {
      // An error happened.
      console.log('logout failed =>', error)
    })
}
</script>

<template>
  <v-app-bar color="#b6130a" height="100" prominent>
    <div class="title"> 
        <v-avatar color="white" size="75" 
          ><img src="@/assets/logoapp.png" width="150" height="150" />
        </v-avatar>
      <h1>Attarod Food</h1>
    </div>
    <v-spacer></v-spacer>
    <v-menu min-width="100px" rounded>
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props" style="margin-right: 2rem">
          <v-avatar size="48">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5rzPuIgpTsSHVb4gnlLzfZINVJY0tZ6g7BiDSbQg&s"
              alt=""
              width="50"
              height="50"
            />
          </v-avatar>
        </v-btn>
      </template>
      <v-card color="#ae2029">
        <v-card-text>
          <div class="mx-auto" style="display: flex">
            <v-avatar>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5rzPuIgpTsSHVb4gnlLzfZINVJY0tZ6g7BiDSbQg&s"
                alt=""
                width="50"
                height="50"
              />
            </v-avatar>
            <div class="textmanu" style="margin-left: 1rem">
              <h3>{{ displayName }}</h3>
              <p class="text-caption mt-1">
                <a>{{ email }}</a>
              </p>
            </div>
          </div>
          <div>
            <v-divider class="my-3"></v-divider>
            <v-btn class="textmanu1" rounded prepend-icon="mdi-logout" @click="logout()">
              <p>ออกจากระบบ</p>
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<style scoped>
.title {
  margin-left: 3.5rem;
  font-family: 'Pattaya', sans-serif;
  color: white;
  text-shadow: 8px 6px rgb(0, 0, 0);
  word-spacing: 15px;
  display: flex;
  align-items: center;
  justify-items: center;
}
h1 {
  margin-left: 2rem;
}
.textmanu {
  font-family: 'Pattaya', sans-serif;
  color: white;
}
.textmanu1 {
  font-family: 'Pattaya', sans-serif;
  color: white;
  font-size: 19px;
}
a {
  font-family: 'Pattaya', sans-serif;
  color: white;
  font-size: 16px;
}
h3 {
  font-size: 22px;
}
.btn{
  margin-bottom: 1.4rem;
}
</style>
