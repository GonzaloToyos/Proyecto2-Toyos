<template>
  <div id="app">
    <v-app>
      <v-toolbar color="black" class="hola flex-grow-0" dark>
        <v-toolbar-title>Trabajo Final</v-toolbar-title>

        <v-spacer></v-spacer>
        <!-- el @click reemplaza al router-link -->
          <v-btn v-if="isUserOnline">{{ user.nombreFake }}</v-btn>
          <v-btn v-else @click="$router.push('login')">Login</v-btn>

          <!-- botones para admin o usuario comun -->
          <div v-if="isUserOnline">
            <div v-if="user.adminFake == true">
              <v-btn @click="$router.push('/admin')">HOME</v-btn>
              <v-btn @click="$router.push('/pedidos')">pedidos</v-btn>
            </div>

            <div v-else>
              <v-btn @click="$router.push('/')">HOME</v-btn>
              <v-btn @click="$router.push('/carrito')">CARRITO</v-btn>
            </div>
          </div>
          <v-btn @click="$router.push('registro')">Registro</v-btn>
          <v-btn @click="deleteCart(), endUserSession()">Salir</v-btn>
      </v-toolbar>
      <router-view />
      <FooterComponent />
    </v-app>
  </div>
</template>

<script>
import FooterComponent from "@/components/Footer.vue";
export default {
  name: "App",
  components: {
    FooterComponent,
  },
  data: () => ({}),
  computed: {
    isUserOnline() {
      return this.$store.state.userFake.online;
    },
    user() {
      return this.$store.state.userFake;
    },
  },
  methods: {
    deleteCart() {
      this.$store.commit("deleteCart");
    },
    endUserSession() {
      this.$store.commit("endUserSession");
      this.$router.push("/login");
    },
  },
  mounted() {
    this.$store.commit("updateCartFromLocalStorage");
    this.$store.commit("updateUserFromLocalStorage");
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: rgb(233, 212, 49);
  min-height: 100vh;
}
.v-application--wrap {
  min-height: 0vh !important;
}

</style>