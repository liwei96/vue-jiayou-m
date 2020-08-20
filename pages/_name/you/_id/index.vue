<template>
  <div id="you">
    <nav>
      <img src="~/assets/tuan-you.jpg" alt />
      <div class="tar">
        <div class="left">
          <h5>
            已售：
            <span>{{saled_num}}</span>
            套&nbsp;&nbsp;距下一返期只差{{remain_num}}套
          </h5>
          <p>(每多5套可优惠1000元最高优惠5000元)</p>
        </div>
        <div class="right">
          <h5>距离活动结束</h5>
          <p>
            {{day}}天
            <span>{{hour}}:{{min}}:{{second}}</span>
          </p>
        </div>
      </div>
      <img src="~/assets/tuan-back.png" alt="" class="goback" @click="goback">
    </nav>
    <h4 class="tit">允家特推优惠房源，参团立享{{money}}元优惠金</h4>
    <div class="can">
      <h5>参团返现</h5>
      <ul class="can-con">
        <li :class="saled_num<=5?'active':''">
          累计售出(0-5)套可优惠1000元
          <span v-if="saled_num<=5">（已优惠)</span>
          <div class="out">
            <p class="in"></p>
          </div>
        </li>
        <li :class="saled_num<=10&&saled_num>=6?'active':''">
          累计售出(6-10)套可优惠2000元
          <span v-if="saled_num<=10&&saled_num>=6">（已优惠)</span>
          <div class="out">
            <p class="in"></p>
          </div>
        </li>
        <li :class="saled_num<=15&&saled_num>=11?'active':''">
          累计售出(11-15)套可优惠3000元
          <span v-if="saled_num<=15&&saled_num>=11">（已优惠)</span>
          <div class="out">
            <p class="in"></p>
          </div>
        </li>
        <li :class="saled_num<=20&&saled_num>=16?'active':''">
          累计售出(16-20)套可优惠4000元
          <span v-if="saled_num<=20&&saled_num>=16">（已优惠)</span>
          <div class="out">
            <p class="in"></p>
          </div>
        </li>
        <li :class="saled_num>=21?'active':''">
          累计售出21套可优惠5000元
          <span v-if="saled_num>=21">（已优惠)</span>
          <div class="out">
            <p class="in"></p>
          </div>
        </li>
      </ul>
    </div>
    <div class="huo">
      <h5>活动规则</h5>
      <p>1、本次团购活动以分档累计补发的方案执行，通过允家网站成交该项目</p>
      <p>2、结算时间：网签成功后次月20号发放。补发费用待该范 围内的最后一套网签成功后次月20号发放</p>
      <p>3、核算方式：由开发商或代理公司判定为允家平台客户即可 享受这个优惠</p>
      <p>4、结算方式：提供已实名的支付宝账户给与您对接的允家咨 询师，规定时间内会将优惠费用打至该账户</p>
      <p class="no">
        详细活动方案请致电允家客服电话：
        <span>{{tel}}</span>
      </p>
      <p>注：活动最终解释权归允家所有</p>
    </div>
    <div class="des">
      <h5>项目简介</h5>
      <p>
        {{flag!=1?introduce.substr(0,114):introduce}}
        <i v-if="flag!=1">...</i>
      </p>
      <p class="zhan" @click="flag=1" v-if="flag!=1">展开</p>
    </div>
    <div class="trend-con">
      <div class="swiper-container9">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(val,key) in last_tel" :key="key">{{val}} 参团立享优惠金1000元</div>
        </div>
      </div>
    </div>
    <div id="Footer">
        <p>杭州易得房科技有限公司版权所有 电话：400-718-6686</p>
        <p><img src="~/assets/f-logo.png">网络经营许可证：<a href="http://www.beian.miit.gov.cn/"><span>浙ICP备18057005号</span></a></p>
    </div>
    <div class="btn">
      <button @click="btn">立即报名</button>
    </div>
    <transition name="change">
      <div class="weiter ts" v-show="change">
        <div class="t-top">
          <h6>限时优惠</h6>
          <p>领取团购限时优惠！优惠编码将与您手机号绑定</p>
          <img id="w-esc" src="~/assets/tuan-x.png" @click="hides" alt />
        </div>
        <div class="t-bottom">
          <div class="t-b-first">
            <input class="l-p" type="tel" placeholder="输入预约手机号码" v-model="baoming" />
            <div class="w-mg">
              <input class="w-mg-c" type="checkbox" checked v-model="checks" />我已阅读并同意
              <!-- <router-link :to="'/'+jkl+'/server'"> -->
              <a :href="'/'+jkl+'/server'">《允家新房用户协议》</a>
              <!-- </router-link> -->
            </div>
            <p class="tishi">请勾选用户协议</p>
            <button class="t-b-btn t-b-btn2 bg_01" id="dingxue" @click="ding">立即订阅</button>
            <p class="w-tit">
              <img src="~/assets/tuan-tel.png" />允家严格保障您的信息安全
            </p>
          </div>
          <div class="t-b-second">
            <p>
              验证码已发送到
              <span id="ytel">187****4376</span>，请注意查看
            </p>
            <input type="tel" placeholder="请输入验证码" v-model="ma" class="yanzheng" id="ma-ll"/>
            <button class="port1" @click="yan">确定</button>
            <input type="hidden" id="building_name" value />
            <input type="hidden" value />
            <button class="t-b-scode" @click="again">获取验证码</button>
          </div>
        </div>
      </div>
    </transition>
    <div class="m-chang"></div>
    <transition name="fade">
      <div class="m-o-succ" v-show="succ">
        <img class="o-esc" src="~/assets/m-esc.png" alt @click="hides" />
        <img src="~/assets/m-success.png" alt class="o-success" />
        <p id="o_p">已成功参与活动！</p>
        <button id="o_btn" @click="hides">确定</button>
      </div>
    </transition>
  </div>
