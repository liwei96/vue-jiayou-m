<template>
  <div class="Dynamic">
    <nav>
      <img class="back" src="~/assets/return.png" @click="goback" />
      <button id="sea">
        <img class="search" src="~/assets/search.png" alt />请输入楼盘名称、地区
      </button>
    </nav>
    <div class="con">
      <div class="list" v-for="(m,key) in lists" :key="key">
        <p class="tit">
          <i class="round"></i>
          {{m.createtime}}
        </p>
        <div class="lcon">
          <h4>{{m.building_name}}最新房源动态</h4>
          <div class="lcon-con">
            <div class="left">
              <img :src="m.building_img" alt />
            </div>
            <div class="right">
              <p>{{m.introduce}}</p>
              <span class="all" @click="all($event)">全文</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="m-botnav">
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
    <div class="weiter ts">
      <div class="t-top">
        <h6>预约看房</h6>
        <p>一键预约看房免费小车上门接送，可带家人一起参观多个热门楼盘</p>
        <img id="w-esc" src="~/assets/w-del.png" alt />
      </div>
      <div class="t-bottom">
        <div class="t-b-first">
          <input class="l-p" type="tel" placeholder="输入预约手机号码" v-model="baoming" />
          <p class="w-mg">
            <input class="w-mg-c" type="checkbox" checked v-model="checks" />我已阅读并同意
            <a href="javasript:;">《允家新房用户协议》</a>
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

    <div class="m-chang"></div>
    <div class="hengda" v-show="ishengda">
      <img class="del" src="~/assets/w-del.png" alt @click="guanbi" />
      <img src="~/assets/hengda.png" alt class="topimg" />
      <input type="text" placeholder="输入身份证号后6位" maxlength="6" v-model="IDcode" />
      <p class="zhu">注: 根据本楼盘售楼处规定，实地看房需先提前报备 身份证后6位</p>
      <button @click="hengda">申请报备</button>
    </div>
    <div class="m-o-succ">
      <img class="o-esc" src="~/assets/m-esc.png" alt />
      <img src="~/assets/m-success.png" alt class="o-success" />
      <p id="o_p">已成功订阅最新动态，我们会第一时间通过短信通知您！</p>
      <button id="o_btn">确定</button>
    </div>
    <div class="tsmsg" v-show="tstype">{{tsmsg}}</div>
  </div>
