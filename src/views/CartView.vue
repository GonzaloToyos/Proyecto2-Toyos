<template>
  <div class="container-carrito-datos">
    <CarritoComidas :show="true" />
    <FormCart />
  </div>
</template>

<script>
import CarritoComidas from "@/components/Carrito.vue";
import FormCart from "@/components/FormCart.vue";

export default {
  name: "CarritoView",

  components: {
    CarritoComidas,
    FormCart
  },
};
</script>

<style>
.container-carrito-datos {
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
}
</style>