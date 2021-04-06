<template>
  <div id="question_id">
    <div class="h-con">
      <h3>
        <img class="back" src="~/assets/return.png" @click="goback" />
        <img class="logo" src="~/assets/content-logo.png" alt />
        <img src="~/assets/mapcai.png" alt class="cai" @click="taggle" />
        <ul class="cailist" v-if="list">
          <li class="cmn">
            <router-link :to="'/' + jkl">
              <span></span>
              <img src="~/assets/barhome.png" />
              <p>首 页</p>
            </router-link>
          </li>
          <li>
            <router-link :to="'/' + jkl + '/search'">
              <img src="~/assets/barsearch.png" />
              <p>楼盘查询</p>
            </router-link>
          </li>
          <li>
            <router-link :to="'/' + jkl + '/participate'">
              <img src="~/assets/tegother.png" />
              <!-- <img src="~/assets/barsearch.png" /> -->
              <p>平台合作</p>
            </router-link>
          </li>
          <li>
            <router-link :to="'/' + jkl + '/encyclopedia/before/56'">
              <img src="~/assets/barke.png" />
              <p>买房百科</p>
            </router-link>
          </li>
          <li>
            <router-link :to="'/' + jkl + '/realinformations/46'">
              <img src="~/assets/barxun.png" />
              <p>房产资讯</p>
            </router-link>
          </li>
        </ul>
      </h3>
      <div class="all">
        <h4>
          <span>问</span>
          {{ question.question }}
        </h4>
        <div class="pro">
          <router-link :to="`/${jkl}/content/${building.id}`">
            <div class="pro-left">
              <img :src="building.img" alt />
            </div>
            <div class="pro-msg">
              <h5>
                {{ building.name }}
                <span>{{ building.state }}</span>
              </h5>
              <p class="price">
                <span>{{ building.price }}</span>
                <i>元/m²</i>起
              </p>
              <p class="info">
                住宅 | {{ building.city_name }}-{{
                  building.country.substr(0, 2)
                }}
                | {{ building.area }}m²
              </p>
              <p class="type">
                <span class="zhuang">{{ building.decorate }}</span>
                <span
                  class="type-icon"
                  v-for="(item, key) in building.feature"
                  :key="key"
                  >{{ item }}</span
                >
              </p>
            </div>
          </router-link>
        </div>
      </div>
      <div class="line"></div>
      <div class="answer">
        <div class="answer-title" v-if="staff.staff">
          <p class="title-tit">答</p>
          <img :src="staff.staff.head_img" alt />
          <div class="answer-msg">
            <h6>
              {{ staff.staff.name }}
              <span>专业解答</span>
            </h6>
            <p>
              最近咨询
              <span>{{ staff.num }}人</span>
            </p>
          </div>
          <button @click="show">免费咨询</button>
        </div>
        <p class="answer-con">{{ question.answer }}</p>
        <div class="answer-time">
          <span class="time">{{ question.time.substr(0, 10) }}</span>
          <p>
            <img
              :src="question.my_like == 0 ? beforeck : cked"
              alt
              @click="agree($event)"
              :data-v="question.id"
              :data-n="question.like_num"
              data-y="2"
              :type="question.my_like"
            />
            <span>有用({{ question.like_num }})</span>
          </p>
        </div>
      </div>
      <div class="line"></div>
      <div class="other">
        <h5>相关楼盘问答</h5>
        <ul>
          <li v-for="(item, key) in other" :key="key">
            <router-link :to="'/' + jkl + '/questions/' + item.id">
              <span>问</span>
              {{ item.question }}
            </router-link>
          </li>
        </ul>
        <button @click="gomore">查看{{ cityname }}全部楼盘问答</button>
      </div>
    </div>

    <foot-view :pinyin="jkl"></foot-view>

    <transition name="change">
      <div class="weiter ts" v-show="change">
        <div class="t-top">
          <h6>咨询服务</h6>
          <p>立即报名，专业人员为你解惑</p>
          <img id="w-esc" src="~/assets/w-del.png" alt @click="close1" />
        </div>
        <div class="t-bottom">
          <div class="t-b-first">
            <input
              class="l-p"
              type="tel"
              placeholder="输入预约手机号码"
              v-model="baoming"
            />
            <p class="w-mg">
              <input
                class="w-mg-c"
                type="checkbox"
                checked
                v-model="checks"
              />我已阅读并同意
              <router-link :to="'/' + jkl + '/server'">
                <a href="javasript:;">《允家新房用户协议》</a>
              </router-link>
            </p>
            <p class="tishi">请勾选用户协议</p>
            <button class="t-b-btn t-b-btn2 bg_01" id="dingxue" @click="send">
              立即订阅
            </button>
            <p class="w-tit">
              <img src="~/assets/w-call.png" />允家严格保障您的信息安全
            </p>
          </div>
          <div class="t-b-second">
            <p>
              验证码已发送到
              <span id="ytel">187****4376</span>，请注意查看
            </p>
            <input
              type="text"
              placeholder="请输入验证码"
              v-model="ma"
              id="ma-ll"
            />
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
        <img class="o-esc" src="~/assets/m-esc.png" alt @click="close2" />
        <img src="~/assets/m-success.png" alt class="o-success" />
        <p id="o_p">已成功订阅最新动态，我们会第一时间通过短信通知您！</p>
        <button id="o_btn" @click="close2">确定</button>
      </div>
    </transition>
  </div>
