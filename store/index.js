import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    ip: '',
    token: '',
    call: '',
    city: '',
    cityname: '',
    num: '',
    pinyin: '',
    cookie: {}
  },
  mutations: {
    setip(state, payload) {
      state.ip = payload.ip
    },
    settoken(state, payload) {
      state.token = payload.token
    },
    setcall(state, payload) {
      state.call = payload.call
    },
    setcity(state, payload) {
      state.city = payload.city
    },
    setcityname(state, payload) {
      state.cityname = payload.cityname
    },
    setnum(state, payload) {
      state.num = payload.num
    },
    setpinyin(state, payload) {
      state.pinyin = payload.pinyin
    },
    setcookie(state, payload) {
      state.cookie = payload.cookie
    },
  },
  actions: {
    nuxtServerInit({
      commit
    }, {
      req
    }) {
      let cookie = req.headers.cookie;
      if (cookie) {
        let cookieArr = cookie.split(";");
        let obj = {}
        cookieArr.forEach((i) => {
          let arr = i.split("=");
          obj[arr[0].trim()] = arr[1];
        });
        commit('setcookie', {
          'cookie': obj
        })
      }
      
    }
  },


})

export default store
