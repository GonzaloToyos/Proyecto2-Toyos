<template>
  <div id="app">
    <v-app>
      <v-toolbar>
        <v-toolbar-title>Trabajo Final</v-toolbar-title>

        <v-spacer></v-spacer>
        <!-- el @click reemplaza al router-link -->

        <v-btn v-if="usuarios !== ''">{{ usuarios.nombreActual }}</v-btn>
        <v-btn v-else @click="$router.push('login'), cerrarSesion()"
          >Login</v-btn
        >

        <v-btn @click="$router.push('registro')">Registro</v-btn>
        <v-btn @click="$router.push('/')">Home</v-btn>
        <v-btn @click="cerrarSesion()">Cerrar</v-btn>
      </v-toolbar>
      <router-view />
    </v-app>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "App",
  data: () => ({
    user: "",
  }),
  computed: {
    ...mapState(["usuario", "usuarios"]),
  },
  methods: {
    cerrarSesion() {
      sessionStorage.removeItem("user");
      this.user = "";
      this.eliminarUsers();
      this.$router.push("/login");
    },
    ...mapActions(["obtenerUsers", "eliminarUsers"]),
    nombreUsuario(usuario) {
      console.log(typeof usuario)
      return usuario;
    }
  },
  async beforeUpdate() {
    this.obtenerUsers();
  },
  async created() {
    this.obtenerUsers();
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
}
.v-application--wrap {
  min-height: 0vh !important;
}
</style>