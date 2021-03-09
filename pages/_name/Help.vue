<template>
  <div class="Help">

    <div class="container-fluid m">
      <div class="m-top visible-xs-block .visible-sm-block">
        <img src="~/assets/return.png" alt @click="goback" />
        <h4>帮我找房</h4>
      </div>
      <div class="m-me visible-xs-block .visible-sm-block">
        <div class="m-shan row">
          <h4 class="m-jia">价格区间</h4>
          <div class="m-one">
            <p class="m-start">200</p>w -
            <p class="m-end">800</p>w
            <input
              id="ex2"
              type="text"
              class="span2"
              value
              data-slider-min="10"
              data-slider-max="1000"
              data-slider-step="10"
              data-slider-value="[200,800]"
            />
          </div>
          <h4 class>选择区域</h4>
          <div class="m-one">
            <button class="m-btn">
              <p id="areas" v-html="countryname"></p>
              <img src="~/assets/m-go.png" alt />
            </button>
          </div>
          <h4>选择户型</h4>
          <div class="m-one m-huxing">
            <span
              :class="num1==(hu.id)?'col-xs-3 col-sm-3 m-active':'col-xs-3 col-sm-3'"
              v-for="hu in hus"
              :key="hu.id"
              @click="h($event)"
              :data-v="hu.id"
            >{{hu.name}}</span>
          </div>
          <h4>楼盘特色</h4>
          <div class="m-one m-thr">
            <span
              :class="num2==(te.id)?'col-xs-3 col-sm-3 m-active':'col-xs-3 col-sm-3'"
              v-for="te in tes"
              :key="te.id"
              @click="t($event)"
              :data-v="te.id"
            >{{te.name}}</span>
          </div>
          <h4 class>联系方式</h4>
          <div class="m-one m-lian">
            <input type="text" placeholder="请输入手机号" class="m-in" v-model="phone" />
          </div>
          <div class="m-s-btn">确定</div>
        </div>
      </div>
      <div class="m-qu visible-xs-block .visible-sm-block">
        <div class="m-bottom">
          <div class="m-b-top">
            <p class="m-t-left">取消</p>
            <p class="m-t-right">确定</p>
          </div>
          <div class="m-b-bottom row">
            <span
              class="col-xs-3 col-sm-3"
              v-for="c in cities"
              :key="c.id"
              :data-v="c.id"
              :data-c="c.name"
              @click="cc($event)"
            >{{c.name}}</span>
          </div>
        </div>
      </div>
    </div>
    <foot-view :pinyin="jkl"></foot-view>
    <div class="tishi" v-if="tishi">提交成功，会有专业人员跟进</div>
  </div>
