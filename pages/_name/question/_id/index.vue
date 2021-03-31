<template>
  <div class="Question">
    <h3>
      <img class="back" src="~/assets/return.png" @click="goback" />
      <img class="logo" src="~/assets/content-logo.png" alt />
      <img src="~/assets/mapcai.png" alt class="cai" @click="taggle" />
      <ul class="cailist" v-if="list">
        <li class="cmn">
          <router-link :to="'/'+jkl">
            <span></span>
            <img src="~/assets/barhome.png" />
            <p>首 页</p>
          </router-link>
        </li>
        <li>
          <router-link :to="'/'+jkl+'/search'">
            <img src="~/assets/barsearch.png" />
            <p>楼盘查询</p>
          </router-link>
        </li>
        <li>
          <router-link :to="'/'+jkl+'/participate'">
            <img src="~/assets/tegother.png" />
            <!-- <img src="~/assets/barsearch.png" /> -->
            <p>平台合作</p>
          </router-link>
        </li>
        <li>
          <router-link :to="'/'+jkl+'/encyclopedia/before/56'">
            <img src="~/assets/barke.png" />
            <p>买房百科</p>
          </router-link>
        </li>
        <li>
          <router-link :to="'/'+jkl+'/realinformations/46'">
            <img src="~/assets/barxun.png" />
            <p>房产资讯</p>
          </router-link>
        </li>
      </ul>
    </h3>
    <ul>
      <li v-for="(item,key) in lists" :key="key">
        <h4>
          <router-link :to="`/${jkl}/questions/${item.id}`">
          <u>
            <span>问</span>
            {{item.question}}
          </u>
          </router-link>
        </h4>
        <div class="answer-peo">
          <p class="peo-title">答</p>
          <img :src="item.staff.head_img" alt />
          <div class="peo-msg">
            <h6>
              {{item.staff.name}}
              <span>专业解答</span>
            </h6>
            <p>
              最近咨询
              <span>{{item.staff.ServeNum}}人</span>
            </p>
          </div>
          <button @click="show">免费咨询</button>
        </div>
        <div class="answer">
          <router-link :to="`/${jkl}/questions/${item.id}`">
          <p>
            {{item.answer.substr(0,42)}}
            <i v-if="item.answer.length>42">...</i>
          </p>
          </router-link>
          <span v-if="item.answer.length>42" @click="go(item.id)">[全文]</span>
        </div>
        <!-- <div class="answer">
          <span>答</span>
          <p>{{item.answer}}</p>
        </div>-->
      </li>
    </ul>
    <div class="bottom">
      <button id="btn">我要提问</button>
    </div>
    <foot-view :pinyin="jkl"></foot-view>
    <!-- 弹框 -->
    <transition name="change">
      <div class="weiter ts" v-show="change">
        <div class="t-top">
          <h6>变价通知</h6>
          <p>一键预约看房免费小车上门接送，可带家人一起参观多个热门楼盘</p>
          <img id="w-esc" src="~/assets/w-del.png" alt @click="close1"/>
        </div>
        <div class="t-bottom">
          <div class="t-b-first">
            <input class="l-p" type="tel" placeholder="输入预约手机号码" v-model="baoming" />
            <p class="w-mg">
              <input class="w-mg-c" type="checkbox" checked v-model="checks" />我已阅读并同意
              <router-link :to="'/'+jkl+'/server'">
                <a href="javasript:;">《允家新房用户协议》</a>
              </router-link>
            </p>
            <p class="tishi">请勾选用户协议</p>
            <button class="t-b-btn t-b-btn2 bg_01" id="dingxue" @click="send">立即订阅</button>
            <p class="w-tit">
              <img src="~/assets/w-call.png" />允家严格保障您的信息安全
            </p>
          </div>
          <div class="t-b-second">
            <p>
              验证码已发送到
              <span id="ytel">187****4376</span>，请注意查看
            </p>
            <input type="text" placeholder="请输入验证码" v-model="ma" id="ma-ll" />
            <button class="port1" @click="yan">确定</button>
            <input type="hidden" id="building_name" value />
            <input type="hidden" value />
            <button class="t-b-scode">获取验证码</button>
          </div>
        </div>
      </div>
    </transition>

    <div class="m-chang" v-if="zhe" @click="closeall"></div>

    <transition name="fade">
      <div class="m-o-succ" v-show="succ">
        <img class="o-esc" src="~/assets/m-esc.png" alt @click="close2"/>
        <img src="~/assets/m-success.png" alt class="o-success" />
        <p id="o_p">已成功订阅最新动态，我们会第一时间通过短信通知您！</p>
        <button id="o_btn" @click="close2">确定</button>
      </div>
    </transition>
  </div>
