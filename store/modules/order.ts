import API from '../../utils/axios'
const initState = () => {
  return {
    orders: null,
  }
}

const getters = {}
const mutations = {
  setOrders(state: any, payload: any) {
    state.orders = payload
  },
}

const actions = {
  async getOrders({ commit }: any, { page = 1, pageSize = 10 }) {
    const path = `client/order/list?page=${page}&pageSize=${pageSize}`
    const token = localStorage.getItem('identity')
    const AuthStr = 'Bearer ' + token
    return await API.get(path, {
      headers: { Authorization: AuthStr },
    }).then((res) => {
      const responseJSON = res.data.data
      const response = JSON.parse(responseJSON)
      commit('setOrders', response)
    })
  },
}

const orderModule = {
  state: initState(),
  getters,
  mutations,
  actions,
}

export default orderModule
