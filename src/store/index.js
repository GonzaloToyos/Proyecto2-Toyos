import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario: {
      nombre: undefined,
      admin: undefined,
      correo: undefined,
    },
    carrito: [],
    usuarios: '',
  },
  getters: {
  },
  mutations: {
    asignarUsuario(state, usuario) {
      this.state.usuario.nombre = usuario.nombreActual;
      this.state.usuario.correo = usuario.correoActual;
      this.state.usuario.admin = usuario.adminActual;
    },
    llenarUsers(state, userActions) {
      state.usuarios = userActions
    },
    borrarCarrito(state, userActions) {
      state.carrito = userActions
    },
    agregarComida(state, comida) {
      this.state.carrito.push(comida);
    },
    eliminarComida(state, comida) {
      let index = this.state.carrito.findIndex( food => food.titulo === comida) ;
      this.state.carrito.splice(index, 1);
    }
  },
  actions: {
    async obtenerUsers({ commit }) {
      if (sessionStorage.getItem("user")) {
        const usuarios = sessionStorage.getItem("user");

        commit('llenarUsers', JSON.parse(usuarios))
      }
    },
    async eliminarUsers({ commit }) {
      const usuarios = '';

      commit('llenarUsers', usuarios)
    },
    async eliminarCarrito({ commit }) {
      const carrito = [];

      commit('borrarCarrito', carrito)
    },
  },
  modules: {
  }
})
