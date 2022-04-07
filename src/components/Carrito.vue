<template>
  <div class="cart" :class="mostrar(show)">
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Producto</th>
            <th class="text-left">Precio</th>
            <th class="text-center">Cantidad</th>
            <th class="text-center">Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in carrito" :key="i">
            <td class="text-left">{{ item.titulo }}</td>
            <td class="text-left">
              {{ (item.precio * item.cantidad) | formatPrecio }}
            </td>
            <td class="text-center">{{ item.cantidad }}</td>
            <td class="text-center">
              <v-btn
                @click="eliminarComida(item.titulo)"
                fab
                dark
                x-small
                color="error"
              >
                <v-icon dark> mdi-delete </v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th class="text-left">Total</th>
            <th class="text-left">{{ sumaTotal(carrito) | formatPrecio }}</th>
            <th class="text-center">{{ cantidadTotal(carrito) }}</th>
            <th class="text-center">
              <v-btn
                @click="enviarPedido(carrito)"
                dark
                x-small
                color="success"
              >
                Enviar
              </v-btn>
            </th>
          </tr>
        </tfoot>
      </template>
    </v-simple-table>
  </div>
</template>

<style scoped>
.cart {
  width: 400px;
  height: auto;
  margin: auto;
  border: 1px solid black !important;
}
.show {
  display: none;
}

@media screen and (max-width: 600px) {
  .cart {
    width: 300px;
  }
}
</style>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import axios from "axios";

export default {
  name: "CarritoComidas",
  props: {
    productos: Array,
    show: Boolean,
  },
  filters: {
    formatPrecio(precio) {
      return `$${precio}`;
    },
  },
  methods: {
    mostrar(i) {
      return i ? "s" : "show";
    },
    ...mapMutations(["eliminarComida"]),
    ...mapActions(["eliminarCarrito"]),
    sumaTotal(carro) {
      let suma = 0;
      for (let producto of carro) {
        suma += parseInt(producto.precio) * parseInt(producto.cantidad);
      }
      return suma;
    },
    cantidadTotal(carro) {
      let suma = 0;
      for (let producto of carro) {
        suma += parseInt(producto.cantidad);
      }
      return suma;
    },
    async enviarPedido(pedido) {
      const url =
        "https://trabajofinal-909d8-default-rtdb.firebaseio.com/Pedidos.json";

      await axios.post(url, {
        Orden: pedido,
        Fecha: (new Date).toLocaleDateString('ES-es'),
        Usuario: this.usuarios
      });

      this.eliminarCarrito();
    },
  },
  computed: {
    ...mapState(["carrito", "usuarios"]),
  },
};
</script>