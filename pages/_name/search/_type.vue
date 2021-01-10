<template>
  <div class="Search">
    <nav>
      <img class="back" src="~/assets/return.png" @click="goback" />
      <p class="s-btn" id="sou">
        <span class="s-b-city">{{cityname}}</span>
        <img class="bom" src="~/assets/triangle.png" alt />
        <span class="btn">
          <img src="~/assets/search.png" alt />请输入楼盘名称
        </span>
      </p>
      <p class="dian">
        <router-link :to="'/'+jkl+'/map'">
          <img src="~/assets/dian.png" alt />
          <span>地图</span>
        </router-link>
      </p>
    </nav>
    <img class="imgbox" :src="banner.img" alt="" @click="gohome" v-if="banner.length!=0">
    <div class="top">
      <div class="m-menu visible-xs-block .visible-sm--block">
        <ul>
          <li class="m-u">
            <span :class="area1==1?'kk':''">区域</span>
            <img src="~/assets/triangle.png" alt />
          </li>
          <li class="m-a">
            <span :class="price1==1?'kk':''">价格</span>
            <img src="~/assets/triangle.png" alt />
          </li>
          <li class="m-h">
            <span :class="type1==1?'kk':''">户型</span>
            <img src="~/assets/triangle.png" alt />
          </li>
          <li class="m-n">
            <span :class="shai1==1?'kk':''">筛选</span>
            <img src="~/assets/triangle.png" alt />
          </li>
        </ul>
        <img class="m-sort" src="~/assets/sort_icon.png.png" alt />
      </div>
      <div class="m-me">
        <div class="m-qu row">
          <div class="m-one m-thre col-xs-4 col-sm-4">
            <ul>
              <li class="m-r-active">城区</li>
              <li>地铁</li>
            </ul>
          </div>
          <div class="m-two col-xs-8 col-sm-8" @click="a1">
            <ul id="qu">
              <li :class="num6==0?'m-l-active':''" data-v="0" @click="qu($event)">不限</li>
              <li
                :class="num6==(city.id)?'m-l-active':''"
                v-for="city in citys"
                :key="city.id"
                @click="qu($event)"
                :data-v="city.id"
              >{{city.name}}</li>
            </ul>
            <ul id="tie">
              <li :class="num7==0?'m-l-active':''" data-v="0" @click="tie($event)">不限</li>
              <li
                :class="num7==(di.id)?'m-l-active':''"
                v-for="di in dities"
                :key="di.id"
                @click="tie($event)"
                :data-v="di.id"
              >{{di.name}}</li>
            </ul>
          </div>
        </div>
        <div class="m-jia row">
          <div class="m-one m-thre col-xs-4 col-sm-4">
            <ul>
              <li class="m-r-active">总价</li>
              <li>单价</li>
            </ul>
          </div>
          <div class="m-two col-xs-8 col-sm-8" @click="p1">
            <ul id="zong">
              <li :class="num4==0?'m-l-active':''" data-v="0" @click="zong($event)">不限</li>
              <li
                :class="num4==(price.id)?'m-l-active':''"
                v-for="price in total_prices"
                :key="price.id"
                @click="zong($event)"
                :data-v="price.id"
              >{{price.name}}</li>
            </ul>
            <ul id="dan">
              <li :class="num5==0?'m-l-active':''" data-v="0" @click="dan($event)">不限</li>
              <li
                :class="num5==(price.id)?'m-l-active':''"
                v-for="price in single_prices"
                :key="price.id"
                @click="dan($event)"
                :data-v="price.id"
              >{{price.name}}</li>
            </ul>
          </div>
        </div>
        <div class="m-hu row">
          <div class="m-one">
            <ul @click="t1">
              <form
                id="hu"
                class="col-xs-12 col-sm-12"
                onsubmit="return false"
                action="##"
                method="POST"
              >
                <li v-for="hu in apartments" :key="hu.id" class="col-xs-12 col-sm-12">
                  <span>{{hu.name}}</span>
                  <input type="checkbox" name="hu" hidden />
                  <input type="checkbox" name v-model="hus" :value="hu.id" />
                </li>
              </form>
            </ul>
            <div class="m-h-btn">
              <span class="m-h-l" @click="clear1">清空</span>
              <span class="m-h-r" @click="hu">确定</span>
            </div>
          </div>
        </div>
        <div class="m-shan row">
          <h4>类型</h4>
          <div class="m-one m-thre" id="m-xing" @click="s1">
            <span
              :class="num3==key?'m-now':''"
              v-for="(type,key) in build_types"
              :key="key"
              @click="tp($event)"
              :data-v="key"
            >{{type.type}}</span>
          </div>
          <!-- <h4>开发商</h4>
          <div class="m-one m-two" id="m-shang" @click="s1">
            <span>万科</span>
            <span>绿城</span>
            <span>龙湖</span>
            <span>绿城</span>
          </div>-->
          <h4>特色</h4>
          <div class="m-one m-thre m-thr" id="m-te" @click="s1">
            <span
              :class="num2==(te.id)?'m-now':''"
              v-for="te in features"
              :data-v="te.id"
              :key="te.id"
              @click="se($event)"
            >{{te.name}}</span>
          </div>
          <div class="m-s-btn">
            <span class="m-h-l" @click="clear2">清空</span>
            <span class="m-h-r" @click="shai">确定</span>
          </div>
        </div>
        <div class="m-pai row">
          <ul>
            <li class="m-act" data-v="0" @click="pai($event)">默认排序</li>
            <li data-v="2" @click="pai($event)">单价从低到高</li>
            <li data-v="1" @click="pai($event)">单价从高到低</li>
            <li data-v="4" @click="pai($event)">开盘时间从近到远</li>
            <li data-v="5" @click="pai($event)">开盘时间从远到近</li>
            <li data-v="3" @click="pai($event)">按浏览量倒序</li>
          </ul>
        </div>
        <div class="m-box"></div>
      </div>
    </div>
    <div class="recommen" v-show="r">
      <div class="re-con">
        <div class="re-list" v-for="(b,key) in buildings" :key="key">
          <router-link :to="'/'+jkl+'/content/'+b.id">
            <div class="re-con-left">
              <img :src="b.img" alt />
              <span>
                <i class="iconfont iconyanjing"></i>
                {{b.num}}
              </span>
            </div>
            <div class="re-con-right">
              <h5>
                <strong>{{b.name}}</strong>
                <span class="ishou"  v-if="b.status == '在售'">{{b.status}}</span>
                <span class="isdai"  v-if="b.status == '待售'">{{b.status}}</span>
                <span class="iskong" v-if="b.status == '售空'">{{b.status}}</span>
              </h5>
              <p class="price">
                <span>{{b.single_price}}</span>元/m²
              </p>
              <p class="area">
                <span>{{b.city}}-{{b.country}}</span>
                <span>建面</span>
                <span>
                  {{parseInt(b.area_min)}}
                  <span v-if="b.area_max">-</span>
                  {{parseInt(b.area_max)}}m²
                </span>
              </p>
              <p class="tabs">
                <span class="strong">{{b.decorate}}</span>
                <span v-if="b.railway">{{b.railway}}</span>
                <span>{{b.type}}</span>
              </p>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <div class="nothing" v-show="n">
      <img src="~/assets/Group.png" alt />
      <p>还没有收录该楼盘，快去看看其它楼盘吧~</p>
      <button>去收藏</button>
    </div>
    <foot-view :pinyin="jkl"></foot-view>
    <transition name="fade">
      <load v-if="isload"></load>
      <div class="loadings" v-if="kk">
        <img src="~/assets/search-loading.gif" alt />
        加载中~.
      </div>
    </transition>
  </div>