</template>
<script>
import footView from "@/components/Foot.vue";
import {
  dynamic_start,
  dynamic,
  ip,
  msg,
  verification,
  trend_put,
  hengda
} from "~/api/api";
import axios from "axios";
export default {
  name: "Dynamic",
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
        .post("/api/project/dynamic", {
          city: city,
          platform: 2,
          token: token,
          ip: ip,
          project: id,
          limit: 50,
          kid: kid,
          other: other,
        })
        .then((resp) => {
          let data = resp.data.data;
          return data;
        }),
    ]);
    return {
      lists: res.dynamics.infos,
      phone: res.phone,
      checks: false,
      jkl: jkl,
      title: res.title,
      description: res.description,
      keywords: res.keywords,
      name: res.building.name,
      city: name,
    };
  },
  data() {
    return {
      baoming: "",
      page: 2,
      lists: [],
      phone: "",
      ip: "",
      n: "",
      call: "",
      ting: true,
      checks: false,
      jkl: "",
      title: "",
      description: "",
      keywords: "",
      name: "",
      city: "",
      ishengda: false,
      IDcode: "",
      tstype:false,
      tsmsg:''
    };
  },
  head() {
    return {
      title: this.title || `${this.city}${this.name}楼盘动态_允家新房`,
      meta: [
        {
          name: "description",
          content:
            this.description ||
            `允家新房${this.city}${this.name}楼盘动态为您提供实时楼盘动态,包括实时${this.name}楼盘新闻资讯,实时开盘时间信息、户型房源和价格打折信息等`,
        },
        {
          name: "keywords",
          content: this.keywords || `${this.city}${this.name}楼盘动态`,
        },
      ],
    };
  },
  methods: {
    start_data() {
      this.call = this.phone;
      let city = localStorage.getItem("city");
      if (!city) {
        city = 1;
        localStorage.setItem("city", 1);
      }
      let ip = ip_arr["ip"];
      // let ip = returnCitySN["cip"];
      this.ip = ip;
      localStorage.getItem("ip");
      this.n = localStorage.getItem("cityname");
    },
    all(e) {
      let txt = e.target.innerHTML;
      if (txt == "全文") {
        e.target.previousElementSibling.style.cssText =
          "overflow: inherit;height: auto;-webkit-line-clamp:inherit";
        e.target.innerHTML = "收起";
      } else {
        e.target.previousElementSibling.style.cssText =
          "overflow: hidden;height: 44px;-webkit-line-clamp:2";
        e.target.innerHTML = "全文";
      }
    },
    getmore() {
      this.ting = false;
      let that = this;
      let city = localStorage.getItem("city");
      if (!city) {
        city = 1;
        localStorage.setItem("city", 1);
      }
      let ip = this.ip;
      let token = localStorage.getItem("token");
      let id = this.$route.params.id;
      dynamic({
        page: this.page,
        city: city,
        platform: 2,
        token: token,
        ip: ip,
        project: id,
      })
        .then((resp) => {
          that.ting = true;
          let data = resp.data.data.dynamics.infos;
          let l = that.lists.concat(data);
          that.lists = l;
          that.page = that.page + 1;
        })
        .then((error) => {
          console.log(error);
        });
    },
    hengda() {
      let tel = this.baoming;
      let that = this;
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
    guanbi() {
      $(".t-b-first").show();
      $(".t-b-second").hide();
      $('.m-chang').hide();
      $('.hengda').hide();
    },
    sendmsg(t) {
      this.phone = t;
      let that = this;
      let ip = ip_arr["ip"];
      let c = localStorage.getItem("city");
      let p = that.page;
      let id = this.$route.params.id;
      trend_put({
        ip: ip,
        tel: t,
        city: c,
        position: 5,
        page: 3,
        type: 9,
        project: id,
      })
        .then((resp) => {
          if (resp.data.code == 200) {
            msg({ phone: t, channel: 2 })
              .then((resp) => {
                if (resp.data.code == 200) {
                  $(".t-b-first").hide();
                  $(".t-b-second").show();
                  var time = 60;
                  var tel = t.substr(0, 3) + "****" + t.substr(7, 11);
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
    check(m) {
      let tel = this.baoming;
      let that = this;
      verification({ phone: tel, code: m, channel: 2 })
        .then((resp) => {
          if (resp.data.code == 200) {
            $(".weiter").hide();
            if (that.name.indexOf("恒大") !== -1) {
              that.ishengda = true;
            } else {
              $(".m-o-succ").show();
            }
          } else {
            $("#ma-ll").val("");
            $("#ma-ll").attr("placeholder", "验证码不正确");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    goback() {
      this.$router.go(-1);
    },
    scroll() {
      var scrollTop = window.scrollY;
      var scrollHeight = window.screen.availHeight;
      var windowHeight = document.body.scrollHeight;
      if (scrollTop + scrollHeight >= windowHeight) {
        if (this.ting) {
          this.getmore();
        }
      }
    },
  },
  components: {
    "foot-view": footView,
  },
  mounted() {
    this.city = localStorage.getItem("cityname");
    let h = $(".Dynamic").height();
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
    this.baoming = localStorage.getItem("phone");
    this.start_data();
    let that = this;
    $("#sea").on("click", function () {
      that.$router.push("/" + that.n + "/sou");
      // window.location.href = '/'+that.n+"/sou";
    });
    $(".p1").on("click", function () {
      $(".m-chang").show();
      $(".weiter").show();
    });
    $(".m-chang").on("click", function () {
      $(".m-chang").hide();
      $(".weiter").hide();
      $(".m-o-succ").hide();
      $(".hengda").hide();
    });
    $("#w-esc").on("click", function () {
      $(".m-chang").hide();
      $(".weiter").hide();
      $(".m-o-succ").hide();
    });
    // 接口验证码
    $(".t-b-btn2").on("click", function () {
      let check = that.checks;
      console.log(check);
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
      that.sendmsg(phone);
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
      $(".m-o-succ").hide();
      $(".m-chang").hide();
    });
    $(".o-esc").on("click", function () {
      $(".m-o-succ").hide();
      $(".m-chang").hide();
    });

    window.addEventListener("scroll", this.scroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scroll);
  },
  watch: {
    lists() {},
  },
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
}
.tishi {
  color: red;
  font-size: 10px;
  display: none;
}
nav {
  width: 100%;
  height: 48px;
  -webkit-box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.05);
  position: fixed;
  background-color: #fff;
  z-index: 2;
  top: 0;
}
nav .back {
  position: absolute;
  width: 5%;
  margin-top: 14px;
  left: 4%;
}
nav button {
  width: 83.3333%;
  height: 30px;
  border-radius: 15px;
  background-color: #ecedf1;
  padding-left: 33px;
  line-height: 32px;
  border: 0;
  color: #919299;
  font-size: 13px;
  text-align: left;
  margin-top: 8px;
  margin-left: 12.667%;
  position: relative;
}
nav .search {
  position: absolute;
  width: 6%;
  top: 5px;
  left: 3%;
}

.con {
  padding: 0 4%;
  padding-bottom: 70px;
  margin-top: 60px;
}
.con .list {
  margin-top: 15px;
  margin-bottom: 15px;
}
.con .list .tit {
  color: #919499;
  font-size: 12px;
  margin-bottom: 13px;
  padding-left: 5%;
  position: relative;
}
.con .list .tit .round {
  width: 8px;
  height: 8px;
  border: 2px solid #4db5ff;
  border-radius: 50%;
  position: absolute;
  display: block;
  left: 0;
  top: 1px;
}

.con .list .lcon {
  border-left: 0.5px solid #c1e3fb;
  padding-left: 5%;
}
.con .list .lcon h4 {
  color: #2e3033;
  font-size: 17px;
  margin-bottom: 12px;
}
.con .list .lcon .left {
  margin-right: 16px;
  float: left;
}
.con .list .lcon .left img {
  width: 82.5px;
  height: 60px;
  border-radius: 4px;
}
.con .list .lcon .right {
  display: inline-block;
  width: 64.94%;
  position: relative;
}
.con .list .lcon .right p {
  color: #919499;
  font-size: 15px;
  line-height: 23px;
  height: 44px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin-bottom: 4px;
}
.con .list .lcon .right span {
  color: #5ac2ff;
  font-size: 15px;
  position: relative;
  right: -82%;
}

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
  margin-top: 10px;
  width: 33.06667%;
  height: 44px;
  font-size: 15px;
  border-radius: 4px;
  border: 0px;
}

.m-botnav .m-pho {
  background: linear-gradient(
    90deg,
    rgba(255, 76, 76, 1),
    rgba(255, 152, 106, 1)
  );
  color: #fff;
  margin-left: 10.6667%;
  margin-right: 10.8%;
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
  display: none;
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
  display: none;
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
</style>