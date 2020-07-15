import API from '../../utils/axios'
const initState = () => {
  return {
    shoesList: [],
    shoes: {},
  }
}
const getters = {
  getShoesList(state: any, getters: any): any {
    console.log(22, state)
    return state.shoesList
  },
}
const mutations = {
  SET_SHOES_LIST(state: any, payload: any) {
    state.shoesList = payload
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
}

const shoesModule = {
  state: initState(),
  getters,
  mutations,
  actions,
}

export default shoesModule
