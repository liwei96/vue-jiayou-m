import Vue from 'vue'
import VueLazyLoad from 'vue-lazyload'
import dd from '~/assets/default.jpg'
Vue.use(VueLazyLoad,{
    error: dd,
   loading:dd
})