<template>
  <div class="Follow">
    <div class="container-fluid m">
      <div class="m-title visible-xs-block .visible-sm-block">
        <img src="~/assets/return.png" alt @click="goback" />
        <h3>关注公众号</h3>
      </div>
      <p>关注允家新房公众号了解详细楼盘</p>
      <img src="~/assets/ma_01.png" alt class="two" />
      <button @click="down">保存二维码图片</button>
      <div class="line"></div>
    </div>
    <div class="di">
      <img src="~/assets/buzhou.png" alt />
    </div>
    <foot-view :pinyin="jkl"></foot-view>
  </div>
</template>
<script>
import footView from "@/components/Foot.vue";
export default {
  name: "Follow",
  asyncData (context) {
    let jkl = context.store.state.cookie.pinyin;
    return {
      jkl:jkl
    }
  },
  components: {
    "foot-view": footView
  },
  data(){
    return {
      imgs:'http://test.jy8006.com/_nuxt/img/4525797.png',
      jkl:''
    }
  },
  head() {
    return {
      title:  "允家新房-关注公众号",
      meta: [
        {
          name: "description",
          content:  '允家新房'
        },
        {
          name: "keywords",
          content:  '允家新房'
        }
      ]
    };
  },
  methods:{
    goback(){
      this.$router.go(-1)
    },
    down(){
      var alink = document.createElement("a");
      alink.href = this.imgs;
      alink.download = "pic"; //图片名
      alink.click();
    }
  },
  mounted(){
    $("#Foot").css({ position: "relative", bottom: "0", width: "100%",marginBottom:0 });
  }
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
  font-family: "Microsoft YaHei";
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

/* m */
.m {
  padding: 0;
}
.m-title {
  position: relative;
  width: 100%;
  height: 44px;
  text-align: center;
  line-height: 44px;
  border-bottom: 1px solid #f2f2f2;
}
.m-title img {
  position: absolute;
  width: 5%;
  margin-top: 14px;
  left: 5.3333%;
}
.m-title h3 {
  color: #333333;
  font-size: 18px;
  margin: 0;
  font-weight: bold;
  line-height: 44px;
}

p {
  color: #40a2f4;
  font-size: 14px;
  text-align: center;
  margin-top: 38px;
  margin-bottom: 26px;
}
.two {
  width: 44%;
  margin-left: 28%;
  margin-bottom: 26px;
}

button {
  width: 53.33%;
  height: 40px;
  background-color: #40a2f4;
  border-radius: 20px;
  text-align: center;
  line-height: 40px;
  color: #fff;
  border: 0;
  box-shadow: 0px 4px 4px 0px rgba(28, 182, 79, 0.1);
  margin-left: 23.33%;
  margin-bottom: 40px;
}

.line {
  width: 91.733%;
  margin-left: 4%;
  border-bottom: 0.5px dashed #b5b5b5;
}
.di {
  width: 100%;
  height: auto;
}
.di img {
  width: 100%;
  height: auto;
}
</style>