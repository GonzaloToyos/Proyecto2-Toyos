<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <h2>Login</h2>
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      :rules="passRules"
      label="Contraseña"
      type="password"
      required
    ></v-text-field>

    <div class="btn-container">
      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
        Validar
      </v-btn>

      <v-btn color="error" class="mr-4" @click="reset"> Reset </v-btn>

      <p>
        ¿No tienes cuenta?
        <span><router-link to="/registro">Registrate</router-link></span>
      </p>
    </div>
  </v-form>
</template>


  
<script>
import axios from "axios";
import { mapState, mapMutations } from "vuex";

const url =
  "https://trabajofinal-909d8-default-rtdb.firebaseio.com/usuarios.json";

export default {
  name: "FormLogin",
  props: {
    msg: String,
  },
  data: () => ({
    valid: true,
    email: "",
    emailRules: [
      (v) => !!v || "E-mail requerido",
      (v) => /.+@.+\..+/.test(v) || "E-mail inválido",
    ],
    password: "",
    passRules: [
      (v) => !!v || "Contraseña requerida",
      (v) =>
        (v && v.length >= 6) || "La contraseña debe tener 6 caracteres o más",
    ],
    usuariosExistentesAxios: [],
    usuariosExistentes: [],
    passwords: [],
    admin: [],
    nombres: [],
  }),

  methods: {
    validate() {
      this.$refs.form.validate();

      const index = this.usuariosExistentes.indexOf(this.email);
      const usuarioActual = {
        passActual: this.passwords[index],
        nombreActual: this.nombres[index],
        adminActual: this.admin[index],
        correoActual: this.email,
      };

      if (this.$refs.form.validate()) {
        if (index != -1) {
          if (usuarioActual.passActual == this.password) {
            /*this.usuario.nombre = usuarioActual.nombreActual;
            this.usuario.correo = this.email;
            this.usuario.admin = usuarioActual.adminActual;*/
            this.$store.commit("asignarUsuario", usuarioActual);
            sessionStorage.setItem("user", JSON.stringify(usuarioActual));
            if (usuarioActual.adminActual === true) {
              this.$router.push("/admin");
            } else {
              this.$router.push("/");
            }
          } else {
            alert("Contraseña incorrecta");
          }
        } else {
          alert("Correo incorrecto");
        }
      } else {
        console.log("NO validao");
      }
    },
    reset() {
      this.$refs.form.reset();
    },
  },

  async created() {
    sessionStorage.removeItem("user");
    this.$store.commit("borrarUsuario");
    await axios
      .get(url)
      .then(
        (response) =>
          (this.usuariosExistentesAxios = Object.values(response.data))
      );

    for (let usuario of this.usuariosExistentesAxios) {
      this.usuariosExistentes.push(usuario.correo);
      this.passwords.push(usuario.pass);
      this.admin.push(usuario.admin);
      this.nombres.push(usuario.nombre);
    }

    console.log(this.usuariosExistentes);
    console.log(this.nombres);
    console.log(this.admin);
  },

  computed: {
    ...mapState(["usuario"]),
    ...mapMutations(["asignarUsuario"]),
  },
};
</script>

<style scoped>
.btn-container {
  display: flex;
  justify-content: space-between;
}
</style>