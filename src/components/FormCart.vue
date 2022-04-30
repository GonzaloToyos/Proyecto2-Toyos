<template>
  <div class="form-cart-container">
    <!--FORMULARIO-->
    <v-form ref="form" class="form-cart" v-model="valid" lazy-validation>
      <h2>Pago</h2>
      <v-text-field
        v-model="name"
        :rules="nameRules"
        label="Nombre del titular"
        required
      ></v-text-field>

      <v-text-field
        v-model="dni"
        :rules="DNIRules"
        label="DNI Titular"
        required
      ></v-text-field>

      <v-text-field
        v-model="numeroTarjeta"
        :rules="tarjetaRules"
        label="Número de tarjeta"
        type="text"
        required
      ></v-text-field>

      <v-text-field
        v-model="codigoSeguridad"
        :rules="codigoRules"
        label="Código de seguridad"
        type="password"
        required
      ></v-text-field>

      <div class="btn-container">
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
        >
          Enviar pedido
        </v-btn>

        <v-btn color="error" class="mr-4" @click="reset"> Reset </v-btn>
      </div>
    </v-form>
    <!--MODAL CONFIRMACION-->
    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Confirmación del pedido
          </v-card-title>

          <h3>¿Está seguro de que quiere enviar el pedido?</h3>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn color="danger" text @click="dialog = false">
              Cancelar
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="(dialog = false), enviarPedido()"
            >
              Enviar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <!--MENSAJE CARRITO VACIO-->
    <div class="text-center">
      <v-snackbar v-model="snackbar" :timeout="timeout">
        ¡Carrito vacío!

        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "FormCart",
  props: {
    msg: String,
  },
  data: () => ({
    dialog: false,
    valid: true,
    snackbar: false,
    timeout: 5000,
    name: "",
    nameRules: [
      (v) => !!v || "Nombre requerido",
      (v) =>
        (v && v.length <= 100) ||
        "El nombre no debe superar los 100 caracteres",
    ],
    dni: "",
    DNIRules: [
      (v) => !!v || "DNI requerido",
      (v) =>
        (v && v.length < 9) ||
        "El DNI no puede superar los 9 caracteres numéricos",
      (v) => /^[0-9]+$/g.test(v) || "Solo números",
    ],
    numeroTarjeta: "",
    tarjetaRules: [
      (v) => !!v || "Tarjeta requerida",
      (v) => (v && v.length === 16) || "Número de tajeta inválido",
      (v) => /^[0-9]+$/g.test(v) || "Solo números",
    ],
    codigoSeguridad: "",
    codigoRules: [
      (v) => !!v || "Código requerido",
      (v) => (v && v.length === 3) || "El código debe tener 3 dígitos",
      (v) => /^[0-9]+$/g.test(v) || "Solo números",
    ],
  }),

  methods: {
    deleteCart() {
      this.$store.commit("deleteCart");
    },
    validate() {
      this.$refs.form.validate();

      if (this.$refs.form.validate()) {
        if (this.cart.length !== 0) {
          this.dialog = true;
        } else {
          this.snackbar = true;
        }
      } else {
        this.snackbar = true;
        console.log("FALLO");
      }
    },
    async enviarPedido() {
      const url =
        "https://trabajofinal-909d8-default-rtdb.firebaseio.com/Pedidos.json";

      await axios.post(url, {
        Orden: this.cart,
        Fecha: new Date().toLocaleDateString("ES-es"),
        Usuario: this.userFake,
      });

      this.deleteCart();
    },
    reset() {
      this.$refs.form.reset();
    },
  },

  computed: {
    cart() {
      return this.$store.state.cart;
    },
    precioTotal() {
      return this.$store.getters.precioTotalCarrito;
    },
    cantidadTotal() {
      return this.$store.getters.cantidadTotalCarrito;
    },
    ...mapState(["userFake"]),
  },
};
</script>

<style scoped>
.form-cart {
  background-color: white;
  width: 500px;
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
}
.form-cart-container {
  margin: auto;
}
</style>