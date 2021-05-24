<template>
  <div id="Popup">
    <div v-show="!ishengda">
      <img src="~/assets/j-del.png" alt class="close" @click="close" />
      <img src="~/assets/wenjian.png" alt="" class="wenjian" v-if="iswenjian">
      <h3>{{ name }}</h3>
      <p class="type">{{ str }}</p>
      <div class="one" v-show="!type">
        <input type="tel" placeholder="请输入手机号" v-model="baoming" />
        <button @click="send">{{ btnstr }}</button>
        <p class="bomm">订阅后有专属的新房咨询师与您电话联系，并提供专业的咨询服务</p>
      </div>
      <div class="two" v-show="type">
        <p>
          验证码已发送到
          <i id="ytel">187****4376</i> 请注意查看
        </p>
        <input type="number" placeholder="输入验证码" v-model="ma" />
        <span class="t-b-scode" @click="send">57秒后重发</span>
        <button @click="put">确定</button>
      </div>
    </div>
    <div v-show="ishengda">
      <div class="hengda">
        <img src="~/assets/w-del.png" alt="" class="del" @click="close" />
        <img class="top" src="~/assets/hengda.png" alt="" />
        <input type="text" v-model="IDcode" placeholder="输入身份证号后6位" />
        <p class="tishi">
          注: 根据本楼盘售楼处规定，实地看房需先提前报备 身份证后6位
        </p>
        <button @click="daput">申请报备</button>
      </div>
    </div>
    <p class="tishimsg" v-if="show">{{ msg }}</p>
  </div>
