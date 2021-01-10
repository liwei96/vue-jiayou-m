<template>
  <div id="hong">
    <div class="box">
      <p class="price">￥{{num}}</p>
      <p class="txt">返乡置业购房补贴金</p>
      <div v-if="!type">
        <div class="inu">
          <input type="text" placeholder="请输入您手机号" v-model="tel" />
          <button @click="send">立即领取</button>
        </div>
        <p class="msg">
          活动说明：领取成功后优惠编码将与您手机号<br />
          绑定，会有工作人员与您联系
        </p>
        <p class="msg p">注：活动最终解释权归家园所有</p>
      </div>
      <div v-if="type">
        <p class="ti">验证码已发送到{{baoming}} 请注意查看</p>
        <div class="input">
          <input type="text" placeholder="请输入验证码" v-model="code" />
          <button @click="send" class="t-b-scode">重新发送59s</button>
        </div>
        <button class="sure" @click="put">确定</button>
      </div>
    </div>
    <img
      src="~/assets/backhome-close.png"
      alt=""
      class="close"
      @click="close"
    />
    <div class="tishi"></div>
  </div>
</template>
<script>
import { put, check, send, heng } from "~/api/api";
export default {
  data() {
    return {
      tel: "",
      type: false,
      code: '',
      baoming: ''
    };
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    typenum: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    typebtn: {
      type: Number,
      required: true,
    },
    txt: {
      type: String,
    },
    proname: {
      type: String,
    },
    num: {
      type: Number
    }
  },
  methods: {
    close() {
      this.type = false
      console.log(this.type)
      this.$emit("close", false);
    },
    ling() {
      var phone = this.tel;
      var pattern_phone = /^1[3-9][0-9]{9}$/;
      if (phone == "") {
        this.tishi("手机号不能为空");
        return;
      } else if (!pattern_phone.test(phone)) {
        this.tishi("手机号码不合法");
        return;
      }

    },
    send() {
      let that = this;
      var phone = this.tel;
      var pattern_phone = /^1[3-9][0-9]{9}$/;
      if (phone == "") {
        this.tishi("手机号不能为空");
        return;
      } else if (!pattern_phone.test(phone)) {
        this.tishi("手机号码不合法");
        return;
      }
      let id = this.id;
      let typenum = 115;
      let ip = ip_arr["ip"];
      let city = $cookies.get("city");
      let kid = $cookies.get("kid");
      let other = $cookies.get("other");
      let txt = this.txt+'+补贴金额:￥'+this.num;
      let ol = true;
      let normal = {
        ip: ip,
        tel: phone,
        city: city,
        position: typenum,
        page: 3,
        type: 9,
        project: id,
        kid: kid,
        other: other,
        platform: 2,
      };
      put(normal).then((res) => {
        if (res.data.code == 200) {
          send({ ip: ip, phone: phone, source: 3 })
            .then((res) => {
              if (res.data.code == 200) {
                this.type = true;
                var time = 60;
                var tel = phone.substr(0, 3) + "****" + phone.substr(7, 11);
                that.baoming = tel
                var fn = function () {
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
              } else {
                console.log(res);
                this.tishi("发送过于频繁");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
        if (res.data.code == 500) {
          this.tishi(res.data.msg || res.data.message);
          setTimeout(() => {
            that.$emit("close", false);
          }, 2000);
        }
      });
    },
    put() {
      var phone = this.tel;
      var pattern_phone = /^1[3-9][0-9]{9}$/;
      if (phone == "") {
        this.tishi("手机号不能为空");
        return;
      } else if (!pattern_phone.test(phone)) {
        this.tishi("手机号码不合法");
        return;
      }
      if (!this.code) {
        this.tishi("请输入验证码");
        return;
      }
      let ma = this.code;
      let ip = ip_arr["ip"];
      let that = this;
      check({ phone: phone, code: ma, source: 2, ip: ip })
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            if (this.proname) {
                this.tishi("提交成功");
                if (that.lucktype == 1) {
                  $cookies.set("token", res.data.token, 21600);
                  $cookies.set("phone", phone, 21600);
                  let tel = phone.substr(0, 3) + "****" + phone.substr(8);
                  $cookies.set("username", tel);
                  this.$store.dispatch("setoken", res.data.token);
                } else {
                  if (!$cookies.get("token")) {
                    $cookies.set("token", res.data.token, 21600);
                    $cookies.set("phone", phone, 21600);
                    let tel = phone.substr(0, 3) + "****" + phone.substr(8);
                    $cookies.set("username", tel);
                    this.$store.dispatch("setoken", res.data.token);
                  }
                }
                this.type = false;
                console.log(66)
                this.$emit("close", false);
            } else {
              this.tishi("提交成功");
              if (that.lucktype == 1) {
                $cookies.set("token", res.data.token, 21600);
                $cookies.set("phone", phone, 21600);
                let tel = phone.substr(0, 3) + "****" + phone.substr(8);
                $cookies.set("username", tel);
                this.$store.dispatch("setoken", res.data.token);
              } else {
                if (!$cookies.get("token")) {
                  $cookies.set("token", res.data.token, 21600);
                  $cookies.set("phone", phone, 21600);
                  let tel = phone.substr(0, 3) + "****" + phone.substr(8);
                  $cookies.set("username", tel);
                  this.$store.dispatch("setoken", res.data.token);
                }
              }
              this.type = false;
              console.log(55)
              this.$emit("close", false);
            }
          } else {
            this.tishi("验证码不正确");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    tishi(msg) {
      $(".tishi").html(msg);
      $(".tishi").show();
      setTimeout(() => {
        $(".tishi").hide();
      }, 1500);
    },
  },
  watch: {
    typebtn(curVal, oldVal) {
      console.log(curVal, oldVal);
      if (curVal == 0) {
        this.type = false;
      }
    },
  },
};
</script>
<style lang="less" scoped>
#hong {
  width: 18.4375rem;
  .tishi {
  color: #cdcdcd;
  font-size: 1rem;
  display: none;
  position: absolute;
  width: 170px;
  height: 60px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.8);
  text-align: center;
  line-height: 60px;
  left: 50%;
  margin-left: -85px;
  top: 150px;
}
  .box {
    height: 25.875rem;
    background: url(~assets/backhome-hong.png);
    background-size: 100%;
  }
  .price {
    color: #ffea03;
    font-size: 2.8125rem;
    font-weight: bold;
    text-align: center;
    padding-top: 3.6rem;
  }
  .txt {
    color: #fff;
    font-size: 1rem;
    text-align: center;
  }
  .inu {
    margin-bottom: 1.5625rem;
    display: flex;
    justify-content: center;
    margin-top: 7.8rem;
    input {
      width: 9.6875rem;
      height: 2.875rem;
      border-radius: 0.25rem 0 0 0.25rem;
      border: 0;
      outline: none;
      padding-left: 0.875rem;
    }
    button {
      width: 5.3125rem;
      height: 2.875rem;
      text-align: center;
      background: linear-gradient(0deg, #ffc616, #ffeb53);
      box-shadow: 0px 0.03125rem 0.03125rem 0px rgba(6, 0, 1, 0.1);
      border-radius: 0px 0.25rem 0.25rem 0px;
      color: #ff3922;
      font-size: 0.875rem;
      border: 0;
      outline: none;
    }
  }
  .msg {
    text-align: center;
    color: #ffb2be;
    font-size: 0.625rem;
    line-height: 0.875rem;
  }
  .p {
    margin-top: 0.875rem;
  }
  .close {
    width: 1.75rem;
    position: relative;
    margin-top: 1.875rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    opacity: 1;
    float: none;
  }
  .ti {
    color: #FFE0E2;
    font-size: .75rem;
    margin-left: 1.25rem;
    margin-bottom: .875rem;
    margin-top: 6.8rem;
  }
  .sure {
    width: 15.9375rem;
    height: 2.5rem;
    text-align: center;
    line-height: 2.5rem;
    border: 0;
    outline: none;
    background: linear-gradient(0deg, #FFC616, #FFEB53);
    box-shadow: 0px .03125rem .03125rem 0px rgba(6, 0, 1, 0.1);
    border-radius: .25rem;
    color: #FF3922;
    font-size: .9375rem;
    margin-left: 1.25rem;
  }
  .input {
    position: relative;
    background-color: #fff;
    width: 15.9375rem;
    height: 2.875rem;
    display: flex;
    margin-left: 1.25rem;
    border-radius: .25rem;
    overflow: hidden;
    margin-bottom: .75rem;
    input {
      width: 100%;
      height: 2.875rem;
      box-shadow: 0px .15625rem .375rem 0px rgba(178, 102, 70, 0.14);
      padding-left: .875rem;
      outline: none;
      border: 0;
    }
    button {
      width: 5.375rem;
      height: 2.5625rem;
      text-align: center;
      line-height: 2.5625rem;
      border-radius: .1875rem;
      background-color: #FFE040;
      position: absolute;
      right: .125rem;
      top: .15625rem;
      color: #FF3922;
      font-size: .8125rem;
      border: 0;
      outline: none;
    }
  }
}
</style>