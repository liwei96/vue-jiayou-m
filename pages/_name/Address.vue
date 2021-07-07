<template>
  <div class="Address">
    <nav>
      <img class="back" src="~/assets/return.png" @click="goback" alt />
      <img class="content-img" src="~/assets/content-logo.png" alt />
    </nav>
    <div class="current">
      <img src="~/assets/cur.png" alt class="cur" />
      <span class="city">{{ city }}</span>
      <span class="msg">当前城市</span>
      <!-- <span class="btn" @click="getcity($event)">{{ btn }}</span> -->
    </div>
    <div class="hot">
      <h5>支持城市</h5>
      <div class="hot-tabs">
        <span
          v-for="hot in hots"
          :data-v="hot.id"
          :key="hot.id"
          @click="setcity"
          :data-n="hot.pinyin"
          >{{ hot.name }}</span
        >
      </div>
    </div>
    <div class="all">
      <h4>全部城市</h4>
      <div v-for="(item, key) in list" :key="key">
        <p class="tit" :id="item">{{ item }}</p>
        <ul>
          <li
            v-for="city in cities[item]"
            :key="city.id"
            @click="show($event, city.id, city.name, city.pinyin)"
          >
            {{ city.name }}
          </li>
        </ul>
      </div>
    </div>
    <ul class="right">
      <li v-for="(item, key) in list" :key="'sdf' + key">
        <a :href="'#' + item">{{ item }}</a>
      </li>
    </ul>
    <div class="zhao" @click="close"></div>
    <div class="tan" v-if="kk">
      <img src="~/assets/w-del.png" alt class="del" @click="close" />
      <img class="bg" src="~/assets/addressd.png" alt />
      <h5>很遗憾没有城市信息</h5>
      <p>
        非常遗憾的通知您，您当前选择的城市我并未涉及，不是我们能力不足，是我们需要更多的人来一起点亮它，让我们一起来维护您选择的家园
      </p>
      <div class="bom">
        <div class="b-left" @click="tohot">热门城市</div>
        <div class="b-right" @click="please">申请开放</div>
      </div>
    </div>
    <foot-view :pinyin="jkl"></foot-view>
    <!-- <div class="msg">
      我们已收到您诚挚的申请，在下一个开放城市中我们会优先开放—{{ getname }}
    </div> -->
    <van-popup
      v-model="tan"
      :style="{ background: 'rgba(0,0,0,0)' }"
      @click-overlay="typebtn = 0"
    >
      <tan-view
        :txt="remark"
        :typenum="typenum"
        :id="id"
        :name="name"
        @close="cli($event)"
        :typebtn="typebtn"
        :proname="''"
        :city="cityid"
      ></tan-view>
    </van-popup>
  </div>
