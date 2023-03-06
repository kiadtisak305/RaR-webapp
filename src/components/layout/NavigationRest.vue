<template>
  <v-navigation-drawer permanent location="left" color="#b6130a">
    <v-divider></v-divider>
    <div class="text">
      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-home" title="" value="restaurant" to="/restaurant"
          >ร้านค้า</v-list-item
        >
        <v-list-item prepend-icon="mdi-plus" title="" value="addrestaurant" to="/addrestaurant"
          >เพิ่มร้านค้า</v-list-item
        >
        <v-list-item
          prepend-icon="mdi-format-list-bulleted"
          title=""
          value="myrestaurant"
          to="/myrestaurant"
          >ร้านค้าของฉัน</v-list-item
        >
      </v-list>
    </div>
    <template v-slot:append>
      <v-list density="compact" nav>
        <v-list-item
          class="text"
          style="font-size: 20px"
          prepend-icon="mdi-keyboard-backspace"
          title=""
          value="home"
          to="/home"
          >กลับไปหน้าหลัก</v-list-item
        >
      </v-list>
    </template>
  </v-navigation-drawer>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Pattaya&display=swap');

.text {
  font-family: 'Pattaya', sans-serif;
  font-size: 18px;
  color: rgb(255, 255, 255);
}
</style>
