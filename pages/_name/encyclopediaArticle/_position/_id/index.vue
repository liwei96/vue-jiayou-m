<template>
  <div class="EncyclopediaArticles">
    <h3>
      <img class="goback" src="~/assets/return.png" @click="goback" />
      <!-- {{title}} -->
      <img class="con-img" src="~/assets/ency-img.png" />
    </h3>
    <div class="con">
      <h2>{{ tit }}</h2>
      <p class="msg">
        {{ source }}
        <span>{{ time }}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;阅读:{{ num }}
      </p>
      <div class="tit">
        <!-- <img :src="img" alt /> -->
        <p v-html="con">{{ con }}</p>
      </div>
      <div class="con-list" v-show="building.length != 0">
        <router-link :to="'/' + jkl + '/content/' + building.id">
          <div class="con-list-top">
            <div class="list-top-left">
              <img :src="building.img" alt />
              <span>
                <i class="iconfont iconyanjing"></i>
                {{ building.num }}
              </span>
            </div>
            <div class="list-top-right">
              <h5>
                {{ building.name }}
                <span>{{ building.state }}</span>
              </h5>
              <p class="price">
                <span>{{ building.price }}</span
                >元/m²
              </p>
              <p class="area">
                <span>{{ building.city }}-{{ building.country }}</span>
                <span>建面</span>
                <span>{{ building.area }}m²</span>
              </p>
              <p class="tabs">
                <strong>{{ building.decorate }}</strong>
                <span>{{ building.railway }}</span>
                <span>{{ building.type }}</span>
              </p>
            </div>
          </div>
        </router-link>

        <div class="con-list-bottom">
          <div class="bang">
            <img src="~/assets/star.png" alt />
            刚需榜第1名
          </div>
          <button class="appointment" :data-v="building.id">预约看房</button>
          <a :href="'tel:' + call" class="tel">电话咨询</a>
        </div>
      </div>
      <div class="up" @click="agree($event)" :data-v="youlike">
        <img
          src="~/assets/giveup.png"
          :data-v="youlike"
          alt
          v-if="youlike == 0"
        />
        <img
          src="~/assets/clicked.png"
          :data-v="youlike"
          alt
          v-if="youlike == 1"
        />
        <p id="nn" :data-v="youlike">{{ like }}</p>
      </div>
      <div class="recommend">
        <h4>人气推荐</h4>
        <ul class="lists">
          <li v-for="(list, key) in recommands" :key="key" :data-v="list.id">
            <div class="list">
              <router-link
                :to="
                  '/' +
                  jkl +
                  '/encyclopediaArticle/' +
                  list.position +
                  '/' +
                  list.id
                "
              >
                <div class="left">
                  <h5>{{ list.title }}</h5>
                  <p>
                    {{ list.source ? list.source : "允家新房" }} &nbsp;{{
                      list.time
                    }}
                  </p>
                </div>
                <div class="right">
                  <img :src="list.img" alt />
                </div>
              </router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 弹框 -->
    <div class="weiter ts">
      <div class="t-top">
        <h6>预约看房</h6>
        <p>一键预约看房免费小车上门接送，可带家人一起参观多个热门楼盘</p>
        <img id="w-esc" src="~/assets/xx.png" alt />
      </div>
      <div class="t-bottom">
        <div class="t-b-first">
          <p><img src="~/assets/linshi.png" />允家严格保障您的信息安全</p>
          <input
            class="l-p"
            type="tel"
            placeholder="输入预约手机号码"
            v-model="baoming"
          />
          <button class="t-b-btn t-b-btn2 bg_01" id="dingxue">立即订阅</button>
        </div>
        <div class="t-b-second">
          <p>
            验证码已发送到
            <span id="ytel">187****4376</span>，请注意查看
          </p>
          <input type="text" placeholder="请输入验证码" id="ma-ll"/>
          <button class="port1">确定</button>
          <input type="hidden" id="building_name" value />
          <input type="hidden" value />
          <button class="t-b-scode">获取验证码</button>
        </div>
      </div>
    </div>

    <div class="m-chang"></div>

    <div class="m-o-succ">
      <img class="o-esc" src="~/assets/m-esc.png" alt />
      <img src="~/assets/m-success.png" alt class="o-success" />
      <p id="o_p">已成功订阅最新动态，我们会第一时间通过短信通知您！</p>
      <button id="o_btn">确定</button>
    </div>
    <foot-view :pinyin="jkl"></foot-view>
  </div>
