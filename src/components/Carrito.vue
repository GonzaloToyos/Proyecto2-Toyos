<template>
  <div class="cart" :class="mostrar(show)">
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Producto</th>
            <th class="text-left">Precio</th>
            <th class="text-left">Cantidad</th>
            <th class="text-left">Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in productos" :key="item.producto">
            <td>{{ item.producto }}</td>
            <td>{{ item.precio | formatPrecio }}</td>
            <td>{{ item.cantidad }}</td>
            <td>
              <v-btn class="mx-2" fab dark x-small color="error">
                <v-icon dark> mdi-delete </v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
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
.show{
    display: none;
}

@media screen and (max-width: 600px) {
  .cart {
    width: 300px;
  }
}
</style>

<script>
export default {
  name: "CarritoComidas",
  props: {
    productos: Array,
    show: Boolean
  },
  filters: {
    formatPrecio(precio) {
      return `$${precio}`;
    },
  },
  methods: {
    mostrar(i) {
      return i ? 'show' : 's';
    },
  },
};
</script>