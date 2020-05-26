<template>
  <div class="MoreComments">
    <h3>
      <img src="~/assets/return.png" @click="goback" />更多评论
    </h3>
    <div class="con">
      <ul>
        <li v-for="(item,key) in lists" :key="key">
          <div class="left">
            <img src="~/assets/lou1.png" alt />
          </div>
          <div class="right">
            <h6>
              {{item.user_name}}
              <van-rate
                v-model="item.score"
                :size="13"
                color="#2E3033"
                void-icon="star"
                void-color="#E8EBED"
                :readonly="read"
              />
            </h6>
            <p class="txt">{{item.content}}</p>
            <div class="btn">
              <span>{{item.createtime}}</span>
              <strong :data-v="item.id" @click="del($event)"  v-if="tel==item.user_name">删除</strong>
              <p class="interaction">
                  <img id="agree" :data-v="item.id" :type="item.my_like" :data-n="item.like_num" @click="ag"  data-y="2" src="~/assets/click.png" />
                    <span :data-v="item.id" :type="item.my_like" :data-n="item.like_num" data-y="2" @click="agrees($event)">
                    点赞({{item.like_num}})
                  </span>
                <span @click="commentback(item.id)">回复({{item.children.length}})</span>
              </p>
            </div>
            <div class="reply" v-if="item.children.length>0">
              <p class="msg">
                <strong>{{item.children[0].mobile}}:</strong>
                {{item.children[0].content}}
              </p>
              <p class="time">
                {{item.children[0].time}}
                <span :data-v="item.children[0].id" @click="del($event)" v-if="tel==item.children[0].mobile">删除</span>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="m-botnav">
      <p id="m_shou">
        <img id="fork" src="~/assets/forks.png" alt :data-v="id" @click="collection($event)" />
        <img id="forked" src="~/assets/heart.gif" />收藏
      </p>
      <a :href="'tel:'+call">
        <button class="m-pho">
          <p class="ph1">
            <img src="~/assets/phicon.png" alt />电话咨询
          </p>
          <p class="ph2">保护您的号码安全</p>
        </button>
      </a>
      <button class="m-y p1" data-v="预约看房">
        <p class="ph1">
          <img src="~/assets/promsg.png" />预约看房
        </p>
        <p class="ph2">置业顾问一对一服务</p>
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
            <input class="l-p" type="tel" placeholder="输入预约手机号码" v-model="baoming"/>
            <p class="w-mg">
              <input class="w-mg-c" type="radio" checked v-model="checks"/>我已阅读并同意
              <router-link :to="'/'+jkl+'/server'">
                <a href="javasript:;">《允家新房用户协议》</a>
              </router-link>
            </p>
            <p class="tishi">请选择用户协议</p>
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
            <input type="text" placeholder="请输入验证码" id="ma-ll"/>
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
import {
  comments_data,
  ip,
  comment_del,
  msg,
  verification,
  trend_put,
  collection,
  login,
  encyclopediaarticle_agree
} from "~/api/api";
export default {
  name: "MoreComments",
  async asyncData (context) {
    let ip=context.store.state.cookie.ip;
    let city = context.store.state.cookie.city;
    let token=context.store.state.cookie.token;
    let jkl=context.store.state.cookie.pinyin;
    let id=context.params.id;
    let [res]= await Promise.all([
      context.$axios.post('/api/project/comment_info',{ city: city, id: id, page: 1, limit: 10 })
      .then((resp)=>{
        let data = resp.data;
          return data;
      })
    ])
    return{
         lists:res.data,
         jkl:jkl,
         title:res.title,
          description:res.description,
          keywords:res.keywords
    }
  },
  data() {
    return {
      baoming:'',
      jkl:'',
      change: false,
      succ: false,
      defaultHeight: "0",
      nowHeight: "0",
      value: 4,
      read: true,
      ip: "",
      id: "",
      lists: [],
      phone: "",
      n: "",
      call: "",
      checks:'',
      tel:'',
      title:'',
      description:'',
      keywords:''
    };
  },
  head() {
    return {
      title: this.title || '允家新房-楼盘评论',
      meta: [
        {
          name: "description",
          content: this.description || '允家新房'
        },
        {
          name: "keywords",
          content: this.keywords || '允家新房'
        }
      ]
    };
  },
  components: {
    "foot-view": footView
  },
  methods: {
    method1: function() {
      ratingStar();
    },
    start() {
      let that = this;
      let id = this.$route.params.id;
      this.n = this.$route.params.name;
      this.id = id;
      this.call = localStorage.getItem("call");
      let collect = localStorage.getItem(id);
          if (collect == 0) {
            $("#fork").show();
            $("#forked").hide();
          } else {
            $("#fork").hide();
            $("#forked").show();
          }
      
    },
    del(e) {
      let id = e.target.getAttribute("data-v");
      if (localStorage.getItem("token") == null) {
        this.$router.push("/" + that.n + "/login");
        // window.location.href = "/login";
      } else {
        let token = localStorage.getItem("token");
        comment_del({ token: token, id: id })
          .then(resp => {
            if (resp.data.code == 200) {
              location.reload();
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    sendmsg(t) {
      this.phone = t;
      let that=this;
      msg({ phone: t, channel: 2 })
        .then(resp => {
          if (resp.data.code == 200) {
            let ip = that.ip;
            let c = localStorage.getItem("city");
            let p = that.page;
            let id = that.id;
            let kid = sessionStorage.getItem("kid");
            let other = sessionStorage.getItem("other");
            trend_put({
              ip: ip,
              tel: t,
              city: c,
              position: 5,
              page: 3,
              platform: 2,
              project: id,
              kid: kid,
              other: other
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
          }else{
            $('.l-p').val('')
            $(".l-p").attr("placeholder", "报名失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    check(m) {
      let tel = this.baoming;
      let that = this;
      verification({ phone: tel, code: m, channel: 2 })
        .then(resp => {
          if (resp.data.code == 200) {
            that.succ = true;
            that.change = false;
          }else{
            $("#ma-ll").val('');
            $("#ma-ll").attr("placeholder", "验证码不正确");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    collect(e) {
      let id = e.target.getAttribute("data-v");
      let token = localStorage.getItem("token");
      if (!token) {
        this.$router.push("/" + this.n + "/login");
      }
      collection({ token: token, project: id })
        .then(resp => {})
        .catch(error => {
          console.log(error);
        });
    },
    goback() {
      this.$router.go(-1);
    },
    commentback(id){
      this.$router.push('/'+this.jkl+'/commentback/'+id)
    },
    ag(e) {
      // console.log(e.target)
      let img = require("~/assets/clicked.png");
      let id = e.target.getAttribute("data-v");
      let ip = this.ip;
      let token = localStorage.getItem("token");
      let that = this;
      let num = e.target.getAttribute("data-n");
      let y=e.target.getAttribute('data-y')
      encyclopediaarticle_agree({ ip: ip, id: id, platform: 2, token: token , type: y })
        .then(resp => {
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
        .catch(error => {
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
      let y=e.target.getAttribute('data-y')
      encyclopediaarticle_agree({ ip: ip, id: id, platform: 2, token: token , type: y })
        .then(resp => {
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
        .catch(error => {
          console.log(error);
        });
    },
  },
  mounted() { 
    this.tel=localStorage.getItem('tel')
    $("#Foot").css({ position: "fixed", bottom: "0", width: "100%",marginBottom: '56px' });
    this.baoming=localStorage.getItem('phone');
    this.start();
    let that = this;
    $(".p1").on("click", function() {
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
      let t=that.checks;
      if(!t){
        $('.tishi').show()
        return
      }else{
        $('.tishi').hide()
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
.tishi{
  display: none;
  color:red;
  font-size: 12px;
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
  border-bottom: 1px solid #f2f2f2;
  position: relative;
  font-size: 16px;
}
h3 img {
  position: absolute;
  width: 5%;
  margin-top: 14px;
  left: 5.33%;
}

.con {
  padding: 0 4%;
  padding-bottom: 70px;
}
.rating-stars .rating-stars-container .rating-star {
  display: inline-block;
  font-size: 8px;
  color: #e8ebed;
  cursor: pointer;
  padding-right: 3px;
}

.rating-stars .rating-stars-container .rating-star.is--active,
.rating-stars .rating-stars-container .rating-star.is--hover {
  color: #2e3033;
}
.rating-stars {
  display: inline-block;
  margin-left: 10px;
}

.con ul li {
  border-bottom: 0.5px solid #f2f3f7;
  padding-bottom: 18px;
  padding-top: 16px;
}
.con ul li::after {
  content: "";
  height: 0;
  display: block;
  clear: both;
  visibility: hidden;
}
.con ul li .left {
  float: left;
  margin-right: 2.898%;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
}
.con ul li .left img {
  width: 100%;
}
.con ul li .right {
  float: left;
  width: 85%;
}
.con ul li .right h6 {
  color: #2e3033;
  font-size: 13px;
  margin-bottom: 16px;
}
.con ul li .right .txt {
  color: #919499;
  font-size: 15px;
  line-height: 26px;
  margin-bottom: 12px;
}
.con ul li .right .btn {
  margin-bottom: 20px;
}
.con ul li .right .btn strong {
  color: #2e3033;
  font-size: 12px;
  font-weight: 500;
  margin-left: 8px;
}
.con ul li .right .btn span {
  color: #919499;
  font-size: 13px;
}
.con ul li .right .interaction {
  float: right;
  width: 40%;
}
.con ul li .right .interaction span {
  font-size: 12px;
}
.con ul li .right .interaction img {
  width: 15px;
  margin-bottom: 2px;
}
.con ul li .right .reply {
  padding: 15px;
  background-color: #f5f6f7;
}
.con ul li .right .reply .msg {
  color: #919499;
  font-size: 14px;
  margin-bottom: 10px;
}
.con ul li .right .reply .msg strong {
  color: #2e3033;
  font-weight: 500;
}
.con ul li .right .reply .time {
  color: #999999;
  font-size: 12px;
}
.con ul li .right .reply .time span {
  color: #2e3033;
  font-weight: 500;
  margin-left: 8px;
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
  border-radius: 4px;
  border: 0px;
}

.m-botnav .m-pho {
  background-color: #ff7866;
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
  background-color: #58bbec;
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