import API from '../../utils/axios'
const initState = () => {
  return {
    token: null,
  }
}
const getters = {}
const mutations = {
  setToken(state: any, payload: any) {
    state.token = payload
  },
}
const actions = {
  async signUserIn({ commit }: any, payload: any) {
    const data = {
      username: payload.name,
      password: payload.password,
    }
    return API.post('/admin/auth/login', data).then((res) => {
      console.log(res.data.token)
      const token = res.data.token
      commit('setToken', token)
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
