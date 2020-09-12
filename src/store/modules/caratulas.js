import { getCaratulas, getPdfCaratula } from '@/api/caratulas'

const state = {
  caratulas: [{
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
  totalElements: 0,
  currentCaratula: {
    id: 0,
    codigo: 0,
    expediente: '',
    estado: '',
    fecha: '',
    folios: 0,
    numero: 0,
    oficina: '',
    oficinaid: 0,
    organismo: ''
  }
}

const mutations = {
  SET_CARATULAS: (state, payload) => {
    state.caratulas = payload
  },
  SET_TOTAL: (state, total) => {
    state.totalElements = total
  },
  SET_CURRENT: (state, caratula) => {
    state.currentCaratula = caratula
  }
}

const actions = {
  fetchCaratulas({ commit }, query) {
    return new Promise((resolve, reject) => {
      getCaratulas(query).then(response => {
        const { content, totalElements } = response.data
        commit('SET_CARATULAS', content)
        commit('SET_TOTAL', totalElements)
        resolve(content)
      }).catch(error => {
        reject(error)
      })
    })
  },
  setCurrentCaratula({ commit, state }, payload) {
    commit('SET_CURRENT', payload)
    commit('SET_TOTAL', state.totalElements + 1)
  },
  printCurrentCaratula({ state }) {
    return new Promise((resolve, reject) => {
      console.log('envio de parametro a /pdf:')
      console.log(state.currentCaratula)
      getPdfCaratula(state.currentCaratula).then(response => {
        const blob = new Blob([response.data], { type: 'application/pdf' })
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = 'Results.pdf'
        link.click()
        resolve()
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
