// src/api/api.js
import axios from 'axios'

// 允许跨域携带cookie
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  // 处理请求之前的配置
  if (config.url == '/front/flow/sure') {
    if (localStorage.getItem('token')) {
      let tel = config.data.phone
      localStorage.setItem('phone', tel)
      tel = tel.substr(0, 3) + '****' + tel.substr(8, 11)
      localStorage.setItem('tel', tel)
    }
  }
  if (config.method == 'get') {
    console.log(config)
    config.params.uuid = $cookies.get('uuid')
  } else {
    if (config.data) {
      config.data.uuid = $cookies.get('uuid')
    } else {
      config.params.uuid = $cookies.get('uuid')
    }
  }
  if (process.server == false && config.method == 'post') {
    let kid = $cookies.get('kid') ? $cookies.get('kid') : ''
    let other = $cookies.get('other') ? $cookies.get('other') : ''
    if (config.data) {
      config.data.kid = kid
      config.data.other = other
      config.data.platform = 2
    }
  }
  if (process.server == false && config.method == 'get') {
    let kid = $cookies.get('kid') ? $cookies.get('kid') : ''
    let other = $cookies.get('other') ? $cookies.get('other') : ''
    config.params.kid = kid
    config.params.other = other
    config.params.platform = 2
  }

  if (config.url == '/front/flow/sign') {
    config.data.sign = $cookies.get('validate.jy8006.com')
    if (sessionStorage.getItem('ip')) {
      config.data.ip = sessionStorage.getItem('ip')
    }
    // if(sessionStorage.getItem('wxstaff')){
    //   config.data.source = '微信分享2'
    //   config.data.staff_id = sessionStorage.getItem('wxstaff')
    // }
  }
  if (config.url == '/front/flow/send') {
    config.data.sign = $cookies.get('validate.jy8006.com')
  }
  return config
}, function (error) {
  // 请求失败的处理
  return Promise.reject(error)
})
axios.interceptors.response.use(function (response) {
  // 处理响应数据
  if (response.data.code == 200 && response.config.url == '/front/flow/sure') {
    localStorage.setItem('token', response.data.token)
  }
  return response
}, function (error) {
  // 处理响应失败
  return Promise.reject(error)
})
export const index_start = (msg) => {
  return axios.request({
    method: 'post',
    url: '/api/first/index_mobile',
    data: msg
  })
}

export const top_start = (msg) => {
  return axios.request({
    method: 'post',
    url: '/api/first/feature_second_mobile',
    data: msg
  })
}

export const top_sure = (msg) => {
  return axios.request({
    method: 'post',
    url: '/front/flow/sign',
    data: msg
  })
}

export const address_start = (msg) => {
  return axios.request({
    method: 'post',
    url: '/api/first/city',
    data: msg
  })
}

export const trend_start = (msg) => {
  return axios.request({
    method: 'post',
    url: '/api/price/trends',
    data: msg
  })
}

export const dynamic_start = (msg) => {
  return axios.request({
    method: 'post',
    url: '/api/project/dynamic',
    data: msg
  })
}

export const dd = (msg) => {
  return axios.request({
    method: 'post',
    url: 'http://xxxxx.xxx/api/disassemble',
    data: {
      funName
    }
  })

}

export const ip = () => {
  return axios.request({
    method: 'get',
    url: '/8aQDcjqpAAV3otqbppnN2DJv/api.php?query=ip地址&co=&resource_id=6006&t=1512612231044&ie=utf8&oe=gbk&format=json&tn=baidu'
  })
}

export const dynamic = (msg) => {
  return axios.request({
    method: 'post',
    url: '/api/project/dynamic',
    data: msg
  })
}

export const newdynamic = (msg) => {
  return axios.request({
    method: 'get',
    url: '/yun_jia/dynamic/phone/info',
    params: msg
  })
}

export const search_start = (msg) => {
  return axios.request({
    method: 'post',
    url: '/api/project/search',
    data: msg
  })
}

