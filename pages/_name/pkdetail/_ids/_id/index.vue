
<template>
  <div class="Pkdetail">
    <h3>
      <img src="~/assets/return.png" @click="goback" />楼盘PK
    </h3>
    <div class="fix">
      <div class="f-top">
        <div class="f-t-left">楼盘名称</div>
        <div class="f-t-right">
          <div class="f-t-r">
            <img :src="left.img" alt />
            <p>{{left.name}}</p>
          </div>
          <div class="f-t-r">
            <img :src="right.img" alt />
            <p>{{right.name}}</p>
          </div>
        </div>
      </div>
      <div class="f-bottom">
        <div class="f-b-left">楼盘价格</div>
        <div class="f-b-right">
          <div class="f-b-r">
            <p>
              均价
              <span>{{left.single_price}}</span>元/m²
            </p>
            <a :href="'tel:'+call">
              <button>
                <img src="~/assets/phicon.png" />电话咨询
              </button>
            </a>
          </div>
          <div class="f-b-r">
            <p>
              均价
              <span>{{right.single_price}}</span>元/m²
            </p>
            <a :href="'tel:'+call">
              <button>
                <img src="~/assets/phicon.png" />电话咨询
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="con">
      <!-- <h5>楼盘价格</h5>
      <div class="txt">
        <p class="tit">楼盘价格</p>
        <p class="msg">
          均价
          <span>{{left.single_price}}</span>元/m²
        </p>
        <p class="msg" style="margin-right: 0;">
          均价
          <span>{{right.single_price}}</span>元/m²
        </p>
      </div>
      <div class="txt">
        <p class="tit">优惠信息</p>
        <p class="msg">{{left.you}}</p>
        <p class="msg" style="margin-right: 0;">{{right.you}}</p>
      </div>-->
      <h5>基本信息</h5>
      <div class="txt">
        <p class="tit">楼盘地址</p>
        <p class="msg">
          <img src="~/assets/blueaddress.png" alt />
          {{left.address}}
        </p>
        <p class="msg" style="margin-right: 0;">
          <img src="~/assets/blueaddress.png" alt />
          {{right.address}}
        </p>
      </div>
      <div class="txt tese">
        <p class="tit">项目特色</p>
        <p class="msg">
          <span class="tab">{{left.tag}}</span>
        </p>
        <p class="msg" style="margin-right: 0;">
          <span class="tab">{{right.tag}}</span>
        </p>
      </div>
      <div class="txt">
        <p class="tit">建筑类型</p>
        <p class="msg">{{left.type}}</p>
        <p class="msg" style="margin-right: 0;">{{right.type}}</p>
      </div>
      <div class="txt">
        <p class="tit">装修状况</p>
        <p class="msg">{{left.decorate}}</p>
        <p class="msg" style="margin-right: 0;">{{right.decorate}}</p>
      </div>
      <div class="txt">
        <p class="tit">开盘时间</p>
        <p class="msg">{{left.first_open_time}}</p>
        <p class="msg" style="margin-right: 0;">{{right.first_open_time}}</p>
      </div>
      <div class="txt">
        <p class="tit">交房时间</p>
        <p class="msg">{{left.give_time}}</p>
        <p class="msg" style="margin-right: 0;">{{right.give_time}}</p>
      </div>
      <div class="txt">
        <p class="tit">物业费用</p>
        <p class="msg">{{left.wufei}}元/m²</p>
        <p class="msg" style="margin-right: 0;">{{right.wufei}}元/m²</p>
      </div>
      <div class="txt">
        <p class="tit">物业公司</p>
        <p class="msg">{{left.property_company}}</p>
        <p class="msg" style="margin-right: 0;">{{right.property_company}}</p>
      </div>
      <div class="txt">
        <p class="tit">开发商</p>
        <p class="msg">{{left.builder}}</p>
        <p class="msg" style="margin-right: 0;">{{right.builder}}</p>
      </div>
      <div class="txt">
        <p class="tit">绿化率</p>
        <p class="msg">{{left.green_rate}}%</p>
        <p class="msg" style="margin-right: 0;">{{right.green_rate}}%</p>
      </div>
      <div class="txt">
        <p class="tit">容积率</p>
        <p class="msg">{{left.capacity_rate}}</p>
        <p class="msg" style="margin-right: 0;">{{right.capacity_rate}}</p>
      </div>
      <div class="txt">
        <p class="tit">车位情况</p>
        <p class="msg">{{left.parking_num}}</p>
        <p class="msg" style="margin-right: 0;">{{right.parking_num}}</p>
      </div>
      <h5>户型对比</h5>
      <div class="txt" style="margin-bottom: 50px;">
        <p class="tit">户型对比</p>
        <p class="msg">{{left.apartment}} 建面： {{left.area_max}}/m²</p>
        <p class="msg" style="margin-right: 0;">{{right.apartment}} 建面： {{right.area_max}}/m²</p>
      </div>
      <!-- <h5>评分对比</h5>
      <div class="txt" style="margin-bottom: 20px;">
        <p class="tit">综合评分</p>
        <div class="msg" style="float: left;margin-right: 10px;">
          <div class="top">
            <div class="rating-stars block" id="another-rating">
              <input
                style="display:none;"
                type="number"
                readonly="readonly"
                class="form-control rating-value"
                name="another-rating-stars-value"
                id="another-rating-stars-value"
                :value="left.num"
              />
              <div class="rating-stars-container">
                <div class="rating-star">
                  <i class="fa fa-star"></i>
                </div>
                <div class="rating-star">
                  <i class="fa fa-star"></i>
                </div>
                <div class="rating-star">
                  <i class="fa fa-star"></i>
                </div>
                <div class="rating-star">
                  <i class="fa fa-star"></i>
                </div>
                <div class="rating-star">
                  <i class="fa fa-star"></i>
                </div>
              </div>
            </div>
            <span class="fraction">{{left.ping}}</span>分
          </div>
          <p class="mark">({{left.peo}}人参与评分)</p>
        </div>
        <div class="msg" style="float: left;">
          <div class="top">
            <div class="rating-stars block" id="another-rating">
              <input
                style="display:none;"
                type="number"
                readonly="readonly"
                class="form-control rating-value"
                name="another-rating-stars-value"
                id="another-rating-stars-value"
                :value="right.num"
              />
              <div class="rating-stars-container">
                <div class="rating-star">
                  <i class="fa fa-star"></i>
                </div>
                <div class="rating-star">
                  <i class="fa fa-star"></i>
                </div>
                <div class="rating-star">
                  <i class="fa fa-star"></i>
                </div>
                <div class="rating-star">
                  <i class="fa fa-star"></i>
                </div>
                <div class="rating-star">
                  <i class="fa fa-star"></i>
                </div>
              </div>
            </div>
            <span class="fraction">{{right.ping}}</span>分
          </div>
          <p class="mark">({{right.peo}}人参与评分)</p>
        </div>
      </div>
      <div class="txt" style="margin-bottom: 70px;">
        <p class="tit">推荐指数</p>
        <p class="msg weight">{{right.zhi}}</p>
        <p class="msg weight" style="margin-right: 0;">{{right.zhi}}</p>
      </div>-->
    </div>
    <div class="m-botnav">
      <p id="m_shou" data-_v="{$data.id}">
        <img src="~/assets/forked.png" alt />收藏
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
            <input class="l-p" type="tel" placeholder="输入预约手机号码" v-model="tel" />
            <p class="w-mg">
              <input class="w-mg-c" type="checkbox" v-model="checks" />我已阅读并同意
              <router-link :to="'/'+jkl+'/server'">
                <a href="javasript:;">《允家新房用户协议》</a>
              </router-link>
            </p>
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
import { ip, msg, verification, morehus_put, PK } from "~/api/api";
export default {
  name: "Pkdetail",
  async asyncData(context) {
    let ip = context.store.state.cookie.ip;
    let city = context.store.state.cookie.city;
    let token = context.store.state.cookie.token;
    let id = context.params.id;
    let ids = context.params.ids;
    let jkl = context.store.state.cookie.pinyin;
    let kid = context.store.state.cookie.kid ? context.store.state.cookie.kid : ''
    let other = context.store.state.cookie.other ? context.store.state.cookie.other : ''
    let [res] = await Promise.all([
      context.$axios
        .post("/api/project/compare_mobile", {
          ip: ip,
          ids: ids,
          platform: 2,
          token: token,
          kid:kid,
          other:other
        })
        .then(resp => {
          let data = resp.data.data;
          return data;
        })
    ]);
    return {
      left: res.buildings[0],
      right: res.buildings[1],
      jkl: jkl,
      title: res.title,
      description: res.description,
      keywords: res.keywords
    };
  },
  components: {
    "foot-view": footView
  },
  data() {
    return {
      jkl: "",
      change: false,
      succ: false,
      defaultHeight: "0",
      nowHeight: "0",
      left: {
        img: require("~/assets/lou1.png"),
        name: "中梁申花百悦公馆",
        price: "25000",
        you: "团购优惠2000元",
        address: "睦州大道与清溪大道交叉口",
        tese: [
          "地铁沿线",
          "繁华街道",
          "地铁沿线",
          "繁华街道",
          "地铁沿线",
          "繁华街道"
        ],
        type: "住宅",
        zhuangxiu: "精装",
        kaitime: "2019-09-10",
        jiaotime: "2019-01-10",
        wufei: "2.5",
        wuye: "中天物业",
        lvhua: "30",
        chewei: "1:1.5（2000个车位）",
        huxing: "3室2厅2卫",
        humianji: "120",
        num: "4",
        ping: "4.18",
        zhi: "83.6",
        kaifa: "中天美好集团",
        rongji: "1.5",
        peo: "6"
      },
      right: {
        img: require("~/assets/lou1.png"),
        name: "中梁申花百悦公馆",
        price: "25000",
        you: "无",
        address: "睦州大道与清溪大道交叉口",
        tese: [
          "地铁沿线",
          "繁华街道",
          "地铁沿线",
          "繁华街道",
          "地铁沿线",
          "繁华街道"
        ],
        type: "住宅",
        zhuangxiu: "精装",
        kaitime: "2019-09-10",
        jiaotime: "2019-01-10",
        wufei: "2.5",
        wuye: "中天物业",
        lvhua: "30",
        chewei: "1:1.5（2000个车位）",
        huxing: "3室2厅2卫",
        humianji: "120",
        num: "4",
        ping: "4.18",
        zhi: "83.6",
        kaifa: "中天美好集团",
        rongji: "1.5",
        peo: "13"
      },
      ip: "",
      tel: "",
      id: "",
      call: "",
      checks: "",
      n: "",
      title: "",
      description: "",
      keywords: ""
    };
  },
  methods: {
    start() {
      let that = this;
      this.call = localStorage.getItem("call");
      let ip = ip_arr["ip"];
          // let ip = returnCitySN["cip"];
      this.ip = ip;
      localStorage.getItem("ip");
      let id = this.$route.params.id;
      this.id = id;
    },
    send(sends) {
      this.tel = sends;
      let that = this;
      msg({ phone: sends, channel: 2 })
        .then(resp => {
          if (resp.data.code == 200) {
            $(".t-b-first").hide();
            $(".t-b-second").show();
            var time = 60;
            var tel = sends.substr(0, 3) + "****" + sends.substr(7, 11);
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
            let phone = that.tel;
            let id = that.id;
            let country = localStorage.getItem("city");
            let ip = that.ip;
            morehus_put({
              tel: phone,
              project: id,
              type: 10,
              position: 5,
              page: 3,
              city: country,
              ip: ip
            })
              .then(resp => {})
              .catch(error => {
                console.log(error);
              });
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
    put() {
      let phone = this.tel;
      let id = this.project;
      let country = localStorage.getItem("city");
      let ip = this.ip;
      morehus_put({
        tel: phone,
        project: project,
        type: 10,
        position: 5,
        page: 3,
        city: country,
        ip: ip
      })
        .then(resp => {
          if(resp.data.code==200){

          }else{
            $("#ma-ll").val('');
            $("#ma-ll").attr("placeholder", "验证码不正确");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    check(checks) {
      let that = this;
      let t = this.tel;
      verification({ phone: t, code: checks, channel: 2 })
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
    },
    scroll() {
      let Y = window.scrollY;
      Y = 45 - Y;
      if (Y <= 0) {
        $(".fix").css("top", "0px");
      } else {
        $(".fix").css("top", Y + "px");
      }
    }
  },
  head() {
    return {
      title: this.title || "允家新房-楼盘PK",
      meta: [
        {
          name: "description",
          content: this.description || "允家新房"
        },
        {
          name: "keywords",
          content: this.keywords || "允家新房"
        }
      ]
    };
  },
  mounted() {
    let that = this;
    this.start();
    this.tel = localStorage.getItem("phone");
    jQuery.fn.ratingStars = function(e) {
      var r = {
          selectors: {
            starsSelector: ".rating-stars",
            starSelector: ".rating-star",
            starActiveClass: "is--active",
            starHoverClass: "is--hover",
            starNoHoverClass: "is--no-hover",
            targetFormElementSelector: ".rating-value"
          }
        },
        t = $.extend({}, r, e),
        s = {
          init: function(e) {
            s.registerEvents(e), s.loadDefaultValue(e);
          },
          loadDefaultValue: function(e) {
            var r = $(e)
                .children(t.selectors.targetFormElementSelector)
                .val(),
              s = 0;
            $.each(
              $(e)
                .children(t.starsSelector)
                .children(t.starSelector),
              function(e, a) {
                s <= r - 1 && $(a).addClass(t.selectors.starActiveClass), s++;
              }
            );
          },
          registerEvents: function(e) {
            var r = this;
            $.each(
              $(e)
                .children(t.starsSelector)
                .children(t.starSelector),
              function(t, s) {
                $(s).on("mouseenter", $.proxy(r.onStarEnter, r, s, e)),
                  $(s).on("mouseleave", $.proxy(r.onStarLeave, r, s, e)),
                  $(s).on(
                    "click touchstart",
                    $.proxy(r.onStarSelected, r, s, e)
                  );
              }
            );
          },
          onStarEnter: function(e, r) {
            var s = $(e).index(),
              a = 0;
            $.each(
              $(r)
                .children(t.starsSelector)
                .children(t.starSelector),
              function(e, r) {
                a <= s
                  ? $(r).addClass(t.selectors.starHoverClass)
                  : $(r).addClass(t.selectors.starNoHoverClass),
                  a++;
              }
            ),
              $(r).trigger("ratingOnEnter", { ratingValue: s + 1 });
          },
          onStarLeave: function(e, r) {
            var s = $(e).index();
            $(r)
              .children(t.starsSelector)
              .children(t.starSelector)
              .removeClass(t.selectors.starHoverClass),
              $(r)
                .children(t.starsSelector)
                .children(t.starSelector)
                .removeClass(t.selectors.starNoHoverClass),
              $(r).trigger("ratingOnLeave", { ratingValue: s + 1 });
          },
          onStarSelected: function(e, r) {
            var s = $(e).index();
            $(r)
              .children(t.starsSelector)
              .children(t.starSelector)
              .removeClass(t.selectors.starActiveClass);
            var a = 0;
            $.each(
              $(r)
                .children(t.starsSelector)
                .children(t.starSelector),
              function(e, r) {
                a <= s && $(r).addClass(t.selectors.starActiveClass), a++;
              }
            ),
              $(r)
                .children(t.selectors.targetFormElementSelector)
                .val(s + 1),
              $(r).trigger("ratingChanged", { ratingValue: s + 1 });
          }
        };
      return this.each(function() {
        s.init($(this));
      });
    };
    let ratingOptions = {
      selectors: {
        starsSelector: ".rating-stars",
        starSelector: ".rating-star",
        starActiveClass: "is--active",
        starHoverClass: "is--hover",
        starNoHoverClass: "is--no-hover",
        targetFormElementSelector: ".rating-value"
      }
    };
    $(".rating-stars").ratingStars(ratingOptions);
    $(".p1").on("click", function() {
      that.change = true;
      $(".m-chang").show();
    });
    $(".m-chang").on("click", function() {
      $(".m-chang").hide();
      that.change = false;
      that.succ = false;
    });
    // 接口验证码
    $(".t-b-btn2").on("click", function() {
      let t = that.checks;
      if (t) {
        $(".tishi").hide();
      } else {
        $(".tishi").show();
        return;
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
      that.check(ma);
    });
    $(".o-esc").on("click", function() {
      $(".m-chang").hide();
      that.succ = false;
    });
    $("#o_btn").on("click", function() {
      $(".m-chang").hide();
      that.succ = false;
    });
    $("#w-esc").on("click", function() {
      $(".m-chang").hide();
      that.change = false;
    });
    window.addEventListener("scroll", this.scroll);
  }
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
}
.Pkdetail {
  padding-bottom: 4rem;
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

.fix {
  position: fixed;
  width: 100%;
  background-color: #fff;
  padding: 20px 2%;
}
.fix .f-top {
  display: flex;
  justify-content: center;
  align-items: center;
}
.fix .f-top .f-t-left {
  color: #919499;
  font-size: 13px;
  margin-right: 6.667%;
}
.fix .f-t-r {
  float: left;
  margin-right: 15px;
}
.fix .f-t-r img {
  width: 120px;
  height: 80px;
  border-radius: 3px;
  margin-bottom: 12px;
}
.fix .f-t-r p {
  color: #2e3033;
  font-size: 13px;
  max-width: 120px;
  height: 18px;
  overflow: hidden;
}
.fix .f-bottom {
  margin-top: 15px;
  display: flex;
  justify-content: center;
}
.fix .f-b-left {
  color: #919499;
  font-size: 13px;
  margin-right: 6.667%;
}
.fix .f-b-r {
  float: left;
  margin-right: 15px;
}
.fix .f-b-r p {
  color: #919499;
  font-size: 10px;
  margin-bottom: 18px;
}
.fix .f-b-r p span {
  color: #ff6a48;
  font-size: 18px;
}
.fix .f-b-r button {
  width: 120px;
  height: 25px;
  background-color: #ff7866;
  text-align: center;
  line-height: 25px;
  color: #ffffff;
  font-size: 14px;
  border: 0;
  border-radius: 2px;
}
.fix .f-b-r button img {
  width: 13%;
  margin-right: 2px;
}

.con {
  padding: 0 2%;
  padding-top: 244px;
}
.con h5 {
  color: #2e3033;
  font-size: 16px;
  padding-left: 5px;
  border-left: 2.5px solid #40a2f4;
  margin-bottom: 30px;
}
.con .txt::after {
  content: "";
  display: block;
  clear: both;
  visibility: hidden;
  height: 0;
}
.con .txt p {
  color: #919499;
  font-size: 13px;
  margin-bottom: 30px;
  text-align: center;
  margin-right: 5%;
  float: left;
}
.con .txt p img {
  width: 12%;
  margin-bottom: -2px;
}
.con .txt p span {
  color: #ff6a48;
  font-size: 18px;
}
.con .txt .tit {
  width: 15.3%;
}
.con .txt .msg {
  width: 37%;
}
.con .txt .weight {
  color: #919499;
  font-size: 18px;
  font-weight: bold;
}
.con .txt .msg .top {
  color: #80868e;
  font-size: 12px;
}
.con .txt .msg .mark {
  text-align: center;
  color: #919499;
  font-size: 12px;
  margin: 0;
  margin-top: 4px;
  float: initial;
  background-color: #fff;
}
.con .txt .msg span.tab {
  color: #919499;
  font-size: 11px;
  padding: 2px 3px;
  background-color: #f2f4f7;
  display: inline-block;
  margin-right: 4px;
  margin-bottom: 12px;
}
.con .tese .msg {
  margin-bottom: 18px;
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

.rating-stars .rating-stars-container .rating-star {
  display: inline-block;
  font-size: 9px;
  color: #e8ebed;
  cursor: pointer;
  padding-right: 1px;
}

.rating-stars .rating-stars-container .rating-star.is--active,
.rating-stars .rating-stars-container .rating-star.is--hover {
  color: #3a3c49;
}
.rating-stars {
  display: inline-block;
}

.con .txt .msg .fraction {
  font-size: 18px;
  color: #ff6a48;
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
  margin-top: 2px;
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