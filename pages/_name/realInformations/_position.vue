<template>
  <div class="RealInformations">
    <h3>
      <img src="~/assets/return.png" @click="goback" />房产楼讯
    </h3>
    <div class="m-luns">
      <div class="swiper-top">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(lun,key) in luns" :key="key">
            <router-link :to="'/'+jkl+'/encyclopediaArticle/'+lun.position+'/'+lun.id">
              <img :src="lun.img" style="width:100%" />
              <div class="zhe"></div>
            </router-link>
            <p>{{lun.title}}</p>
          </div>
        </div>
        <div id="swiper-pagination1"></div>
      </div>
    </div>
    <div class="nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" data-v="46">
              <router-link :to="'/'+jkl+'/realinformations/46'">
            <div class="tegood">
              <p :class="position == 46 ? 'active' : ''" @click="get($event)" data-v="46">
                楼盘导购
                <i></i>
              </p>
            </div>
            </router-link>
          </div>
          <div class="swiper-slide" data-v="48">
              <router-link :to="'/'+jkl+'/realinformations/48'">
            <div class="tegood">
              <p :class="position == 48 ? 'active' : ''" @click="get($event)" data-v="48">
                本地楼市
                <i></i>
              </p>
            </div>
            </router-link>
          </div>
          <div class="swiper-slide" data-v="49">
              <router-link :to="'/'+jkl+'/realinformations/49'">
            <div class="tegood">
              <p :class="position == 49 ? 'active' : ''" @click="get($event)" data-v="49">
                房企资讯
                <i></i>
              </p>
            </div>
            </router-link>
          </div>
          <div class="swiper-slide" data-v="50">
              <router-link :to="'/'+jkl+'/realinformations/50'">
            <div class="tegood">
              <p :class="position == 50 ? 'active' : ''" @click="get($event)" data-v="50">
                热点新闻
                <i></i>
              </p>
            </div>
            </router-link>
          </div>
          <div class="swiper-slide" data-v="51">
              <router-link :to="'/'+jkl+'/realinformations/51'">
            <div class="tegood">
              <p :class="position == 51 ? 'active' : ''" @click="get($event)" data-v="51">
                成交报告
                <i></i>
              </p>
            </div>
            </router-link>
          </div>
          <div class="swiper-slide" data-v="52">
              <router-link :to="'/'+jkl+'/realinformations/52'">
            <div class="tegood">
              <p :class="position == 52 ? 'active' : ''" @click="get($event)" data-v="52">
                土拍成交
                <i></i>
              </p>
            </div>
            </router-link>
          </div>
          <div class="swiper-slide" data-v="99">
              <router-link :to="'/'+jkl+'/realinformations/99'">
            <div class="tegood">
              <p :class="position == 99 ? 'active' : ''" @click="get($event)" data-v="99">
                楼盘动态
                <i></i>
              </p>
            </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <ul class="lists">
      <li v-for="(list,key) in lists" :key="key">
        <router-link :to="'/'+jkl+'/encyclopediaArticle/'+list.position+'/'+list.id">
          <div class="list">
            <div class="left">
              <h5>{{list.title}}</h5>
              <p>{{ list.source==''?'允家新房':list.source }} &nbsp;{{list.time}}</p>
            </div>
            <div class="right">
              <img :src="list.img" alt />
            </div>
          </div>
        </router-link>
      </li>
    </ul>
    <foot-view :pinyin="jkl"></foot-view>
  </div>
