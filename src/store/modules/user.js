import { login, logout, getInfo, getSimple } from '@/api/usuarios'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  userId: 0,
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  oficinaid: 0,
  roles: [],
  simpleList: [{
    id: 0,
    username: ''
  }]
}

const mutations = {
  SET_USERID: (state, id) => {
    state.userId = id
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_OFICINAID: (state, oficinaid) => {
    state.oficinaid = oficinaid
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_SIMPLE: (state, payload) => {
    state.simpleList = payload
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        const { id, accessToken } = data
        commit('SET_USERID', id)
        commit('SET_TOKEN', accessToken)
        setToken(data.accessToken)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.userId).then(response => {
        const { data } = response

        if (!data) {
          reject('Datos Incorrectos, Intente nuevamente.')
        }

        const { roles, name, avatar, introduction, oficinaid } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('Usuario no posee Roles!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        commit('SET_OFICINAID', oficinaid)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_USERID', 0)
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // get userlist without office
  getUserSimpleList({ commit }) {
    return new Promise((resolve, reject) => {
      getSimple().then(response => {
        const { data } = response
        const simple = data.map(u => {
          const properties = {
            'key': u.id,
            'label': u.username
          }
          return properties
        })
        commit('SET_SIMPLE', simple)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      // const token = role + '-token'

      // commit('SET_TOKEN', token)
      // setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
