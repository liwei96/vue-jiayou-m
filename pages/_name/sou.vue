<template>
  <div class="Sou">
    <div class="all">
      <img src="~/assets/return.png" alt @click="goback" />
      <img src="~/assets/search.png" alt class="m-se" />
      <input
        type="text"
        class="m-int"
        name="name"
        placeholder="请输入楼盘名称"
        autocomplete="off"
        v-model="name"
      />
      <!-- <button type="submit" id="s-btn">搜索</button> -->
    </div>
    <div class="hot">
      <h4>
        <span class="iconfont iconhuo"></span>
        <i>热门搜索</i>
      </h4>
      <div class="m-list">
        <p class="title">楼盘</p>
        <div>
          <!-- <router-link
            :to="'/'+jkl+'/content/'+hot_id[key]"
          > -->
          <span
            v-for="(name, key) in names"
            :data-v="hot_id[key]"
            :key="key"
            @click="goto(hot_id[key])"
            >{{ name }}</span
          >
          <!-- </router-link> -->
        </div>
      </div>
      <div class="m-list">
        <p class="title y">特色</p>
        <div id="ys">
          <span
            v-for="(item, key) in tes"
            :key="key"
            :data-v="te_id[key]"
            @click="put($event)"
            >{{ item }}</span
          >
        </div>
      </div>
    </div>
    <div class="sou" v-if="ll">
      <!-- <ul v-if="false">
        <li
          v-for="(item,key) in bbs"
          :key="key"
          v-if="key<6?true:false"
          :data-v="item.id"
          @click="aa($event)"
        >{{item.name}}</li>
      </ul> -->
      <ul>
        <li v-for="(item, key) in lists" :key="key" @click="aa(item.id)">
          <p class="name">
            <span v-html="item.name"></span>
            <i>{{ item.city }}</i>
          </p>
          <p class="where" v-html="item.where"></p>
        </li>
      </ul>
    </div>
    <!-- <foot-view :pinyin="jkl"></foot-view> -->
    <transition name="fade">
      <load v-if="isload"></load>
    </transition>
  </div>
