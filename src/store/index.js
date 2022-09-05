import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    common_value: 0,
    MOBIUS_CONNECTION_CONNECTED: false,
    //VUE_APP_MOBIUS_HOST: '125.132.13.63',
    VUE_APP_MOBIUS_HOST: '203.253.128.177',
    VUE_APP_MOBIUS_APPROVAL: 'MUV',
    APPROVAL_LIST: []
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
