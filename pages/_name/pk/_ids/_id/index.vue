<template>
  <div class="Pk">
    <h3>
      <img src="~/assets/return.png" @click="goback" />
      楼盘PK
      <span id="add">添加楼盘</span>
    </h3>
    <div class="con">
      <div class="re-con" v-for="(list,key) in lists" :key="key">
        <input type="radio" :data-v="list.id" @click="idss($event)" name="pp" />
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
              <strong>{{list.decorate}}</strong>
              <span v-if="list.railway">{{list.railway}}</span>
              <span>{{list.tag}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <button class="pk">PK一下</button>
    <div class="tishi" v-if="warn">请选择一个要比较的楼盘</div>
    <foot-view :pinyin="jkl"></foot-view>
  </div>
</template>
<script>
import footView from "@/components/Foot.vue";
import { ip, PK } from "~/api/api";
export default {
  name: "Pk",
  async asyncData(context) {
    let token = context.store.state.cookie.token;
    let ip = context.store.state.cookie.ip;
    let id = context.params.id;
    let ids = context.params.ids;
    let jkl = context.store.state.cookie.pinyin;
    let kk = ids.split(",");
    if (id != ids) {
      for (let i = kk.length; i >= 0; i--) {
        if (kk[i] == id) {
          kk.splice(i, 1);
        }
      }
      ids = kk.join(",");
      let kid = context.store.state.cookie.kid
        ? context.store.state.cookie.kid
        : "";
      let other = context.store.state.cookie.other
        ? context.store.state.cookie.other
        : "";
      let [res] = await Promise.all([
        context.$axios
          .post("/api/project/compare_mobile", {
            ip: ip,
            ids: ids,
            platform: 2,
            token: token,
            kid: kid,
            other: other,
          })
          .then((resp) => {
            // console.log(resp)
            let data = resp.data.data;

            return data;
          }),
      ]);
      return {
        lists: res.buildings,
        jkl: jkl,
        title: res.title,
        description: res.description,
        keywords: res.keywords,
      };
    } else {
      return {
        jkl: jkl,
      };
    }
  },
  data() {
    return {
      lists: [],
      id: "",
      ip: "",
      ids: "",
      n: "",
      jkl: "",
      warn: false,
      title: "",
      description: "",
      keywords: "",
    };
  },
  components: {
    "foot-view": footView,
  },
  head() {
    return {
      title: this.title || "允家新房-楼盘PK",
      meta: [
        {
          name: "description",
          content: this.description || "允家新房",
        },
        {
          name: "keywords",
          content: this.keywords || "允家新房",
        },
      ],
    };
  },
  methods: {
    start() {
      this.n = this.$route.params.name;
      let id = this.$route.params.id;
      this.id = id;
      let ids = this.$route.params.ids;
      let kk = ids.split(",");
      for (let i = kk.length; i >= 0; i--) {
        if (kk[i] == id) {
          kk.splice(i, 1);
        }
      }
      ids = kk.join(",");
      localStorage.setItem("ids", ids);
      let ip = ip_arr["ip"];
      // let ip = returnCitySN["cip"];
      this.ip = ip;
      localStorage.getItem("ip");
    },
    idss(e) {
      let id = e.target.getAttribute("data-v");
      let k = this.id;
      if (id == k) {
      } else {
        let ids = id + "," + this.id;
        this.ids = ids;
      }
    },
    goback() {
      this.$router.push("/" + this.n + "/content/" + this.id);
    },
  },
  mounted() {
    let h = $(".Pk").height();
    if (h < 700) {
      $("#Foot").css({ position: "fixed", bottom: "0", width: "100%" });
    } else if (h >= 700) {
      $("#Foot").css({ position: "relative", bottom: "0", width: "100%" });
    }
    this.start();
    let that = this;
    $(".pk").on("click", function () {
      if (that.ids) {
        that.$router.push(
          "/" + that.n + "/pkdetail/" + that.ids + "/" + that.id
        );
      } else {
        that.warn = true;
        setTimeout(function () {
          that.warn = false;
        }, 1500);
      }

      // window.location.href = '/'+that.n+"/pkdetail/" + that.ids + "/" + that.id;
    });
    $("#add").on("click", function () {
      that.$router.push("/" + that.n + "/addcolletion/" + that.id);
      // window.location.href = '/'+that.n+"/addcolletion";
    });
  },
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
}
.tishi {
  position: fixed;
  width: 60%;
  height: 30px;
  top: 50vh;
  left: 20%;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  text-align: center;
  line-height: 30px;
  border-radius: 6px;
}
h3 {
  height: 48px;
  border-bottom: 0.5px solid #f7f7f7;
  color: #404145;
  font-size: 16px;
  text-align: center;
  line-height: 48px;
  padding: 0 4%;
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
  margin-bottom: 40px;
}
.re-con {
  border-bottom: 0.5px solid #f7f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
}
.re-con input[type="radio"] {
  width: 16px;
  height: 16px;
  display: inline-block;
  margin-right: 14px;
  border: 0.5px solid #dadce6;
  background-color: #fff;
  -webkit-appearance: none;
}
.re-con input[type="radio"]:checked {
  background: url(~assets/checkbox_icon.png) no-repeat center;
  background-size: 90%;
}
.re-list {
  display: inline-block;
  padding: 16px 0;
  width: 89%;
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
}
</style>