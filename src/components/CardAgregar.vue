<!-- Esta Card sirve para que el admin pueda agregar una nueva comida --> 
<template>
  <v-card class="mx-auto mt-5 cursor card" max-width="344" style="max-height: 346px">
    <v-dialog transition="dialog-top-transition" max-width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-col>
          <v-img
            v-bind="attrs"
            v-on="on"
            src="@/assets/plus_icon.png"
            height="auto"
            max-width="344"
          ></v-img>
        </v-col>
      </template>
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar>
            <v-toolbar-title
              >Nueva comida. </v-toolbar-title
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
.card{
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px !important;
}
.card:hover{
  transition: all 0.2s ease-in-out;
  transform: scale(1.03);
}
</style>