</template>
<script>
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
import { tuanmsg, msg, verification, tuandata } from "~/api/api";
export default {
  name: "you",
  async asyncData(context) {
    let jkl = context.store.state.cookie.pinyin;
    let id = context.params.id;
    let kid = context.store.state.cookie.kid ? context.store.state.cookie.kid : ''
    let other = context.store.state.cookie.other ? context.store.state.cookie.other : ''
    let [res] = await Promise.all([
      context.$axios
        .post("/api/group_buy/detail", { id: 2, project: id,kid:kid,other:other })
        .then(resp => {
          let data = resp.data.data;
          return data;
        })
    ]);
    return {
      jkl: jkl,
      introduce: res.introduce,
      last_tel: res.last_tel,
      end: res.end,
      begin: res.begin,
      endline: res.endline,
      tel: res.tel,
      money: res.money,
      saled_num: res.saled_num,
      remain_num: res.remain_num,
      title: res.title,
      flag: 100,
      succ: false,
      id: id
    };
  },
  data() {
    return {
      jkl: "",
      introduce: "",
      last_tel: "",
      end: "",
      begin: "",
      endline: "",
      tel: "",
      money: "",
      saled_num: "",
      remain_num: "",
      day: "",
      hour: "",
      min: "",
      second: "",
      flag: 100,
      checks: true,
      baoming: "",
      ma: "",
      change: false,
      id: ""
    };
  },
  head() {
    return {
      title: this.title || "允家新房"
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    // 倒计时
    countTime() {
      // 获取当前时间
      let date = new Date();
      let now = date.getTime();
      // 设置截止时间
      let endDate = new Date(this.endline.replace(/-/g, "/")); // this.curStartTime需要倒计时的日期
      let end = endDate.getTime();
      // 时间差
      let leftTime = end - now;
      // 定义变量 d,h,m,s保存倒计时的时间
      if (leftTime >= 0) {
        // 天
        let day = Math.floor(leftTime / 1000 / 60 / 60 / 24);
        this.day = day < 10 ? "0" + day : day;
        // 时
        let h = Math.floor((leftTime / 1000 / 60 / 60) % 24);
        this.hour = h < 10 ? "0" + h : h;
        // 分
        let m = Math.floor((leftTime / 1000 / 60) % 60);
        this.min = m < 10 ? "0" + m : m;
        // 秒
        let s = Math.floor((leftTime / 1000) % 60);
        this.second = s < 10 ? "0" + s : s;
      } else {
        this.day = 0;
        this.hour = "00";
        this.min = "00";
        this.second = "00";
      }
      // 等于0的时候不调用
      if (
        Number(this.hour) === 0 &&
        Number(this.day) === 0 &&
        Number(this.min) === 0 &&
        Number(this.second) === 0
      ) {
        return;
      } else {
        // 递归每秒调用countTime方法，显示动态时间效果,
        setTimeout(this.countTime, 1000);
      }
    },
    again() {
      let tel = this.baoming;
      let ip = ip_arr["ip"];
          // let ip = returnCitySN["cip"];
      let id = this.id;
      let data = { channel: 2, phone: tel, ip: ip };
      msg(data)
        .then(resp => {
          let code = resp.data.code;
          if (code == 200) {
            let city = localStorage.getItem("city");
            if (!city) {
              city = 1;
              localStorage.setItem("city", 1);
            }
            var time = 60;
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
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    yan() {
      let e = this.ma;
      if (!e) {
        $(".yanzheng").attr("placeholder", "验证码不能为空");
        return;
      }
      let tel = this.baoming;
      let that = this;

      verification({ phone: tel, code: e, channel: 2 })
        .then(resp => {
          if (resp.data.code == 200) {
            if (this.li == 1) {
              this.newimg = true;
            }
            that.change = false;
            that.succ = true;
          }else{
            $("#ma-ll").val('');
            $("#ma-ll").attr("placeholder", "验证码不正确");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    ding() {
      let check = this.checks;
      console.log(check);
      if (!check) {
        $(".tishi").show();
        return;
      } else {
        $(".tishi").hide();
      }

      var phone = this.baoming;
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

      this.send(phone);
    },
    hides() {
      $(".t-b-first").show();
      $(".t-b-second").hide();
      $(".m-chang").hide();
      this.change = false;
      this.succ = false;
    },
    btn() {
      $(".m-chang").show();
      this.change = true;
    },
    send(tel) {
      localStorage.setItem("phone", tel);
      let ip = ip_arr["ip"];
          // let ip = returnCitySN["cip"];
      let id = this.id;
      let data = { channel: 2, phone: tel, ip: ip };
      let kid = sessionStorage.getItem("kid");
      let other = sessionStorage.getItem("other");
      let city = localStorage.getItem("city1");
      let position= this.position
      tuanmsg({
        city: city,
        ip: ip,
        tel: tel,
        position: position,
        page: 3,
        project: id,
        remark: "团购2",
        kid: kid,
        other: other
      })
        .then(resp => {
          if (resp.data.code == 200) {
            msg(data)
              .then(resp => {
                let code = resp.data.code;
                if (code == 200) {
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
                }else{
            $('.l-p').val('')
            $(".l-p").attr("placeholder", "报名失败");
          }
              })
              .catch(error => {
                console.log(error);
              });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.baoming=localStorage.getItem('phone')
    this.countTime();
    let that = this;
    var mySwiper = new Swiper(".swiper-container9", {
      direction: "vertical", // 垂直切换选项
      autoplay: true,
      loop: true,
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true, //修改swiper的父元素时，自动初始化swiper
      slidesPerView: 3, //slide可见数量
      spaceBetween: 10 //slide之间的距离（单位px）
    });
    $(".m-chang").on("click", function() {
      $(".m-chang").hide();
      $(".t-b-first").show();
      $(".t-b-second").hide();
      that.change = false;
      that.succ = false;
      that.gui = false;
    });
  }
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
}
nav {
  position: relative;
}
nav img {
  width: 100%;
}
.tar {
  display: flex;
}
nav .left {
  width: 70%;
  height: 50px;
  background: linear-gradient(
    90deg,
    rgba(255, 133, 60, 1),
    rgba(255, 67, 47, 1)
  );
}
nav .goback{
  position: absolute;
  width:6%;
  top:6%;
  left:4%
}
.tar .left h5 {
  color: #fff;
  font-size: 14px;
  margin-left: 14px;
  margin-top: 3px;
}
.tar .left h5 span {
  font-size: 24px;
}
.tar .left p {
  margin-left: 14px;
  color: #fff;
  font-size: 10px;
}
.tar .right {
  height: 50px;
  width: 30%;
  background: rgba(248, 217, 110, 1);
  padding-left: 14px;
}
.tar .right h5 {
  color: #ff432f;
  font-size: 14px;
  margin-bottom: 6px;
  padding-top: 4px;
}
.tar .right span {
  font-size: 14px;
  color: #5e3a13;
  margin-left: 2px;
}
.tit {
  color: #121212;
  font-size: 20px;
  margin-top: 20px;
  padding: 0 4%;
  line-height: 30px;
  margin-bottom: 30px;
}
.can {
  padding: 0 4%;
  margin-bottom: 40px;
}
.can h5 {
  color: #121212;
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 24px;
}
.can ul li {
  height: 32.5px;
  border-left: 0.5px solid #ccc;
  color: #626266;
  font-size: 14px;
  line-height: 32.5px;
  padding-left: 22px;
  position: relative;
}
.can ul li .out {
  position: absolute;
  width: 12px;
  height: 12px;
  background: rgba(204, 204, 204, 0.47);
  border-radius: 50%;
  left: -6px;
  top: 50%;
  margin-top: -6px;
}
.can ul li .in {
  position: absolute;
  width: 8px;
  height: 8px;
  background: rgba(204, 204, 204, 1);
  border-radius: 50%;
  left: 50%;
  margin-left: -4px;
  top: 50%;
  margin-top: -4px;
}
.can ul li.active {
  border-left-color: #ff432f;
  color: #ff432f;
}
.can ul li.active .out {
  background: rgba(255, 67, 47, 0.47);
}
.can ul li.active .in {
  background: rgba(255, 67, 47, 1);
}
.huo {
  padding: 0 4%;
  margin-bottom: 40px;
}
.huo h5 {
  color: #121212;
  font-size: 17px;
  margin-bottom: 22px;
}
.huo p {
  color: #626266;
  font-size: 13px;
  margin-bottom: 18px;
}
.huo p.no {
  margin-bottom: 0;
}
.huo p span {
  color: #121212;
  font-weight: bold;
}
.des {
  padding: 0 4%;
  position: relative;
}
.des .zhan {
  position: absolute;
  right: 5%;
  bottom: 0;
  color: #6987b3;
  font-size: 14px;
  margin-bottom: 0;
}
.des h5 {
  color: #121212;
  font-size: 17px;
  margin-bottom: 14px;
}
.des p {
  color: #626266;
  font-size: 15px;
  line-height: 32px;
  margin-bottom: 28px;
}
.trend-con {
  height: 108px;
  overflow: hidden;
  padding-left: 4%;
  margin-bottom: 20px;
}
.swiper-slide {
  font-size: 15px;
  line-height: 36px;
}
.swiper-slide-active {
  color: #ff5650;
}
.swiper-slide-prev {
  color: #afafb3;
}
.swiper-slide-next {
  color: #626266;
}
.swiper-container9 {
  height: 108px;
}
.btn {
  width: 100%;
  height: 60px;
  box-shadow: 0px 0px 4.5px 0.5px rgba(0, 0, 0, 0.04);
  position: fixed;
  bottom: 0;
  background-color: #fff;
  z-index: 10;
}
.btn button {
  background-color: #ff5650;
  width: 92%;
  height: 48px;
  border-radius: 1px;
  margin-top: 6px;
  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 48px;
  border: 0;
}

.weiter {
  width: 80%;
  position: fixed;
  left: 10%;
  top: 220px;
  border-radius: 12px;
  z-index: 1001;
  background: linear-gradient(
    0deg,
    rgba(255, 133, 60, 1),
    rgba(255, 67, 47, 1)
  );
}

.weiter .t-top {
  width: 100%;
  height: 100px;
  border-radius: 12px 12px 0 0;
  padding-top: 30px;
}

.weiter .t-top h6 {
  color: #fff;
  font-size: 20px;
  text-align: center;
  margin-bottom: 14px;
  font-weight: bold;
}

.weiter .t-top p {
  color: #fff;
  font-size: 15px;
  margin: 0 18px;
}

.weiter .t-top #w-esc {
  position: absolute;
  right: 5%;
  top: 5%;
  width: 24px;
}

.weiter .t-bottom {
  width: 100%;
  height: 228px;
  border-radius: 0 0 12px 12px;
}

.weiter .t-bottom .t-b-first {
  height: 100%;
  display: block;
}
.weiter .t-bottom .t-b-first .w-tit {
  color: #fff;
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
  color: #fff;
}
.weiter .t-bottom .t-b-first .w-mg a {
  color: #fff;
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
  background: url(~assets/tuan-yes.png) no-repeat center;
  background-size: 90%;
}

.weiter .t-bottom .t-b-first button {
  width: 85%;
  height: 44px;
  border: 0;
  border-radius: 6px;
  color: #ff4a30;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
  margin-left: 7.5%;
  box-shadow: 0px 2.5px 6px 0px rgba(78, 169, 255, 0.3);
}

.weiter .t-bottom .t-b-first .bg_01 {
  background: linear-gradient(
    270deg,
    rgba(255, 213, 70, 1),
    rgba(255, 245, 107, 1)
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
  color: #fff;
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
    rgba(255, 213, 70, 1),
    rgba(255, 245, 107, 1)
  );
  color: #ff4a30;
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
.tishi {
  color: #fff;
  font-size: 10px;
  display: none;
}
#Footer {
  margin-bottom: 60px;
}
#Footer p{
  color:#929AA7;
  font-size: 12px;
  text-align: center;
  margin-bottom: 6px;
}
#Footer p img{
  width:6%;
  margin-right: 2%;
}
#Footer p a{
  color:#6A7B97;
  text-decoration: underline
}
</style>