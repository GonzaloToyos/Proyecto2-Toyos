<template>
  <v-app>
    <v-main>
      <div class="cards-container">
        <ProductCardAdd />
        <ProductCardAdmin
          @update:card="cardUpdate"
          v-for="(comida, i) of comidas"
          :key="i"
          :title="comidas[i]"
          :id="id[i]"
        />
      </div>
      <br /><br />
    </v-main>
  </v-app>
</template>

<script>
import ProductCardAdd from "@/components/CardAgregar.vue";
import ProductCardAdmin from "@/components/CardAdmin.vue";
import axios from "axios";

export default {
  name: "App",

  components: {
    ProductCardAdd,
    ProductCardAdmin,
  },

  data: () => ({
    user: "",
    comidasCards: [],
    comidas: [],
    id: [],
  }),

  methods: {
    async cardUpdate() {
      let url =
        "https://trabajofinal-909d8-default-rtdb.firebaseio.com/comidas.json";

      await axios
        .get(url)
        .then((response) => (this.comidasCards = response.data));

      this.comidas = Object.values(this.comidasCards);
      this.id = Object.keys(this.comidasCards);
    },
  },

  async created() {
    let url =
      "https://trabajofinal-909d8-default-rtdb.firebaseio.com/comidas.json";

    await axios
      .get(url)
      .then((response) => (this.comidasCards = response.data));

    this.comidas = Object.values(this.comidasCards);
    this.id = Object.keys(this.comidasCards);
  },

  async beforeUpdate() {
    let url =
      "https://trabajofinal-909d8-default-rtdb.firebaseio.com/comidas.json";

    await axios
      .get(url)
      .then((response) => (this.comidasCards = response.data));

    this.comidas = Object.values(this.comidasCards);
    this.id = Object.keys(this.comidasCards);
  },

  beforeCreate() {
    this.$store.commit("updateUserFromLocalStorage");

    if (
      !this.$store.state.userFake.online ||
      !this.$store.state.userFake.adminFake
    ) {
      this.$router.push("/login");
    }
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