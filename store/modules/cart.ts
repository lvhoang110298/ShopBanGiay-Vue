import API from '../../utils/axios'
const initState = () => {
  return {
    cart: null,
    totalCard: 0,
  }
}
const getters = {
  getCartItems(state: any, getters: any) {},
}
const mutations = {
  SET_CART(state: any, payload: any) {
    state.cart = payload
  },
}
const actions = {
  async getCartItems({ commit }: any) {
    const path = 'client/cart/get'
    const token = localStorage.getItem('identity')
    const AuthStr = 'Bearer ' + token
    return await API.get(path, { headers: { Authorization: AuthStr } }).then(
      async (res) => {
        const responseJSON = res.data.data
        const response = JSON.parse(responseJSON)
        await commit('SET_CART', response)
      }
    )
  },
  // async getCart({commit} : any){
  //    const token = localStorage.getItem('identity');
  //   if(!token) {
  //     const cart = JSON.parse(localStorage.getItem('cart')|| '{}')
  //     const shoesList = cart.map( e => )
  //   }
  // }

  async addProductToCart({ commit }: any, { shoesId, sizeName, stockId }: any) {
    const path = 'client/cart/add'
    const token = localStorage.getItem('identity')
    const AuthStr = 'Bearer ' + token
    return await API.post(
      path,
      { shoesId, sizeName, quantity: 1, stockId },
      {
        headers: { Authorization: AuthStr },
      }
    ).then((res) => {
      const responseJSON = res.data.data
      const response = JSON.parse(responseJSON)
      commit('SET_CART', response)
    })
  },
  async syncCart({ commit }: any) {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}')
    const path = 'client/cart/sync'
    const token = localStorage.getItem('identity')
    const AuthStr = 'Bearer ' + token
    return await API.post(path, cart, {
      headers: { Authorization: AuthStr },
    }).then((res) => {
      const responseJSON = res.data.data
      const response = JSON.parse(responseJSON)
      commit('SET_CART', response)
      localStorage.removeItem('cart')
    })
  },
}

const cartModule = {
  state: initState(),
  getters,
  mutations,
  actions,
}

export default cartModule
