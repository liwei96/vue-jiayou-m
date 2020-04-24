<template>
  <div class="Address">
    <nav>
      <img class="back" src="~/assets/return.png" @click="goback" alt />
      <button id="sea">
        <img class="search" src="~/assets/search.png" alt />输入城市搜索
      </button>
    </nav>
    <div class="current">
      <img src="~/assets/cur.png" alt class="cur" />
      <span class="city">{{city}}</span>
      <span class="msg">当前城市</span>
      <span class="btn" @click="getcity($event)">{{btn}}</span>
    </div>
    <div class="hot">
      <h5>支持城市</h5>
      <div class="hot-tabs">
        <span
          v-for="hot in hots"
          :data-v="hot.area_id"
          :key="hot.area_id"
          @click="setcity"
          :data-n="hot.pinyin"
        >{{hot.short}}</span>
      </div>
    </div>
    <div class="all">
      <h4>全部城市</h4>
      <p class="tit" id="A">A</p>
      <ul>
        <li v-for="city in A" :key="city.area_id" @click="show($event)">{{city.city}}</li>
      </ul>
      <p class="tit" id="B">B</p>
      <ul>
        <li v-for="city in B" :key="city.area_id" @click="show($event)">{{city.city}}</li>
      </ul>
      <p class="tit" id="C">C</p>
      <ul>
        <li v-for="city in C" :key="city.area_id" @click="show($event)">{{city.city}}</li>
      </ul>
      <p class="tit" id="D">D</p>
      <ul>
        <li v-for="city in D" :key="city.area_id" @click="show($event)">{{city.city}}</li>
      </ul>
      <p class="tit" id="E">E</p>
      <ul>
        <li v-for="city in E" :key="city.area_id" @click="show($event)">{{city.city}}</li>
      </ul>
      <p class="tit" id="F">F</p>
      <ul>
        <li v-for="city in F" :key="city.area_id" @click="show($event)">{{city.city}}</li>
      </ul>
      <p class="tit" id="G">G</p>
      <ul>
        <li v-for="city in G" :key="city.area_id" @click="show($event)">{{city.city}}</li>
      </ul>
      <p class="tit" id="H">H</p>
      <ul>
        <li v-for="city in H" :key="city.area_id" @click="show($event)">{{city.city}}</li>
      </ul>
      <p class="tit" id="J">J</p>
      <ul>
        <li v-for="city in J" :key="city.area_id" @click="show($event)">{{city.city}}</li>
      </ul>
      <p class="tit" id="K">K</p>
      <ul>
        <li v-for="city in K" :key="city.area_id" @click="show($event)">{{city.city}}</li>
      </ul>
      <p class="tit" id="L">L</p>
      <ul>
        <li v-for="city in L" :key="city.area_id" @click="show($event)">{{city.city}}</li>
      </ul>
      <p class="tit" id="M">M</p>
      <ul>
        <li v-for="city in M" :key="city.area_id" @click="show($event)">{{city.city}}</li>
      </ul>
      <p class="tit" id="N">N</p>
      <ul>
        <li v-for="city in N" :key="city.area_id" @click="show($event)">{{city.city}}</li>
      </ul>
      <p class="tit" id="O">O</p>
      <ul>
        <li v-for="city in O" :key="city.area_id" @click="show($event)">{{city.city}}</li>
      </ul>
      <p class="tit" id="P">P</p>
      <ul>
        <li v-for="city in P" :key="city.area_id" @click="show($event)">{{city.city}}</li>
      </ul>
      <p class="tit" id="Q">Q</p>
      <ul>
        <li v-for="city in Q" :key="city.area_id" @click="show($event)">{{city.city}}</li>
      </ul>
      <p class="tit" id="R">R</p>
      <ul>
        <li v-for="city in R" :key="city.area_id" @click="show($event)">{{city.city}}</li>
      </ul>
      <p class="tit" id="S">S</p>
      <ul>
        <li v-for="city in S" :key="city.area_id" @click="show($event)">{{city.city}}</li>
      </ul>
      <p class="tit" id="T">T</p>
      <ul>
        <li v-for="city in T" :key="city.area_id" @click="show($event)">{{city.city}}</li>
      </ul>
      <p class="tit" id="W">W</p>
      <ul>
        <li v-for="city in W" :key="city.area_id" @click="show($event)">{{city.city}}</li>
      </ul>
      <p class="tit" id="X">X</p>
      <ul>
        <li v-for="city in X" :key="city.area_id" @click="show($event)">{{city.city}}</li>
      </ul>
      <p class="tit" id="Y">Y</p>
      <ul>
        <li v-for="city in Y" :key="city.area_id" @click="show($event)">{{city.city}}</li>
      </ul>
      <p class="tit" id="Z">Z</p>
      <ul>
        <li v-for="city in Z" :key="city.area_id" @click="show($event)">{{city.city}}</li>
      </ul>
    </div>
    <ul class="right">
      <li>
        <a href="#A">A</a>
      </li>
      <li>
        <a href="#B">B</a>
      </li>
      <li>
        <a href="#C">C</a>
      </li>
      <li>
        <a href="#D">D</a>
      </li>
      <li>
        <a href="#E">E</a>
      </li>
      <li>
        <a href="#F">F</a>
      </li>
      <li>
        <a href="#G">G</a>
      </li>
      <li>
        <a href="#H">H</a>
      </li>
      <li>
        <a href="#J">J</a>
      </li>
      <li>
        <a href="#K">K</a>
      </li>
      <li>
        <a href="#L">L</a>
      </li>
      <li>
        <a href="#M">M</a>
      </li>
      <li>
        <a href="#N">N</a>
      </li>
      <li>
        <a href="#O">O</a>
      </li>
      <li>
        <a href="#P">P</a>
      </li>
      <li>
        <a href="#Q">Q</a>
      </li>
      <li>
        <a href="#R">R</a>
      </li>
      <li>
        <a href="#S">S</a>
      </li>
      <li>
        <a href="#T">T</a>
      </li>
      <li>
        <a href="#W">W</a>
      </li>
      <li>
        <a href="#X">X</a>
      </li>
      <li>
        <a href="#Y">Y</a>
      </li>
      <li>
        <a href="#Z">Z</a>
      </li>
    </ul>
    <div class="zhao"></div>
    <div class="tan" v-if="kk">
      <img src="~/assets/w-del.png" alt class="del" @click="close" />
      <img class="bg" src="~/assets/addressd.png" alt />
      <h5>很遗憾没有城市信息</h5>
      <p>非常遗憾的通知您，您当前选择的城市我并未涉及，不是我们能力不足，是我们需要更多的人来一起点亮它，让我们一起来维护您选择的家园</p>
      <div class="bom">
        <div class="b-left" @click="tohot">热门城市</div>
        <div class="b-right" @click="please">申请开放</div>
      </div>
    </div>
    <div class="msg">我们已收到您诚挚的申请，在下一个开放城市中我们会优先开放—{{getname}}</div>
  </div>
