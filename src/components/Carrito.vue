<template>
  <div class="cart">
    <v-simple-table class="tabla" :class="mostrar(show)">
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
          <tr v-for="(item, i) in cart" :key="i">
            <td class="text-left">{{ item.titulo }}</td>
            <td class="text-left">
              {{ (item.precio * item.quantity) | formatPrecio }}
            </td>
            <td class="text-center">{{ item.quantity }}</td>
            <td class="text-center">
              <v-btn
                @click="removeFromCart(item.titulo)"
                class="mr-2"
                fab
                dark
                x-small
                color="error"
              >
                <v-icon dark> mdi-minus </v-icon>
              </v-btn>
              <v-btn
                @click="incrementFromCart(item.titulo)"
                fab
                dark
                x-small
                color="primary"
              >
                <v-icon dark> mdi-plus </v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th class="text-left">Total</th>
            <th class="text-left">{{ precioTotal | formatPrecio }}</th>
            <th class="text-center">{{ cantidadTotal }}</th>
            <th class="text-center">
              <!-- Este boton te manda a la vista carrito si estas en Home-->
              <v-btn
                v-if="$route.name == 'home'"
                @click="$router.push('/carrito')"
                dark
                x-small
                color="success"
              >
                Continuar
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
  margin: 0 auto;
}
.tabla {
  border: 1px solid black !important;
}
.show {
  display: none;
  border: 0px solid black !important;
}

@media screen and (max-width: 600px) {
  .cart {
    width: 380px;
  }
}
</style>

<script>
export default {
  name: "CarritoComidas",
  props: {
    show: Boolean,
  },
  filters: {
    formatPrecio(precio) {
      return `$${precio}`;
    },
  },
  methods: {
    removeFromCart(titulo) {
      this.$store.commit("removeFromCart", titulo);
    },
    incrementFromCart(titulo) {
      this.$store.commit("incrementFromCart", titulo);
    },
    mostrar(i) {
      return i ? "s" : "show";
    },
  },
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    precioTotal() {
      return this.$store.getters.precioTotalCarrito;
    },
    cantidadTotal() {
      return this.$store.getters.cantidadTotalCarrito;
    },
  },
};
</script>