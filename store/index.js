import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    ip: '',
    IP: '',
    token: '',
    call: '',
    city: '',
    cityname: '',
    num: '',
    pinyin: '',
    cookie: {},
    proid: '',
    uuid: ''
  },
  mutations: {
    setip(state, data) {
      state.ip = data.ip
    },
    setIP(state, data) {
      state.IP = data.IP
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
    setuuid(state,id){
      state.cookie.uuid = id
    }
  },
  actions: {
    async nuxtServerInit({
      commit
    }, {
      req,
      app
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
      let name=req.url.split('/')[1]
      switch (name) {
        case 'xuzhou':
          if (process.server == false) {
            localStorage.setItem('city', 112)
            $cookies.set('city', 112)
          }
          commit('setcity', 112)
          break;
        case 'hangzhou':
          if (process.server == false) {
            localStorage.setItem('city', 1)
            $cookies.set('city', 1)
          }
          commit('setcity', 1)
          break;
        case 'ningbo':
          if (process.server == false) {
            localStorage.setItem('city', 36)
            $cookies.set('city', 36)
          }
          commit('setcity', 36)
          break;
        case 'huzhou':
          if (process.server == false) {
            localStorage.setItem('city', 104)
            $cookies.set('city', 104)
          }
          commit('setcity', 104)
          break;
        case 'jiaxing':
          if (process.server == false) {
            localStorage.setItem('city', 38)
            $cookies.set('city', 38)
          }
          commit('setcity', 38)
          break;
        case 'shaoxing':
          if (process.server == false) {
            localStorage.setItem('city', 73)
            $cookies.set('city', 73)
          }
          commit('setcity', 73)
          break;
        case 'zhanjiang':
          if (process.server == false) {
            localStorage.setItem('city', 93)
            $cookies.set('city', 93)
          }
          commit('setcity', 93)
          break;
        case 'chongqing':
          if (process.server == false) {
            localStorage.setItem('city', 41)
            $cookies.set('city', 41)
          }
          commit('setcity', 41)
          break;
        case 'chengdu':
          if (process.server == false) {
            localStorage.setItem('city', 47)
            $cookies.set('city', 47)
          }
          commit('setcity', 47)
          break;
        case 'guiyang':
          if (process.server == false) {
            localStorage.setItem('city', 3)
            $cookies.set('city', 3)
          }
          commit('setcity', 3)
          break;
        case 'qiannan':
          if (process.server == false) {
            localStorage.setItem('city', 129)
            $cookies.set('city', 129)
          }
          commit('setcity', 129)
          break;
        case 'wuxi':
          if (process.server == false) {
            localStorage.setItem('city', 149)
            $cookies.set('city', 149)
          }
          commit('setcity', 149)
          break;
        case 'zhaoqing':
          if (process.server == false) {
            localStorage.setItem('city', 181)
            $cookies.set('city', 181)
          }
          commit('setcity', 181)
          break;
      }
    },
    setuuid(context, data){
      context.commit('setuuid', data)
    }
  },


})

export default store