</template>
<script>
import { search_start, search_search, ip } from "~/api/api";
import Loading from "@/components/loading";
import footView from "@/components/Foot.vue";
export default {
  name: "Search",
  components: {
    load: Loading,
    "foot-view": footView
  },
  async asyncData(context) {
    // console.log(context.route.path.split('/')[3].split('_')[0])
    // console.log(context.route.path.split('/').length)
    let ip = context.store.state.cookie.ip;
    // let city = context.store.state.cookie.city;
    let city = context.store.state.city;
    console.log(city)
    let token = context.store.state.cookie.token;
    let jkl = context.params.name;
    // if(jkl == 'chongqing'){
    //   city = 41
    // }
    let kid = context.store.state.cookie.kid ? context.store.state.cookie.kid : ''
    let other = context.store.state.cookie.other ? context.store.state.cookie.other : ''
    let options = { city: city, token: token, ip: ip, platform: 2,kid:kid,other:other };
    let area1 = 0;
    let price1 = 0;
    let type1 = 0;
    let shai1 = 0;
    let num6 = 0;
    let num7 = 0;
    let num4 = 0;
    let num5 = 0;
    let num3 = 100;
    let num2 = 0;
    let hus = [];
    if (context.route.path.split("/").length == 4) {
      let arr = context.route.path.split("/")[3].split("+");
      for (let val of arr) {
        let ll = val.split("-");
        switch (ll[0]) {
          case "country":
            area1 = 1;
            num6 = ll[1];
            break;
          case "railway":
            area1 = 1;
            num7 = ll[1];
            break;
          case "totalprice":
            price1 = 1;
            num4 = ll[1];
            break;
          case "single_price":
            price1 = 1;
            num5 = ll[1];
            break;
          case "apartment":
            type1 = 1;
            hus = ll[1].split(",");
            break;
          case "build_type":
            shai1 = 1;
            if(ll[1]=='公寓'){
              num3 = 0;
            }else if(ll[1]=='写字楼'){
              num3 = 3;
            }else if(ll[1]=='住宅'){
              num3 = 1;
            }else if(ll[1]=='商铺'){
              num3 = 2;
            }  
            break;
          case "feature":
            shai1 = 1;
            num2 = ll[1];
            break;
        }
        options[ll[0]] = ll[1];
      }
    }
    
    let [res1, res2] = await Promise.all([
      context.$axios.post("/api/project/search_info", options).then(resp => {
        let dd=resp.data.data;
        let data = resp.data.data.datas;
        for (let item of data) {
          if (item.railway) {
            item.railway = item.railway.split(",")[0];
          }
        }
        return dd;
      }),
      context.$axios
        .post("/api/project/search", {
          city: city,
          platform: 2,
          ip: ip,
          token: token,
          kid:kid,
          other:other
        })
        .then(resp => {
          let data = resp.data.data;
          return data;
        })
    ]);
    return {
      citys: res2.conditions.cities,
      dities: res2.conditions.railways,
      single_prices: res2.conditions.single_prices,
      total_prices: res2.conditions.total_prices,
      apartments: res2.conditions.apartments,
      build_types: res2.conditions.build_types,
      features: res2.conditions.features,
      buildings: res1.datas,
      jkl: jkl,
      area1: area1,
      price1: price1,
      type1: type1,
      shai1: shai1,
      num6: num6,
      num7: num7,
      num4: num4,
      num5: num5,
      num3: num3,
      num2: num2,
      hus: hus,
      city:city,
      title:res1.title,
      keywords:res1.keywords,
      description:res1.description,
      banner: res2.banner
    };
  },
  data() {
    return {
      jkl: "",
      kk: false,
      loading: false,
      isload: true,
      buildings: [],
      r: true,
      n: false,
      citys: [],
      dities: [],
      single_prices: [],
      total_prices: [],
      apartments: [],
      build_types: [],
      features: [],
      hus: [],
      type: "",
      te: "",
      order: "",
      num3: "",
      num2: "",
      num4: "",
      num5: "",
      num6: "",
      num7: "",
      ip: "",
      p: "",
      nn: "",
      page: 2,
      area1: 0,
      price1: 0,
      type1: 0,
      shai1: 0,
      loaded: true,
      ting: true,
      cityname: "",
      test: {
        q: 5,
        t: 45,
        h: 8
      },
      city:'',
      title:'',
      keywords:'',
      description:''
    };
  },
  head() {
    return {
      title: this.title || "允家新房",
      meta:[
        {
          name: "description",
          content: this.description
        },
        {
          name: "keywords",
          content: this.keywords
        }
      ]
    };
  },
  computed: {
    count() {
      return this.$store.getters.getcount;
    }
  },
  methods: {
    gohome() {
      if(this.banner.url) {
        window.location.href=this.banner.url
      }
    },
    start_data() {
      this.nn = this.$route.params.name;
      this.kk = false;
      localStorage.setItem('city',this.city)
      
      let ip = ip_arr["ip"];
          // let ip = returnCitySN["cip"];
      this.ip = ip;
      this.loading = true;
      this.isload = false;
      let type = $cookies.get("type");
      if (!type) {
        type = {};
        $cookies.set("type", type);
      }
      let url = this.$route.path;
      if (url.split("/").length == 4) {
        let arr = url.split("/")[3].split("+");
        for (let val of arr) {
          let ll = val.split("-");
          type[ll[0]] = ll[1];
        }
      }
      $cookies.set("type", type);
    },
    search_datas() {
      this.kk = false;
      let city = localStorage.getItem("city");
      if (!city) {
        city = 1;
        localStorage.setItem("city", 1);
      }
      let ip = ip_arr["ip"];
          // let ip = returnCitySN["cip"];
      this.ip = ip;
      localStorage.getItem("ip");
      let token = localStorage.getItem("token");
      let t = sessionStorage.getItem("feature");
      let where = { city: city, platform: 2, ip: ip, token: token };
      $cookies.set("where", where, "5min");
      $cookies.set("ip", ip);
    },
    search_data() {
      let city = localStorage.getItem("city");
      if (!city) {
        city = 1;
        localStorage.setItem("city", 1);
      }

      let where = $cookies.get("where");
      let ip = ip_arr["ip"];
          // let ip = returnCitySN["cip"];
      this.ip = ip;
      localStorage.getItem("ip");
      let token = localStorage.getItem("token");
      let t = sessionStorage.getItem("feature");
      if (!where) {
        if (t) {
          where = {
            city: city,
            platform: 2,
            ip: ip,
            token: token,
            feature: t
          };
        } else {
          where = { city: city, platform: 2, ip: ip, token: token };
        }

        $cookies.set("where", where, "5min");
      }
      search_search(where)
        .then(resp => {
          let data = resp.data.data.datas;
          this.buildings = data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    qu(e) {
      let id = e.target.getAttribute("data-v");
      let where = $cookies.get("where");
      if (id == 0) {
        delete where.country;
      } else {
        where.country = id;
      }

      $cookies.set("where", where, 0);
      this.num6 = id;
      $(".quyu").removeClass("m-l-active");
      window.scrollTo(0, 0);
      // this.search_data();
      $(".m-qu").slideUp("fast");
      $(".m-box").hide();
      $(".m-u").removeClass("m-as");
      this.tostring("country", id);
    },
    tie(e) {
      let id = e.target.getAttribute("data-v");
      let where = $cookies.get("where");
      if (id == 0) {
        delete where.railway;
      } else {
        where.railway = id;
      }
      $cookies.set("where", where, 0);
      window.scrollTo(0, 0);
      // this.search_data();
      this.num7 = id;
      $(".ditie").removeClass("m-l-active");
      $(".m-qu").slideUp("fast");
      $(".m-u").removeClass("m-as");
      $(".m-box").hide();
      this.tostring("railway", id);
    },
    zong(e) {
      let id = e.target.getAttribute("data-v");
      let where = $cookies.get("where");
      if (id == 0) {
        delete where.totalprice;
      } else {
        where.totalprice = id;
      }
      $cookies.set("where", where, 0);
      window.scrollTo(0, 0);
      // this.search_data();
      this.num4 = id;
      $(".zongjia").removeClass("m-l-active");
      $(".m-jia").slideUp("fast");
      $(".m-a").removeClass("m-as");
      $(".m-box").hide();
      this.tostring("totalprice", id);
    },
    dan(e) {
      let id = e.target.getAttribute("data-v");
      let where = $cookies.get("where");
      if (id != 0) {
        where.single_price = id;
      } else {
        delete where.single_price;
      }
      $cookies.set("where", where, 0);
      window.scrollTo(0, 0);
      this.search_data();
      this.num5 = id;
      $(".danjia").removeClass("m-l-active");
      $(".m-jia").slideUp("fast");
      $(".m-a").removeClass("m-as");
      $(".m-box").hide();
      this.tostring("single_price", id);
    },
    hu() {
      let id = this.hus;
      id = id.join(",");
      let where = $cookies.get("where");
      where.apartment = id;
      $cookies.set("where", where, 0);
      window.scrollTo(0, 0);
      // this.search_data();
      this.tostring("apartment", id);
    },
    tp(e) {
      let id = e.target.innerHTML;
      let key = e.target.getAttribute("data-v");
      this.num3 = key;
      this.type = id;
      $(".lei").removeClass("m-now");
    },
    se(e) {
      let id = e.target.getAttribute("data-v");
      this.te = id;
      this.num2 = id;
    },
    shai() {
      let type = $cookies.get("type");
      let where = $cookies.get("where");
      if (this.te) {
        where.feature = this.te;
        type.feature = this.te;
      }
      if (this.type) {
        where.build_type = this.type;
        type.build_type = this.type;
      }
      $cookies.set("where", where, 0);
      $cookies.set("type", type, 0);
      window.scrollTo(0, 0);
      // this.search_data();
      let url = this.$route.path;
      let str = "";
      for (let key in type) {
        str += key + "-" + type[key] + "+";
      }
      str = str.substring(0, str.length - 1);
      let arr = url.split("/");
      arr[3] = str;
      url = arr.join("/");
      this.$router.push(url);
    },
    getmore() {
      if (this.loaded) {
        this.loaded = false;
        this.kk = true;
        let that = this;
        let where = $cookies.get("where");
        where.page = this.page;
        search_search(where)
          .then(resp => {
            that.kk = false;
            that.loaded = true;
            let data = resp.data.data.datas;
            if (data.length == 0) {
              that.ting = false;
            }
            let l = that.buildings.concat(data);
            that.buildings = l;
            that.page = that.page + 1;
          })
          .then(error => {
            console.log(error);
          });
      }
    },
    clear2() {
      this.num2 = "";
      this.num3 = "";
      let where = $cookies.get("where");
      let type=$cookies.get('type');
      delete where.feature;
      delete where.build_type;
      delete type.build_type;
      delete type.feature;
      $cookies.set("where", where, 0);
      $cookies.set("type", type, 0);
    },
    clear1() {
      // $("#hu li input").attr("checked", false);
      this.hus = [];
      let where = $cookies.get("where");
      delete where.apartment;
      $cookies.set("where", where, 0);
    },
    pai(e) {
      let data = e.target.getAttribute("data-v");
      this.p = data;
      let where = $cookies.get("where");
      where.order_type = data;
      $cookies.set("where", where, 0);
    },
    goback() {
      this.$router.push('/'+this.jkl);
    },
    a1() {
      this.area1 = 1;
    },
    t1() {
      this.type1 = 1;
    },
    p1() {
      this.price1 = 1;
    },
    s1() {
      this.shai1 = 1;
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
      let Y = window.scrollY;
      if (Y <= 40) {
        $(".top").css("position", "relative");
        $(".recommen").css("marginTop", "0px");
      } else {
        $(".top").css({ position: "fixed", top: 0, zIndex: 10, width: "100%" });
        $(".recommen").css("marginTop", "44px");
      }
    },
    tostring(name, val) {
      let url = this.$route.path;
      let type = $cookies.get("type");
      if (val == 0) {
        if (type.hasOwnProperty(name)) {
          delete type[name];
        }
      } else {
        type[name] = val;
      }
      $cookies.set("type", type, 0);
      let str = "";
      for (let key in type) {
        str += key + "-" + type[key] + "+";
      }
      str = str.substring(0, str.length - 1);
      let arr = url.split("/");
      arr[3] = str;
      url = arr.join("/");
      this.$router.push(url);
    }
  },
  mounted() {
    //   this.tostring();
    //   console.log(this.$router.currentRoute.path)
    // if(this.$router.currentRoute.path!='/hangzhou/search/1'){
    //     this.$router.push('/hangzhou/search/1')
    // }
    $('html').css('overflow','initial')
    if(this.$route.path.split('/').length!=4){
      $cookies.set('type',{})
      sessionStorage.clear();
    }
    let h = $(".Search").height();
    if (h < 700) {
      $("#Foot").css({ position: "fixed", bottom: "0", width: "100%" });
    } else if (h >= 700) {
      $("#Foot").css({ position: "relative", bottom: "0", width: "100%" });
    }
    this.cityname = localStorage.getItem("cityname");
    this.kk = false;
    this.start_data();
    this.search_datas();
    $(".m-thre ul li").on("click", function() {
      $(this)
        .addClass("m-r-active")
        .siblings("li")
        .removeClass("m-r-active");
    });
    $(".m-qu .m-one ul li").on("click", function() {
      var str = $(this).text();
      if (str == "城区") {
        $("#qu").show();
        $("#tie").hide();
      } else {
        $("#qu").hide();
        $("#tie").show();
      }
    });
    $(".m-jia .m-one ul li").on("click", function() {
      var str = $(this).text();
      if (str == "总价") {
        $("#zong").show();
        $("#dan").hide();
      } else {
        $("#zong").hide();
        $("#dan").show();
      }
    });
    $(".m-qu .m-two ul li").on("click", function() {
      $(".m-u span").text($(this).text());
      $(".m-qu").slideUp("fast");
      $(this)
        .addClass("m-l-active")
        .siblings("li")
        .removeClass("m-l-active");
      $(".m-box").hide();
      $(".m-menu ul li").removeClass("m-as");
    });
    let that = this;
    $(".m-pai ul li").on("click", function() {
      $(this)
        .addClass("m-act")
        .siblings("li")
        .removeClass("m-act");
      var str = $(this).attr("data-v");
      let where = $cookies.get("where");
      where.order_type = str;

      $cookies.set("where", where, 0);
      that.search_data();
      $(".m-pai").hide();
      $(".m-box").hide();
    });
    $(".m-shan .m-one span").on("click", function() {
      $(this)
        .parent("div")
        .children("span")
        .removeClass("m-now");
      $(this).addClass("m-now");
    });
    $(".m-shan .m-s-btn .m-h-r").on("click", function() {
      var xing = $("#m-xing .m-now").text();
      var te = $("#m-te .m-now").text();
      var kai = $("#m-shang .m-now").text();
      var str = [];
      str[0] = xing;
      str[1] = te;
      str[2] = kai;
    });
    $(".m-shan .m-s-btn .m-h-l").on("click", function() {
      $(".m-shan span").removeClass("m-now");
      $(".m-h span").removeClass("kk");
      $(".m-n span").removeClass("kk");
    });
    $(".m-hu .m-h-btn .m-h-l").on("click", function() {
      $(".m-shan span").removeClass("m-now");
      $(".m-h span").removeClass("kk");
      $(".m-n span").removeClass("kk");
    });
    $(".m-jia .m-two ul li").on("click", function() {
      $(".m-jia").slideUp("fast");
      $(".m-box").hide();
      $(this)
        .addClass("m-l-active")
        .siblings("li")
        .removeClass("m-l-active");
      $(".m-menu ul li").removeClass("m-as");
    });
    // $(".m-hu .m-one ul li").on("click", function() {
    //   if (
    //     $(this)
    //       .find("input")
    //       .prop("checked")
    //   ) {
    //     $(this)
    //       .find("input")
    //       .prop("checked", false);
    //   } else {
    //     $(this)
    //       .find("input")
    //       .prop("checked", true);
    //   }
    // });

    $(".m-h-r").on("click", function() {
      $(".m-hu").slideUp(100);
      $(".m-shan").slideUp(100);
      $(".m-box").hide();
      $(".m-menu ul li").removeClass("m-as");
    });
    $(".m-a").on("click", function() {
      $(".m-jia").slideToggle("fast");
      $(".m-qu").hide();
      $(".m-hu").hide();
      $(".m-box").toggle();
      $(".m-pai").hide();
      $(".m-shan").hide();
      if ($(this).hasClass("m-as")) {
        $(this).removeClass("m-as");
        $(".m-box").hide();
      } else {
        $(this).addClass("m-as");
        $(".m-box").show();
      }
      $(this)
        .siblings("li")
        .removeClass("m-as");
    });
    $(".m-h").on("click", function() {
      $(".m-hu").slideToggle("fast");
      $(".m-jia").hide();
      $(".m-qu").hide();
      $(".m-box").toggle();
      $(".m-pai").hide();
      $(".m-shan").hide();
      if ($(this).hasClass("m-as")) {
        $(this).removeClass("m-as");
        $(".m-box").hide();
      } else {
        $(this).addClass("m-as");
        $(".m-box").show();
      }
      $(this)
        .siblings("li")
        .removeClass("m-as");
    });
    $(".m-n").on("click", function() {
      $(".m-shan").slideToggle("fast");
      $(".m-box").toggle();
      $(".m-jia").hide();
      $(".m-pai").hide();
      $(".m-hu").hide();
      $(".m-qu").hide();
      if ($(this).hasClass("m-as")) {
        $(this).removeClass("m-as");
        $(".m-box").hide();
      } else {
        $(this).addClass("m-as");
        $(".m-box").show();
      }
      $(this)
        .siblings("li")
        .removeClass("m-as");
      $(this)
        .parent("ul")
        .next()
        .removeClass("m-as");
    });
    $(".m-sort").on("click", function() {
      $(".m-pai").slideToggle("fast");
      $(".m-box").toggle();
      $(".m-jia").hide();
      $(".m-shan").hide();
      $(".m-hu").hide();
      $(".m-qu").hide();
      if ($(this).hasClass("m-as")) {
        $(this).removeClass("m-as");
        $(".m-box").hide();
      } else {
        $(this).addClass("m-as");
        $(".m-box").show();
      }
      $(this)
        .prev()
        .children("li")
        .removeClass("m-as");
    });
    $(".m-box").click(function() {
      $(".m-qu").hide();
      $(".m-u").removeClass("m-as");
      $(".m-jia").hide();
      $(".m-a").removeClass("m-as");
      $(".m-hu").hide();
      $(".m-h").removeClass("m-as");
      $(".m-shan").hide();
      $(".m-n").removeClass("m-as");
      $(".m-pai").hide();
      $(".m-sort").removeClass("m-as");
      $(this).hide();
    });
    $(".m-u").on("click", function() {
      $(".m-qu").slideToggle("fast");
      $(".m-jia").hide();
      $(".m-hu").hide();
      $(".m-shan").hide();
      $(".m-pai").hide();
      if ($(this).hasClass("m-as")) {
        $(this).removeClass("m-as");
        $(".m-box").hide();
      } else {
        $(this).addClass("m-as");
        $(".m-box").show();
      }
      $(this)
        .siblings("li")
        .removeClass("m-as");
    });
    // 路由
    $(".btn").on("click", function() {
      that.$router.push("/" + that.nn + "/sou");
      // window.location.href = "/sou";
    });
    $(".s-b-city").on("click", function() {
      that.$router.push("/" + that.nn + "/address");
      // window.location.href = "/address";
    });

    window.addEventListener("scroll", this.scroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scroll);
  },
  activated() {
    this.kk = false;
  }
};
</script>
<style scoped>
@import url("~static/css/s-search.css");
.m-me .m-hu .m-one ul li input[type="checkbox"]:checked {
  background: url("~assets/checkbox_icon.png") no-repeat center;
  background-size: 90%;
}
* {
  padding: 0;
  margin: 0;
}
.imgbox {
  width: 92%;
  margin-left: 4%;
  border-radius: .25rem;
}
li {
  list-style: none;
}
.kk {
  color: #4db5ff;
}
nav {
  width: 100%;
  height: 44px;
  line-height: 44px;
}
nav .back {
  width: 4.4%;
  float: left;
  margin-left: 4%;
  margin-top: 12px;
  margin-right: 4%;
}
nav p {
  float: left;
}
nav .s-btn {
  width: 65.667%;
  height: 30px;
  border-radius: 15px;
  background-color: #ecedf1;
  line-height: 30px;
  margin-top: 6px;
}
nav .s-btn .s-b-city {
  color: #80818b;
  font-size: 14px;
  margin-left: 10px;
}
nav .s-btn .bom {
  width: 12px;
  margin-bottom: 4px;
}
nav .s-btn .btn {
  color: #95969c;
  font-size: 14px;
  border-left: 0.5px solid #d5d5df;
  padding-left: 7px;
  margin-bottom: 2px;
}
nav .s-btn .btn img {
  width: 15px;
  margin-right: 4px;
  margin-bottom: 2px;
}
nav .dian {
  color: #505158;
  font-size: 14px;
  margin-left: 2%;
  line-height: 40px;
}
nav .dian span {
  color: #505158;
}
nav .dian img {
  width: 22%;
}
.m-me .m-hu .m-one {
  width: 100%;
}
.m-me .m-shan .m-one {
  width: 105%;
}
.loadings {
  width: 100%;
  height: 60px;
  text-align: center;
  line-height: 60px;
  font-size: 12px;
  color: #777886;
  background-color: #fafbfc;
}
.loadings img {
  width: 5%;
  margin-bottom: 1%;
}
.top {
  position: relative;
}
.recommen {
  padding: 0px 15px 0px 15px;
}
.recommen h4 {
  color: #303033;
  font-size: 17px;
  margin-bottom: 10px;
}
.recommen h4 span {
  color: #919499;
  font-size: 13px;
  float: right;
  font-weight: 500;
}
.recommen h4 span i {
  font-size: 14px;
  margin-right: 5px;
}
.recommen .re-con {
  margin-bottom: 0;
}
.recommen .re-list {
  padding: 16px 0;
  border-bottom: 0.5px solid #f2f4f7;
}
/* .recommen .re-list:last-child{
  padding-bottom: 0;
} */
.recommen .re-list::after {
  content: "";
  clear: both;
  height: 0;
  overflow: hidden;
  display: block;
  visibility: hidden;
}
.recommen .re-list .re-con-left {
  margin-right: 14px;
  position: relative;
  width: 30.667%;
  height: 84px;
  border-radius: 5px;
  float: left;
}
.recommen .re-list .re-con-left img {
  width: 100%;
  height: 84px;
  border-radius: 5px;
}
.recommen .re-list .re-con-left span {
  position: absolute;
  right: 3%;
  bottom: 1%;
  font-size: 10px;
  color: #ffffff;
}
.recommen .re-list .re-con-right {
  float: left;
  width: 64%;
  position: relative;
}
.recommen .re-list .re-con-right h5 {
  color: #2e3033;
  font-size: 17px;
  margin-bottom: 2px;
}
.recommen .re-list .re-con-right h5 strong {
  font-weight: 400;
  height: 19px;
  width: 183px;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.recommen .re-list .re-con-right h5 .ishou {
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
.recommen .re-list .re-con-right h5 .isdai {
  width: 36px;
  height: 17px;
  border-radius: 2px;
  text-align: center;
  line-height: 17px;
  float: right;
  background:rgba(250,193,77,0.2);
  color: #FAC14D;
  display: block;
  font-weight: 500;
  font-size: 11px;
}
.recommen .re-list .re-con-right h5 .iskong {
  width: 36px;
  height: 17px;
  border-radius: 2px;
  text-align: center;
  line-height: 17px;
  float: right;
  background:rgba(217,217,217,1);
  color: #fff;
  display: block;
  font-weight: 500;
  font-size: 11px;
}
.recommen .re-list .re-con-right .price {
  color: #fe582f;
  font-size: 12px;
  margin-bottom: 2px;
}
.recommen .re-list .re-con-right .price span {
  font-size: 18px;
}
.recommen .re-list .re-con-right .area {
  color: #919499;
  font-size: 12px;
  margin-bottom: 2px;
}
.recommen .re-list .re-con-right .area span {
  margin-right: 2%;
}
.recommen .re-list .re-con-right .tabs .strong {
  font-weight: 500;
  padding: 3px 7px;
  background-color: #ebf5fc;
  margin-right: 6px;
  color: #4db5ff;
  font-size: 11px;
  border-radius: 2px;
}
.recommen .re-list .re-con-right .tabs span {
  padding: 3px 5px;
  background-color: #f7f8fa;
  color: #919499;
  font-size: 11px;
  margin-right: 6px;
  border-radius: 2px;
}
.recommen .more-res {
  width: 100%;
  height: 44px;
  background-color: #f2f3f5;
  border-radius: 4px;
  color: #4db5ff;
  font-size: 16px;
  text-align: center;
  line-height: 44px;
  border: 0;
}

.nothing img {
  width: 50%;
  position: relative;
  left: 50%;
  margin-left: -25%;
  margin-bottom: 50px;
  margin-top: 125px;
}
.nothing p {
  color: #898da1;
  font-size: 16px;
  text-align: center;
  margin-bottom: 40px;
}
.nothing button {
  width: 53.333%;
  position: relative;
  left: 50%;
  margin-left: -26.6667%;
  border: 1px solid #40a2f4;
  text-align: center;
  line-height: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #fff;
  color: #40a2f4;
}
</style>