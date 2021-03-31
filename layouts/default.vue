<template>
  <div id="bigbox">
    <!-- <head-view :pinyin="n"></head-view> -->
    <nuxt />
  </div>
</template>

<script>
import axios from "axios";
import headView from "@/components/Header.vue";
export default {
  components: {
    "head-view": headView,
  },
  // beforeCreate() {
  //   if (process.client) {
  //     window.onresize = () => {
  //       if (process.client && document.body.clientWidth > 450) {
  //         window.location.href = "http://www.jy8006.com";
  //       }
  //     };
  //     if (process.client && document.body.clientWidth > 450) {
  //       window.location.href = "http://www.jy8006.com";
  //     }
  //   }
  // },
  mounted() {
    let url = window.location.href;
    url = url.split("?")[1];
    if (url && url.indexOf("kid") == -1) {
    }
    if (
      !localStorage.getItem("uuid") ||
      localStorage.getItem("uuid").length != 25
    ) {
      if (this.$route.query.uuid) {
        $cookies.set("uuid", this.$route.query.uuid);
        this.$store.dispatch("setuuid", this.$route.query.uuid);
        localStorage.setItem("uuid", this.$route.query.uuid);
      }
    } else {
      let uuid = localStorage.getItem("uuid");
      if (uuid.length == 25) {
        $cookies.set("uuid", uuid);
        this.$store.dispatch("setuuid", uuid);
      }
    }

    //百度统计
    var _hmt = _hmt || [];
    (function () {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?ae7b8b5cafd465396d73f240cbef1973";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
    resetrem();
    //切换屏幕 （横屏竖屏）
    window.addEventListener("orientationchange", resetrem);
    //resize：屏幕的大小发生改变就触发监听事件resetrem
    window.addEventListener("resize", resetrem);

    function resetrem() {
      var html = document.querySelector("html"); //获取到html元素
      var width = html.getBoundingClientRect().width; //获取屏幕的宽度
      html.style.fontSize = width / 23.5 + "px";
    }
    axios.interceptors.request.use(
      function (config) {
        if (config.url == "/front/flow/sign") {
          let kid = sessionStorage.getItem("kid");
          let other = sessionStorage.getItem("other");
          config.data.kid = kid;
          config.data.other = other;
          config.data.sign = $cookies.get("validate.jy8006.com");
        }
        if (config.url == "/front/flow/send") {
          config.data.sign = $cookies.get("validate.jy8006.com");
        }
        return config;
      },
      function (error) {}
    );
    this.n = $cookies.get("pinyin");
    (function () {
      var bp = document.createElement("script");
      var curProtocol = window.location.protocol.split(":")[0];
      if (curProtocol === "https") {
        bp.src = "https://zz.bdstatic.com/linksubmit/push.js";
      } else {
        bp.src = "http://push.zhanzhang.baidu.com/push.js";
      }
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(bp, s);
    })();
//     (function(){
// var src = "https://jspassport.ssl.qhimg.com/11.0.1.js?d182b3f28525f2db83acfaaf6e696dba";
// document.write('<script src="' + src + '" id="sozz"><\/script>');
// })();
  },
};
</script>

<style>
a:active {
  font-weight: normal !important;
  text-decoration: none !important;
}
#bigbox {
  position: relative;
  max-width: 450px;
}
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  max-width: 450px;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body.position-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

@keyframes big-in {
  0% {
    transform: scale(0.7);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes big-out {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.5);
  }
}

.change-enter,
.change-leave-active {
  opacity: 0;
  scale: 0.5;
}
.change-enter-active {
  transition: opacity 0.5s;
  animation: big-in 0.5s;
}
.change-leave-active {
  transition: opacity 0.5s;
  animation: big-out 0.5s;
}

a:link {
  text-decoration: none;
} /* 指正常的未被访问过的链接*/

a:visited {
  text-decoration: none;
} /*指已经访问过的链接*/

a:hover {
  text-decoration: none;
} /*指鼠标在链接*/

a:active {
  text-decoration: none;
} /* 指正在点的链接*/
</style>
