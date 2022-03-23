<template>
  <form-registro class="container" />
</template>


  
<script>
import FormRegistro from "@/components/FormRegistro.vue";

export default {
  name: "App",

  components: {
    FormRegistro,
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

.v-application--wrap {
  min-height: 0vh !important;
  max-height: fit-content !important;
}

@media screen and (min-width: 800px) {
  .container {
    max-width: 500px;
  }
}
</style>