<template>
  <div id="Tuan">
    <div class="header">
      <img src="~/assets/content-logo.png" alt />
    </div>
    <div class="swp" v-if="tu">
      <slide-verify
        :l="20"
        :r="5"
        :w="240"
        :h="160"
        :imgs="imgs"
        @success="onSuccess"
        @fail="onFail"
        @refresh="onRefresh"
        :slider-text="text"
      ></slide-verify>
    </div>
    <div class="top">
      <div class="top-img">
        <img :src="img" alt />
      </div>
      <div class="des" v-html="description"></div>
    </div>
    <div class="line"></div>
    <div class="pin" v-cloak>
      <nav>
        <h3>拼团优惠</h3>
        <p>
          距离活动结束
          <span>{{day}}</span>天
          <span>{{hour}}</span>:
          <span>{{min}}</span>:
          <span>{{second}}</span>
        </p>
      </nav>
      <img src="~/assets/tuan-pin.png" alt />
      <div class="pin-bao" @click="xiang" v-if="!newimg">立享优惠</div>
      <img src="~/assets/tuna-hased.png" alt class="hased" v-if="newimg" />
      <div class="bom">
        <div class="trend-con">
          <div class="swiper-container9">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(trend,key) in last_tel" :key="key">{{trend}}领取了优惠券</div>
            </div>
          </div>
        </div>
        <p>
          已有
          <span>{{participate_num}}</span>人领取了优惠券
        </p>
      </div>
    </div>
    <div class="line"></div>
    <div class="tui">
      <nav>
        <h3>拼团优惠</h3>
        <button @click="showgui">活动规则</button>
      </nav>
      <div class="con">
        <div class="contanter" v-for="(val,key) in cons" :key="key">
          <div class="con-top">
            <router-link :to="'/hangzhou/content/'+val.id">
              <div class="top-left">
                <div class="left-img">
                  <span>团购优惠</span>
                  <img :src="val.img" alt />
                </div>

                <p>已售{{val.saled_num}}套</p>
              </div>
            </router-link>
            <div class="top-right">
              <h4>
                {{val.name}}
                <p>{{val.type}}</p>
              </h4>
              <h5>
                <span>{{val.price}}</span>元/m²起
              </h5>
              <p>
                {{val.country}}&nbsp;|&nbsp;{{val.area_min}}-{{val.area_max}}m²
                <span
                  v-if="val.distance"
                >
                  <img src="~/assets/tuan-ju.png" alt />
                  {{val.distance}}m
                </span>
              </p>
              <p class="te">
                特色：{{flag!=key?val.content.substr(0,26):val.content}}
                <i v-if="flag!=key">...</i>
              </p>
              <span class="zhan" v-if="flag!=key" @click="showmore(key)">展开</span>
            </div>
          </div>
          <div class="con-bom">
            <div class="trend-con">
              <div class="swiper-container9">
                <div class="swiper-wrapper">
                  <div
                    class="swiper-slide"
                    v-for="(trend,key) in val.saled_phones"
                    :key="key"
                  >{{trend}}优惠1000元</div>
                </div>
              </div>
            </div>
            <button @click="to(val.id)">立享优惠</button>
            <button @click="btn(val.id)">咨询底价</button>
          </div>
        </div>
      </div>
    </div>
    <div id="Footer">
      <p>杭州易得房科技有限公司版权所有 电话：400-966-9995</p>
      <p>
        <img src="~/assets/f-logo.png" />网络经营许可证：
        <a href="http://www.beian.miit.gov.cn/">
          <span>浙ICP备18057005号</span>
        </a>
      </p>
    </div>
    <div class="tuan-tel">
      <a href="tel:400-966-9995">
        <img src="~/assets/tuan-tel1.png" alt />
      </a>
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
            <input type="tel" placeholder="请输入验证码" v-model="ma" class="yanzheng" />
            <button class="port1" @click="yan">确定</button>
            <input type="hidden" id="building_name" value />
            <input type="hidden" value />
            <button class="t-b-scode" @click="again">获取验证码</button>
          </div>
        </div>
      </div>
    </transition>
    <div class="m-chang"></div>
    <transition name="change">
      <div class="guizhe" v-show="gui">
        <h4>活动规则</h4>
        <img src="~/assets/w-del.png" alt @click="hidegui" />
        <p>1、本次团购活动以分档累计补发的方案执行，通过允家网站成交该项目</p>
        <p>2、结算时间：网签成功后次月20号发放。补发费用待该范围内的最后一套网签成功后次月20号发放</p>
        <p>3、核算方式：由开发商或代理公司判定为允家平台客户即可享受这个优惠</p>
        <p>4、结算方式：提供已实名的支付宝账户给与您对接的允家咨询师，规定时间内会将优惠费用打至该账户</p>
        <p>
          详细活动方案请致电允家客服电话：
          <span>400-966-9995</span> 注：活动最终解释权归允家所有
        </p>
      </div>
    </transition>
    <transition name="fade">
      <my-loading v-if="load"></my-loading>
    </transition>
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
import img1 from '~/assets/lou1.png';
import img2 from '~/assets/lou2.png';
import Loading from "@/components/loading.vue";
import { tuanmsg, msg, verification, tuandata } from "~/api/api";
export default {
  name: "Tuan",
  components: {
    "my-loading": Loading
  },
  async asyncData(context) {
    let jkl = context.store.state.cookie.pinyin;
    let [res, res1] = await Promise.all([
      context.$axios.post("/api/group_buy/first", { id: 2 }).then(resp => {
        let data = resp.data;
        return data;
      }),
      context.$axios
        .post("/api/group_buy/info", { id: 2, page: 1, limit: 5 })
        .then(resp => {
          let data = resp.data.data;
          return data;
        })
    ]);
    return {
      jkl: jkl,
      title: res.data.title,
      description: res.data.description,
      img: res.data.img,
      tel: res.data.tel,
      participate_num: res.data.participate_num,
      last_tel: res.data.last_tel,
      end: res.data.end,
      begin: res.data.begin,
      city: res.data.city,
      endline: res.data.endline,
      open: res.open,
      cons: res1,
      flag: 100
    };
  },
  data() {
    return {
      imgs:[img1,img2],
      text: "向右滑",
      msg: "",
      jkl: "",
      title: "",
      description: "",
      img: "",
      tel: "",
      participate_num: 0,
      last_tel: [],
      end: "",
      begin: "",
      city: 1,
      endline: "",
      day: "",
      hour: "",
      min: "",
      second: "",
      cons: [],
      flag: 100,
      change: false,
      checks: true,
      succ: false,
      baoming: "",
      id: "",
      ma: "",
      page: 2,
      ting: true,
      li: 0,
      newimg: false,
      gui: false,
      load: true,
      open: 0,
      tu: false,
      position:''
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          name: "description",
          content: this.description
        }
      ]
    };
  },
  methods: {
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
    showmore(key) {
      this.flag = key;
    },
    hides() {
      $(".m-chang").hide();
      $(".t-b-first").show();
      $(".t-b-second").hide();
      this.change = false;
      this.succ = false;
      this.tu = false;
    },
    send(tel) {
      localStorage.setItem("phone", tel);
      let ip = returnCitySN["cip"];
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
                }
              })
              .catch(error => {
                console.log(error);
              });
          }else{
            $('.l-p').val('')
            $(".l-p").attr("placeholder", "报名失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    ding() {
      let check = this.checks;
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
      console.log(this.open);
      if (this.open == 1) {
        this.tu = true;
      } else {
        this.send(phone);
      }
    },
    btn(id) {
      $(".m-chang").show();
      this.change = true;
      this.id = id;
      this.position= 23;
    },
    again() {
      let tel = this.baoming;
      let ip = returnCitySN["cip"];
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
    xiang() {
      this.li = 1;
      this.position=22
      $(".m-chang").show();
      this.change = true;
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
        .then(resp => {
          if (resp.data.code == 200) {
            if (this.li == 1) {
              this.newimg = true;
              localStorage.setItem("newimg", true);
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
    getmore() {
      let page = this.page;
      this.ting = false;
      tuandata({ id: 2, page: page, limit: 5 })
        .then(res => {
          this.page = page + 1;
          this.ting = true;
          let data = res.data.data;
          if (data.length == 0) {
            that.ting = false;
          }
          let l = this.cons.concat(data);
          this.cons = l;
        })
        .catch(error => {
          console.log(error);
        });
    },
    scroll() {
      var scrollTop = window.scrollY;
      var scrollHeight = window.screen.availHeight;
      var windowHeight = document.body.scrollHeight;
      // console.log(scrollTop, scrollHeight, windowHeight);
      if (scrollTop + scrollHeight >= windowHeight) {
        if (this.ting) {
          this.getmore();
        }
      }
    },
    showgui() {
      this.gui = true;
      $(".m-chang").show();
    },
    hidegui() {
      this.gui = false;
      $(".m-chang").hide();
    },
    to(id) {
      this.$router.push("/hangzhou/you/" + id);
    },
    onSuccess() {
      var phone = this.baoming;
      this.send(phone);
      this.tu = false;
    },
    onFail() {
      this.msg = "";
    },
    onRefresh() {
      this.msg = "";
    }
  },
  mounted() {
    if (process.server == false) {
      let that = this;
      setTimeout(function() {
        that.load = false;
      }, 100);
      this.baoming = localStorage.getItem("phone");
      this.newimg = localStorage.getItem("newimg");
      let url = window.location.href;
      url = url.split("?")[1];
      if (url) {
        url = url.split("&");
        let kid = url[0].split("=")[1];
        let other = url[1].split("=")[1];
        sessionStorage.setItem("kid", kid);
        sessionStorage.setItem("other", other);
      }
      let city = this.city;
      localStorage.setItem("city1", city);
      this.countTime();
      window.addEventListener("scroll", this.scroll);
      var mySwiper = new Swiper(".swiper-container9", {
        direction: "vertical", // 垂直切换选项
        autoplay: true,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true //修改swiper的父元素时，自动初始化swiper
      });
      // $("#w-esc").on("click", function() {
      //   $(".m-chang").hide();
      //   that.change = false;
      // });

      $(".m-chang").on("click", function() {
        $(".t-b-first").show();
        $(".t-b-second").hide();
        $(".m-chang").hide();
        that.change = false;
        that.succ = false;
        that.gui = false;
        that.tu = false;
      });

      $("#o_btn").on("click", function() {
        that.succ = false;
        $(".m-chang").hide();
      });
      $(".o-esc").on("click", function() {
        that.succ = false;
        $(".m-chang").hide();
      });
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scroll);
  },
  watch: {
    cons(val) {
      setTimeout(function() {
        var mySwiper = new Swiper(".swiper-container9", {
          direction: "vertical", // 垂直切换选项
          autoplay: true,
          observer: true, //修改swiper自己或子元素时，自动初始化swiper
          observeParents: true //修改swiper的父元素时，自动初始化swiper
        });
      }, 300);
    }
  }
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
}
html,
body {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
  overflow-y: auto;
}

[v-cloak] {
  display: none;
}
.swp {
  position: fixed;
  left: 18%;
  top: 40%;
  z-index: 1002;
  background-color: #fff;
}
.swp .slide-verify {
  width: 240px;
}
.swp >>> .slide-verify-slider {
  width: 100%;
  height: 30px;
  margin-top: 0;
  line-height: 30px;
}
.swp >>> .slide-verify-slider .slide-verify-slider-mask-item {
  width: 29px;
  height: 29px;
}
.swp >>> .slide-verify-slider-mask {
  height: 29px !important;
}
.swp >>> .slide-verify-slider-mask-item-icon {
  top: 10px;
  left: 6px;
}

.header {
  height: 44px;
  width: 100%;
}
.header img {
  width: 14%;
  margin-top: 2.6%;
  margin-left: 43%;
}
.top-img img {
  width: 100%;
}
.tuan-tel {
  position: fixed;
  right: 0;
  bottom: 10vh;
  width: 70px;
  height: 50px;
  border-radius: 25px 0px 0px 25px;
  background-color: #fff;
  z-index: 10;
  box-shadow: 0px 0px 5px 0.5px rgba(54, 140, 255, 0.16);
}
.tuan-tel img {
  width: 40px;
  margin-top: 5px;
  margin-left: 5px;
}
.des {
  padding: 18px 4%;
  color: #626266;
  font-size: 14px;
}
.des >>> p {
  margin: 0;
}
.guizhe {
  position: fixed;
  width: 80%;
  background-color: #fff;
  left: 10%;
  top: 27vh;
  height: 350px;
  z-index: 1001;
  border-radius: 10px;
}
.guizhe h4 {
  color: #27282b;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  padding-top: 24px;
  margin-bottom: 22px;
}
.guizhe p {
  color: #626266;
  font-size: 12px;
  padding: 0 20px;
  margin-bottom: 14px;
}
.guizhe p span {
  font-weight: bold;
}
.guizhe img {
  position: absolute;
  top: 18px;
  right: 16px;
  width: 14px;
}
.swiper-wrapper {
  display: block !important;
}
.line {
  width: 100%;
  height: 10px;
  background: rgba(247, 247, 247, 1);
}
.pin {
  padding: 20px 0 10px 0;
  position: relative;
}
.pin nav {
  padding: 0 4%;
}
.pin nav h3 {
  float: left;
  color: #121212;
  font-size: 17px;
  padding-left: 6px;
  border-left: 2.5px solid #3eacf0;
  font-weight: bold;
}
.pin nav p {
  float: right;
  color: #646466;
  font-size: 13px;
}
.pin nav p span {
  color: black;
  font-size: 13px;
  font-weight: bold;
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-left: 4px;
  margin-right: 4px;
  background: #d6d6d6;
  border-radius: 2px;
  text-align: center;
  line-height: 20px;
  margin-bottom: 10px;
}
.pin-bao {
  position: absolute;
  width: 44.4px;
  height: 44.4px;
  background: linear-gradient(
    -90deg,
    rgba(255, 133, 60, 1),
    rgba(255, 67, 47, 1)
  );
  border-radius: 5px;
  color: #fff;
  font-size: 13px;
  word-wrap: break-word;
  padding: 6px 8px 0 8px;
  right: 10%;
  top: 40%;
}
.pin img {
  width: 100%;
  margin-bottom: 10px;
}
.pin .bom {
  padding: 0 4%;
}
.trend-con {
  display: inline-block;
  line-height: 20px;
  width: 47%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 20px;
  font-size: 12px;
  color: #ff5650;
}
.trend-con .swiper-container9 {
  height: 20px;
}
.pin .hased {
  position: absolute;
  width: 14%;
  top: 39%;
  right: 9%;
}
.pin .bom p {
  float: right;
  color: #646466;
  font-size: 13px;
}
.pin .bom p span {
  color: #fe582f;
}

.tui {
  padding: 20px 4%;
}
.tui nav {
  overflow: hidden;
}
.tui nav h3 {
  float: left;
  color: #121212;
  font-size: 17px;
  padding-left: 6px;
  border-left: 2.5px solid #3eacf0;
  font-weight: bold;
}
.tui nav button {
  color: #3eacf0;
  font-size: 12px;
  border: 0.5px solid #3eacf0;
  border-radius: 11px;
  float: right;
  width: 67px;
  height: 22px;
  text-align: center;
  line-height: 22px;
  background: #fff;
}
.con {
  margin-top: 20px;
}
.contanter {
  border: 0.5px solid rgba(245, 245, 245, 1);
  box-shadow: 0px 0px 5px 0.5px rgba(0, 0, 0, 0.03);
  border-radius: 6px;
  padding: 14px;
  margin-bottom: 14px;
}
.con-top {
  overflow: hidden;
}
.con-top .top-left {
  float: left;
  margin-right: 4%;
  width: 35%;
}
.top-left .left-img {
  border-radius: 2px;
  overflow: hidden;
  position: relative;
}
.top-left .left-img span {
  display: block;
  width: 55px;
  height: 20px;
  background: linear-gradient(
    90deg,
    rgba(255, 76, 76, 1),
    rgba(255, 152, 106, 1)
  );
  box-shadow: 0px 2.5px 5px 0px rgba(255, 76, 76, 0.2);
  color: #fff;
  font-size: 11px;
  text-align: center;
  line-height: 20px;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 2px 0px 2px 0px;
}
.top-left img {
  width: 100%;
  margin-bottom: 10px;
  border-radius: 2px;
  height: 80px;
}
.top-left p {
  color: #626266;
  font-size: 12px;
}
.top-right {
  float: left;
  border-bottom: 0.5px solid #f2f2f2;
  width: 61%;
  position: relative;
}
.top-right h4 {
  color: #121212;
  font-size: 17px;
  font-weight: 400;
  margin-bottom: 4px;
}
.top-right h4 p {
  float: right;
  width: 36px;
  height: 17px;
  border-radius: 2px;
  color: #1c85cf;
  font-size: 11px;
  text-align: center;
  line-height: 17px;
  background-color: #f0f9ff;
}
.top-right span.zhan {
  position: absolute;
  color: #6987b3;
  font-size: 12px;
  margin-bottom: 0 !important;
  bottom: 15px;
  right: 4px;
}
.top-right h5 {
  color: #fe582f;
  font-size: 12px;
  margin-bottom: 4px;
}
.top-right h5 span {
  color: #fe582f;
  font-size: 16px;
  font-weight: 400;
}
.top-right p {
  color: #626266;
  font-size: 12px;
  margin-bottom: 4px;
}
.top-right p:last-of-type {
  margin-bottom: 15px;
}
/* .te {
  height: 34px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
} */
.top-right p img {
  width: 26%;
}
.top-right p span {
  float: right;
  width: 35%;
}
.con-bom {
  display: flex;
  margin-top: 16px;
}
.con-bom p {
  color: #ff5650;
  font-size: 12px;
  margin-right: 5%;
  line-height: 24px;
}
.con-bom button {
  width: 24%;
  height: 24px;
  border-radius: 12px;
  text-align: center;
  line-height: 24px;
  color: #fff;
  font-size: 13px;
  box-shadow: 0px 1.5px 3px 0px rgba(255, 76, 76, 0.2);
  border: 0;
}
.con-bom button:first-of-type {
  background: linear-gradient(
    90deg,
    rgba(255, 76, 76, 1),
    rgba(255, 152, 106, 1)
  );
  margin-right: 4%;
}
.con-bom button:last-of-type {
  background: linear-gradient(
    -270deg,
    rgba(52, 138, 255, 1),
    rgba(106, 204, 255, 1)
  );
}

.weiter {
  width: 80%;
  position: fixed;
  left: 10%;
  top: 220px;
  border-radius: 12px;
  z-index: 1001;
  background: linear-gradient(
    180deg,
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
}
#Footer p {
  color: #929aa7;
  font-size: 12px;
  text-align: center;
  margin-bottom: 6px;
}
#Footer p img {
  width: 6%;
  margin-right: 2%;
}
#Footer p a {
  color: #6a7b97;
  text-decoration: underline;
}
</style>