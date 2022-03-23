<template>
  <div id="app">
    <v-app>
      <v-toolbar>
        <v-toolbar-title>Trabajo Final</v-toolbar-title>

        <v-spacer></v-spacer>
        <!-- el @click reemplaza al router-link -->
        <v-btn @click="$router.push('login')">Login</v-btn>
        <v-btn @click="$router.push('registro')">Registro</v-btn>
        <v-btn @click="$router.push('/')">Home</v-btn>
      </v-toolbar>
      <router-view />
    </v-app>
  </div>
</template>

<script>
//import axios from "axios";

export default {
  name: "App",
  data: () => ({}),
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.v-application--wrap {
  min-height: 0vh !important;
}
</style>