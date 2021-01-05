<template>
  <div class="Periphery">
    <!-- <no-ssr>
      <remote-js src="https://webapi.amap.com/maps?v=1.4.14&key=729ac4d779c7e625bc11bd5ba3ff3112"></remote-js>
    </no-ssr>-->
    <div class="container-fluid m">
      <div class="m-title visible-xs-block .visible-sm-block">
        <img class="back" src="~/assets/return.png" alt @click="goback" />
        <h3>周边详情</h3>
        <img src="~/assets/mapcai.png" alt class="cai" @click="taggle" />
        <ul class="cailist" v-if="list">
          <li class="cmn">
            <router-link :to="'/' + jkl">
              <span></span>
              <img src="~/assets/barhome.png" />
              <p>首 页</p>
            </router-link>
          </li>
          <li>
            <router-link :to="'/' + jkl + '/search'">
              <img src="~/assets/barsearch.png" />
              <p>楼盘查询</p>
            </router-link>
          </li>
          <li>
            <router-link :to="'/' + jkl + '/participate'">
              <img src="~/assets/tegother.png" />
              <!-- <img src="~/assets/barsearch.png" /> -->
              <p>平台合作</p>
            </router-link>
          </li>
          <li>
            <router-link :to="'/' + jkl + '/encyclopedia/before/56'">
              <img src="~/assets/barke.png" />
              <p>买房百科</p>
            </router-link>
          </li>
          <li>
            <router-link :to="'/' + jkl + '/realinformations/46'">
              <img src="~/assets/barxun.png" />
              <p>房产资讯</p>
            </router-link>
          </li>
        </ul>
      </div>
      <no-ssr>
        <div class="mapbox">
          <div class="m-continer" id="m-container"></div>
          <p class="tel">
            <a :href="'tel:' + call">
              <p>电话</p>
              <p>咨询</p>
            </a>
          </p>
          <p class="yue p1" data-v="预约看房" @click="show">
            <span>预约</span>
            <span>看房</span>
          </p>
        </div>
      </no-ssr>
      <div class="m-z-icons">
        <div class="swiper-map">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div
                :class="mapnum === 0 ? 'tegood active' : 'tegood'"
                @click="setmap(0, '地铁')"
              >
                地铁
                <i></i>
              </div>
            </div>
            <div class="swiper-slide">
              <div
                :class="mapnum === 1 ? 'tegood active' : 'tegood'"
                @click="setmap(1, '公交')"
              >
                公交
                <i></i>
              </div>
            </div>
            <div class="swiper-slide">
              <div
                :class="mapnum === 2 ? 'tegood active' : 'tegood'"
                @click="setmap(2, '教育')"
              >
                教育
                <i></i>
              </div>
            </div>
            <div class="swiper-slide">
              <div
                :class="mapnum === 3 ? 'tegood active' : 'tegood'"
                @click="setmap(3, '医院')"
              >
                医院
                <i></i>
              </div>
            </div>
            <div class="swiper-slide">
              <div
                :class="mapnum === 4 ? 'tegood active' : 'tegood'"
                @click="setmap(4, '购物')"
              >
                购物
                <i></i>
              </div>
            </div>
            <div class="swiper-slide">
              <div
                :class="mapnum === 5 ? 'tegood active' : 'tegood'"
                @click="setmap(5, '美食')"
              >
                美食
                <i></i>
              </div>
            </div>
            <div class="swiper-slide">
              <div
                :class="mapnum === 6 ? 'tegood active' : 'tegood'"
                @click="setmap(6, '娱乐')"
              >
                娱乐
                <i></i>
              </div>
            </div>
          </div>
        </div>
        <div class="map-con">
          <ul class="con"></ul>
          <p class="msg" v-show="isnull">
            附近没有{{ mapname }}，您可以看看其他信息
          </p>
        </div>
      </div>
      <div id="panel" style="display: none"></div>
      <div class="m-container"></div>
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
                <input
                  class="l-p"
                  type="tel"
                  placeholder="输入预约手机号码"
                  v-model="baoming"
                />
                <p class="w-mg">
                  <input
                    class="w-mg-c"
                    type="checkbox"
                    checked
                    v-model="checks"
                  />我已阅读并同意
                  <router-link :to="'/' + jkl + '/server'">
                    <a href="javasript:;">《允家新房用户协议》</a>
                  </router-link>
                </p>
                <p class="tishi">请勾选用户协议</p>
                <button
                  class="t-b-btn t-b-btn2 bg_01"
                  id="dingxue"
                  @click="sendmsg"
                >
                  立即订阅
                </button>
                <p class="w-tit">
                  <img src="~/assets/w-call.png" />允家严格保障您的信息安全
                </p>
              </div>
              <div class="t-b-second">
                <p>
                  验证码已发送到
                  <span id="ytel">187****4376</span>，请注意查看
                </p>
                <input
                  type="text"
                  placeholder="请输入验证码"
                  id="ma-ll"
                  v-model="ma"
                />
                <button class="port1" @click="check">确定</button>
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
    <div class="tsmsg" v-show="tstype">{{ tsmsg }}</div>
    <transition name="change">
      <div class="hengda" v-show="ishengda">
        <img class="del" src="~/assets/w-del.png" alt @click="guanbi" />
        <img src="~/assets/hengda.png" alt class="topimg" />
        <input
          type="text"
          placeholder="输入身份证号后6位"
          maxlength="6"
          v-model="IDcode"
        />
        <p class="zhu">
          注: 根据本楼盘售楼处规定，实地看房需先提前报备 身份证后6位
        </p>
        <button @click="hengda">申请报备</button>
      </div>
    </transition>
    <!-- <div id="Footer">
      <p>杭州易得房科技有限公司版权所有 电话：400-966-9995</p>
      <p>
        <img src="~/assets/f-logo.png" />网络经营许可证：
        <a href="http://www.beian.miit.gov.cn/">
          <span>浙ICP备18057005号</span>
        </a>
      </p>
    </div>-->
  </div>
