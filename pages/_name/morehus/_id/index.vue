<template>
  <div class="MoreHus">
    <h3>
      <img class="back" src="~/assets/return.png" @click="goback" />更多户型
      <img src="~/assets/top-house.png" alt class="home" @click="gohome" />
    </h3>
    <div class="hus">
      <ul>
        <li v-for="(item,key) in lists" :key="key">
          <router-link :to="'/'+jkl+'/HuAnalysis/'+item.id+'/'+id">
            <img :src="item.img" :alt="name+'户型图'" :title="name+'户型图'" />
            <div class="h-right">
              <h5>
                {{item.house}}
                <span class="now">{{item.status}}</span>
                <span class="price">{{item.price}}万起</span>
              </h5>
              <p>特点：{{item.special}}</p>
              <p>类型：{{item.type}}</p>
              <p>户型分析：{{item.analysis}}</p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="m-botnav">
      <p id="m_shou">
        <img id="fork" src="~/assets/forks.png" alt :data-v="id" @click="collect($event)" />
        <img id="forked" src="~/assets/heart.gif" />收藏
      </p>
      <a :href="'tel:'+call">
        <button class="m-pho">
          <p class="ph1">
            <img src="~/assets/phicon.png" alt />电话咨询
          </p>
        </button>
      </a>
      <button class="m-y p1" data-v="预约看房">
        <p class="ph1">
          <img src="~/assets/promsg.png" />预约看房
        </p>
      </button>
    </div>
    <foot-view :pinyin="jkl"></foot-view>
    <!-- 弹框 -->
    <transition name="change">
      <div class="weiter ts" v-show="change">
        <div class="t-top">
          <h6>预约看房</h6>
          <p>一键预约看房免费小车上门接送，可带家人一起参观多个热门楼盘</p>
          <img id="w-esc" src="~/assets/w-del.png" alt />
        </div>
        <div class="t-bottom">
          <div class="t-b-first">
            <input class="l-p" type="tel" placeholder="输入预约手机号码" v-model="tel" />
            <p class="w-mg">
              <input class="w-mg-c" type="checkbox" checked v-model="checks" />我已阅读并同意
              <router-link :to="'/'+jkl+'/server'">
                <a href="javasript:;">《允家新房用户协议》</a>
              </router-link>
            </p>
            <p class="tishi">请勾选用户协议</p>
            <button class="t-b-btn t-b-btn2 bg_01" id="dingxue">立即订阅</button>
            <p class="w-tit">
              <img src="~/assets/w-call.png" />允家严格保障您的信息安全
            </p>
          </div>
          <div class="t-b-second">
            <p>
              验证码已发送到
              <span id="ytel">187****4376</span>，请注意查看
            </p>
            <input type="text" placeholder="请输入验证码" id="ma-ll" />
            <button class="port1">确定</button>
            <input type="hidden" id="building_name" value />
            <input type="hidden" value />
            <button class="t-b-scode">获取验证码</button>
          </div>
        </div>
      </div>
    </transition>

    <div class="m-chang"></div>
    <transition name="fade">
      <div class="m-o-succ" v-show="succ">
        <img class="o-esc" src="~/assets/m-esc.png" alt />
        <img src="~/assets/m-success.png" alt class="o-success" />
        <p id="o_p">已成功订阅最新动态，我们会第一时间通过短信通知您！</p>
        <button id="o_btn">确定</button>
      </div>
    </transition>
    <transition name="change">
      <div class="hengda" v-show="ishengda">
        <img class="del" src="~/assets/w-del.png" alt @click="guanbi" />
        <img src="~/assets/hengda.png" alt class="topimg" />
        <input type="text" placeholder="输入身份证号后6位" maxlength="6" v-model="IDcode" />
        <p class="zhu">注: 根据本楼盘售楼处规定，实地看房需先提前报备 身份证后6位</p>
        <button @click="hengda">申请报备</button>
      </div>
    </transition>
    <div class="tsmsg" v-show="tstype">{{tsmsg}}</div>
  </div>
