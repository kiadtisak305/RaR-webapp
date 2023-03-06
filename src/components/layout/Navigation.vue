<template>
  <v-navigation-drawer permanent location="left" color="#b6130a">
    <v-divider></v-divider>
    <div class="text">
      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-home" title="" value="recipe" to="/recipe"
          >สูตรอาหาร</v-list-item
        >
        <v-list-item prepend-icon="mdi-plus" title="" value="addrecipe" to="/addrecipe"
          >เพิ่มสูตรอาหาร</v-list-item
        >
        <v-list-item
          prepend-icon="mdi-format-list-bulleted"
          title=""
          value="myrecipe"
          to="/myrecipe"
          >สูตรอาหารของฉัน</v-list-item
        >
      </v-list>
    </div>
  </v-navigation-drawer>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Pattaya&display=swap');

.text {
  font-family: 'Pattaya', sans-serif;
  font-size: 18px;
  color: rgb(255, 255, 255);
  margin-top: 1rem;
}
</style>
