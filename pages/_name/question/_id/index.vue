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
            <img src="~/assets/noclick.png"  data-d="1" :data-v="item.id" :data-n="item.count" @click="agree($event)" />
            <span>有用({{item.count}})</span>
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
    let jkl = context.store.state.cookie.pinyin;
    let id=context.params.id;
    let [res]= await Promise.all([
      context.$axios.post('/api/project/question_info',{
        ip: ip,
        id: id,
        page: 1,
        limit: 10,
        platform: 2,
        token: token
      })
      .then((resp)=>{
        let data = resp.data.data;
          return data;
      })
    ])
    return{
          lists: res,
          jkl:jkl
    }
  },
  components: {
    "foot-view": footView
  },
  data() {
    return {
      lists: [],
      ip: "",
      id: "",
      n:'',
      ting:true,
      jkl:'',
      page:2
    };
  },
  methods: {
    start() {
      let id = this.$route.params.id;
      this.id = id;
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
      encyclopediaarticle_agree({ ip: ip, id: id, platform: 2, token: token })
        .then(resp => {
          if (resp.data.code == 500) {
            that.$router.push('/'+that.n+"/login")
            // window.location.href = "/login";
          } else {
            let type = e.target.getAttribute("data-d");
            let click = require("~/assets/noclick.png");
            if (type == 1) {
              num = parseInt(num) + 1;
              e.target.setAttribute("data-n", num);
              e.target.setAttribute("data-d", 0);
              e.target.setAttribute("src", img);
              e.target.nextElementSibling.innerHTML = `有用(${num})`;
            } else {
              num = parseInt(num) - 1;
              e.target.setAttribute("data-n", num);
              e.target.setAttribute("data-d", 1);
              e.target.setAttribute("src", click);
              e.target.nextElementSibling.innerHTML = `有用(${num})`;
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
    getmore() {
      let id = this.$route.params.id;
      this.ting = false;
      let ip = returnCitySN["cip"];
      let token = localStorage.getItem("token");
      let page = this.page;
      let that = this;
      question_data({
        ip: ip,
        id: id,
        page: page,
        limit: 10,
        platform: 2,
        token: token
      })
        .then(res => {
          that.ting=true
          let data = res.data.data;
          let l = that.lists.concat(data);
          that.lists = l;
          that.page = that.page + 1;
        })
        .catch(error => {
          console.log(error);
        });
    },
    scroll() {
      var scrollTop = window.scrollY;
      var scrollHeight = window.screen.availHeight;
      var windowHeight = document.body.scrollHeight;
      // console.log(scrollTop, scrollHeight, windowHeight);
      if (scrollTop + scrollHeight >= windowHeight) {
        if (this.ting) {
          this.getmore();
        }
      }
    }
  },
  mounted() {
    let h = document.body.clientHeight;
    if (h < 700) {
      $("#Foot").css({ position: "fixed", bottom: "0", width: "100%",marginBottom: '80px' });
    } else if (h >= 700) {
      $("#Foot").css({ position: "relative", bottom: "0", width: "100%", marginBottom: '80px' });
    }
    this.start();
    let that = this;
    this.n=this.$route.params.name
    $("#btn").on("click", function() {
      let token = localStorage.getItem("token");
      if (token) {
        that.$router.push('/'+that.n+"/leavequestion/" + that.id)
        // window.location.href = '/'+that.n+"/leavequestion/" + that.id;
      } else {
        that.$router.push('/'+that.n+"/login")
        // window.location.href = '/'+that.n+"/login";
      }
    });
    window.addEventListener("scroll", this.scroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scroll);
  }
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
  width:100%;
  color: #333333;
  text-align: center;
  height: 44px;
  background-color: #fff;
  line-height: 44px;
  font-weight: bold;
  -webkit-box-shadow: 0 0 3px 0 rgba(0,0,0,.05);
    box-shadow: 0 0 3px 0 rgba(0,0,0,.05);
  font-size: 16px;
  position: fixed;
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
  position: relative;
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
  text-decoration: none;
  display: inline-block;
  width: 90%;
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
  z-index: 2;
}
</style>