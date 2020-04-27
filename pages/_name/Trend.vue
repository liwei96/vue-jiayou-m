<template>
  <div class="Trend">
    <h3>
      <img src="~/assets/return.png" @click="goback" />房价趋势
    </h3>
    <div class="con">
      <div class="search">
        <span class="city">
          {{cityname}}
          <i class="iconfont iconbelow-s"></i>
        </span>
        <button id="sea">
          <span class="iconfont iconmagnifier"></span>请输入楼盘名称、地域
        </button>
      </div>
      <div class="price">
        <h5>{{cityname}}房价</h5>
        <p class="trend">
          <i>{{trend_mounth}}月均价：</i>
          <span class="s1">
            <strong class="bold">{{trend_price}}</strong>元/m²
          </span>
        </p>
        <p class="trend">
          <i>环比上月：</i>
          <span class="s2">
            {{mb}}
            <strong>{{trend_down}}%</strong>
          </span>
        </p>
        <p class="trend">
          <i>同比去年：</i>
          <span class="s3">
            {{yb}}
            <strong>{{trend_up}}%</strong>
          </span>
        </p>
        <div id="pic"></div>
        <p class="msg">
          <img src="~/assets/bell.png" alt />
          价格变动这么快？
          订阅最新变价通知，楼盘变价我们第一时间通知您
        </p>
        <button id="btn">获取最新变价通知</button>
      </div>
    </div>
    <div class="guess">
      <h4>猜你喜欢</h4>
      <div class="recommen">
        <div class="re-con">
          <div class="re-list" v-for="(list,key) in lists" :key="key">
            <router-link :to="'/'+jkl+'/content/'+list.id">
              <div class="re-con-left">
                <img :src="list.img" alt />
                <span>
                  <i class="iconfont iconyanjing"></i>
                  {{list.num}}
                </span>
              </div>
              <div class="re-con-right">
                <h5>
                  {{list.name}}
                  <span>{{list.status}}</span>
                </h5>
                <p class="price">
                  <span>{{list.single_price}}</span>元/m²
                </p>
                <p class="area">
                  <span>{{list.city}}-{{list.country}}</span>
                  <span>建面</span>
                  <span>
                    {{parseInt(list.area_min)}}
                    <span v-if="list.area_max">-</span>
                    {{parseInt(list.area_max)}}m²
                  </span>
                </p>
                <p class="tabs">
                  <span class="strong">{{list.decorate}}</span>
                  <span v-if="list.railway">{{list.railway}}</span>
                  <span>{{list.type}}</span>
                </p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
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
            <input class="l-p" type="text" placeholder="输入预约手机号码" />
            <p class="w-mg">
              <input class="w-mg-c" type="checkbox" checked v-model="check" />我已阅读并同意
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
            <input type="text" placeholder="请输入验证码" />
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
  </div>
