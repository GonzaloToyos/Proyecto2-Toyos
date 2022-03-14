<template>
  <v-app>
    <v-main>
      <form-registro class="container mb-2" />
      <form-login class="container" />
      <div class="cards-container">
        <product-card
          v-for="(card, i) of cards"
          :key="card"
          :title="cards"
          :index="i"
        />
      </div>
      <br><br><br>
      <div class="container-carrito">
        <v-btn
          @click="mostrarCarrito"
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
        <carrito-comidas
          :productos="carrito"
          :show="isActiveCarrito"
        ></carrito-comidas>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import ProductCard from "./components/Card.vue";
import FormLogin from "./components/FormLogin.vue";
import FormRegistro from "./components/FormRegistro.vue";
import CarritoComidas from "./components/Carrito.vue";

export default {
  name: "App",

  components: {
    FormRegistro,
    FormLogin,
    ProductCard,
    CarritoComidas,
  },

  methods: {
    mostrarCarrito() {
      this.isActiveCarrito = !this.isActiveCarrito;
    },
  },

  data: () => ({
    isActiveCarrito: false,
    cards: [
      {
        titulo: "Fideos",
        precio: 500,
        img: "https://www.recetasparaguay.com/base/stock/Recipe/92-image/92-image_web.jpg",
        desc: "Plato de fideos con salsa bolognesa",
      },
      {
        titulo: "Empanadas",
        precio: 700,
        img: "https://www.cronista.com/files/image/413/413115/61a8e11ba5998.jpg",
        desc: "Empanadas de carne al horno",
      },
      {
        titulo: "Hamburguesa",
        precio: 1000,
        img: "https://i.blogs.es/58e562/hambruguesa/1366_2000.jpg",
        desc: "Hamburguesa con queso y panceta",
      },
      {
        titulo: "Ñoquis",
        precio: 800,
        img: "https://www.clarin.com/img/2018/06/19/HJS8-kvW7_1256x620__2.jpg#1588085373911",
        desc: "Ñoquis con salsa fileto",
      },
      {
        titulo: "Ensalada",
        precio: 300,
        img: "https://www.cocinavital.mx/wp-content/uploads/2021/11/receta-de-ensalada-waldorf-634x420.jpg",
        desc: "Ensalada Waldorf",
      },
      {
        titulo: "Pollo frito",
        precio: 500,
        img: "https://www.comedera.com/wp-content/uploads/2018/08/pollo-frito.jpg",
        desc: "Pollo frito",
      },
      {
        titulo: "Pescado",
        precio: 750,
        img: "https://www.hola.com/imagenes/cocina/tecnicas-de-cocina/20200525168569/tecnica-pescado-plancha/0-827-37/salmon-verduras-z.jpg",
        desc: "Pescado a la plancha con tomate",
      },
      {
        titulo: "Pastel de papa",
        precio: 600,
        img: "https://resizer.glanacion.com/resizer/f-nb2JXgqshFXlZ0gt79POuCroM=/879x586/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/64RCEDBW6VBB5PRK7PTUZBS3LU.jpg",
        desc: "Pastel de papa con aceitunas",
      },
    ],
    carrito: [
      {
        producto: "Pescado",
        precio: 750,
        cantidad: 0,
        id: 1,
      },
      {
        producto: "Pescado",
        precio: 750,
        cantidad: 0,
        id: 2,
      },
      {
        producto: "Pescado",
        precio: 750,
        cantidad: 0,
        id: 3,
      },
      {
        producto: "Pescado",
        precio: 750,
        cantidad: 0,
        id: 4,
      },
      {
        producto: "Pescado",
        precio: 750,
        cantidad: 0,
        id: 5,
      },
    ],
  }),
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