<template>
  <div class="Login">
    <h3>
      <img src="~/assets/return.png" @click="goback" />手机快捷登录
    </h3>
    <img id="bg" src="~/assets/login.png" alt="允家新房" />
    <div class="con">
      <input type="tel" placeholder="请输入您的手机号" id="tel" />
      <input type="tel" placeholder="请输入您的验证码" id="code" />
      <button id="log">登录</button>
      <span id="ma">获取验证码</span>
      <img id="user" src="~/assets/login_user.png" alt />
      <img id="password" src="~/assets/login_mi.png" alt />
    </div>
  </div>
</template>
<script>
import { msg, login, ip, trend_put, help_put } from "~/api/api";
export default {
  name: "Login",
  data() {
    return {
      ip: "",
      n: "",
    };
  },
  methods: {
    send(tel) {
      let ip = ip_arr["ip"];
      let data = { channel: 2, phone: tel, ip: ip };
      let that = this;
      this.tel = tel;
      let city = this.$store.state.city;
      let kid = sessionStorage.getItem("kid");
      let other = sessionStorage.getItem("other");
      help_put({
        ip: ip,
        tel: tel,
        city: city,
        position: 83,
        page: 3,
        type: 6,
        kid: kid,
        source:'线上推广2',
        other: other,
      }).then((res) => {
        console.log(res);
      });
      msg(data)
        .then((resp) => {
          let code = resp.data.code;
          if (code == 200) {
            // let c = localStorage.getItem("city");
            // trend_put({
            //   ip: ip,
            //   tel: tel,
            //   city: c,
            //   position: 5,
            //   page: 3,
            //   type: 9,
            // })
            //   .then((resp) => {})
            //   .catch((error) => {
            //     console.log(error);
            //   });
            var time = 60;
            localStorage.setItem("phone", tel);
            var phone = tel.substr(0, 3) + "****" + tel.substr(7, 11);
            var fn = function () {
              time--;
              if (time > 0) {
                $("#ma").html("重新发送" + time + "s");
                $("#ma").attr("disabled", true);
              } else {
                clearInterval(interval);
                $("#ma").html("获取验证码");
                $("#ma").attr("disabled", false);
              }
            };
            fn();
            var interval = setInterval(fn, 1000);
            $("#ytel").html(phone);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    sure(data) {
      data.ip = ip_arr["ip"];
      data.channel = 2;

      login(data)
        .then((resp) => {
          if (resp.data.code == 200) {
            $cookies.set("token", resp.data.token);
            $cookies.set("userid", resp.data.userId);
            localStorage.setItem("token", resp.data.token);
            this.$store.dispatch("setuuid", resp.data.userId);
            // that.$router.push('/'+that.n)
            // window.location.href = "/"+that.n;
            if (sessionStorage.getItem("comment")) {
              this.$router.push(sessionStorage.getItem("comment"));
            } else {
              this.$router.go(-1);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getip() {
      this.n = this.$route.params.name;
      ip()
        .then((resp) => {
          this.ip = resp.data.data[0].origip;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    goback() {
      this.$router.go(-1);
    },
  },
  head() {
    return {
      title: "允家新房-手机快捷登录",
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
  mounted() {
    let that = this;
    $("#ma").on("click", function () {
      var phone = $("#tel").val();
      var pattern_phone = /^1[3-9][0-9]{9}$/;
      if (phone == "") {
        $("#tel").attr("placeholder", "手机号不能为空");
        return;
      } else if (!pattern_phone.test(phone)) {
        $("#tel").val("");
        $("#tel").attr("placeholder", "手机号码不合法");
        return;
      }
      that.send(phone);
    });
    $("#log").on("click", function () {
      var phone = $("#tel").val();
      var ma = $("#code").val();
      var pattern_phone = /^1[3-9][0-9]{9}$/;
      if (phone == "") {
        $("#tel").attr("placeholder", "手机号不能为空");
        return;
      } else if (!pattern_phone.test(phone)) {
        $("#tel").val("");
        $("#tel").attr("placeholder", "手机号码不合法");
        return;
      }
      if (ma == "") {
        $("#code").attr("placeholder", "验证码不能为空");
        return;
      }
      let p = phone.substr(0, 3) + "****" + phone.substr(7, 11);
      localStorage.setItem("tel", p);
      let data = { phone: phone, code: ma };
      that.sure(data);
    });
  },
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
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
#bg {
  width: 100%;
}
.con {
  width: 92%;
  height: 310px;
  border-radius: 15px;
  box-shadow: 0px 10px 40px 0px rgba(223, 223, 223, 0.91);
  background-color: #fff;
  position: absolute;
  top: 210px;
  left: 4%;
  padding-top: 44px;
}
.con input {
  width: 85%;
  border: 0;
  border-bottom: 0.5px solid #f2f3f5;
  height: 45px;
  margin-bottom: 15px;
  margin-left: 7%;
  padding-left: 10%;
  font-size: 15px;
}
.con button {
  width: 85%;
  height: 44px;
  border-radius: 22px;
  border: 0;
  background: #40a2f4;
  text-align: center;
  line-height: 44px;
  margin-left: 7%;
  color: #fff;
  font-size: 16px;
  margin-top: 48px;
}
.con span {
  color: #40a2f4;
  font-size: 15px;
  position: absolute;
  right: 9%;
  top: 56px;
}

::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #8d8e98;
  font-size: 15px;
}

::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #8d8e98;
  font-size: 15px;
}

:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #8d8e98;
  font-size: 15px;
}

#user {
  position: absolute;
  top: 56px;
  left: 8%;
  width: 6%;
}
#password {
  width: 6%;
  position: absolute;
  left: 8%;
  top: 116px;
}
</style>