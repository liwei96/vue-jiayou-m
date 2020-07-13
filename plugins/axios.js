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
      return config
  })
}
