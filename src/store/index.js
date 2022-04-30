import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function updateLocalStorage(cart) {
  localStorage.setItem('cart', JSON.stringify(cart))
}

//user fake
function updateUserLocalStorage(user) {
  localStorage.setItem('user', JSON.stringify(user))
}

export default new Vuex.Store({
  state: {
    cart: [],
    userFake: {
      nombreFake: '',
      correoFake: '',
      adminFake: false,
      online: false,
    },
    updateCardsAdmin: false,
  },
  getters: {
    precioTotalCarrito: state => {
      let suma = 0;
      for (let producto of state.cart) {
        suma += parseInt(producto.precio) * parseInt(producto.quantity);
      }
      return suma;
    },
    cantidadTotalCarrito: state => {
      let suma = 0;
      for (let producto of state.cart) {
        suma += parseInt(producto.quantity);
      }
      return suma;
    },
    isUserOnline: state => {
      return state.userFake.online
    }
  },
  mutations: {
    addToCart(state, product) {
      let item = state.cart.find(i => i.titulo === product.titulo)

      if (item) {
        item.quantity += parseInt(product.agregado);
      } else {
        state.cart.push({ ...product, quantity: parseInt(product.agregado) })
      }

      updateLocalStorage(state.cart);
    },
    removeFromCart(state, product) {
      let item = state.cart.find(i => i.titulo === product)

      if (item) {
        if (item.quantity > 1) {
          item.quantity--
        } else {
          state.cart = state.cart.filter(i => i.titulo !== product)
        }
      }
      updateLocalStorage(state.cart);
    },
    incrementFromCart(state, product) {
      let item = state.cart.find(i => i.titulo === product)

      if (item) {
        item.quantity++
      }
      updateLocalStorage(state.cart);
    },
    deleteCart(state) {
      state.cart = []
      updateLocalStorage(state.cart);
    },
    updateCartFromLocalStorage(state) {
      const cart = localStorage.getItem('cart')

      if (cart) {
        state.cart = JSON.parse(cart);
      }
    },

    //fake user
    createUser(state, user) {
      state.userFake = {
        nombreFake: user.nombreActual,
        correoFake: user.correoActual,
        adminFake: user.adminActual,
        online: true
      }

      updateUserLocalStorage(state.userFake);
    },
    endUserSession(state) {
      delete state.userFake.nombreFake;
      delete state.userFake.correoFake;
      delete state.userFake.adminFake;
      state.userFake.online = false;

      updateUserLocalStorage(state.userFake);
    },
    updateUserFromLocalStorage(state) {
      const user = localStorage.getItem('user')

      if (user) {
        state.userFake = JSON.parse(user);
      }
    },
  },
  actions: {
  },
  modules: {
  }
})
