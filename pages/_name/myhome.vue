<template>
  <div class="Myhome">
    <div class="container-fluid m">
      <div class="m-top visible-xs-block .visible-sm-block">
        <div class="m-banner" :style="bannerimg"></div>
        <!-- <img class="m-banner" src="/static/home/imgs/banner.png" alt=""> -->
        <img class="m-re" src="~/assets/return1.png" alt @click="goback" />
        <img class="m-lo" src="~/assets/head_icon.png.png" />
        <img src="~/assets/getout.png" alt class="getout" />
        <h5 id="m_login">注册/登录</h5>
        <h5 id="m-tel">188****8888</h5>
        <div class="m-nav">
          <ul class="row">
            <li class="col-xs-3 col-sm-3" @click="foot()">
              <img src="~/assets/browse_icon.png" alt />
              <p>浏览足迹</p>
            </li>
            <li class="col-xs-3 col-sm-3" @click="collect()">
              <img src="~/assets/collect_icon.png" alt />
              <p>我的收藏</p>
            </li>
            <li class="col-xs-3 col-sm-3" @click="help()">
              <img src="~/assets/room_icon.png" alt />
              <p>帮我找房</p>
            </li>
            <li class="col-xs-3 col-sm-3" @click="appointment()">
              <img src="~/assets/order_icon.png" alt />
              <p>预约看房</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="m-jia visible-xs-block .visible-sm-block">
        <h4>允家功能</h4>
        <div class="m-line"></div>
        <ul>
          <li>
            <router-link :to="'/'+jkl+'/map'">
              <img src="~/assets/address_icon.png" alt />
            </router-link>地图看房
          </li>
          <li>
            <router-link :to="'/'+jkl+'/about'">
              <img src="~/assets/home_icon.png" alt />
            </router-link>关于允家
          </li>
          <li @click="gozhao">
            <!-- <a :href="'tel:'+call"> -->
              <img src="~/assets/telephone_icon.png" alt />
            <!-- </a> -->
            诚聘英才
            <!-- 联系我们 -->
          </li>
          <li class="feeback">
            <img src="~/assets/Opinion.png" alt />
            意见反馈
          </li>
          <li>
            <router-link :to="'/'+jkl+'/copyright'">
              <img src="~/assets/banquan.png" alt />
            </router-link>版权申明
          </li>
          <li>
            <router-link :to="'/'+jkl+'/exemption'">
              <img src="~/assets/mianze.png" alt />
            </router-link>免责协议
          </li>
          <li>
            <router-link :to="'/'+jkl+'/privacy'">
              <img src="~/assets/yinsi.png" alt />
            </router-link>隐私政策
          </li>
          <li>
            <router-link :to="'/'+jkl+'/server'">
              <img src="~/assets/fuwu.png" alt />
            </router-link>服务协议
          </li>
        </ul>
      </div>
      <div class="m-bottom visible-xs-block .visible-sm-block">
        <h4>允家服务</h4>
        <div class="m-line"></div>
        <ul>
          <li>
            <router-link :to="'/'+jkl+'/follow'">
              <img src="~/assets/WeChat.png" alt />
            </router-link>官方公众号
          </li>
          <li>
            <router-link :to="'/'+jkl+'/customerService'">
              <img src="~/assets/Customer service.png" alt />
            </router-link>关注客服
          </li>
          <li>
            <router-link :to="'/'+jkl+'/participate'">
              <img src="~/assets/jiameng.png" alt />
            </router-link>城市加盟
          </li>
        </ul>
      </div>
      <div id="Footer">
        <p>杭州易得房科技有限公司版权所有 电话：400-718-6686</p>
        <p>
          <img src="~/assets/f-logo.png" />网络经营许可证：
          <a href="http://www.beian.miit.gov.cn/">
            <span>浙ICP备18057005号</span>
          </a>
        </p>
      </div>
      <div class="m-out">
        <div class="out-con">
          <h6>确定退出</h6>
          <p>确定退出当前账户吗？</p>
          <div class="out-btn">
            <button id="no">取消</button>
            <button id="yes" class="active">确定</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Myhome",
  async asyncData(context) {
    let jkl = context.store.state.cookie.pinyin;
    return {
      jkl: jkl
    };
  },
  head() {
    return {
      title: "关于我们-允家新房",
      meta: [
        {
          name: "description",
          content:
            "允家新房是专注于新房购买的O2O平台,为买房人提供一对一新房房产咨询服务和新楼盘信息，包括新楼盘价格走势和最新房源"
        },
        {
          name: "keywords",
          content: "关于我们"
        }
      ]
    };
  },
  data() {
    return {
      n: "",
      bannerimg: {
        // backgroundImage: "url(" + require("@/assets/bg_login.png") + ")",
        backgroundImage: "url(" + require("@/assets/bg_login.png") + ")",
        backgroundRepeat: "no-repeat"
      },
      call: "",
      jkl: ""
    };
  },
  methods: {
    gozhao(){
      window.location.href="http://recruit.jy8006.com?type=2&city="+localStorage.getItem('city')
    },
    start() {
      this.n = this.$route.params.name;
      this.call = localStorage.getItem("call");
    },
    foot() {
      let token = localStorage.getItem("token");
      if (token) {
        this.$router.push("/" + this.n + "/footprint");
      } else {
        this.$router.push("/" + this.n + "/login");
      }
    },
    collect() {
      let token = localStorage.getItem("token");
      if (token) {
        this.$router.push("/" + this.n + "/collection");
      } else {
        this.$router.push("/" + this.n + "/login");
      }
    },
    help() {
      let token = localStorage.getItem("token");
      if (token) {
        this.$router.push("/" + this.n + "/help");
      } else {
        this.$router.push("/" + this.n + "/login");
      }
    },
    appointment() {
      let token = localStorage.getItem("token");
      if (token) {
        this.$router.push("/" + this.n + "/appointment");
      } else {
        this.$router.push("/" + this.n + "/login");
      }
    },
    goback() {
      this.$router.go(-1);
    }
  },
  mounted() {
    $("#Foot").css({
      position: "fixed",
      bottom: "0",
      width: "100%",
      marginBottom: 0
    });
    this.start();
    let that = this;
    let t = localStorage.getItem("token");
    if (t) {
      $(".getout").show();
      $("#m_login").hide();
      let t = localStorage.getItem("tel");
      $("#m-tel").html(t);
    } else {
      $("#m-tel").hide();
      $(".getout").hide();
    }
    $("#no").on("click", function() {
      $(".m-out").hide();
    });
    $("#yes").on("click", function() {
      // localStorage.removeItem('token');
      // localStorage.removeItem('tel');
      $(".m-out").hide();
      localStorage.clear();
      location.reload();
    });
    $(".getout").on("click", function() {
      $(".m-out").show();
    });
    $("#m_login").on("click", function() {
      that.$router.push("/" + that.n + "/login");
      // window.location.href='/'+that.n+"/login"
    });
    $(".leave").on("click", function() {
      let token = localStorage.getItem("token");
      if (token) {
        that.$router.push("/" + that.n + "/leave");
        // window.location.href='/'+that.n+"/leave"
      } else {
        that.$router.push("/" + that.n + "/login");
        // window.location.href='/'+that.n+"/login";
      }
    });
    $(".feeback").on("click", function() {
      if (t) {
        that.$router.push("/" + that.n + "/feedback");
        // window.location.href='/'+that.n+"/feedback"
      } else {
        that.$router.push("/" + that.n + "/login");
        // window.location.href='/'+that.n+"/login";
      }
    });
  }
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
}

