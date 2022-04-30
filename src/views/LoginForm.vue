<template>
  <div class="container">
    <FormLogin />
    <v-alert border="right" color="blue-grey" dark class="mt-5">
      Usuario admin: prueba@gmail.com || Contraseña: 123456
    </v-alert>
    <v-alert border="right" color="blue-grey" dark class="mt-5">
      Usuario cliente: juan@gmail.com || Contraseña: 111111
    </v-alert>
  </div>
</template>


  
<script>
import FormLogin from "@/components/FormLogin.vue";

export default {
  name: "App",

  components: {
    FormLogin,
  },
};
</script>

<style scoped>
.btn-container {
  display: flex;
  justify-content: space-between;
}

.container {
  max-width: 80%;
  margin: 5vh auto;
  padding: 15px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: white;
}

@media screen and (min-width: 800px) {
  .container {
    max-width: 500px;
  }
}
</style>