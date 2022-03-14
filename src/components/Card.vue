<template>
  <v-card class="mx-auto mt-5" max-width="344">
    <v-img :src="title[index].img" height="200px"></v-img>

    <v-card-title>
      {{ title[index].titulo }}
    </v-card-title>

    <v-card-subtitle>
      {{ title[index].precio | formatPrecio }}
    </v-card-subtitle>

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
              <v-toolbar-title>{{ title[index].titulo }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items class="d-flex align-center">
                <v-chip color="orange"> {{ title[index].precio | formatPrecio}} </v-chip>
              </v-toolbar-items>
            </v-toolbar>

            <v-img
              :src="title[index].img"
              height="auto"
              max-height="450px"
            ></v-img>
            <v-card-text>
              <div class="body-1 mt-3">{{ title[index].desc }}</div>
            </v-card-text>
            <v-row class="d-flex" style="margin: 0px">
              <v-col>
                <v-card-actions class="justify-start">
                  <v-btn text @click="dialog.value = false">Agregar</v-btn>
                </v-card-actions>
              </v-col>

              <v-col>
                <v-card-actions class="justify-end">
                  <v-btn text @click="dialog.value = false">Cerrar</v-btn>
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
    title: Array,
    index: Number,
  },
  filters: {
    formatPrecio(precio) {
      return `$${precio.toFixed(2)}`;
    },
  },
};
</script>