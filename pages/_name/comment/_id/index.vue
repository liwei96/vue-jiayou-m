<template>
  <div class="Comment">
    <h3>
      <img src="~/assets/return.png" @click="goback" />楼盘点评
    </h3>
    <div class="con">
      <h5>是否考虑购买该楼盘？</h5>
      <p>
        <span class="ti">必填</span>
        <span class="btn tab" data-v="1">有兴趣</span>
        <span class="btn" data-v="2">待对比</span>
        <span class="btn" data-v="3">不考虑</span>
      </p>
      <div class="score">
        <p>
          综合评分
          <span id="num">3.0</span>分
        </p>
        <div class="rating-stars block" id="another-rating">
          <input
            style="display:none;"
            type="number"
            readonly="readonly"
            class="form-control rating-value"
            name="another-rating-stars-value"
            id="another-rating-stars-value"
            value="3"
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
      </div>
      <textarea name id cols="30" rows="10" placeholder="输入您精彩评论" v-model="content"></textarea>
      <button @click="put">发表</button>
    </div>
    <foot-view :pinyin="jkl"></foot-view>
  </div>
</template>
<script>
import footView from "@/components/Foot.vue";
import { ip, comment_put } from "~/api/api";
export default {
  name: "Comment",
  asyncData(context) {
    let jkl = context.store.state.cookie.pinyin;
    return {
      jkl: jkl
    };
  },
  components: {
    "foot-view": footView
  },
  data() {
    return {
      id: "",
      ip: "",
      status: "1",
      content: "",
      num: "3",
      n: "",
      jkl: ""
    };
  },
  head() {
    return {
      title:  "允家新房-楼盘点评",
      meta: [
        {
          name: "description",
          content:  '允家新房'
        },
        {
          name: "keywords",
          content:  '允家新房'
        }
      ]
    };
  },
  methods: {
    put() {
      if (localStorage.getItem("token") == null) {
        let n = localStorage.getItem("pinyin");
        this.$router.push("/" + n + "/login");
        // window.location.href="/login"
      } else {
        let i = this.id;
        let p = this.ip;
        let n = this.num;
        let s = this.status;
        let c = this.content;
        let token = localStorage.getItem("token");
        let where = {
          token: token,
          ip: p,
          score: n,
          content: c,
          platform: 2,
          consider: s,
          project: i
        };
        comment_put(where)
          .then(resp => {
            if (resp.data.code == 200) {
              this.$router.go(-1);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    getip() {
      let ip = returnCitySN["cip"];
      this.ip = ip;
      localStorage.getItem("ip");
    },
    goback() {
      this.$router.go(-1);
    }
  },
  mounted() {
    
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
    let that = this;
    let id = this.$route.params.id;
    this.id = id;
    this.getip();
    var ratingOptions = {
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
    $(".rating-stars").on("ratingChanged", function(ev, data) {
      // dome something
      let nums = data.ratingValue;
      that.num = nums;
      nums = nums + ".0";
      $("#num").html(nums);
    });
    $(".btn").on("click", function() {
      $(this)
        .addClass("tab")
        .siblings("span")
        .removeClass("tab");
      let n = $(this).attr("data-v");
      that.status = n;
    });
  }
};
</script>
<style scoped>
@import "http://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css";
* {
  padding: 0;
  margin: 0;
}
#Foot{
  position: fixed;
  bottom: 0;
  width: 100%;
}
h3 {
  color: #333333;
  text-align: center;
  height: 44px;
  line-height: 44px;
  font-weight: bold;
  border-bottom: 1px solid #f2f2f2;
  position: relative;
}
h3 img {
  position: absolute;
  width: 5%;
  margin-top: 14px;
  left: 5.33%;
}

.con {
  padding: 0 4%;
}
.con h5 {
  color: #2e3033;
  font-size: 16px;
  margin-bottom: 16px;
  padding-top: 18px;
}
.con p {
  margin-bottom: 18px;
}
.con p .ti {
  color: #919499;
  font-size: 14px;
  margin-right: 2.9%;
}

.con p .btn {
  color: #919499;
  font-size: 14px;
  padding: 3px 8px;
  border-radius: 2px;
  display: inline-block;
  margin-right: 2.6%;
  border: 0.5px solid #d6d7e2;
}
.con p .tab {
  display: inline-block;
  color: #fff;
  font-size: 14px;
  padding: 3px 8px;
  background-color: #59c1ff;
  border-radius: 2px;
  margin-right: 2.6%;
  border: 0;
}
.con .score {
  margin-bottom: 30px;
}
.rating-stars .rating-stars-container .rating-star {
  display: inline-block;
  font-size: 18px;
  color: #e8ebed;
  cursor: pointer;
  padding-right: 3px;
}

.rating-stars .rating-stars-container .rating-star.is--active,
.rating-stars .rating-stars-container .rating-star.is--hover {
  color: #59c1ff;
}
.rating-stars {
  display: inline-block;
  margin-left: 10px;
}
.con .score p {
  color: #919499;
  font-size: 14px;
  margin-right: 5.5%;
  display: inline-block;
  margin-bottom: 0;
}
.con .score p span {
  color: #ff6a48;
  font-size: 30px;
  font-weight: bold;
}
.con textarea {
  width: 100%;
  height: 150px;
  border-radius: 4px;
  padding: 15px 4%;
  background-color: #f2f4f7;
  border: 0;
  color: #919499;
  font-size: 16px;
  margin-bottom: 40px;
}

::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #999;
  font-size: 16px;
}

::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #999;
  font-size: 16px;
}

:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #999;
  font-size: 16px;
}

button {
  width: 100%;
  height: 44%;
  border-radius: 4px;
  background: linear-gradient(
    270deg,
    rgba(102, 207, 255, 1),
    rgba(76, 181, 255, 1)
  );
  line-height: 44px;
  text-align: center;
  color: #fff;
  font-size: 16px;
  border: 0;
}
</style>