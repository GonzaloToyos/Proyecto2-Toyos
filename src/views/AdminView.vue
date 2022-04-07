<template>
  <v-app>
    <v-main>
      <div class="cards-container">
        <product-card-add />
        <product-card-admin
          v-for="(comida, i) of comidas"
          :key="i"
          :title="comidas[i]"
          :id="id[i]"
        />
      </div>
      <br /><br /><br /><br />
      <product-card-pedido
        v-for="(pedido, i) of pedidos"
        :key="i"
        :pedidos="pedido"
        :id="idPedidos[i]"
      />
    </v-main>
  </v-app>
</template>

<script>
import ProductCardAdd from "@/components/CardAgregar.vue";
import ProductCardAdmin from "@/components/CardAdmin.vue";
import ProductCardPedido from "@/components/CardPedido.vue";
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "App",

  components: {
    ProductCardAdd,
    ProductCardAdmin,
    ProductCardPedido,
  },

  data: () => ({
    user: "",
    comidasCards: [],
    comidas: [],
    id: [],
    pedidosCards: [],
    pedidos: [],
    idPedidos: [],
  }),

  async created() {
    let url =
      "https://trabajofinal-909d8-default-rtdb.firebaseio.com/comidas.json";

    //await axios.get(url).then((response) => (this.images = response.data));
    /*fetch(url)
      .then((response) => response.json())
      .then((data) => (this.comidasCards = data))
      .then((data) => console.log(data));*/
    await axios
      .get(url)
      .then((response) => (this.comidasCards = response.data));

    this.comidas = Object.values(this.comidasCards);
    this.id = Object.keys(this.comidasCards);

    url = "https://trabajofinal-909d8-default-rtdb.firebaseio.com/Pedidos.json";

    await axios
      .get(url)
      .then((response) => (this.pedidosCards = response.data));

    this.pedidos = Object.values(this.pedidosCards);
    this.idPedidos = Object.keys(this.pedidosCards);
  },

  beforeCreate() {
    if (sessionStorage.getItem("user")) {
      this.user = JSON.parse(sessionStorage.getItem("user"));
    } else {
      this.$router.push("/login");
    }
  },

  computed: {
    ...mapState(["usuario"]),
  },
};
</script>

<style scoped>
.container {
  max-width: 80%;
  margin: auto;
  padding: 15px;
  border: 1px solid black;
  border-radius: 5px;
}
.cards-container {
  display: flex;
  flex-wrap: wrap;
  max-width: 80%;
  margin: auto;
}

.container-carrito {
  margin: auto;
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media screen and (max-width: 600px) {
  .cards-container {
    max-width: 100%;
  }
}

@media screen and (min-width: 800px) {
  .container {
    max-width: 500px;
  }
}
</style>