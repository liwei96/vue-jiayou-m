<template>
  <div class="Count">
    <header>
      <img src="~/assets/return.png" @click="goback" />
      <ul id="nav">
        <li class="active" @click="t1s">
          商业贷款
          <i></i>
        </li>
        <li @click="t2s">
          公积金贷款
          <i></i>
        </li>
        <li style="margin-right: 0;" @click="t3s">
          组合贷款
          <i></i>
        </li>
      </ul>
    </header>
    <div class="con">
      <ul class="business" v-show="t1">
        <li>
          <span class="tit">计算方式</span>
          <input class="blue dai" type="radio" name="group4" checked value="2" />贷款总额
          <input
            class="blue price"
            type="radio"
            name="group4"
            style="margin-left: 9%;"
            value="1"
          />房价总额
        </li>
        <li class="f">
          <span class="tit">房价总额</span>
          <input type="text" value="0" />
          <span class="suffix">万</span>
        </li>
        <li class="f">
          <span class="tit">贷款比例</span>
          <span class="msg percentage">7成</span>
          <img src="~/assets/m-go.png" alt />
        </li>
        <li class="d">
          <span class="tit">贷款总额</span>
          <input type="text" value="0" />
          <span class="suffix">万</span>
        </li>
        <li>
          <span class="tit">贷款年限</span>
          <span class="msg year">30年</span>
          <img src="~/assets/m-go.png" alt />
        </li>
        <li>
          <span class="tit">商贷利率</span>
          <span class="msg loan">最新基准利率（4.75%）</span>
          <img src="~/assets/m-go.png" alt />
        </li>
      </ul>
      <ul class="fund" v-show="t2">
        <li>
          <span class="tit">计算方式</span>
          <input class="blue dai" type="radio" name="group5" checked value="2" />贷款总额
          <input
            class="blue price"
            type="radio"
            name="group5"
            style="margin-left: 9%;"
            value="1"
          />房价总额
        </li>
        <li class="f">
          <span class="tit">房价总额</span>
          <input type="text" value="0" />
          <span class="suffix">万</span>
        </li>
        <li class="f">
          <span class="tit">贷款比例</span>
          <span class="msg percentage">7成</span>
          <img src="~/assets/m-go.png" alt />
        </li>
        <li class="d">
          <span class="tit">公积金总额</span>
          <input type="text" value="0" />
          <span class="suffix">万</span>
        </li>
        <li>
          <span class="tit">公积金年限</span>
          <span class="msg year">30年</span>
          <img src="~/assets/m-go.png" alt />
        </li>
        <li>
          <span class="tit">公积金利率</span>
          <span class="msg benchmark">最新基准利率（3.25%）</span>
          <img src="~/assets/m-go.png" alt />
        </li>
      </ul>
      <ul class="combination" v-show="t3">
        <li>
          <span class="tit">计算方式</span>
          <input class="blue dai" type="radio" name="group6" checked value="2" />贷款总额
          <input
            class="blue price"
            type="radio"
            name="group6"
            style="margin-left: 9%;"
            value="1"
          />房价总额
        </li>
        <li class="f">
          <span class="tit">房价总额</span>
          <input type="text" value="0" />
          <span class="suffix">万</span>
        </li>
        <li class="f">
          <span class="tit">贷款比例</span>
          <span class="msg percentage">7成</span>
          <img src="~/assets/m-go.png" alt />
        </li>
        <li class="d">
          <span class="tit">贷款总额</span>
          <input type="text" value="0" />
          <span class="suffix">万</span>
        </li>
        <li class="g">
          <span class="tit">公积金贷款</span>
          <input type="text" value="0" />
          <span class="suffix">万</span>
        </li>
        <li>
          <span class="tit">公积金利率</span>
          <span class="msg benchmark">最新基准利率（3.25%）</span>
          <img src="~/assets/m-go.png" alt />
        </li>
        <li class="bus">
          <span class="tit">商业贷款</span>
          <input type="text" value="0" />
          <span class="suffix">万</span>
        </li>
        <li class="busrate">
          <span class="tit">商业利率</span>
          <span class="msg loan">最新基准利率（4.75%）</span>
          <img src="~/assets/m-go.png" alt />
        </li>
        <li>
          <span class="tit">公积金年限</span>
          <span class="msg year">30年</span>
          <img src="~/assets/m-go.png" alt />
        </li>
        <li>
          <span class="tit">商业年限</span>
          <span class="msg years">30年</span>
          <img src="~/assets/m-go.png" alt />
        </li>
      </ul>
      <button id="sum">开始计算</button>
      <p class="mark">
        <span>注：</span>
        <span class="mark-con">本次计算仅作为参考,实际情况了解更精确首付,贷款方案,建议咨询置业顾问</span>
      </p>
      <div class="peo">
        <img src="~/assets/people.png" alt />
        <div class="peo-con">
          <h6>
            李晓峰
            <span>允家分析师</span>
          </h6>
          <p class="ping">评分 5.0</p>
          <p class="peo-msg">咨询我了解更多楼盘首付和贷款方案</p>
          <img class="inf p1" src="~/assets/inf.png" alt />
          <a :href="'tel:'+call">
            <img class="tel" src="~/assets/redtel.png" alt />
          </a>
        </div>
      </div>
    </div>
    <div class="zhao"></div>
    <div class="fund-tan t1">
      <h5>
        公积金利率
        <span>确定</span>
      </h5>
      <ul class="tan">
        <li
          :class="g1==key?'focus':''"
          v-for="(item,key) in fund_rate"
          :key="key"
          :data-v="item"
          @click="gon"
          :data-k="key"
        >最新基准利率（{{item}}%）</li>
      </ul>
    </div>
    <div class="fund-tan t2">
      <h5>
        选择贷款利率
        <span>确定</span>
      </h5>
      <ul class="tan">
        <li
          :class="b1==key?'focus':''"
          v-for="(item,key) in business_rate"
          :key="key"
          :data-v="item"
          :data-k="key"
          @click="getbus($event)"
        >最新基准利率（{{item}}%）</li>
      </ul>
    </div>
    <div class="fund-tan t3">
      <h5>
        选择贷款年限
        <span>确定</span>
      </h5>
      <ul class="tan">
        <li
          :class="y1==key?'focus':''"
          v-for="(item,key) in year"
          :key="key"
          :data-v="item"
          :data-k="key"
          @click="getyear($event)"
        >{{item}}年</li>
      </ul>
    </div>
    <div class="fund-tan t5">
      <h5>
        选择贷款年限
        <span>确定</span>
      </h5>
      <ul class="tan">
        <li
          :class="y1==key?'focus':''"
          v-for="(item,key) in year"
          :key="key"
          :data-v="item"
          :data-k="key"
          @click="getyears($event)"
        >{{item}}年</li>
      </ul>
    </div>
    <div class="fund-tan t4">
      <h5>
        选择贷款比例
        <span>确定</span>
      </h5>
      <ul class="tan">
        <li
          :class="d1==key?'focus':''"
          v-for="(item,key) in loan_ratio"
          :key="key"
          :data-v="item"
          :data-k="key"
          @click="t4s($event)"
        >{{item}}成</li>
      </ul>
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
            <input class="l-p" type="text" placeholder="输入预约手机号码" checked/>
            <p class="w-mg">
              <input class="w-mg-c" type="checkbox" checked v-model="checks"/>我已阅读并同意
              <router-link :to="'/'+n+'/server'">
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
import footView from "@/components/Foot.vue";
import { ip, count_data, msg, verification, trend_put } from "~/api/api";
export default {
  name: "Count",
  asyncData (context) {
    let jkl = context.store.state.cookie.pinyin;
    return {
      jkl:jkl
    }
  },
  data() {
    return {
      change: false,
      succ: false,
      defaultHeight: "0",
      nowHeight: "0",
      t1: true,
      t2: false,
      t3: false,
      year: [],
      loan_ratio: [],
      fund_rate: [],
      discounts: [],
      business_rate: [],
      ip: "",
      n1: "",
      n2: "",
      n3: "",
      n4: "",
      call: "",
      y: "30",
      years: "30",
      y1: "",
      d1: "",
      dai: "7",
      b1: "",
      bus: "4.75",
      g1: "",
      gong: "3.25",
      n:'',
      checks:'',
      jkl:''
    };
  },
  components: {
    "foot-view": footView
  },
  methods: {
    t1s() {
      this.t1 = true;
      this.t2 = false;
      this.t3 = false;
    },
    t2s() {
      this.t2 = true;
      this.t1 = false;
      this.t3 = false;
    },
    t3s() {
      this.t1 = false;
      this.t2 = false;
      this.t3 = true;
    },
    start() {
      let that = this;
      this.n=this.$route.params.name
      this.call = localStorage.getItem("call");
      ip()
        .then(resp => {
          that.ip = resp.data.data[0].origip;
        })
        .catch(error => {
          console.log(error);
        });
      count_data()
        .then(resp => {
          let data = resp.data.data;
          that.year = data.years;
          that.loan_ratio = data.loan_ratio;
          that.fund_rate = data.fund_rate;
          that.business_rate = data.business_rate;
          that.discounts = data.discounts;
        })
        .catch(error => {
          console.log(error);
        });
    },
    t4s(e) {
      this.dai = e.target.getAttribute("data-v");
      this.d1 = e.target.getAttribute("data-k");
    },
    sendmsg(t) {
      this.phone = t;
      let that = this;
      msg({ phone: t, channel: 2 })
        .then(resp => {
          if (resp.data.code == 200) {
            let ip = that.ip;
            let c = localStorage.getItem("city");
            let p = that.page;
            let kid = sessionStorage.getItem("kid");
            let other = sessionStorage.getItem("other");
            trend_put({
              ip: ip,
              tel: t,
              city: c,
              position: 5,
              page: 2,
              type: 9,
              kid:kid,
              other:other
            })
              .then(resp => {})
              .catch(error => {
                console.log(error);
              });
            $(".t-b-first").hide();
            $(".t-b-second").show();
            var time = 60;
            var tel = t.substr(0, 3) + "****" + t.substr(7, 11);
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
            $("#ytel").html(tel);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    check(m) {
      let tel = this.phone;
      let that = this;
      verification({ phone: tel, code: m, channel: 2 })
        .then(resp => {
          if (resp.data.code == 200) {
            that.change=false;
            that.succ=true;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    
    getyear(e) {
      let y = e.target.getAttribute("data-v");
      this.y = y;
      this.y1 = e.target.getAttribute("data-k");
    },
    getyears(e) {
      let y = e.target.getAttribute("data-v");
      this.years = y;
      this.y1 = e.target.getAttribute("data-k");
    },
    getbus(e) {
      let y = e.target.getAttribute("data-v");
      this.bus = y;
      this.b1 = e.target.getAttribute("data-k");
    },
    gon(e) {
      let y = e.target.getAttribute("data-v");
      this.gong = y;
      this.g1 = e.target.getAttribute("data-k");
    },
    goback(){
      this.$router.go(-1)
    }
  },
  mounted() {
    $("#Foot").css({ position: "relative", bottom: "0", width: "100%" });
    let that = this;
    this.start();
    $(".dai").on("click", function() {
      $(".f").hide();
    });
    $(".price").on("click", function() {
      $(".f").show();
    });
    $("#nav li").on("click", function() {
      let txt = $(this).text();
      if (txt == "商业贷款") {
        $(".business").show();
        $(".fund").hide();
        $(".combination").hide();
      } else if (txt == "公积金贷款") {
        $(".business").hide();
        $(".fund").show();
        $(".combination").hide();
      } else if (txt == "组合贷款") {
        $(".combination").show();
        $(".business").hide();
        $(".fund").hide();
      }
      $(this)
        .addClass("active")
        .siblings("li")
        .removeClass("active");
    });
    $(".tan li").on("click", function() {
      $(this)
        .addClass("focus")
        .siblings("li")
        .removeClass("focus");
    });
    $(".loan").on("click", function() {
      $(".zhao").show();
      $(".t2").show();
    });
    $(".year").on("click", function() {
      $(".zhao").show();
      $(".t3").show();
    });
    $(".years").on("click", function() {
      $(".zhao").show();
      $(".t5").show();
    });
    $(".percentage").on("click", function() {
      $(".zhao").show();
      $(".t4").show();
    });
    $(".benchmark").on("click", function() {
      $(".zhao").show();
      $(".t1").show();
    });
    $(".zhao").on("click", function() {
      $(".t1").hide();
      $(".t2").hide();
      $(".t3").hide();
      $(".t4").hide();
      $(".t5").hide();
      $(this).hide();
    });
    $(".fund-tan span").on("click", function() {
      $(this)
        .parent()
        .parent()
        .hide();
      $(".zhao").hide();
      let y = that.y;
      $(".year").html(y + "年");
      let y1 = that.years;

      $(".years").html(y1 + "年");
      let d = that.dai;
      $(".percentage").html(d + "成");
      let b = that.bus;
      $(".loan").html(`最新基准利率（${b}%）`);
      let g = that.gong;
      $(".benchmark").html(`最新基准利率（${g}%）`);
    });

    $(".p1").on("click", function() {
      that.change=true;
      $(".m-chang").show();
    });
    $(".m-chang").on("click", function() {
      $(".m-chang").hide();
      that.change=false;
      that.succ=false;
    });
    // 接口验证码
    $(".t-b-btn2").on("click", function() {
      let check=that.checks;
      if(!check){
        $('.tishi').show();
      }else{
        $('.tishi').hide();
      }
      var phone = $(this)
        .prev()
        .prev()
        .prev()
        .val();
      var type = $(this)
        .parent()
        .parent()
        .prev()
        .find("h6")
        .html();
      var building_name = $(this)
        .parent()
        .next()
        .find("#building_name")
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
      that.sendmsg(phone);
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
      that.check(ma);
    });
    $("#o_btn").on("click", function() {
      that.succ=false
      $(".m-chang").hide();
    });
    $(".o-esc").on("click", function() {
      that.succ=false
      $(".m-chang").hide();
    });
    $(".con-msg").on("click", function() {
      that.$router.push('/'+that.n+"/count")
      // window.location.href = "/count";
    });
    $("#sum").on("click", function() {
      let msg = {};
      if (that.t1) {
        let type = $(".business .blue:radio:checked").val();
        msg.method = type;
        msg.type = 2;
        let total = 0;
        msg.year = that.y;
        msg.interest_rate = that.bus;
        if (type == 1) {
          total = $(".business .f input").val();
          msg.house_price = total;
          msg.rate = that.dai;
          msg.loan = $(".business .d input").val();
        } else {
          msg.loan = $(".business .d input").val();
        }
        msg.payway = 1;
        $cookies.set("sum", msg, 60);
        // window.location.href = '/'+that.n+"/countdetail";
        that.$router.push('/'+that.n+"/countdetail")
      } else if (that.t2) {
        let type = $(".fund .blue:radio:checked").val();
        msg.method = type;
        msg.type = 1;
        let total = 0;
        msg.year = that.y;
        msg.fund_interest_rate = that.gong;
        if (type == 1) {
          total = $(".fund .f input").val();
          msg.house_price = total;
          msg.rate = that.dai;
          msg.loan = $(".fund .d input").val();
        } else {
          msg.loan = $(".fund .d input").val();
        }
        msg.payway = 1;
        $cookies.set("sum", msg, 60);
        that.$router.push('/'+that.n+"/countdetail")
        // window.location.href = '/'+that.n+"/countdetail";
      } else {
        let type = $(".combination .blue:radio:checked").val();
        msg.method = type;
        msg.type = 3;
        let total = 0;
        msg.fund_year = that.y;
        msg.business_year = that.years;
        msg.fund_interest_rate = that.gong;
        msg.business_interest_rate = that.bus;
        if (type == 1) {
          total = $(".combination .f input").val();
          msg.house_price = total;
          msg.rate = that.dai;
          msg.loan = $(".combination .d input").val();
          msg.loan_fund = $(".combination .g input").val();
          msg.loan_business = $(".combination .bus input").val();
        } else {
          msg.loan = $(".combination .d input").val();
          msg.loan_fund = $(".combination .g input").val();
          msg.loan_business = $(".combination .bus input").val();
        }
        msg.payway = 1;
        $cookies.set("sum", msg, 60);
         that.$router.push('/'+that.n+"/countdetail")
        // window.location.href = '/'+that.n+"/countdetail";
      }
    });
    $("#w-esc").on("click", function() {
      $(".m-chang").hide();
      that.change = false;
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
    nowHeight: function() {
      if (this.defaultHeight != this.nowHeight) {
          $('.weiter').css('top','100px')
          $('#nav-list').css('top','42%')
      }else{
          $('.weiter').css('top','220px')
          $('#nav-list').css('top','21%')
      }
    }
  }
};
</script>
<style scoped>
@import url("~static/css/only.css");
* {
  padding: 0;
  margin: 0;
}
.Count{
  overflow: hidden;
}
li {
  list-style: none;
}
.tishi{
  color:red;
  font-size: 10px;
  display: none;
}
.peo{
  overflow: hidden;
}
header {
  width: 100%;
  height: 48px;
  border-bottom: 0.5px solid #f7f7f7;
}
header img {
  width: 4.4%;
  margin-left: 6.6667%;
  margin-top: 16px;
  float: left;
  margin-right: 5.6667%;
}
header ul {
  display: inline-block;
  height: 48px;
  line-height: 48px;
  width: 80%;
}
header ul li {
  float: left;
  color: #919499;
  font-size: 16px;
  margin-right: 9.6%;
}
header ul li.active {
  color: #2e3033;
  font-size: 16px;
  position: relative;
}
header ul li.active i {
  width: 25px;
  height: 2.5px;
  background-color: #40a2f4;
  position: absolute;
  bottom: 4px;
  left: 50%;
  margin-left: -12.5px;
}

.con {
  padding: 0 4%;
}
.con .f {
  display: none;
}
.con ul {
  margin-bottom: 40px;
}
.con ul li {
  width: 100%;
  border-bottom: 1px solid #f5f5f7;
  height: 50px;
  line-height: 50px;
  color: #919499;
  font-size: 15px;
}
.con ul li .tit {
  color: #2e3033;
  font-size: 15px;
  margin-right: 16%;
  font-weight: bold;
  display: inline-block;
  width: 22%;
}
.con ul li input[type="radio"] {
  width: 16px;
  height: 16px;
  margin: 0;
  margin-bottom: 8px;
  margin-right: 2px;
}
input[type="checkbox"].blue,
input[type="radio"].blue {
  border: 1px solid #2196f3;
}
.con ul li input[type="radio"]:before {
  width: 9px;
  margin-top: 2px;
  margin-left: 2.3px;
}
.con ul li .suffix {
  float: right;
}
.con ul li input[type="text"] {
  border: 0;
  background-color: #fff;
  height: 49px;
  line-height: 50px;
  color: #919499;
  font-size: 15px;
  width: 40%;
}
.con ul li .btn {
  display: inline-block;
  width: 55%;
}
.con ul li .msg {
  color: #919499;
  font-size: 15px;
  display: inline-block;
  width: 50%;
}
.con ul li img {
  width: 6%;
  float: right;
  margin-top: 15px;
}
.con button {
  width: 100%;
  height: 44px;
  background: linear-gradient(
    270deg,
    rgba(102, 207, 255, 1),
    rgba(76, 181, 255, 1)
  );
  border-radius: 4px;
  text-align: center;
  line-height: 44px;
  border: 0;
  color: #fff;
  font-size: 16px;
  margin-bottom: 54px;
}
.con .mark {
  color: #919499;
  font-size: 15px;
  margin-bottom: 35px;
  background-color: #fff;
}
.con .mark::after {
  content: "";
  height: 0;
  clear: both;
  visibility: hidden;
  display: block;
}
.con .mark span {
  display: inline-block;
  float: left;
}
.con .mark .mark-con {
  width: 90%;
}

.con .peo img {
  width: 14.93%;
  float: left;
  margin-right: 4.5%;
  padding-bottom: 20px;
}
.con .peo .peo-con {
  float: left;
  position: relative;
  width: 80%;
  margin-bottom: 40px;
}
.con .peo .peo-con h6 {
  color: #2e3033;
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 8px;
}
.con .peo .peo-con h6 span {
  width: 60px;
  height: 18px;
  display: inline-block;
  background-color: #f2f4f7;
  text-align: center;
  line-height: 18px;
  color: #4db5ff;
  font-size: 11px;
  margin-left: 10px;
}
.con .peo .peo-con .ping {
  color: #5e6166;
  font-size: 15px;
  margin-bottom: 12px;
}
.con .peo-msg {
  color: #919499;
  font-size: 15px;
}
.con .peo .inf {
  width: 19.33%;
  position: absolute;
  top: 0;
  right: 27.9%;
}
.con .peo .tel {
  width: 19.3%;
  position: absolute;
  top: 0;
  right: 0;
}

/* 弹框 */
.zhao {
  width: 100%;
  height: 1000px;
  background-color: #000;
  opacity: 0.4;
  position: fixed;
  top: 0;
  display: none;
}
.fund-tan {
  width: 100%;
  display: none;
  position: fixed;
  bottom: 0;
  background-color: #fff;
}
.fund-tan h5 {
  height: 50px;
  text-align: center;
  line-height: 50px;
  color: #2e3033;
  font-size: 16px;
  position: relative;
  border-bottom: 0.5px solid #f0f0f2;
}
.fund-tan h5 span {
  color: #4db5ff;
  font-size: 16px;
  position: absolute;
  right: 6.667%;
  top: 0;
}
.fund-tan ul {
  padding: 10px 0;
  height: 200px;
  overflow: auto;
}
.fund-tan ul li {
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #919499;
}
.fund-tan ul li.focus {
  background-color: #f0f0f2;
  color: #5e6166;
}

.weiter {
  /* display: none; */
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

.weiter .t-bottom .t-b-first .w-mg-c:before{
  display: none;
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
  /* display: none; */
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