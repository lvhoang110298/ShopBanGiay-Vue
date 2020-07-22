import API from '../../utils/axios'
const initState = () => {
  return {
    id: null,
    orders: null,
    orderDetails: null,
  }
}

const getters = {}
const mutations = {
  setOrders(state: any, payload: any) {
    state.orders = payload
  },
  setOrderDetail(state: any, payload: any) {
    state.orderDetails = payload
  },
  setId(state: any, payload: any) {
    state.id = payload
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
  async confirmOrder({ commit }: any, { id }: any) {
    const path = 'client/order?addressId=' + id
    const token = localStorage.getItem('identity')
    const AuthStr = 'Bearer ' + token
    return await API.post(
      path,
      {},
      {
        headers: { Authorization: AuthStr },
      }
    ).then((res) => {
      const responseJSON = res.data.data
      const response = JSON.parse(responseJSON)
      commit('setId', response.id)
    })
  },

  async getOrderDetail({ commit }: any, id: any) {
    const path = 'client/order/' + id
    const token = localStorage.getItem('identity')
    const AuthStr = 'Bearer ' + token
    return await API.get(path, {
      headers: { Authorization: AuthStr },
    }).then(async (res) => {
      const responseJSON = res.data.data
      const response = JSON.parse(responseJSON)

      await commit('setOrderDetail', response)
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
