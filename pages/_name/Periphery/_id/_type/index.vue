<template>
  <div class="Periphery">
    <no-ssr>
    <remote-js src="https://webapi.amap.com/maps?v=1.4.14&key=729ac4d779c7e625bc11bd5ba3ff3112"></remote-js>
    </no-ssr>
    <div class="container-fluid m">
      <div class="m-title visible-xs-block .visible-sm-block">
        <img src="~/assets/return.png" alt @click="goback" />
        <h3>周边详情</h3>
      </div>
      <no-ssr>
      <div class="m-continer" id="m-container"></div>
      </no-ssr>
      <ul id="list">
        <li :class="type==1?'m-active':''">交通</li>
        <li :class="type==2?'m-active':''">教育</li>
        <li :class="type==3?'m-active':''">医疗</li>
        <li :class="type==4?'m-active':''">生活</li>
      </ul>
      <div id="panel" style="display: none;"></div>
      <div class="m-l-content"></div>
      <div class="visible-xs-block .visible-sm-block">
        <transition name="change">
          <div class="weiter ts" v-if="change">
            <div class="t-top">
              <h6>预约看房</h6>
              <p>一键预约看房免费小车上门接送，可带家人一起参观多个热门楼盘</p>
              <img id="w-esc" src="~/assets/w-del.png" alt />
            </div>
            <div class="t-bottom">
              <div class="t-b-first">
                <input class="l-p" type="text" placeholder="输入预约手机号码" v-model="baoming"/>
                <p class="w-mg">
                  <input class="w-mg-c" type="checkbox" checked v-model="checks"/>我已阅读并同意
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


        <div class="m-bigimgs">
          <img class="m_bigimgs" src alt />
        </div>
      </div>
    </div>
    <div class="m-botnav">
      <p id="m_shou" data-_v="{$data.id}">
        <img id="fork" src="~/assets/forks.png" alt :data-v="id" @click="collection($event)" />
          <img id="forked" src="~/assets/heart.gif" />收藏
      </p>
      <a :href="'tel:'+call">
        <button class="m-pho">
          <p class="ph1">
            <img src="~/assets/phicon.png" alt />电话咨询
          </p>
        </button>
      </a>
      <button class="m-y p1" data-v="预约看房">
        <p class="ph1">
          <img src="~/assets/promsg.png" />预约看房
        </p>
      </button>
    </div>
  </div>
