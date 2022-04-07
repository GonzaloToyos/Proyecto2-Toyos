<template>
  <v-card class="mx-auto mb-3 px-5" max-width="344" outlined elevation="10" :class="mostrar(show)">
    <div class="text-overline mb-4">
      {{ pedidos.Fecha }} | {{ pedidos.Usuario.correoActual }}
    </div>
    <v-list-item-title class="text-h5 mb-1">
      <u>Productos</u>
    </v-list-item-title>
    <v-list-item-title
      v-for="(producto, i) in pedidos.Orden"
      :key="i"
      class="text-h5 mb-1"
    >
      {{ producto.titulo }} | {{ producto.cantidad }}
    </v-list-item-title>
    <h3>{{ cantidadTotal(pedidos) }}</h3>
    <h3>${{ sumaTotal(pedidos) }}</h3>
    <v-btn
      color="error"
      class="mx-auto mb-2"
      @click="borrarPedido(id)"
      >Terminar</v-btn
    >
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "CardPedido",
  props: {
    pedidos: Object,
    id: String
  },
  data() {
      return {
          show: false,
      }
  },
  methods: {
    sumaTotal(carro) {
      let suma = 0;
      for (let producto of carro.Orden) {
        suma += parseInt(producto.precio) * parseInt(producto.cantidad);
      }
      return suma;
    },
    cantidadTotal(carro) {
      let suma = 0;
      for (let producto of carro.Orden) {
        suma += parseInt(producto.cantidad);
      }
      return suma;
    },
    async borrarPedido(id) {
      const url = `https://trabajofinal-909d8-default-rtdb.firebaseio.com/Pedidos/${id}.json`;

      await axios.delete(url);
      this.show = true;
    },
     mostrar(i) {
      return i ? "show" : "s";
    },
  },
  created(){
      console.log(this.id)
  }
};
</script>

<style scoped>
.show {
  display: none;
}
</style>