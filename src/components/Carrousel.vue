<template>
  <v-carousel
    style="max-width: 100%; margin: auto"
    class="carrousel-componente"
    cycle
    hide-delimiter-background
    show-arrows-on-hover
    height="500"
  >
    <v-carousel-item v-for="(imagen, i) in imagenes" :key="i">
      <v-sheet color="rgb(28 34 40)" height="100%">
        <v-row class="fill-height" align="center" justify="center">
          <img :src="imagen" alt="" />
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: "CarrouselComidas",
  props: {
    imagenes: Array,
  },
};
</script>

<style>
img {
  height: 100%;
  width: auto;
  margin: auto;
  max-width: 65%;
}

@media screen and (max-width: 700px) {
  .carrousel-componente {
    height: 250px !important;
  }
  .v-carousel__item {
    height: inherit !important;
  }
}
</style>