</template>
<script>
import { ip, periphery_data, msg, trend_put, verification,collection } from "~/api/api";
export default {
  name: "Periphery",
  components: {
    'remote-js': {
            render(createElement) {
              return createElement('script', { attrs: { type: 'text/javascript', src: this.src }});            
            },
            props: {
            src: { type: String, required: true },
            },
        }
  },
  async asyncData(context) {
    let jkl=context.store.state.cookie.pinyin;
    return {
      jkl:jkl,
      checks:false
    };
  },
  data() {
    return {
      baoming:'',
      change: false,
      succ: false,
      defaultHeight: "0",
      nowHeight: "0",
      ip: "",
      la: "",
      ln: "",
      call: "",
      type: "",
      id:'',
      checks:'',
      jkl:''
    };
  },
  methods: {
    start() {
      let id = this.$route.params.id;
      this.id=id
      let that = this;
      let collect = localStorage.getItem(id);
      if (collect == 0) {
        $("#fork").show();
        $("#forked").hide();
      } else {
        $("#fork").hide();
        $("#forked").css("display", "block");
      }
      this.call = localStorage.getItem("call");
      let IP = localStorage.getItem("ip");
      periphery_data({ ip: IP, platform: 2, id: id })
        .then(resp => {
          let data = resp.data.data;
          that.la = data.latitude;
          that.ln = data.longitude;
          
        })
        .catch(error => {
          console.log(error);
        });
    },
    sendmsg(t) {
      this.phone = t;
      let that = this;
      msg({ phone: t, channel: 2 })
        .then(resp => {
          if (resp.data.code == 200) {
            let ip = that.ip;
            let c = localStorage.getItem("city");
            let p = that.page;
            let tel = that.phone;
            let kid = sessionStorage.getItem("kid");
            let other = sessionStorage.getItem("other");
            trend_put({
              ip: ip,
              tel: tel,
              city: c,
              position: 5,
              page: 2,
              type: 9,
              kid: kid,
              other: other
            })
              .then(resp => {
                if (resp.data.code == 200) {
                }
              })
              .catch(error => {
                console.log(error);
              });
            $(".t-b-first").hide();
            $(".t-b-second").show();
            var time = 60;
            tel = t.substr(0, 3) + "****" + t.substr(7, 11);
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
            $("#ytel").html(tel);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    check(m) {
      let tel = this.phone;
      let that = this;
      verification({ phone: tel, code: m, channel: 2 })
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
    zhou() {
      let that = this;
      let baidu = [that.ln, that.la];
          AMap.convertFrom(baidu, "baidu", function(status, result) {
            if (result.info === "ok") {
              var lnglats = result.locations; // Array.<LngLat>
              that.la = lnglats[0].lat;
              that.ln = lnglats[0].lng;
            }
          });
      let type = this.$route.params.type;
      this.type = type;
      var map = new AMap.Map("m-container", {
        // eslint-disable-line no-unused-vars
        resizeEnable: true,
        zoom: 15
      });
      
      AMap.service(["AMap.PlaceSearch"], function() {
        // eslint-disable-line no-unused-vars
        //构造地点查询类
        var placeSearch = new AMap.PlaceSearch({
          pageSize: 10, // 单页显示结果条数
          pageIndex: 1, // 页码
          city: "", // 兴趣点城市
          citylimit: false, //是否强制限制在设置的城市内搜索
          map: map, // 展现结果的地图实例
          panel: "panel", // 结果列表将在此容器中进行展示。
          autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });

        var cpoint = [that.ln, that.la]; //中心点坐标
        var p2 = [that.ln, that.la];
        var s = AMap.GeometryUtil.distance(cpoint, p2);
        placeSearch.searchNearBy("公交", cpoint, 2000, function(
          status,
          result
        ) {
          // console.log(result);
        });
        
        $(document).ready(function() {
          // 生活的周边查询
          function moren() {
            placeSearch.searchNearBy("购物", cpoint, 2000, function(
              // eslint-disable-line no-unused-vars
              status,
              result
            ) {
              var ht = '<p class="m-type">购物</p>';
              // console.log(ht)
              // console.log(result);
              $.each(result.poiList.pois, function(i, e) {
                // console.log(e);
                var p2 = [e.location.lng, e.location.lat];
                var s = AMap.GeometryUtil.distance(cpoint, p2) / 1000;
                s = s.toFixed(1);
                ht += `
                    <div class="m-te">
                        <h5 class="m-name">${e.name}</h5>
                        <p class="m-ju"><img src="~/assets/path.png" alt="">${s}km</p>
                    </div>
                    `;
              });
              $(".m-l-content").html(ht);
            });
            placeSearch.searchNearBy("美食", cpoint, 2000, function(
              // eslint-disable-line no-unused-vars
              status,
              result
            ) {
              var html = $(".m-l-content").html();
              var ht = '<p class="m-type">美食</p>';
              $.each(result.poiList.pois, function(i, e) {
                // console.log(e);
                var p2 = [e.location.lng, e.location.lat];
                var s = AMap.GeometryUtil.distance(cpoint, p2) / 1000;
                s = s.toFixed(1);
                ht += `
                    <div class="m-te">
                        <h5 class="m-name">${e.name}</h5>
                        <p class="m-ju"><img src="~/assets/path.png" alt="">${s}km</p>
                    </div>
                    `;
              });
              html += ht;
              $(".m-l-content").html(html);
            });
            placeSearch.searchNearBy("超市", cpoint, 2000, function(
              // eslint-disable-line no-unused-vars
              status,
              result
            ) {
              var html = $(".m-l-content").html();
              var ht = '<p class="m-type">超市</p>';
              $.each(result.poiList.pois, function(i, e) {
                // console.log(e);
                var p2 = [e.location.lng, e.location.lat];
                var s = AMap.GeometryUtil.distance(cpoint, p2) / 1000;
                s = s.toFixed(1);
                ht += `
                    <div class="m-te">
                        <h5 class="m-name">${e.name}</h5>
                        <p class="m-ju"><img src="~/assets/path.png" alt="">${s}km</p>
                    </div>
                    `;
              });
              html += ht;
              $(".m-l-content").html(html);
            });
          }
          if (type == 4) {
            moren();
          } else if (type == 1) {
            placeSearch.searchNearBy("地铁", cpoint, 2000, function(
              // eslint-disable-line no-unused-vars
              status,
              result
            ) {
              var html = "";
              var ht = '<p class="m-type">地铁</p>';
              $.each(result.poiList.pois, function(i, e) {
                var p2 = [e.location.lng, e.location.lat];
                var s = AMap.GeometryUtil.distance(cpoint, p2) / 1000;
                s = s.toFixed(1);
                // console.log(e);
                ht += `
                        <div class="m-te">
                            <h5 class="m-name">${e.name}</h5>
                            <p class="m-area">${e.address}</p>
                            <p class="m-ju"><img src="~/assets/path.png" alt="">${s}km</p>
                        </div>
                        `;
              });
              html += ht;
              // console.log(html)
              $(".m-l-content").html(html);
            });
            placeSearch.searchNearBy("公交", cpoint, 2000, function(
              // eslint-disable-line no-unused-vars
              status,
              result
            ) {
              var html = $(".m-l-content").html();
              var ht = '<p class="m-type">公交</p>';
              $.each(result.poiList.pois, function(i, e) {
                var p2 = [e.location.lng, e.location.lat];
                var s = AMap.GeometryUtil.distance(cpoint, p2) / 1000;
                s = s.toFixed(1);
                ht += `
                        <div class="m-te">
                            <h5 class="m-name">${e.name}</h5>
                            <p class="m-area">${e.address}</p>
                            <p class="m-ju"><img src="~/assets/path.png" alt="">${s}km</p>
                        </div>
                        `;
              });
              html += ht;
              $(".m-l-content").html(html);
            });
          } else if (type == 3) {
            placeSearch.searchNearBy("医院", cpoint, 2000, function(
              // eslint-disable-line no-unused-vars
              status,
              result
            ) {
              var ht = '<p class="m-type">医院</p>';
              $.each(result.poiList.pois, function(i, e) {
                var p2 = [e.location.lng, e.location.lat];
                var s = AMap.GeometryUtil.distance(cpoint, p2) / 1000;
                s = s.toFixed(1);
                ht += `
                        <div class="m-te">
                            <h5 class="m-name">${e.name}</h5>
                            <p class="m-ju"><img src="~/assets/path.png" alt="">${s}km</p>
                        </div>
                        `;
              });
              $(".m-l-content").html(ht);
            });
          } else {
            placeSearch.searchNearBy("学校", cpoint, 2000, function(
              // eslint-disable-line no-unused-vars
              status,
              result
            ) {
              var ht = '<p class="m-type">学校</p>';
              $.each(result.poiList.pois, function(i, e) {
                var p2 = [e.location.lng, e.location.lat];
                var s = AMap.GeometryUtil.distance(cpoint, p2) / 1000;
                s = s.toFixed(1);
                ht += `
                        <div class="m-te">
                            <h5 class="m-name">${e.name}</h5>
                            <p class="m-ju"><img src="~/assets/path.png" alt="">${s}km</p>
                        </div>
                        `;
              });
              $(".m-l-content").html(ht);
            });
          }

          $("#list li").on("click", function() {
            $(this)
              .addClass("m-active")
              .siblings("li")
              .removeClass("m-active");
            if ($(this).text() == "生活") {
              moren();
            } else if ($(this).text() == "交通") {
              placeSearch.searchNearBy("地铁", cpoint, 2000, function(
                // eslint-disable-line no-unused-vars
                status,
                result
              ) {
                var html = "";
                var ht = '<p class="m-type">地铁</p>';
                $.each(result.poiList.pois, function(i, e) {
                  var p2 = [e.location.lng, e.location.lat];
                  var s = AMap.GeometryUtil.distance(cpoint, p2) / 1000;
                  s = s.toFixed(1);
                  // console.log(e);
                  ht += `
                        <div class="m-te">
                            <h5 class="m-name">${e.name}</h5>
                            <p class="m-area">${e.address}</p>
                            <p class="m-ju"><img src="~/assets/path.png" alt="">${s}km</p>
                        </div>
                        `;
                });
                html += ht;
                // console.log(html)
                $(".m-l-content").html(html);
              });
              placeSearch.searchNearBy("公交", cpoint, 2000, function(
                // eslint-disable-line no-unused-vars
                status,
                result
              ) {
                var html = $(".m-l-content").html();
                var ht = '<p class="m-type">公交</p>';
                $.each(result.poiList.pois, function(i, e) {
                  var p2 = [e.location.lng, e.location.lat];
                  var s = AMap.GeometryUtil.distance(cpoint, p2) / 1000;
                  s = s.toFixed(1);
                  ht += `
                        <div class="m-te">
                            <h5 class="m-name">${e.name}</h5>
                            <p class="m-area">${e.address}</p>
                            <p class="m-ju"><img src="~/assets/path.png" alt="">${s}km</p>
                        </div>
                        `;
                });
                html += ht;
                $(".m-l-content").html(html);
              });
            } else if ($(this).text() == "医疗") {
              placeSearch.searchNearBy("医院", cpoint, 2000, function(
                // eslint-disable-line no-unused-vars
                status,
                result
              ) {
                var ht = '<p class="m-type">医院</p>';
                $.each(result.poiList.pois, function(i, e) {
                  var p2 = [e.location.lng, e.location.lat];
                  var s = AMap.GeometryUtil.distance(cpoint, p2) / 1000;
                  s = s.toFixed(1);
                  ht += `
                        <div class="m-te">
                            <h5 class="m-name">${e.name}</h5>
                            <p class="m-ju"><img src="~/assets/path.png" alt="">${s}km</p>
                        </div>
                        `;
                });
                $(".m-l-content").html(ht);
              });
            } else if ($(this).text() == "教育") {
              placeSearch.searchNearBy("教育", cpoint, 2000, function(
                // eslint-disable-line no-unused-vars
                status,
                result
              ) {
                var ht = '<p class="m-type">教育</p>';
                $.each(result.poiList.pois, function(i, e) {
                  var p2 = [e.location.lng, e.location.lat];
                  var s = AMap.GeometryUtil.distance(cpoint, p2) / 1000;
                  s = s.toFixed(1);
                  ht += `
                        <div class="m-te">
                            <h5 class="m-name">${e.name}</h5>
                            <p class="m-ju"><img src="~/assets/path.png" alt="">${s}km</p>
                        </div>
                        `;
                });
                $(".m-l-content").html(ht);
              });
            }
          });
        });
      });
    },
    goback() {
      this.$router.go(-1);
    },
    collection(e) {
      let id = e.target.getAttribute("data-v");
      let token = localStorage.getItem("token");
      if (!token) {
        this.$router.push("/" + this.n + "/login");
      }
      let that = this;
      collection({ project: id, token: token })
        .then(resp => {
          if (resp.data.code == 200) {
            $("#fork").hide();
            $("#forked").css("display", "block");
          } else {
            that.$router.push("/" + n + "/login");
            // window.location.href = "/login";
          }
        })
        .then(error => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.baoming=localStorage.getItem('phone');
    let that = this;
    this.start();

    $(".p1").on("click", function() {
      window.type = $(this).attr("data-v");
      if (type == "预约看房") {
        $(".weiter .t-top h6").html(type);
        $(".weiter .t-top p").html(
          "一键预约看房免费小车上门接送，可带家人一起参观多个热门楼盘 "
        );
      }
      that.change = true;
      $(".m-chang").show();
    });

    $("#w-esc").on("click", function() {
      that.change = false;
      $(".m-chang").hide();
    });
    $(".m-chang").on("click", function() {
      that.change = false;
      that.succ = false;
      $(".m-chang").hide();
    });
    

    $(".t-b-btn2").on("click", function() {
      let check=that.checks;
      console.log(check)
      if(!check){
        $('.tishi').show();
        return
      }else{
        $('.tishi').hide();
      }
      var phone = $(this)
        .prev()
        .prev()
        .prev()
        .val();
      var type = $(this)
        .parent()
        .parent()
        .prev()
        .find("h6")
        .html();
      var building_name = $(this)
        .parent()
        .next()
        .find("#building_name")
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
      that.sendmsg(phone);
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
      that.check(ma);
    });
    $("#o_btn").on("click", function() {
      that.succ = false;
      $(".m-chang").hide();
    });
    $(".o-esc").on("click", function() {
      that.succ = false;
      $(".m-chang").hide();
    });
  },
  watch: {
    
  },
  updated(){
    setTimeout(()=>{
      this.zhou();
    },500)
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
.tishi{
  color:red;
  font-size: 10px;
  display: none;
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

.m-continer {
  height: 300px;
}

/* tab栏 */
#list {
  text-align: center;
  position: relative;
  display: flex;
  justify-content: center;
  height: 30px;
  margin-top: 20px;
  margin-bottom: 0;
}

#list li {
  float: left;
  color: #999999;
  font-size: 14px;
  margin-right: 6%;
}
#list li.m-active {
  color: #333333;
  font-size: 16px;
  position: relative;
}
#list li.m-active::after {
  content: "";
  position: absolute;
  top: 26px;
  left: 12.5%;
  background-color: #4db5ff;
  height: 3px;
  width: 25px;
}

/* 详细信息 */
.m-l-content {
  height: 346px;
  overflow: scroll;
  margin-bottom: 25px;
}
.m-l-content >>> .m-type {
  position: relative;
  color: #999999;
  font-size: 15px;
  margin-bottom: 15px;
  margin-left: 4%;
  margin-top: 16px;
}
.m-l-content >>> .m-te {
  position: relative;
  padding: 0 4%;
}
.m-l-content >>> .m-te .m-name {
  font-size: 15px;
  color: #333333;
  font-weight: 500;
  margin-bottom: 8px;
  width: 80%;
}
.m-l-content >>> .m-te .m-area {
  font-size: 12px;
  color: #808080;
}
.m-l-content >>> .m-te .m-ju {
  position: absolute;
  right: 3%;
  top: -3px;
  font-size: 15px;
  color: #808080;
}
.m-l-content >>> .m-te .m-ju img {
  width: 22%;
  margin-right: 10%;
  margin-top: -1px;
}

.weiter {
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



/* 页面底部悬浮 */
/* m-botnav */
.m-botnav {
  width: 100%;
  height: 64px;
  position: fixed;
  bottom: 0;
  background-color: #fff;
  z-index: 200;
  box-shadow: 0px 0px 9px 1px rgba(6, 0, 1, 0.04);
}

.m-botnav p {
  display: inline-block;
  margin-top: 14px;
  margin-left: 9.333333%;
  color: #808080;
  font-size: 10px;
  margin-right: 1.86666667%;
}

.m-botnav p img {
  width: 46%;
  display: block;
}

.m-botnav button {
  display: inline-block;
  position: absolute;
  top: 10px;
  width: 33.06667%;
  height: 44px;
  font-size: 15px;
  border-radius: 5px;
  border: 0px;
  box-shadow:0px 2.5px 5px 0px rgba(255,76,76,0.2);
}

.m-botnav .m-pho {
  background:linear-gradient(90deg,rgba(255,76,76,1),rgba(255,152,106,1));
  color: #fff;
}
.m-botnav .m-pho .ph1 {
  color: #ffffff;
  font-size: 16px;
  margin: 0;
  padding: 0;
}
.m-botnav .m-pho .ph1 img {
  width: 18px;
  display: inline-block;
  margin-right: 4px;
  margin-bottom: 1px;
}
.m-botnav .m-pho .ph2 {
  color: #ffffff;
  font-size: 10px;
  margin: 0;
  padding: 0;
}

.m-botnav .m-y {
  background:linear-gradient(-270deg,rgba(52,138,255,1),rgba(106,204,255,1));
  color: #fff;
  left: 62%;
}
.m-botnav .m-y .ph1 {
  color: #ffffff;
  font-size: 16px;
  margin: 0;
  padding: 0;
}
.m-botnav .m-y .ph1 img {
  width: 18px;
  display: inline-block;
  margin-right: 4px;
  margin-bottom: 1px;
}
.m-botnav .m-y .ph2 {
  color: #ffffff;
  font-size: 10px;
  margin: 0;
  padding: 0;
}
</style>