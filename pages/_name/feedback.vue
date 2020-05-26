<template>
  <div class="container-fluid m">
    <div class="m-title visible-xs-block .visible-sm-block">
      <img src="~/assets/return.png" alt @click="goback" />
      <h3>意见反馈</h3>
    </div>
    <div class="m-content">
      <textarea name id cols="30" rows="10" placeholder="输入您需要的留言建议"></textarea>
      <button id="btn">确定</button>
    </div>
    <foot-view :pinyin="jkl"></foot-view>
  </div>
</template>
<script>
import footView from "@/components/Foot.vue";
import { ip, leave } from "~/api/api";
export default {
  name: "Feedback",
  asyncData (context) {
    let jkl = context.store.state.cookie.pinyin;
    return {
      jkl:jkl
    }
  },
  head() {
    return {
      title:  "允家新房-意见反馈",
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
  head() {
    return {
      title: "关于我们-允家新房",
      meta: [
        {
          name: "description",
          content:
            "允家新房是专注于新房购买的O2O平台,为买房人提供一对一新房房产咨询服务和新楼盘信息，包括新楼盘价格走势和最新房源"
        },
        {
          name: "keywords",
          content: "关于我们"
        }
      ]
    };
  },
  data() {
    return {
      ip: "",
      n: "",
      jkl:''
    };
  },
  components: {
    "foot-view": footView
  },
  methods: {
    put(con) {
      let token = localStorage.getItem("token");
      let that = this;
      let Ip = localStorage.getItem("ip");
      let city = localStorage.getItem("city")?localStorage.getItem("city"):1;
      leave({
        ip: Ip,
        city: city,
        page: 3,
        position: 16,
        remark: con,
        platform: 2,
        token: token
      })
        .then(resp => {
          if (resp.data.code == 200) {
            that.$router.push("/" + that.n + "/myhome");
            // window.location.href='/'+that.n+"/myhome"
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    goback() {
      this.$router.go(-1);
    }
  },
  mounted() {
    $("#Foot").css({ position: "fixed", bottom: "0", width: "100%",marginBottom:0 });
    let that = this;
    this.n = this.$route.params.name;
    $("#btn").on("click", function() {
      let con = $(this)
        .prev()
        .val();
      if (!con) {
        $(this)
          .prev()
          .attr("placeholder", "留言不能为空");
      } else {
        that.put(con);
      }
    });
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

/* m */
/* m */
.m {
  padding: 0;
  min-height: 700px;
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
.m-bgc {
  width: 53%;
  margin-top: 90px;
  margin-left: 23.33333%;
  margin-bottom: 18px;
}
.m-txt {
  color: #666666;
  font-size: 16px;
  font-weight: 500;
  margin-left: 16.66667%;
}
.m-btn {
  width: 53.3333%;
  height: 40px;
  border: 0px;
  border-radius: 4px;
  background-color: #3ac869;
  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
  margin-left: 23.33333%;
  margin-top: 37px;
}

.m-content {
  padding: 0 4%;
}
.m-content textarea {
  width: 100%;
  border: 0px;
  background-color: #f7f7f7;
  border-radius: 6px;
  height: 170px;
  padding-left: 20px;
  margin-top: 35px;
  color: #808080;
  font-size: 16px;
  padding-top: 20px;
  margin-bottom: 76px;
}
.m-content button {
  height: 44px;
  width: 100%;
  background: linear-gradient(
    270deg,
    rgba(102, 207, 255, 1),
    rgba(76, 181, 255, 1)
  );
  text-align: center;
  line-height: 44px;
  color: #fff;
  font-size: 16px;
  border: 0px;
  border-radius: 4px;
}
</style>