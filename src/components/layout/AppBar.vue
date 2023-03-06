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
  <v-app-bar color="#b6130a" prominent>
    <div class="title">
      <v-app-bar-title>
        <h2>Attarod Food</h2>
      </v-app-bar-title>
    </div>
    <v-spacer></v-spacer>
    <v-menu min-width="100px" rounded>
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <v-avatar>
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
                {{ email }}
              </p>
            </div>
          </div>
          <div class="textmanu1 mx-auto">
            <v-divider class="my-3"></v-divider>
            <v-btn rounded prepend-icon="mdi-logout" @click="logout()"><h3>ออกจากระบบ</h3></v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Pattaya&display=swap');
.title {
  margin-left: 4rem;
  font-family: 'Pattaya', sans-serif;
  color: white;
  text-shadow: 5px 2px rgb(0, 0, 0);
  word-spacing: 5px;
}
.textmanu{
  font-family: 'Pattaya', sans-serif;
  color: white;
}
.textmanu1{
  font-family: 'Pattaya', sans-serif;
  color: white;
  text-align: center;
}
img{
  border: solid 9px rgb(0, 0, 0);
  border-radius: 10rem;
}
</style>