export const search_search = (msg) => {
  return axios.request({
    method: 'post',
    url: '/api/project/search_info',
    data: msg
  })
}

export const help_data = (msg) => {
  return axios.request({
    method: 'post',
    url: '/api/project/help_me',
    data: msg
  })
}

export const help_put = (msg) => {
  return axios.request({
    method: 'post',
    url: '/front/flow/sign',
    data: msg
  })
}


export const msg = (msg) => {
  return axios.request({
    method: 'post',
    url: '/front/flow/send',
    data: msg
  })
}

export const login = (msg) => {
  return axios.request({
    method: 'post',
    url: '/front/flow/login_sure',
    data: msg
  })
}

export const verification = (msg) => {
  return axios.request({
    method: 'post',
    url: '/front/flow/sure',
    data: msg
  })
}

export const trend_put = (msg) => {
  return axios.request({
    method: 'post',
    url: '/front/flow/sign',
    data: msg
  })
}

export const analysis_data = (msg) => {
  return axios.request({
    method: 'post',
    url: '/api/project/analysis',
    data: msg
  })
}

export const content_data = (msg) => {
  return axios.request({
    method: 'post',
    url: '/api/project/detail',
    data: msg
  })
}

export const sou_data = (msg) => {
  return axios.request({
    method: 'post',
    url: '/api/project/quick_search',
    data: msg
  })
}

export const analysis_put = (msg) => {
  return axios.request({
    method: 'post',
    url: '/front/flow/sign',
    data: msg
  })
}


export const morehus_put = (msg) => {
  return axios.request({
    method: 'post',
    url: '/front/flow/sign',
    data: msg
  })
}

export const morehus_data = (msg) => {
  return axios.request({
    method: 'post',
    url: '/api/project/apartments',
    data: msg
  })
}

export const album_data = (msg) => {
  return axios.request({
    method: 'post',
    url: '/api/project/imgs',
    data: msg
  })
}


export const comment_put = (msg) => {
  return axios.request({
    method: 'post',
    url: '/api/project/comment',
    data: msg
  })
}

export const encyclopediaarticle_data = (msg) => {
  return axios.request({
    method: 'post',
    url: '/api/article/detail',
    data: msg
  })
}

export const count_data = (msg) => {
  return axios.request({
    method: 'post',
    url: '/api/mortgage/initial_data',
    data: msg
  })
}

export const periphery_data = (msg) => {
  return axios.request({
    method: 'post',
    url: '/api/project/peripheral_plan',
    data: msg
  })
}

export const encyclopediaarticle_agree = (msg) => {
  return axios.request({
    method: 'post',
    url: '/api/article/like',
    data: msg
  })
}


export const comments_data = (msg) => {
  return axios.request({
    method: 'post',
    url: '/api/project/comment_info',
    data: msg
  })
}


export const comment_del = (msg) => {
  return axios.request({
    method: 'post',
    url: '/api/project/comment_delete',
    data: msg
  })
}


export const collection = (msg) => {
  return axios.request({
    method: 'post',
    url: '/api/user/collect',
    data: msg
  })
}


export const PK = (msg) => {
  return axios.request({
    method: 'post',
    url: '/api/project/compare_mobile',
    data: msg
  })
}


export const leave = (msg) => {
  return axios.request({
    method: 'post',
    url: '/front/flow/sign',
    data: msg
  })
}



export const yuyue = (msg) => {
  return axios.request({
    method: 'post',
    url: '/front/flow/sign',
    data: msg
  })
}


export const foot_data = (msg) => {
  return axios.request({
    method: 'post',
    url: '/api/project/my_foot',
    data: msg
  })
}


export const collect_data = (msg) => {
  return axios.request({
    method: 'post',
    url: '/api/project/my_collects',
    data: msg
  })
}



export const hu_detail = (msg) => {
  return axios.request({
    method: 'post',
    url: '/api/project/apartment',
    data: msg
  })
}


export const question_data = (msg) => {
  return axios.request({
    method: 'post',
    url: '/api/project/question_info',
    data: msg
  })
}


