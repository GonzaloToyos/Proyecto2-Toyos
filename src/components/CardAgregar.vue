<template>
  <v-card class="mx-auto mt-5 cursor" max-width="344" style="max-height: 346px">
    <v-dialog transition="dialog-top-transition" max-width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-col>
          <v-img
            v-bind="attrs"
            v-on="on"
            src="https://cdn.icon-icons.com/icons2/2550/PNG/512/plus_icon_152556.png"
            height="auto"
            max-width="344"
          ></v-img>
        </v-col>
      </template>
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar>
            <v-toolbar-title
              >Nueva comida. Para ver los cambios refresque la
              página.</v-toolbar-title
            >
            <v-spacer></v-spacer>
          </v-toolbar>
          
          <div class="container">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="nombreComida"
                :rules="nombreComidaRules"
                :counter="25"
                label="Nombre"
                required
              ></v-text-field>

              <v-text-field
                v-model="precioComida"
                :rules="precioComidaRules"
                label="Precio"
                type="number"
                required
              ></v-text-field>

              <v-text-field
                v-model="imagenComida"
                :rules="imagenComidaRules"
                label="Link imagen"
                required
              ></v-text-field>

              <v-text-field
                v-model="descComida"
                :rules="descComidaRules"
                :counter="100"
                label="Descripción"
                required
              ></v-text-field>

              <div class="btn-container">
                <v-btn
                  :disabled="!valid"
                  color="success"
                  class="mr-4"
                  @click="validate(); if (validate) {dialog.value = false}"          
                >
                  Agregar
                </v-btn>

                <v-btn color="error" class="mr-4" @click="reset"> Reset </v-btn>
                <v-btn color="error" @click="dialog.value = false">Cerrar</v-btn>
              </div>
            </v-form>
          </div>
        </v-card>
      </template>
    </v-dialog>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  name: "ProductCardAdd",
  props: {
    title: Array,
  },
  data() {
    return {      
      showError: false,
      // nuevo form mas fachero
      valid: true,
      nombreComida: "",
      nombreComidaRules: [
        (v) => !!v || "Comida requerida",
        (v) =>
          (v && v.length <= 25) ||
          "El nombre de la comida no puede superar los 25 caracteres.",
      ],
      precioComida: "",
      precioComidaRules: [
        (v) => !!v || "Precio requerido",
        (v) => /^[0-9]+$/g.test(v) || "Solo números",
      ],
      imagenComida: "",
      imagenComidaRules: [(v) => !!v || "Imagen requerida"],
      descComida: "",
      descComidaRules: [
        (v) => !!v || "Descripción requerida",
        (v) =>
          (v && v.length <= 100) ||
          "La descripción de la comida no puede superar los 100 caracteres.",
      ],
    };
  },
  methods: {
    async validate() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        this.showError = false;
        const url =
          "https://trabajofinal-909d8-default-rtdb.firebaseio.com/comidas.json";
        await axios.post(url, {
          desc: this.descComida,
          img: this.imagenComida,
          precio: this.precioComida,
          titulo: this.nombreComida,
        });
      } else {
        this.showError = true;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style scoped>
.cursor {
  cursor: pointer;
}
form {
  display: flex;
  flex-direction: column;
}
form input {
  padding: 5px;
  border: 1px solid black;
  border-radius: 5px;
}
.container {
  margin: auto;
  max-width: 800px;
}
</style>