</template>
<script>
import footView from "@/components/Foot.vue";
import { address_start, ip } from "~/api/api";
import axios from "axios";
import tan from "@/components/tan.vue";
export default {
  name: "Address",
  async asyncData(context) {
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
    let [res1] = await Promise.all([
      
        context.$axios
        .get("/cities/all", { params: { city: city } })
        .then((resp) => {
          let msg = resp.data.data;
          return msg;
        }),
    ]);
    return {
      jkl: jkl,
      cities: res1.cities,
      hots: res1.hots,
      current: res1.current
    };
  },
  data() {
    return {
      tan: false,
      remark: "",
      name: "申请开放",
      typebtn: 1,
      typenum: 122,
      id: '0',
      kk: false,
      getname: "",
      ll: 0,
      hot: [],
      list: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "J",
        "K",
        "L",
        "M",
        "N",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "W",
        "X",
        "Y",
        "Z",
      ],
      city: "杭州",
      btn: "重新定位",
      hots: [],
      ip: "",
      jkl: "",
      title: "",
      keywords: "",
      description: "",
      cityid: 0
    };
  },
  head() {
    return {
      title: "允家新房-楼盘城市",
      meta: [
        {
          name: "description",
          content: "允家新房-楼盘城市",
        },
        {
          name: "Keywords",
          content: "允家新房-楼盘城市",
        },
      ],
    };
  },
  components: {
    "foot-view": footView,
    "tan-view": tan
  },
  methods: {
    getcity() {
      this.getip();
    },
    setcity(e) {
      let city = e.target.getAttribute("data-v");
      let n = e.target.getAttribute("data-n");
      let name = e.target.innerHTML;
      localStorage.setItem("city", city);
      $cookies.set("city", city);
      localStorage.setItem("cityname", name);
      $cookies.set("cityname", name);
      localStorage.setItem("pinyin", n);
      $cookies.set("pinyin", n);
      window.location.href = "/" + n;
      // this.$router.push("/" + n);
    },

    goback() {
      this.$router.go(-1);
    },
    show(e, id, name, pinyin) {
      let type = false
      for(let item of this.hots) {
        if (item.id == id) {
          type = true
        }
      }
      if (type) {
        let city = id;
        let n = pinyin;
        let name = name;
        localStorage.setItem("city", city);
        $cookies.set("city", city);
        localStorage.setItem("cityname", name);
        $cookies.set("cityname", name);
        localStorage.setItem("pinyin", n);
        $cookies.set("pinyin", n);
        window.location.href = "/" + n;
      } else {
        this.cityid = id
        $(".zhao").show();
        this.kk = true;
      }
    },
    close() {
      $(".zhao").hide();
      this.kk = false;
      this.ll = 0;
    },
    tohot() {
      $(".zhao").hide();
      this.kk = false;
      window.scrollTo(0, 0);
    },
    please() {
      this.tan = true;
      this.kk = false
      $(".zhao").hide();
      // if (this.ll == 0) {
      //   this.ll = 1;
      //   $(".b-right").css({ color: "#B8BCC2" });
      //   $(".msg").show();
      //   setTimeout(function () {
      //     $(".msg").hide();
      //   }, 2000);
      // }
    },
  },
  mounted() {
    let that = this;
    let n = localStorage.getItem("pinyin");
    $("#sea").on("click", function () {
      // window.location.href = '/'+n+"/soucity";
      this.$router.push("/" + n + "/soucity");
    });
    $(".zhao").on("click", function () {
      $(this).hide();
      that.kk = false;
    });
  },
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
.msg {
  display: none;
  position: fixed;
  width: 42.67%;
  height: 119px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.8);
  z-index: 3;
  top: 300px;
  left: 28.67%;
  padding: 18px 5.2% 0 5.2%;
  color: #dadada;
  font-size: 14px;
}
.zhao {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  display: none;
}
.tan {
  width: 77.33%;
  height: 335px;
  background-color: #fff;
  position: fixed;
  top: 200px;
  border-radius: 15px;
  left: 11.333%;
  text-align: center;
  overflow: hidden;
}
.tan .bg {
  width: 38%;
  margin-top: 30px;
  margin-bottom: 20px;
}
.tan .del {
  position: absolute;
  width: 6%;
  right: 5%;
  top: 5%;
}
.tan h5 {
  color: #449dff;
  font-size: 20px;
  margin-bottom: 12px;
  font-weight: bold;
}
.tan p {
  color: #b8bcc2;
  font-size: 14px;
  padding: 0 7.8%;
  text-align: left;
}
.tan .bom {
  width: 100%;
  height: 50px;
  position: absolute;
  bottom: 0;
  border-top: 0.5px solid #f2f5f7;
}
.tan .b-left {
  width: 50%;
  float: left;
  border-right: 0.5px solid #f2f5f7;
  text-align: center;
  height: 50px;
  line-height: 50px;
  color: #b8bcc2;
  font-size: 16px;
}
.tan .b-right {
  width: 50%;
  float: left;
  text-align: center;
  height: 50px;
  line-height: 50px;
  color: #449dff;
  font-size: 16px;
}
nav {
  width: 100%;
  height: 48px;
  border-bottom: 0.5px solid #f2f2f2;
}
nav .back {
  position: absolute;
  width: 5%;
  margin-top: 14px;
  left: 4%;
}
nav .content-img {
  width: 14%;
  float: left;
  margin-top: 2.6%;
  margin-left: 45%;
}
nav button {
  width: 83.3333%;
  height: 30px;
  border-radius: 15px;
  background-color: #ecedf1;
  padding-left: 33px;
  line-height: 30px;
  border: 0;
  color: #919299;
  font-size: 13px;
  text-align: left;
  margin-top: 8px;
  margin-left: 12.667%;
  position: relative;
}
nav .search {
  position: absolute;
  width: 6%;
  top: 5px;
  left: 3%;
}
.current {
  border-bottom: 0.5px solid #f2f3f7;
  line-height: 54px;
  height: 54px;
  padding: 0 4%;
}
.current .cur {
  width: 5%;
  margin-right: 1%;
  display: inline-block;
  margin-bottom: -3px;
}
.current .city {
  color: #3b3c40;
  font-size: 16px;
  margin-right: 2%;
}
.current .msg {
  color: #abacb2;
  font-size: 12px;
}
.current .btn {
  color: #40a2f4;
  font-size: 14px;
  float: right;
  margin-top: 16px;
}

.hot {
  padding: 0 4%;
}
.hot h5 {
  color: #2e3033;
  font-size: 16px;
  margin-bottom: 20px;
  font-weight: bold;
  margin-top: 14px;
}
.hot span {
  width: 18.666%;
  height: 24px;
  background-color: #f2f4f7;
  text-align: center;
  line-height: 24px;
  display: inline-block;
  margin-right: 3.773%;
  color: #5e6166;
  font-size: 14px;
  margin-bottom: 15px;
}

.all {
  margin-top: 10px;
}
.all h4 {
  color: #2e3033;
  font-size: 16px;
  margin-bottom: 14px;
  margin-left: 4%;
}
.all .tit {
  width: 100%;
  height: 30px;
  background-color: #f2f4f7;
  line-height: 30px;
  padding-left: 6%;
  color: #2e3033;
  font-size: 18px;
}
.all ul {
  padding: 0 4%;
}
.all ul li {
  height: 47px;
  border-bottom: 0.5px solid #f2f3f7;
  color: #2e3033;
  font-size: 14px;
  line-height: 47px;
}

.right {
  position: fixed;
  right: 3%;
  top: 160px;
}
.right li {
  color: #919499;
  font-size: 10px;
  margin-bottom: 5px;
}
.right li a {
  text-decoration: none;
  color: #919499;
  font-size: 10px;
  margin-bottom: 5px;
  text-align: center;
}
</style>