export const countdetail_data = (msg) => {
  return axios.request({
    method: 'post',
    url: '/api/mortgage/calculate',
    data: msg
  })
}


export const realInformations_start = (msg) => {
  return axios.request({
    method: 'post',
    url: '/api/article/info',
    data: msg
  })
}


export const realInformations_data = (msg) => {
  return axios.request({
    method: 'post',
    url: '/api/article/page',
    data: msg
  })
}


export const encyclopedia_data = (msg) => {
  return axios.request({
    method: 'post',
    url: '/api/article/page',
    data: msg
  })
}


export const sou = (msg) => {
  return axios.request({
    method: 'post',
    url: '/api/project/project_names',
    data: msg
  })
}


export const addbuild = (msg) => {
  return axios.request({
    method: 'post',
    url: '/api/project/project_names',
    data: msg
  })
}

export const addbuilds = (msg) => {
  return axios.request({
    method: 'post',
    url: '/api/project/pk_recommand',
    data: msg
  })
}

export const mapSearch = (msg) => {
  return axios.request({
    method: 'post',
    url: '/api/map/area',
    data: msg
  })
}

export const mapProject = (msg) => {
  return axios.request({
    method: 'post',
    url: '/api/map/detail',
    data: msg
  })
}

export const commentBack = (msg) => {
  return axios.request({
    method: 'post',
    url: '/api/project/comment_reply',
    data: msg
  })
}


export const jiameng = (msg) => {
  return axios.request({
    method: 'post',
    url: '/api/map/cooperate',
    data: msg
  })
}


export const tuanmsg = (msg) => {
  return axios.request({
    method: 'post',
    url: '/front/flow/sign',
    data: msg
  })
}


export const tuandata = (msg) => {
  return axios.request({
    method: 'post',
    url: '/api/group_buy/info',
    data: msg
  })
}

export const getsdk = (msg) => {
  return axios.request({
    method: 'post',
    url: '/api/weichat/get_sign_package',
    data: {
      url: msg
    }
  })
}

export const getsid = () => {
  return axios.request({
    method: 'get',
    url: '/front/user/getcode',
    params: {
      url: '/front/user/get_user_info',
      slient: 1
    }
  })
}

export const putmap = (msg) => {
  return axios.request({
    method: 'post',
    url: '/front/share/click_time',
    data: msg
  })
}


export const getiptest = () => {
  return axios.request({
    method: 'get',
    url: '/iptest',
  })
}

export const getquestions = (msg) => {
  return axios.request({
    method: 'get',
    url: '/question/page',
    params: msg
  })
}

export const souari = (name) => {
  return axios.request({
    method: 'get',
    url: '/api/article/e_search',
    params: name
  })
}

export const newgetquestions = (msg) => {
  return axios.request({
    method: 'get',
    url: '/yun_jia/question/phone/list',
    params: msg
  })
}

export const aritles = (msg) => {
  return axios.request({
    method: 'get',
    url: '/jy/article/info',
    params: msg
  })
}

export const question = (msg) => {
  return axios.request({
    method: 'get',
    url: '/mobile/question/detail',
    params: msg
  })
}

export const souname = (name, k, city) => {
  return axios.request({
    method: 'get',
    url: '/api/project/e_search',
    params: {
      'name': name,
      page: k,
      limit: 10,
      city: city
    }
  })
}

export const hengda = (msg) => {
  return axios.request({
    method: 'get',
    url: '/api/custom/identity',
    params: msg
  })
}

export const put = (name) => {
  return axios.request({
    method: 'post',
    url: '/front/flow/sign',
    data: name
  })
}
export const send = (name) => {
  return axios.request({
    method: 'post',
    url: '/front/flow/send',
    data: name
  })
}
export const check = (name) => {
  return axios.request({
    method: 'post',
    url: '/front/flow/sure',
    data: name
  })
}
export const temore = (name) => {
  return axios.request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'post',
    url: '/yunjia/area/buidlings',
    params: name
  })
}