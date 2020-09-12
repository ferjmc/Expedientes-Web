import { fetchList, getOrg, setOrg, getOpt } from '@/api/organizacion'

const state = {
  organizaciones: [{
    id: 1,
    codigo: 1,
    nombre: '',
    children: [],
    createdAt: '',
    createdBy: 1,
    updatedAt: '',
    updatedBy: 1
  }],
  organizacion: {
    id: undefined,
    nombre: '',
    codigo: '',
    parentid: undefined,
    parentcodigo: '',
    parentnombre: ''
  },
  options: {
    id: undefined,
    codigo: undefined,
    nombre: ''
  }
}

const mutations = {
  SET_ORGANIZACIONES: (state, organizaciones) => {
    state.organizaciones = organizaciones
  },
  SET_ORG: (state, org) => {
    state.organizacion = org
  },
  SET_OPTIONS: (state, payload) => {
    state.options = payload
  }
}

const actions = {
  getOrganizaciones({ commit }) {
    return new Promise((resolve, reject) => {
      fetchList().then(response => {
        commit('SET_ORGANIZACIONES', response.data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getOrganizacion({ commit }, id) {
    return new Promise((resolve, reject) => {
      getOrg(id).then(response => {
        commit('SET_ORG', response.data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateOrganizacion({ commit }, payload) {
    return new Promise((resolve, reject) => {
      setOrg(payload).then(response => {
        commit('SET_ORG', response.data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getOptions({ commit }) {
    return new Promise((resolve, reject) => {
      getOpt().then(response => {
        commit('SET_OPTIONS', response.data)
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
