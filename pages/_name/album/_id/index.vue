<template>
  <div class="Album">
    <!-- 头部导航 -->
    <div class="title">
      <span class="iconfont iconjiantouzuo" id="fanhui" @click="goback"></span>
      <i id="allimgs">全部图片</i>
    </div>

    <!-- 头部选择导航 -->
    <div id="top">
      <div class="swiper-container" id="nav">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <span class="active">效果图({{efects.count}})</span>
          </div>
          <div class="swiper-slide">
            <span>实景图({{reals.count}})</span>
          </div>
          <div class="swiper-slide">
            <span>样板图({{templates.count}})</span>
          </div>
          <div class="swiper-slide">
            <span>交通图({{traffics.count}})</span>
          </div>
          <div class="swiper-slide">
            <span>户型图({{apartments.count}})</span>
          </div>
          <div class="swiper-slide">
            <span>配套图({{matchings.count}})</span>
          </div>
          <!-- <div class="bar">
        <div class="color"></div>
          </div>-->
        </div>
      </div>
    </div>
    <!-- 滑动主页 -->
    <div class="swiper-container" id="page">
      <div class="swiper-wrapper">
        <!-- 第一页 -->
        <div class="swiper-slide slidepage">
          <div class="swiper-container scroll">
            <div class="swiper-wrapper">
              <div class="swiper-slide slidescroll">
                <div class="swiper-container banner">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item,key) in efects.imgs" :key="key">
                      <img :src="item" />
                    </div>
                  </div>
                  <div class="swiper-pagination page1"></div>
                </div>

                <!-- 底部咨询-->
              </div>
            </div>
          </div>
        </div>
        <!-- 第二页 -->
        <div class="swiper-slide slidepage">
          <div class="swiper-container scroll">
            <div class="swiper-wrapper">
              <div class="swiper-slide slidescroll">
                <div class="swiper-container banner">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item,key) in reals.imgs" :key="key">
                      <img :src="item" />
                    </div>
                  </div>
                  <div class="swiper-pagination page2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 第三页 -->
        <div class="swiper-slide slidepage">
          <div class="swiper-container scroll">
            <div class="swiper-wrapper">
              <div class="swiper-slide slidescroll">
                <div class="swiper-container banner">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item,key) in templates.imgs" :key="key">
                      <img :src="item" />
                    </div>
                  </div>
                  <div class="swiper-pagination page3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 第四页 -->
        <div class="swiper-slide slidepage">
          <div class="swiper-container scroll">
            <div class="swiper-wrapper">
              <div class="swiper-slide slidescroll">
                <div class="swiper-container banner">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item,key) in traffics.imgs" :key="key">
                      <img :src="item" />
                    </div>
                  </div>
                  <div class="swiper-pagination page4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 第五页 -->
        <div class="swiper-slide slidepage">
          <div class="swiper-container scroll">
            <div class="swiper-wrapper">
              <div class="swiper-slide slidescroll">
                <div class="swiper-container banner">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item,key) in apartments.imgs" :key="key">
                      <img :src="item" />
                    </div>
                  </div>
                  <div class="swiper-pagination page5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="swiper-slide slidepage">
          <div class="swiper-container scroll">
            <div class="swiper-wrapper">
              <div class="swiper-slide slidescroll">
                <div class="swiper-container banner">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item,key) in matchings.imgs" :key="key">
                      <img :src="item" />
                    </div>
                  </div>
                  <div class="swiper-pagination page5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部悬浮按钮 -->
    <div class="m-botnav">
      <p id="m_shou" data-_v="{$data.id}">
        <img id="fork" src="~/assets/forks.png" alt :data-v="id" @click="collection($event)" />
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
    <div class="weiter ts">
      <div class="t-top">
        <h6>预约看房</h6>
        <p>一键预约看房免费小车上门接送，可带家人一起参观多个热门楼盘</p>
        <img id="w-esc" src="~/assets/w-del.png" alt />
      </div>
      <div class="t-bottom">
        <div class="t-b-first">
          <input class="l-p" type="text" placeholder="输入预约手机号码" v-model="baoming"/>
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

    <div class="m-chang"></div>

    <div class="m-o-succ">
      <img class="o-esc" src="~/assets/m-esc.png" alt />
      <img src="~/assets/m-success.png" alt class="o-success" />
      <p id="o_p">已成功订阅最新动态，我们会第一时间通过短信通知您！</p>
      <button id="o_btn">确定</button>
    </div>
    <transition name="fade">
      <my-loading v-if="loadi"></my-loading>
    </transition>
  </div>
