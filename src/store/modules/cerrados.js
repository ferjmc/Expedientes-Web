import { getCerrados } from '@/api/cerrados'

const state = {
  cerrados: [{
    id: 0,
    numero: 0,
    expediente: '',
    fecha: '',
    estado: '',
    folios: 0,
    oficina: 0,
    codigo: 0,
    organismo: '',
    extracto: ''
  }],
  totalElements: 0
}

const mutations = {
  SET_CERRADOS: (state, payload) => {
    state.cerrados = payload
  },
  SET_TOTAL: (state, total) => {
    state.totalElements = total
  }
}

const actions = {
  fetchCerrados({ commit }, query) {
    return new Promise((resolve, reject) => {
      getCerrados(query).then(response => {
        const { content, totalElements } = response.data
        commit('SET_CERRADOS', content)
        commit('SET_TOTAL', totalElements)
        resolve(content)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
