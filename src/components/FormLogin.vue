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
        ¿No tienes cuenta? <span><a href="">Regístrate</a></span>
      </p>
    </div>
  </v-form>
</template>


  
<script>
export default {
  name: "FormRegistro",
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
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style scoped>
.btn-container {
  display: flex;
  justify-content: space-between;
}
</style>