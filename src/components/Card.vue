<template>
  <v-card class="mx-auto mt-5" max-width="344" :class="mostrar(show)">
    <v-img :src="title.img" height="200px"></v-img>

    <v-card-title>
      {{ title.titulo }}
      <v-spacer></v-spacer>
      <v-card-subtitle>
        {{ parseInt(title.precio, 10) | formatPrecio }}
      </v-card-subtitle>
    </v-card-title>

    <v-col cols="auto">
      <v-dialog transition="dialog-top-transition" max-width="600">
        <template v-slot:activator="{ on, attrs }">
          <v-row class="d-flex">
            <v-col>
              <v-btn color="warning" v-bind="attrs" v-on="on">Más info</v-btn>
            </v-col>
            <v-col class="d-flex justify-end">
              <v-btn color="success">Agregar</v-btn>
            </v-col>
          </v-row>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar>
              <v-toolbar-title>{{ title.titulo }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items class="d-flex align-center">
                <v-chip color="orange">
                  {{ parseInt(title.precio, 10) | formatPrecio }}
                </v-chip>
              </v-toolbar-items>
            </v-toolbar>

            <v-img :src="title.img" height="auto" max-height="450px"></v-img>
            <v-card-text>
              <div class="body-1 mt-3">{{ title.desc }}</div>
            </v-card-text>
            <v-row class="d-flex justify-space-between" style="margin: 0px">
              <v-col>
                <v-card-actions>
                  <v-btn text class="mx-auto">Agregar</v-btn>
                </v-card-actions>
              </v-col>

              <v-col>
                <v-card-actions>
                  <v-btn
                    text
                    class="mx-auto"
                    @click="borrarComida(id), (dialog.value = false)"
                    >Eliminar</v-btn
                  >
                </v-card-actions>
              </v-col>

              <v-col>
                <v-card-actions>
                  <v-btn text class="mx-auto" @click="dialog3 = !dialog3">
                    Editar
                  </v-btn>
                </v-card-actions>
              </v-col>

              <v-col>
                <v-card-actions>
                  <v-btn text class="mx-auto" @click="dialog.value = false"
                    >Cerrar</v-btn
                  >
                </v-card-actions>
              </v-col>
            </v-row>
          </v-card>

          <!-- modal para que salga el editor de comida -->
          <v-dialog v-model="dialog3" max-width="500px">
            <v-card>
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
                      @click="validate(id)"
                    >
                      Agregar
                    </v-btn>

                    <v-btn color="error" class="mr-4" @click="reset">
                      Reset
                    </v-btn>
                    <v-btn color="error" @click="dialog3 = false">Cerrar</v-btn>
                  </div>
                </v-form>
              </div>
            </v-card>
          </v-dialog>
        </template>
      </v-dialog>
    </v-col>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "ProductCard",
  props: {
    title: Array,
    id: Number,
  },
  data() {
    return {
      show: false,
      dialog: false,
      dialog3: false,
      //form edit
      valid: true,
      nombreComida: this.title.titulo,
      nombreComidaRules: [
        (v) => !!v || "Comida requerida",
        (v) =>
          (v && v.length <= 25) ||
          "El nombre de la comida no puede superar los 25 caracteres.",
      ],
      precioComida: this.title.precio,
      precioComidaRules: [
        (v) => !!v || "Precio requerido",
        (v) => /^[0-9]+$/g.test(v) || "Solo números",
      ],
      imagenComida: this.title.img,
      imagenComidaRules: [(v) => !!v || "Imagen requerida"],
      descComida: this.title.desc,
      descComidaRules: [
        (v) => !!v || "Descripción requerida",
        (v) =>
          (v && v.length <= 100) ||
          "La descripción de la comida no puede superar los 100 caracteres.",
      ],
    };
  },
  filters: {
    formatPrecio(precio) {
      return `$${precio.toFixed(2)}`;
    },
  },
  methods: {
    async borrarComida(id) {
      const url = `https://trabajofinal-909d8-default-rtdb.firebaseio.com/comidas/${id}.json`;

      await axios.delete(url);
      this.show = true;
    },
    mostrar(i) {
      return i ? "show" : "s";
    },
    //metodos form
    async validate(id) {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        console.log(this.nombreComida);

        const url = `https://trabajofinal-909d8-default-rtdb.firebaseio.com/comidas/${id}.json`;
        await axios.put(url, {
          desc: this.descComida,
          img: this.imagenComida,
          precio: this.precioComida,
          titulo: this.nombreComida,
        });

      } else {
        console.log("MAL");
      }
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style scoped>
.show {
  display: none;
}
.container {
  margin: auto;
  max-width: 800px;
}
</style>