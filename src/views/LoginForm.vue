<template>
  <div class="container">
    <form-login />
    <v-alert border="right" color="blue-grey" dark class="mt-5">
      Usuario sugerido: prueba@gmail.com || Contraseña: 123456
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
  margin: auto;
  padding: 15px;
  border: 1px solid black;
  border-radius: 5px;
}

@media screen and (min-width: 800px) {
  .container {
    max-width: 500px;
  }
}
</style>