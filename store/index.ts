import Vuex from 'vuex'
import shoesModule from './modules/shoes'
import loginModule from './modules/login'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      shoes: shoesModule,
      auth: loginModule,
    },
  })
}

export default createStore
