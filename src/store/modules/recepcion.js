import { getDerivados } from '@/api/recepcion'

const state = {
  derivados: [{
    id: 0,
    numero: 0,
    expediente: '',
    fecha: '',
    estado: '',
    folios: 0,
    oficina: 0,
    codigo: 0,
    organismo: '',
    observaciones: ''
  }],
  totalElements: 0
}

const mutations = {
  SET_DERIVADOS: (state, payload) => {
    state.derivados = payload
  },
  SET_TOTAL: (state, total) => {
    state.totalElements = total
  }
}

const actions = {
  fetchDerivados({ commit }, query) {
    return new Promise((resolve, reject) => {
      getDerivados(query).then(response => {
        const { content, totalElements } = response.data
        commit('SET_DERIVADOS', content)
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
