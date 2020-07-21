import API from '../../utils/axios'
const initState = () => {
  return {
    address: null,
  }
}

const getters = {}
const mutations = {
  setAddress(state: any, payload: any) {
    state.address = payload
  },
}

const actions = {
  async getAddress({ commit }: any) {
    const path = 'client/customer/getAddresses'
    const token = localStorage.getItem('identity')
    const AuthStr = 'Bearer ' + token
    return await API.get(path, { headers: { Authorization: AuthStr } }).then(
      (res) => {
        const responseJSON = res.data.data
        const response = JSON.parse(responseJSON)
        commit('setAddress', response)
      }
    )
  },
}

const customerModule = {
  state: initState(),
  getters,
  mutations,
  actions,
}

export default customerModule
