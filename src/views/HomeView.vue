<template>
  <v-app>
    <v-main>
      <!--CARROUSEL-->
      <div class="carrousel">
        <CarrouselComidas :imagenes="imagenes" />
      </div>
      <!--CARROUSEL-->

      <div class="cards-carrito-container">
        <!-- CARDS COMIDAS -->
        <div class="cards-container">
          <ProductCard
            v-for="(comida, i) of comidas"
            :key="i"
            :title="comidas[i]"
            :id="id[i]"
          />
        </div>
        <!-- CARRITO -->
        <div class="container-carrito">
          <v-btn
            @click="isActiveCarrito = !isActiveCarrito"
            class="mx-2"
            fab
            dark
            small
            color="primary"
          >
            <v-icon dark>
              {{ isActiveCarrito ? "mdi-cart-outline" : "mdi-cart-off" }}
            </v-icon>
          </v-btn>
          <CarritoComidas :show="isActiveCarrito" />
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import ProductCard from "@/components/Card.vue";
import CarritoComidas from "@/components/Carrito.vue";
import CarrouselComidas from "@/components/Carrousel.vue";
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "App",

  components: {
    ProductCard,
    CarritoComidas,
    CarrouselComidas,
  },

  data: () => ({
    imag: [
      "https://www.recetasparaguay.com/base/stock/Recipe/92-image/92-image_web.jpg",
      "https://www.cronista.com/files/image/413/413115/61a8e11ba5998.jpg",
      "https://i.blogs.es/58e562/hambruguesa/1366_2000.jpg",
      "https://i.blogs.es/58e562/hambruguesa/1366_2000.jpg",
      "https://i.blogs.es/58e562/hambruguesa/1366_2000.jpg",
    ],
    imagenes: [],
    isActiveCarrito: true,
    comidasCards: [],
    comidas: [],
    id: [],
  }),

  async created() {
    let url =
      "https://trabajofinal-909d8-default-rtdb.firebaseio.com/comidas.json";

    await axios
      .get(url)
      .then((response) => (this.comidasCards = response.data));

    this.comidas = Object.values(this.comidasCards);
    this.id = Object.keys(this.comidasCards);

    url =
      "https://trabajofinal-909d8-default-rtdb.firebaseio.com/Carrousel.json";

    await axios.get(url).then((response) => (this.imagenes = response.data));

    this.imagenes.shift();
  },

  beforeCreate() {
    if (this.$store.state.userFake.online === false) {
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
  max-width: 90%;
  margin: auto;
  padding: 15px;
  border: 1px solid black;
  border-radius: 5px;
}
.cards-carrito-container {
  display: flex;
  flex-wrap: wrap;
  max-width: 90%;
  margin: auto;
  align-items: flex-start;
}
.cards-container {
  display: flex;
  flex-wrap: wrap;
  max-width: 70%;
  margin: auto;
  justify-content: space-evenly;
}
.container-carrito {
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.carrousel {
  position: relative;
}

/*
.carrousel::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0px;
  width: 100%;
  height: 3%;
  background: linear-gradient(to bottom, rgb(28 34 40), transparent);
  z-index: 3;
}*/

@media screen and (max-width: 1700px) {
  .cards-carrito-container {
    max-width: 90%;
  }
}

@media screen and (max-width: 1500px) {
  .cards-carrito-container {
    flex-direction: column-reverse;
    max-width: 95%;
  }
  .cards-container {
    max-width: 90%;
  }
  .container-carrito {
    margin: auto;
  }
}

@media screen and (max-width: 600px) {
  .cards-carrito-container {
    max-width: 100%;
  }
  .cards-container {
    max-width: 100%;
  }
  .container-carrito {
    max-width: 90%;
    margin: auto;
  }
}

@media screen and (min-width: 800px) {
  .container {
    max-width: 500px;
  }
}
</style>