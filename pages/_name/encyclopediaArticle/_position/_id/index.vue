<template>
  <div class="EncyclopediaArticles">
    <h3>
      <img src="~/assets/return.png" @click="goback" />{{title}}
    </h3>
    <div class="con">
      <h2>{{tit}}</h2>
      <p class="msg">
        {{source}}
        <span>{{time}}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;阅读:{{num}}
      </p>
      <div class="tit">
        
        <!-- <img :src="img" alt /> -->
        <p v-html="con">{{con}}</p>
      </div>
      <div class="con-list" v-show="building={}?false:ture">
        <router-link :to="'/content/'+building.id">
          <div class="con-list-top">
            <div class="list-top-left">
              <img :src="building.img" alt />
              <span>
                <i class="iconfont iconyanjing"></i>
                {{building.num}}
              </span>
            </div>
            <div class="list-top-right">
              <h5>
                {{building.name}}
                <span>{{building.status}}</span>
              </h5>
              <p class="price">
                <span>{{building.single_price}}</span>元/m²
              </p>
              <p class="area">
                <span>{{building.city}}-{{building.country}}</span>
                <span>建面</span>
                <span>{{building.area_min}}-{{building.area_max}}m²</span>
              </p>
              <p class="tabs">
                <strong>{{building.decorate}}</strong>
                <span>{{building.railway}}</span>
                <span>{{building.type}}</span>
              </p>
            </div>
          </div>
        </router-link>

        <div class="con-list-bottom">
          <div class="bang">
            <img src="~/assets/star.png" alt />
            刚需榜第1名
          </div>
          <button class="appointment" :data-v="building.id">预约看房</button>
          <a :href="'tel:'+call" class="tel">电话咨询</a>
        </div>
      </div>
      <div class="up" @click="agree($event)">
        <img src="~/assets/giveup.png" alt />
        <p id="nn">{{num}}</p>
      </div>
      <div class="recommend">
        <h4>人气推荐</h4>
        <ul class="lists">
          <li v-for="(list,key) in recommands" :key="key" :data-v="list.id">
            
              <div class="list">
                <router-link :to="'/'+n+'/encyclopediaArticle/'+list.position+'/'+list.id">
                <div class="left">
                  <h5>{{list.title}}</h5>
                  <p>{{list.source?list.source:'允家新房'}} &nbsp;{{list.time}}</p>
                </div>
                <div class="right">
                  <img :src="list.img" alt />
                </div>
                </router-link>
              </div>
            
          </li>
        </ul>
      </div>
    </div>
    <!-- 弹框 -->
    <div class="weiter ts">
      <div class="t-top">
        <h6>预约看房</h6>
        <p>一键预约看房免费小车上门接送，可带家人一起参观多个热门楼盘</p>
        <img id="w-esc" src="~/assets/xx.png" alt />
      </div>
      <div class="t-bottom">
        <div class="t-b-first">
          <p>
            <img src="~/assets/linshi.png" />允家严格保障您的信息安全
          </p>
          <input class="l-p" type="text" placeholder="输入预约手机号码" />
          <button class="t-b-btn t-b-btn2 bg_01" id="dingxue">立即订阅</button>
        </div>
        <div class="t-b-second">
          <p>
            验证码已发送到
            <span id="ytel">187****4376</span>，请注意查看
          </p>
          <input type="text" placeholder="请输入验证码" />
          <button class="port1">确定</button>
          <input type="hidden" id="building_name" value />
          <input type="hidden" value />
          <button class="t-b-scode">获取验证码</button>
        </div>
      </div>
    </div>

    <div class="m-chang"></div>

    <div class="m-o-succ">
      <img class="o-esc" src="~/assets/m-esc.png" alt />
      <img src="~/assets/m-success.png" alt class="o-success" />
      <p id="o_p">已成功订阅最新动态，我们会第一时间通过短信通知您！</p>
      <button id="o_btn">确定</button>
    </div>
    <transition name="fade">
      <load v-if="load"></load>
    </transition>
  </div>