</template>
<script>
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
import Loading from "@/components/loading.vue";
import {
  ip,
  verification,
  morehus_put,
  album_data,
  msg,
  trend_put,
  collection
} from "~/api/api";
export default {
  name: "Album",
  components:{
    'my-loading':Loading
  },
  async asyncData (context) {
    let ip=context.store.state.ip;
    let city = context.store.state.city;
    let token=context.store.state.token;
    let id= context.params.id
    let [res]= await Promise.all([
      context.$axios.post('/api/project/imgs',{ ip: ip, id: id, platform: 2 })
      .then((resp)=>{
          let data = resp.data;
          return data;
      })
    ])
    return{
          efects : res.data.efects,
          reals : res.data.reals,
          templates : res.data.templates,
          traffics : res.data.traffics,
          apartments : res.data.apartments,
          matchings : res.data.matchings,
          phone : res.header.phone
    }
  },
  data() {
    return {
      baoming:'',
      ip: "",
      id: "",
      tel: "",
      phone: "",
      efects: {},
      reals: {},
      templates: {},
      traffics: {},
      apartments: {},
      matchings: {},
      call: "",
      checks:'',
      n:'',
      loadi:true
    };
  },
  methods: {
    start() {
      let id = this.$route.params.id;
      this.id = id;
      let that = this;
      let ip = returnCitySN["cip"];
      this.ip = ip;
      this.n=localStorage.getItem('pinyin');
      localStorage.getItem("ip");
      this.call = localStorage.getItem("call");
      album_data({ ip: ip, id: id, platform: 2 })
        .then(resp => {
          that.loadi=false;
          let data = resp.data.data;
          // that.phone = resp.data.header.phone;
          // that.efects = data.efects;
          // that.reals = data.reals;
          // that.templates = data.templates;
          // that.traffics = data.traffics;
          // that.apartments = data.apartments;
          // that.matchings = data.matchings;
          let collect = localStorage.getItem(id);
          if (collect == 0) {
            $("#fork").show();
            $("#forked").hide();
          } else if(collect==1) {
            $("#fork").hide();
            $("#forked").css("display", "block");
          }
        })
        .catch(error => {
          console.log(erorr);
        });
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
            let tel = that.phone;
            trend_put({
              ip: ip,
              tel: tel,
              city: c,
              position: 5,
              page: 2,
              type: 9
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
            tel = t.substr(0, 3) + "****" + t.substr(7, 11);
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
            $(".weiter").hide();
            $(".m-o-succ").show();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    collection(e) {
      let id = e.target.getAttribute("data-v");
      let token = localStorage.getItem("token");
      if (!token) {
        this.$router.push("/" + this.n + "/login");
      }
      collection({ project: id, token: token })
        .then(resp => {
          if (resp.data.code == 200) {
            $("#fork").hide();
            $("#forked").css("display", "block");
          }
        })
        .then(error => {});
    },
    goback() {
      this.$router.go(-1);
    }
  },
  mounted() {
    let that=this;
    that.baoming=localStorage.getItem('phone');
    this.start();
    //暂时设计每个slide大小需要一致
    this.$nextTick(() => {
      let barwidth = 36; //导航粉色条的长度px
      let tSpeed = 300; //切换速度300ms
      let that = this;
      var navSwiper = new Swiper("#nav", {
        slidesPerView: 6,
        freeMode: true,
        initialSlide: 0,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        on: {
          init: function() {
            var navSlideWidth = this.slides.eq(0).css("width"); //导航字数需要统一,每个导航宽度一致
            // console.log(navSlideWidth);
            // console.log(this.slides);
            window.bar = this.$el.find(".bar");
            window.bar.css("width", navSlideWidth);
            window.bar.transition(tSpeed);
            window.navSum = this.slides[this.slides.length - 1].offsetLeft; //最后一个slide的位置

            var clientWidth = parseInt(this.$wrapperEl.css("width")); //Nav的可视宽度
            // console.log(clientWidth);
            var navWidth = 0;
            for (let i = 0; i < this.slides.length; i++) {
              navWidth += parseInt(this.slides.eq(i).css("width"));
            }

            window.topBar = this.$el.parents("body").find("#top"); //页头
            // console.log(topBar);
          }
        }
      });

      var pageSwiper = new Swiper("#page", {
        watchSlidesProgress: true,
        resistanceRatio: 0,
        initialSlide: 0,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        on: {
          touchMove: function() {
            window.progress = this.progress;
            // console.log(progress);
            window.bar.transition(0);
            // window.bar.transform(
            //   "translateX(" + window.navSum * window.progress + "px)"
            // );
            //粉色49,49,54灰色157,157,164
            for (let i = 0; i < this.slides.length; i++) {
              var slideProgress = this.slides[i].progress;
              if (Math.abs(slideProgress) < 1) {
                var r = Math.floor(
                  (49 - 157) * (1 - Math.pow(Math.abs(slideProgress), 2)) + 51
                );
                var g = Math.floor(
                  (49 - 157) * (1 - Math.pow(Math.abs(slideProgress), 2)) + 51
                );
                var b = Math.floor(
                  (54 - 164) * (1 - Math.pow(Math.abs(slideProgress), 2)) + 51
                );
                // navSwiper.slides.eq(i).find('span').css('color', 'rgba(' + r + ',' + g + ',' + b + ',1)')
              }
            }
          },
          transitionStart: function() {
            var activeIndex = this.activeIndex;
            // console.log(activeIndex);
            var activeSlidePosition = navSwiper.slides[activeIndex].offsetLeft;
            //释放时导航粉色条移动过渡
            window.bar.transition(tSpeed);
            // window.bar.transform("translateX(" + activeSlidePosition + "px)");
            //释放时文字变色过渡
            navSwiper.slides
              .eq(activeIndex)
              .find("span")
              .transition(tSpeed);
            navSwiper.slides
              .eq(activeIndex)
              .find("span")
              .addClass("active"); //黑色
            if (activeIndex > 0) {
              navSwiper.slides
                .eq(activeIndex - 1)
                .find("span")
                .transition(tSpeed);
              navSwiper.slides
                .eq(activeIndex - 1)
                .find("span")
                .removeClass("active"); //灰色
            }
            if (activeIndex < this.slides.length) {
              navSwiper.slides
                .eq(activeIndex + 1)
                .find("span")
                .transition(tSpeed);
              navSwiper.slides
                .eq(activeIndex + 1)
                .find("span")
                .removeClass("active"); //灰色
            }

            //导航居中
            var navActiveSlideLeft = navSwiper.slides[activeIndex].offsetLeft; //activeSlide距左边的距离
          }
        }
      });

      navSwiper.$el.on("touchstart", function(e) {
        e.preventDefault(); //去掉按压阴影
      });
      navSwiper.on("tap", function(e) {
        let clickIndex = this.clickedIndex;
        // console.log(clickIndex);

        let clickSlide = this.slides.eq(clickIndex);
        pageSwiper.slideTo(clickIndex, 0);
        this.slides.find("span").removeClass("active");
        clickSlide.find("span").addClass("active");
      });

      //内容滚动
      var scrollSwiper = new Swiper(".scroll", {
        //65是头部的高
        //36是top地址和搜索的高

        slidesOffsetBefore: 72,
        direction: "vertical",
        freeMode: true,
        slidesPerView: "auto",
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        mousewheel: {
          releaseOnEdges: true
        },
        on: {
          touchMove: function() {
            // console.log(topBar);
            if (this.translate > 72 - 36 && this.translate < 72) {
            window.topBar.transform(
              "translateY(" + (this.translate - 72) + "px)"
            );
            }
            // console.log(this.$el.parent().attr('page-id'));
            // console.log(this);
          },
          touchStart: function() {
            window.startPosition = this.translate;
          },
          touchEnd: function() {
            window.topBar.transition(tSpeed);
            if (
              this.translate > 36 &&
              this.translate < 72 &&
              this.translate < window.startPosition
            ) {
              // topBar.transform('translateY(-36px)');
              for (sc = 0; sc < scrollSwiper.length; sc++) {
                if (scrollSwiper[sc].translate > 36) {
                  scrollSwiper[sc].setTransition(tSpeed);
                  scrollSwiper[sc].setTranslate(36);
                }
              }
            }
            if (
              this.translate > 36 &&
              this.translate < 72 &&
              this.translate > window.startPosition
            ) {
              window.topBar.transform("translateY(0px)");
              for (sc = 0; sc < scrollSwiper.length; sc++) {
                if (
                  scrollSwiper[sc].translate < 72 &&
                  scrollSwiper[sc].translate > 0
                ) {
                  scrollSwiper[sc].setTransition(tSpeed);
                  scrollSwiper[sc].setTranslate(72);
                }
              }
            }
          },

          transitionStart: function() {
            window.topBar.transition(tSpeed);
            if (this.translate < 72 - 36) {
              // topBar.transform('translateY(-36px)');
              if (scrollSwiper) {
                for (sc = 0; sc < scrollSwiper.length; sc++) {
                  if (scrollSwiper[sc].translate > 36) {
                    scrollSwiper[sc].setTransition(tSpeed);
                    scrollSwiper[sc].setTranslate(36);
                  }
                }
              }
            } else {
              window.topBar.transform("translateY(0px)");

              if (scrollSwiper) {
                for (sc = 0; sc < scrollSwiper.length; sc++) {
                  if (
                    scrollSwiper[sc].translate < 72 &&
                    scrollSwiper[sc].translate > 0
                  ) {
                    scrollSwiper[sc].setTransition(tSpeed);
                    // scrollSwiper[sc].setTranslate(72);
                  }
                }
              }
            }
          }
        }
      });

      //热卖
      var bannerSwiper = new Swiper(".banner", {
        loop: false,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        pagination: {
          el: ".swiper-pagination",
          type: "fraction",
          renderFraction: function(currentClass, totalClass) {
            return (
              '<span class="' +
              currentClass +
              '"></span>' +
              "/" +
              '<span class="' +
              totalClass +
              '"></span>'
            );
          }
        }
      });
    });

    // 关闭
    $("#w-esc").on("click", function() {
      $(".weiter").hide();
      $(".m-chang").hide();
    });
    $(".m-chang").on("click", function() {
      $(".weiter").hide();
      $(".m-chang").hide();
      $("#m_ti").hide();
    });

    $(".p1").on("click", function() {
      $(".m-chang").show();
      $(".weiter").show();
    });
    $(".m-chang").on("click", function() {
      $(".m-chang").hide();
      $(".weiter").hide();
      $(".m-o-succ").hide();
    });
    // 接口验证码
    $(".t-b-btn2").on("click", function() {
      let check=that.checks;
      if(!check){
        $('.tishi').show();
        return
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
      $(".m-o-succ").hide();
      $(".m-chang").hide();
    });
    $(".o-esc").on("click", function() {
      $(".m-o-succ").hide();
      $(".m-chang").hide();
    });
    //点击按钮出现hover
    $(function() {
      function changeColor(id, class1, class2) {
        $("#" + id).on("touchstart", function() {
          $(this).attr("class", class1);
        });
        $("#" + id).on("touchend", function() {
          $(this).attr("class", class2);
        });
      }
      changeColor("dingxue", "bg_02", "bg_01");
    });
    // $("#allimgs").on("click", function() {
    //   window.location.href = "/picture";
    // });
  }
};
</script>

<style scoped>
/* m-botnav */
.m-botnav {
  width: 100%;
  height: 64px;
  position: fixed;
  bottom: 0;
  z-index: 200;
  box-shadow: 0px 0px 9px 1px rgba(6, 0, 1, 0.04);
  background-color: black;
}

#forked {
  display: none;
}
.tishi{
  color:red;
  font-size: 10px;
  display: none;
}
.m-botnav p {
  display: inline-block;
  margin-top: 12px;
  margin-left: 8.333333%;
  color: #808080;
  font-size: 12px;
  margin-right: 0.866667%;
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
  box-shadow:0px 2.5px 5px 0px rgba(78,169,255,0.2);
}

.m-botnav .m-pho {
  background:linear-gradient(90deg,rgba(255,76,76,1),rgba(255,152,106,1));
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
  margin-bottom: 2px;
}
.m-botnav .m-pho .ph2 {
  color: #ffffff;
  font-size: 10px;
  margin: 0;
  padding: 0;
}

.m-botnav .m-y {
  background:linear-gradient(-270deg,rgba(52,138,255,1),rgba(106,204,255,1));
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
  height: 18px;
  display: inline-block;
  margin-right: 4px;
  margin-bottom: 2px;
}
.m-botnav .m-y .ph2 {
  color: #ffffff;
  font-size: 10px;
  margin: 0;
  padding: 0;
}
html,
body {
  position: relative;
  height: 100%;
  background: #000;
  height: 800px;
}
html {
  overflow: hidden;
}
* {
  padding: 0;
  margin: 0;
}
li {
  list-style: none;
}
body {
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  background: #000;
  font-size: 12px;
}
.img img {
  width: 100%;
  display: block;
}
#top {
  position: absolute;
  top: 100px;
  z-index: 5;
  width: 100%;
}
#top #nav .active {
  color: #313136;
  background: #cccccc;
  border-radius: 20px;
}
.title {
  height: 48px;
  width: 100%;
  background: #000000;
  position: fixed;
  top: 0;
  z-index: 10;
}

.title span,
.title i,
.title a {
  color: #fff;
  line-height: 48px;
}
.title span {
  font-size: 20px;
  margin-left: 5.3%;
}
.title i {
  font-size: 18px;
  font-style: normal;
  margin: 0 auto;
  position: absolute;
  right: 50%;
  margin-right: -36px;
}
.title a {
  float: right;
  margin-right: 5.3%;
  font-size: 16px;
  text-decoration: none;
  /* color:rgba(51,51,51,1) */
}
#nav .swiper-wrapper {
  display: flex;
  justify-content: space-around;
}

