<template>
  <div id="Participate">
    <h3>
      <img src="~/assets/return.png" @click="goback" />城市加盟
    </h3>
    <img src="~/assets/participateimg.jpg" alt class="bg" />
    <nav>
      <ul>
        <li
          :class="key==num && 'active'"
          v-for="(item,key) in navs"
          :key="key"
          @click="scrollto(key)"
        >{{item}}</li>
      </ul>
    </nav>
    <div class="lun">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="list">
              <h5>最大传统客户源被禁</h5>
              <p>2018年13个有关部门发布了《综合整治骚扰电话专项行动方案》，重点对商业营销类等骚扰电话进行整治，房地产行业最大的获客渠道受到致命打击</p>
              <button @click="put">申请加盟</button>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="list">
              <h5>线下推广成本高局限大</h5>
              <p>面销和行销需要充足的人力和物力，成本高并无法做到全面推广，获客效率低，常受街道和城管阻挠，也不被客户所理解。</p>
              <button @click="put">申请加盟</button>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="list">
              <h5>销售时间无法利用最大化</h5>
              <p>销售人员75%的工作时间放在获客工作上，只有25%的时间利用在与客户沟通促进成交上，成交效率低。</p>
              <button @click="put">申请加盟</button>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="list">
              <h5>客户管理过于混乱</h5>
              <p>销售人员获得的客户无法得到系统的登记和实时的回访，意向客户流失率高、成交概率低。</p>
              <button @click="put">申请加盟</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="feature">
      <h5>房地产行业未来的发展前景</h5>
      <div class="trend">
        <img src="~/assets/partrend.png" alt />
        <div class="con">
          <h6 class="ion">
            房产趋势
            <svg class="icon" aria-hidden="true" data-v="0">
              <use xlink:href="#icon-fanhui" />
            </svg>
          </h6>
          <p>从杭州楼市可见中国未来房产大趋势，二手房存量快速上升，一手房持续推出，一二手倒挂现象将会逐步拉低，直至回归理性</p>
        </div>
        <button @click="put">了解更多</button>
      </div>
      <div class="trend">
        <img src="~/assets/partime.png" alt />
        <div class="con">
          <h6 class="ion">
            黄金时段
            <svg class="icon" aria-hidden="true" data-v="0">
              <use xlink:href="#icon-fanhui" />
            </svg>
          </h6>
          <p>在政府限地价限售价的情况下，开发商为了尽快回款减少资金压力，大概率情况下会开放全面合作，届时我们将会迎来近些年来唯一一个大致一年的黄金时段</p>
        </div>
        <button @click="put">了解更多</button>
      </div>
      <div class="trend">
        <img src="~/assets/parzhua.png" alt />
        <div class="con">
          <h6 class="ion">
            抓住时机
            <svg class="icon" aria-hidden="true" data-v="0">
              <use xlink:href="#icon-fanhui" />
            </svg>
          </h6>
          <p>抓住二手房与一手房之间的差价周期，谁先抢占客户，谁就能赢，得客户者为王的时代即将来临</p>
        </div>
        <button @click="put">了解更多</button>
      </div>
    </div>
    <div class="loops">
      <h5>选择允家就是选择优质客户资源</h5>
      <div class="swiper-container1">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="project">
              <h6>
                <div class="liang">
                  <div></div>
                </div>三大平台支持
              </h6>
              <img src="~/assets/b1.jpg" alt />
              <h6>
                <div class="liang">
                  <div></div>
                </div>多个地区运营经验
              </h6>
              <img src="~/assets/b2.jpg" alt />
            </div>
          </div>
          <div class="swiper-slide">
            <div class="project">
              <h6>
                <div class="liang">
                  <div></div>
                </div>SAAS.大数据管理
              </h6>
              <img src="~/assets/b3.jpg" alt />
              <h6>
                <div class="liang">
                  <div></div>
                </div>推广效果及成本分析
              </h6>
              <img src="~/assets/b4.jpg" alt />
            </div>
          </div>
          <div class="swiper-slide">
            <div class="project">
              <h6>
                <div class="liang">
                  <div></div>
                </div>SAAS.个性化定制
              </h6>
              <img src="~/assets/b5.jpg" alt />
              <h6>
                <div class="liang">
                  <div></div>
                </div>公众号提醒
              </h6>
              <img src="~/assets/b6.jpg" alt />
            </div>
          </div>
          <div class="swiper-slide">
            <div class="project">
              <h6>
                <div class="liang">
                  <div></div>
                </div>专业团队支持
              </h6>
              <img src="~/assets/b7.jpg" alt />
              <h6>
                <div class="liang">
                  <div></div>
                </div>多方面培训支持
              </h6>
              <img src="~/assets/b8.jpg" alt />
            </div>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <div class="cooperation">
      <h5>众多”0“成本获客途径</h5>
      <div class="icons">
        <ul>
          <li>
            <img src="~/assets/seo.png" alt />
            <p>SEO优化运营</p>
          </li>
          <li>
            <img src="~/assets/share.png" alt />
            <p>微信项目分享</p>
          </li>
          <li>
            <img src="~/assets/yunying.png" alt />
            <p>新媒体运营</p>
          </li>
          <li>
            <img src="~/assets/small.png" alt />
            <p>流量小程序</p>
          </li>
        </ul>
      </div>
      <ul class="msgs">
        <li>
          <div class="round">
            <div></div>
          </div>提高分站的权重，获得更多的自然流量，从而获得自然流量报名客户
        </li>
        <li>
          <div class="round">
            <div></div>
          </div>分享项目进行朋友圈营销，通过微信分享的方式获得自然流量客户
        </li>
        <li>
          <div class="round">
            <div></div>
          </div>向总部投稿，文章内会设置流量入口到分站网站，获得自然流量客户
        </li>
        <li>
          <div class="round">
            <div></div>
          </div>从分站微信小程序可以获得免费流量客户
        </li>
      </ul>
    </div>
    <div class="year">
      <h5>0元加盟</h5>
      <p>以城市加盟的形式，低成本启动城市运营，我们保证每个地级市有且仅有一家合作商，保障合作商线上获客的优先性和客户的唯一归属权。</p>
    </div>
    <div class="m-botnav visible-xs-block .visible-sm-block">
      <a :href="`tel:${call}`">
        <button class="m-pho">
          <p class="ph1">
            <img src="~/assets/phicon.png" alt />电话咨询
          </p>
        </button>
      </a>
      <button class="m-y p1" data-v="申请加盟" @click="put">
        <p class="ph1">
          <img src="~/assets/promsg.png" />申请加盟
        </p>
      </button>
    </div>
    <transition name="change">
      <div class="fixs" v-if="show">
        <img src="~/assets/j-del.png" alt id="closed" @click="close" />
        <h5>申请合作信息</h5>
        <ul>
          <li>
            <img src="~/assets/j-name.png" alt />
            <input type="text" :placeholder="namemsg" v-model="name"/>
          </li>
          <li>
            <img src="~/assets/j-tel.png" alt />
            <input type="text" :placeholder="phonemsg" v-model.lazy="phone"/>
          </li>
          <li>
            <img src="~/assets/j-compancer.png" alt />
            <input type="text" :placeholder="companymsg" v-model="company"/>
          </li>
          <li>
            <img src="~/assets/j-city.png" alt />
            <input type="text" :placeholder="citymsg" v-model="city"/>
            <!-- <img src="~/assets/j-more.png" alt class="more" /> -->
          </li>
        </ul>
        <button @click="push">提交申请</button>
      </div>
    </transition>
    <div class="zhao"></div>
    <foot-view :pinyin="jkl"></foot-view>
  </div>