</template>
<script>
import { put, check, send, hengda } from "~/api/api";
export default {
  async asyncData(context) {
    let jkl = context.params.name;
    return {
      jkl: jkl,
    };
  },
  props: ['id','typenum','name','typebtn','txt','proname','lucktype','iswenjian'],
  data() {
    return {
      show: false,
      baoming: "",
      ma: "",
      checks: true,
      tishi: "",
      type: false,
      str: "提前预约看房，我们将提供免费专车接送和专业楼盘讲解",
      msg: "请输入正确手机号",
      ishengda: false,
      IDcode: "",
      jkl: "",
      btnstr: "立即订阅",
      interval: null,
    };
  },
  methods: {
    setmsg() {
      if ($cookies.get("phone")) {
        this.baoming = $cookies.get("phone");
      }
    },
    goo() {
      let jkl = this.$route.params.name;
      this.$router.push("/" + jkl + "/server");
    },
    send() {
      let that = this;
      clearInterval(that.interval);
      let checks = this.checks;
      if (!checks) {
        this.toast("请勾选用户协议");
        return;
      }
      var phone = this.baoming;
      var pattern_phone = /^1[3-9][0-9]{9}$/;
      if (phone == "") {
        this.toast("手机号不能为空");
        return;
      } else if (!pattern_phone.test(phone)) {
        this.toast("手机号码不合法");
        return;
      }
      let id = this.id;
      let typenum = this.typenum;
      let ip = ip_arr["ip"];
      let city = $cookies.get("city");
      let kid = $cookies.get("kid");
      let other = $cookies.get("other");
      let txt = this.txt;
      let ol = true;
      put({
        ip: ip,
        tel: phone,
        page: 3,
        project: id,
        city: city,
        remark: txt,
        position: typenum,
        kid: kid,
        other: other,
      }).then((res) => {
        if (res.data.code == 200) {
          send({ ip: ip, phone: phone, source: 3 })
            .then((res) => {
              if (res.data.code == 200) {
                this.type = true;
                var time = 60;
                var tel = phone.substr(0, 3) + "****" + phone.substr(7, 11);
                var fn = function () {
                  time--;
                  if (time > 0) {
                    $(".t-b-scode").html("重新发送" + time + "s");
                    $(".t-b-scode").attr("disabled", true);
                  } else {
                    clearInterval(that.interval);
                    $(".t-b-scode").html("获取验证码");
                    $(".t-b-scode").attr("disabled", false);
                  }
                };
                fn();
                that.interval = setInterval(fn, 1000);
                $("#ytel").html(tel);
              } else {
                console.log(res);
                this.toast("发送过于频繁");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
        if (res.data.code == 500) {
          this.toast(res.data.msg || res.data.message);
          setTimeout(() => {
            that.$emit("close", false);
          }, 2000);
        }
      });
    },
    put() {
      let checks = this.checks;
      if (!checks) {
        this.toast("请勾选用户协议");
        return;
      }
      var phone = this.baoming;
      var pattern_phone = /^1[3-9][0-9]{9}$/;
      if (phone == "") {
        this.toast("手机号不能为空");
        return;
      } else if (!pattern_phone.test(phone)) {
        this.toast("手机号码不合法");
        return;
      }
      if (!this.ma) {
        this.toast("请输入验证码");
        return;
      }
      let ma = this.ma;
      let ip = ip_arr["ip"];
      let that = this;
      check({ phone: phone, code: ma, source: 2, ip: ip })
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            if (this.proname) {
              if (this.proname.indexOf("恒大") == -1) {
                this.toast("提交成功");
                if (that.lucktype == 1) {
                  $cookies.set("token", res.data.token, 21600);
                  $cookies.set("phone", phone, 21600);
                  let tel = phone.substr(0, 3) + "****" + phone.substr(7);
                  $cookies.set("username", tel);
                  this.$store.dispatch("setoken", res.data.token);
                } else {
                  if (!$cookies.get("token")) {
                    $cookies.set("token", res.data.token, 21600);
                    $cookies.set("phone", phone, 21600);
                    let tel = phone.substr(0, 3) + "****" + phone.substr(7);
                    $cookies.set("username", tel);
                    this.$store.dispatch("setoken", res.data.token);
                  }
                }
                this.type = false;
                this.$emit("close", false);
              } else {
                this.ishengda = true;
              }
            } else {
              this.toast("提交成功");
              if (that.lucktype == 1) {
                $cookies.set("token", res.data.token, 21600);
                $cookies.set("phone", phone, 21600);
                let tel = phone.substr(0, 3) + "****" + phone.substr(7);
                $cookies.set("username", tel);
                this.$store.dispatch("setoken", res.data.token);
              } else {
                if (!$cookies.get("token")) {
                  $cookies.set("token", res.data.token, 21600);
                  $cookies.set("phone", phone, 21600);
                  let tel = phone.substr(0, 3) + "****" + phone.substr(7);
                  $cookies.set("username", tel);
                  this.$store.dispatch("setoken", res.data.token);
                }
              }
              this.type = false;
              this.$emit("close", false);
            }
          } else {
            this.toast("验证码不正确");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    close() {
      this.type = false;
      this.$emit("close", false);
    },
    daput() {
      let that = this;
      if (!that.IDcode) {
        that.toast("请填写后六位");
        return;
      }
      if (that.IDcode.length != 6) {
        that.toast("请填写后六位");
        return;
      }
      hengda({ identity: that.IDcode, phone: that.baoming }).then((res) => {
        that.toast("提交成功");
        this.type = false;
        this.$emit("close", false);
      });
    },
  },
  mounted() {
    let type = this.name;
    if ($cookies.get("phone")) {
      this.baoming = $cookies.get("phone");
    }
    if (type == "变价通知我") {
      this.str =
        "价格变动这么快？订阅楼盘变价通知，楼盘变价我们将第一时间通知您";
      this.btnstr = "立即订阅";
    } else if (type == "预约咨询") {
      this.str = "20分内回应，一对一专属于服务，了解更多有关房源信息";
      this.btnstr = "立即预约";
    } else if (type == "开盘提醒我") {
      this.str = "一键订阅最新开盘通知，我们会第一时间通知,不再错过开盘时间";
    } else if (type == "预约看房") {
      this.str = "提前预约看房，我们将提供免费专车接送和专业楼盘讲解";
      this.btnstr = "立即预约";
    } else if (type == "订阅实时动态") {
      this.str = "订阅最新动态，楼盘最新情报抢先知道，帮您找准买房好时机";
      this.btnstr = "立即订阅";
    } else if (type == "获取周边5公里详细配套") {
      this.str = "想了解更多周边配套信息？立即获取全面周边配套详解";
      this.btnstr = "立即获取";
    } else if (type == "查询最新成交价") {
      this.str = "获取最新成交价格，看看房友都是什么价格买的房";
      this.btnstr = "立即查询";
    } else if (type == "咨询户型底价") {
      this.str = "好楼盘户型是关键，咨询详细户型信息，安安心心买房";
    } else if (type == "领取分析资料") {
      this.str = "最新楼盘分析资料，看看房产专家对楼盘的投资分析和宜居分析解读";
      this.btnstr = "立即获取";
    } else if (type == "咨询特价房") {
      this.str = "享受底价购房，特价房源不错过";
      this.btnstr = "立即咨询";
    } else if (type == "领取优惠") {
      this.str = "专享限时优惠折扣，家园专场推出，早抢早优惠";
      this.btnstr = "立即领取";
      $cookies.set("have", 1);
    } else if (type == "免费领取") {
      this.str = "精准匹配房源，免费接送一次看完好房";
    } else if (type == "获取详细分析报告") {
      this.str = "向允家咨询师免费领取分析报告,内附有购房流程全盘解读";
    } else if (type == "咨询楼盘底价") {
      this.str = "好楼盘户型是关键，咨询户型底价，安安心心买房";
    } else if (type == "咨询服务") {
      this.str = "立即报名，专业人员为你解惑!";
      this.btnstr = "立即预约";
    } else if (type == "领取分析资料") {
      this.str = "最新楼盘分析资料，看看房产专家对楼盘的投资分析和宜居分析解读";
    } else if (type == "一键咨询") {
      this.str = "立即报名，专业人员为你解惑!";
    } else if (type == "免费咨询") {
      this.str = "立即报名，专业人员为你解惑!";
    } else if (type == "咨询详细楼盘信息") {
      this.str = "向家园咨询师免费领取楼盘资料,内附有购房流程全盘解读";
    } else if (type == "免费专车看房") {
      this.str = "免费专车看房，楼下接您随时出发，可带家人一起看楼盘";
    } else if (type == "领取全部户型资料") {
      this.str = "好楼盘户型是关键，咨询详细户型信息，安安心心买房";
      this.btnstr = "立即领取";
    } else if (type == "查询最底价") {
      this.str = "咨询楼盘最底价，享受底价购房，特价房源不错过";
      this.btnstr = "立即查询";
    } else if (type == "抢特价房") {
      this.str = "享受底价购房，特价房源不错过";
      this.btnstr = "立即抢购";
    } else if (type == "领取详细资料") {
      this.str =
        "最新楼盘分析资料，看看房产专家对楼盘的分析和解读";
      this.btnstr = "立即领取";
    }
    console.log(this.name);
  },
  watch: {
    typebtn(curVal, oldVal) {
      console.log(curVal, oldVal);
      if (curVal == 0) {
        this.type = false;
      }
    },
    name(val) {
      this.setmsg();
    },
  },
};
</script>
<style lang="less" scoped>
*{
  margin: 0;
  padding: 0;
}
#Popup {
  width: 20.3125rem;
  height: 23.4375rem;
  background-color: #fff;
  border-radius: .25rem;
  overflow: hidden;
  position: relative;
  .close {
    width: 1rem;
    position: absolute;
    top: 1rem;
    right: 1rem;
    opacity: 1!important;
  }
  .wenjian {
    width: 2.875rem;
    position: absolute;
    left: 1.75rem;
    top: 2.125rem;
  }
  h3 {
    padding-top: 2.75rem;
    margin-bottom: 1.5rem;
    color: #14181A;
    font-size: 1.5rem;
    text-align: center;
    font-weight: bold;
  }
  .type {
    padding: 0 1.25rem;
    color: #2E3133;
    line-height: 1.5rem;
    font-size: 1rem;
  }
  .one {
    margin-top: 1.75rem;
    padding: 0 1.25rem;
    input[type="tel"] {
      height: 3.4375rem;
      border-radius: .1875rem;
      border: 0.09375rem solid #b3b3b3;
      padding-left: 0.9375rem;
      width: 17.8125rem;
      margin-bottom: 1.25rem;
    }
    button {
      width: 100%;
      height: 2.75rem;
      border-radius: 0.375rem;
      text-align: center;
      line-height: 2.75rem;
      color: #fff;
      font-size: 1rem;
      border: 0;
      background: linear-gradient(-90deg, #4795FF, #50BFF9);
      margin-bottom: .875rem;
    }
    .bomm {
      color: #8F8F8F;
      font-size: .8125rem;
    }
  }
  .two {
    padding: 0 1.25rem;
    margin-top: 1.75rem;
    position: relative;
    p {
      color: #999999;
      font-size: 0.75rem;
      margin-bottom: 0.75rem;
      i {
        font-style: normal;
      }
    }
    input[type="number"] {
      height: 3.4375rem;
      border-radius: .1875rem;
      border: 0.09375rem solid #b3b3b3;
      padding-left: 0.9375rem;
      width: 17.8125rem;
      margin-bottom: 2.75rem;
    }
    span {
      color: #7496be;
      font-size: 1rem;
      position: absolute;
      right: 2.25rem;
      top: 2.875rem;
    }
    button {
      width: 100%;
      height: 2.75rem;
      border-radius: 0.375rem;
      text-align: center;
      line-height: 2.75rem;
      color: #fff;
      font-size: 1rem;
      border: 0;
      background: linear-gradient(-90deg, #4795FF, #50BFF9);;
      margin-bottom: 0.625rem;
    }
  }
  .tishimsg {
    width: 11.25rem;
    height: 3.75rem;
    border-radius: 0.375rem;
    background: rgba(0, 0, 0, 0.8);
    color: #cdcdcd;
    font-size: 1rem;
    position: absolute;
    text-align: center;
    line-height: 3.75rem;
    top: 46%;
    left: 50%;
    margin-left: -5.625rem;
  }
  .hengda {
    .top {
      width: 100%;
    }
    .del {
      width: 0.875rem;
      position: absolute;
      right: 1rem;
      top: 1rem;
    }
    input {
      height: 3.4375rem;
      border-radius: 0.375rem;
      border: 0.09375rem solid #b3b3b3;
      padding-left: 0.9375rem;
      width: 16.625rem;
      margin-top: 2.3125rem;
      margin-left: 1.625rem;
    }
    .tishi {
      width: 17rem;
      color: #ff3333;
      font-size: 0.75rem;
      line-height: 1.125rem;
      margin-left: 1.625rem;
      margin-top: 0.5rem;
      margin-bottom: 1.5rem;
    }
    button {
      background-color: linear-gradient(270deg,#66cfff,#4cb5ff);
      width: 16.9375rem;
      height: 2.75rem;
      border-radius: 0.25rem;
      text-align: center;
      line-height: 2.75rem;
      border: 0;
      font-weight: bold;
      color: #fff;
      font-size: 0.875rem;
      margin-left: 1.625rem;
    }
  }
}
</style>