export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, minimum-scale=1.0,maximum-scale=1.0, user-scalable=no'
      },
      // { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
      {
        'http-equiv': 'X-UA-Compatible',
        content: 'IE=EDGE'
      }
    ],
    script: [
      // { src: 'https://cdn.bootcss.com/jquery/3.5.0/jquery.min.js' },
      {
        // src: '//libs.baidu.com/jquery/2.0.0/jquery.min.js'
        src: '/js/jquery.min.js'
      },
      {
        src: '//res.wx.qq.com/open/js/jweixin-1.6.0.js'
      },
      // { src: '//cdn.bootcss.com/bootstrap-slider/10.6.1/bootstrap-slider.min.js' },
      {
        src: '//cdn.bootcdn.net/ajax/libs/bootstrap-slider/10.6.1/bootstrap-slider.min.js'
      },
      // { src: '//pv.sohu.com/cityjson?ie=utf-8' },
      {
        src: '//ll.edefang.net/getIp.php'
      },
      {
        src: '//webapi.amap.com/maps?v=1.4.14&key=729ac4d779c7e625bc11bd5ba3ff3112'
      }
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        href: '//cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css'
      },
      {
        rel: 'stylesheet',
        href: '//at.alicdn.com/t/font_1566358_0x5fpl1pct4s.css'
      },
      // {
      //   rel: 'stylesheet',
      //   href: '//cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css'
      // },
      {
        rel: 'stylesheet',
        href: '//at.alicdn.com/t/font_1416845_qauhw48dee.css'
      },
      {
        rel: 'stylesheet',
        href: '//at.alicdn.com/t/font_1416845_olgiihzyg8c.css'
      },
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#6ACCFF',
    height: '2px'
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{
      src: '~plugins/echarts',
      ssr: false
    },
    {
      src: '~plugins/cookies',
      ssr: false
    },
    {
      src: '~plugins/vant',
      ssr: false
    },
    {
      src: '~plugins/toast',
      ssr: false
    },
    {
      src: '~plugins/map',
      ssr: false
    },
    {
      src: '~plugins/swip',
      ssr: false
    },
    {
      src: '~plugins/axios',
      ssr: true
    },
    {
      src: '~plugins/route',
      ssr: false
    },
    {
      src: '~plugins/lazy',
      ssr: true
    },
    {
      src: '~plugins/sethead',
      ssr: true
    },
    // { src: '~plugins/babel', ssr: true },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@gauseen/nuxt-proxy',
    '@nuxtjs/axios',
  ],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    transpile: [/vant.*?less/],
    extend(config, ctx) {},
    extractCSS: {
      allChunks: true
    },
    vendor: [],
    // analyze: true,
    productionSourceMap: false,
    productionGzip: true,
    productionGzipExtensions: ['js', 'css', 'svg'],
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000
      }
    },
    // analyze: {
    //   analyzerMode: 'static'
    // },
    // transpile: [/^vuetify/]
    babel: {
      presets: [
        ['@babel/preset-env', {
          'modules': false,
          useBuiltIns: 'entry',
          corejs: 3
        }]
      ],
      plugins: ['@babel/plugin-transform-runtime', ['@babel/plugin-proposal-decorators', {
          'legacy': true
        }],
        ['@babel/plugin-proposal-class-properties', {
          'loose': true
        }],
        ['import', {
          libraryName: 'vant',
          "style": (name) => {
            return `${name}/style/less.js`
          }
        }, 'vant']
      ]
    }
  },
  proxyTable: {
    '/api': {
      target: 'http://ll.edefang.net/', // 你请求的第三方接口
      changeOrigin: true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
      pathRewrite: { // 路径重写，
        '^/api': '/api' // 替换target中的请求地址
      }
    },
    '/front': {
      target: 'http://ll.edefang.net/', // 你请求的第三方接口
      changeOrigin: true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
      pathRewrite: { // 路径重写，
        '^/front': '/front' // 替换target中的请求地址
      }
    },
    '/connect': {
      target: 'https://open.weixin.qq.com/', // 你请求的第三方接口
      changeOrigin: true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
      pathRewrite: { // 路径重写，
        '^/connect': '/connect' // 替换target中的请求地址
      }
    },
    '/iptest': {
      target: 'http://39.98.227.114:9550/', // 你请求的第三方接口
      changeOrigin: true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
      pathRewrite: { // 路径重写，
        '^/iptest': '/iptest' // 替换target中的请求地址
      }
    },
    "/question": {
      target: "http://39.98.227.114:9550/", // 重新映射的新地址 
      changeOrigin: true, // 是否跨域
      pathRewrite: {
        "^/question": "/question" // 去掉接口地址中的api字符串
      }
    },
    "/mobile": {
      target: "http://39.98.227.114:9550/", // 重新映射的新地址 
      changeOrigin: true, // 是否跨域
      pathRewrite: {
        "^/mobile": "/mobile" // 去掉接口地址中的api字符串
      }
    },
    "/yun_jia/": {
      target: "http://api.edefang.net/", // 重新映射的新地址 
      changeOrigin: true, // 是否跨域
      pathRewrite: {
        "^/yun_jia": "/yun_jia" // 去掉接口地址中的api字符串
      }
    },
    "/applets": {
      target: "http://api.edefang.net/", // 重新映射的新地址 
      changeOrigin: true, // 是否跨域
      pathRewrite: {
        "^/applets": "/applets" // 去掉接口地址中的api字符串
      }
    },
    "/jy": {
      target: "http://api.edefang.net/", // 重新映射的新地址 
      changeOrigin: true, // 是否跨域
      pathRewrite: {
        "^/jy": "/jy" // 去掉接口地址中的api字符串
      }
    },
    "/yunjia": {
      target: "http://java.edefang.net/", // 重新映射的新地址 
      changeOrigin: true, // 是否跨域
      pathRewrite: {
        "^/yunjia": "/yunjia" // 去掉接口地址中的api字符串
      }
    },
    "/cities": {
      target: "http://java.edefang.net/", // 重新映射的新地址 
      changeOrigin: true, // 是否跨域
      pathRewrite: {
        "^/cities": "/cities" // 去掉接口地址中的api字符串
      }
    },
    "/yun_jia_new": {
      target: "http://39.98.227.114:8989/", // 重新映射的新地址 
      changeOrigin: true, // 是否跨域
      pathRewrite: {
        "^/yun_jia_new": "/yun_jia_new" // 去掉接口地址中的api字符串
      }
    },
  },
  axios: {
    proxy: true // 表示开启代理
  },

  router: {
    scrollBehavior(to, from, savedPosition) {
      // if (savedPosition) {        
      //       return savedPosition    
      // } else {      
      //       if (from.meta.keepAlive) {        
      //            from.meta.savedPosition = document.body.scrollTop;      
      //       }        
      //       return { x: 0, y: to.meta.savedPosition || 0 }    
      // }  
      return {
        x: 0,
        y: 0
      }
    }
  },
  render: {
    resourceHints: false,
  }
}
