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
    uuid: '',
    hostname: '',
    userid: 0
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
    setuuid(state, id) {
      state.cookie.uuid = id
    },
    setws(state, id) {
      state.ws = id
    },
    setuserid(state, id) {
      state.userid = id
    },
    sethostname(state, type) {
      state.hostname = type
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
      commit('sethostname', req.headers.host)
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
        commit('setuserid',obj.userid)
      }
      let name = req.url.split('/')[1].split('?')[0]
      commit('setpinyin', {
        'pinyin': name
      })
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
        case 'shangrao':
          if (process.server == false) {
            localStorage.setItem('city', 216)
            $cookies.set('city', 216)
          }
          commit('setcity', 216)
          break;
        case 'nanchang':
        if (process.server == false) {
          localStorage.setItem('city', 229)
          $cookies.set('city', 229)
        }
        commit('setcity', 229)
          break;
        case 'langfang':
        if (process.server == false) {
          localStorage.setItem('city', 242)
          $cookies.set('city', 242)
        }
        commit('setcity', 242)
          break;
        case 'nantong':
        if (process.server == false) {
          localStorage.setItem('city', 253)
          $cookies.set('city', 253)
        }
        commit('setcity', 253)
          break;
        case 'yichang':
        if (process.server == false) {
          localStorage.setItem('city', 191)
          $cookies.set('city', 191)
        }
        commit('setcity', 191)
          break;
        case 'qiannan':
        if (process.server == false) {
          localStorage.setItem('city', 129)
          $cookies.set('city', 129)
        }
        commit('setcity', 129)
          break;
        case 'kunming':
        if (process.server == false) {
          localStorage.setItem('city', 291)
          $cookies.set('city', 291)
        }
        commit('setcity', 291)
          break;
        case 'huangshan':
        if (process.server == false) {
          localStorage.setItem('city', 206)
          $cookies.set('city', 206)
        }
        commit('setcity', 206)
        break;
        case 'suzhou':
        if (process.server == false) {
          localStorage.setItem('city', 262)
          $cookies.set('city', 262)
        }
        commit('setcity', 262)
        break;
        case 'shanghai':
        if (process.server == false) {
          localStorage.setItem('city', 273)
          $cookies.set('city', 273)
        }
        commit('setcity', 273)
        break;
        case 'xishuangbanna':
        if (process.server == false) {
          localStorage.setItem('city', 306)
          $cookies.set('city', 306)
        }
        commit('setcity', 306)
        break;
        case 'yangjiang':
        if (process.server == false) {
          localStorage.setItem('city', 310)
          $cookies.set('city', 310)
        }
        commit('setcity', 310)
        break;
        case 'qinzhou':
        if (process.server == false) {
          localStorage.setItem('city', 316)
          $cookies.set('city', 316)
        }
        commit('setcity', 316)
        break;
        case 'huizhou':
        if (process.server == false) {
          localStorage.setItem('city', 321)
          $cookies.set('city', 321)
        }
        commit('setcity', 321)
        break;
        case 'nanning':
        if (process.server == false) {
          localStorage.setItem('city', 327)
          $cookies.set('city', 327)
        }
        commit('setcity', 327)
        break;
        // case 'wenchang':
        // if (process.server == false) {
        //   localStorage.setItem('city', 341)
        //   $cookies.set('city', 341)
        // }
        // commit('setcity', 341)
        // break;
      }
    },
    setuuid(context, data) {
      context.commit('setuuid', data)
    },
    setws(context, data) {
      context.commit('setws', data)
    },
    setuserid(context, data) {
      context.commit('setuserid', data)
    }
  },


})

export default store
