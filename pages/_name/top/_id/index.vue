<template>
  <div class="Top">
    <header>
      <img src="~/assets/return.png" @click="returnPage" />
      <h3>楼盘榜TOP</h3>
    </header>
    <img src="~/assets/top.jpg" alt class="bg" />
    <nav id="nav-list">
      <ul>
        <li :class="active1" @click="t1s">
          刚需楼盘
          <i></i>
        </li>
        <li :class="active2" @click="t2s">
          投资地产
          <i></i>
        </li>
        <li :class="active3" @click="t3s">
          改善住宅
          <i></i>
        </li>
        <li :class="active4" @click="t4s">
          现房
          <i></i>
        </li>
      </ul>
    </nav>
    <!-- 楼盘列表 -->
    <div class="con" v-show="t1">
      <div class="con-list" v-for="(top,key) in top1s" :key="top.id">
        <router-link :to="'/'+jkl+'/content/'+top.id">
          <div class="con-list-top">
            <div class="list-top-left">
              <img :src="top.img" alt />
              <span>
                <i class="iconfont iconyanjing"></i>
                {{top.num}}
              </span>
            </div>
            <div class="list-top-right">
              <h5>
                <i>{{top.name}}</i>
                <span>{{top.status}}</span>
              </h5>
              <p class="price">
                <span>{{top.single_price}}</span>元/m²
              </p>
              <p class="area">
                <span>{{top.city}}-{{top.country}}</span>
                <span>建面</span>
                <span>
                  {{parseInt(top.area_min)}}
                  <span v-if="top.area_max">-</span>
                  {{parseInt(top.area_max)}}m²
                </span>
              </p>
              <p class="tabs">
                <strong>{{top.decorate}}</strong>
                <span v-if="top.railway">{{top.railway}}</span>
                <span>{{top.type}}</span>
              </p>
            </div>
          </div>
        </router-link>
        <div class="con-list-bottom">
          <div class="bang">
            <img src="~/assets/star.png" alt />
            刚需榜第{{key+1}}名
          </div>
          <button class="appointment" @click="show($event)" :data-v="top.id">预约看房</button>
          <a :href="'tel:'+call" class="tel">电话咨询</a>
        </div>
      </div>
    </div>
    <div class="con" v-show="t2">
      <div class="con-list" v-for="(top,key) in top2s" :key="top.id">
        <router-link :to="'/'+jkl+'/content/'+top.id">
          <div class="con-list-top">
            <div class="list-top-left">
              <img :src="top.img" alt />
              <span>
                <i class="iconfont iconyanjing"></i>
                {{top.num}}
              </span>
            </div>
            <div class="list-top-right">
              <h5>
                <i>{{top.name}}</i>
                <span>{{top.status}}</span>
              </h5>
              <p class="price">
                <span>{{top.single_price}}</span>元/m²
              </p>
              <p class="area">
                <span>{{top.city}}-{{top.country}}</span>
                <span>建面</span>
                <span>
                  {{parseInt(top.area_min)}}
                  <span v-if="top.area_max">-</span>
                  {{parseInt(top.area_max)}}m²
                </span>
              </p>
              <p class="tabs">
                <strong>{{top.decorate}}</strong>
                <span v-if="top.railway">{{top.railway}}</span>
                <span>{{top.type}}</span>
              </p>
            </div>
          </div>
        </router-link>
        <div class="con-list-bottom">
          <div class="bang">
            <img src="~/assets/star.png" alt />
            投资榜第{{key+1}}名
          </div>
          <button class="appointment" @click="show($event)" :data-v="top.id">预约看房</button>
          <a :href="'tel:'+call" class="tel">电话咨询</a>
        </div>
      </div>
    </div>
    <div class="con" v-show="t3">
      <div class="con-list" v-for="(top,key) in top3s" :key="top.id">
        <router-link :to="'/'+jkl+'/content/'+top.id">
          <div class="con-list-top">
            <div class="list-top-left">
              <img :src="top.img" alt />
              <span>
                <i class="iconfont iconyanjing"></i>
                {{top.num}}
              </span>
            </div>
            <div class="list-top-right">
              <h5>
                <i>{{top.name}}</i>
                <span>{{top.status}}</span>
              </h5>
              <p class="price">
                <span>{{top.single_price}}</span>元/m²
              </p>
              <p class="area">
                <span>{{top.city}}-{{top.country}}</span>
                <span>建面</span>
                <span>
                  {{parseInt(top.area_min)}}
                  <span v-if="top.area_max">-</span>
                  {{parseInt(top.area_max)}}m²
                </span>
              </p>
              <p class="tabs">
                <strong>{{top.decorate}}</strong>
                <span v-if="top.railway">{{top.railway}}</span>
                <span>{{top.type}}</span>
              </p>
            </div>
          </div>
        </router-link>
        <div class="con-list-bottom">
          <div class="bang">
            <img src="~/assets/star.png" alt />
            改善榜第{{key+1}}名
          </div>
          <button class="appointment" @click="show($event)" :data-v="top.id">预约看房</button>
          <a :href="'tel:'+call" class="tel">电话咨询</a>
        </div>
      </div>
    </div>
    <div class="con" v-show="t4">
      <div class="con-list" v-for="(top,key) in top4s" :key="top.id">
        <router-link :to="'/'+jkl+'/content/'+top.id">
          <div class="con-list-top">
            <div class="list-top-left">
              <img :src="top.img" alt />
              <span>
                <i class="iconfont iconyanjing"></i>
                {{top.num}}
              </span>
            </div>
            <div class="list-top-right">
              <h5>
                <i>{{top.name}}</i>
                <span>{{top.status}}</span>
              </h5>
              <p class="price">
                <span>{{top.single_price}}</span>元/m²
              </p>
              <p class="area">
                <span>{{top.city}}-{{top.country}}</span>
                <span>建面</span>
                <span>
                  {{parseInt(top.area_min)}}
                  <span v-if="top.area_max">-</span>
                  {{parseInt(top.area_max)}}m²
                </span>
              </p>
              <p class="tabs">
                <strong>{{top.decorate}}</strong>
                <span v-if="top.railway">{{top.railway}}</span>
                <span>{{top.type}}</span>
              </p>
            </div>
          </div>
        </router-link>
        <div class="con-list-bottom">
          <div class="bang">
            <img src="~/assets/star.png" alt />
            现房榜第{{key+1}}名
          </div>
          <button class="appointment" @click="show($event)" :data-v="top.id">预约看房</button>
          <a :href="'tel:'+call" class="tel">电话咨询</a>
        </div>
      </div>
    </div>
    <!-- 猜你喜欢 -->
    <div class="guess">
      <h4>猜你喜欢</h4>
      <div class="guess-con">
        <div class="re-list" v-for="(list ,index) in lists" :key="index">
          <router-link :to="'/'+jkl+'/content/'+list.id">
            <div class="re-con-left">
              <img :src="list.img" />
              <span>
                <i class="iconfont iconyanjing"></i>
                {{list.num}}
              </span>
            </div>
            <div class="re-con-right">
              <h5>
                {{list.name}}
                <span>{{list.status}}</span>
              </h5>
              <p class="price">
                <span>{{list.single_price}}</span>元/m²
              </p>
              <p class="area">
                <span>{{list.city}}-{{list.country}}</span>
                <span>建面</span>
                <span>
                  {{parseInt(list.area_min)}}
                  <span v-if="list.area_max">-</span>
                  {{parseInt(list.area_max)}}m²
                </span>
              </p>
              <p class="tabs">
                <span class="strong">{{list.decorate}}</span>
                <span v-if="list.railway">{{list.railway}}</span>
                <span>{{list.type}}</span>
              </p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <!-- 弹框 -->
    <transition name="change">
      <div class="weiter ts" v-show="change">
        <div class="t-top">
          <h6>预约看房</h6>
          <p>一键预约看房免费小车上门接送，可带家人一起参观多个热门楼盘</p>
          <img id="w-esc" src="~/assets/w-del.png" alt />
        </div>
        <div class="t-bottom">
          <div class="t-b-first">
            <input class="l-p" type="text" placeholder="输入预约手机号码" />
            <p class="w-mg">
              <input class="w-mg-c" type="checkbox" checked v-model="check" />我已阅读并同意
              <router-link :to="'/'+jkl+'/server'">
                <a href="javasript:;">《允家新房用户协议》</a>
              </router-link>
            </p>
            <p class="tishi">请勾选用户协议</p>
            <button class="t-b-btn t-b-btn2 bg_01" id="dingxue">立即订阅</button>
            <p class="w-tit">
              <img src="~/assets/w-call.png" />允家严格保障您的信息安全
            </p>
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
    </transition>

    <div class="m-chang"></div>

    <transition name="fade">
      <div class="m-o-succ" v-show="succ">
        <img class="o-esc" src="~/assets/m-esc.png" alt />
        <img src="~/assets/m-success.png" alt class="o-success" />
        <p id="o_p">已成功订阅最新动态，我们会第一时间通过短信通知您！</p>
        <button id="o_btn">确定</button>
      </div>
    </transition>
    <transition name="fade">
      <load-view v-if="load"></load-view>
    </transition>
  </div>
