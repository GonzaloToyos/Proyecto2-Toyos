<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <h2>Registro</h2>
    <v-text-field
      v-model="name"
      :counter="15"
      :rules="nameRules"
      label="Nombre"
      required
    ></v-text-field>

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
        Registrar
      </v-btn>

      <v-btn color="error" class="mr-4" @click="reset"> Reset </v-btn>

      <p>
        ¿Ya tienes cuenta?
        <span> <router-link to="/login">Ingresa</router-link> </span>
      </p>
    </div>
  </v-form>
</template>


  
<script>
import axios from "axios";

const url =
  "https://trabajofinal-909d8-default-rtdb.firebaseio.com/usuarios.json";

export default {
  name: "FormRegistro",
  props: {
    msg: String,
  },
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Nombre requerido",
      (v) =>
        (v && v.length <= 15) || "El nombre debe tener 15 caracteres o menos",
    ],
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
  }),

  methods: {
    validate() {
      this.$refs.form.validate();

      const found = this.usuariosExistentes.includes(this.email);

      if (this.$refs.form.validate()) {
        if (!found) {
          axios.post(url, {
            nombre: this.name,
            correo: this.email,
            pass: this.password,
            admin: false
          });
          this.$router.push('/login')
        } else {
          alert("Correo ya registrado. Pruebe de nuevo");
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
    await axios
      .get(url)
      .then(
        (response) =>
          (this.usuariosExistentesAxios = Object.values(response.data))
      );

    for (let usuario of this.usuariosExistentesAxios) {
      this.usuariosExistentes.push(usuario.correo);
    }
  },

};
</script>

<style scoped>
.btn-container {
  display: flex;
  justify-content: space-between;
}
</style>