</template>
<script>
import Loading from "@/components/loading";
import {
  encyclopediaarticle_data,
  ip,
  encyclopediaarticle_agree,
  msg,
  verification,
  trend_put
} from "~/api/api";
export default {
  name: "EncyclopediaArticles",
  components: {
    load: Loading
  },
  async asyncData (context) {
   let ip=context.store.state.cookie.ip;
    let city = context.store.state.cookie.city;
    let token=context.store.state.cookie.token;
    let id=context.params.id;
    let t=context.params.position;
    
    let [res]= await Promise.all([
      context.$axios.post('/api/article/detail',{
        ip: ip,
        city: city,
        id: id,
        platform: 2,
        position: t
      })
      .then((resp)=>{
          let data = resp.data;
          return data;
      })
    ])
    return{
          building : res.data.project,
          tit : res.data.title,
          img : res.data.img,
          dis : res.data.description,
          con : res.data.content,
          num : res.data.visit_count,
          recommands : res.data.recommands,
          type:res.data.source_type,
          source:res.data.source,
          time:res.data.time,
          title:res.data.position_name,
          keywords:res.header.keywords,
          description:res.header.description,
    }
  },
  head(){
    return{
      title:this.title,
      meta:[
        {
          name: "description",
          content: this.dis
        },
        {
          name: "keywords",
          content: this.keywords
        }
      ]

    }
  },
  data() {
    return {
      lists: [
        {
          tit: "房地产行业集中度进一步提高百强 房企市场份额升",
          time: "2019-05-24",
          img: require("~/assets/lou1.png")
        },
        {
          tit: "房地产行业集中度进一步提高百强 房企市场份额升",
          time: "2019-05-24",
          img: require("~/assets/lou1.png")
        },
        {
          tit: "房地产行业集中度进一步提高百强 房企市场份额升",
          time: "2019-05-24",
          img: require("~/assets/lou1.png")
        },
        {
          tit: "房地产行业集中度进一步提高百强 房企市场份额升",
          time: "2019-05-24",
          img: require("~/assets/lou1.png")
        },
        {
          tit: "房地产行业集中度进一步提高百强 房企市场份额升",
          time: "2019-05-24",
          img: require("~/assets/lou1.png")
        },
        {
          tit: "房地产行业集中度进一步提高百强 房企市场份额升",
          time: "2019-05-24",
          img: require("~/assets/lou1.png")
        }
      ],
      building: {},
      tit: "",
      dis: "",
      img: "",
      con: "",
      num: "",
      id: "",
      ip: "",
      pro: "",
      phone: "",
      recommands: [],
      type:'',
      n:'',
      call:'',
      source:'',
      count:'',
      time:'',
      title:'',
      load:true,
      keywords:'',
      description:''
    }
  },
  methods: {
    start() {
      this.n=this.$route.params.name
      let that = this;
      let id = this.$route.params.id;
      this.id = id;
      this.call=localStorage.getItem('call')
      let ip=returnCitySN['cip'];
      this.ip=ip;
      localStorage.getItem('ip');
      let city = localStorage.getItem("city");
      let t=this.$route.params.position;
      encyclopediaarticle_data({
        ip: ip,
        city: city,
        id: id,
        platform: 2,
        position: t
      })
        .then(resp => {
          that.load=false
          let data = resp.data.data;
          
          that.recommands = data.recommands;
          
        })
        .catch(error => {
          console.log(error);
        });
        
    },
    agree(e) {
      let id = this.id;
      let ip = this.ip;
      let token = localStorage.getItem("token");
      let that = this;
      encyclopediaarticle_agree({ ip: ip, id: id, platform: 2, token: token })
        .then(resp => {
          if (resp.data.code == 500) {
            that.$router.push('/'+that.n+"/login")
            // window.location.href = "/login";
          } else {
            that.num = that.num + 1;
            $("#nn").html(that.num);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    sendmsg(p) {
      this.phone = p;
      msg({ phone: p, channel: 2 })
        .then(resp => {
          if (resp.data.code == 200) {
            $(".t-b-first").hide();
            $(".t-b-second").show();
            var time = 60;
            var tel = p.substr(0, 3) + "****" + p.substr(7, 11);
            var fn = function() {
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
            $("#ytel").html(tel);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    check(m) {
      let tel = this.phone;
      let that = this;
      verification({ phone: tel, code: m, channel: 2 })
        .then(resp => {
          if (resp.data.code == 200) {
            let ip = that.ip;
            let c = localStorage.getItem("city");
            let p = that.page;
            let pro = that.pro;
            trend_put({
              ip: ip,
              tel: tel,
              city: c,
              position: 5,
              page: 3,
              project: pro
            })
              .then(resp => {
                if (resp.data.code == 200) {
                  $(".weiter").hide();
                  $(".m-o-succ").show();
                }
              })
              .catch(error => {
                console.log(error);
              });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    goback(){
      this.$router.go(-1)
    }
  },
  mounted() {
    let that = this;
    this.start();
    $(".appointment").on("click", function() {
      let pro = $(this).attr("data-v");
      that.pro = pro;
      $(".m-chang").show();
      $(".weiter").show();
    });
    $(".m-chang").on("click", function() {
      $(".m-chang").hide();
      $(".weiter").hide();
      $(".m-o-succ").hide();
    });
    // 接口验证码
    $(".t-b-btn2").on("click", function() {
      var phone = $(this)
        .prev()
        .val();
      var type = $(this)
        .parent()
        .parent()
        .prev()
        .find("h6")
        .html();
      var building_name = $(this)
        .parent()
        .next()
        .find("#building_name")
        .val();
      var pattern_phone = /^1[3-9][0-9]{9}$/;
      if (phone == "") {
        $(".l-p").attr("placeholder", "手机号不能为空");
        return;
      } else if (!pattern_phone.test(phone)) {
        $(".l-p").val("");
        $(".l-p").attr("placeholder", "手机号码不合法");
        return;
      }
      that.sendmsg(phone);
    });
    $(".port1").on("click", function() {
      var ma = $(this)
        .prev()
        .val();
      if (!ma) {
        $(this)
          .prev()
          .attr("placeholder", "验证码不能为空");
        return;
      }
      that.check(ma);
      $(".weiter").hide();
      $(".m-o-succ").show();
    });
    $("#o_btn").on("click", function() {
      $(".m-o-succ").hide();
      $(".m-chang").hide();
    });
    $(".o-esc").on("click", function() {
      $(".m-o-succ").hide();
      $(".m-chang").hide();
    });
    
  },
  watch:{
    '$route'(){
      this.$router.go(0);
    },
    keywords(val){
      const keywordsEl = document.createElement('meta')
        keywordsEl.content = this.keywords;
        keywordsEl.name = "keywords"

        const descriptionEl = document.createElement('meta')
        descriptionEl.content = this.description;
        descriptionEl.name = "description"

        document.head.appendChild(keywordsEl)
        document.head.appendChild(descriptionEl)
    }
  },
  created(){
    
  }
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
h3 {
  color: #333333;
  text-align: center;
  height: 44px;
  line-height: 44px;
  font-weight: bold;
  position: relative;
  font-size: 16px;
  position: fixed;
  top:0;
  width: 100%;
  z-index: 2;
  background-color: #fff;
  -webkit-box-shadow: 0 0 3px 0 rgba(0,0,0,.05);
    box-shadow: 0 0 3px 0 rgba(0,0,0,.05);
}
h3 img {
  position: absolute;
  width: 5%;
  margin-top: 14px;
  left: 5.33%;
}
.con {
  padding: 0 4%;
  margin-top:44px
}
.con h2 {
  color: #2e3033;
  font-size: 20px;
  padding-top: 13px;
  font-weight: 500;
  margin-bottom: 16px;
}
.con .msg {
  color: #919499;
  font-size: 12px;
  margin-bottom: 18px;
}
.con .msg span {
  color: #919499;
  font-size: 13px;
  margin-left: 10px;
}

.tit {
  margin-bottom: 25px;
}
.tit p {
  color: #5e6166;
  font-size: 16px;
  line-height: 30px;
}
.tit p >>>img {
  width: 100%!important;
  border-radius: 6px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.con-list {
  width: 100%;
  height: 146px;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  margin-bottom: 40px;
  padding-top: 16px;
}
.con-list .con-list-top {
  margin-left: 4.3478%;
}
.con-list .con-list-top::after {
  content: "";
  height: 0;
  display: block;
  clear: both;
  visibility: hidden;
}
.con-list .con-list-top .list-top-left {
  position: relative;
  margin-right: 15px;
  display: inline-block;
  width: 33.333%;
  height: 90px;
  float: left;
}
.con-list .con-list-top .list-top-left img {
  width: 100%;
  height: 90px;
  border-radius: 4px;
}
.con-list .con-list-top .list-top-left span {
  display: block;
  color: #ffffff;
  font-size: 10px;
  position: absolute;
  right: 3%;
  bottom: 2%;
}
.con-list .con-list-top .list-top-left span i {
  font-size: 10px;
  margin-right: 2px;
}

.con-list .con-list-top .list-top-right {
  display: inline-block;
}
.con-list .con-list-top .list-top-right h5 {
  color: #333333;
  font-size: 17px;
  margin-bottom: 4px;
}
.con-list .con-list-top .list-top-right h5 span {
  background-color: #e9f7ea;
  border-radius: 2px;
  float: right;
  padding: 3px 7px;
  background-color: #e9f7ea;
  color: #2cd264;
  font-size: 11px;
  font-weight: 500;
}
.con-list .con-list-top .list-top-right .price {
  color: #fe582f;
  font-size: 12px;
}
.con-list .con-list-top .list-top-right .price span {
  font-size: 18px;
}
.con-list .con-list-top .list-top-right .area {
  margin-bottom: 4px;
}
.con-list .con-list-top .list-top-right .area span {
  color: #919499;
  font-size: 12px;
  margin-right: 8px;
}
.con-list .con-list-top .list-top-right .tabs strong {
  font-weight: 500;
  padding: 3px 7px;
  background-color: #ebf5fc;
  color: #4db5ff;
  font-size: 11px;
  margin-right: 6px;
  display: inline-block;
  float: left;
}
.con-list .con-list-top .list-top-right .tabs span {
  color: #919499;
  font-size: 11px;
  padding: 3px 7px;
  background-color: #f7f8fa;
  margin-right: 6px;
  display: inline-block;
  max-width: 76px;
  overflow: hidden;
  height: 22px;
  white-space: nowrap;
}
.con-list .con-list-bottom .bang {
  width: 43.478%;
  height: 18px;
  background: linear-gradient(
    270deg,
    rgba(255, 255, 255, 1),
    rgba(255, 225, 225, 1)
  );
  border-radius: 9px 0px 0px 9px;
  line-height: 18px;
  color: #919499;
  font-size: 12px;
  display: inline-block;
  margin-left: 4%;
}
.con-list .con-list-bottom .bang img {
  width: 15px;
  margin-left: 2%;
  margin-top: -7px;
  position: relative;
  top: 11%;
}
.con-list .con-list-bottom .appointment {
  width: 21.739%;
  height: 22px;
  border-radius: 11px;
  border: 1px solid #ffa99d;
  background-color: #ffedeb;
  text-align: center;
  line-height: 22px;
  font-size: 13px;
  color: #ff7866;
  margin-right: 4.347%;
}
.con-list .con-list-bottom .tel {
  width: 21.739%;
  height: 22px;
  border-radius: 11px;
  background-color: #ff7866;
  color: #fff;
  font-size: 13px;
  text-align: center;
  line-height: 22px;
  text-decoration: none;
  display: inline-block;
}

.up {
  width: 60px;
  height: 60px;
  border: 0.5px solid #e8e9ed;
  position: relative;
  left: 50%;
  margin-left: -30px;
  margin-bottom: 26px;
  border-radius: 50%;
  text-align: center;
}
.up img {
  width: 17px;
  margin-bottom: 4px;
  margin-top: 12px;
}
.up p {
  color: #797e86;
  font-size: 12px;
}

.recommend h4 {
  color: #2e3033;
  font-size: 17px;
  margin-bottom: 26px;
}
.lists {
  margin-top: 20px;
}
.lists li {
  margin-bottom: 14px;
}
.lists .list {
  padding-bottom: 9px;
  border-bottom: 1px solid #f3f5fb;
  height: 84px;
}
.lists .list .left {
  display: inline-block;
  float: left;
}
.lists .list .left h5 {
  color: #2e3033;
  font-size: 15px;
  margin-bottom: 26px;
  width: 225px;
}
.lists .list .left p {
  color: #919499;
  margin-right: 4px;
  font-size: 11px;
}
.lists .list .right {
  float: right;
}
.lists .list .right img {
  width: 100px;
  height: 74px;
  border-radius: 5px;
}

.weiter {
  display: none;
  width: 75%;
  position: fixed;
  left: 12.667%;
  top: 220px;
  border-radius: 12px;
  z-index: 1001;
}

.weiter .t-top {
  width: 100%;
  height: 100px;
  background-color: #fff;
  border-radius: 12px 12px 0 0;
  padding-top: 15px;
}

.weiter .t-top h6 {
  color: #3a3c49;
  font-size: 17px;
  text-align: center;
  margin-bottom: 22px;
}

.weiter .t-top p {
  color: #787980;
  font-size: 15px;
  margin: 0 18px;
}

.weiter .t-top #w-esc {
  position: absolute;
  right: 5%;
  top: 5%;
}

.weiter .t-bottom {
  width: 100%;
  height: 188px;
  background-color: #fff;
  border-radius: 0 0 12px 12px;
}

.weiter .t-bottom .t-b-first {
  height: 100%;
  display: block;
}
.weiter .t-bottom .t-b-first p {
  color: #a8a8ab;
  font-size: 12px;
  padding-left: 7%;
  padding-top: 25px;
}
.weiter .t-bottom .t-b-first p img {
  width: 5%;
  margin-right: 2%;
  margin-bottom: 2px;
}

.weiter .t-bottom .t-b-first input {
  width: 85%;
  height: 40px;
  border: 0.5px solid rgba(230, 230, 230, 1);
  margin-top: 10px;
  margin-bottom: 25px;
  margin-left: 7.52%;
  padding-left: 5%;
  font-size: 14px;
}

.weiter .t-bottom .t-b-first button {
  width: 85%;
  height: 40px;
  border: 0;

  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
  margin-left: 7.5%;
}

.weiter .t-bottom .t-b-first .bg_01 {
  background: linear-gradient(
    270deg,
    rgba(102, 207, 255, 1),
    rgba(76, 181, 255, 1)
  );
}

.weiter .t-bottom .t-b-first .bg_02 {
  background: linear-gradient(
    270deg,
    rgba(102, 207, 255, 1),
    rgba(76, 181, 255, 1)
  );
}

.weiter .t-bottom .t-b-second {
  height: 100%;
  display: none;
  padding-top: 20px;
}

.weiter .t-bottom .t-b-second p {
  margin-top: 10px;
  color: #808080;
  font-size: 12px;
  width: 85%;
  margin-left: 7.5%;
  margin-bottom: 10px;
}

.weiter .t-bottom .t-b-second input {
  width: 85%;
  height: 40px;
  border-radius: 2px;
  border: 0.5px solid rgba(238, 238, 238, 1);
  margin-left: 7.5%;
  margin-bottom: 20px;
  padding-left: 4%;
}

.weiter .t-bottom .t-b-second .port1 {
  width: 85%;
  height: 40px;
  margin-left: 7.5%;
  background: linear-gradient(
    270deg,
    rgba(102, 207, 255, 1),
    rgba(76, 181, 255, 1)
  );
  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
  border: 0;
  margin-bottom: 20px;
  border-radius: 1px;
}

.weiter .t-bottom .t-b-second .t-b-scode {
  border: 0;
  color: #40a2f4;
  font-size: 13px;
  position: absolute;
  right: 10%;
  top: 58%;
  background-color: #fff;
}

.m-chang {
  display: none;
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
  top: 3.1%;
  right: 3.5%;
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
  background: linear-gradient(
    270deg,
    rgba(102, 207, 255, 1),
    rgba(76, 181, 255, 1)
  );
  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
  border: 0px;
  border-radius: 4px;
}

.m-chang {
  position: fixed;
  top: 0;
  width: 100%;
  height: 1000px;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
}
</style>