</template>
<script>
import footView from "@/components/Foot.vue";
import {
  ip,
  msg,
  verification,
  morehus_put,
  morehus_data,
  collection,
  hengda
} from "~/api/api";
export default {
  name: "MoreHus",
  async asyncData(context) {
    let ip = context.store.state.cookie.ip;
    let city = context.store.state.cookie.city;
    let name = context.store.state.cookie.cityname;
    name = decodeURIComponent(name);
    let token = context.store.state.cookie.token;
    let jkl = context.store.state.cookie.pinyin;
    let id = context.params.id;
    let kid = context.store.state.cookie.kid
      ? context.store.state.cookie.kid
      : "";
    let other = context.store.state.cookie.other
      ? context.store.state.cookie.other
      : "";
    let [res] = await Promise.all([
      context.$axios
        .post("/api/project/apartments", {
          id: id,
          platform: 2,
          ip: ip,
          kid: kid,
          other: other,
        })
        .then((resp) => {
          let data = resp.data;
          data.check = true;
          return data;
        }),
    ]);
    return {
      lists: res.data,
      checks: res.check,
      jkl: jkl,
      name: res.detail.name,
      title: res.head.title,
      description: res.head.description,
      keywords: res.head.keywords,
      city: name,
      call: res.head.phone,
    };
  },
  components: {
    "foot-view": footView,
  },
  data() {
    return {
      tstype:false,
      tsmsg:'',
      ishengda:false,
      IDcode:'',
      jkl: "",
      change: false,
      succ: false,
      defaultHeight: "0",
      nowHeight: "0",
      lists: [
        {
          img: require("~/assets/hu.png"),
          content: "",
          area: "",
          price: "",
          feature: "",
          analysis: "",
          sale_status: "",
        },
      ],
      ip: "",
      id: "",
      tel: "",
      n: "",
      call: "",
      checks: "",
      title: "",
      description: "",
      keywords: "",
      name: "",
      city: "",
    };
  },
  head() {
    return {
      title:
        this.title ||
        `${this.city}${this.name}户型图_${this.city}${this.name}效果图_允家新房`,
      meta: [
        {
          name: "description",
          content:
            this.description ||
            `允家新房提供${this.city}${this.name}户型图、效果图、户型有哪些?我们为您提供全套图片，让您轻松了解${this.name}布局结构。`,
        },
        {
          name: "Keywords",
          content: this.keywords || `${this.city}${this.name}户型图`,
        },
      ],
    };
  },
  methods: {
    start() {
      let id = this.$route.params.id;
      this.n = this.$route.params.name;
      this.id = id;
      let that = this;
      let col = localStorage.getItem(id);
      if (col == 0) {
        $("#fork").show();
        $("#forked").hide();
      } else if (col == 1) {
        $("#fork").hide();
        $("#forked").show();
      }
      let ip = ip_arr["ip"];
      // let ip = returnCitySN["cip"];
      this.ip = ip;
      localStorage.getItem("ip");
    },
    gohome() {
      let id = this.$route.params.id;
      let name = this.$route.params.name;
      this.$router.push(`/${name}/content/${id}`);
    },
    send(sends) {
      this.tel = sends;
      let that = this;
      let phone = this.tel;
      let id = this.id;
      let country = localStorage.getItem("city");
      let ip = this.ip;
      let kid = sessionStorage.getItem("kid");
      let other = sessionStorage.getItem("other");
      morehus_put({
        tel: phone,
        project: id,
        type: 10,
        position: 5,
        page: 3,
        city: country,
        ip: ip,
        kid: kid,
        other: other,
      })
        .then((resp) => {
          if (resp.data.code == 200) {
            msg({ phone: sends, channel: 2 })
              .then((resp) => {
                if (resp.data.code == 200) {
                  $(".t-b-first").hide();
                  $(".t-b-second").show();
                  var time = 60;
                  var tel = sends.substr(0, 3) + "****" + sends.substr(7, 11);
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
                  $("#ytel").html(tel);
                } else {
                  $(".l-p").val("");
                  $(".l-p").attr("placeholder", "报名失败");
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
    put() {},
    check(checks) {
      let that = this;
      let t = this.tel;
      verification({ phone: t, code: checks, channel: 2 })
        .then((resp) => {
          if (resp.data.code == 200) {
            if(that.name.indexOf('恒大') !==-1){
              that.ishengda = true
            }else{
              that.succ = true;
            }
            that.change = false;
          } else {
            $("#ma-ll").val("");
            $("#ma-ll").attr("placeholder", "验证码不正确");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    guanbi() {
      $(".t-b-first").show();
      $(".t-b-second").hide();
      $('.m-chang').hide();
      $('.hengda').hide();
    },
    hengda() {
      let tel = this.tel
      let that = this
      if (that.IDcode == "") {
        this.tsmsg = "请输入身份证后六位";
        this.tstype = true;
        setTimeout(() => {
          that.tstype = false;
        }, 1000);
      } else {
        hengda({ identity: that.IDcode, phone: tel }).then((res) => {
          if (res.data.code == 200) {
            that.tsmsg = res.data.message;
            that.tstype = true;
            setTimeout(() => {
              that.tstype = false;
              that.ishengda = false;
              that.guanbi()
            }, 1000);
          }
        });
      }
    },
    collect(e) {
      let id = e.target.getAttribute("data-v");
      let token = localStorage.getItem("token");
      collection({ project: id, token: token })
        .then((resp) => {
          if (resp.data.code == 200) {
            $("#fork").hide();
            $("#forked").css("display", "block");
          }
        })
        .then((error) => {
          console.log(error);
        });
    },
    goback() {
      this.$router.go(-1);
    },
  },
  mounted() {
    sessionStorage.setItem("proname", this.name);
    this.city = localStorage.getItem("cityname");
    let h = $(".MoreHus").height();
    if (h < 700) {
      $("#Foot").css({
        position: "fixed",
        bottom: "0",
        width: "100%",
        marginBottom: "56px",
      });
    } else if (h >= 700) {
      $("#Foot").css({
        position: "relative",
        bottom: "0",
        width: "100%",
        marginBottom: "56px",
      });
    }
    let that = this;
    that.tel = localStorage.getItem("phone");
    this.start();
    $(".p1").on("click", function () {
      $(".m-chang").show();
      that.change = true;
    });
    $(".m-chang").on("click", function () {
      $(".m-chang").hide();
      that.succ = false;
      that.change = false;
    });
    // 接口验证码
    $(".t-b-btn2").on("click", function () {
      let check = that.checks;
      if (!check) {
        $(".tishi").show();
        return;
      } else {
        $(".tishi").hide();
      }
      var phone = $(this).prev().prev().prev().val();
      var type = $(this).parent().parent().prev().find("h6").html();
      var building_name = $(this).parent().next().find("#building_name").val();
      var pattern_phone = /^1[3-9][0-9]{9}$/;
      if (phone == "") {
        $(".l-p").attr("placeholder", "手机号不能为空");
        return;
      } else if (!pattern_phone.test(phone)) {
        $(".l-p").val("");
        $(".l-p").attr("placeholder", "手机号码不合法");
        return;
      }
      that.send(phone);
    });
    $(".port1").on("click", function () {
      var ma = $(this).prev().val();
      if (!ma) {
        $(this).prev().attr("placeholder", "验证码不能为空");
        return;
      }
      that.check(ma);
    });
    $("#o_btn").on("click", function () {
      that.succ = false;
      $(".m-chang").hide();
    });
    $(".o-esc").on("click", function () {
      that.succ = false;
      $(".m-chang").hide();
    });
    $("#w-esc").on("click", function () {
      that.change = false;
      $(".m-chang").hide();
    });
    //获取默认高度
    this.defaultHeight = $(window).height();
    window.onresize = () => {
      return (() => {
        this.nowHeight = $(window).height();
      })();
    };
  },
  watch: {
    nowHeight: function () {
      if (this.defaultHeight != this.nowHeight) {
        $(".weiter").css("top", "100px");
        $("#nav-list").css("top", "42%");
      } else {
        $(".weiter").css("top", "220px");
        $("#nav-list").css("top", "21%");
      }
    },
  },
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
}
li {
  list-style: none;
}
.tishi {
  color: red;
  font-size: 10px;
  display: none;
}
h3 {
  color: #333333;
  text-align: center;
  height: 44px;
  line-height: 44px;
  font-weight: bold;
  border-bottom: 1px solid #f2f2f2;
  position: relative;
  font-size: 16px;
}
h3 .back {
  position: absolute;
  width: 5%;
  margin-top: 14px;
  left: 5.33%;
}

h3 .home {
  position: absolute;
  width: 5%;
  margin-top: 14px;
  right: 5.33%;
}
.hus {
  padding: 0 4%;
}
.hus ul {
  padding-bottom: 70px;
}
.hus ul li {
  padding: 14px 0;
  border-bottom: 0.5px solid #f2f4f7;
}
.hus ul li:last-of-type {
  border-bottom: 0;
}
.hus ul li::after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.hus ul li img {
  float: left;
  width: 21.73%;
  margin-right: 4%;
  height: 95px;
}
.hus ul li .h-right {
  float: left;
  width: 74%;
}
.hus ul li .h-right h5 {
  color: #2e3033;
  font-size: 17px;
  margin-bottom: 12px;
}
.hus ul li .h-right h5 .now {
  color: #fff;
  font-size: 11px;
  padding: 2px 6px;
  background-color: #2cd264;
  border-radius: 2px;
  margin-left: 10px;
}
.hus ul li .h-right h5 .price {
  color: #fe582f;
  font-size: 18px;
  float: right;
}
.hus ul li .h-right p {
  color: #919499;
  font-size: 13px;
  margin-bottom: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 20px;
}

/* 页面底部悬浮 */
/* m-botnav */
.m-botnav {
  width: 100%;
  height: 64px;
  position: fixed;
  bottom: 0;
  background-color: #fff;
  z-index: 200;
  box-shadow: 0px 0px 9px 1px rgba(6, 0, 1, 0.04);
}

.m-botnav p {
  display: inline-block;
  margin-top: 14px;
  margin-left: 9.333333%;
  color: #808080;
  font-size: 10px;
  margin-right: 1.86666667%;
}

.m-botnav p img {
  width: 46%;
  display: block;
}

.m-botnav button {
  display: inline-block;
  position: absolute;
  top: 10px;
  width: 33.06667%;
  height: 44px;
  font-size: 15px;
  border-radius: 5px;
  border: 0px;
  box-shadow: 0px 2.5px 5px 0px rgba(78, 169, 255, 0.2);
}

.m-botnav .m-pho {
  background: linear-gradient(
    90deg,
    rgba(255, 76, 76, 1),
    rgba(255, 152, 106, 1)
  );
  color: #fff;
}
.m-botnav .m-pho .ph1 {
  color: #ffffff;
  font-size: 16px;
  margin: 0;
  padding: 0;
}
.m-botnav .m-pho .ph1 img {
  width: 18px;
  display: inline-block;
  margin-right: 4px;
  margin-bottom: 1px;
}
.m-botnav .m-pho .ph2 {
  color: #ffffff;
  font-size: 10px;
  margin: 0;
  padding: 0;
}

.m-botnav .m-y {
  background: linear-gradient(
    -270deg,
    rgba(52, 138, 255, 1),
    rgba(106, 204, 255, 1)
  );
  color: #fff;
  left: 62%;
}
.m-botnav .m-y .ph1 {
  color: #ffffff;
  font-size: 16px;
  margin: 0;
  padding: 0;
}
.m-botnav .m-y .ph1 img {
  width: 18px;
  display: inline-block;
  margin-right: 4px;
  margin-bottom: 1px;
}
.m-botnav .m-y .ph2 {
  color: #ffffff;
  font-size: 10px;
  margin: 0;
  padding: 0;
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
  display: inline-block;
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

.m-chang {
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
.tsmsg {
  width: 10.625rem;
  height: 3.75rem;
  position: fixed;
  top: 50%;
  margin-top: -1.875rem;
  left: 50%;
  margin-left: -5.3125rem;
  border-radius: 0.375rem;
  text-align: center;
  line-height: 3.75rem;
  background: rgba(0, 0, 0, 0.8);
  color: #cdcdcd;
  font-size: 1rem;
  z-index: 55555;
}
.hengda {
  width: 20.3125rem;
  height: 23.4375rem;
  border-radius: 0.375rem;
  background-color: #fff;
  position: fixed;
  left: 50%;
  margin-left: -10.15625rem;
  top: 24%;
  z-index: 5555;
  padding-top: 2.8125rem;
}
.hengda .del {
  width: 0.875rem;
  position: absolute;
  right: 1rem;
  top: 1rem;
}
.hengda .topimg {
  width: 16.875rem;
  margin-left: 1.6875rem;
  margin-bottom: 2.5rem;
}
.hengda input {
  width: 17rem;
  height: 3.53125rem;
  border-radius: 0.25rem;
  border: 0.09375rem solid #cccccc;
  outline: none;
  padding-left: 1rem;
  margin-left: 1.625rem;
  margin-bottom: 0.875rem;
}
.hengda .zhu {
  color: #ff3333;
  font-size: 0.75rem;
  width: 16.875rem;
  margin-left: 1.6875rem;
  line-height: 1.125rem;
  margin-bottom: 1.875rem;
}
.hengda button {
  width: 16.875rem;
  height: 2.75rem;
  border-radius: 0.25rem;
  text-align: center;
  line-height: 2.75rem;
  border: 0;
  color: #fff;
  font-size: 0.875rem;
  font-weight: bold;
  background: #40a2f4;
  margin-left: 1.6875rem;
}
</style>