a a:hover,
a:visited,
a:link,
a:active {
  text-decoration: none;
  color: #fff;
}
li {
  list-style-type: none;
}

/* m */
.m {
  padding: 0;
}
.m-top {
  width: 100%;
  height: 276px;
  position: relative;
  text-align: center;
}
.m-top .m-banner {
  background: url(~assets/bg_login.png) no-repeat;
  background-size: 100% 160px;
  width: 100%;
  height: 160px;
  position: absolute;
  left: 0;
  top: 0;
}
.getout {
  width: 5.4%;
  position: absolute;
  right: 4%;
  top: 5%;
}
.m-top .m-re {
  position: absolute;
  top: 5%;
  left: 4%;
  width: 5%;
}
.m-top .m-lo {
  width: 16%;
  padding-top: 12%;
  position: absolute;
  left: 28%;
}
.m-top h5 {
  color: #ffffff;
  font-size: 18px;
  margin: 0;
  padding-top: 4.6%;
  position: absolute;
  left: 48%;
  top: 50px;
  font-weight: bold;
}
.m-top .m-nav {
  width: 92%;
  height: 84px;
  background-color: #fff;
  border-radius: 8px;
  position: absolute;
  left: 50%;
  margin-top: 3.5%;
  box-shadow: 0px 0px 14px 6px rgba(6, 0, 1, 0.05);
  margin-left: -46%;
  top: 110px;
}
.m-top .m-nav .row {
  margin: 0;
}
.m-top .m-nav ul li {
  text-align: center;
}
.m-top .m-nav ul li img {
  width: 27%;
  margin-top: 24%;
  margin-bottom: 10%;
}
.m-top .m-nav ul li p {
  color: #333333;
  font-size: 12px;
  margin-top: 1%;
}

