<template>
  <div class="About">
    <div class="container-fluid m">
      <div class="m-title visible-xs-block .visible-sm-block">
        <img src="~/assets/return.png" alt @click="goback" />
        <h3>关于允家</h3>
      </div>
      <div class="m-content visible-xs-block .visible-sm-block">
        <img class="m-logo" src="~/assets/y-logo.png" alt />
        <h4>公司简介</h4>
        <p class="m-p">允家新房隶属杭州易得房科技有限公司，我们是一家线上销售模式的房地产公司。</p>
        <p class="m-p">公司主营业务为：房地产信息咨询，房产中介服务，房地产营销策划，室内外装修工程设计，施工以及物业管理，以及企业的营销策划，国内广告制作设计，代理会展服务。</p>
        <p class="m-p">公司位于：杭州市江干区九环路。专注为客户朋友提供一手楼盘新资讯。</p>
        <div class="m-list m-1">
          <span>联系电话</span>
          <a :href="'tel:'+call">400-718-6686</a>
        </div>
        <div class="m-list">
          <span>工作日</span>
          <span class="m-time">9:00-21:00</span>
        </div>
        <div class="m-list" id="m_tou">
          <span>投诉建议</span>
          <img src="~/assets/m-go.png" alt />
        </div>
      </div>
    </div>
    <foot-view :pinyin="jkl"></foot-view>
  </div>
</template>
<script>
import footView from "@/components/Foot.vue";
export default {
  name: "About",
  asyncData (context) {
    let jkl = context.store.state.cookie.pinyin;
    return {
      jkl:jkl
    }
  },
  data(){
    return{
      n:'',
      call:'',
      jkl:''
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
  methods:{
    goback(){
      this.$router.go(-1)
    }
  },
  mounted(){
    $("#Foot").css({ position: "fixed", bottom: "0", width: "100%",marginBottom:0 });
    this.n=this.$route.params.name;
    this.call=localStorage.getItem('call')
    let that=this;
    $('#m_tou').on('click',function(){
      let token=localStorage.getItem('token');
      if(token){
        // window.location.href='/'+that.n+"/feedback"
        that.$router.push('/'+that.n+"/feedback")
      }else{
        that.$router.push('/'+that.n+"/login")
        // window.location.href='/'+that.n+"/login"
      }
      
    })
  }
};
</script>
<style scoped>
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
  border-bottom: 1px solid #f2f2f2;
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
.m-bgc {
  width: 53%;
  margin-top: 90px;
  margin-left: 23.33333%;
  margin-bottom: 18px;
}
.m-txt {
  color: #666666;
  font-size: 16px;
  font-weight: 500;
  margin-left: 16.66667%;
}
.m-btn {
  width: 53.3333%;
  height: 40px;
  border: 0px;
  border-radius: 4px;
  background-color: #3ac869;
  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
  margin-left: 23.33333%;
  margin-top: 37px;
}

/* m-content */
.m-content .m-logo {
  width: 24%;
  margin-left: 38%;
  margin-top: 24px;
  margin-bottom: 20px;
}
.m-content h4 {
  color: #333333;
  font-size: 18px;
  margin: 0;
  margin-left: 40.53333%;
  margin-bottom: 25px;
  font-weight: bold;
}
.m-content .m-p {
  color: #595959;
  font-size: 16px;
  margin: 0;
  margin-left: 4%;
  margin-right: 4%;
  line-height: 27px;
  text-indent: 9%;
  letter-spacing: 1.5px;
}
.m-content .m-list {
  padding: 0 4%;
  height: 50px;
  border-bottom: 1px solid #f0f0f0;
  line-height: 50px;
}
.m-content .m-1 {
  margin-top: 38px;
}
.m-content .m-list span {
  float: left;
  color: #333333;
  font-size: 16px;
}
.m-content .m-list a {
  float: right;
  color: #4ea7f5;
  font-size: 18px;
}
.m-content .m-list .m-time {
  color: #4d4d4d;
  font-size: 18px;
  float: right;
}
.m-content .m-list img {
  float: right;
  width: 5%;
  margin-top: 14px;
}
</style>