</template>
<script>
import footView from "@/components/Foot.vue";
import {
  ip,
  question_data,
  encyclopediaarticle_agree,
  getquestions,
  trend_put,
  msg,
  verification,
} from "~/api/api";
export default {
  name: "Question",
  async asyncData(context) {
    let ip = context.store.state.cookie.ip;
    let id = context.route.params.id;
    let city = context.store.state.cookie.city;
    let token = context.store.state.cookie.token;
    let jkl = context.store.state.cookie.pinyin;
    let kid = context.store.state.cookie.kid ? context.store.state.cookie.kid : ''
    let other = context.store.state.cookie.other ? context.store.state.cookie.other : ''
    let [res] = await Promise.all([
      context.$axios
        .get("/yun_jia/question/phone/list", {
          params: {
            page: 1,
            limit: 10,
            project:id,
            kid:kid,
            other:other,
            platform:2
          },
        })
        .then((resp) => {
          let data = resp.data;
          return data;
        }),
    ]);
    return {
      lists: res.data,
      jkl: jkl,
      title: res.common.header.title,
      description: res.common.header.description,
      keywords: res.common.header.keywords,
    };
  },
  components: {
    "foot-view": footView,
  },
  data() {
    return {
      lists: [],
      ip: "",
      id: "",
      n: "",
      page: 2,
      isok: true,
      jkl: "",
      title: "",
      description: "",
      keywords: "",
      list: false,
      baoming: "",
      checks: true,
      succ: false,
      change: false,
      zhe: false,
      ma: "",
    };
  },
  head() {
    return {
      title: this.title || "允家新房-楼盘问答",
      meta: [
        {
          name: "description",
          content: this.description || "允家新房",
        },
        {
          name: "Keywords",
          content: this.keywords || "允家新房",
        },
      ],
    };
  },
  methods: {
    start() {
      let ip = ip_arr["ip"];
      // let ip = returnCitySN["cip"];
      this.ip = ip;
      localStorage.getItem("ip");
    },
    agree(e) {
      // console.log(e.target)
      let img = require("~/assets/clicked.png");
      let id = e.target.getAttribute("data-v");
      let ip = this.ip;
      let token = localStorage.getItem("token");
      let that = this;
      let num = e.target.getAttribute("data-n");
      encyclopediaarticle_agree({
        ip: ip,
        id: id,
        platform: 2,
        token: token,
        type: 1,
      })
        .then((resp) => {
          if (resp.data.code == 500) {
            that.$router.push("/" + that.pinyin + "/login");
            // window.location.href = "/login";
          } else {
            let type = e.target.getAttribute("type");
            let click = require("~/assets/noclick.png");
            if (type == 0) {
              num = parseInt(num) + 1;
              e.target.setAttribute("data-n", num);
              e.target.setAttribute("type", 1);
              e.target.setAttribute("src", img);
              e.target.nextElementSibling.innerHTML = `有用(${num})`;
            } else {
              num = parseInt(num) - 1;
              e.target.setAttribute("data-n", num);
              e.target.setAttribute("type", 0);
              e.target.setAttribute("src", click);
              e.target.nextElementSibling.innerHTML = `有用(${num})`;
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    agrees(e) {
      // console.log(e.target)
      let img = require("~/assets/clicked.png");
      let id = e.target.getAttribute("data-v");
      let ip = this.ip;
      let token = localStorage.getItem("token");
      let that = this;
      let num = e.target.getAttribute("data-n");
      encyclopediaarticle_agree({
        ip: ip,
        id: id,
        platform: 2,
        token: token,
        type: 1,
      })
        .then((resp) => {
          if (resp.data.code == 500) {
            that.$router.push("/" + that.pinyin + "/login");
            // window.location.href = "/login";
          } else {
            let type = e.target.getAttribute("type");
            let click = require("~/assets/noclick.png");
            if (type == 0) {
              num = parseInt(num) + 1;
              e.target.setAttribute("data-n", num);
              e.target.setAttribute("type", 1);
              e.target.previousElementSibling.setAttribute("src", img);
              e.target.innerHTML = `有用(${num})`;
            } else {
              num = parseInt(num) - 1;
              e.target.setAttribute("data-n", num);
              e.target.setAttribute("type", 0);
              e.target.previousElementSibling.setAttribute("src", click);
              e.target.innerHTML = `有用(${num})`;
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    goback() {
      this.$router.go(-1);
    },
    getmore() {
      if (this.isok) {
        this.isok = false;
        let that = this;
        let ip = ip_arr["ip"];
        // let ip = returnCitySN["cip"];
        this.ip = ip;
        localStorage.getItem("ip");
        let token = localStorage.getItem("token");
        let city = localStorage.getItem("city");
        let id = this.$route.params.id
        getquestions({
          page: that.page,
          limit: 10,
          project:id
        })
          .then((resp) => {
            let l = resp.data.data;
            that.lists = that.lists.concat(l);
            that.page += 1;
            that.isok = true;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    scroll() {
      var scrollTop = window.scrollY;
      var scrollHeight = window.screen.availHeight;
      var windowHeight = document.body.scrollHeight;
      if (scrollTop + scrollHeight >= windowHeight) {
        this.getmore();
      }
    },
    taggle() {
      if (this.list) {
        this.list = false;
      } else {
        this.list = true;
      }
    },
    send() {
      let that = this;
      let check = that.checks;
      if (!check) {
        $(".tishi").show();
        return;
      } else {
        $(".tishi").hide();
      }

      var tel = this.baoming;
      var pattern_phone = /^1[3-9][0-9]{9}$/;
      if (tel == "") {
        $(".l-p").attr("placeholder", "手机号不能为空");
        return;
      } else if (!pattern_phone.test(tel)) {
        $(".l-p").val("");
        $(".l-p").attr("placeholder", "手机号码不合法");
        return;
      }
      let ip = this.ip;
      let data = { channel: 2, phone: tel, ip: ip };
      this.tel = tel;
      let city = this.$store.state.city;
      let kid = sessionStorage.getItem("kid");
      let other = sessionStorage.getItem("other");
      let id = this.$route.params.id
      trend_put({
        ip: ip,
        tel: tel,
        project:id,
        position: 51,
        page: 3,
        type: 6,
        kid: kid,
        other: other,
        city:city
      })
        .then((resp) => {
          if (resp.data.code == 200) {
            msg(data)
              .then((resp) => {
                let code = resp.data.code;
                if (code == 200) {
                  $(".t-b-first").hide();
                  $(".t-b-second").show();
                  var time = 60;
                  var phone = tel.substr(0, 3) + "****" + tel.substr(7, 11);
                  var fn = function () {
                    time--;
                    if (time > 0) {
                      $(".t-b-scode").html("重新发送" + time + "s");
                      $(".t-b-scode").attr("disabled", true);
                    } else {
                      clearInterval(interval);
                      $(".t-b-scode").html("获取验证码");
                      $(".t-b-scode").attr("disabled", false);
                    }
                  };
                  fn();
                  var interval = setInterval(fn, 1000);
                  $("#ytel").html(phone);
                }
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            this.$toast("请不要重复报名");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    yan() {
      let e = this.ma;
      if (!e) {
        $("#ma-ll").attr("placeholder", "验证码不能为空");
        return;
      }
      let tel = this.baoming;
      let that = this;
      verification({ phone: tel, code: e, channel: 2 })
        .then((resp) => {
          if (resp.data.code == 200) {
            $(".t-b-first").show();
            $(".t-b-second").hide();
            that.change = false;
            that.succ = true;
          } else {
            $("#ma-ll").val("");
            $("#ma-ll").attr("placeholder", "验证码不正确");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    show() {
      this.zhe = true;
      this.change = true;
    },
    closeall() {
      $(".t-b-first").show();
      $(".t-b-second").hide();
      this.zhe = false;
      this.change = false;
      this.succ = false;
    },
    close1() {
      $(".t-b-first").show();
      $(".t-b-second").hide();
      this.zhe = false;
      this.change = false
    },
    close2() {
      this.zhe = false;
      this.change = false;
      this.succ = false
    },
    go(id){
      let pin =  this.jkl
      this.$router.push(`/${pin}/questions/${id}`)
    }
  },
  mounted() {
    this.start();
    let that = this;
    $("#btn").on("click", function () {
      let kk = localStorage.getItem("pinyin");
      let token = localStorage.getItem("token");
      if (token) {
        that.$router.push("/" + kk + "/leavequestions");
        // window.location.href = "/leavequestion/" + that.id;
      } else {
        that.$router.push("/" + kk + "/login");
        // window.location.href = "/login";
      }
    });
    window.addEventListener("scroll", this.scroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scroll);
  },
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
}
body {
  padding-bottom: 10px;
}
li {
  list-style: none;
}
h3 {
  color: #333333;
  text-align: center;
  height: 44px;
  line-height: 44px;
  font-weight: bold;
  -webkit-box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.05);
  font-size: 16px;
  position: fixed;
  background-color: #fff;
  width: 100%;
  top: 0;
  z-index: 2;
}
h3 .back {
  position: absolute;
  width: 5%;
  margin-top: 14px;
  left: 5.33%;
}
h3 .logo {
  width: 2.875rem;
}
ul {
  padding: 0 4%;
  margin-bottom: 80px;
  margin-top: 44px;
}
ul li {
  border-bottom: 0.5px solid #f3f5fb;
}
ul li h4 {
  
  font-size: 0.9375rem;
  margin-bottom: 20px;
  padding-top: 20px;
  line-height: 1.375rem;
}
ul li h4 a {
  color: #2f3133;
}
ul li h4 span {
  width: 16px;
  height: 16px;
  border-radius: 5px 0 5px 0;
  background-color: #ff7839;
  text-align: center;
  line-height: 16px;
  color: #fff;
  font-size: 12px;
  margin-right: 12px;
  float: left;
}
ul li h4 u {
  width: 100%;
  display: inline-block;
  text-decoration: none;
}
ul li .answer-peo {
  margin-bottom: 1.125rem;
  display: flex;
  align-items: center;
}
ul li .answer-peo .peo-title {
  width: 1rem;
  height: 1rem;
  border-radius: 5px 0 5px 0;
  background-color: #40a2f4;
  text-align: center;
  line-height: 1rem;
  color: #fff;
  font-size: 0.75rem;
  margin-right: 12px;
}
ul li .answer-peo img {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin-left: 0.375rem;
  margin-right: 0.5625rem;
}
ul li .answer-peo .peo-msg h6 {
  color: #121212;
  font-size: 0.9375rem;
  margin-bottom: 0.25rem;
}
ul li .answer-peo .peo-msg h6 span {
  color: #fff;
  font-size: 0.625rem;
  background-color: #ffc654;
  text-align: center;
  line-height: 0.875rem;
  display: inline-block;
  height: 0.875rem;
  margin-left: 0.1875rem;
  border-radius: 0.125rem;
}
ul li .answer-peo .peo-msg p {
  color: #969799;
  font-size: 0.75rem;
}
ul li .answer-peo .peo-msg p span {
  color: #ff6a48;
}
ul li .answer-peo button {
  width: 4.375rem;
  height: 1.625rem;
  border-radius: 0.8125rem;
  text-align: center;
  line-height: 1.625rem;
  color: #fff;
  font-size: 0.75rem;
  background-color: #40a2f4;
  border: 0;
  margin-left: auto;
}

ul li .answer {
  margin-bottom: 1.25rem;
  width: 100%;
  background-color: #f7f7f7;
  padding: 0.9375rem;
  position: relative;
}
ul li .answer p {
  color: #626466;
  font-size: 0.875rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
ul li .answer span {
  color: #628bb9;
  font-size: 0.875rem;
  position: absolute;
  right: 0.5rem;
  bottom: 0.9375rem;
}

#btn {
  width: 92%;
  margin-left: 4%;
  background-color: #ebf3fa;
  text-align: center;
  line-height: 40px;
  height: 40px;
  border-radius: 4px;
  color: #40a2f4;
  font-size: 16px;
  border: 0;
  margin-bottom: 20px;
  font-weight: bold;
}
.bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding-top: 20px;
  background-color: #fff;
}
h3 .cai {
  float: right;
  width: 1.375rem;
  margin-right: 6%;
  margin-top: 0.75rem;
}
h3 .cailist {
  width: 9.375rem;
  background: rgba(41, 41, 41, 0.9);
  position: absolute;
  top: 0;
  border-radius: 0.375rem;
  z-index: 20000;
  right: 4%;
}
h3 .cailist li {
  position: relative;
  color: #e6e6e6;
  font-size: 0.9375rem;
  line-height: 3.125rem;
  border: 0;
}
h3 .cailist li a {
  width: 100%;
  display: flex;
  color: #e6e6e6;
  align-items: center;
}
h3 .cailist li.cmn span {
  display: block;
  border: 0.4375rem solid transparent;
  border-bottom-color: rgba(41, 41, 41, 0.9);
  position: absolute;
  top: -0.875rem;
  right: 0.625rem;
}
h3 .cailist li p {
  border-bottom: 0.5px solid #545454;
  flex: 1;
}
h3 .cailist li img {
  width: 1.125rem;
  margin: 0;
  margin-left: 0.8rem;
  margin-right: 0.875rem;
  height: 1.125rem;
}
.weiter {
  width: 80%;
  position: fixed;
  left: 10%;
  top: 220px;
  border-radius: 12px;
  z-index: 1001;
}

.weiter .t-top {
  width: 100%;
  height: 100px;
  background-color: #fff;
  border-radius: 12px 12px 0 0;
  padding-top: 30px;
}

.weiter .t-top h6 {
  color: #3a3c49;
  font-size: 20px;
  text-align: center;
  margin-bottom: 14px;
  font-weight: bold;
}

.weiter .t-top p {
  color: #787980;
  font-size: 15px;
  margin: 0 18px;
}

.weiter .t-top #w-esc {
  position: absolute;
  right: 5%;
  top: 5%;
  width: 16px;
}

.weiter .t-bottom {
  width: 100%;
  height: 228px;
  background-color: #fff;
  border-radius: 0 0 12px 12px;
}

.weiter .t-bottom .t-b-first {
  height: 100%;
  display: block;
}
.weiter .t-bottom .t-b-first .w-tit {
  color: #a8a8ab;
  font-size: 12px;
  padding-left: 7%;
  padding-top: 8px;
}
.weiter .t-bottom .t-b-first .w-tit img {
  width: 5%;
  margin-right: 2%;
  margin-bottom: 2px;
}

.weiter .t-bottom .t-b-first .w-mg {
  font-size: 11px;
}
.weiter .t-bottom .t-b-first .w-mg a {
  color: #498de1;
}

.weiter .t-bottom .t-b-first input {
  width: 85%;
  height: 44px;
  border: 1px solid #c6c6cc;
  margin-top: 38px;
  margin-bottom: 5.5px;
  margin-left: 7.52%;
  padding-left: 5%;
  font-size: 15px;
  border-radius: 6px;
}

.weiter .t-bottom .t-b-first .w-mg-c {
  width: 10px;
  height: 10px;
  margin: 0;
  margin-left: 7.5%;
  margin-bottom: 29px;
  background-color: #fff;
  border: 1px solid #c9c9c9;
  border-radius: 2px;
  -webkit-appearance: none;
  padding: 0;
  float: left;
  margin-top: 3px;
  margin-right: 4px;
}

.weiter .t-bottom .t-b-first .w-mg-c:checked {
  background: url(~assets/checkbox_icon.png) no-repeat center;
  background-size: 90%;
}

.weiter .t-bottom .t-b-first button {
  width: 85%;
  height: 44px;
  border: 0;
  border-radius: 6px;
  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
  margin-left: 7.5%;
  box-shadow: 0px 2.5px 6px 0px rgba(78, 169, 255, 0.3);
}

.weiter .t-bottom .t-b-first .bg_01 {
  background: linear-gradient(
    270deg,
    rgba(102, 207, 255, 1),
    rgba(76, 181, 255, 1)
  );
}

.weiter .t-bottom .t-b-first .bg_02 {
  background: linear-gradient(
    270deg,
    rgba(102, 207, 255, 1),
    rgba(76, 181, 255, 1)
  );
}

.weiter .t-bottom .t-b-second {
  height: 100%;
  display: none;
  padding-top: 20px;
}

.weiter .t-bottom .t-b-second p {
  margin-top: 20px;
  color: #808080;
  font-size: 12px;
  width: 85%;
  margin-left: 7.5%;
  margin-bottom: 10px;
}

.weiter .t-bottom .t-b-second input {
  width: 85%;
  height: 40px;
  border-radius: 2px;
  border: 1px solid #c6c6cc;
  margin-left: 7.5%;
  margin-bottom: 20px;
  padding-left: 4%;
  border-radius: 6px;
}

.weiter .t-bottom .t-b-second .port1 {
  width: 85%;
  height: 44px;
  margin-left: 7.5%;
  background: linear-gradient(
    270deg,
    rgba(102, 207, 255, 1),
    rgba(76, 181, 255, 1)
  );
  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
  border: 0;
  margin-bottom: 20px;
  border-radius: 1px;
  border-radius: 6px;
  margin-top: 20px;
}

.weiter .t-bottom .t-b-second .t-b-scode {
  border: 0;
  color: #40a2f4;
  font-size: 13px;
  position: absolute;
  right: 10%;
  top: 55%;
  background-color: #fff;
}

.tishi {
  color: red;
  font-size: 10px;
  display: none;
}

.m-o-succ {
  position: fixed;
  top: 190px;
  left: 50%;
  margin-left: -37.33333%;
  width: 74.666667%;
  background-color: #fff;
  z-index: 10001;
  padding: 0 5%;
  border-radius: 12px;
  height: 325px;
  text-align: center;
}

.m-o-succ .o-esc {
  position: absolute;
  width: 8.6%;
  top: 3.1%;
  right: 3.5%;
}

.m-o-succ .o-success {
  width: 41%;
  margin-top: 45px;
  margin-bottom: 33px;
}

.m-o-succ p {
  color: #666666;
  font-size: 16px;
  line-height: 23px;
  font-weight: 500;
  margin-bottom: 32px;
}

.m-o-succ button {
  width: 100%;
  height: 40px;
  background: linear-gradient(
    270deg,
    rgba(102, 207, 255, 1),
    rgba(76, 181, 255, 1)
  );
  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
  border: 0px;
  border-radius: 4px;
}

.m-chang {
  position: fixed;
  top: 0;
  width: 100%;
  height: 1000px;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
}
</style>