#nav .swiper-slide span {
  text-align: center;
  display: block;
  line-height: 1.8;
  font-size: 13px;
  color: #9d9da4;
}
#nav .bar {
  width: 50px;
  height: 3px;
  position: absolute;
  bottom: 0px;
}
#nav .bar .color {
  width: 36px;
  margin: 0 auto;
  height: 3px;
  background: #ff4891;
}
.banner img {
  width: 100%;
  display: block;
}
.banner .swiper-pagination {
  left: auto;
  right: 7px;
  bottom: 7px;
  width: auto;
  padding: 2px 7px;
  border-radius: 10px;
  color: #fff;
  background: rgba(0, 0, 0, 0.3);
}

#page {
  margin-bottom: 50px;
  height: 800px;
}
#page .slidepage {
  height: 100%;
}

.scroll {
  height: 100%;
  background: #000;
}
.slidescroll {
  height: auto;
}
.ll {
  background: #000;
}

.slidescroll .banner {
  margin-top: 50%;
  width: 100%;
  max-height: 480px;
}
.banner .swiper-slide img {
  width: 100%;
  max-height: 480px;
}

.banner .page1 {
  position: fixed;
  top: 0;
  width: 20px;
  height: 18px;
  font-weight: bold;
  font-size: 18px;
  left: 50%;
  transform: translate(-50%, 0);
}
.banner .page2 {
  position: fixed;
  top: 0;
  width: 20px;
  height: 18px;
  font-weight: bold;
  font-size: 18px;
  left: 50%;
  transform: translate(-50%, 0);
}
.banner .page3 {
  position: fixed;
  top: 0;
  width: 20px;
  height: 18px;
  font-weight: bold;
  font-size: 18px;
  left: 50%;
  transform: translate(-50%, 0);
}
.banner .page4 {
  position: fixed;
  top: 0;
  width: 20px;
  height: 18px;
  font-weight: bold;
  font-size: 18px;
  left: 50%;
  transform: translate(-50%, 0);
}
.banner .page5 {
  position: fixed;
  top: 0;
  width: 20px;
  height: 18px;
  font-weight: bold;
  font-size: 18px;
  left: 50%;
  transform: translate(-50%, 0);
}

.weiter {
  display: none;
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