/* m-list */
.m-list {
  padding: 0 4%;
}
.m-list ul {
  margin-bottom: 40px;
}
.m-list ul li {
  display: block;
  height: 45px;
  border-bottom: 1px solid #f2f2f2;
  color: #333333;
  font-size: 16px;
  font-weight: 500;
  line-height: 45px;
}
.m-list ul li a {
  color: #333;
}
.m-list ul li img {
  width: 6%;
  margin-right: 3.5%;
}
.m-list ul li .m-sd {
  width: 5%;
  margin-left: 60%;
  margin-right: 0;
}
.m-list button {
  width: 100%;
  height: 44px;
  background-color: #f0f5f2;
  color: #1cb64f;
  font-size: 15px;
  border: 0px;
}

/* 留言 */
.m-xuan img {
  /* width:24.8%; */
  height: 44px;
  position: fixed;
  right: 15px;
  bottom: 130px;
}

/* 家园功能 */
.m-jia {
  width: 92%;
  height: 194px;
  background-color: #fff;
  border-radius: 8px;
  position: absolute;
  left: 50%;
  margin-top: 3.5%;
  box-shadow: 0px 0px 14px 6px rgba(6, 0, 1, 0.05);
  margin-left: -46%;
  /* padding:0 4.1739%; */
  top: 208px;
}
.m-jia h4 {
  color: #333333;
  font-size: 13px;
  margin: 12px 0;
  padding-left: 4%;
}
.m-jia .m-line {
  height: 0.5px;
  background-color: #f2f2f2;
  margin-bottom: 20px;
  width: 91.3%;
  margin-left: 4%;
}
.m-jia ul li {
  width: 25%;
  text-align: center;
  color: #333333;
  font-size: 12px;
  float: left;
  margin-bottom: 16px;
}
.m-jia ul li img {
  display: block;
  width: 30%;
  margin-left: 35%;
  margin-bottom: 10px;
}

/* 家园服务 */
.m-bottom {
  width: 92%;
  height: 125px;
  background-color: #fff;
  border-radius: 8px;
  position: absolute;
  top: 415px;
  left: 50%;
  margin-top: 3.5%;
  box-shadow: 0px 0px 14px 6px rgba(6, 0, 1, 0.05);
  margin-left: -46%;
  /* padding:0 4.1739% */
}
.m-bottom h4 {
  color: #333333;
  font-size: 13px;
  margin: 12px 0;
  padding-left: 4%;
}
.m-bottom .m-line {
  height: 0.5px;
  background-color: #f2f2f2;
  margin-bottom: 20px;
  width: 91.3%;
  margin-left: 4%;
}
.m-bottom ul li {
  width: 25%;
  text-align: center;
  color: #333333;
  font-size: 12px;
  float: left;
  margin-bottom: 20px;
}
.m-bottom ul li img {
  display: block;
  width: 30%;
  margin-left: 35%;
  margin-bottom: 10px;
}

/* 退出按钮 */
.m-out {
  width: 100%;
  height: 1000px;
  position: fixed;
  top: 0;
  left: 0;
  color: #fff;
  background: rgba(0, 0, 0, 0.4);
  display: none;
}
.m-out .out-con {
  width: 72%;
  height: 150px;
  background-color: #fff;
  position: fixed;
  left: 50%;
  margin-left: -36%;
  margin-top: 250px;
  border-radius: 10px;
}
.m-out .out-con h6 {
  color: #333333;
  font-size: 18px;
  text-align: center;
  margin-bottom: 18px;
  margin-top: 18px;
}
.m-out .out-con p {
  color: #999999;
  font-size: 15px;
  text-align: center;
  margin-bottom: 28px;
}
.m-out .out-con .out-btn {
  border-top: 0.5px solid #f7f7f7;
}
.m-out .out-con .out-btn button {
  width: 49%;
  border: 0;
  text-align: center;
  color: #999999;
  font-size: 16px;
  background-color: #fff;
  margin-top: 14px;
}
.m-out .out-con .out-btn button.active {
  color: #40a2f4;
  border-left: 0.5px solid #f2f2f2;
}
#Footer {
  position: fixed;
  bottom: 0;
  width: 100%;
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