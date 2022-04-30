<template>
  <v-app>
    <v-main>
      <div class="cards-container">
        <ProductCardPedido
          v-for="(pedido, i) of pedidos"
          :key="i"
          :pedidos="pedido"
          :id="idPedidos[i]"
        />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import ProductCardPedido from "@/components/CardPedido.vue";
import axios from "axios";

export default {
  name: "App",

  components: {
    ProductCardPedido,
  },

  data: () => ({
    pedidosCards: [],
    pedidos: [],
    idPedidos: [],
  }),

  async created() {
    const url =
      "https://trabajofinal-909d8-default-rtdb.firebaseio.com/Pedidos.json";

    await axios
      .get(url)
      .then((response) => (this.pedidosCards = response.data));

    this.pedidos = Object.values(this.pedidosCards);
    this.idPedidos = Object.keys(this.pedidosCards);
  },

  beforeCreate() {
    this.$store.commit("updateUserFromLocalStorage");

    if (!this.$store.state.userFake.online || !this.$store.state.userFake.adminFake) {
      this.$router.push("/login");
    }
  },
};
</script>

<style scoped>
.cards-container {
  display: flex;
  flex-wrap: wrap;
  max-width: 80%;
  margin: auto;
}
</style>