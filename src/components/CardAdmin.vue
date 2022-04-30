<!-- Esta card es para que el admin edite o elimine los productos existentes -->
<template>
  <v-card class="mx-auto mt-5 card" max-width="344" :class="mostrar(show)">
    <v-img
      :src="title.img"
      @click.stop="dialog = true"
      class="imagen-card"
      height="200px"
    ></v-img>

    <v-card-title>
      {{ title.titulo }}
      <v-spacer></v-spacer>
      <v-card-subtitle>
        {{ parseInt(title.precio, 10) | formatPrecio }}
      </v-card-subtitle>
    </v-card-title>

    <v-col cols="auto">
      <v-dialog
        v-model="dialog"
        transition="dialog-top-transition"
        max-width="600"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-row class="d-flex">
            <v-col>
              <v-btn
                color="#ff3e3e"
                class="mx-auto"
                @click="borrarComida(id)"
                >Eliminar</v-btn
              >
            </v-col>

            <v-col>
              <v-btn
                color="rgb(233,212,49)"
                class="mx-auto"
                v-bind="attrs"
                v-on="on"
              >
                Editar
              </v-btn>
            </v-col>
          </v-row>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-row class="d-flex justify-space-between" style="margin: 0px">
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
                      @click="validate(id), update()"
                    >
                      Editar
                    </v-btn>

                    <v-btn color="error" class="mr-4" @click="reset">
                      Reset
                    </v-btn>
                    <v-btn color="error" @click="dialog.value = false"
                      >Cerrar</v-btn
                    >
                  </div>
                </v-form>
              </div>
            </v-row>
          </v-card>

          <!-- modal para que salga el editor de comida -->
        </template>
      </v-dialog>
    </v-col>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "ProductCardAdmin",
  props: {
    title: Object,
    id: String,
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
    update() {
      this.$emit("update:card",);
    },
    //metodos form
    async validate(id) {
      console.log(`${id}`);
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
.card {
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px !important;
}
.card:hover {
  transform: scale(1.05);
  transition: all 0.2s ease-in-out;
}

.imagen-card {
  cursor: pointer;
}

button:hover {
  transform: scale(1.1);
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px !important;
}
button {
  border: 2px solid black !important;
}
</style>