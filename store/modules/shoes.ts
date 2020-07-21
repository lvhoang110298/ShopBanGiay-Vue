import API from '../../utils/axios'
const initState = () => {
  return {
    shoesList: [],
    shoes: {},
    shoesMen: [],
    shoesWomen: [],
  }
}
const getters = {
  getShoesList(state: any, getters: any): any {
    return state.shoesList
  },
  getShoesMen(state: any, getters: any): any {
    return state.shoesMen
  },
  getShoesWomen(state: any, getters: any): any {
    return state.shoesWomen
  },
}
const mutations = {
  SET_SHOES_LIST(state: any, payload: any) {
    state.shoesList = payload
  },
  SET_SHOES(state: any, payload: any) {
    state.shoes = payload
  },
  SET_SHOES_MEN(state: any, payload: any) {
    state.shoesMen = payload
  },
  SET_SHOES_WOMEN(state: any, payload: any) {
    state.shoesWomen = payload
  },
}
const actions = {
  setShoes({ commit }: any, payload: any) {
    commit('SET_SHOES', payload)
  },
  getAllProduct({ commit }: any) {
    return API.get('/client/shoes').then((res) => {
      const responseJSON = res.data.data
      const response = JSON.parse(responseJSON)
      commit('SET_SHOES_LIST', response)
    })
  },
  getProductById({ commit }: any, id: any) {
    return API.get(`/client/shoes/${id}`).then((res) => {
      const responseJSON = res.data.data
      const response = JSON.parse(responseJSON)
      commit('SET_SHOES', response)
    })
  },
  getMenProduct({ commit }: any) {
    const params = { gender: 'nam' }
    return API.get(`/client/shoes`, { params }).then((res) => {
      const responseJSON = res.data.data
      const response = JSON.parse(responseJSON)
      commit('SET_SHOES_MEN', response)
    })
  },
  getWomenProduct({ commit }: any) {
    const params = { gender: 'nữ' }
    return API.get(`/client/shoes`, { params }).then((res) => {
      const responseJSON = res.data.data
      const response = JSON.parse(responseJSON)
      commit('SET_SHOES_WOMEN', response)
    })
  },
}

const shoesModule = {
  state: initState(),
  getters,
  mutations,
  actions,
}

export default shoesModule
