<template>
  <div class="HuAnalysis">
    <h3>
      <img class="back" src="~/assets/return.png" @click="goback" />户型详情
      <img src="~/assets/top-house.png" alt class="home" @click="gohome" />
    </h3>
    <div class="bg">
      <img :src="one.small" alt />
      <!-- <span>共1张</span> -->
    </div>
    <div class="con">
      <h4>
        {{one.title}}
        <span class="con-tab">{{one.state}}</span>
        <!-- <span class="con-msg">房贷计算</span> -->
      </h4>
      <div class="con-con">
        <div class="con-left">
        <p>
          单价：
          <span v-if="one.single_price!=0">{{one.single_price}}元/m²起</span>
          <span v-else>未知</span>
        </p>
        <p>
          建面：
          <strong>{{one.area}}m²</strong>
        </p>
        <p>
          特色：
          <strong class="hu-tag">{{one.special}}</strong>
        </p>
      </div>
      <div class="con-right">
        <p>
          总价：
          <span v-if="one.price!=0">{{one.price}}万</span>
          <span v-else>未知</span>
        </p>
        <!-- <p>
          层高：
          <strong>{{one.height}}米</strong>
        </p> -->
        <p>
          类型：
          <strong id="hu-tag">{{one.type}}</strong>
        </p>
      </div>
      </div>
      
      <div class="con-bom">
        <button class="p1" data-v="降价通知">
          <img src="~/assets/force.png" alt />降价通知
        </button>
        <button style="margin-right: 0;" data-v="开盘通知" class="p1">
          <img src="~/assets/horn.png" alt />开盘通知
        </button>
      </div>
    </div>
    <div class="line"></div>
    <div class="peo">
      <img :src="staff.head_img" alt />
      <div class="peo-con">
        <h6>
          {{staff.name}}
          <span>允家分析师</span>
        </h6>
        <p class="ping">评分 5.0</p>
        <p class="peo-msg">向他咨询更多详细户型信息</p>
        <img class="inf p1" src="~/assets/inf.png" alt data-v="咨询服务" />
        <a :href="'tel:'+call">
          <img class="tel" src="~/assets/redtel.png" alt />
        </a>
      </div>
    </div>
    <div class="hu">
      <h5>户型分析</h5>
      <p>{{one.analysis}}</p>
    </div>
    <div class="line"></div>
    <div class="hus">
      <h4>本楼盘其它户型</h4>
      <ul>
        <li v-for="(item,key) in others" :key="key">
          <router-link :to="'/'+jkl+'/HuAnalysis/'+item.id">
            <img :src="item.small" alt />
            <div class="h-right">
              <h5>
                {{item.title}}
                <span class="now">{{item.state}}</span>
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
    <div class="line"></div>
    <div class="guess">
      <h4>猜你喜欢</h4>
      <div class="recommen">
        <div class="re-con">
          <div class="re-list" v-for="(item,key) in likes" :key="key">
            <router-link :to="'/'+jkl+'/content/'+item.id">
              <div class="re-con-left">
                <img :src="item.img" alt />
                <!-- <span>
                  <i class="iconfont iconyanjing"></i>
                  {{item.num}}
                </span> -->
              </div>
              <div class="re-con-right">
                <h5>
                  {{item.name}}
                  <span>{{item.status}}</span>
                </h5>
                <p class="price">
                  <span>{{item.single_price}}</span>元/m²
                </p>
                <p class="area">
                  <span>{{item.city}}-{{item.country}}</span>
                  <span>建面</span>
                  <span
                    v-if="item.area_min"
                  >{{parseInt(item.area_min)}}-{{parseInt(item.area_max)}}m²</span>
                </p>
                <p class="tabs">
                  <strong>{{item.decorate}}</strong>
                  <span v-show="item.railway">{{item.railway}}</span>
                  <span>{{item.type}}</span>
                </p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
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
            <input class="l-p" type="tel" placeholder="输入预约手机号码" v-model="baoming" />
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
  hu_detail,
  collection,
  verification,
  msg,
  morehus_put,
  hengda
} from "~/api/api";
export default {
  name: "HuAnalysis",
  async asyncData(context) {
    let ip = context.store.state.cookie.ip;
    let city = context.store.state.cookie.city;
    let token = context.store.state.cookie.token;
    let name = context.store.state.cookie.cityname;
    name = decodeURIComponent(name);
    let bud = context.store.state.cookie.name;
    bud = decodeURIComponent(bud);
    let id = context.params.id;
    let jkl = context.store.state.cookie.pinyin;
    let kid = context.store.state.cookie.kid
      ? context.store.state.cookie.kid
      : "";
    let other = context.store.state.cookie.other
      ? context.store.state.cookie.other
      : "";
    let [res] = await Promise.all([
      context.$axios
        .get("/yun_jia/houses/phone/detail", {params:{
          ip: ip,
          city: city,
          id: id,
          token: token,
          kid: kid,
          other: other,
          platform: 2,
        }})
        .then((resp) => {
          let data = resp.data;
          return data;
        }),
    ]);
    return {
      others: res.other_rooms,
      likes: res.recommends,
      one: res.one,
      jkl: jkl,
      title: res.common.header.title,
      description: res.common.header.description,
      keywords: res.common.header.keywords,
      city: name,
      name: bud,
      call: res.common.phone,
      staff: res.common.staff
    };
  },
  components: {
    "foot-view": footView,
  },
  data() {
    return {
      jkl: "",
      change: false,
      succ: false,
      defaultHeight: "0",
      nowHeight: "0",
      one: {},
      others: [],
      likes: [],
      ip: "",
      id: "",
      pro: "",
      n: "",
      call: "",
      checks: "",
      baoming: "",
      title: "",
      description: "",
      keywords: "",
      city: "",
      name: "",
      ishengda: "",
      IDcode: "",
      tstype: false,
      tsmsg: "",
    };
  },
  methods: {
    start() {
      let that = this;
      let id = this.$route.params.id;
      this.id = id;
      let col = localStorage.getItem(id);
      if (col == 0) {
        $("#fork").show();
        $("#forked").hide();
      } else if (col == 1) {
        $("#fork").hide();
        $("#forked").css("display", "block");
      }
    },
    gohome() {
      let id = this.$route.params.pro;
      let name = this.$route.params.name;
      this.$router.push(`/${name}/content/${id}`);
    },
    collect(e) {
      let id = e.target.getAttribute("data-v");
      let pro = this.$route.params.pro;
      let token = localStorage.getItem("token");
      collection({ project: pro, token: token })
        .then((resp) => {
          if (resp.data.code == 200) {
            $("#fork").hide();
            $("#forked").css("display", "block");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    send(sends) {
      this.tel = sends;
      let that = this;
      let phone = this.tel;
      let id = this.$route.params.pro;
      let country = localStorage.getItem("city");
      let ip = ip_arr["ip"];
      let token = localStorage.getItem("token");
      let kid = sessionStorage.getItem("kid");
      let other = sessionStorage.getItem("other");
      morehus_put({
        tel: phone,
        project: id,
        position: 11,
        page: 3,
        city: country,
        ip: ip,
        token: token,
        platform: 2,
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
      let t = this.baoming;
      verification({ phone: t, code: checks, channel: 2 })
        .then((resp) => {
          if (resp.data.code == 200) {
            if(sessionStorage.getItem('proname')&&sessionStorage.getItem('proname').indexOf('恒大')!==-1){
              that.ishengda=true
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
              that.guanbi();
            }, 1000);
          }
        });
      }
    },
    guanbi() {
      $(".t-b-first").show();
      $(".t-b-second").hide();
      $(".m-chang").hide();
      $(".hengda").hide();
    },
    goback() {
      this.$router.go(-1);
    },
  },
  head() {
    return {
      title:
        this.title ||
        `${this.city}${this.name}${this.one.house}户型信息_允家新房`,
      meta: [
        {
          name: "description",
          content:
            this.description ||
            `允家新房提供${this.city}${this.name}${this.one.house}信息,让您了解真实${this.city}${this.name}房型图`,
        },
        {
          name: "Keywords",
          content:
            this.keywords ||
            `${this.name}${this.one.house}户型，${this.name}${this.one.house}户型图`,
        },
      ],
    };
  },
  mounted() {
    let h = $(".HuAnalysis").height();
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
    this.start();
    let that = this;
    $(".p1").on("click", function () {
      let type = $(this).attr("data-v");
      if (type == "变价通知") {
        $(".weiter .t-top h6").html(type);
        $(".weiter .t-top p").html(
          "一键订阅最新变价通知，不再错过变价信息哦！"
        );
      } else if (type == "开盘通知") {
        $(".weiter .t-top h6").html(type);
        $(".weiter .t-top p").html("一键订阅最新开盘通知,不再错过开盘信息哦！");
      } else if (type == "降价通知") {
        $(".weiter .t-top h6").html(type);
        $(".weiter .t-top p").html(
          "一键订阅最新降价通知，不再错过降价信息哦！"
        );
      } else if (type == "预约看房") {
        $(".weiter .t-top h6").html(type);
        $(".weiter .t-top p").html(
          "一键预约看房免费小车上门接送，可带家人一起参观多个热门楼盘"
        );
      } else {
        $(".weiter .t-top h6").html("咨询服务");
        $(".weiter .t-top p").html("立即报名，专业人员为你解惑!");
      }
      that.change = true;
      $(".m-chang").show();
    });
    $(".m-chang").on("click", function () {
      $(".m-chang").hide();
      that.change = false;
      that.succ = false;
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
    $(".con-msg").on("click", function () {
      that.$router.push("/" + that.jkl + "/count");
      // window.location.href = "/count";
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
#forked {
  display: none;
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
.hu-tag {
  width: 56px;
  height: 20px;
  overflow: hidden;
  display: inline-block;
  float: right;
  margin-right: 66px;
}
.bg {
  width: 100%;
  height: 200px;
  position: relative;
  border-bottom: 0.5px solid #f7f8fa;
  display: flex;
  justify-content: center;
}
.bg span {
  width: 12%;
  height: 20px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.6);
  display: block;
  position: absolute;
  color: #fff;
  font-size: 10px;
  text-align: center;
  line-height: 20px;
  bottom: 10px;
  right: 4%;
}
.bg img {
  height: 200px;
}

.con {
  padding: 0 4%;
  padding-bottom: 25px;
}
.con h4 {
  color: #2e3033;
  font-size: 22px;
  padding-top: 22px;
  margin-bottom: 20px;
}
.con h4 .con-tab {
  color: #ffffff;
  font-size: 12px;
  padding: 3px 8px;
  background-color: #2cd264;
  border-radius: 2px;
  margin-left: 10px;
  margin-bottom: 2px;
}
.con h4 .con-msg {
  float: right;
  color: #919499;
  font-size: 14px;
  margin-top: 4px;
}
.con .con-con {
  display: flex;
}
.con .con-left {
  width: 49%;
  display: inline-block;
}
.con .con-right {
  width: 49%;
  display: inline-block;
}
.con p {
  color: #abacb5;
  font-size: 14px;
  margin-bottom: 16px;
}
.con p span {
  color: #fe582f;
  font-weight: bold;
}
.con p strong {
  color: #2e3033;
}
.con .con-bom {
  padding-left: 2%;
  margin-top: 10px;
}
.con .con-bom button {
  width: 43%;
  margin-right: 7%;
  height: 44px;
  border-radius: 4px;
  background-color: #f0f2f5;
  text-align: center;
  line-height: 44px;
  color: #4db5ff;
  font-size: 16px;
  border: 0;
  display: inline-block;
}
.con .con-bom button img {
  width: 16px;
  margin-right: 4px;
}
.line {
  width: 100%;
  height: 10px;
  background-color: #f7f7f7;
}
.peo {
  padding: 20px 4%;
  border-bottom: 0.5px solid #f2f4f7;
}
.peo::after {
  content: "";
  height: 0;
  display: block;
  clear: both;
  visibility: hidden;
}
.peo img {
  width: 14.93%;
  float: left;
  margin-right: 4.5%;
  padding-bottom: 20px;
  border-radius: 50%;
}
.peo .peo-con {
  float: left;
  position: relative;
  width: 80%;
}
.peo .peo-con h6 {
  color: #2e3033;
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 8px;
}
.peo .peo-con h6 span {
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
.peo .peo-con .ping {
  color: #5e6166;
  font-size: 15px;
  margin-bottom: 12px;
}
.peo-msg {
  color: #919499;
  font-size: 15px;
}
.peo .inf {
  width: 19.33%;
  position: absolute;
  top: 0;
  right: 27.9%;
}
.peo .tel {
  width: 19.3%;
  position: absolute;
  top: 0;
  right: 0;
}

.hu {
  padding: 20px 4% 0 4%;
}
.hu h5 {
  color: #2e3033;
  font-size: 17px;
  margin-bottom: 18px;
}
.hu p {
  color: #919499;
  font-size: 15px;
  line-height: 26px;
  margin-bottom: 20px;
}

.hus {
  padding: 0 4%;
}
.hus h4 {
  color: #2e3033;
  font-size: 17px;
  padding-top: 20px;
  margin-bottom: 8px;
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
  height: 20px;
  overflow: hidden;
}

.guess h4 {
  padding-top: 18px;
  margin-left: 4%;
  color: #2e3033;
  font-size: 17px;
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
.recommen .re-list .re-con-right .tabs strong {
  font-weight: 500;
  padding: 3px 7px;
  background-color: #ebf5fc;
  display: inline-block;
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
  box-shadow: 0px 2.5px 5px 0px rgba(255, 76, 76, 0.2);
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