</template>

<script>
import { top_start, ip, msg, top_sure, verification } from "~/api/api";
import Loadings from "@/components/loading";
export default {
  name: "Top",
  components: {
    'load-view':Loadings
  },
  async asyncData (context) {
    let ip=context.store.state.cookie.ip;
    let city = context.store.state.cookie.city;
    let token=context.store.state.cookie.token;
     let kk = context.params.type;
     let jkl=context.store.state.cookie.pinyin;
    let [res]= await Promise.all([
      context.$axios.post('/api/first/feature_second_mobile',{ city: city, ip: ip, platform: 2, token: token })
      .then((resp)=>{
        let data = resp.data.data;
        data.t1=false
        data.t2=false
        data.t3=false
        data.t4=false
      if (kk == 1) {
        data.t1 = true;
        data.active1 = "active";
      } else if (kk == 2) {
        data.t2 = true;
        data.active2 = "active";
      } else if ((kk = 3)) {
        data.t3 = true;
        data.active3 = "active";
      } else {
        data.t4 = true;
        data.active4 = "active";
      }
         
          for (let item of data.rigid_demand) {
            if (item.railway) {
              item.railway = item.railway.split(",")[0];
            }
          }
          for (let item of data.invest) {
            if (item.railway) {
              item.railway = item.railway.split(",")[0];
            }
          }
          for (let item of data.improve) {
            if (item.railway) {
              item.railway = item.railway.split(",")[0];
            }
          }
          for (let item of data.existing) {
            if (item.railway) {
              item.railway = item.railway.split(",")[0];
            }
          }
          for (let item of data.likes) {
            if (item.railway) {
              item.railway = item.railway.split(",")[0];
            }
          }
          return data;
      })
    ])
    return{
          top1s : res.rigid_demand,
          top2s : res.invest,
          top3s : res.improve,
          top4s : res.existing,
          lists : res.likes,
          check:true,
          jkl:jkl
    }
  },
  data() {
    return {
      jkl:'',
      change: false,
      succ: false,
      defaultHeight: "0",
      nowHeight: "0",
      lists: [
        {
          name: "绿地华家池印",
          img: require("~/assets/lou1.png"),
          num: "32323",
          isshou: "在售",
          price: "32000",
          city: "杭州市",
          area: "萧山区",
          area_min: "62",
          areamax: "99",
          zhuangxiu: "精装",
          ditie: "地铁沿线",
          tese: "繁华地段"
        },
        {
          name: "绿地华家池印",
          img: require("~/assets/lou1.png"),
          num: "32323",
          isshou: "在售",
          price: "32000",
          city: "杭州市",
          area: "萧山区",
          area_min: "62",
          areamax: "99",
          zhuangxiu: "精装",
          ditie: "地铁沿线",
          tese: "繁华地段"
        },
        {
          name: "绿地华家池印",
          img: require("~/assets/lou1.png"),
          num: "32323",
          isshou: "在售",
          price: "32000",
          city: "杭州市",
          area: "萧山区",
          area_min: "62",
          areamax: "99",
          zhuangxiu: "精装",
          ditie: "地铁沿线",
          tese: "繁华地段"
        },
        {
          name: "绿地华家池印",
          img: require("~/assets/lou1.png"),
          num: "32323",
          isshou: "在售",
          price: "32000",
          city: "杭州市",
          area: "萧山区",
          area_min: "62",
          areamax: "99",
          zhuangxiu: "精装",
          ditie: "地铁沿线",
          tese: "繁华地段"
        }
      ],
      top1s: [
        {
          name: "杭州之翼",
          price: "35000",
          city: "杭州市",
          area: "西湖区",
          area_min: "35",
          area_max: "120",
          zhuangxiu: "精装",
          ditie: "地铁沿线",
          tese: "刚需楼盘",
          num: "35353",
          isshou: "在售",
          img: require("~/assets/lou1.png")
        },
        {
          name: "杭州之翼",
          price: "35000",
          city: "杭州市",
          area: "西湖区",
          area_min: "35",
          area_max: "120",
          zhuangxiu: "精装",
          ditie: "地铁沿线",
          tese: "刚需楼盘",
          num: "35353",
          isshou: "在售",
          img: require("~/assets/lou1.png")
        },
        {
          name: "杭州之翼",
          price: "35000",
          city: "杭州市",
          area: "西湖区",
          area_min: "35",
          area_max: "120",
          zhuangxiu: "精装",
          ditie: "地铁沿线",
          tese: "刚需楼盘",
          num: "35353",
          isshou: "在售",
          img: require("~/assets/lou1.png")
        },
        {
          name: "杭州之翼",
          price: "35000",
          city: "杭州市",
          area: "西湖区",
          area_min: "35",
          area_max: "120",
          zhuangxiu: "精装",
          ditie: "地铁沿线",
          tese: "刚需楼盘",
          num: "35353",
          isshou: "在售",
          img: require("~/assets/lou1.png")
        },
        {
          name: "杭州之翼",
          price: "35000",
          city: "杭州市",
          area: "西湖区",
          area_min: "35",
          area_max: "120",
          zhuangxiu: "精装",
          ditie: "地铁沿线",
          tese: "刚需楼盘",
          num: "35353",
          isshou: "在售",
          img: require("~/assets/lou1.png")
        }
      ],
      top2s: [
        {
          name: "杭州之翼",
          price: "35000",
          city: "杭州市",
          area: "西湖区",
          area_min: "35",
          area_max: "120",
          zhuangxiu: "精装",
          ditie: "地铁沿线",
          tese: "刚需楼盘",
          num: "35353",
          isshou: "在售",
          img: require("~/assets/lou1.png")
        },
        {
          name: "杭州之翼",
          price: "35000",
          city: "杭州市",
          area: "西湖区",
          area_min: "35",
          area_max: "120",
          zhuangxiu: "精装",
          ditie: "地铁沿线",
          tese: "刚需楼盘",
          num: "35353",
          isshou: "在售",
          img: require("~/assets/lou1.png")
        },
        {
          name: "杭州之翼",
          price: "35000",
          city: "杭州市",
          area: "西湖区",
          area_min: "35",
          area_max: "120",
          zhuangxiu: "精装",
          ditie: "地铁沿线",
          tese: "刚需楼盘",
          num: "35353",
          isshou: "在售",
          img: require("~/assets/lou1.png")
        },
        {
          name: "杭州之翼",
          price: "35000",
          city: "杭州市",
          area: "西湖区",
          area_min: "35",
          area_max: "120",
          zhuangxiu: "精装",
          ditie: "地铁沿线",
          tese: "刚需楼盘",
          num: "35353",
          isshou: "在售",
          img: require("~/assets/lou1.png")
        },
        {
          name: "杭州之翼",
          price: "35000",
          city: "杭州市",
          area: "西湖区",
          area_min: "35",
          area_max: "120",
          zhuangxiu: "精装",
          ditie: "地铁沿线",
          tese: "刚需楼盘",
          num: "35353",
          isshou: "在售",
          img: require("~/assets/lou1.png")
        }
      ],
      top3s: [
        {
          name: "杭州之翼",
          price: "35000",
          city: "杭州市",
          area: "西湖区",
          area_min: "35",
          area_max: "120",
          zhuangxiu: "精装",
          ditie: "地铁沿线",
          tese: "刚需楼盘",
          num: "35353",
          isshou: "在售",
          img: require("~/assets/lou1.png")
        },
        {
          name: "杭州之翼",
          price: "35000",
          city: "杭州市",
          area: "西湖区",
          area_min: "35",
          area_max: "120",
          zhuangxiu: "精装",
          ditie: "地铁沿线",
          tese: "刚需楼盘",
          num: "35353",
          isshou: "在售",
          img: require("~/assets/lou1.png")
        },
        {
          name: "杭州之翼",
          price: "35000",
          city: "杭州市",
          area: "西湖区",
          area_min: "35",
          area_max: "120",
          zhuangxiu: "精装",
          ditie: "地铁沿线",
          tese: "刚需楼盘",
          num: "35353",
          isshou: "在售",
          img: require("~/assets/lou1.png")
        },
        {
          name: "杭州之翼",
          price: "35000",
          city: "杭州市",
          area: "西湖区",
          area_min: "35",
          area_max: "120",
          zhuangxiu: "精装",
          ditie: "地铁沿线",
          tese: "刚需楼盘",
          num: "35353",
          isshou: "在售",
          img: require("~/assets/lou1.png")
        },
        {
          name: "杭州之翼",
          price: "35000",
          city: "杭州市",
          area: "西湖区",
          area_min: "35",
          area_max: "120",
          zhuangxiu: "精装",
          ditie: "地铁沿线",
          tese: "刚需楼盘",
          num: "35353",
          isshou: "在售",
          img: require("~/assets/lou1.png")
        }
      ],
      top4s: [
        {
          name: "杭州之翼",
          price: "35000",
          city: "杭州市",
          area: "西湖区",
          area_min: "35",
          area_max: "120",
          zhuangxiu: "精装",
          ditie: "地铁沿线",
          tese: "刚需楼盘",
          num: "35353",
          isshou: "在售",
          img: require("~/assets/lou1.png")
        },
        {
          name: "杭州之翼",
          price: "35000",
          city: "杭州市",
          area: "西湖区",
          area_min: "35",
          area_max: "120",
          zhuangxiu: "精装",
          ditie: "地铁沿线",
          tese: "刚需楼盘",
          num: "35353",
          isshou: "在售",
          img: require("~/assets/lou1.png")
        },
        {
          name: "杭州之翼",
          price: "35000",
          city: "杭州市",
          area: "西湖区",
          area_min: "35",
          area_max: "120",
          zhuangxiu: "精装",
          ditie: "地铁沿线",
          tese: "刚需楼盘",
          num: "35353",
          isshou: "在售",
          img: require("~/assets/lou1.png")
        },
        {
          name: "杭州之翼",
          price: "35000",
          city: "杭州市",
          area: "西湖区",
          area_min: "35",
          area_max: "120",
          zhuangxiu: "精装",
          ditie: "地铁沿线",
          tese: "刚需楼盘",
          num: "35353",
          isshou: "在售",
          img: require("~/assets/lou1.png")
        },
        {
          name: "杭州之翼",
          price: "35000",
          city: "杭州市",
          area: "西湖区",
          area_min: "35",
          area_max: "120",
          zhuangxiu: "精装",
          ditie: "地铁沿线",
          tese: "刚需楼盘",
          num: "35353",
          isshou: "在售",
          img: require("~/assets/lou1.png")
        }
      ],
      t1: false,
      t2: false,
      t3: false,
      t4: false,
      ip: "",
      id: "",
      phone: "",
      call: "",
      n: "",
      active1: "",
      active2: "",
      active3: "",
      active4: "",
      load: true
    };
  },
  methods: {
    returnPage() {
      // 跳转上一级
      // 这个判断用来解决这种情况，当用户没有上一条路由的历史记录，出现点击返回按钮没有反应时，下面的代码用来判断有没有上一条路由的历史记录   如果没有则返回首页
      if (window.history.length <= 1) {
        this.$router.push({ path: "/" });
        return false;
      } else {
        this.$router.go(-1);
      }
    },
    t1s: function() {
      this.t1 = true;
      this.t2 = false;
      this.t3 = false;
      this.t4 = false;
    },
    t2s: function() {
      this.t1 = false;
      this.t2 = true;
      this.t3 = false;
      this.t4 = false;
    },
    t3s: function() {
      this.t1 = false;
      this.t2 = false;
      this.t3 = true;
      this.t4 = false;
    },
    t4s: function() {
      this.t1 = false;
      this.t2 = false;
      this.t3 = false;
      this.t4 = true;
    },
    getip() {
      ip()
        .then(resp => {
          this.ip = resp.data.data[0].origip;
        })
        .catch(error => {
          console.log(error);
        });
    },
    start_data() {
      let kk = this.$route.params.type;
      if (kk == 1) {
        this.t1 = true;
        this.active1 = "active";
      } else if (kk == 2) {
        this.t2 = true;
        this.active2 = "active";
      } else if ((kk = 3)) {
        this.t3 = true;
        this.active3 = "active";
      } else {
        this.t4 = true;
        this.active4 = "active";
      }
      this.n = this.$route.params.name;
      let city = localStorage.getItem("city");
      this.call = localStorage.getItem("call");
      if (!city) {
        city = 1;
        localStorage.setItem("city", 1);
      }
      let that = this;
      let ip = returnCitySN["cip"];
      this.ip = ip;
      localStorage.getItem("ip");
      let token = localStorage.getItem("token");
      let data = { city: city, ip: ip, platform: 2, token: token };
      top_start(data)
        .then(resp => {
          that.load = false;
          
        })
        .catch(error => {
          console.log(error);
        });
    },
    show(e) {
      this.change = true;
      $(".m-chang").show();
      // $(".weiter").show();
      this.id = e.target.getAttribute("data-v");
    },
    getmsg(tel) {
      let data = { phone: tel, channel: 2 };
      this.phone = tel;

      let id = this.id;
      let ip = this.ip;
      let city = localStorage.getItem("city");
      let token = localStorage.getItem("token");
      let kid = sessionStorage.getItem("kid");
      let other = sessionStorage.getItem("other");
      let dd = {
        tel: tel,
        type: 8,
        project: id,
        ip: ip,
        city: city,
        page: 2,
        position: 8,
        token: token,
        kid: kid,
        other: other
      };
      msg(data)
        .then(resp => {
          let code = resp.data.code;
          if (code == 200) {
            top_sure(dd)
              .then(resp => {})
              .catch(error => {
                console.log(error);
              });
            $(".t-b-first").hide();
            $(".t-b-second").show();
            var time = 60;
            var phone = tel.substr(0, 3) + "****" + tel.substr(7, 11);
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
            $("#ytel").html(phone);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    yan(code) {
      let tel = this.phone;
      let that = this;
      verification({ phone: tel, code: code, channel: 2 })
        .then(resp => {
          if (resp.data.code == 200) {
            that.change = false;
            that.succ = true;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleScroll() {
      let Y = window.scrollY;
      if (Y <= 165) {
        $("#nav-list").css({ position: "absolute", top: "164px" });
      } else {
        $("#nav-list").css({ position: "fixed", top: "0" });
      }
    }
  },
  mounted() {
    this.getip();
    this.start_data();
    let that = this;
    $("nav ul li").on("click", function() {
      $(this)
        .addClass("active")
        .siblings("li")
        .removeClass("active");
    });
    $("#w-esc").on("click", function() {
      $(".m-chang").hide();
      that.change = false;
    });
    $(".m-chang").on("click", function() {
      $(".m-chang").hide();
      that.change = false;
      that.succ = false;
    });
    // 接口验证码
    $(".t-b-btn2").on("click", function() {
      let check = that.check;
      if (!check) {
        $(".tishi").show();
        return;
      } else {
        $(".tishi").hide();
      }
      var phone = $(this)
        .prev()
        .prev()
        .prev()
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

      that.getmsg(phone);
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
      that.yan(ma);
    });

    $(".o-esc").on("click", function() {
      $(".m-chang").hide();
      that.succ = false;
    });
    $("#o_btn").on("click", function() {
      $(".m-chang").hide();
      that.succ = false;
    });
    $(".l-p").on("focus", function() {
      $(".weiter").css("top", "100px");
    });
    $(".l-p").on("blur", function() {
      $(".weiter").css("top", "220px");
    });
    //获取默认高度
    this.defaultHeight = $(window).height();
    window.onresize = () => {
      return (() => {
        this.nowHeight = $(window).height();
      })();
    };
    // 滚动高度
    window.addEventListener("scroll", this.handleScroll);
  },
  watch: {
    nowHeight: function() {
      if (this.defaultHeight != this.nowHeight) {
        $(".weiter").css("top", "100px");
        $("#nav-list").css("top", "42%");
      } else {
        $(".weiter").css("top", "220px");
        $("#nav-list").css("top", "21%");
      }
    }
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
header {
  width: 100%;
  height: 44px;
  position: relative;
  text-align: center;
  line-height: 44px;
  border-bottom: 0.5px solid #f2f2f2;
}
header img {
  position: absolute;
  width: 5%;
  margin-top: 14px;
  left: 5.333%;
}
header h3 {
  color: #333333;
  font-size: 18px;
  margin: 0;
  font-weight: bold;
  line-height: 44px;
}
.bg {
  width: 100%;
}

.tishi {
  color: red;
  font-size: 10px;
  display: none;
}

/* banner */
nav {
  width: 100%;
  position: absolute;
  top: 164px;
  height: 40px;
  background-color: #fff;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.05);
  z-index: 10;
}
nav ul {
  padding-left: 5.797%;
}
nav ul li {
  float: left;
  color: #919499;
  font-size: 16px;
  line-height: 40px;
  margin-right: 9%;
  position: relative;
}
nav ul li.active {
  color: #2e3033;
  font-weight: bold;
}
nav ul li:last-child {
  margin: 0;
}
nav ul li i {
  display: none;
  width: 20px;
  height: 2px;
  background-color: #00a0e9;
  position: absolute;
  left: 50%;
  margin-left: -10px;
  bottom: 4px;
}
nav ul li.active i {
  display: block;
}

/* 榜单列表 */
.con {
  padding-top: 14%;
  padding-left: 4%;
  padding-right: 4%;
}
.con .con-list {
  width: 100%;
  height: 146px;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  margin-bottom: 20px;
  padding-top: 16px;
}
.con .con-list .con-list-top {
  margin-bottom: 2px;
  margin-left: 4.3478%;
}
.con .con-list .con-list-top .list-top-left {
  position: relative;
  margin-right: 14px;
  width: 33.333%;
  height: 90px;
  float: left;
}
.con .con-list .con-list-top .list-top-left img {
  width: 100%;
  height: 90px;
  border-radius: 4px;
}
.con .con-list .con-list-top .list-top-left span {
  display: block;
  color: #ffffff;
  font-size: 10px;
  position: absolute;
  right: 3%;
  bottom: 2%;
}
.con .con-list .con-list-top .list-top-left span i {
  font-size: 10px;
  margin-right: 2px;
}

.con .con-list .con-list-top .list-top-right {
  display: inline-block;
  width:60%;
}
.con .con-list .con-list-top .list-top-right h5 {
  color: #333333;
  font-size: 17px;
  margin-bottom: 4px;
}
.con .con-list .con-list-top .list-top-right h5 i{
  font-style: normal;
  display: inline-block;
  width: 80%;
  height: 18px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.con .con-list .con-list-top .list-top-right h5 span {
  background-color: #e9f7ea;
  border-radius: 2px;
  float: right;
  padding: 3px 7px;
  background-color: #e9f7ea;
  color: #2cd264;
  font-size: 11px;
  font-weight: 500;
}
.con .con-list .con-list-top .list-top-right .price {
  color: #fe582f;
  font-size: 12px;
}
.con .con-list .con-list-top .list-top-right .price span {
  font-size: 18px;
}
.con .con-list .con-list-top .list-top-right .area {
  margin-bottom: 4px;
}
.con .con-list .con-list-top .list-top-right .area span {
  color: #919499;
  font-size: 12px;
}
.con .con-list .con-list-top .list-top-right .tabs strong {
  font-weight: 500;
  padding: 3px 7px;
  background-color: #ebf5fc;
  color: #4db5ff;
  font-size: 11px;
  margin-right: 6px;
  float: left;
  width: 38px;
  height: 21px;
  overflow: hidden;
}
.con .con-list .con-list-top .list-top-right .tabs span {
  color: #919499;
  font-size: 11px;
  padding: 3px 7px;
  background-color: #f7f8fa;
  margin-right: 6px;
  display: inline-block;
  max-width: 80px;
  height: 22px;
  overflow: hidden;
}
.con .con-list .con-list-bottom .bang {
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
.con .con-list .con-list-bottom .bang img {
  width: 15px;
  margin-left: 2%;
  margin-top: -7px;
  position: relative;
  top: 11%;
}
.con .con-list .con-list-bottom .appointment {
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
.con .con-list .con-list-bottom .tel {
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

/* 猜你喜欢 */
.guess {
  padding: 0 4%;
  padding-bottom: 33px;
}
.guess h4 {
  color: #2e3033;
  font-size: 17px;
  /* margin-bottom: 25px; */
}
.re-list {
  padding: 16px 0;
  border-bottom: 0.5px solid #f2f4f7;
}
.re-list::after {
  content: "";
  clear: both;
  height: 0;
  overflow: hidden;
  display: block;
  visibility: hidden;
}
.re-list .re-con-left {
  margin-right: 14px;
  position: relative;
  width: 30.667%;
  height: 84px;
  border-radius: 5px;
  float: left;
}
.re-list .re-con-left img {
  width: 100%;
  height: 84px;
  border-radius: 5px;
}
.re-list .re-con-left span {
  position: absolute;
  right: 3%;
  bottom: 1%;
  font-size: 10px;
  color: #ffffff;
}
.re-list .re-con-right {
  float: left;
  width: 60%;
  position: relative;
  top: 1px;
}
.re-list .re-con-right h5 {
  color: #2e3033;
  font-size: 17px;
  margin-bottom: 2px;
}
.re-list .re-con-right h5 span {
  width: 36px;
  height: 17px;
  border-radius: 2px;
  text-align: center;
  line-height: 17px;
  float: right;
  background-color: #e9f7ea;
  color: #2cd264;
  display: block;
  font-weight: 500;
  font-size: 11px;
}
.re-list .re-con-right .price {
  color: #fe582f;
  font-size: 12px;
  margin-bottom: 2px;
}
.re-list .re-con-right .price span {
  font-size: 18px;
}
.re-list .re-con-right .area {
  color: #919499;
  font-size: 12px;
  margin-bottom: 2px;
}
.re-list .re-con-right .area span {
  margin-right: 2%;
}
.re-list .re-con-right .tabs .strong {
  font-weight: 500;
  padding: 3px 7px;
  background-color: #ebf5fc;
  margin-right: 6px;
  color: #4db5ff;
  font-size: 11px;
}
.re-list .re-con-right .tabs span {
  padding: 3px 5px;
  background-color: #f7f8fa;
  color: #919499;
  font-size: 11px;
  margin-right: 6px;
  border-radius: 2px;
}
.weiter {
  /* display: none; */
  width: 80%;
  position: fixed;
  left: 10%;
  top: 220px;
  border-radius: 12px;
  z-index: 1001;
}

.weiter .t-top {
  width: 100%;
  height: 100px;
  background-color: #fff;
  border-radius: 12px 12px 0 0;
  padding-top: 30px;
}

.weiter .t-top h6 {
  color: #3a3c49;
  font-size: 20px;
  text-align: center;
  margin-bottom: 14px;
  font-weight: bold;
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
  width: 16px;
}

.weiter .t-bottom {
  width: 100%;
  height: 228px;
  background-color: #fff;
  border-radius: 0 0 12px 12px;
}

.weiter .t-bottom .t-b-first {
  height: 100%;
  display: block;
}
.weiter .t-bottom .t-b-first .w-tit {
  color: #a8a8ab;
  font-size: 12px;
  padding-left: 7%;
  padding-top: 8px;
}
.weiter .t-bottom .t-b-first .w-tit img {
  width: 5%;
  margin-right: 2%;
  margin-bottom: 2px;
}

.weiter .t-bottom .t-b-first .w-mg {
  font-size: 11px;
}
.weiter .t-bottom .t-b-first .w-mg a {
  color: #498de1;
}

.weiter .t-bottom .t-b-first input {
  width: 85%;
  height: 44px;
  border: 1px solid #c6c6cc;
  margin-top: 38px;
  margin-bottom: 5.5px;
  margin-left: 7.52%;
  padding-left: 5%;
  font-size: 15px;
  border-radius: 6px;
}

.weiter .t-bottom .t-b-first .w-mg-c {
  width: 10px;
  height: 10px;
  margin: 0;
  margin-left: 7.5%;
  margin-bottom: 29px;
  background-color: #fff;
  border: 1px solid #c9c9c9;
  border-radius: 2px;
  -webkit-appearance: none;
  display: inline-block;
  padding: 0;
  float: left;
  margin-top: 3px;
  margin-right: 4px;
}

.weiter .t-bottom .t-b-first .w-mg-c:checked {
  background: url(~assets/checkbox_icon.png) no-repeat center;
  background-size: 90%;
}

.weiter .t-bottom .t-b-first button {
  width: 85%;
  height: 44px;
  border: 0;
  border-radius: 6px;
  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
  margin-left: 7.5%;
  box-shadow: 0px 2.5px 6px 0px rgba(78, 169, 255, 0.3);
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
  margin-top: 20px;
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
  border: 1px solid #c6c6cc;
  margin-left: 7.5%;
  margin-bottom: 20px;
  padding-left: 4%;
  border-radius: 6px;
}

.weiter .t-bottom .t-b-second .port1 {
  width: 85%;
  height: 44px;
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
  border-radius: 6px;
  margin-top: 20px;
}

.weiter .t-bottom .t-b-second .t-b-scode {
  border: 0;
  color: #40a2f4;
  font-size: 13px;
  position: absolute;
  right: 10%;
  top: 55%;
  background-color: #fff;
}

.m-chang {
  display: none;
}

.m-o-succ {
  /* display: none; */
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
