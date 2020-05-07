<template>
  <div class="AddColletion">
    <h3>
      <img src="~/assets/return.png" @click="goback" />
      添加楼盘
    </h3>
    <div class="con">
      <div class="re-con" v-for="(list,key) in lists" :key="key">
        <input type="checkbox" :data-v="list.id" @click="add($event)" />
        <div class="re-list">
          <div class="re-con-left">
            <img :src="list.img" />
          </div>
          <div class="re-con-right">
            <h5>{{list.name}}</h5>
            <p class="price">
              <span>{{list.single_price}}</span>元/m²
            </p>
            <p class="area">
              <span>{{list.city}}-{{list.country}}</span>
              <span>建面</span>
              <span>{{parseInt(list.area_min)}}-{{parseInt(list.area_max)}}m²</span>
            </p>
            <p class="tabs">
              <strong>{{list.status}}</strong>
              <span v-if="list.railway">{{list.railway}}</span>
              <span>{{list.type}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="bom">
      <button class="pk" @click="ll()">确定</button>
    </div>
    <transition name="fade">
      <my-loading v-if="load"></my-loading>
    </transition>
    <foot-view :pinyin="jkl"></foot-view>
  </div>
</template>
<script>
import footView from "@/components/Foot.vue";
import { addbuilds } from "~/api/api";
import Loading from "@/components/loading.vue";
export default {
  name: "AddColletion",
  components: {
    "my-loading": Loading,
    'foot-view':footView
  },
  async asyncData (context) {
    let token = context.store.state.cookie.token;
    let ip = context.store.state.cookie.ip;
    let city = context.store.state.cookie.city;
    let jkl=context.store.state.cookie.pinyin;
    let id=context.params.id;
    let [res]= await Promise.all([
      context.$axios.post('/api/project/pk_recommand',{ ip: ip, city: city, id: id, token: token })
      .then((resp)=>{
        let data = resp.data.data;
          
          
          return data;
      })
    ])
    return{
          lists:res,
          jkl:jkl
    }
  },
  components: {
    "foot-view": footView
  },
  data() {
    return {
      lists: [
        {
          tit: "绿地华家池印",
          price: 42000,
          city: "杭州市",
          area: "萧山区",
          area_min: 60,
          area_max: 130,
          zhuangxiu: "精装",
          ditie: "地铁沿线",
          tese: "繁华地段",
          img: require("~/assets/lou1.png")
        },
        {
          tit: "绿地华家池印",
          price: 42000,
          city: "杭州市",
          area: "萧山区",
          area_min: 60,
          area_max: 130,
          zhuangxiu: "精装",
          ditie: "地铁沿线",
          tese: "繁华地段",
          img: require("~/assets/lou1.png")
        },
        {
          tit: "绿地华家池印",
          price: 42000,
          city: "杭州市",
          area: "萧山区",
          area_min: 60,
          area_max: 130,
          zhuangxiu: "精装",
          ditie: "地铁沿线",
          tese: "繁华地段",
          img: require("~/assets/lou1.png")
        }
      ],
      id: "",
      ip: "",
      load: true,
      n: "",
      jkl:''
    };
  },
  methods: {
    start() {
      this.n = this.$route.params.name;
      this.id = this.$route.params.id;
      let ip = returnCitySN["cip"];
      this.ip = ip;
      this.load=false
    },
    add(e) {
      let id = e.target.getAttribute("data-v");
      let d=this.id;
      let ids = localStorage.getItem("ids");
      let ds = [];
      if (ids) {
        ds = ids.split(",");
      }
      ds.push(id);
      
      ids = ds.join(",");
      localStorage.setItem("ids", ids);
    },
    ll() {
      let id = this.id;
      let ids = localStorage.getItem("ids");
      this.$router.push("/" + this.n + "/pk/" + ids + "/" + id);
      // window.location.href="/pk/"+ids+'/'+id;
    },
    goback() {
      this.$router.go(-1);
    }
  },
  mounted() {
    $("#Foot").css({ position: "relative", bottom: "0", width: "100%", marginBottom: '80px' });
    this.start();
  }
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
}
h3 {
  height: 48px;
  border-bottom: 0.5px solid #f7f7f7;
  color: #404145;
  font-size: 16px;
  text-align: center;
  line-height: 48px;
  padding: 0 4%;
  position: fixed;
  background-color: #fff;
  width: 100%;
  z-index: 2;
  top:0;
}
h3 img {
  width: 5%;
  float: left;
  margin-top: 16px;
}
h3 span {
  color: #6f7281;
  font-size: 14px;
  float: right;
}

.con {
  padding: 0 4%;
  margin-bottom: 70px;
  margin-top:50px
}
.re-con {
  border-bottom: 0.5px solid #f7f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
}
.re-con input[type="checkbox"] {
  width: 16px;
  height: 16px;
  display: inline-block;
  margin-right: 14px;
  border: 0.5px solid #dadce6;
  background-color: #fff;
  -webkit-appearance: none;
}
.re-con input[type="checkbox"]:checked {
  background: url(~assets/checkbox_icon.png) no-repeat center;
  background-size: 90%;
}
.re-list {
  display: inline-block;
  padding: 16px 0;
  width: 90%;
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
  top: -3px;
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
.re-list .re-con-right .tabs strong {
  font-weight: 500;
  padding: 3px 7px;
  background-color: #ebf5fc;
  display: inline-block;
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
}
.more-res {
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
.bom{
  position: fixed;
  bottom: 0;
  width:100%;
  padding-top:20px;
  background-color: #fff;
  z-index: 1;
}
.pk {
  width: 92%;
  height: 40px;
  background-color: #4db5ff;
  text-align: center;
  line-height: 40px;
  color: #fff;
  font-size: 16px;
  border: 0;
  margin-left: 4%;
  border-radius: 4px;
  margin-bottom: 20px;
}
</style>