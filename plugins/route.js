import axios from 'axios'
export default ({
  app,
  store
}) => {
  app.router.beforeEach((to, from, next) => {
    // console.log(to.params, from.params)
    // console.log(to.path)'
    // to.path = to.path+'?uuid='+store.state.cookie.uuid
    // to.params.uuid = store.state.cookie.uuid
    // console.log(to.path)
    if(process.server == false){
      if (!$cookies.get("uuid")) {
        var timestamp = Date.parse(new Date());
        var $chars =
          "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678"; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        var maxPos = $chars.length;
        var pwd = "";
        let i = 0;
        for (i = 0; i < 12; i++) {
          pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        timestamp = pwd + timestamp;
        $cookies.set("uuid", timestamp);
      }
    }
    switch (to.params.name) {
      case 'xuzhou':
        if (process.server == false) {
          localStorage.setItem('city', 112)
          $cookies.set('city', 112)
        }
        store.state.city = 112
        break;
      case 'hangzhou':
        if (process.server == false) {
          localStorage.setItem('city', 1)
          $cookies.set('city', 1)
        }
        store.state.city = 1
        break;
      case 'ningbo':
        if (process.server == false) {
          localStorage.setItem('city', 36)
          $cookies.set('city', 36)
        }
        store.state.city = 36
        break;
      case 'huzhou':
        if (process.server == false) {
          localStorage.setItem('city', 104)
          $cookies.set('city', 104)
        }
        store.state.city = 104
        break;
      case 'jiaxing':
        if (process.server == false) {
          localStorage.setItem('city', 38)
          $cookies.set('city', 38)
        }
        store.state.city = 38
        break;
      case 'shaoxing':
        if (process.server == false) {
          localStorage.setItem('city', 73)
          $cookies.set('city', 73)
        }
        store.state.city = 73
        break;
      case 'zhanjiang':
        if (process.server == false) {
          localStorage.setItem('city', 93)
          $cookies.set('city', 93)
        }
        store.state.city = 93
        break;
      case 'chongqing':
        if (process.server == false) {
          localStorage.setItem('city', 41)
          $cookies.set('city', 41)
        }
        store.state.city = 41
        break;
      case 'chengdu':
        if (process.server == false) {
          localStorage.setItem('city', 47)
          $cookies.set('city', 47)
        }
        store.state.city = 47
        break;
      case 'guiyang':
        if (process.server == false) {
          localStorage.setItem('city', 3)
          $cookies.set('city', 3)
        }
        store.state.city = 3
        break;
      case 'qiannan':
        if (process.server == false) {
          localStorage.setItem('city', 129)
          $cookies.set('city', 129)
        }
        store.state.city = 129
        break;
      case 'wuxi':
        if (process.server == false) {
          localStorage.setItem('city', 149)
          $cookies.set('city', 149)
        }
        store.state.city = 149
        break;
    }
    if(to.path.indexOf('content') !==-1){
      if (to.params.id == undefined || to.params.id == null || to.params.id == 'null' || to.params.id == 'undefined') {
        next({
          path:'/hangzhou'
        })
      }
    }
      if(to.params.id == '6440' || to.params.id =='4520') {
        next({
          path:'/hangzhou'
        })
      }
    
    // if(to.params.id > 3100){
    //   next({
    //     path:'/hangzhou'
    //   })
    // }

    let toQuery = JSON.parse(JSON.stringify(to.query));
    toQuery.uuid = store.state.cookie.uuid;
    console.log(toQuery)
    next()
  })
}
