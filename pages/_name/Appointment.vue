<template>
  <div class="Appointment">
    <div class="container-fluid m">
      <div class="m-title visible-xs-block .visible-sm-block">
        <img src="~/assets/return.png" alt @click="goback" />
        <h3>预约看房</h3>
      </div>
      <img class="m-img visible-xs-block .visible-sm-block" src="~/assets/yue.jpg" alt />
      <div class="m-content visible-xs-block .visible-sm-block">
        <!-- <p class="m-ti">已有281人成功预约免费专车看房</p> -->
        <div class="m-form">
          <p class="m-t">您的称呼:</p>
          <input class="m-in" type="radio" name="group1" checked value="先生" />
          <span class="m-sp1">先生</span>
          <input type="radio" name="group1" value="女士" />
          <span class="m-sp2">女士</span>
          <p class="m-t m-t1">预约看房时间:</p>
          <div
            class="kinerDatePickerInput"
            id="kinerDatePickerInput1"
            title="请选择您要预约的看房时间"
            @click="showPopup"
          >{{time}}</div>
          <img class="m-go" src="~/assets/ygo.png" alt />
          <van-popup v-model="show" position="bottom">
            <van-datetime-picker
              v-model="currentDate"
              type="datetime"
              :min-date="minDate"
              :max-date="maxDate"
              @cancel="down"
              @confirm="yes"
            />
          </van-popup>

          <button id="m_btn" @click="put()">确定</button>
        </div>
      </div>
    </div>
    <foot-view :pinyin="jkl"></foot-view>
  </div>
</template>
<script>
import footView from "@/components/Foot.vue";
let moment = require("moment");
import { yuyue, ip } from "~/api/api";
export default {
  name: "Appointment",
  asyncData (context) {
    let jkl = context.store.state.cookie.pinyin;
    return {
      jkl:jkl
    }
  },
  components: {
    "foot-view": footView
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
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      show: false,
      time: "请选择您要预约的看房时间",
      n: "",
      jkl:''
    };
  },
  methods: {
    down() {
      this.show = false;
    },
    showPopup() {
      this.show = true;
    },
    yes(value) {
      var res = moment(value).format("YYYY-MM-DD");
      this.time = res;
      this.show = false;
    },
    put() {
      let that = this;
      let Ip = returnCitySN["cip"];
      let city = localStorage.getItem("city");
      let time = that.time;
      let token = localStorage.getItem("token");
      yuyue({
        ip: Ip,
        page: 3,
        position: 5,
        token: token,
        appointment: time,
        platform: 2,
        city: city
      })
        .then(resp => {
          if (resp.data.code == 200) {
            that.$router.push("/" + that.n + "/myhome");
            // window.location.href='/'+that.n+"/myhome";
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    goback() {
      this.$router.go(-1);
    }
  },
  mounted() {
    $("#Foot").css({ position: "fixed", bottom: "0", width: "100%",marginBottom:0 });
    this.n = this.$route.params.name;
    let ip = returnCitySN["cip"];
    this.ip = ip;
    localStorage.getItem("ip");
    // let that=this;
    // $("#m_btn").on("click", function() {
    //   var data = {
    //     sex: $("input:checked").val(),
    //     time: that.time,
    //   };
    // });
  }
};
</script>
<style scoped>
@import "~/static/css/style.css";

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
.m-title {
  position: relative;
  width: 100%;
  height: 44px;
  text-align: center;
  line-height: 44px;
}
.m-title img {
  position: absolute;
  width: 5%;
  margin-top: 14px;
  left: 5.3333%;
}
.m-title h3 {
  color: #333333;
  font-size: 18px;
  margin: 0;
  font-weight: bold;
  line-height: 44px;
}
.m-img {
  width: 100%;
}
/* m-content */
.m-content {
  width: 100%;
  padding-top: 80px;
}
.m-content .m-ti {
  color: #333333;
  font-size: 16px;
  margin-left: 18.66667%;
  margin-bottom: 37px;
}
.m-content .m-form {
  width: 100%;
  padding: 0 4%;
  position: relative;
  margin-bottom: 80px;
}
.m-content .m-form .m-t {
  font-size: 13px;
  color: #666666;
  margin-bottom: 2px;
}
.m-content .m-form input {
  margin-right: 5.33333333%;
  margin-left: 0;
}
.m-content .m-form .m-in {
  margin-right: 24%;
}
.m-content .m-form span {
  color: #323232;
  font-size: 16px;
  margin-right: 34px;
  position: absolute;
  top: 11%;
}
.m-content .m-form .m-sp1 {
  left: 14%;
}

.m-content .m-form .m-t1 {
  margin-top: 25px;
  margin-bottom: 20px;
}
.m-content .m-form .kinerDatePickerInput {
  width: 100%;
  height: 40px;
  border-radius: 4px;
  background: #fff;
  border: 1px solid rgba(64, 162, 244, 1);
  color: #40a2f4;
  font-size: 15px;
  line-height: 40px;
  padding-left: 5%;
}
.m-content .m-form .m-go {
  position: absolute;
  top: 46%;
  right: 8%;
  width: 5.5%;
}
.m-content .m-form button {
  width: 100%;
  height: 40px;
  background-color: #f2f3f7;
  color: #40a2f4;
  font-size: 15px;
  margin-top: 75px;
  border: 0px;
  border-radius: 4px;
}
#time {
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
}
</style>