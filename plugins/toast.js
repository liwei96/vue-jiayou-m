import Vue from 'vue'
import toast from '@/components/toast.vue'
// 创建组件构造器
const toastHonor = Vue.extend(toast);

let toasts = function (msg = '', callback, timeout = 1500) {
  let LoadingTip = Vue.extend(toast)
  LoadingTip.msg = msg
  console.log(msg)
  // 2、创建实例，挂载到文档以后的地方
  let tpl = new LoadingTip({
    data: {
      msg: msg
    }
  }).$mount().$el
  // 3、把创建的实例添加到body中
  document.body.appendChild(tpl);

  setTimeout(function () {
    document.body.removeChild(tpl);
    callback && callback();
  }, timeout);
}
Vue.prototype.toast = toasts
