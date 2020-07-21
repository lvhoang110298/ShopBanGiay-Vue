import Vuex from 'vuex'
import shoesModule from './modules/shoes'
import loginModule from './modules/login'
import cartModule from './modules/cart'
import customerModule from './modules/customer'
import orderModule from './modules/order'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({}),
    modules: {
      shoes: shoesModule,
      auth: loginModule,
      cart: cartModule,
      customer: customerModule,
      order: orderModule,
    },
    getters: {
      isAuthenticated(state) {
        return state.auth.loggedIn
      },
      loggedInUser(state) {
        return localStorage.getItem('identity' || '')
      },
    },
  })
}

export default createStore
