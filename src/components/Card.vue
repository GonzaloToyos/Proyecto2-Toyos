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
          <v-row class="d-flex align-end">
            <v-col>
              <v-btn color="warning" v-bind="attrs" v-on="on">Más info</v-btn>
            </v-col>
            <v-text-field
              v-model="comidaEnvio.cantidad"
              class="mt-0 pt-0"
              type="number"
              style="width: 60px"
              :min="1"
            ></v-text-field>
            <v-col class="d-flex justify-end">
              <v-btn color="success" @click="agregarComida(comidaEnvio)"
                >Agregar</v-btn
              >
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
            <v-row class="d-flex justify-space-between align-end" style="margin: 0px">
              <v-col>
                <v-card-actions>
                  <v-btn
                    color="success"
                    class="mx-auto"
                    @click="agregarComida(comidaEnvio), dialog.value = false"
                    >Agregar</v-btn
                  >
                </v-card-actions>
              </v-col>
              <v-text-field
                v-model="comidaEnvio.cantidad"
                class="mt-0 pt-0"
                type="number"
                style="width: 60px"
                :min="1"
              ></v-text-field>
              <v-col>
                <v-card-actions>
                  <v-btn color="warning" class="mx-auto" @click="dialog.value = false"
                    >Cerrar</v-btn
                  >
                </v-card-actions>
              </v-col>
            </v-row>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-card>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "ProductCard",
  props: {
    title: Object,
    id: String,
  },
  data() {
    return {
      show: false,
      dialog: false,
      cant: 1,
      comidaEnvio: {
        titulo: this.title.titulo,
        precio: this.title.precio,
        cantidad: 1,
      },
    };
  },
  filters: {
    formatPrecio(precio) {
      return `$${precio.toFixed(2)}`;
    },
  },
  methods: {
    mostrar(i) {
      return i ? "show" : "s";
    },
    ...mapMutations(["agregarComida"]),
  },
  computed: {
    ...mapState(["carrito"]),
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