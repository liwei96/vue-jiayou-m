<template>
  <div class="Footprint">
    <h3><img @click="returnPage" src="~/assets/return.png" />我的足迹</h3>
    <div class="recommen">
      <div class="re-con">
        <div class="re-list" v-for="(list, index) in lists" :key="index">
          <router-link :to="'/' + jkl + '/content/' + list.id">
            <div class="re-con-left">
              <img :src="list.img" />

              <span>
                <i class="iconfont iconyanjing"></i>
                {{ list.num }}
              </span>
            </div>
            <div class="re-con-right">
              <h5>
                {{ list.name }}
                <span>{{ list.status }}</span>
              </h5>
              <p class="price">
                <span>{{ list.single_price }}</span
                >元/m²
              </p>
              <p class="area">
                <span>{{ list.city }}-{{ list.country }}</span>
                <span>建面</span>
                <span
                  >{{ parseInt(list.area_min) }}-{{
                    parseInt(list.area_max)
                  }}m²</span
                >
              </p>
              <p class="tabs">
                <strong>{{ list.decorate }}</strong>
                <span v-if="list.railway">{{ list.railway }}</span>
                <span id="tag">{{ list.tag }}</span>
              </p>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <div class="nothing">
      <img src="~/assets/footers.png" alt />
      <p>您还没有浏览记录，快去看看楼盘吧~</p>
      <router-link :to="'/' + jkl + '/search'">
        <button>去看楼盘</button>
      </router-link>
    </div>
    <foot-view :pinyin="jkl"></foot-view>
  </div>
</template>

<script>
import { foot_data, ip } from "~/api/api";
import footView from "@/components/Foot.vue";
export default {
  name: "Footprint",
  async asyncData(context) {
    try {
      let ip = context.store.state.cookie.ip;
      let city = context.store.state.cookie.city;
      let token = context.store.state.cookie.token;
      let jkl = context.store.state.cookie.pinyin;
      let kid = context.store.state.cookie.kid
        ? context.store.state.cookie.kid
        : "";
      let other = context.store.state.cookie.other
        ? context.store.state.cookie.other
        : "";
      let [res] = await Promise.all([
        context.$axios
          .post("/api/project/my_foot", {
            ip: ip,
            city: city,
            page: 1,
            limit: 10,
            platform: 2,
            token: token,
            kid: kid,
            other: other,
          })
          .then((resp) => {
            let data = resp.data.data;
            return data;
          }),
      ]);
      return {
        lists: res,
        jkl: jkl,
      };
    } catch (err) {
      console.log("errConsole========:", err);
      context.error({ statusCode: 404, message: "页面未找到或无数据" });
    }
  },
  components: {
    "foot-view": footView,
  },
  head() {
    return {
      title: "允家新房-我的足迹",
      meta: [
        {
          name: "description",
          content: "允家新房",
        },
        {
          name: "Keywords",
          content: "允家新房",
        },
      ],
    };
  },
  data() {
    return {
      lists: [],
      n: "",
      jkl: "",
      page: 2,
      ting: true,
    };
  },
  methods: {
    returnPage() {
      // 跳转上一级
      // 这个判断用来解决这种情况，当用户没有上一条路由的历史记录，出现点击返回按钮没有反应时，下面的代码用来判断有没有上一条路由的历史记录   如果没有则返回首页
      this.$router.go(-1);
    },
    start() {
      let that = this;
      this.n = this.$route.params.name;
      let ip = ip_arr["ip"];
      // let ip = returnCitySN["cip"];
      this.ip = ip;
      if (that.lists) {
        if (!that.lists || that.lists.length == 0) {
          $(".nothing").show();
          $(".recommen").hide();
        } else {
          $(".nothing").hide();
          $(".recommen").show();
        }
      } else {
        $(".nothing").show();
        $(".recommen").hide();
      }
    },
    getmore() {
      this.ting = false;
      let ip = ip_arr["ip"];
      // let ip = returnCitySN["cip"];
      let token = localStorage.getItem("token");
      let page = this.page;
      let city = localStorage.getItem("city");
      let that = this;
      foot_data({
        ip: ip,
        city: city,
        page: page,
        limit: 10,
        platform: 2,
        token: token,
      })
        .then((res) => {
          that.ting = true;
          let data = res.data.data;
          let l = that.lists.concat(data);
          that.lists = l;
          that.page = that.page + 1;
        })
        .catch((error) => {
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
  },
  mounted() {
    this.$nextTick(function () {
      let h = $("body").height();
      if (h < 700) {
        $("#Foot").css({
          position: "fixed",
          bottom: "0",
          width: "100%",
          marginBottom: 0,
        });
      } else if (h >= 700) {
        $("#Foot").css({
          position: "relative",
          bottom: "0",
          width: "100%",
          marginBottom: 0,
        });
      }
    });

    this.start();
    window.addEventListener("scroll", this.scroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scroll);
  },
};
</script>


<style scoped>
* {
  padding: 0;
  margin: 0;
}
.recommen {
  display: none;
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
  padding: 3px 5px;
  background-color: #ebf5fc;
  display: inline-block;
  margin-right: 6px;
  color: #4db5ff;
  font-size: 11px;
  float: left;
}
.recommen .re-list .re-con-right .tabs span {
  padding: 3px 5px;
  background-color: #f7f8fa;
  color: #919499;
  font-size: 11px;
  margin-right: 6px;
  float: left;
}
.recommen .re-list .re-con-right .tabs #tag {
  display: inline-block;
  width: 113px;
  height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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

/* 没收藏内容 */
.nothing {
  display: none;
}
.nothing img {
  width: 50%;
  position: relative;
  left: 50%;
  margin-left: -25%;
  margin-bottom: 50px;
  margin-top: 125px;
}
.nothing p {
  color: #898da1;
  font-size: 16px;
  text-align: center;
  margin-bottom: 40px;
}
.nothing button {
  width: 53.333%;
  position: relative;
  left: 50%;
  margin-left: -26.6667%;
  border: 1px solid #40a2f4;
  text-align: center;
  line-height: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #fff;
  color: #40a2f4;
}
</style>
