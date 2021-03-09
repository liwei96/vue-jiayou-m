<template>
  <div class="Map">
    <div class="top">
      <img class="back" src="~/assets/return.png" alt />
      <input class="inpu" type="button" value="请输入楼盘名称" @click="gosearch"/>
      <img class="search" src="~/assets/search.png" alt />
      <div class="sou_box">
        <ul class="select">
          <li class="click_qu">
            区域
            <span class="iconfont iconxiajiantoushixinxiao"></span>
          </li>
          <li class="click_price">
            价格
            <span class="iconfont iconxiajiantoushixinxiao"></span>
          </li>
          <li class="click_huxing">
            户型
            <span class="iconfont iconxiajiantoushixinxiao"></span>
          </li>
          <li class="click_shai">
            筛选
            <span class="iconfont iconxiajiantoushixinxiao"></span>
          </li>
        </ul>

        <div class="select-list">
          <!-- 区域列表 -->
          <div class="quyu-list">
            <ul class="qu-left">
              <li class="qu_active">城区</li>
              <li>地铁</li>
            </ul>

            <ul class="qu-right qu-quyu">
              <li :class="num6==0?'m-l-active':''" data-v="0" @click="qu($event)">不限</li>
              <li
                :class="q1==item.id?'active':''"
                v-for="(item,key) in citys"
                :key="key"
                @click="qu($event)"
                :data-v="item.id"
              >{{item.name}}</li>
            </ul>
            <ul class="qu-right qu-ditie">
              <li :class="num7==0?'m-l-active':''" data-v="0" @click="tie($event)">不限</li>
              <li
                :class="d1==item.id?'active':''"
                v-for="(item,key) in dities"
                :key="key"
                @click="tie($event)"
                :data-v="item.id"
              >{{item.name}}</li>
            </ul>
          </div>
          <!-- 价格 列表 -->
          <div class="price-list">
            <ul class="price-left">
              <li class="qu_active">总价</li>
              <li>单价</li>
            </ul>

            <ul class="price-right price-zong">
              <li :class="num4==0?'m-l-active':''" data-v="0" @click="zong($event)">不限</li>
              <li
                :class="z1==item.id?'active':''"
                v-for="(item,key) in total_prices"
                :key="key"
                @click="zong($event)"
                :data-v="item.id"
              >{{item.name}}</li>
            </ul>
            <ul class="price-right price-dan">
              <li :class="num5==0?'m-l-active':''" data-v="0" @click="dan($event)">不限</li>
              <li
                :class="dan1==item.id?'active':''"
                v-for="(item,key) in single_prices"
                :key="key"
                @click="dan($event)"
                :data-v="item.id"
              >{{item.name}}</li>
            </ul>
          </div>
          <!-- 户型列表 -->
          <div class="huxing_list">
            <ul class="huxing_top">
              <li v-for="hu in apartments" :key="hu.id" class="col-xs-12 col-sm-12">
                <span>{{hu.name}}</span>
                <input type="checkbox" name="hu" v-model="hus" :value="hu.id" />
              </li>
            </ul>
            <div class="huxing_btn huxing_que">
              <span class="m-h-l" @click="clear1">清空</span>
              <span class="m-h-r" @click="hu">确定</span>
            </div>
          </div>
          <!-- 筛选列表 -->
          <div class="shaixuan_list">
            <div class="hua">
              <h2>类型</h2>
              <ul class="type bgg">
                <li
                  :class="t1==key?'active':''"
                  v-for="(item,key) in build_types"
                  :data-v="key"
                  :key="key"
                  @click="tp($event)"
                >{{item.type}}</li>
              </ul>
              <!-- <h2>开发商</h2>
              <ul class="kaifa bgg">
                <li>万科</li>
                <li>碧桂园</li>
              </ul> -->
              <h2>特色</h2>
              <ul class="tese bgg">
                <li
                  :class="s1==item.id?'active':''"
                  v-for="(item,key) in features"
                  :key="key"
                  :data-v="item.id"
                  @click="se($event)"
                >{{item.name}}</li>
              </ul>
            </div>
            <div class="huxing_btn shaixuan">
              <span class="m-h-l" @click="clear2">清空</span>
              <span class="m-h-r" @click="shai">确定</span>
            </div>
          </div>
          <!-- 排序列表 -->

          <div class="zhao"></div>
        </div>
        <div class="number">
          <p>
            可视范围内找到
            <span id="ks">{{city}}</span> 个楼盘, 当前城市共找到
            <span id="city">{{all}}</span> 个
          </p>
        </div>
      </div>
    </div>
    <baidu-map
      class="bm-view"
      :center="cityname"
      :zoom="zoom"
      @ready="handler"
      @zoomend="getzoom"
      @moving="getzoom"
      @touchmove="move"
      @touchend="moved"
    >
      <bm-navigation anchor="BMAP_ANCHOR_CENTER_RIGHT" :enableGeolocation="show"></bm-navigation>
      <template v-if="zoom<14">
        <my-overlay
          v-for="(item,index) in point"
          :key="index"
          :position="item"
          :text="` <h4 id='m_name'> ${item.country || item.street }</h4>
                 <p id='m_price'>${(item.price/10000).toFixed(2)}万元/m²</p>
                 <p id='m_num'>${item.Num}个楼盘</p>
                 `"
          :active="active"
          @mouseover.native="active = true"
          @mouseleave.native="active = false"
          @click.native="changezoom(item)"
        ></my-overlay>
      </template>
      <template v-else>
        <my-overlays
          v-for="(item,index) in point"
          :key="index"
          :position="item"
          :text="` <h4 id='b_name'> ${item.building_name}</h4>
                 <p id='b_price'>价钱：约${parseInt(item.price)}元/m²</p>
                 `"
          :active="active"
          :projectid="item.id"
          @click.native="putid(item.id,$event)"
        ></my-overlays>
      </template>
    </baidu-map>
    <div class="project" v-if="pro">
      <router-link :to="'/'+n+'/content/'+building.id">
      <div class="re-list">
        <div class="re-con-left">
          <img :src="building.img" />
          <span>
            <i class="iconfont iconyanjing"></i>
            {{building.count}}
          </span>
        </div>
        <div class="re-con-right">
          <h5>
            {{building.name}}
            <span>{{building.status}}</span>
          </h5>
          <p class="price">
            <span>{{building.single_price}}</span>元/m²
          </p>
          <p class="area">
            <span>{{building.area_name}}</span>
            <span>建面</span>
            <span>
              {{building.area}}m²
            </span>
          </p>
          <p class="tabs">
            <span class="strong">{{building.decorate}}</span>
            <span v-if="building.railways">{{building.railways}}</span>
            <span v-if="building.features">{{building.features}}</span>
          </p>
        </div>
      </div>
      </router-link>
    </div>
  </div>
</template>
<script>
import MyOverlay from "@/components/MyOverlay";
import MyOverlays from "@/components/MyOverlays";

import { search_start, mapSaerch, mapSearch, content_data,mapProject } from "~/api/api";
export default {
  name: "Map",
  components: {
    MyOverlay,
    MyOverlays
  },
  head(){
    return {
      title:  '家园新房-地图找房',
      meta: [
        {
          name: "description",
          content:  '家园新房'
        },
        {
          name: "Keywords",
          content:  '家园新房'
        }
      ]
    }
  },
  data() {
    return {
      zoom: 12,
      show: true,
      active: false,
      point: [
        { lng: 120.151694, lat: 30.323685 },
        { lng: 120.140771, lat: 30.122969 },
        { lng: 120.080405, lat: 30.269303 }
      ],
      citys: [],
      dities: [],
      single_prices: [],
      total_prices: [],
      apartments: [],
      build_types: [],
      features: [],
      hus: [],
      flag: true,
      flag1: true,
      flag2: true,
      flag3: true,
      flag4: true,
      q1: "",
      d1: "",
      z1: "",
      dan1: "",
      t1: -1,
      s1: -1,
      type: "",
      te: "",
      all: 0,
      now: 0,
      cityname: "",
      building: {},
      pro: false,
      n:'',
      map:{},
      Bmap:{},
      level:1,
      city:0,
      num5:'',
      num4:'',
      num7:'',
      num6:'',
      
    };
  },
  created() {
    if(process.client){
      let name = localStorage.getItem("cityname");
      if(name){
        this.cityname = name;
      }else{
        name = returnCitySN["cname"];
        this.cityname = name.substr(3,2);
        localStorage.setItem('cityname',this.cityname)
      }
      console.log(name)
      this.n=localStorage.getItem('pinyin');
    } 
    
  },
  methods: {
    handler({ BMap, map }) {
      this.Bmap=BMap
      map.disableDragging();
    },
    getzoom(e) {
      this.map=e.target;
      let con = e.target.getBounds();
      var bssw = con.getSouthWest(); //可视区域左下角
      var bsne = con.getNorthEast(); //可视区域右上角
      var zoom = e.target.getZoom();
      this.zoom = zoom;
      let ip = localStorage.getItem("ip");
      let city = localStorage.getItem("city");
      let token = localStorage.getItem("token");
      let left_bottom_lng = bssw.lng;
      let left_bottom_lat = bssw.lat;
      let right_top_lng = bsne.lng;
      let right_top_lat = bsne.lat;
      let mapwhere = $cookies.get("mapwhere");
      if (mapwhere) {
        mapwhere.left_bottom_lng = left_bottom_lng;
        mapwhere.left_bottom_lat = left_bottom_lat;
        mapwhere.right_top_lng = right_top_lng;
        mapwhere.right_top_lat = right_top_lat;
      } else {
        mapwhere = {
          ip: ip,
          city: city,
          token: token,
          left_bottom_lng: left_bottom_lng,
          left_bottom_lat: left_bottom_lat,
          right_top_lng: right_top_lng,
          right_top_lat: right_top_lat
        };
      }
      $cookies.set("mapwhere", mapwhere, "5min");
      if (zoom > 10 && zoom <= 12) {
        mapwhere.level = 1;
        this.level=1
      } else if (zoom > 12 && zoom < 14) {
        mapwhere.level = 2;
        this.level=2
      } else if (zoom >= 14) {
        this.level=3
        mapwhere.level = 3;
      }
      let that = this;
      mapSearch(mapwhere)
        .then(resp => {
          that.point = resp.data.data;
          that.city = 0;
          that.all = resp.data.sum_city;
          for (let item of that.point) {
            if (item.Num) {
              that.city += item.Num;
            } else {
              that.city++;
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    move(e) {
      e.target.enableDragging();
    },
    moved(e) {
      e.target.disableDragging();
    },
    start() {
      let ip = ip_arr["ip"];
          // let ip = returnCitySN["cip"];;
      let city = localStorage.getItem("city");
      let token = localStorage.getItem("token");
      $cookies.set("mapwhere", { ip: ip, city: city, token: token });
      search_start({ ip: ip, city: city, platform: "2", token: token })
        .then(resp => {
          let data = resp.data.data.conditions;
          this.citys = data.cities;
          this.dities = data.railways;
          this.single_prices = data.single_prices;
          this.total_prices = data.total_prices;
          this.apartments = data.apartments;
          this.build_types = data.build_types;
          this.features = data.features;
        })
        .catch(error => {
          console.log(error);
        });
    },
    qu(e) {
      let id = e.target.getAttribute("data-v");
      let where = $cookies.get("mapwhere");
      if(id==0){
        delete where.country
      }else{
        where.country = id;
      }
      $cookies.set("mapwhere", where, 0);
      this.q1 = id;
      this.search_data();
      $(".quyu-list").slideUp("fast");
      $(".zhao").hide();
      this.flag = true;
      $(".click_qu")
        .children()
        .attr("class", "iconfont iconxiajiantoushixinxiao");
    },
    tie(e) {
      let id = e.target.getAttribute("data-v");
      let where = $cookies.get("mapwhere");
      if(id==0){
        delete where.railway
      }else{
        where.railway = id;
      }
      $cookies.set("mapwhere", where, 0);
      this.search_data();
      this.d1 = id;
      $(".quyu-list").slideUp("fast");
      $(".zhao").hide();
      this.flag = true;
      $(".click_qu")
        .children()
        .attr("class", "iconfont iconxiajiantoushixinxiao");
    },
    zong(e) {
      let id = e.target.getAttribute("data-v");
      let where = $cookies.get("mapwhere");
      if(id==0){
        delete where.totalprice
      }else{
        where.totalprice = id;
      }
      $cookies.set("mapwhere", where, 0);
      this.search_data();
      this.z1 = id;
      $(".price-list").slideUp("fast");
      $(".zhao").hide();
      this.flag1 = true;
      $(".click_price")
        .children()
        .attr("class", "iconfont iconxiajiantoushixinxiao");
    },
    dan(e) {
      let id = e.target.getAttribute("data-v");
      let where = $cookies.get("mapwhere");
      if(id!=0){
        where.single_price = id;
      }else{
        delete where.single_price
      }
      $cookies.set("mapwhere", where, 0);
      this.search_data();
      this.dan1 = id;
      $(".price-list").slideUp("fast");
      $(".zhao").hide();
      this.flag1 = true;
      $(".click_price")
        .children()
        .attr("class", "iconfont iconxiajiantoushixinxiao");
    },
    hu() {
      let id = this.hus;
      id = id.join(",");
      let where = $cookies.get("mapwhere");
      where.apartment = id;
      $cookies.set("mapwhere", where, 0);
      this.search_data();
    },
    tp(e) {
      let id = e.target.innerHTML;
      let key = e.target.getAttribute("data-v");
      this.t1 = key;
      this.type = id;
    },
    se(e) {
      let id = e.target.getAttribute("data-v");
      this.te = id;
      this.s1 = id;
    },
    shai() {
      let where = $cookies.get("mapwhere");
      if (this.te) {
        where.feature = this.te;
      }
      if (this.type) {
        where.build_type = this.type;
      }
      $cookies.set("mapwhere", where, 0);
      this.search_data();
    },
    search_data() {
      let mapwhere = $cookies.get("mapwhere");
      let that = this;
      mapSearch(mapwhere)
        .then(resp => {
          that.point = resp.data.data;
          that.city = 0;
          that.all = resp.data.sum_city;
          for (let item of that.point) {
            if (item.Num) {
              that.city += item.Num;
            } else {
              that.city++;
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    putid(id, e) {
      // map.panTo(new BMap.Point(jk[0],jk[1]));
      let n = e.target.parentElement.parentElement.parentElement.children;
      for (let i = 1; i < n.length; i++) {
        n[i].firstElementChild.firstElementChild.style.backgroundColor =
          "#40A2F4";
          n[i].style.zIndex='1'
      }
      if (e.target.id == "b_name") {
        e.target.style.backgroundColor = "#FF6666";
        e.target.parentElement.parentElement.style.zIndex='2'
      } else {
        e.target.previousElementSibling.style.backgroundColor = "#FF6666";
        e.target.parentElement.parentElement.style.zIndex='2'
      }
      let ip = ip_arr["ip"];
          // let ip = returnCitySN["cip"];
      let token = localStorage.getItem("token");
      let that = this;
      mapProject({ ip: ip, id: id, token: token, platform: 2 })
        .then(resp => {
          console.log(resp)
          this.pro = true;
          let data = resp.data.data;
          that.building = data;
          if (that.building.railways) {
            that.building.railways = that.building.railways[0];
          }
          if (that.building.features) {
            that.building.features = that.building.features[0];
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    changezoom(item){
      console.log(item)
      if(this.level==1){
        this.zoom=13
      }else if(this.level==2){
        this.zoom=15
      }
      let BMap=this.Bmap;
      this.map.panTo(new BMap.Point(item['lng'],item['lat']));
    },
    clear2() {
      this.t1 = -1;
      this.s1 = -1;
      let where = $cookies.get("mapwhere");
      this.te = "";
      this.type = "";
      delete where.feature;
      delete where.build_type;
      $cookies.set("mapwhere", where, 0);
    },
    clear1() {
      this.hus = [];
      let where = $cookies.get("mapwhere");
      delete where.apartment;
      $cookies.set("mapwhere", where, 0);
    },
    gosearch(){
      this.$router.push('/'+this.n+'/sou');
    }
  },
  mounted() {
    // var ua = window.navigator.userAgent.toLowerCase();
    //     if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    //       let kk=localStorage.getItem('weixin');
    //       if(!kk){
    //         localStorage.setItem('weixin','true')
    //         this.$router.go(0);
    //       }
            
    //     } 
    let that = this;
    this.start();
    $(".sea").on("click", function() {
      window.location.href = "/search";
    });
    $(".back").on("click", function() {
      history.go(-1);
    });
    $(".type li").click(function() {
      $(this)
        .addClass("active")
        .siblings("li")
        .removeClass("active");
      console.log($(this).html());
    });
    $(".kaifa li").click(function() {
      $(this)
        .addClass("active")
        .siblings("li")
        .removeClass("active");
      console.log($(this).html());
    });
    $(".tese li").click(function() {
      $(this)
        .addClass("active")
        .siblings("li")
        .removeClass("active");
      console.log($(this).html());
    });
    $(".qu-left li").click(function() {
      var con = $(this).html();
      if (con == "城区") {
        $(".qu-quyu").show();
        $(".qu-ditie").hide();
      } else if (con == "地铁") {
        $(".qu-ditie").show();
        $(".qu-quyu").hide();
      }
      console.log($(this).html());
      $(this)
        .addClass("qu_active")
        .siblings("li")
        .removeClass("qu_active");
    });
    /*区域和地铁*/
    $(".qu-quyu li").click(function() {
      $(this)
        .addClass("qu_active")
        .siblings("li")
        .removeClass("qu_active");
      // console.log($(this).html())
      var str = $(this).attr("data_v");
      console.log(str);
      send(str, 1);
      $(".quyu-list").hide();
      $(".zhao").hide();
      str = $(this).html();
      $(".click_qu").text(str);
    });
    $(".qu-ditie li").click(function() {
      $(this)
        .addClass("qu_active")
        .siblings("li")
        .removeClass("qu_active");
      var str = $(this).attr("data-v");
      console.log(str);
      send(str, 2);
      $(".quyu-list").hide();
      $(".zhao").hide();
    });
    /*单价和总价*/
    $(".price-zong li").click(function() {
      var str = $(this).attr("data_v");
      console.log(str);
      send(str, 4);
      $(".price-list").hide();
      $(".zhao").hide();
    });
    $(".price-dan li").click(function() {
      var str = $(this).attr("data_v");
      console.log(str);
      send(str, 3);
      $(".price-list").hide();
      $(".zhao").hide();
    });

    $(".price-left li").click(function() {
      var con = $(this).html();
      console.log(con);
      if (con == "总价") {
        $(".price-zong").show();
        $(".price-dan").hide();
      } else if (con == "单价") {
        $(".price-zong").hide();
        $(".price-dan").show();
      }
      $(this)
        .addClass("qu_active")
        .siblings("li")
        .removeClass("qu_active");
    });

    $(".price-right li").click(function() {
      $(this)
        .addClass("qu_active")
        .siblings("li")
        .removeClass("qu_active");
      console.log($(this).html());
    });

    $(".huxing_top li").click(function() {
      if (
        $(this)
          .find("input")
          .prop("checked")
      ) {
        $(this)
          .find("input")
          .prop("checked", false);
      } else {
        $(this)
          .find("input")
          .prop("checked", true);
      }
      console.log(
        $(this)
          .children("span")
          .html()
      );
      $(this)
        .children("span")
        .addClass("hu_active");
      $(this)
        .siblings("li")
        .children("span")
        .removeClass("hu_active");

      console.log(
        $(this)
          .children("span")
          .html()
      );
    });
    /*户型*/
    $(".huxing_que  .m-h-r").click(function() {
      $(".zhao").hide();
      that.flag1 = true;
      that.flag = true;
      that.flag2 = true;
      that.flag3 = true;
      that.flag4 = true;
      $(".click_huxing")
        .children()
        .attr("class", "iconfont iconxiajiantoushixinxiao");
      $(".huxing_list").slideUp(100);
    });
    $(".huxing_que .m-h-l").click(function() {
      $(this)
        .parent()
        .prev()
        .children()
        .children("input")
        .attr("checked", false);
    });

    /*筛选*/
    $(".shaixuan .m-h-r").click(function() {
      $(".zhao").hide();
      that.flag1 = true;
      that.flag = true;
      that.flag2 = true;
      that.flag3 = true;
      that.flag4 = true;
      $(".click_shai")
        .children()
        .attr("class", "iconfont iconxiajiantoushixinxiao");
      $(".shaixuan_list").slideUp(100);
    });
    $(".shaixuan .m-h-l").click(function() {
      $(this)
        .parent()
        .prev()
        .children(".bgg")
        .children()
        .removeClass("active");
    });

    /*排序*/
    $(".paixu_list li").click(function() {
      $(this)
        .addClass("pai_active")
        .siblings("li")
        .removeClass("pai_active");
      console.log($(this).attr("data_v"));
      var str = $(this).attr("data_v");
      send(str, 7);
      $(".paixu_list").hide();
      $(".zhao").hide();
    });

    $(".click_qu").click(function() {
      that.flag1 = true;
      that.flag2 = true;
      that.flag3 = true;
      that.flag4 = true;
      $(".price-list").hide();
      $(".huxing_list").hide();
      $(".shaixuan_list").hide();
      $(".paixu_list").hide();
      $(".click_price")
        .children()
        .attr("class", "iconfont iconxiajiantoushixinxiao");
      $(".click_huxing")
        .children()
        .attr("class", "iconfont iconxiajiantoushixinxiao");
      $(".click_shai")
        .children()
        .attr("class", "iconfont iconxiajiantoushixinxiao");
      if (that.flag == true) {
        $(this)
          .children()
          .attr("class", "iconfont iconshangjiantoushixinxiao");
        $(".quyu-list").slideDown("fast");
        $(".zhao").show();
        that.flag = false;
      } else {
        $(this)
          .children()
          .attr("class", "iconfont iconxiajiantoushixinxiao");
        $(".quyu-list").slideUp("fast");
        $(".zhao").hide();
        that.flag = true;
      }
    });

    $(".click_price").click(function() {
      that.flag = true;
      that.flag2 = true;
      that.flag3 = true;
      that.flag4 = true;
      $(".quyu-list").hide();
      $(".huxing_list").hide();
      $(".shaixuan_list").hide();
      $(".paixu_list").hide();
      $(".click_qu")
        .children()
        .attr("class", "iconfont iconxiajiantoushixinxiao");
      $(".click_huxing")
        .children()
        .attr("class", "iconfont iconxiajiantoushixinxiao");
      $(".click_shai")
        .children()
        .attr("class", "iconfont iconxiajiantoushixinxiao");
      if (that.flag1 == true) {
        $(this)
          .children()
          .attr("class", "iconfont iconshangjiantoushixinxiao");
        $(".price-list").slideDown("fast");
        $(".zhao").show();
        that.flag1 = false;
      } else {
        $(this)
          .children()
          .attr("class", "iconfont iconxiajiantoushixinxiao");
        $(".price-list").slideUp("fast");
        $(".zhao").hide();
        that.flag1 = true;
      }
    });

    $(".click_huxing").click(function() {
      that.flag = true;
      that.flag1 = true;
      that.flag3 = true;
      that.flag4 = true;
      $(".quyu-list").hide();
      $(".price-list").hide();
      $(".shaixuan_list").hide();
      $(".paixu_list").hide();
      $(".click_qu")
        .children()
        .attr("class", "iconfont iconxiajiantoushixinxiao");
      $(".click_price")
        .children()
        .attr("class", "iconfont iconxiajiantoushixinxiao");
      $(".click_shai")
        .children()
        .attr("class", "iconfont iconxiajiantoushixinxiao");
      if (that.flag2 == true) {
        $(this)
          .children()
          .attr("class", "iconfont iconshangjiantoushixinxiao");
        $(".huxing_list").slideDown("fast");
        $(".zhao").show();
        that.flag2 = false;
      } else {
        $(this)
          .children()
          .attr("class", "iconfont iconxiajiantoushixinxiao");
        $(".huxing_list").slideUp("fast");
        $(".zhao").hide();
        that.flag2 = true;
      }
    });

    $(".click_shai").click(function() {
      that.flag1 = true;
      that.flag2 = true;
      that.flag = true;
      that.flag4 = true;
      $(".quyu-list").hide();
      $(".price-list").hide();
      $(".huxing_list").hide();
      $(".paixu_list").hide();
      $(".click_qu")
        .children()
        .attr("class", "iconfont iconxiajiantoushixinxiao");
      $(".click_price")
        .children()
        .attr("class", "iconfont iconxiajiantoushixinxiao");
      $(".click_huxing")
        .children()
        .attr("class", "iconfont iconxiajiantoushixinxiao");
      if (that.flag3 == true) {
        $(this)
          .children()
          .attr("class", "iconfont iconshangjiantoushixinxiao");
        $(".shaixuan_list").slideDown("fast");
        $(".zhao").show();
        that.flag3 = false;
      } else {
        $(this)
          .children()
          .attr("class", "iconfont iconxiajiantoushixinxiao");
        $(".shaixuan_list").slideUp("fast");
        $(".zhao").hide();
        that.flag3 = true;
      }
    });

    $(".click_pai").click(function() {
      that.flag = true;
      that.flag2 = true;
      that.flag3 = true;
      that.flag1 = true;
      $(".quyu-list").hide();
      $(".price-list").hide();
      $(".huxing_list").hide();
      $(".shaixuan_list").hide();
      $(".click_qu")
        .children()
        .attr("class", "iconfont iconxiajiantoushixinxiao");
      $(".click_price")
        .children()
        .attr("class", "iconfont iconxiajiantoushixinxiao");
      $(".click_huxing")
        .children()
        .attr("class", "iconfont iconxiajiantoushixinxiao");
      $(".click_shai")
        .children()
        .attr("class", "iconfont iconxiajiantoushixinxiao");
      if (that.flag4 == true) {
        $(".paixu_list").slideDown("fast");
        $(".zhao").show();
        that.flag4 = false;
      } else {
        $(".paixu_list").slideUp("fast");
        $(".zhao").hide();
        that.flag4 = true;
      }
    });
    $(".zhao").click(function() {
      that.flag1 = true;
      that.flag = true;
      that.flag2 = true;
      that.flag3 = true;
      that.flag4 = true;
      $(".quyu-list").hide();
      $(".price-list").hide();
      $(".huxing_list").hide();
      $(".shaixuan_list").hide();
      $(".paixu_list").hide();
      $(this).hide();
      $(".click_price")
        .children()
        .attr("class", "iconfont iconxiajiantoushixinxiao");
      $(".click_huxing")
        .children()
        .attr("class", "iconfont iconxiajiantoushixinxiao");
      $(".click_shai")
        .children()
        .attr("class", "iconfont iconxiajiantoushixinxiao");
      $(".click_qu")
        .children()
        .attr("class", "iconfont iconxiajiantoushixinxiao");
    });
  }
};
</script>
<style scoped>
@import url("~static/css/map_new.css");
* {
  padding: 0;
  margin: 0;
}
.bm-view {
  height: 90%;
  width: 100%;
  top: 10%;
  position: fixed;
}

.Map >>> #m_name {
  font-size: 16px;
  margin-top: 18px;
  margin-bottom: 8px;
}
.Map >>> #m_price {
  font-size: 11px;
  margin-bottom: 2px;
}
.Map >>> #m_num {
  font-size: 12px;
  margin: 0;
}
.Map >>> #b_name {
  height: 22px;
  background-color: #40a2f4;
  font-size: 12px;
  color: #fff;
  padding-left: 12px;
  line-height: 22px;
  margin: 0;
}
.Map >>> #b_price {
  height: 22px;
  background-color: #fff;
  font-size: 12px;
  color: #919499;
  line-height: 22px;
  text-align: center;
}
.top {
  width: 100%;
  height: 40px;
  background-color: #fff;
  position: fixed;
  z-index: 2;
}
.top .back {
  width: 20px;
  margin-left: 14px;
  margin-right: 16px;
}
.top .inpu {
  width: 82.67%;
  height: 30px;
  border-radius: 15px;
  background-color: #f2f4f7;
  margin-top: 6px;
  line-height: 30px;
  padding-left: 33px;
  border: 0;
  text-align: left;
}
.top .search {
  position: absolute;
  top: 14px;
  left: 70px;
  width: 15px;
}

.project {
  position: fixed;
  bottom: 0;
  background-color: #fff;
  padding-left: 4%;
  width:100%;
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
</style>