export default function ({
  store,
  redirect,
  app: {
    $axios
  }
}) {
  // 数据访问前缀
  // $axios.defaults.baseURL = 'http://ll.edefang.net/'

  $axios.onRequest(config => {
    if (config.url == '/front/flow/sign') {
      let kid = sessionStorage.getItem('kid')
      let other = sessionStorage.getItem('other')
      config.data.kid = kid
      config.data.other = other
      config.data.sign = $cookies.get('validate.jy8006.com')
    }
    if (config.url == '/front/flow/send') {
      config.data.sign = $cookies.get('validate.jy8006.com')
    }
    let id = store.state.city;
    config.data.city = id
    return config
  })

}