</template>
<script>
import {
  question,
  trend_put,
  msg,
  encyclopediaarticle_agree,
  verification,
} from "~/api/api";
import footView from "@/components/Foot.vue";
export default {
  async asyncData(context) {
    try {
      let jkl = context.store.state.cookie.pinyin;
      let id = context.route.params.id;
      let token = context.store.state.cookie.token;
      let kid = context.store.state.cookie.kid
        ? context.store.state.cookie.kid
        : "";
      let other = context.store.state.cookie.other
        ? context.store.state.cookie.other
        : "";
      let [res] = await Promise.all([
        context.$axios
          .get("/applets/question/detail", {
            params: {
              id: id,
              token: token,
              kid: kid,
              other: other,
              platform: 2,
            },
          })
          .then((resp) => {
            let data = resp.data;
            return data;
          }),
      ]);
      return {
        staff: res.common.staff,
        building: res.building,
        question: res.data,
        other: res.relevant,
        jkl: jkl,
        title: res.common.header.title,
        description: res.common.header.description,
        keywords: res.common.header.keywords,
      };
    } catch (err) {
      console.log("errConsole========:", err);
      context.error({ statusCode: 404, message: "页面未找到或无数据" });
    }
  },
  data() {
    return {
      list: false,
      jkl: "",
      staff: {},
      building: {},
      other: [],
      question: {},
      change: false,
      succ: false,
      zhe: false,
      baoming: "",
      ma: "",
      checks: true,
      cityname: "杭州",
      beforeck: require("~/assets/giveup.png"),
      cked: require("~/assets/clicked.png"),
    };
  },
  head() {
    return {
      title: this.title || `${this.question.question}_允家新房`,
      meta: [
        {
          name: "description",
          content: this.description || `${this.question.question}`,
        },
        {
          name: "Keywords",
          content: this.keywords || `${this.question.question}`,
        },
      ],
    };
  },
  components: {
    "foot-view": footView,
  },
  methods: {
    taggle() {
      if (this.list) {
        this.list = false;
      } else {
        this.list = true;
      }
    },
    goback() {
      this.$router.go(-1);
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
      let id = this.building.id;
      let city = this.$store.state.city;
      let kid = sessionStorage.getItem("kid");
      let other = sessionStorage.getItem("other");
      trend_put({
        ip: ip,
        tel: tel,
        position: 51,
        id: id,
        page: 3,
        type: 6,
        kid: kid,
        other: other,
        city: city,
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
      this.change = false;
    },
    close2() {
      this.zhe = false;
      this.change = false;
      this.succ = false;
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
    gomore() {
      this.$router.push(`/${this.jkl}/questions`);
    },
  },
  mounted() {
    this.cityname = localStorage.getItem("cityname");
  },
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
}

.h-con {
  min-height: 100vh;
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
  max-width: 450px;
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
h3 .cai {
  position: absolute;
  width: 1.375rem;
  right: 6%;
  top: 0.75rem;
}
h3 .cailist {
  width: 9.375rem;
  background: rgba(41, 41, 41, 0.9);
  position: absolute;
  top: 3.25rem;
  border-radius: 0.375rem;
  z-index: 20000;
  right: 4%;
}
h3 .cailist li {
  position: relative;

  font-size: 0.9375rem;
  line-height: 3.125rem;
  border: 0;
}
h3 .cailist li a {
  width: 100%;
  display: flex;
  align-items: center;
  color: #e6e6e6;
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
.all {
  padding: 0 4%;
  padding-bottom: 1.25rem;
}
.all h4 {
  margin-top: 4rem;
  color: #2f3133;
  font-size: 1rem;
  line-height: 1.375rem;
  margin-bottom: 1rem;
}
.all h4 span {
  display: inline-block;
  width: 0.9375rem;
  height: 0.9375rem;
  border-radius: 0.3125rem 0px 0.3125rem 0px;
  background-color: #ff7839;
  text-align: center;
  line-height: 0.9375rem;
  font-size: 0.625rem;
  color: #fff;
  margin-right: 0.625rem;
}
.all .pro {
  width: 100%;
  height: 6.5rem;
  box-shadow: 0px 0px 18px 1px rgba(0, 0, 0, 0.03);
  padding: 0.75rem;
}
.all .pro a {
  width: 100%;
  display: flex;
}
.all .pro .pro-left {
  margin-right: 0.75rem;
}
.all .pro .pro-left img {
  width: 6.875rem;
  height: 5rem;
  border-radius: 0.1875rem;
}
.all .pro .pro-msg {
  flex: 1;
}
.all .pro .pro-msg h5 {
  color: #626466;
  font-size: 1rem;
  margin-bottom: 0.125rem;
  font-weight: bold;
}
.all .pro .pro-msg h5 span {
  background-color: #e9f7ea;
  width: 2.25rem;
  height: 1.0625rem;
  text-align: center;
  line-height: 1.0625rem;
  display: block;
  float: right;
  color: #20c657;
  font-size: 0.6875rem;
  border-radius: 0.125rem;
}
.all .pro .pro-msg .price {
  color: #626466;
  font-size: 0.75rem;
  margin-bottom: 0.125rem;
}
.all .pro .pro-msg .price span {
  color: #fe582f;
  font-size: 0.9375rem;
  font-weight: bold;
}
.all .pro .pro-msg .price i {
  color: #fe582f;
  font-style: normal;
}
.all .pro .pro-msg .info {
  color: #626466;
  font-size: 0.75rem;
  margin-bottom: 0.125rem;
}
.all .pro .pro-msg .type span {
  padding: 0.1875rem 0.3125rem;
  border-radius: 0.125rem;
  font-size: 0.75rem;
  color: #626466;
  margin-right: 0.375rem;
}
.all .pro .pro-msg .type .zhuang {
  background-color: #f0f5f9;
  color: #5aabe5;
}
.line {
  width: 100%;
  height: 0.625rem;
  background-color: #f7f7f7;
}
.answer {
  padding: 1.125rem 4% 1rem 4%;
}
.answer .answer-title {
  display: flex;
  align-items: center;
  margin-bottom: 1.25rem;
}
.answer .answer-title .title-tit {
  width: 0.9375rem;
  height: 0.9375rem;
  border-radius: 0.3125rem 0px 0.3125rem 0px;
  background-color: #40a2f4;
  color: #fff;
  font-size: 0.625rem;
  text-align: center;
  line-height: 0.9375rem;
}
.answer .answer-title img {
  width: 2rem;
  margin-left: 0.375rem;
  margin-right: 0.5625rem;
  height: 2rem;
  border-radius: 50%;
}
.answer .answer-title .answer-msg h6 {
  color: #121212;
  font-size: 0.9375rem;
  margin-bottom: 0.25rem;
}
.answer .answer-title .answer-msg h6 span {
  padding: 0.125rem 0.1875rem;
  background-color: #ffc654;
  font-size: 0.625rem;
  color: #fff;
  margin-left: 0.25rem;
  border-radius: 0.125rem;
}
.answer .answer-title .answer-msg p {
  color: #969799;
  font-size: 0.75rem;
}
.answer .answer-title .answer-msg p span {
  color: #ff6a48;
}
.answer .answer-title button {
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
.answer .answer-con {
  width: 100%;
  padding: 0.9375rem;
  border-radius: 0.375rem;
  background-color: #f7f7f7;
  color: #626466;
  font-size: 0.875rem;
  line-height: 1.5625rem;
  margin-bottom: 1.25rem;
}
.answer .answer-time {
  overflow: hidden;
}
.answer .answer-time span.time {
  color: #969799;
  font-size: 0.75rem;
  float: left;
}
.answer .answer-time p {
  float: right;
  color: #969799;
  font-size: 0.6875rem;
  line-height: 1.0625rem;
}
.answer .answer-time p img {
  width: 1rem;
  margin-bottom: 0.25rem;
  margin-right: 0.15rem;
}
.other {
  padding: 1.125rem 4% 1.5625rem 4%;
}
.other h5 {
  color: #101214;
  font-size: 1.0625rem;
  margin-bottom: 1.375rem;
}
.other ul li {
  margin-bottom: 1.5rem;
  color: #2f3133;
  font-size: 0.9375rem;
  line-height: 1.375rem;
}
.other ul li a {
  color: #2f3133;
}
.other ul li span {
  width: 0.9375rem;
  height: 0.9375rem;
  text-align: center;
  line-height: 0.9375rem;
  background: linear-gradient(
    90deg,
    rgba(255, 133, 60, 1),
    rgba(255, 67, 47, 1)
  );
  color: #fff;
  font-size: 0.625rem;
  display: inline-block;
  border-radius: 0.3125rem 0px 0.3125rem 0px;
  margin-right: 0.375rem;
  margin-bottom: 0.125rem;
}
.other button {
  background-color: #ebf3fa;
  height: 2.25rem;
  width: 100%;
  border-radius: 0.125rem;
  text-align: center;
  line-height: 2.25rem;
  border: 0;
  color: #40a2f4;
  font-size: 0.9375rem;
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