</template>
<script>
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
import footView from "@/components/Foot.vue";
import { realInformations_data, realInformations_start, ip } from "~/api/api";
export default {
  name: "RealInformations",
  async asyncData (context) {
    let ip=context.store.state.cookie.ip;
    let city = context.store.state.city;
    let token=context.store.state.cookie.token;
    let jkl=context.params.name;
    let position = context.params.position;
    let kid = context.store.state.cookie.kid ? context.store.state.cookie.kid : ''
    let other = context.store.state.cookie.other ? context.store.state.cookie.other : ''
    let [res1,res2]= await Promise.all([
      context.$axios.post('/api/article/info',{
        city: city,
        ip: ip,
        platform: 2,
        token: token,
        kid:kid,
        other:other
      })
      .then((resp)=>{
        let data = resp.data;
          return data;
      }),
      context.$axios.post('/api/article/page',{
        city: city,
        platform: 2,
        position: position,
        token: token,
        page: 1,
        limit: 10,
        kid:kid,
        other:other
      })
      .then((resp)=>{
        let data = resp.data.data.data;
          return data;
      }),
    ]) 
    return{
      luns : res1.data[0].imgs,
          nav : res1.data[0].title,
          lists : res2,
          tit:res1.header.title,
          key:res1.header.keywords,
          des:res1.header.description,
          jkl:jkl,
          city:city,
          position : position
    }
  },
  data() {
    return {
      lists: [],
      luns: [],
      nav: [],
      ip: "",
      n: "",
      tit:'',
      des:'',
      key:'',
      jkl:'',
      position:'',
      city:''
    };
  },
  components: {
    "foot-view": footView
  },
  head(){
    return {
      title:this.tit,
      meta:[
        {
          name: "description",
          content: this.des
        },
        {
          name: "keywords",
          content: this.key
        }
      ]
    }
  },
  methods: {
    start() {
      this.n = this.$route.params.name;
      let ip = ip_arr["ip"];
          // let ip = returnCitySN["cip"];
      this.ip = ip;
      $cookies.set('ip',ip);
      $cookies.set('pinyin',this.n);
    },
    get(e) {
      let id = e.target.getAttribute("data-v");
      let ip = this.ip;
      let city = this.city;
      let token = localStorage.getItem("token");
      let that = this;
      realInformations_data({
        city: city,
        platform: 2,
        position: id,
        token: token,
        page: 1,
        limit: 10
      })
        .then(resp => {
          that.lists = resp.data.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    goback() {
      // this.$router.push('/'+this.jkl);
      this.$router.go(-1)
    },
    scroll() {
      let Y = window.scrollY;
      if (Y <= 254) {
        $(".nav").css("position", "relative");
      } else {
        $(".nav").css({ position: "fixed", top: 0 });
      }
    }
  },
  mounted() {
    $('html').css('overflow','initial')
    let width = document.documentElement.clientWidth;
    width = width * 0.96;
    $(".nav").css("width", width + "px");
    this.start();
    /*头部轮播*/
    var swiper = new Swiper(".swiper-top", {
      // eslint-disable-line no-unused-vars
      spaceBetween: 0,
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true, //修改swiper的父元素时，自动初始化swiper
      autoplay: true,
      pagination: {
        el: "#swiper-pagination1",
        clickable: true
      }
    });
    var swiper05 = new Swiper(".swiper-container", {
      // eslint-disable-line no-unused-vars
      slidesPerView: 4.5,
      spaceBetween: 0,
      pagination: {
        clickable: true
      },
      observer: true,
      observeParents: true
    });
    $(".tegood p").on("click", function() {
      $(this)
        .addClass("active")
        .parent()
        .parent()
        .siblings("div")
        .find("div")
        .find("p")
        .removeClass("active");
    });
    window.addEventListener("scroll", this.scroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scroll);
  },
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
}
li{
  list-style: none;
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
.m-luns {
  height: 180px;
  margin-bottom: 14px;
  overflow: hidden;
}
.m-luns .swiper-top {
  position: relative;
}
.m-luns #swiper-pagination1 {
  text-align: center;
  position: absolute;
  z-index: 2;
  bottom: 1%;
  width: 100%;
}
.m-luns >>> .swiper-pagination-bullet {
  background-color: #808080;
}
.m-luns >>> .swiper-pagination-bullet-active {
  background-color: #f7f7f7;
}
.m-luns >>> .zhe {
  width: 100%;
  height: 180px;
  background: rgba(0, 0, 0, 0.4);
  position: absolute;
  z-index: 2;
  top: 0;
}
.m-luns .swiper-slide {
  position: relative;
}
.m-luns .swiper-slide p {
  position: absolute;
  color: #ffffff;
  font-size: 15px;
  bottom: 8%;
  width: 92%;
  left: 4%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  z-index: 3;
}
.m-luns .swiper-slide img {
  height: 180px;
}

.nav {
  margin-left: 4%;
  background-color: #fff;
}
.nav .swiper-container {
  height: 40px;
  padding-top: 8px;
  -webkit-box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.05);
}
.tegood p {
  color: #919499;
  font-size: 16px;
  position: relative;
}
.tegood p.active {
  color: #2e3033;
  font-weight: bold;
}
.tegood p.active i {
  display: block;
  position: absolute;
  bottom: -7px;
  width: 31.5%;
  height: 2.5px;
  background-color: #40a2f4;
  left: 50%;
  margin-left: -21.75%;
}
.lists {
  margin-top: 20px;
  padding: 0 4%;
}
.lists li {
  margin-bottom: 14px;
  width: 100%;
}
.lists .list {
  padding-bottom: 9px;
  height: 84px;
  border-bottom: 1px solid #f3f5fb;
}
.lists .list .left {
  float: left;
}
.lists .list .left h5 {
  color: #2e3033;
  font-size: 16px;
  height: 45px;
  margin-bottom: 15px;
  width: 225px;
  font-weight: normal;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  line-height: 23px;
}
.lists .list .left p {
  color: #919499;
  margin-right: 4px;
  font-size: 11px;
}
.lists .list .right {
  display: inline-block;
  float: right;
}
.lists .list .right img {
  width: 100px;
  height: 74px;
  border-radius: 5px;
}
</style>