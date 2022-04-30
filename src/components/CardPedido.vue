<!-- Esta Card es para mostrar los pedidos activos en la vista del admin. Los usuarios comunes no la ven -->
<template>
  <v-card class="mx-auto mb-3 mt-5 px-5 card" dark color="rgb(14 27 34)" max-width="344" outlined elevation="10" :class="mostrar(show)">
    <div class="text-overline mb-4">
      {{ pedidos.Fecha }} | {{ pedidos.Usuario.correoFake }}
    </div>
    <v-list-item-title class="text-h5 mb-1">
      <u>Productos</u>
    </v-list-item-title>
    <v-list-item-title
      v-for="(producto, i) in pedidos.Orden"
      :key="i"
      class="text-h5 mb-1"
    >
      {{ producto.titulo }} | {{ producto.quantity }}
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
        suma += parseInt(producto.precio) * parseInt(producto.quantity);
      }
      return suma;
    },
    cantidadTotal(carro) {
      let suma = 0;
      for (let producto of carro.Orden) {
        suma += parseInt(producto.quantity);
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
.card{
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px !important;
}
button:hover{
  transform: scale(1.1);
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 15px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px !important;
}
button{
   border: 2px solid black !important;
   margin: auto;
   bottom: 0px;
}
</style>