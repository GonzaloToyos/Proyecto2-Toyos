<template>
  <FormRegistro class="container" />
</template>


  
<script>
import FormRegistro from "@/components/FormRegistro.vue";

export default {
  name: "App",

  components: {
    FormRegistro
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