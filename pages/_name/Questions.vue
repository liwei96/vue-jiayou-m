<template>
  <div class="Question">
    <h3>
      <img src="~/assets/return.png" @click="goback" />楼盘问答
    </h3>
    <ul>
      <li v-for="(item,key) in lists" :key="key">
        <h4>
          <span>问</span>
          <u>{{item.question}}</u>
        </h4>
        <div class="answer">
          <span>答</span>
          <p>{{item.answer}}</p>
        </div>
        <p class="bom">
          <span class="time">{{item.createtime}}</span>
          <span class="click">
            <img src="~/assets/noclick.png"  :type="item.my_like" :data-n="item.count" :data-v="item.id" @click="agree($event)" />
            <span :type="item.my_like"  :data-v="item.id" :data-n="item.count" @click="agrees($event)">有用({{item.count}})</span>
          </span>
        </p>
      </li>
    </ul>
    <div class="bottom">
      <button id="btn">我要提问</button>
    </div>
    <foot-view :pinyin="jkl"></foot-view>
  </div>
</template>
<script>
import footView from "@/components/Foot.vue";
import { ip, question_data,encyclopediaarticle_agree } from "~/api/api";
export default {
  name: "Question",
  async asyncData (context) {
    let ip=context.store.state.cookie.ip;
    let city = context.store.state.cookie.city;
    let token=context.store.state.cookie.token;
    let jkl=context.store.state.cookie.pinyin;
    let [res]= await Promise.all([
      context.$axios.post('/api/project/question_info',{
        ip: ip,
        page: 1,
        limit: 10,
        platform: 2,
        token: token,
        city:city
      })
      .then((resp)=>{
        let data = resp.data;
          
          return data;
      })
    ])
    return{
          lists : res.data,
          jkl:jkl,
          title:res.head.title,
          description:res.head.description,
          keywords:res.head.keywords
    }
  },
  components: {
    "foot-view": footView
  },
  data() {
    return {
      lists: [],
      ip: "",
      id:'',
      n:'',
      page:2,
      isok:true,
      jkl:'',
      title:'',
      description:'',
      keywords:''
    };
  },
  head() {
    return {
      title: this.title || '允家新房-楼盘问答',
      meta: [
        {
          name: "description",
          content: this.description || '允家新房'
        },
        {
          name: "keywords",
          content: this.keywords || '允家新房'
        }
      ]
    };
  },
  methods: {
    start() {
      let ip=returnCitySN['cip'];
      this.ip=ip;
      localStorage.getItem('ip');
    },
    agree(e) {
      // console.log(e.target)
      let img = require("~/assets/clicked.png");
      let id = e.target.getAttribute("data-v");
      let ip = this.ip;
      let token = localStorage.getItem("token");
      let that = this;
      let num = e.target.getAttribute("data-n");
      encyclopediaarticle_agree({ ip: ip, id: id, platform: 2, token: token , type: 1 })
        .then(resp => {
          if (resp.data.code == 500) {
            that.$router.push("/" + that.pinyin + "/login");
            // window.location.href = "/login";
          } else {
            let type = e.target.getAttribute("type");
            let click = require("~/assets/noclick.png");
            if (type == 0) {
              num = parseInt(num) + 1;
              e.target.setAttribute("data-n", num);
              e.target.setAttribute("type", 1);
              e.target.setAttribute("src", img);
              e.target.nextElementSibling.innerHTML = `有用(${num})`;
            } else {
              num = parseInt(num) - 1;
              e.target.setAttribute("data-n", num);
              e.target.setAttribute("type", 0);
              e.target.setAttribute("src", click);
              e.target.nextElementSibling.innerHTML = `有用(${num})`;
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    agrees(e) {
      // console.log(e.target)
      let img = require("~/assets/clicked.png");
      let id = e.target.getAttribute("data-v");
      let ip = this.ip;
      let token = localStorage.getItem("token");
      let that = this;
      let num = e.target.getAttribute("data-n");
      encyclopediaarticle_agree({ ip: ip, id: id, platform: 2, token: token , type: 1 })
        .then(resp => {
          if (resp.data.code == 500) {
            that.$router.push("/" + that.pinyin + "/login");
            // window.location.href = "/login";
          } else {
            let type = e.target.getAttribute("type");
            let click = require("~/assets/noclick.png");
            if (type == 0) {
              num = parseInt(num) + 1;
              e.target.setAttribute("data-n", num);
              e.target.setAttribute("type", 1);
              e.target.previousElementSibling.setAttribute("src", img);
              e.target.innerHTML = `有用(${num})`;
            } else {
              num = parseInt(num) - 1;
              e.target.setAttribute("data-n", num);
              e.target.setAttribute("type", 0);
              e.target.previousElementSibling.setAttribute("src", click);
              e.target.innerHTML = `有用(${num})`;
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    goback(){
      this.$router.go(-1)
    },
    getmore(){
      if(this.isok){
        this.isok=false
        let that = this;
      let ip=returnCitySN['cip'];
      this.ip=ip;
      localStorage.getItem('ip');
      let token = localStorage.getItem("token");
      let city = localStorage.getItem("city");
      question_data({
        ip: ip,
        page: that.page,
        limit: 10,
        platform: 2,
        token: token,
        city:city
      })
        .then(resp => {
          let l = resp.data.data;
          that.lists=that.lists.concat(l)
          that.page+=1;
          that.isok=true
        })
        .catch(error => {
          console.log(error);
        });
      }
      
    },
    scroll(){
      var scrollTop = window.scrollY;
      var scrollHeight = window.screen.availHeight;
      var windowHeight = document.body.scrollHeight;
      if (scrollTop + scrollHeight >= windowHeight) {
        this.getmore();
      }

    }
  },
  mounted() {
    this.start();
    let that = this;
    $("#btn").on("click", function() {
      let kk=localStorage.getItem('pinyin')
      let token = localStorage.getItem("token");
      if (token) {
        that.$router.push('/'+kk+"/leavequestions")
        // window.location.href = "/leavequestion/" + that.id;
      } else {
        that.$router.push('/'+kk+"/login")
        // window.location.href = "/login";
      }
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
body {
  padding-bottom: 10px;
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
  -webkit-box-shadow: 0 0 3px 0 rgba(0,0,0,.05);
    box-shadow: 0 0 3px 0 rgba(0,0,0,.05);
  font-size: 16px;
  position: fixed;
  background-color: #fff;
  width: 100%;
  top:0;
  z-index: 2;
}
h3 img {
  position: absolute;
  width: 5%;
  margin-top: 14px;
  left: 5.33%;
}
ul {
  padding: 0 4%;
  margin-bottom: 80px;
  margin-top: 44px;
}
ul li {
  border-bottom: 0.5px solid #f3f5fb;
}
ul li h4 {
  color: #2e3033;
  font-size: 16px;
  margin-bottom: 20px;
  padding-top: 20px;
}
ul li h4 span {
  width: 16px;
  height: 16px;
  border-radius: 5px 0 5px 0;
  background-color: #fff8e5;
  text-align: center;
  line-height: 16px;
  color: #af6621;
  font-size: 12px;
  margin-right: 12px;
  float: left;
}
ul li h4 u{
  width:90%;
  display: inline-block;
  text-decoration: none;
}
ul li .answer {
  margin-bottom: 15px;
}
ul li .answer span {
  width: 16px;
  height: 16px;
  border-radius: 5px 0 5px 0;
  background-color: #e5f4ff;
  text-align: center;
  line-height: 16px;
  color: #53597c;
  font-size: 12px;
  margin-right: 12px;
  display: inline-block;
  float: left;
}
ul li .answer p {
  display: inline-block;
  color: #919499;
  font-size: 15px;
  line-height: 23px;
  width: 91%;
}
ul li .bom {
  color: #919499;
  font-size: 12px;
  padding-bottom: 15px;
  padding-left: 8%;
}
ul li .bom .click {
  float: right;
  width: 22%;
}
ul li .bom .click img {
  width: 20%;
  margin-right: 6%;
  margin-bottom: 2px;
}

button {
  width: 92%;
  margin-left: 4%;
  background-color: #f0f2f5;
  text-align: center;
  line-height: 40px;
  height: 40px;
  border-radius: 4px;
  color: #4db5ff;
  font-size: 16px;
  border: 0;
  margin-bottom: 20px;
}
.bottom{
  position: fixed;
  bottom: 0;
  width:100%;
  padding-top:20px;
  background-color: #fff;
}
</style>