</template>
<script>
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
import {
  ip,
  periphery_data,
  msg,
  trend_put,
  verification,
  collection,
  hengda,
} from "~/api/api";
export default {
  name: "Periphery",
  components: {
    "remote-js": {
      render(createElement) {
        return createElement("script", {
          attrs: { type: "text/javascript", src: this.src },
        });
      },
      props: {
        src: { type: String, required: true },
      },
    },
  },
  async asyncData(context) {
    let jkl = context.store.state.cookie.pinyin;
    return {
      jkl: jkl,
      checks: false,
    };
  },
  head() {
    return {
      title: "允家新房-周边详情",
      meta: [
        {
          name: "description",
          content: "允家新房",
        },
        {
          name: "keywords",
          content: "允家新房",
        },
      ],
    };
  },
  data() {
    return {
      baoming: "",
      change: false,
      succ: false,
      defaultHeight: "0",
      nowHeight: "0",
      ip: "",
      la: "",
      ln: "",
      call: "",
      type: "",
      id: "",
      checks: "",
      jkl: "",
      mapnum: 0,
      mapname: "地铁",
      isnull: false,
      list: false,
      timename: {},
      isover: true,
      ishengda: false,
      IDcode: "",
      tstype: false,
      tsmsg: "",
      ma: "",
    };
  },
  methods: {
    setmap(id, name) {
      this.mapnum = id;
      this.mapname = name;
      this.mmap();
    },
    mmap() {
      this.over = false;
      let name = this.mapname;
      let that = this;
      let baidu = [that.ln, that.la];
      let img = require("~/assets/mappro.png");
      let pro = $cookies.get("name") ? $cookies.get("name") : "楼盘地址";
      let add = $cookies.get("address")
        ? $cookies.get("address")
        : "详细楼盘地址到详情页";
      AMap.convertFrom(baidu, "baidu", function (status, result) {
        if (result.info === "ok") {
          var lnglats = result.locations; // Array.<LngLat>
          that.pois = [lnglats[0].lng, lnglats[0].lat];
          var map = new AMap.Map("m-container", {
            zoom: 14, //初始化地图层级
            center: that.pois, //初始化地图中心点
            zoomEnable: false,
            dragEnable: false,
          });
          let content = `<div
          style="width:140px;height: 36px;box-shadow:0px 0px 5px 0px rgba(6,0,1,0.1);border-radius:18px;padding-left: 17px;position: relative;background: #fff;">
          <div style="float: left;width:72%">
            <h5 style="color: #121212;font-size: 12px;margin:0;margin-top: 4px;margin-bottom: 2px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">${pro}</h5>
            <p style="color: #919499;font-size: 10px;margin:0;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">${add}</p>
          </div>
          <div style="float: left;"><img style="width: 29px;margin-top:3px" src="${img}" alt=""></div>
          <div
            style="position: absolute;border:8px solid transparent;border-top-color: #fff;bottom:-16px;left:50%;margin-left: -8px;">
          </div>
        </div>`;
          let marker = new AMap.Marker({
            content: content,
            position: that.pois,
            offset: new AMap.Pixel(-70, -44),
          });
          let con =
            '<div style="width: 24px;height: 24px;border-radius: 50%;background:rgba(71,161,255,0.3);position: relative;"><div style="width: 6px;height: 6px;border-radius: 50%;background:rgba(71,161,255,1);position: absolute;top:50%;left:50%;margin-top: -3px;margin-left: -3px;"></div></div>';
          let mark = new AMap.Marker({
            content: con,
            position: that.pois,
            offset: new AMap.Pixel(-12, -12),
          });
          mark.setMap(map);
          marker.setMap(map);

          AMap.service(["AMap.PlaceSearch"], function () {
            // eslint-disable-line no-unused-vars
            //构造地点查询类
            var placeSearch = new AMap.PlaceSearch({
              pageSize: 10, // 单页显示结果条数
              pageIndex: 1, // 页码
              city: "", // 兴趣点城市
              citylimit: false, //是否强制限制在设置的城市内搜索
              map: map, // 展现结果的地图实例
              panel: "panel", // 结果列表将在此容器中进行展示。
              autoFitView: false, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
            });

            var cpoint = that.pois; //中心点坐标
            placeSearch.searchNearBy(name, cpoint, 2000, function (
              // eslint-disable-line no-unused-vars
              status,
              result
            ) {
              var ht = "";
              // console.log(ht)
              let img = require("~/assets/path.png");
              if (JSON.stringify(result) == "{}") {
                that.isnull = true;
                that.setzhou(name, 0);
              } else {
                that.isnull = false;
                that.setzhou(name, result.poiList.pois.length);
                $.each(result.poiList.pois, function (i, e) {
                  var p2 = [e.location.lng, e.location.lat];
                  var s = AMap.GeometryUtil.distance(cpoint, p2) / 1000;
                  s = s.toFixed(1);
                  ht += `
                    <li>
                      <h5>${e.name}</h5>
                      <p>${e.address} <span><img src="${img}">${s}km</span></p>
                    </li>
                    `;
                });
              }
              $(".con").html(ht);
            });
          });
        }
      });
    },
    setzhou(name, num) {
      let that = this;
      switch (name) {
        case "地铁":
          that.ditie = num;
          break;
        case "公交":
          that.gongjiao = num;
          break;
        case "教育":
          that.jiaoyus = num;
          break;
        case "医院":
          that.yiyuan = num;
          break;
        case "购物":
          that.gouwu = num;
          break;
        case "美食":
          that.meishi = num;
          break;
        case "娱乐":
          that.yule = num;
          break;
      }
    },
    start() {
      let id = this.$route.params.id;
      this.id = id;
      let that = this;
      let collect = localStorage.getItem(id);
      if (collect == 0) {
        $("#fork").show();
        $("#forked").hide();
      } else {
        $("#fork").hide();
        $("#forked").css("display", "block");
      }
      let IP = localStorage.getItem("ip");
      periphery_data({ ip: IP, platform: 2, id: id })
        .then((resp) => {
          let data = resp.data.data;
          that.la = data.latitude;
          that.ln = data.longitude;
          that.call = data.phone;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    sendmsg() {
      let check = this.checks;
      if (!check) {
        $(".tishi").show();
        return;
      } else {
        $(".tishi").hide();
      }
      let t = this.baoming;
      let pattern_phone = /^1[3-9][0-9]{9}$/;
      if (t == "") {
        $(".l-p").attr("placeholder", "手机号不能为空");
        return;
      } else if (!pattern_phone.test(t)) {
        $(".l-p").val("");
        $(".l-p").attr("placeholder", "手机号码不合法");
        return;
      }
      let that = this;
      let ip = ip_arr["ip"];
      let c = localStorage.getItem("city");
      let p = that.page;
      let tel = t;
      let kid = sessionStorage.getItem("kid");
      let other = sessionStorage.getItem("other");
      let id = this.$route.params.id;
      trend_put({
        ip: ip,
        tel: tel,
        city: c,
        position: 5,
        page: 3,
        type: 9,
        kid: kid,
        other: other,
        project: id,
      })
        .then((resp) => {
          if (resp.data.code == 200) {
            msg({ phone: t, channel: 2 })
              .then((resp) => {
                if (resp.data.code == 200) {
                  $(".t-b-first").hide();
                  $(".t-b-second").show();
                  var time = 60;
                  tel = t.substr(0, 3) + "****" + t.substr(7, 11);
                  var fn = function () {
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
                } else {
                  $(".l-p").val("");
                  $(".l-p").attr("placeholder", "报名失败");
                }
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            this.$toast("请不要重复报名");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    check() {
      var ma = this.ma;
      if (!ma) {
        this.tsmsg = "验证码不能为空";
        this.tstype = true;
        setTimeout(() => {
          that.tstype = false;
        }, 1000);
        return;
      }
      let tel = this.baoming;
      let that = this;
      verification({ phone: tel, code: ma, channel: 2 })
        .then((resp) => {
          if (resp.data.code == 200) {
            that.change = false;
            if (
              sessionStorage.getItem("proname") &&
              sessionStorage.getItem("proname").indexOf("恒大") !== -1
            ) {
              that.ishengda = true;
            } else {
              that.succ = true;
            }
          } else {
            $("#ma-ll").val("");
            $("#ma-ll").attr("placeholder", "验证码不正确");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    hengda() {
      let tel = this.baoming;
      let that = this;
      if (that.IDcode == "") {
        this.tsmsg = "请输入身份证后六位";
        this.tstype = true;
        setTimeout(() => {
          that.tstype = false;
        }, 1000);
      } else {
        hengda({ identity: that.IDcode, phone: tel }).then((res) => {
          if (res.data.code == 200) {
            that.tsmsg = res.data.message;
            that.tstype = true;
            setTimeout(() => {
              that.tstype = false;
              that.ishengda = false;
              that.guanbi();
            }, 1000);
          }
        });
      }
    },
    guanbi() {
      $(".t-b-first").show();
      $(".t-b-second").hide();
      $(".m-chang").hide();
      $(".hengda").hide();
    },
    zhou() {
      let that = this;
      let baidu = [that.ln, that.la];
      AMap.convertFrom(baidu, "baidu", function (status, result) {
        if (result.info === "ok") {
          var lnglats = result.locations; // Array.<LngLat>
          let la = lnglats[0].lat;
          let ln = lnglats[0].lng;

          let type = that.$route.params.type;
          that.type = type;
          var map = new AMap.Map("m-container", {
            // eslint-disable-line no-unused-vars
            resizeEnable: true,
            center: [ln, la],
            zoom: 15,
          });
          let img = require("~/assets/mappro.png");
          let pro = $cookies.get("name") ? $cookies.get("name") : "楼盘地址";
          let add = $cookies.get("address")
            ? $cookies.get("address")
            : "详细楼盘地址到详情页";
          let content = `<div
          style="width:140px;height: 36px;box-shadow:0px 0px 5px 0px rgba(6,0,1,0.1);border-radius:18px;padding-left: 17px;position: relative;background: #fff;">
          <div style="float: left;width:72%">
            <h5 style="color: #121212;font-size: 12px;margin:0;margin-top: 4px;margin-bottom: 2px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">${pro}</h5>
            <p style="color: #919499;font-size: 10px;margin:0;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">${add}</p>
          </div>
          <div style="float: left;"><img style="width: 29px;margin-top:3px" src="${img}" alt=""></div>
          <div
            style="position: absolute;border:8px solid transparent;border-top-color: #fff;bottom:-16px;left:50%;margin-left: -8px;">
          </div>
        </div>`;
          let marker = new AMap.Marker({
            content: content,
            position: that.pois,
            offset: new AMap.Pixel(-70, -44),
          });
          let con =
            '<div style="width: 24px;height: 24px;border-radius: 50%;background:rgba(71,161,255,0.3);position: relative;"><div style="width: 6px;height: 6px;border-radius: 50%;background:rgba(71,161,255,1);position: absolute;top:50%;left:50%;margin-top: -3px;margin-left: -3px;"></div></div>';
          let mark = new AMap.Marker({
            content: con,
            position: that.pois,
            offset: new AMap.Pixel(-12, -12),
          });
          mark.setMap(map);
          marker.setMap(map);
          AMap.service(["AMap.PlaceSearch"], function () {
            // eslint-disable-line no-unused-vars
            //构造地点查询类
            var placeSearch = new AMap.PlaceSearch({
              pageSize: 10, // 单页显示结果条数
              pageIndex: 1, // 页码
              city: "", // 兴趣点城市
              citylimit: false, //是否强制限制在设置的城市内搜索
              map: map, // 展现结果的地图实例
              panel: "panel", // 结果列表将在此容器中进行展示。
              autoFitView: true, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
            });

            var cpoint = [ln, la]; //中心点坐标
            var p2 = [ln, la];
            var s = AMap.GeometryUtil.distance(cpoint, p2);
            placeSearch.searchNearBy("公交", cpoint, 2000, function (
              status,
              result
            ) {
              // console.log(result);
            });

            $(document).ready(function () {
              // 生活的周边查询
              function moren() {
                placeSearch.searchNearBy("购物", cpoint, 2000, function (
                  // eslint-disable-line no-unused-vars
                  status,
                  result
                ) {
                  var ht = '<p class="m-type">购物</p>';
                  // console.log(ht)
                  // console.log(result);
                  $.each(result.poiList.pois, function (i, e) {
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
                placeSearch.searchNearBy("美食", cpoint, 2000, function (
                  // eslint-disable-line no-unused-vars
                  status,
                  result
                ) {
                  var html = $(".m-l-content").html();
                  var ht = '<p class="m-type">美食</p>';
                  $.each(result.poiList.pois, function (i, e) {
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
                placeSearch.searchNearBy("超市", cpoint, 2000, function (
                  // eslint-disable-line no-unused-vars
                  status,
                  result
                ) {
                  var html = $(".m-l-content").html();
                  var ht = '<p class="m-type">超市</p>';
                  $.each(result.poiList.pois, function (i, e) {
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
                placeSearch.searchNearBy("地铁", cpoint, 2000, function (
                  // eslint-disable-line no-unused-vars
                  status,
                  result
                ) {
                  var html = "";
                  var ht = '<p class="m-type">地铁</p>';
                  $.each(result.poiList.pois, function (i, e) {
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
                placeSearch.searchNearBy("公交", cpoint, 2000, function (
                  // eslint-disable-line no-unused-vars
                  status,
                  result
                ) {
                  var html = $(".m-l-content").html();
                  var ht = '<p class="m-type">公交</p>';
                  $.each(result.poiList.pois, function (i, e) {
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
                placeSearch.searchNearBy("医院", cpoint, 2000, function (
                  // eslint-disable-line no-unused-vars
                  status,
                  result
                ) {
                  var ht = '<p class="m-type">医院</p>';
                  $.each(result.poiList.pois, function (i, e) {
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
                placeSearch.searchNearBy("学校", cpoint, 2000, function (
                  // eslint-disable-line no-unused-vars
                  status,
                  result
                ) {
                  var ht = '<p class="m-type">学校</p>';
                  $.each(result.poiList.pois, function (i, e) {
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

              $("#list li").on("click", function () {
                $(this)
                  .addClass("m-active")
                  .siblings("li")
                  .removeClass("m-active");
                if ($(this).text() == "生活") {
                  moren();
                } else if ($(this).text() == "交通") {
                  placeSearch.searchNearBy("地铁", cpoint, 2000, function (
                    // eslint-disable-line no-unused-vars
                    status,
                    result
                  ) {
                    var html = "";
                    var ht = '<p class="m-type">地铁</p>';
                    $.each(result.poiList.pois, function (i, e) {
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
                  placeSearch.searchNearBy("公交", cpoint, 2000, function (
                    // eslint-disable-line no-unused-vars
                    status,
                    result
                  ) {
                    var html = $(".m-l-content").html();
                    var ht = '<p class="m-type">公交</p>';
                    $.each(result.poiList.pois, function (i, e) {
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
                  placeSearch.searchNearBy("医院", cpoint, 2000, function (
                    // eslint-disable-line no-unused-vars
                    status,
                    result
                  ) {
                    var ht = '<p class="m-type">医院</p>';
                    $.each(result.poiList.pois, function (i, e) {
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
                  placeSearch.searchNearBy("教育", cpoint, 2000, function (
                    // eslint-disable-line no-unused-vars
                    status,
                    result
                  ) {
                    var ht = '<p class="m-type">教育</p>';
                    $.each(result.poiList.pois, function (i, e) {
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
        }
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
        .then((resp) => {
          if (resp.data.code == 200) {
            $("#fork").hide();
            $("#forked").css("display", "block");
          } else {
            that.$router.push("/" + n + "/login");
            // window.location.href = "/login";
          }
        })
        .then((error) => {
          console.log(error);
        });
    },
    show() {
      this.change = true;
      $(".m-chang").show();
    },
    taggle() {
      if (this.list) {
        this.list = false;
      } else {
        this.list = true;
      }
    },
  },
  mounted() {
    this.baoming = localStorage.getItem("phone");
    let that = this;
    this.start();
    var swiper08 = new Swiper(".swiper-map", {
      slidesPerView: 4.8,
      spaceBetween: 10,
      observer: true,
      slidesOffsetAfter: 12,
      resistanceRatio: 0.1,
      slidesOffsetBefore: 14,
    });
    $(".p1").on("click", function () {
      that.change = true;
      $(".m-chang").show();
    });

    $("#w-esc").on("click", function () {
      $(".m-chang").hide();
      $(".weiter").hide();
      $(".m-o-succ").hide();
    });
    $(".m-chang").on("click", function () {
      console.log(123);
      that.change = false;
      that.succ = false;
      $(".m-chang").hide();
    });

    $(".t-b-btn2").on("click", function () {
      let check = that.checks;
      console.log(check);
      if (!check) {
        $(".tishi").show();
        return;
      } else {
        $(".tishi").hide();
      }
      var phone = $(this).prev().prev().prev().val();
      var type = $(this).parent().parent().prev().find("h6").html();
      var building_name = $(this).parent().next().find("#building_name").val();
      var pattern_phone = /^1[3-9][0-9]{9}$/;
      if (phone == "") {
        $(".l-p").attr("placeholder", "手机号不能为空");
        return;
      } else if (!pattern_phone.test(phone)) {
        $(".l-p").val("");
        $(".l-p").attr("placeholder", "手机号码不合法");
        return;
      }
    });
    $(".port1").on("click", function () {
      that.check(ma);
    });
    $("#o_btn").on("click", function () {
      that.succ = false;
      $(".m-chang").hide();
    });
    $(".o-esc").on("click", function () {
      that.succ = false;
      $(".m-chang").hide();
    });
  },
  watch: {},
  updated() {
    if (this.isover) {
      this.isover = false;
      this.timename = setTimeout(() => {
        // this.zhou();
        this.mmap();
      }, 500);
    }
  },
  beforeDestroy() {
    clearTimeout(this.timename);
  },
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
.tishi {
  color: red;
  font-size: 10px;
  display: none;
}
#Foot {
  margin-bottom: 56px;
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
.m-title .back {
  position: absolute;
  width: 5%;
  margin-top: 14px;
  left: 5.3333%;
}
.m-title .cai {
  position: absolute;
  width: 5%;
  top: 14px;
  right: 5.33%;
}
.m-title h3 {
  color: #333333;
  font-size: 18px;
  margin: 0;
  font-weight: bold;
  line-height: 44px;
}
.m-title .cailist {
  width: 9.375rem;
  background: rgba(41, 41, 41, 0.9);
  position: absolute;
  top: 2.5rem;
  border-radius: 0.375rem;
  z-index: 20000;
  right: 4%;
}
.m-title .cailist li {
  position: relative;
  color: #e6e6e6;
  font-size: 0.9375rem;
  line-height: 3.125rem;
}
.m-title .cailist li a {
  width: 100%;
  display: flex;
  align-items: center;
}
.m-title .cailist li.cmn span {
  display: block;
  border: 0.4375rem solid transparent;
  border-bottom-color: rgba(41, 41, 41, 0.9);
  position: absolute;
  top: -0.875rem;
  right: 0.625rem;
}
.m-title .cailist li p {
  border-bottom: 0.5px solid #545454;
  flex: 1;
}
.m-title .cailist li img {
  width: 1.125rem;
  margin: 0;
  margin-left: 1.625rem;
  margin-right: 0.875rem;
  height: 1.125rem;
}
.m-continer {
  height: 30rem;
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
  box-shadow: 0px 2.5px 5px 0px rgba(255, 76, 76, 0.2);
}

.m-botnav .m-pho {
  background: linear-gradient(
    90deg,
    rgba(255, 76, 76, 1),
    rgba(255, 152, 106, 1)
  );
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
  background: linear-gradient(
    -270deg,
    rgba(52, 138, 255, 1),
    rgba(106, 204, 255, 1)
  );
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
.m-z-icons {
  margin-bottom: 24px;
  margin-top: 1rem;
}

.m-z-icons .swiper-map {
  padding-bottom: 10px;
  border-bottom: 0.5px solid #f4f4f4;
  overflow: hidden;
}

.m-z-icons .swiper-map .tegood {
  font-size: 0.9375rem;
  height: 23px;
  color: #4c4c4c;
}

.m-z-icons .swiper-map .active {
  color: #3dabef;
  position: relative;
}

.m-z-icons .swiper-map .active i {
  display: block;
  position: absolute;
  width: 25px;
  height: 2px;
  background-color: #3dabef;
  bottom: -1px;
  left: 2px;
}

.m-z-icons .map-con .msg {
  height: 11.875rem;
  width: 100%;
  line-height: 11.875rem;
  text-align: center;
}
.m-z-icons .map-con ul {
  max-height: 11.875rem;
  overflow-y: auto;
}

.m-z-icons .map-con >>> li {
  margin-top: 18px;
  padding: 0 4%;
}

.m-z-icons .map-con >>> li h5 {
  color: #191919;
  font-size: 1rem;
  margin-bottom: 6px;
  margin-top: 12px;
}

.m-z-icons .map-con >>> li p {
  color: #999999;
  font-size: 0.8125rem;
}

.m-z-icons .map-con >>> li p span {
  float: right;
}

.m-z-icons .map-con >>> li p span img {
  width: 14px;
  margin-right: 2px;
  margin-bottom: 2px;
}
.mapbox {
  width: 100%;
  height: 30rem;
  position: relative;
}
.tel {
  position: absolute;
  right: 0.9375rem;
  bottom: 5rem;
  width: 2.875rem;
  height: 2.875rem;
  border-radius: 50%;
  text-align: center;
  background-color: #fff;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.15);
  padding-top: 0.4375rem;
}
.tel a {
  color: #333333;
  font-size: 0.75rem;
  word-wrap: break-word;
}
.yue {
  position: absolute;
  right: 0.9375rem;
  bottom: 0.9375rem;
  width: 2.875rem;
  height: 2.875rem;
  border-radius: 50%;
  text-align: center;
  background-color: #fff;
  padding-top: 0.4375rem;
  color: #333333;
  font-size: 0.75rem;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.15);
}
.yue span {
  display: block;
}
#Footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fff;
}
#Footer p {
  color: #929aa7;
  font-size: 12px;
  text-align: center;
  margin-bottom: 6px;
}
#Footer p img {
  width: 6%;
  margin-right: 2%;
}
#Footer p a {
  color: #6a7b97;
  text-decoration: underline;
}
.tsmsg {
  width: 10.625rem;
  height: 3.75rem;
  position: fixed;
  top: 50%;
  margin-top: -1.875rem;
  left: 50%;
  margin-left: -5.3125rem;
  border-radius: 0.375rem;
  text-align: center;
  line-height: 3.75rem;
  background: rgba(0, 0, 0, 0.8);
  color: #cdcdcd;
  font-size: 1rem;
  z-index: 55555;
}
.hengda {
  width: 20.3125rem;
  height: 23.4375rem;
  border-radius: 0.375rem;
  background-color: #fff;
  position: fixed;
  left: 50%;
  margin-left: -10.15625rem;
  top: 24%;
  z-index: 5555;
  padding-top: 2.8125rem;
}
.hengda .del {
  width: 0.875rem;
  position: absolute;
  right: 1rem;
  top: 1rem;
}
.hengda .topimg {
  width: 16.875rem;
  margin-left: 1.6875rem;
  margin-bottom: 2.5rem;
}
.hengda input {
  width: 17rem;
  height: 3.53125rem;
  border-radius: 0.25rem;
  border: 0.09375rem solid #cccccc;
  outline: none;
  padding-left: 1rem;
  margin-left: 1.625rem;
  margin-bottom: 0.875rem;
}
.hengda .zhu {
  color: #ff3333;
  font-size: 0.75rem;
  width: 16.875rem;
  margin-left: 1.6875rem;
  line-height: 1.125rem;
  margin-bottom: 1.875rem;
}
.hengda button {
  width: 16.875rem;
  height: 2.75rem;
  border-radius: 0.25rem;
  text-align: center;
  line-height: 2.75rem;
  border: 0;
  color: #fff;
  font-size: 0.875rem;
  font-weight: bold;
  background: #40a2f4;
  margin-left: 1.6875rem;
}
</style>