</template>
<script>
import footView from "@/components/Foot.vue";
import Loading from "@/components/loading";
// import wx from 'weixin-js-sdk'
import {
  encyclopediaarticle_data,
  ip,
  encyclopediaarticle_agree,
  msg,
  verification,
  trend_put,
  getsdk,
} from "~/api/api";
export default {
  name: "EncyclopediaArticles",
  components: {
    load: Loading,
    "foot-view": footView,
  },
  async asyncData(context) {
    try {
      let ip = context.store.state.cookie.ip;
      let city = context.store.state.cookie.city;
      let token = context.store.state.cookie.token;
      let id = context.params.id;
      let t = context.params.position;
      let jkl = context.store.state.cookie.pinyin;
      let kid = context.store.state.cookie.kid
        ? context.store.state.cookie.kid
        : "";
      let other = context.store.state.cookie.other
        ? context.store.state.cookie.other
        : "";
      let [res] = await Promise.all([
        context.$axios
          .get("/applets/article/detail", {
            params: {
              ip: ip,
              city: city,
              id: id,
              platform: 2,
              position: t,
              token: token,
              kid: kid,
              other: other,
            },
          })
          .then((resp) => {
            let data = resp.data;
            return data;
          }),
      ]);
      return {
        jkl: jkl,
        building: res.project_info,
        tit: res.article.title,
        img: res.article.img,
        dis: res.article.description,
        con: res.article.content,
        num: res.article.visit_num,
        like: res.article.like_num,
        recommands: res.others,
        // type: res.article.source_type,
        source: res.article.source,
        time: res.article.time,
        title: res.common.header.title,
        keywords: res.common.header.keywords,
        description: res.common.header.description,
        youlike: res.article.my_like,
      };
    } catch (err) {
      console.log("errConsole========:", err);
      context.error({ statusCode: 404, message: "页面未找到或无数据" });
    }
  },
  head() {
    return {
      title: this.tit,
      meta: [
        {
          name: "description",
          content: this.dis,
        },
        {
          name: "Keywords",
          content: this.keywords,
        },
      ],
    };
  },
  data() {
    return {
      baoming: "",
      like: 0,
      jkl: "",
      lists: [
        {
          tit: "房地产行业集中度进一步提高百强 房企市场份额升",
          time: "2019-05-24",
          img: require("~/assets/lou1.png"),
        },
        {
          tit: "房地产行业集中度进一步提高百强 房企市场份额升",
          time: "2019-05-24",
          img: require("~/assets/lou1.png"),
        },
        {
          tit: "房地产行业集中度进一步提高百强 房企市场份额升",
          time: "2019-05-24",
          img: require("~/assets/lou1.png"),
        },
        {
          tit: "房地产行业集中度进一步提高百强 房企市场份额升",
          time: "2019-05-24",
          img: require("~/assets/lou1.png"),
        },
        {
          tit: "房地产行业集中度进一步提高百强 房企市场份额升",
          time: "2019-05-24",
          img: require("~/assets/lou1.png"),
        },
        {
          tit: "房地产行业集中度进一步提高百强 房企市场份额升",
          time: "2019-05-24",
          img: require("~/assets/lou1.png"),
        },
      ],
      building: {},
      tit: "",
      dis: "",
      img: "",
      con: "",
      num: "",
      id: "",
      ip: "",
      pro: "",
      phone: "",
      recommands: [],
      type: "",
      n: "",
      call: "",
      source: "",
      count: "",
      time: "",
      title: "",
      load: true,
      keywords: "",
      description: "",
      youlike: "",
    };
  },
  methods: {
    start() {
      this.n = this.$route.params.name;
      let that = this;
      let id = this.$route.params.id;
      this.id = id;
      this.call = localStorage.getItem("call");
      let ip = ip_arr["ip"];
      // let ip = returnCitySN["cip"];
      this.ip = ip;
      localStorage.getItem("ip");
      let city = localStorage.getItem("city");
      let token = localStorage.getItem("token");
      let t = this.$route.params.position;
      this.load = false;
    },
    agree(e) {
      let id = this.id;
      let ip = this.ip;
      let token = localStorage.getItem("token");
      let that = this;
      let ll = e.target.getAttribute("data-v");
      if (token) {
        encyclopediaarticle_agree({
          ip: ip,
          id: id,
          platform: 2,
          token: token,
          type: 3,
        })
          .then((resp) => {
            if (resp.data.code == 500) {
              that.$router.push("/" + that.n + "/login");
            } else {
              if (ll == 0) {
                that.youlike = 1;
                that.like = that.like + 1;
                $("#nn").html(that.like);
              } else {
                that.youlike = 0;
                that.like = that.like - 1 > 0 ? that.like - 1 : 0;
                $("#nn").html(that.like);
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        that.$router.push("/" + that.n + "/login");
      }
    },
    sendmsg(p) {
      this.phone = p;
      let ip = this.ip;
      let c = localStorage.getItem("city");
      let pro = this.pro;
      trend_put({
        ip: ip,
        tel: p,
        city: c,
        position: 5,
        page: 3,
        project: pro,
      })
        .then((resp) => {
          if (resp.data.code == 200) {
          }
        })
        .catch((error) => {
          console.log(error);
        });
      msg({ phone: p, channel: 2 })
        .then((resp) => {
          if (resp.data.code == 200) {
            $(".t-b-first").hide();
            $(".t-b-second").show();
            var time = 60;
            var tel = p.substr(0, 3) + "****" + p.substr(7, 11);
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
    },
    check(m) {
      let tel = this.baoming;
      let that = this;
      verification({ phone: tel, code: m, channel: 2 })
        .then((resp) => {
          console.log(resp)
          if (resp.data.code == 200) {
            $(".weiter").hide();
            $(".m-o-succ").show();
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
      console.log(document.referrer);
      // return
      if (
        document.referrer == window.location.href ||
        document.referrer == ""
      ) {
        this.$router.push("/");
        return;
      } else {
        this.$router.go(-1);
      }
    },
    get() {
      let url = encodeURIComponent(window.location.href);
      const jsApiList = [
        "onMenuShareAppMessage",
        "onMenuShareTimeline",
        "onMenuShareQQ",
        "onMenuShareWeibo",
        "updateAppMessageShareData",
        "updateTimelineShareData",
      ];
      getsdk(url).then((res) => {
        let that = this;
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.data.data.appId, // 必填，公众号的唯一标识
          timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
          signature: res.data.data.signature, // 必填，签名
          jsApiList: jsApiList, // 必填，需要使用的JS接口列表
        });
        wx.ready(function () {
          if (wx.onMenuShareAppMessage) {
            wx.onMenuShareAppMessage({
              title: that.tit, // 分享标题
              desc: that.dis, // 分享描述
              link: window.location.href, // 分享链接
              imgUrl: that.img, // 分享图标
              type: "", // 分享类型,music、video或link，不填默认为link
              dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
              success: function () {
                // 用户确认分享后执行的回调函数
                // alert('1.01')
              },
              cancel: function () {
                // 用户取消分享后执行的回调函数
              },
            });
          } else {
            wx.updateAppMessageShareData({
              title: that.tit, // 分享标题
              desc: that.dis, // 分享描述
              link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: that.img, // 分享图标
              success: function () {
                // 设置成功
                // alert('1.40')
              },
            });
            wx.updateTimelineShareData({
              title: that.tit, // 分享标题
              link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: that.img, // 分享图标
              success: function () {
                // 设置成功
              },
            });
          }
        });
        wx.error((res) => {
          console.log(res);
        });
      });
    },
  },
  mounted() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      this.get();
    }
    let that = this;
    this.start();
    $(".appointment").on("click", function () {
      let pro = $(this).attr("data-v");
      that.pro = pro;
      $(".m-chang").show();
      $(".weiter").show();
    });
    $(".m-chang").on("click", function () {
      $(".m-chang").hide();
      $(".weiter").hide();
      $(".m-o-succ").hide();
      $(".t-b-first").show();
      $(".t-b-second").hide();
    });
    // 接口验证码
    $(".t-b-btn2").on("click", function () {
      var phone = $(this).prev().val();
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
  },
  watch: {
    $route() {
      this.$router.go(0);
    },
    keywords(val) {
      const keywordsEl = document.createElement("meta");
      keywordsEl.content = this.keywords;
      keywordsEl.name = "keywords";

      const descriptionEl = document.createElement("meta");
      descriptionEl.content = this.description;
      descriptionEl.name = "description";

      document.head.appendChild(keywordsEl);
      document.head.appendChild(descriptionEl);
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
h3 {
  color: #333333;
  text-align: center;
  height: 44px;
  line-height: 44px;
  font-weight: bold;
  position: relative;
  font-size: 16px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;
  background-color: #fff;
  -webkit-box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.05);
  max-width: 450px;
}
h3 img.goback {
  position: absolute;
  width: 5%;
  margin-top: 14px;
  left: 5.33%;
}
h3 img.con-img {
  width: 12%;
}
.con {
  padding: 0 4%;
  margin-top: 44px;
}
.con h2 {
  color: #2e3033;
  font-size: 20px;
  padding-top: 13px;
  font-weight: 500;
  margin-bottom: 16px;
}
.con .msg {
  color: #919499;
  font-size: 12px;
  margin-bottom: 18px;
}
.con .msg span {
  color: #919499;
  font-size: 13px;
  margin-left: 10px;
}

.tit {
  margin-bottom: 25px;
}
.tit p {
  color: #5e6166;
  font-size: 16px;
  line-height: 30px;
}
.tit p >>> img {
  width: 100% !important;
  border-radius: 6px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.con-list {
  width: 100%;
  height: 146px;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  margin-bottom: 40px;
  padding-top: 16px;
}
.con-list .con-list-top {
  margin-left: 4.3478%;
}
.con-list .con-list-top::after {
  content: "";
  height: 0;
  display: block;
  clear: both;
  visibility: hidden;
}
.con-list .con-list-top .list-top-left {
  position: relative;
  margin-right: 15px;
  display: inline-block;
  width: 33.333%;
  height: 90px;
  float: left;
}
.con-list .con-list-top .list-top-left img {
  width: 100%;
  height: 90px;
  border-radius: 4px;
}
.con-list .con-list-top .list-top-left span {
  display: block;
  color: #ffffff;
  font-size: 10px;
  position: absolute;
  right: 3%;
  bottom: 2%;
}
.con-list .con-list-top .list-top-left span i {
  font-size: 10px;
  margin-right: 2px;
}

.con-list .con-list-top .list-top-right {
  display: inline-block;
}
.con-list .con-list-top .list-top-right h5 {
  color: #333333;
  font-size: 17px;
  margin-bottom: 4px;
}
.con-list .con-list-top .list-top-right h5 span {
  background-color: #e9f7ea;
  border-radius: 2px;
  float: right;
  padding: 3px 7px;
  background-color: #e9f7ea;
  color: #2cd264;
  font-size: 11px;
  font-weight: 500;
}
.con-list .con-list-top .list-top-right .price {
  color: #fe582f;
  font-size: 12px;
}
.con-list .con-list-top .list-top-right .price span {
  font-size: 18px;
}
.con-list .con-list-top .list-top-right .area {
  margin-bottom: 4px;
}
.con-list .con-list-top .list-top-right .area span {
  color: #919499;
  font-size: 12px;
  margin-right: 8px;
}
.con-list .con-list-top .list-top-right .tabs strong {
  font-weight: 500;
  padding: 3px 7px;
  background-color: #ebf5fc;
  color: #4db5ff;
  font-size: 11px;
  margin-right: 6px;
  display: inline-block;
  float: left;
}
.con-list .con-list-top .list-top-right .tabs span {
  color: #919499;
  font-size: 11px;
  padding: 3px 7px;
  background-color: #f7f8fa;
  margin-right: 6px;
  display: inline-block;
  max-width: 76px;
  overflow: hidden;
  height: 22px;
  white-space: nowrap;
}
.con-list .con-list-bottom .bang {
  width: 43.478%;
  height: 18px;
  background: linear-gradient(
    270deg,
    rgba(255, 255, 255, 1),
    rgba(255, 225, 225, 1)
  );
  border-radius: 9px 0px 0px 9px;
  line-height: 18px;
  color: #919499;
  font-size: 12px;
  display: inline-block;
  margin-left: 4%;
}
.con-list .con-list-bottom .bang img {
  width: 15px;
  margin-left: 2%;
  margin-top: -7px;
  position: relative;
  top: 11%;
}
.con-list .con-list-bottom .appointment {
  width: 21.739%;
  height: 22px;
  border-radius: 11px;
  border: 1px solid #ffa99d;
  background-color: #ffedeb;
  text-align: center;
  line-height: 22px;
  font-size: 13px;
  color: #ff7866;
  margin-right: 4.347%;
}
.con-list .con-list-bottom .tel {
  width: 21.739%;
  height: 22px;
  border-radius: 11px;
  background-color: #ff7866;
  color: #fff;
  font-size: 13px;
  text-align: center;
  line-height: 22px;
  text-decoration: none;
  display: inline-block;
}

.up {
  width: 60px;
  height: 60px;
  border: 0.5px solid #e8e9ed;
  position: relative;
  left: 50%;
  margin-left: -30px;
  margin-bottom: 26px;
  border-radius: 50%;
  text-align: center;
}
.up img {
  width: 17px;
  margin-bottom: 4px;
  margin-top: 12px;
}
.up p {
  color: #797e86;
  font-size: 12px;
}

.recommend h4 {
  color: #2e3033;
  font-size: 17px;
  margin-bottom: 26px;
}
.lists {
  margin-top: 20px;
}
.lists li {
  margin-bottom: 14px;
}
.lists .list {
  padding-bottom: 9px;
  border-bottom: 1px solid #f3f5fb;
  height: 84px;
}
.lists .list .left {
  display: inline-block;
  float: left;
}
.lists .list .left h5 {
  color: #2e3033;
  font-size: 15px;
  margin-bottom: 26px;
  width: 225px;
}
.lists .list .left p {
  color: #919499;
  margin-right: 4px;
  font-size: 11px;
}
.lists .list .right {
  float: right;
}
.lists .list .right img {
  width: 100px;
  height: 74px;
  border-radius: 5px;
}

.weiter {
  display: none;
  width: 75%;
  position: fixed;
  left: 12.667%;
  top: 220px;
  border-radius: 12px;
  z-index: 1001;
}

.weiter .t-top {
  width: 100%;
  height: 100px;
  background-color: #fff;
  border-radius: 12px 12px 0 0;
  padding-top: 15px;
}

.weiter .t-top h6 {
  color: #3a3c49;
  font-size: 17px;
  text-align: center;
  margin-bottom: 22px;
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
}

.weiter .t-bottom {
  width: 100%;
  height: 188px;
  background-color: #fff;
  border-radius: 0 0 12px 12px;
}

.weiter .t-bottom .t-b-first {
  height: 100%;
  display: block;
}
.weiter .t-bottom .t-b-first p {
  color: #a8a8ab;
  font-size: 12px;
  padding-left: 7%;
  padding-top: 25px;
}
.weiter .t-bottom .t-b-first p img {
  width: 5%;
  margin-right: 2%;
  margin-bottom: 2px;
}

.weiter .t-bottom .t-b-first input {
  width: 85%;
  height: 40px;
  border: 0.5px solid rgba(230, 230, 230, 1);
  margin-top: 10px;
  margin-bottom: 25px;
  margin-left: 7.52%;
  padding-left: 5%;
  font-size: 14px;
}

.weiter .t-bottom .t-b-first button {
  width: 85%;
  height: 40px;
  border: 0;

  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
  margin-left: 7.5%;
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
  margin-top: 10px;
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
  border: 0.5px solid rgba(238, 238, 238, 1);
  margin-left: 7.5%;
  margin-bottom: 20px;
  padding-left: 4%;
}

.weiter .t-bottom .t-b-second .port1 {
  width: 85%;
  height: 40px;
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
}

.weiter .t-bottom .t-b-second .t-b-scode {
  border: 0;
  color: #40a2f4;
  font-size: 13px;
  position: absolute;
  right: 10%;
  top: 58%;
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
</style>