</template>
<script>
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
// import "~/static/js/iconfont.js";
import { jiameng } from "~/api/api";
import footView from "@/components/Foot.vue";
export default {
  name: "Participate",
  asyncData (context) {
    let jkl = context.store.state.cookie.pinyin;
    return {
      jkl:jkl
    }
  },
  components: {
    "foot-view": footView
  },
  head(){
    return {
      script: [
        { src: '~/static/js/iconfont.js' },
      ]
    }
  },
  data() {
    return {
      call: "",
      navs: ["地产现状", "未来趋势", "优质客源", "0元加盟"],
      num: 0,
      show: false,
      defaultHeight: 0,
      nowHeight: 0,
      city:'',
      name:'',
      phone:'',
      company:'',
      isok:true,
      citymsg:'请输入城市',
      namemsg:'请输入您的称呼',
      phonemsg:'请输入手机号码',
      companymsg:'请输入公司全称',
      jkl:''
    };
  },
  methods: {
    scroll() {
      if (process.client) {
        let Y = window.scrollY;
        if (Y >= 164) {
          $("nav").css({ position: "fixed", top: "0", width: "100%" });
          $(".bg").css("marginBottom", "38px");
        } else {
          $(".bg").css("marginBottom", "0");
          $("nav").css({ position: "relative" });
        }
        let that = this;
        if (Y <= 364) {
          that.num = 0;
        } else if (Y <= 734) {
          that.num = 1;
        } else if (Y <= 1036) {
          that.num = 2;
        } else {
          that.num = 3;
        }
      }
    },
    start() {
      if(process.client){
        this.call = localStorage.getItem("call");
      }
      
    },
    goback() {
      this.$router.go(-1);
    },
    put() {
      this.show = true;
      $(".zhao").show();
    },
    scrollto(key) {
      if (process.client) {
        let Y = window.scrollY;
        if (key == 0) {
          if (Y > 167) {
            var timer = setInterval(function() {
              window.scrollBy(0, -10);
              if (window.scrollY <= 167) {
                clearInterval(timer);
              }
            }, 0.01);
          } else {
            var timer = setInterval(function() {
              window.scrollBy(0, 10);
              if (window.scrollY >= 167) {
                clearInterval(timer);
              }
            }, 1);
          }
        } else if (key == 1) {
          if (Y > 380) {
            var timer = setInterval(function() {
              window.scrollBy(0, -10);
              if (window.scrollY <= 380) {
                clearInterval(timer);
              }
            }, 0.01);
          } else {
            var timer = setInterval(function() {
              window.scrollBy(0, 10);
              if (window.scrollY >= 380) {
                clearInterval(timer);
              }
            }, 1);
          }
        } else if (key == 2) {
          if (Y > 750) {
            var timer = setInterval(function() {
              window.scrollBy(0, -10);
              if (window.scrollY <= 750) {
                clearInterval(timer);
              }
            }, 0.01);
          } else {
            var timer = setInterval(function() {
              window.scrollBy(0, 10);
              if (window.scrollY >= 734) {
                clearInterval(timer);
              }
            }, 1);
          }
        } else if (key == 3) {
          var timer = setInterval(function() {
            window.scrollBy(0, 10);
            if (window.scrollY >= 1100) {
              clearInterval(timer);
            }
          }, 1);
        }
      }
    },
    close() {
      this.show = false;
      $(".zhao").hide();
    },
    push(){
      let name=this.name;
      let phone=this.phone;
      let company=this.company;
      let city=this.city;
      var pattern_phone = /^1[3-9][0-9]{9}$/;
      if (this.phone == "") {
        console.log(this.phone,this.isok)
       this.phone=''
        this.phonemsg='手机号不能为空'
        this.isok=false
      } else if (!pattern_phone.test(phone)) {
        this.isok=false
        this.phone=''
        this.phonemsg='请输入正确的号码'
      }else{
        this.isok=true
      }
      if(city==''){
        this.isok=false
        this.citymsg='不能为空'
      }else{
        this.isok=true
      }
      if(name==''){
        this.isok=false
        this.namemsg='不能为空'
      }else{
        this.isok=true
      }
      if(company==''){
        this.isok=false
        this.companymsg='不能为空'
      }else{
        this.isok=true
      }
      if(this.isok){
        jiameng({city:city,name:name,phone:phone,company:company}).then(res=>{
          if(res.data.code==200){
            this.show=false
            $('.zhao').hide();
          }
      }).catch(error=>{

      })
      }
      
    }
  },
  mounted() {
    let h = document.body.clientHeight;
    if (h < 700) {
      $("#Foot").css({ position: "fixed", bottom: "0", width: "100%" });
    } else if (h >= 700) {
      $("#Foot").css({ position: "relative", bottom: "0", width: "100%",marginBottom: '56px' });
    }
    let that = this;
    var swiper05 = new Swiper(".swiper-container", {
      // eslint-disable-line no-unused-vars
      slidesPerView: 1.3,
      spaceBetween: 15
    });
    var swiper = new Swiper(".swiper-container1", {
      // eslint-disable-line no-unused-vars
      slidesPerView: 1.36,
      spaceBetween: 15,
      centeredSlides: true,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      }
    });
    $(".ion").on("click", function() {
      var n = $(this)
        .find(".icon")
        .attr("data-v");
      if (n == 0) {
        $(this)
          .find(".icon")
          .attr("data-v", "1");
        $(this)
          .find(".icon")
          .css({ transform: "rotate(0deg)", color: "#4DB5FF" });
        $(this)
          .find(".icon")
          .parent()
          .next()
          .css({ whiteSpace: "inherit" });
      } else {
        $(this)
          .find(".icon")
          .attr("data-v", "0");
        $(this)
          .find(".icon")
          .parent()
          .next()
          .css({ whiteSpace: "nowrap" });
        $(this)
          .find(".icon")
          .css({ transform: "rotate(180deg)", color: "#A8A8A8" });
      }
    });
    if (process.client) {
      window.addEventListener("scroll", this.scroll);
    }

    $(".zhao").on("click", function() {
      that.show = false;
      $(this).hide();
    });
    //获取默认高度

    if (process.client) {
      this.defaultHeight = $(window).height();
      window.onresize = () => {
        return (() => {
          this.nowHeight = $(window).height();
        })();
      };
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scroll);
  },
  created() {
    this.start();
  },
  watch: {
    nowHeight: function() {
      if (this.defaultHeight != this.nowHeight) {
        $(".fixs").css("top", "10vh");
      } else {
        $(".fixs").css("top", "22vh");
      }
    },
  }
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
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  transform: rotate(180deg);
  color: #a8a8a8;
  font-size: 14px;
  margin-left: 8%;
  transition: transform 0.5s;
}
h3 {
  color: #333333;
  text-align: center;
  height: 44px;
  line-height: 44px;
  font-weight: bold;
  position: relative;
  font-size: 16px;
}
h3 img {
  position: absolute;
  width: 4.3%;
  margin-top: 14px;
  left: 5.33%;
}
.bg {
  width: 100vw;
}
nav {
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.05);
  background-color: #fff;
  z-index: 2;
  -webkit-box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.05);
}
nav ul {
  height: 44px;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
}
nav ul li {
  color: #626266;
  font-size: 15px;
  width: 25%;
  text-align: center;
  position: relative;
}
nav ul li.active {
  font-weight: bold;
  color: #121212;
}
nav ul li.active::after {
  position: absolute;
  content: "";
  display: block;
  height: 2.5px;
  width: 20px;
  background-color: #40a2f4;
  left: 50%;
  margin-left: -10px;
  top: 28px;
}
.lun {
  margin-bottom: 20px;
}
.lun .swiper-container {
  padding: 20px 0;
  padding-left: 4%;
}

