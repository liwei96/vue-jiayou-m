<template>
  <div class="Encyclopedia">
    <h3>
      <img src="~/assets/return.png" @click="goback" />买房百科
    </h3>
    <ul class="nav">
      <router-link :to="'/'+jkl+'/encyclopedia/before/56'">
      <li :class="type=='before'?'active':''" style="margin-left: 50px;">
        买房前
        <i></i>
      </li>
      </router-link>
      <router-link :to="'/'+jkl+'/encyclopedia/hand/60'">
      <li :class="type=='hand'?'active':''">
        买房中
        <i></i>
      </li>
      </router-link>
      <router-link :to="'/'+jkl+'/encyclopedia/after/65'">
      <li :class="type=='after'?'active':''">
        买房后
        <i></i>
      </li>
      </router-link>
    </ul>
    <div class="q" v-show="q1">
      <div class="fubox">
        <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="tegood">
                <router-link :to="'/'+jkl+'/encyclopedia/before/56'">
              <p :class="position==56?'active':''" data-v="56">买房资格</p>
              </router-link>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="tegood">
                <router-link :to="'/'+jkl+'/encyclopedia/before/57'">
              <p :class="position==57?'active':''" data-v="57">买房能力</p>
              </router-link>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="tegood">
                <router-link :to="'/'+jkl+'/encyclopedia/before/58'">
              <p :class="position==58?'active':''"  data-v="58">买房政策</p>
              </router-link>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="tegood">
                <router-link :to="'/'+jkl+'/encyclopedia/before/59'">
              <p :class="position==59?'active':''"  data-v="59">买房流程</p>
              </router-link>
            </div>
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
                <p v-if="list.labels" >
                  <span v-for="(kk,key) in list.labels" :key="key">{{kk.name}}</span>
                </p>
              </div>
              <div class="right">
                <img :src="list.img" alt />
              </div>
            </div>
          </router-link>
        </li>
      </ul>
      
    </div>
    <div class="z" v-show="z1">
      <div class="fubox">
        <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="tegood">
                <router-link :to="'/'+jkl+'/encyclopedia/hand/60'">
              <p :class="position==60?'active':''" data-v="60">新房签约</p>
              </router-link>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="tegood">
                <router-link :to="'/'+jkl+'/encyclopedia/hand/61'">
              <p :class="position==61?'active':''" data-v="61">缴纳定金</p>
              </router-link>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="tegood">
                <router-link :to="'/'+jkl+'/encyclopedia/hand/62'">
              <p :class="position==62?'active':''" data-v="62">贷款政策</p>
              </router-link>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="tegood">
                <router-link :to="'/'+jkl+'/encyclopedia/hand/63'">
              <p :class="position==63?'active':''" data-v="63">商业贷款</p>
              </router-link>
            </div>
          </div>
           <div class="swiper-slide">
            <div class="tegood">
                <router-link :to="'/'+jkl+'/encyclopedia/hand/64'">
              <p :class="position==64?'active':''" data-v="64">公积金贷款</p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      </div>
      
      <ul class="lists">
        <li v-for="(list,key) in list1" :key="key">
          <router-link :to="'/'+jkl+'/encyclopediaArticle/'+list.position+'/'+list.id">
            <div class="list">
              <div class="left">
                <h5>{{list.title}}</h5>
                <p v-if="list.labels" >
                  <span v-for="(kk,key) in list.labels" :key="key">{{kk.name}}</span>
                </p>
              </div>
              <div class="right">
                <img :src="list.img" alt />
              </div>
            </div>
          </router-link>
        </li>
      </ul>
      
    </div>
    <div class="h" v-show="h1">
      <div class="fubox">
        <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="tegood">
                <router-link :to="'/'+jkl+'/encyclopedia/after/65'">
              <p :class="position==65?'active':''" data-v="65">还款</p>
              </router-link>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="tegood">
                <router-link :to="'/'+jkl+'/encyclopedia/after/66'">
              <p :class="position==66?'active':''" data-v="66">全款</p>
              </router-link>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="tegood">
                <router-link :to="'/'+jkl+'/encyclopedia/after/67'">
              <p :class="position==67?'active':''" data-v="67">新房验房</p>
              </router-link>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="tegood">
                <router-link :to="'/'+jkl+'/encyclopedia/after/68'">
              <p :class="position==68?'active':''" data-v="68">物业</p>
              </router-link>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="tegood">
                <router-link :to="'/'+jkl+'/encyclopedia/after/69'">
              <p :class="position==69?'active':''" data-v="69">退房流程</p>
              </router-link>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="tegood">
                <router-link :to="'/'+jkl+'/encyclopedia/after/70'">
              <p :class="position==70?'active':''" data-v="70">落户</p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      </div>
      
      <ul class="lists">
        <li v-for="(list,key) in list2" :key="key">
          <router-link :to="'/'+jkl+'/encyclopediaArticle/'+list.position+'/'+list.id">
            <div class="list">
              <div class="left">
                <h5>{{list.title}}</h5>
                <p v-if="list.labels" >
                  <span v-for="(kk,key) in list.labels" :key="key">{{kk.name}}</span>
                </p>
              </div>
              <div class="right">
                <img :src="list.img" alt />
              </div>
            </div>
          </router-link>
        </li>
      </ul>
      
    </div>
    <foot-view :pinyin="jkl"></foot-view>
    <transition name="fade">
      <load-view v-if="load"></load-view>
    </transition>
  </div>
