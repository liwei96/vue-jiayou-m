<template>
  <div class="LeaveQuestion">
    <div class="m">
      <div class="m-top">
        <img class="m-go" src="~/assets/return.png" alt @click="goback" />
        <h3>留言提问</h3>
      </div>
      <div class="m-liu">
        <img src="~/assets/liu_pic.png" alt />
        <h5>感谢您对允家的支持与关注。请将您的问题或意见建议反馈给我们</h5>
        <textarea name id cols="30" rows="10" placeholder="输入您的问题"></textarea>
        <button id="btn" class="bg_01">提交</button>
      </div>
      <div class="m-liu">
        <div class="m-chang"></div>
        <div class="m-o-succ">
          <img class="o-esc" src="~/assets/m-esc.png" alt />
          <img src="~/assets/m-success.png" alt class="o-success" />
          <p id="o_p">已成功提交问题，我们会第一时间完善改进！</p>
          <button id="o_btn">确定</button>
        </div>
      </div>
    </div>
    <foot-view :pinyin="jkl"></foot-view>
    <div class="m-zhe-tel"></div>
    <div class="m-zhe-box">
      <span class="iconfont iconguanbi" id="close"></span>
      <input type="text" placeholder="请输入手机号" id="tel" v-model="tel"/>

      <button class="m-qu">取消</button>
      <button class="m-que" id="queren02">确定</button>
    </div>
  </div>
</template>
<script>
import footView from "@/components/Foot.vue";
import {top_sure} from '~/api/api'
export default {
  name: "LeaveQuestion",
  asyncData (context) {
    let jkl = context.store.state.cookie.pinyin;
    return {
      jkl:jkl
    }
  },
  data(){
    return {
      tel:'',
      con:'',
      jkl:''
    }
  },
  components: {
    "foot-view": footView
  },
  methods:{
    goback(){
      this.$router.go(-1)
    },
    put(tel,msg){
      let id=this.$route.params.id;
      let ip=localStorage.getItem('ip');
      let city=localStorage.getItem('city');
      top_sure({ip:ip,city:city,platform:2,remark:msg,tel:tel,page:3,position:6}).then(resp=>{
        if(resp.data.code==200){
          $(".m-zhe-box").hide();
          $('.m-o-succ').show();
        }
      }).catch(error=>{
        console.log(error)
      })
    }
  },
  mounted() {
    $("#Foot").css({ position: "fixed", bottom: "0", width: "100%",marginBottom:0 });
    let that=this;
    that.tel=localStorage.getItem('phone')
    $(document).ready(function() {
      $("#btn").on("click", function() {
        var text = $("textarea").val();
        that.con=text;
        if (text != "") {
          $(".m-zhe-tel").show();
          $(".m-zhe-box").show();
        }
      });
      $(".m-que").on("click", function() {
        var text = $("textarea").val();
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
        that.put(phone,text);
      });
      $(".m-chang").on("click", function() {
        $(".m-chang").hide();
        $(".m-o-succ").hide();
      });
      $(".o-esc").on("click", function() {
        $(".m-chang").hide();
        $(".m-o-succ").hide();
      });
      $("#o_btn").on("click", function() {
        $(".m-zhe-tel").hide();
        $(".m-o-succ").hide();
      });
      //留言
      $("#close").click(function() {
        $(".m-zhe-tel").hide();
        $(".m-zhe-box").hide();
      });
      $(".m-qu").click(function() {
        $(".m-zhe-tel").hide();
        $(".m-zhe-box").hide();
      });

      $(".m-zhe-tel").click(function() {
        $(".m-zhe-box").hide();
        $(this).hide();
        $('.m-o-succ').hide();
      });

      $(function() {
        function changeColor(id, class1, class2) {
          $("#" + id).on("touchstart", function() {
            $(this).attr("class", class1);
          });
          $("#" + id).on("touchend", function() {
            $(this).attr("class", class2);
          });
        }
        changeColor("btn", "bg_02", "bg_01");
      });
    });
  }
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
}
.m {
  padding: 0;
}
body {
  position: relative;
}

.m-top {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 100;
  text-align: center;
  background-color: #fff;
  height: 44px;
  border-bottom: 0.5px solid #f2f2f2;
}

.m-top img {
  position: absolute;
  top: 25%;
  width: 6%;
}

.m-top .m-go {
  left: 5%;
}

.m-top h3 {
  color: #333333;
  font-size: 18px;
  margin: 0;
  height: 100%;
  line-height: 43px;
  font-weight: bold;
}

.m-liu img {
  width: 100%;
  margin-bottom: 10px;
  margin-top: 44px;
}
.m-liu h5 {
  color: #383a3f;
  font-size: 15px;
  margin-top: 2px;
  margin-bottom: 10px;
  left: 4%;
  margin-left: 4%;
  font-weight: 500;
  width: 92%;
}
.m-liu input {
  margin: 0 4%;
  background-color: #f7f7f7;
  height: 39px;
  padding: 12px;
  width: 92%;
  border: 0;
}
.m-liu textarea {
  margin: 0 4%;
  padding: 12px;
  height: 150px;
  width: 85.6%;
  border: 1px solid #ededed;
}
.m-liu button {
  margin-top: 39px;
  margin-left: 4%;
  width: 92%;
  height: 40px;
  border-radius: 3px;
  color: #fff;
  text-align: center;
  line-height: 40px;
  border: 0;
  outline: none;
  font-weight: bold;
  background: linear-gradient(
    270deg,
    rgba(102, 207, 255, 1),
    rgba(76, 181, 255, 1)
  );
}
.m-liu .bg_01 {
  background-color: #f2f2f2;
}
.m-liu .bg_02 {
  background-color: #e3e3e3;
}

::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: #999999;
  font-size: 16px;
}
:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #999999;
  font-size: 16px;
}
::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #999999;
  font-size: 16px;
}
:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #999999;
  font-size: 16px;
}

.m-chang {
  display: none;
  position: fixed;
  top: 0;
  width: 100%;
  height: 1000px;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
}
.m-success {
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
  top: -9%;
  right: 4.5%;
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
  background-color: #3ac869;
  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
  border: 0px;
  border-radius: 4px;
  margin-top: 0;
  margin-left: 0;
}

/*输入电话遮罩层*/
.m-zhe-tel {
  position: absolute;
  width: 100%;
  height: 1447px;
  background: rgba(0, 0, 0, 1);
  opacity: 0.4;
  top: 0;
  left: 0;
  display: none;
}
.m-zhe-box {
  width: 80%;
  height: 190px;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -5%);
  display: none;
}
.m-zhe-box span {
  position: absolute;
  right: 5%;
  top: 5%;
}
.m-zhe-box input {
  position: absolute;
  right: 5%;
  top: 45px;
}
.m-zhe-box button {
  position: absolute;
  top: 123px;
}
.m-zhe-box .m-qu {
  left: 6.8%;
}
.m-zhe-box .m-que {
  left: 53.5%;
}
.m-zhe-box input {
  width: 86.6%;
  height: 44px;
  background: rgba(247, 247, 247, 1);
  border-radius: 4px;
  border: 0;
  margin-left: 6.6%;
  text-indent: 1em;
}
.m-zhe-box .m-qu,
.m-zhe-box .m-que {
  width: 40%;
  height: 40px;
  border-radius: 20px;
  background: #fff;
}
.m-zhe-box .m-qu {
  border: 1px solid rgba(230, 230, 230, 1);
  color: #999999;
}
.m-zhe-box .m-que {
  border: 1px solid #40a2f4;
  color: #40a2f4;
  outline: none;
  background: #fff;
}
</style>