</template>
<script>
import { help_data, help_put, ip } from "~/api/api";
import footView from "@/components/Foot.vue";
export default {
  name: "Help",
  async asyncData (context) {
    let ip=context.store.state.cookie.ip;
    let city = context.store.state.cookie.city;
    let token=context.store.state.cookie.token;
    let jkl = context.store.state.cookie.pinyin;
    let kid = context.store.state.cookie.kid ? context.store.state.cookie.kid : ''
    let other = context.store.state.cookie.other ? context.store.state.cookie.other : ''
    let [res]= await Promise.all([
      context.$axios.post('/api/project/help_me',{ city: city, token: token, platform: 2, ip: ip,kid:kid,other:other })
      .then((resp)=>{
        let data = resp.data.data;
          return data;
      })
    ])
    return{
          tes : res.features,
          cities : res.cities,
          hus : res.apartments,
          phone:res.user_mobile,
          jkl:jkl
    }
  },
  data() {
    return {
      tishi:false,
      starts: "200",
      end: "800",
      country: "",
      countryname: "不限",
      hu: "",
      te: "",
      phone: "",
      cities: [],
      hus: [],
      tes: [],
      ip: "",
      num1: "",
      num2: "",
      num3: "",
      n:''
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
          name: "Keywords",
          content: "关于我们"
        }
      ]
    };
  },
  components: {
    "foot-view": footView
  },
  methods: {
    start() {
      this.n=this.$route.params.name;
      let city = localStorage.getItem("city");
      if (!city) {
        city = 1;
        localStorage.setItem("city", 1);
      }
    },
    cc(e) {
      this.country = e.target.getAttribute("data-v");
      this.countryname = e.target.getAttribute('data-c');
      // console.log(this.countryname)
      // document.getElementById("areas").innerHTML = this.countryname;
      // let l = document.getElementById("areas").innerHTML;
      let c=this.countryname;
      // this.$forceUpate();
    },
    t(e) {
      this.te = e.target.getAttribute("data-v");
      this.num2 = this.te;
    },
    h(e) {
      this.hu = e.target.getAttribute("data-v");
      this.num1 = this.hu;
    },
    put() {
      let where = {};
      if (this.starts) {
        where.total_price_min = this.starts;
      }
      if (this.end) {
        where.total_price_max = this.end;
      }
      if (this.country) {
        where.country = this.country;
      }
      if (this.hu) {
        where.apartment = this.hu;
      }
      if (this.te) {
        where.feature = this.te;
      }
      where.tel = $(".m-in").val();
      if(!where.tel){
        return
      }
      where.page = 2;
      where.position = 8;
      where.type = 5;
      let city = localStorage.getItem("city");
      where.city = city;
      where.ip = this.ip;
      let that=this;
      help_put(where)
        .then(resp => {
          if (resp.data.code == 200) {
            that.tishi=true;
            setTimeout(function(){
              that.$router.push('/'+that.n+"/myhome")
            },2000)
            
            // window.location.href = '/'+that.n+"/myhome";
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getip() {
      ip()
        .then(resp => {
          this.ip = resp.data.data[0].origip;
        })
        .catch(error => {
          console.log(error);
        });
    },
    goback(){
      this.$router.go(-1)
    }
  },
  mounted() {
    $("#Foot").css({ position: "relative", bottom: "0", width: "100%",marginBottom:0 });
    this.start();
    var height = window.screen.height;
    $(".m-qu").css("height", height);
    // console.log(height);
    var slider = new Slider("#ex2", {});
    let that = this;
    $("#ex2").on("slide", function() {
      var start = $(".min-slider-handle").attr("aria-valuenow");
      var end = $(".max-slider-handle").attr("aria-valuenow");
      $(".m-start").text(start);
      that.starts = start;
      that.end = end;
      $(".m-end").text(end);
      // console.log(that.starts);
      // console.log(end);
    });
    $(".m-one span").on("click", function() {
      $(this)
        .addClass("m-active")
        .siblings("span")
        .removeClass("m-active");
    });
    $(".m-b-bottom span").on("click", function() {
      $(this)
        .addClass("m-active")
        .siblings("span")
        .removeClass("m-active");
    });
    $(".m-qu").on("click", function() {
      $(".m-qu")
        .removeClass("visible-xs-block")
        .hide();
      var str = $(".m-b-bottom .m-active").text();
      $(".m-btn p").text(str);
    });
    $(".m-qu")
      .removeClass("visible-xs-block")
      .hide();
    $(".m-t-left").on("click", function() {
      $(".m-qu")
        .removeClass("visible-xs-block")
        .hide();
    });
    $(".m-btn").on("click", function() {
      $(".m-qu")
        .addClass("visible-xs-block")
        .show();
      var mo = function(e) {
        e.preventDefault();
      };
      function stop() {
        document.body.style.overflow = "hidden";
        document.addEventListener("touchmove", mo, { passive: false }); //禁止页面滑动
      }
      //直接默认不让滑动
      stop();
    });
    $(".m-t-right").on("click", function() {
      $(".m-qu")
        .removeClass("visible-xs-block")
        .hide();
      var str = $(".m-b-bottom .m-active").text();
      $(".m-btn p").text(str);
    });

    $(".m-s-btn").on("click", function() {
      var start = $(".min-slider-handle").attr("aria-valuenow");
      var end = $(".max-slider-handle").attr("aria-valuenow");
      let phone = $(".m-in").val();
      var pattern_phone = /^1[3-9][0-9]{9}$/;
      if (!phone) {
        $(".m-in").val("");
        $(".m-in").attr("placeholder", "手机号不能为空");
      } else if (!pattern_phone.test(phone)) {
        $(".m-in").val("");
        $(".m-in").attr("placeholder", "手机号码不合法");
        return;
      }
      that.put();
    });
  },
  watch: {
    countryname(val) {
      // document.getElementById("areas").innerHTML = this.countryname
    }
  }
};
</script>
<style scoped>
@import url("https://cdn.bootcss.com/bootstrap-slider/10.6.1/css/bootstrap-slider.min.css");
* {
  padding: 0;
  margin: 0;
}
html,
body {
  overflow-x: hidden;
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
.tishi{
  width:60%;
  height: 4vh;
  font-size: 14px;
  text-align: center;
  line-height: 4vh;
  position: fixed;
  top:48vh;
  left:20%;
  background: rgba(0,0,0,0.8);
  color: #fff;
}
/* m */
.m {
  padding: 0;
}
.m-top {
  width: 100%;
  height: 44px;
  border-bottom: 1px solid #f2f2f2;
  text-align: center;
  position: relative;
}
.m-top img {
  position: absolute;
  left: 4%;
  top: 25%;
  width: 6%;
}
.m-top h4 {
  line-height: 44px;
  margin: 0;
  color: #333333;
  font-size: 18px;
  letter-spacing: 2px;
}

.m-me .m-shan .m-jia {
  padding-bottom: 3%;
}
.m-me .m-shan h4 {
  color: #333333;
  padding: 4% 0 6% 4%;
  margin: 0;
  background-color: #fff;
  font-size: 16px;
}
.m-me .m-shan h4 span {
  color: #999999;
  font-size: 12px;
  font-weight: normal;
  margin-left: 2%;
}
.m-me .m-shan .m-one {
  padding: 0 4%;
  height: 54px;
  overflow: scroll;
  text-align: center;
}
.m-me .m-shan .m-huxing {
  height: 84px;
}
.m-me .m-shan .m-one span.m-active {
  background: #40a2f4;
  color: #fff;
}
.m-me .m-shan .m-one p {
  color: #696969;
  display: inline-block;
  font-size: 14px;
}
.m-me .m-shan .m-one >>> .slider .slider-handle {
  width: 20px;
  height: 20px;
  background-color: #fff;
  border: 1px solid #40a2f4;
  background-image: none;
}
.m-me .m-shan .m-one >>> .slider.slider-horizontal .slider-track {
  margin-top: -1px;
}
.m-me .m-shan .m-one >>> .slider.slider-horizontal {
  width: 100%;
}
.m-me .m-shan .m-one >>> .slider .slider-track {
  height: 2px;
  background-color: #f3f3f3;
}
.m-me .m-shan .m-one >>> .slider .slider-track .slider-selection {
  background-color: #40a2f4;
  background-image: none;
}
.m-me .m-shan .m-one >>> .slider .tooltip-main {
  display: none;
}
.m-me .m-shan .m-one span {
  background-color: #f2f4f7;
  text-align: center;
  padding: 0;
  height: 24px;
  margin-right: 5%;
  font-size: 14px;
  color: #5e6166;
  width: 20%;
  margin-bottom: 5%;
  line-height: 24px;
  border-radius: 2px;
  overflow: hidden;

}
.m-me .m-shan .m-two {
  height: 127px;
  background: #fff;
}
.m-me .m-shan .m-thr {
  height: 84px;
}
.m-me .m-shan .m-s-btn {
  background-color: #40a2f4;
  width: 92%;
  height: 40px;
  margin-left: 4%;
  text-align: center;
  color: #fff;
  line-height: 40px;
  border-radius: 4px;
  margin-bottom: 10px;
}
.m-me .m-shan .m-one .m-btn {
  width: 98%;
  border: 0;
  background-color: #f2f4f7;
  border-radius: 4px;
  height: 32px;
  padding: 0 5%;
}
.m-me .m-shan .m-one .m-btn p {
  color: #5e6166;
  line-height: 32px;
  float: left;
}
.m-me .m-shan .m-one .m-btn img {
  width: 6%;
  float: right;
  margin-top:2%;
}
.m-me .m-shan .m-lian {
  height: 83px;
}
.m-me .m-shan .m-lian .m-in {
  width: 98%;
  padding: 0 5%;
  border-radius: 4px;
  height: 40px;
  border: 1px solid #d9d9d9;
  background: rgba(242, 242, 242, 1);
  color: #9c9c9c;
  border: 1px solid #d9d9d9;
}

.m-qu {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  display: none;
  top: 0;
  z-index: 1;
}
.m-qu .m-bottom {
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 10;
}
.m-qu .m-bottom .m-b-top {
  width: 100%;
  height: 50px;
  background-color: #fafafa;
  padding: 4% 5%;
}
.m-qu .m-bottom .m-b-top .m-t-left {
  color: #7f7f7f;
  font-size: 16px;
  float: left;
}
.m-qu .m-bottom .m-b-top .m-t-right {
  color: #4db5ff;
  font-size: 16px;
  float: right;
}
.m-qu .m-bottom .m-b-bottom {
  width: 100%;
  height: 227px;
  background-color: #fff;
  margin: 0;
  padding: 5% 3%;
}
.m-qu .m-bottom .m-b-bottom span {
  background-color: #f2f4f7;
  color: #919499;
  font-size: 13px;
  text-align: center;
  padding: 0;
  height: 24px;
  margin-right: 5%;
  width: 20%;
  margin-bottom: 8%;
  line-height: 24px;
  border-radius: 2px;
}
.m-qu .m-bottom .m-b-bottom span.m-active {
  background: #4db5ff;
  color: #fff;
}
</style>