.lun .list {
  height: 325px;
  box-shadow: 0px 0px 38.5px 2px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  padding-top: 46px;
  position: relative;
}
.lun .list h5 {
  color: #121212;
  font-size: 20px;
  text-align: center;
  margin-bottom: 34px;
  font-weight: bold;
}
.lun .list p {
  margin-left: 24px;
  margin-right: 24px;
  color: #626266;
  font-size: 14px;
  line-height: 22px;
}
.lun .list button {
  background: linear-gradient(
    -270deg,
    rgba(52, 138, 255, 1),
    rgba(106, 204, 255, 1)
  );
  box-shadow: 0px 2.5px 5px 0px rgba(78, 169, 255, 0.2);
  width: 80%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border-radius: 2px;
  border: 0;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  margin-left: 25px;
  position: absolute;
  bottom: 40px;
}
.feature h5 {
  color: #121212;
  font-size: 17px;
  margin-bottom: 24px;
  text-align: center;
}
.feature .trend {
  border: 0.5px solid rgba(240, 241, 245, 1);
  box-shadow: 0px 2.5px 6px 0px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  width: 92%;
  margin-left: 4%;
  position: relative;
  margin-bottom: 14px;
}
.feature .trend img {
  width: 7.5%;
  float: left;
  margin-left: 5.4%;
  margin-top: 20px;
  margin-right: 5%;
}
.feature .trend .con {
  display: inline-block;
  width: 54.6%;
  margin-top: 15px;
  margin-bottom: 18px;
}
.feature .trend .con h6 {
  color: #121212;
  font-size: 17px;
  margin-bottom: 14px;
  font-weight: bold;
}
.feature .trend .con p {
  color: #616166;
  font-size: 14px;
  line-height: 21px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.feature .trend button {
  position: absolute;
  top: 28px;
  right: 4.4%;
  width: 18%;
  height: 24px;
  border-radius: 2px;
  background: linear-gradient(
    -270deg,
    rgba(52, 138, 255, 1),
    rgba(106, 204, 255, 1)
  );
  box-shadow: 0px 2.5px 5px 0px rgba(78, 169, 255, 0.2);
  border: 0;
  color: #fff;
  font-size: 12px;
  text-align: center;
  line-height: 24px;
}
.loops {
  margin-top: 40px;
  margin-bottom: 35px;
}
.loops h5 {
  color: #121212;
  font-size: 17px;
  text-align: center;
}
.loops .swiper-container1 {
  overflow: hidden;
  padding: 20px 0;
  position: relative;
}
.swiper-container-horizontal > .swiper-pagination-bullets,
.swiper-pagination-custom,
.swiper-pagination-fraction {
  bottom: -4px;
}
.loops >>> .swiper-pagination-bullet {
  border-radius: 0;
  width: 8px;
  height: 2.5px;
}
.loops >>> .swiper-pagination-bullet-active {
  width: 15px;
  background-color: #49a3ff;
}
.loops .project {
  width: 100%;
  height: 43.4vh;
  box-shadow: 0px 0px 38.5px 2px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  padding: 0 15px;
}
.loops .project img {
  width: 100%;
}
.loops .project h6 {
  color: #121212;
  font-size: 17px;
  font-weight: bold;
  padding-top: 16px;
  margin-bottom: 10px;
}
.loops .project h6 .liang {
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: #d8eaff;
  position: relative;
  margin-right: 5px;
}
.loops .project h6 .liang div {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #469fff;
  position: absolute;
  top: 50%;
  margin-top: -3.6px;
  left: 50%;
  margin-left: -3.6px;
}
.cooperation h5 {
  color: #121212;
  font-size: 17px;
  text-align: center;
  margin-bottom: 30px;
}
.cooperation .icons {
  margin-bottom: 28px;
}
.cooperation .icons ul {
  display: flex;
  justify-content: center;
  align-items: center;
}
.cooperation .icons ul li {
  width: 25%;
  text-align: center;
}
.cooperation .icons ul li img {
  width: 25%;
  margin-bottom: 9px;
}
.cooperation .icons ul li p {
  color: #919199;
  font-size: 10px;
}
.cooperation .msgs {
  padding-left: 4%;
  padding-right: 4%;
  margin-bottom: 20px;
}
.cooperation .msgs li {
  color: #616166;
  font-size: 14px;
  margin-bottom: 18px;
  padding-left: 6%;
  position: relative;
}
.cooperation .msgs li .round {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  margin-right: 8px;
  background-color: #66d6ff;
  position: absolute;
  left: 0;
  top: 4px;
}
.cooperation .msgs li .round div {
  width: 8px;
  height: 8px;
  position: absolute;
  top: 50%;
  margin-top: -4px;
  left: 50%;
  margin-left: -4px;
  border-radius: 50%;
  background-color: #4795ff;
}
.year {
  margin-top: 42px;
  padding-bottom: 100px;
}
.year h5 {
  color: #121212;
  font-size: 17px;
  margin-bottom: 18px;
  text-align: center;
}
.year p {
  padding: 0 4%;
  color: #5e6166;
  font-size: 14px;
  line-height: 22px;
}
.fixs {
  position: fixed;
  width: 77.3%;
  left: 50%;
  margin-left: -38.652%;
  height: 350px;
  border-radius: 2px;
  background-color: #fff;
  top: 22vh;
  z-index: 201;
  padding: 0 8%;
  border-radius: 2px;
}
.fixs h5 {
  color: #27282b;
  font-size: 22px;
  text-align: center;
  padding-top: 28px;
  margin-bottom: 10px;
}
.fixs ul li {
  position: relative;
}
.fixs input {
  width: 100%;
  height: 45px;
  border: 0;
  border-bottom: 0.7px solid #f2f4f7;
  padding-left: 14%;
  margin-bottom: 5px;
}
#closed {
  position: absolute;
  width: 7%;
  top: 4%;
  right: 4%;
}
::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #aaadb3;
  font-size: 15px;
}
::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #aaadb3;
  font-size: 15px;
}
:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #aaadb3;
  font-size: 15px;
}
.fixs li img {
  position: absolute;
  width: 7.2%;
  top: 12px;
  left: 2.4%;
}
.fixs li img.more {
  width: 6%;
  left: 94.6%;
}
.fixs button {
  width: 100%;
  height: 40px;
  background: linear-gradient(
    -270deg,
    rgba(52, 138, 255, 1),
    rgba(106, 204, 255, 1)
  );
  box-shadow: 0px 2.5px 5px 0px rgba(78, 169, 255, 0.2);
  border-radius: 2px;
  text-align: center;
  line-height: 40px;
  color: #ffffff;
  font-size: 16px;
  border: 0;
  margin-top: 20px;
}
.zhao {
  display: none;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 200;
}

.m-botnav {
  width: 100%;
  height: 64px;
  position: fixed;
  bottom: 0;
  background-color: #fff;
  z-index: 200;
  box-shadow: 0px 0px 9px 1px rgba(6, 0, 1, 0.04);
}

.m-botnav button {
  width: 37.34%;
  height: 44px;
  font-size: 15px;
  border-radius: 5px;
  border: 0px;
  margin-top: 10px;
  border-radius: 22px;
}

.m-botnav .m-pho {
  background: linear-gradient(
    90deg,
    rgba(255, 76, 76, 1),
    rgba(255, 152, 106, 1)
  );
  color: #fff;
  margin-left: 8%;
  margin-right: 10.5%;
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
</style>