</template>
<script>
import { address_start, ip } from "~/api/api";
import axios from "axios";
export default {
  name: "Address",
  async asyncData (context) {
   let ip=context.store.state.cookie.ip;
    let city = context.store.state.cookie.city;
    let token=context.store.state.cookie.token;
    let [res]= await Promise.all([
      context.$axios.post('/api/first/city',{ platform: 2, token: token, ip: ip })
      .then((resp)=>{
          let msg = resp.data.data.city;
            
          return msg;
      })
    ])
    return{
          A : res.A,
            B : res.B,
            C : res.C,
            D : res.D,
            E : res.E,
            F : res.F,
            G : res.G,
            H : res.H,
            I : res.I,
            J : res.J,
            K : res.K,
            L : res.L,
            M : res.M,
            N : res.N,
            O : res.O,
            P : res.P,
            Q : res.Q,
            R : res.R,
            S : res.S,
            T : res.T,
            W : res.W,
            X : res.X,
            Y : res.Y,
            Z : res.Z,
            hots : res.hots,
    }
  },
  data() {
    return {
      kk: false,
      getname: "",
      ll: 0,
      A: [],
      B: [],
      C: [],
      D: [],
      E: [],
      F: [],
      G: [],
      H: [],
      I: [],
      X: [],
      V: [],
      N: [],
      M: [],
      S: [],
      J: [],
      K: [],
      L: [],
      Q: [],
      W: [],
      R: [],
      T: [],
      Y: [],
      U: [],
      I: [],
      O: [],
      P: [],
      Z: [],
      hot: [],
      city: "杭州",
      btn: "重新定位",
      hots: [],
      ip: ""
    };
  },
  methods: {
    start() {
      this.city = localStorage.getItem("cityname");
      let address = JSON.parse(localStorage.getItem("address"));
      if (!address) {
        let token = localStorage.getItem("token");
        let ip = returnCitySN["cip"];
        this.ip = ip;
        localStorage.getItem("ip");
        let data = { platform: 2, token: token, ip: ip };
        address_start(data)
          .then(resp => {
            let msg = resp.data.data.city;
            localStorage.setItem("address", JSON.stringify(resp.data.data));
            this.A = msg.A;
            this.B = msg.B;
            this.C = msg.C;
            this.D = msg.D;
            this.E = msg.E;
            this.F = msg.F;
            this.G = msg.G;
            this.H = msg.H;
            this.I = msg.I;
            this.J = msg.J;
            this.K = msg.K;
            this.L = msg.L;
            this.M = msg.M;
            this.N = msg.N;
            this.O = msg.O;
            this.P = msg.P;
            this.Q = msg.Q;
            this.R = msg.R;
            this.S = msg.S;
            this.T = msg.T;
            this.W = msg.W;
            this.X = msg.X;
            this.Y = msg.Y;
            this.Z = msg.Z;
            this.hots = resp.data.data.hots;
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.A = address.city.A;
        this.B = address.city.B;
        this.C = address.city.C;
        this.D = address.city.D;
        this.E = address.city.E;
        this.F = address.city.F;
        this.G = address.city.G;
        this.H = address.city.H;
        this.I = address.city.I;
        this.J = address.city.J;
        this.K = address.city.K;
        this.L = address.city.L;
        this.M = address.city.M;
        this.N = address.city.N;
        this.O = address.city.O;
        this.P = address.city.P;
        this.Q = address.city.Q;
        this.R = address.city.R;
        this.S = address.city.S;
        this.T = address.city.T;
        this.W = address.city.W;
        this.X = address.city.X;
        this.Y = address.city.Y;
        this.Z = address.city.Z;
        this.hots = address.hots;
      }
    },

    getcity() {
      this.getip();
    },
    setcity(e) {
      let city = e.target.getAttribute("data-v");
      let n = e.target.getAttribute("data-n");
      let name = e.target.innerHTML;
      localStorage.setItem("city", city);
      $cookies.set('city',city);
      localStorage.setItem("cityname", name);
      $cookies.set('cityname',name);
      localStorage.setItem("pinyin", n);
      $cookies.set('pinyin',n)
      // window.location.href="/"+n
      this.$router.push("/" + n);
    },

    goback() {
      this.$router.go(-1);
    },
    show(e) {
      let n = e.target;
      this.getname = n.innerHTML;
      let address = JSON.parse(localStorage.getItem("address"));
      for (let item of address["hots"]) {
        if (n.innerHTML == item["city"]) {
        }
      }
      $(".zhao").show();
      this.kk = true;
    },
    close() {
      $(".zhao").hide();
      this.kk = false;
    },
    tohot() {
      $(".zhao").hide();
      this.kk = false;
      window.scrollTo(0, 0);
    },
    please() {
      if (this.ll == 0) {
        this.ll = 1;
        $(".b-right").css({ color: "#B8BCC2" });
        $(".msg").show();
        setTimeout(function() {
          $(".msg").hide();
        }, 1000);
      }
    }
  },
  mounted() {
    this.start();
    let that = this;
    let n = localStorage.getItem("pinyin");
    $("#sea").on("click", function() {
      // window.location.href = '/'+n+"/soucity";
      this.$router.push("/" + n + "/soucity");
    });
    $(".zhao").on("click", function() {
      $(this).hide();
      that.kk = false;
    });
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
.msg {
  display: none;
  position: fixed;
  width: 42.67%;
  height: 119px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.8);
  z-index: 3;
  top: 300px;
  left: 28.67%;
  padding: 18px 5.2% 0 5.2%;
  color: #dadada;
  font-size: 14px;
}
.zhao {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  display: none;
}
.tan {
  width: 77.33%;
  height: 335px;
  background-color: #fff;
  position: fixed;
  top: 200px;
  border-radius: 15px;
  left: 11.333%;
  text-align: center;
  overflow: hidden;
}
.tan .bg {
  width: 38%;
  margin-top: 30px;
  margin-bottom: 20px;
}
.tan .del {
  position: absolute;
  width: 6%;
  right: 5%;
  top: 5%;
}
.tan h5 {
  color: #449dff;
  font-size: 20px;
  margin-bottom: 12px;
  font-weight: bold;
}
.tan p {
  color: #b8bcc2;
  font-size: 14px;
  padding: 0 7.8%;
  text-align: left;
}
.tan .bom {
  width: 100%;
  height: 50px;
  position: absolute;
  bottom: 0;
  border-top: 0.5px solid #f2f5f7;
}
.tan .b-left {
  width: 50%;
  float: left;
  border-right: 0.5px solid #f2f5f7;
  text-align: center;
  height: 50px;
  line-height: 50px;
  color: #b8bcc2;
  font-size: 16px;
}
.tan .b-right {
  width: 50%;
  float: left;
  text-align: center;
  height: 50px;
  line-height: 50px;
  color: #449dff;
  font-size: 16px;
}
nav {
  width: 100%;
  height: 48px;
  border-bottom: 0.5px solid #f2f2f2;
}
nav .back {
  position: absolute;
  width: 5%;
  margin-top: 14px;
  left: 4%;
}
nav button {
  width: 83.3333%;
  height: 30px;
  border-radius: 15px;
  background-color: #ecedf1;
  padding-left: 33px;
  line-height: 30px;
  border: 0;
  color: #919299;
  font-size: 13px;
  text-align: left;
  margin-top: 8px;
  margin-left: 12.667%;
  position: relative;
}
nav .search {
  position: absolute;
  width: 6%;
  top: 5px;
  left: 3%;
}
.current {
  border-bottom: 0.5px solid #f2f3f7;
  line-height: 54px;
  height: 54px;
  padding: 0 4%;
}
.current .cur {
  width: 5%;
  margin-right: 1%;
  display: inline-block;
  margin-bottom: -3px;
}
.current .city {
  color: #3b3c40;
  font-size: 16px;
  margin-right: 2%;
}
.current .msg {
  color: #abacb2;
  font-size: 12px;
}
.current .btn {
  color: #40a2f4;
  font-size: 14px;
  float: right;
  margin-top: 16px;
}

.hot {
  padding: 0 4%;
}
.hot h5 {
  color: #2e3033;
  font-size: 16px;
  margin-bottom: 20px;
  font-weight: bold;
  margin-top: 14px;
}
.hot span {
  width: 18.666%;
  height: 24px;
  background-color: #f2f4f7;
  text-align: center;
  line-height: 24px;
  display: inline-block;
  margin-right: 3.773%;
  color: #5e6166;
  font-size: 14px;
  margin-bottom: 15px;
}

.all {
  margin-top: 10px;
}
.all h4 {
  color: #2e3033;
  font-size: 16px;
  margin-bottom: 14px;
  margin-left: 4%;
}
.all .tit {
  width: 100%;
  height: 30px;
  background-color: #f2f4f7;
  line-height: 30px;
  padding-left: 6%;
  color: #2e3033;
  font-size: 18px;
}
.all ul {
  padding: 0 4%;
}
.all ul li {
  height: 47px;
  border-bottom: 0.5px solid #f2f3f7;
  color: #2e3033;
  font-size: 14px;
  line-height: 47px;
}

.right {
  position: fixed;
  right: 3%;
  top: 160px;
}
.right li {
  color: #919499;
  font-size: 10px;
  margin-bottom: 5px;
}
.right li a {
  text-decoration: none;
  color: #919499;
  font-size: 10px;
  margin-bottom: 5px;
  text-align: center;
}
</style>