</template>
<script>
import { ip, sou_data, sou, souname } from "~/api/api";
import Loadings from "@/components/loading";
import footView from "@/components/Foot.vue";
export default {
  name: "Sou",
  components: {
    load: Loadings,
    "foot-view": footView,
  },
  async asyncData(context) {
    let ip = context.store.state.cookie.ip;
    let city = context.store.state.cookie.city;
    let token = context.store.state.cookie.token;
    let jkl = context.store.state.cookie.pinyin;
    let kid = context.store.state.cookie.kid
      ? context.store.state.cookie.kid
      : "";
    let other = context.store.state.cookie.other
      ? context.store.state.cookie.other
      : "";
    let [res] = await Promise.all([
      context.$axios
        .post("/api/project/quick_search", {
          token: token,
          city: city,
          ip: ip,
          platform: 2,
          kid: kid,
          other: other,
        })
        .then((resp) => {
          let data = resp.data.data;
          let hot_id = [];
          let names = [];
          for (let item in data.hots) {
            hot_id.push(item);
            names.push(data.hots[item]);
          }
          let te = [];
          let te_id = [];
          for (let item in data.feature) {
            te_id.push(item);
            te.push(data.feature[item]);
          }
          data.te = te;
          data.te_id = te_id;
          data.names = names;
          data.hot_id = hot_id;
          return data;
        }),
    ]);
    return {
      tes: res.te,
      te_id: res.te_id,
      names: res.names,
      hot_id: res.hot_id,
      jkl: jkl,
      title: res.title,
      description: res.description,
      keywords: res.keywords,
    };
  },
  data() {
    return {
      n: "",
      jkl: "",
      names: ["世茂天辰", "千岛湖嘉苑·千岛湖壹号", "千岛湖嘉苑"],
      ip: "",
      hot_id: [],
      tes: [],
      te_id: [],
      isload: true,
      name: "",
      builds: [],
      bbs: [],
      ll: false,
      title: "",
      description: "",
      keywords: "",
      lists: [],
    };
  },
  methods: {
    goto(n) {
      if (sessionStorage.getItem("ispk")) {
        let ids = localStorage.getItem("ids");
        let id = sessionStorage.getItem("pkid");
        let ds = [];
        if (ids) {
          ds = ids.split(",");
        }
        ds.push(n);
        ids = ds.join(",");
        localStorage.setItem("ids", ids);
        sessionStorage.removeItem('ispk')
        sessionStorage.removeItem('pkid')
        this.$router.push("/" + this.n + "/pk/" + ids + "/" + id);
      } else {
        this.$router.push("/" + this.n + "/content/" + n);
      }
    },
    start() {
      let token = localStorage.getItem("token");
      let city = localStorage.getItem("city");
      let n = this.$route.params.name;

      this.n = n;
      let that = this;
      let ip = ip_arr["ip"];
      // let ip = returnCitySN["cip"];
      this.ip = ip;
      localStorage.getItem("ip");
      let data = { token: token, city: city, ip: ip, platform: 2 };
      this.isload = false;
      sou({ city: city })
        .then((resp) => {
          that.builds = resp.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    put(e) {
      let data = e.target.getAttribute("data-v");
      this.$store.commit("cha", data);
      sessionStorage.setItem("feature", data);
      this.$router.push("/" + this.n + "/search");
    },
    sou() {
      let data = this.builds;
      let dd = [];
      let name = this.name;
      if (!name) {
        this.ll = false;
      } else {
        this.ll = true;
        // for (let val of data) {
        //   if (val["name"].indexOf(name) != -1) {
        //     dd.push(val);
        //   }
        // }
        // this.bbs = dd;
        let city = localStorage.getItem("cityname");
        souname(name, 1, city).then((res) => {
          console.log(res);
          this.lists = res.data.data;
        });
      }
    },
    aa(n) {
      if (sessionStorage.getItem("ispk")) {
        let ids = localStorage.getItem("ids");
        let id = sessionStorage.getItem("pkid");
        let ds = [];
        if (ids) {
          ds = ids.split(",");
        }
        ds.push(n);
        ids = ds.join(",");
        localStorage.setItem("ids", ids);
        sessionStorage.removeItem('ispk')
        sessionStorage.removeItem('pkid')
        this.$router.push("/" + this.n + "/pk/" + ids + "/" + id);
      } else {
        this.$router.push("/" + this.n + "/content/" + n);
      }
      // window.location.href='/'+this.n+"/content/"+id
    },
    goback() {
      this.$router.go(-1);
    },
  },
  head() {
    return {
      title: this.title || "允家新房-楼盘搜索",
      meta: [
        {
          name: "description",
          content: this.description || "允家新房",
        },
        {
          name: "Keywords",
          content: this.keywords || "允家新房",
        },
      ],
    };
  },
  mounted() {
    $("#Foot").css({
      position: "fixed",
      bottom: "0",
      width: "100%",
      marginBottom: 0,
    });
    let that = this;
    this.start();
  },
  computed: {
    count() {
      return this.$store.state.count;
    },
  },
  watch: {
    name: function () {
      this.sou();
    },
  },
  beforeDestroy(){
    sessionStorage.removeItem('ispk')
    sessionStorage.removeItem('pkid')
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

.sou {
  position: fixed;
  width: 100%;
  top: 52px;
  background-color: #fff;
}
.sou ul {
  padding: 0 4%;
  height: 37rem;
  overflow: auto;
}
.sou ul li {
  padding-bottom: 18px;
  padding-top: 16px;
  border-bottom: 0.5px solid #f2f4f7;
}
.sou ul li .name {
  color: #424345;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.sou ul li .name span >>> strong {
  font-style: normal;
  color: #afb1b3;
}
.sou ul li .name i {
  font-style: normal;
  font-size: 0.75rem;
  color: #9d9fa6;
}
.sou ul li .where {
  color: #2a2a2b;
  font-size: 0.875rem;
}
.sou ul li .where >>> strong {
  font-style: normal;
  color: #afb1b3;
}
.sou ul >>> li:hover {
  background-color: #ccc;
}

.all {
  padding: 0;
}
.all {
  width: 100%;
  height: 48px;
  position: relative;
}
.all img {
  width: 5%;
  margin-left: 3%;
  position: relative;
  top: -2px;
}
.all .m-int {
  width: 86%;
  height: 30px;
  background-color: #ecedf1;
  border-radius: 15px;
  margin-left: 2%;
  margin-top: 3%;
  padding-left: 10%;
  border: 0px;
  margin-right: 2%;
}
.all .m-se {
  width: 4%;
  position: absolute;
  top: 40%;
  left: 12%;
}
.all #s-btn {
  background: linear-gradient(
    270deg,
    rgba(102, 207, 255, 1),
    rgba(76, 181, 255, 1)
  );
  width: 13%;
  border: 0;
  color: #fff;
  height: 26px;
  border-radius: 13px;
}

.hot {
  width: 100%;
  padding-top: 5%;
  padding-right: 0;
  padding-left: 4%;
}
.hot h4 {
  color: #333333;
  font-size: 14px;
  margin-bottom: 6%;
  font-weight: 500;
}
.hot h4 span {
  color: #ff5454;
  font-size: 17px;
}
.hot h4 i {
  color: #333333;
  font-size: 16px;
  font-style: normal;
}

.hot .m-list {
  margin-bottom: 6%;
  position: relative;
}
.hot .m-list p.title {
  color: #2e3033;
  font-size: 15px;
  display: inline-block;
  margin-right: 6%;
  position: relative;
  top: -78px;
}
.hot .m-list p.y {
  color: #2e3033;
}
.hot .m-list div {
  display: inline-block;
  width: 81%;
}
.hot .m-list div span {
  color: #5e6166;
  font-size: 14px;
  display: inline-block;
  padding: 5px 12px;
  border-radius: 2px;
  margin-right: 3%;
  margin-bottom: 3%;
  background-color: #f2f4f7;
}
</style>
    
