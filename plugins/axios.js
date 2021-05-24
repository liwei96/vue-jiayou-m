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
    if(config.method == 'get'){
      config.params.uuid = store.state.cookie.uuid
      config.params.pinyin = store.state.pinyin
    } else {
      if (config.data) {
        config.data.uuid = store.state.cookie.uuid
      } else {
        config.params.uuid = store.state.cookie.uuid
      }
      
    }
      return config
  })
}
