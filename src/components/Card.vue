<!-- Esta Card la ven los usuarios comunes cuando agregan productos al carrito -->
<template>
  <v-card class="mx-3 mt-5 card" max-width="344">
    <v-img
      @click.stop="dialog = true"
      class="imagen-card"
      :src="title.img"
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
        transition="dialog-top-transition"
        v-model="dialog"
        max-width="600"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-row class="d-flex align-end">
            <v-col>
              <v-btn color="#ff9c20" v-bind="attrs" v-on="on">Más info</v-btn>
            </v-col>
            <v-text-field
              v-model="comidaEnviada.agregado"
              class="mt-0 pt-0"
              type="number"
              style="width: 60px"
              :min="1"
            ></v-text-field>
            <v-col class="d-flex justify-end">
              <v-btn color="#5fbb63" @click="addToCart()"
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
            <v-row
              class="d-flex justify-space-between align-end"
              style="margin: 0px"
            >
              <v-col>
                <v-card-actions>
                  <v-btn
                    color="#5fbb63"
                    class="mx-auto"
                    @click="addToCart(), (dialog.value = false)"
                    >Agregar</v-btn
                  >
                </v-card-actions>
              </v-col>
              <v-text-field
                v-model="comidaEnviada.agregado"
                class="mt-0 pt-0"
                type="number"
                style="width: 60px"
                :min="1"
              ></v-text-field>
              <v-col>
                <v-card-actions>
                  <v-btn
                    color="#ff9c20"
                    class="mx-auto"
                    @click="dialog.value = false"
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
      comidaEnviada: {
        titulo: this.title.titulo,
        precio: this.title.precio,
        agregado: 1
      },
    };
  },
  filters: {
    formatPrecio(precio) {
      return `$${precio.toFixed(2)}`;
    },
  },
  methods: {
    addToCart() {
      this.$store.commit("addToCart", this.comidaEnviada);
    },
  },
};
</script>

<style scoped>
.container {
  margin: auto;
  max-width: 800px;
}

.card {
  border-radius: 10px !important;
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