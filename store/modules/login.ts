import API from '../../utils/axios'
const initState = () => {
  return {
    token: null,
    user: null,
  }
}
const getters = {
  getUserInfo(state: any, getters: any): any {
    return state.user
  },
}
const mutations = {
  setToken(state: any, payload: any) {
    state.token = payload
  },
  setUser(state: any, payload: any) {
    state.user = payload
  },
}
const actions = {
  async signUserIn({ commit, dispatch, store }: any, payload: any) {
    const data = {
      username: payload.name,
      password: payload.password,
    }
    return await API.post('client/authentication', data).then(async (res) => {
      const responseJSON = res.data.data
      const response = JSON.parse(responseJSON)
      const token = response.authorizedToken
      commit('setToken', token)
      localStorage.setItem('identity', token)
      if (localStorage.getItem('cart')) {
        const path = 'client/cart/get'
        const token = localStorage.getItem('identity')
        const AuthStr = 'Bearer ' + token
        await API.get(path, { headers: { Authorization: AuthStr } }).then(
          (res) => {
            const responseJSON = res.data.data
            const response = JSON.parse(responseJSON)
            const cartToSync = response
            let cart = JSON.parse(localStorage.getItem('cart') || '[]')
            for (let item of cartToSync) {
              let obj = cart.find(
                (x: any) =>
                  x.stockId === item.stockId && x.shoesId === item.shoesId
              )
              if (obj) obj.quantity += 1
              else
                cart.push({
                  shoesId: item.shoesId,
                  stockId: item.stockId,
                  quantity: 1,
                })
              localStorage.setItem('cart', JSON.stringify(cart))
            }
          }
        )
        dispatch('syncCart')
      }
    })
  },
  logout({ commit }: any) {
    localStorage.removeItem('identity')
    commit('setToken', null)
  },
  async getUserInfo({ commit }: any) {
    const path = 'client/customer/getInfo'
    const token = localStorage.getItem('identity')
    const AuthStr = 'Bearer ' + token
    return await API.get(path, { headers: { Authorization: AuthStr } }).then(
      (res) => {
        const responseJSON = res.data.data
        const response = JSON.parse(responseJSON)
        commit('setUser', response)
      }
    )
  },
  async registerUser({ commit }: any, payload: any) {
    const data = {
      username: payload.userName,
      password: payload.password,
      name: payload.name,
      dateOfBirth: payload.dateOfBirth,
      email: payload.email,
      phoneNumber: payload.phoneNumber,
      gender: payload.gender,
    }

    return API.post('/client/customer/register', data).then((res) => {
      const responseJSON = res.data.data
      const response = JSON.parse(responseJSON)
      const token = response.authorizedToken
      commit('setToken', token)
      localStorage.setItem('identity', token)
    })
  },
}

const loginModule = {
  state: initState(),
  getters,
  mutations,
  actions,
}

export default loginModule
