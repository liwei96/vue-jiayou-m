<template>
  <div id="Exemption">
    <h3>
      <img src="~/assets/return.png" @click="goback" />免责协议
    </h3>
    <div class="con">
      <h5>允家新房免责协议</h5>
      <p>允家新房对于本网服务包含的或用户经由或从任何与本网服务有关的途径所获得的任何内容、信息或广告，不声明或保证其正确性或可靠性；并且对于用户经本服务上的广告、展示而购买、取得的任何产品、信息或资料，本网不负保证责任。用户自行承担担使用本服务的风险。本网将努力改善或更正用户或其他消费者提出的客观存在的本服务任何部分之任何疏漏、错误。本网不保证以下事项（包括但不限于）：</p>
      <h6>（1）楼盘信息免责声明</h6>
      <p>楼盘信息由开发商提供，最终以政府部门登记备案为准，请谨慎核查，如该楼盘信息有误，您可以拨打我们的投诉电话<span>400-966-9995</span>。</p>
      <h6>（2）新闻内容免责声明</h6>
      <p>凡本站注明 “来自：XXX(非允家新房)”的新闻稿件和图片作品，系本站转载自其它媒体，转载目的在于信息传递，并不代表本站赞同其观点和对其真实性负责。如有新闻稿件和图片作品的内容、版权以及其它问题的，请联系本站新闻中心。</p>
      <h6>（3）用户言论免责声明</h6>
      <p>网友问答仅供其表达个人疑惑或见解，并不代表本网立场，对其正确性、合法性、正当性本网不负任何责任。</p>
    </div>
    <foot-view :pinyin="jkl"></foot-view>
  </div>
</template>
<script>
import footView from "@/components/Foot.vue";
export default {
  name: "Exemption",
  asyncData (context) {
    let jkl = context.store.state.cookie.pinyin;
    return {
      jkl:jkl
    }
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
  components: {
    "foot-view": footView
  },
  data(){
    return {
      jkl:''
    }
  },
  methods:{
      goback(){
          this.$router.go(-1)
      }
  },
  mounted(){
    $("#Foot").css({ position: "fixed", bottom: "0", width: "100%",marginBottom:0 });
  }
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
.con {
  padding: 18px 4% 0 4%;
  
}
.con h5 {
  color: #2e3033;
  font-size: 18px;
  margin-bottom: 14px;
  font-weight: bold;
}
.con p{
    font-size: 13px;
  line-height: 20px;
  color:rgba(69,72,77,1);
  text-indent: 7%;
}
.con h6{
    font-size: 13px;
  line-height: 20px;
  color:rgba(69,72,77,1);
}
span{
  color:red
}
</style>