</template>
<script>
// import { echarts } from "./static/js/echarts.min.js";
import { trend_start, trend_put, msg, verification, ip } from "~/api/api";
export default {
  name: "Trend",
  async asyncData (context) {
    let ip=context.store.state.cookie.ip;
    let city = context.store.state.cookie.city;
    let token=context.store.state.cookie.token;
    let jkl=context.store.state.cookie.pinyin;
    let [res]= await Promise.all([
      context.$axios.post('/api/price/trends',{ city: city, ip: ip, token: token, platform: 2 })
      .then((resp)=>{
        let trend = resp.data.data.price_trends;
          let data=resp.data.data;
          if (Number( trend.current.rate) > 0) {
            trend.mb = "下降";
          } else {
            trend.mb = "上升";
             trend.current.rate = Math.abs(Number( trend.current.rate));
          }
          if (Number(trend.current.rate_lastyear) < 0) {
            trend.yb = "下降";
            trend.current.rate_lastyear = Math.abs(Number(trend.current.rate_lastyear));
          } else {
            trend.yb = "上升";
          }
          
          let m = [];
          let p = [];
          let ms = trend.data;
          for (let val of ms) {
            m.unshift(val.time);
            let l = (val.price / 10000).toFixed(3);
            p.unshift(l);
          }
          data.mounth = m;
          data.price = p;
          return data;
      })
    ])
    return{
          trend_mounth : res.price_trends.current.time,
          trend_price : res.price_trends.current.price,
          trend_up : res.price_trends.current.rate_lastyear,
          trend_down : res.price_trends.current.rate,
          lists : res.recommands,
          mb:res.price_trends.mb,
          yb:res.price_trends.yb,
          mounth:res.mounth,
          price:res.price,
          jkl:jkl
    }
  },
  data() {
    return {
      jkl:'',
      change: false,
      succ: false,
      defaultHeight: "0",
      nowHeight: "0",
      lists: [
        {
          name: "绿地华家池印",
          img: require("~/assets/lou1.png"),
          num: "32323",
          isshou: "在售",
          price: "32000",
          city: "杭州市",
          area: "萧山区",
          area_min: "62",
          areamax: "99",
          zhuangxiu: "精装",
          ditie: "地铁沿线",
          tese: "繁华地段"
        },
        {
          name: "绿地华家池印",
          img: require("~/assets/lou1.png"),
          num: "32323",
          isshou: "在售",
          price: "32000",
          city: "杭州市",
          area: "萧山区",
          area_min: "62",
          areamax: "99",
          zhuangxiu: "精装",
          ditie: "地铁沿线",
          tese: "繁华地段"
        },
        {
          name: "绿地华家池印",
          img: require("~/assets/lou1.png"),
          num: "32323",
          isshou: "在售",
          price: "32000",
          city: "杭州市",
          area: "萧山区",
          area_min: "62",
          areamax: "99",
          zhuangxiu: "精装",
          ditie: "地铁沿线",
          tese: "繁华地段"
        },
        {
          name: "绿地华家池印",
          img: require("~/assets/lou1.png"),
          num: "32323",
          isshou: "在售",
          price: "32000",
          city: "杭州市",
          area: "萧山区",
          area_min: "62",
          areamax: "99",
          zhuangxiu: "精装",
          ditie: "地铁沿线",
          tese: "繁华地段"
        }
      ],
      trend_mounth: "9",
      trend_price: "28907",
      trend_up: "3.19",
      trend_down: "1.09",
      price: [],
      mounth: [],
      cityname: "杭州",
      ip: "",
      tel: "",
      n: "",
      mb: "",
      yb: "",
      check: ""
    };
  },
  methods: {
    method1: function() {
      echarts();
    },
    start_data() {
      this.n = this.$route.params.name;
      let city = localStorage.getItem("city");
      if (!city) {
        city = 1;
        localStorage.setItem("city", 1);
      }
      let ip = returnCitySN["cip"];
      this.ip = ip;
      localStorage.getItem("ip");
      let token = localStorage.getItem("token");
      trend_start({ city: city, ip: ip, token: token, platform: 2 })
        .then(resp => {
          
        })
        .catch(error => {
          console.log(error);
        });
    },
    drawline() {
      var chart = this.$echarts.init(document.getElementById("pic"));
      let that = this;
      var option = {
        backgroundColor: "#fff",
        tooltip: {
          trigger: "axis",
          formatter: function(params) {
            // console.log(params);
            return (
              params[0].name +
              "<br>" +
              params[0].seriesName +
              params[0].data +
              "(万)"
            );
          }
        },
        legend: {
          data: "房价"
        },
        grid: {
          x: "26px",
          y: "10px",
          x2: "18px",
          y2: "20px"
        },
        calculable: true,

        xAxis: [
          {
            axisLabel: {
              rotate: 40,
              interval: 0
            },
            axisLine: {
              lineStyle: {
                color: "#919499"
              }
            },
            boundaryGap: false,
            data: (function() {
              var list = that.mounth;
              return list;
            })(),
            axisLabel: {
              rotate: 0
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            scale: true,
            max: 3,
            min: 0.8,
            splitNumber: 5,
            axisLine: {
              lineStyle: {
                color: "#919499"
              },
              show: false
            },
            splitLine: {
              shwo: true,
              lineStyle: {
                type: "dashed"
              }
            }
          }
        ],
        series: [
          {
            name: "均价",
            type: "line",
            symbol: "none",
            smooth: 0.9,
            color: ["#40A2F4"],
            data: that.price
          }
        ]
      };
      // console.log(option.xAxis[0].data);
      chart.setOption(option);
    },
    put(msg) {
      trend_put(msg)
        .then(resp => {
          return resp.code;
        })
        .catch(error => {
          console.log(error);
        });
    },
    send(tel) {
      let ip = this.ip;
      let data = { channel: 2, phone: tel, ip: ip };
      this.tel = tel;
      msg(data)
        .then(resp => {
          let code = resp.data.code;
          if (code == 200) {
            let city = localStorage.getItem("city");
            if (!city) {
              city = 1;
              localStorage.setItem("city", 1);
            }
            let kid = sessionStorage.getItem("kid");
            let other = sessionStorage.getItem("other");
            trend_put({
              ip: ip,
              tel: tel,
              city: city,
              position: 6,
              page: 2,
              type: 6,
              kid: kid,
              other: other
            })
              .then(resp => {
                if (resp.data.code == 200) {
                }
              })
              .catch(error => {
                console.log(error);
              });
            $(".t-b-first").hide();
            $(".t-b-second").show();
            var time = 60;
            var phone = tel.substr(0, 3) + "****" + tel.substr(7, 11);
            var fn = function() {
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
        .catch(error => {
          console.log(error);
        });
    },
    yan(e) {
      let tel = this.tel;
      let that = this;
      verification({ phone: tel, code: e, channel: 2 })
        .then(resp => {
          if (resp.data.code == 200) {
            that.change = false;
            that.succ = true;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    goback() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.start_data();
    this.drawline();
    let that = this;
    let cityname = localStorage.getItem("cityname");
    if (cityname) {
      this.cityname = cityname;
    }
    $("#sea").on("click", function() {
      that.$router.push("/" + that.n + "/search");
      // window.location.href = "/search";
    });
    $(".city").on("click", function() {
      that.$router.push("/" + that.n + "/address");
      // window.location.href = "/address";
    });
    $("#w-esc").on("click", function() {
      $(".m-chang").hide();
      that.change = false;
    });
    $("#btn").on("click", function() {
      $(".m-chang").show();
      that.change = true;
    });
    $(".m-chang").on("click", function() {
      $(".m-chang").hide();
      that.change = false;
      that.succ = false;
    });
    // 接口验证码
    $(".t-b-btn2").on("click", function() {
      let check = that.check;
      if (!check) {
        $(".tishi").show();
        return;
      } else {
        $(".tishi").hide();
      }
      var phone = $(this)
        .prev()
        .prev()
        .prev()
        .val();
      var pattern_phone = /^1[3-9][0-9]{9}$/;
      if (phone == "") {
        $(".l-p").attr("placeholder", "手机号不能为空");
        return;
      } else if (!pattern_phone.test(phone)) {
        $(".l-p").val("");
        $(".l-p").attr("placeholder", "手机号码不合法");
        return;
      }
      $(".port1").attr("data-v", phone);
      let msg = { page: 2, position: "3", type: 6 };
      let city = localStorage.getItem("city");
      msg.city = city;
      msg.tel = phone;
      that.send(phone);
    });
    $(".port1").on("click", function() {
      var ma = $(this)
        .prev()
        .val();
      if (!ma) {
        $(this)
          .prev()
          .attr("placeholder", "验证码不能为空");
        return;
      }
      that.yan(ma);
    });
    $("#o_btn").on("click", function() {
      that.succ = false;
      $(".m-chang").hide();
    });
    $(".o-esc").on("click", function() {
      that.succ = false;
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
    price(val) {
      this.drawline();
    },
    mounth(val) {
      this.drawline();
    },
    nowHeight: function() {
      if (this.defaultHeight != this.nowHeight) {
        $(".weiter").css("top", "100px");
        $("#nav-list").css("top", "42%");
      } else {
        $(".weiter").css("top", "220px");
        $("#nav-list").css("top", "21%");
      }
    }
  }
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
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
  position: fixed;
  top:0;
  width: 100%;
  background-color: #fff;
  z-index: 100;
}

h3 img {
  position: absolute;
  width: 5%;
  margin-top: 14px;
  left: 5.33%;
}

.con {
  padding: 11px 15px;
  margin-top:44px;
}

.tishi {
  color: red;
  font-size: 10px;
  display: none;
}

.search {
  height: 38px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  padding: 10px 12px;
  margin-bottom: 25px;
}

.search .city {
  color: #80818b;
  font-size: 14px;
  margin-right: 13px;
}

.search .city i {
  font-size: 8px;
  margin-left: 6px;
}

.search #sea {
  height: 16px;
  color: #95969c;
  font-size: 14px;
  padding-left: 4.545%;
  border: 0;
  border-left: 0.5px solid #d5d5df;
  background-color: #fff;
  line-height: 16px;
}

.search #sea span {
  font-size: 15px;
  margin-right: 6px;
}

.price h5 {
  color: #2e3033;
  font-size: 17px;
  margin-bottom: 25px;
}

.price p.trend {
  color: #919499;
  font-size: 14px;
  margin-bottom: 18px;
  width: 95%;
}

.price p.trend::after {
  content: "";
  height: 0;
  clear: both;
  visibility: hidden;
  display: block;
}

.price p.trend i {
  font-style: normal;
  float: left;
}

.price p.trend span {
  float: right;
}

.price p.trend span strong {
  color: #2e3033;
  font-size: 20px;
}

.price p.trend .s2 {
  color: #2dd264;
}

.price p.trend .s3 {
  color: #ff6a48;
}
.price #pic {
  width: 100%;
  height: 200px;
  margin-top: 45px;
  margin-bottom: 28px;
}
.msg {
  position: relative;
  padding-left: 6%;
  color: #919499;
  font-style: 15px;
  margin-bottom: 24px;
}
.msg img {
  width: 5%;
  position: absolute;
  left: 0;
  top: 3px;
}
.con .price button {
  width: 100%;
  height: 44px;
  border-radius: 4px;
  background-color: #f2f4f7;
  color: #4db5ff;
  font-size: 16px;
  text-align: center;
  line-height: 44px;
  border: 0;
  margin-bottom: 34px;
}

/* 猜你喜欢 */
.guess h4 {
  color: #2e3033;
  font-size: 17px;
  margin-bottom: 14px;
  margin-left: 4%;
}
.recommen {
  padding: 0px 15px 25px 15px;
}
.recommen h4 {
  color: #303033;
  font-size: 17px;
  margin-bottom: 10px;
}
.recommen h4 span {
  color: #919499;
  font-size: 13px;
  float: right;
  font-weight: 500;
}
.recommen h4 span i {
  font-size: 14px;
  margin-right: 5px;
}
.recommen .re-con {
  margin-bottom: 25px;
}
.recommen .re-list {
  padding: 16px 0;
  border-bottom: 0.5px solid #f2f4f7;
}
.recommen .re-list::after {
  content: "";
  clear: both;
  height: 0;
  overflow: hidden;
  display: block;
  visibility: hidden;
}
.recommen .re-list .re-con-left {
  margin-right: 14px;
  position: relative;
  width: 30.667%;
  height: 84px;
  border-radius: 5px;
  float: left;
}
.recommen .re-list .re-con-left img {
  width: 100%;
  height: 84px;
  border-radius: 5px;
}
.recommen .re-list .re-con-left span {
  position: absolute;
  right: 3%;
  bottom: 1%;
  font-size: 10px;
  color: #ffffff;
}
.recommen .re-list .re-con-right {
  float: left;
  width: 60%;
  position: relative;
  top: -3px;
}
.recommen .re-list .re-con-right h5 {
  color: #2e3033;
  font-size: 17px;
  margin-bottom: 2px;
}
.recommen .re-list .re-con-right h5 span {
  width: 36px;
  height: 17px;
  border-radius: 2px;
  text-align: center;
  line-height: 17px;
  float: right;
  background-color: #e9f7ea;
  color: #2cd264;
  display: block;
  font-weight: 500;
  font-size: 11px;
}
.recommen .re-list .re-con-right .price {
  color: #fe582f;
  font-size: 12px;
  margin-bottom: 2px;
}
.recommen .re-list .re-con-right .price span {
  font-size: 18px;
}
.recommen .re-list .re-con-right .area {
  color: #919499;
  font-size: 12px;
  margin-bottom: 2px;
}
.recommen .re-list .re-con-right .area span {
  margin-right: 2%;
}
.recommen .re-list .re-con-right .tabs .strong {
  padding: 3px 7px;
  background-color: #ebf5fc;
  margin-right: 6px;
  color: #4db5ff;
  font-size: 11px;
}
.recommen .re-list .re-con-right .tabs span {
  padding: 3px 5px;
  background-color: #f7f8fa;
  color: #919499;
  font-size: 11px;
  margin-right: 6px;
}
.recommen .more-res {
  width: 100%;
  height: 44px;
  background-color: #f2f3f5;
  border-radius: 4px;
  color: #4db5ff;
  font-size: 16px;
  text-align: center;
  line-height: 44px;
  border: 0;
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
</style>