</template>
<script>
import {ip,encyclopedia_data} from '~/api/api' 
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
import Loadings from "@/components/loading";
import footView from "@/components/Foot.vue";
export default {
  name: "Encyclopedia",
  components: {
    loadView: Loadings,
    'foot-view':footView
  },
  async asyncData (context) {
   let ip=context.store.state.cookie.ip;
    let city = context.store.state.city;
    let token=context.store.state.cookie.token;
    let type = context.params.type;
    let p1 = '56';
    let p2 = '60';
    let p3 = '65'
    let position = context.params.position
    let q1 = true;
    let z1 = true;
    let h1 = true;
    if(type=='before'){
      p1 = position
      z1 = false
      h1 = false
    }else if(type =='hand'){
      p2 = position
      q1 = false
      h1 = false
    }else if(type == 'after') {
      p3 = position
      q1 = false
      z1 = false
    }
    let jkl = context.params.name;
    let [res1,res2,res3,res4]= await Promise.all([
      context.$axios.post('/api/article/page',{ip:ip,city:city,page:1,limit:10,position:p1,platform:2,token:token})
      .then((resp)=>{
          let data=resp.data.data.data;
          data.n=context.store.state.pinyin;
          return data;
      }),
      context.$axios.post('/api/article/page',{ip:ip,city:city,page:1,limit:10,position:p2,platform:2,token:token})
      .then((resp)=>{
          let data=resp.data.data.data;
          return data;
      }),
      context.$axios.post('/api/article/page',{ip:ip,city:city,page:1,limit:10,position:p3,platform:2,token:token})
      .then((resp)=>{
          let data=resp.data.data.data;
          data.n=context.store.state.pinyin;
          return data;
      }),
      context.$axios.post('/api/article/wiki',{ip:ip,city:city,platform:2,token:token})
      .then((resp)=>{
          let data=resp.data.header;
          return data;
      })
    ])
    return{
          lists:res1,
          list1:res2,
          list2:res3,
          jkl:jkl,
          city:city,
          title:res4.title,
          keywords:res4.keywords,
          description:res4.description,
          type:type,
          z1:z1,
          h1:h1,
          q1:q1,
          position:position
    }
  },
  data() {
    return {
      q1: true,
      z1: false,
      h1: false,
      lists: [
        {
          tit: "房地产行业集中度进一步提高百强 房企市场份额升",
          lab1: "楼盘签约",
          lab2: "新房签约",
          img: require("~/assets/lou1.png")
        },
        {
          tit: "房地产行业集中度进一步提高百强 房企市场份额升",
          lab1: "楼盘签约",
          lab2: "新房签约",
          img: require("~/assets/lou1.png")
        },
        {
          tit: "房地产行业集中度进一步提高百强 房企市场份额升",
          lab1: "楼盘签约",
          lab2: "新房签约",
          img: require("~/assets/lou1.png")
        },
        {
          tit: "房地产行业集中度进一步提高百强 房企市场份额升",
          lab1: "楼盘签约",
          lab2: "新房签约",
          img: require("~/assets/lou1.png")
        },
        {
          tit: "房地产行业集中度进一步提高百强 房企市场份额升",
          lab1: "楼盘签约",
          lab2: "新房签约",
          img: require("~/assets/lou1.png")
        },
        {
          tit: "房地产行业集中度进一步提高百强 房企市场份额升",
          lab1: "楼盘签约",
          lab2: "新房签约",
          img: require("~/assets/lou1.png")
        },
        {
          tit: "房地产行业集中度进一步提高百强 房企市场份额升",
          lab1: "楼盘签约",
          lab2: "新房签约",
          img: require("~/assets/lou1.png")
        },
        {
          tit: "房地产行业集中度进一步提高百强 房企市场份额升",
          lab1: "楼盘签约",
          lab2: "新房签约",
          img: require("~/assets/lou1.png")
        },
        {
          tit: "房地产行业集中度进一步提高百强 房企市场份额升",
          lab1: "楼盘签约",
          lab2: "新房签约",
          img: require("~/assets/lou1.png")
        }
      ],
      list1:[],
      list2:[],
      id1:'56',
      id2:'60',
      id3:'65',
      pages:{
        '56':2,
        '57':2,
        '58':2,
        '59':2,
        '60':2,
        '61':2,
        '62':2,
        '63':2,
        '64':2,
        '65':2,
        '66':2,
        '67':2,
        '68':2,
        '69':2,
        '70':2,
      },
      p1:2,
      p2:2,
      p3:2,
      n:'',
      load:true,
      jkl:'',
      city:'',
      title:'',
      keywords:'',
      description:'',
      type:0,
      position:56
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          name: "description",
          content:
            this.description
        },
        {
          name: "keywords",
          content: this.keywords
        }
      ]
    };
  },
  components: {
    "foot-view": footView
  },
  methods: {
    getb(e){
      let id=e.target.getAttribute('data-v');
      this.id1=id;
      this.p1=2;
      let token=localStorage.getItem('token');
      let city=this.city;
      let ip=this.ip;
      let that=this;
      encyclopedia_data({ip:ip,city:city,page:1,limit:10,position:id,platform:2,token:token}).then(resp=>{
        that.lists=resp.data.data.data;
      }).catch(error=>{
        console.log(error)
      })
      // $='/'+this.jkl+'/encyclopedia/0/'+id
    },
    geti(e){
      let id=e.target.getAttribute('data-v');
      this.id2=id;
      this.p2=2;
      let token=localStorage.getItem('token');
      let city=this.city;
      let ip=this.ip;
      let that=this;
      encyclopedia_data({ip:ip,city:city,page:1,limit:10,position:id,platform:2,token:token}).then(resp=>{
        that.list1=resp.data.data.data;
      }).catch(error=>{
        console.log(error)
      })
    },
    geta(e){
      let id=e.target.getAttribute('data-v');
      this.id3=id;
      this.p3=2;
      let token=localStorage.getItem('token');
      let city=this.city;
      let ip=this.ip;
      let that=this;
      encyclopedia_data({ip:ip,city:city,page:1,limit:10,position:id,platform:2,token:token}).then(resp=>{
        that.list2=resp.data.data.data;
      }).catch(error=>{
        console.log(error)
      })
    },
    start(){
      this.n=this.$route.params.name
      let token=localStorage.getItem('token');
      let city=this.city;
      let ip = ip_arr["ip"];
          // let ip = returnCitySN["cip"];
      this.ip=ip;
      localStorage.getItem('ip');
      this.load=false
    },
    more3(id,page){
      let token=localStorage.getItem('token');
      let city=this.city;
      let ip=this.ip;
      let that=this;
      encyclopedia_data({ip:ip,city:city,page:page,limit:10,position:id,platform:2,token:token}).then(resp=>{
        let list2=resp.data.data.data;
        let k=that.list2.concat(list2);
        that.list2=k;
        that.p3=page+1;
      }).catch(error=>{
        console.log(error)
      })
    },
    more2 (id,page){
      let token=localStorage.getItem('token');
      let city=this.city;
      let ip=this.ip;
      let that=this;
      encyclopedia_data({ip:ip,city:city,page:page,limit:10,position:id,platform:2,token:token}).then(resp=>{
        let list1=resp.data.data.data;
        let k=that.list1.concat(list1);
        that.list1=k;
        that.p2=page+1;
      }).catch(error=>{
        console.log(error)
      })
    },
    more1(id,page){
      let token=localStorage.getItem('token');
      let city=this.city;
      let ip=this.ip;
      let that=this;
      encyclopedia_data({ip:ip,city:city,page:page,limit:10,position:id,platform:2,token:token}).then(resp=>{
        let list2=resp.data.data.data;
        let k=that.lists.concat(list2);
        that.lists=k;
        that.p1=page+1;
      }).catch(error=>{
        console.log(error)
      })
    },
    goback(){
      this.$router.push('/'+this.jkl)
    },
    scroll(){
      let Y = window.scrollY;
      if(Y<=42){
        $('.fubox').css({'position':'relative','height':'50px','paddingTop':'10px'})
      }else{
        $('.fubox').css({'position':'fixed','top':0,'height':'50px','paddingTop':'12px','background':'#fff'})
      }
      var scrollTop = window.scrollY;
      var scrollHeight = window.screen.availHeight;
      var windowHeight = document.body.scrollHeight;
      if (scrollTop + scrollHeight >= windowHeight) {
        if(this.q1){
          let id=this.id1;
          let page=this.p1;
          this.more1(id,page)
        }else if(this.z1){
          let id=this.id2;
          let page=this.p2;
          this.more2(id,page)
        }else{
          let id=this.id3;
          let page=this.p3
          this.more3(id,page)
        }
      }
    }
  },
  mounted() {
    $('html').css('overflow','initial')
    let width=document.documentElement.clientWidth;
    $('.fubox').css('width',width+'px')
    this.start();
    let that=this
    var swiper05 = new Swiper(".swiper-container", {
      // eslint-disable-line no-unused-vars
      slidesPerView: 4,
      spaceBetween: 10,
      pagination: {
        clickable: true
      },
      observer: true,
      observeParents: true
    });
    $(".nav li").on("click", function() {
      $(this)
        .addClass("active")
        .siblings("li")
        .removeClass("active");
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
.swiper-wrapper{
  width:375px;
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
}
h3 img {
  position: absolute;
  width: 5%;
  margin-top: 14px;
  left: 5.33%;
}
.fubox{
    -webkit-box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.05);
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.05);
    height: 50px;
    padding-top: 10px;
}
.nav {
  width: 100%;
  height: 40px;
  border-bottom: 0.5px solid #f5f5f7;
  background-color: #fff;
}
.nav li {
  color: #919499;
  font-size: 16px;
  height: 40px;
  line-height: 40px;
  margin-left: 68px;
  float: left;
  position: relative;
}
.nav li.active {
  color: #2e3033;
  font-weight: bold;
}
.nav li.active i {
  position: absolute;
  display: block;
  width: 25px;
  height: 2.5px;
  background-color: #40a2f4;
  bottom: 0;
  left: 50%;
  margin-left: -12.5px;
}

.swiper-wrapper {
  left: 4%;
}
.tegood p {
  width: 78px;
  height: 26px;
  border-radius: 2px;

  background-color: #f2f4f7;
  color: #5e6166;
  font-size: 14px;
  text-align: center;
  line-height: 26px;
}
.tegood p.active {
  background: linear-gradient(
    270deg,
    rgba(102, 207, 255, 1),
    rgba(76, 181, 255, 1)
  );
  color: #fff;
}

.lists {
  margin-top: 10px;
}
.lists li {
  padding: 0 4%;
  margin-bottom: 14px;
}
.lists .list {
  padding-bottom: 9px;
  border-bottom: 1px solid #f3f5fb;
  height: 90px;
}
.lists .list .left {
  display: inline-block;
}
.lists .list .left h5 {
  color: #2e3033;
  font-size: 15px;
  margin-bottom: 22px;
  width: 225px;
  line-height: 18px;
}
.lists .list .left p span {
  display: inline-block;
  width: 54px;
  height: 17px;
  text-align: center;
  line-height: 17px;
  background-color: #f2f4f7;
  color: #919499;
  margin-right: 4%;
  font-size: 11px;
  overflow: hidden;
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