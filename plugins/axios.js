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
    // console.log(store.state.cookie.uuid)
    if(config.method == 'get'){
      config.params.uuid = store.state.cookie.uuid
    }else{
      config.data.uuid = store.state.cookie.uuid
    }
      return config
  })
}
