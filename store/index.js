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
      state.city = payload
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
      switch (req.url) {
        case 'xuzhou':
          if (process.server == false) {
            localStorage.setItem('city', 112)
            $cookies.set('city', 112)
          }
           commit('setcity',112)
          break;
        case 'hangzhou':
          if (process.server == false) {
            localStorage.setItem('city', 1)
            $cookies.set('city', 1)
          }
          commit('setcity',112)
          break;
        case 'ningbo':
          if (process.server == false) {
            localStorage.setItem('city', 36)
            $cookies.set('city', 36)
          }
          commit('setcity',112)
          break;
        case 'huzhou':
          if (process.server == false) {
            localStorage.setItem('city', 104)
            $cookies.set('city', 104)
          }
          commit('setcity',112)
          break;
        case 'jiaxing':
          if (process.server == false) {
            localStorage.setItem('city', 39)
            $cookies.set('city', 39)
          }
          commit('setcity',112)
          break;
        case 'shaoxing':
          if (process.server == false) {
            localStorage.setItem('city', 73)
            $cookies.set('city', 73)
          }
          commit('setcity',112)
          break;
        case 'zhanjiang':
          if (process.server == false) {
            localStorage.setItem('city', 93)
            $cookies.set('city', 93)
          }
          commit('setcity',112)
          break;
        case 'chongqing':
          if (process.server == false) {
            localStorage.setItem('city', 41)
            $cookies.set('city', 41)
          }
          commit('setcity',112)
          break;
        case 'chengdu':
          if (process.server == false) {
            localStorage.setItem('city', 47)
            $cookies.set('city', 47)
          }
          commit('setcity',112)
          break;
        case 'guiyang':
          if (process.server == false) {
            localStorage.setItem('city', 3)
            $cookies.set('city', 3)
          }
          commit('setcity',112)
          break;
      }
    }
  },


})

export default store
