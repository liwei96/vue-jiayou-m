<template>
  <div class="Index" v-cloak>
    <div class="header">
      <img class="bg" src="~/assets/banner1.jpg" alt />
      <img class="mine" src="~/assets/Mine.png" alt />
      <img src="~/assets/index-logo.png" alt class="index-logo" />
      <div class="search">
        <span class="city">
          {{cityname}}
          <i class="iconfont iconbelow-s"></i>
        </span>
        <button id="sea">
          <span class="iconfont iconmagnifier"></span>请输入楼盘名称、地域
        </button>
      </div>
      <div class="banner">
        <nav class="m-na">
          <ul>
            <li>
              <router-link :to="'/'+pinyin+'/search'">
                <img src="~/assets/new-search.png" alt="楼盘查询" />
                <p>楼盘查询</p>
              </router-link>
            </li>
            <li>
              <router-link :to="'/'+pinyin+'/encyclopedia'">
                <img src="~/assets/new-wiki.png" alt="买房百科" />
                <p>买房百科</p>
              </router-link>
            </li>
            <li>
              <router-link :to="'/'+pinyin+'/realinformations'">
                <img src="~/assets/new-zixun.png" alt="房产资讯" />
                <p>房产资讯</p>
              </router-link>
            </li>
            <li>
              <router-link :to="'/'+pinyin+'/count'">
                <img src="~/assets/new-compact.png" alt="房贷计算" />
                <p>房贷计算</p>
              </router-link>
            </li>
            <li>
              <router-link :to="'/'+pinyin+'/map'">
                <img src="~/assets/new-map.png" alt="地图找房" />
                <p>地图找房</p>
              </router-link>
            </li>
          </ul>
        </nav>
        <div class="trend">
          <span class="trend-lead">房产头条</span>
          <div class="trend-con">
            <div class="swiper-container9">
              <div class="swiper-wrapper">
                <div
                  class="swiper-slide"
                  v-for="(trend,key) in trends"
                  :key="key"
                  :data-v="trend.id"
                  :data-t="trend.position"
                  @click="ency($event)"
                >{{trend.title}}</div>
              </div>
            </div>
          </div>
          <router-link :to="'/' + pinyin + '/realinformations'">
            <button id="encyclopedia">更多</button>
          </router-link>
        </div>
      </div>
      <div class="line"></div>
      <!-- 房价趋势 -->
      <div class="drift">
        <h2>
          房价趋势
          <img class="cur-img" src="~/assets/indexprice.png" alt />
          <router-link :to="'/' + pinyin + '/trend'">
            <span id="trend">
              查看详情
              <img src="~/assets/m-go.png" alt />
            </span>
          </router-link>
        </h2>
        <div class="drift-con">
          <div class="drift-list">
            <h4>
              {{parseInt(trend_price)}}
              <span>元/m²</span>
            </h4>
            <p>{{trend_mounth}}月均价</p>
          </div>
          <div class="drift-list">
            <h4>{{trend_down}}%</h4>
            <p>环比上月</p>
          </div>
          <div class="drift-list lbom">
            <h4>{{trend_up}}%</h4>
            <p>同比去年</p>
          </div>
        </div>
      </div>
      <div class="line"></div>
      <!-- 特色好房 -->
      <div class="m-jia">
        <h3>特色好房</h3>
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="tegood">
                <router-link :to="'/'+pinyin+'/top/1'">
                  <h6>刚需楼盘</h6>
                  <p>您最需要的好楼盘</p>
                  <div class="show-img">
                    <img :src="rigid_demand1" alt />
                    <img :src="rigid_demand2" alt />
                  </div>
                </router-link>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="tegood">
                <router-link :to="'/'+pinyin+'/top/2'">
                  <h6>投资地产</h6>
                  <p>有投资价值的好楼盘</p>
                  <div class="show-img">
                    <img :src="invest1" alt />
                    <img :src="invest2" alt />
                  </div>
                </router-link>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="tegood">
                <router-link :to="'/'+pinyin+'/top/3'">
                  <h6>改善住宅</h6>
                  <p>提高生活品质的好楼盘</p>
                  <div class="show-img">
                    <img :src="improve1" alt />
                    <img :src="improve2" alt />
                  </div>
                </router-link>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="tegood">
                <router-link :to="'/'+pinyin+'/top/4'">
                  <h6>现房地产</h6>
                  <p>即买即住的好楼盘</p>
                  <div class="show-img">
                    <img :src="existing1" alt />
                    <img :src="existing2" alt />
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="line"></div>
      <!-- 楼盘榜单 -->
      <div id="box">
        <ul id="menu">
          <li class="active">热搜榜</li>
          <li>人气榜</li>
          <li>成交榜</li>
        </ul>
        <div id="panel">
          <div class="panel active">
            <div class="swiper-box">
              <div class="swiper-wrapper hot-fang">
                <div class="swiper-slide" v-for="(hot,key) in hots" :key="hot.id">
                  <router-link :to="'/'+pinyin+'/content/'+hot.id">
                    <div class="hua">
                      <div class="hf-pic">
                        <img :src="hot.img" alt />
                        <span>TOP{{key+1}}</span>
                        <p>
                          <img src="~/assets/weight.png" alt />
                          {{hot.num}}
                        </p>
                      </div>
                      <div class="hf-con">
                        <h1>{{hot.name}}</h1>
                        <p>
                          {{hot.country}}&nbsp;&nbsp;&nbsp;{{parseInt(hot.area_min)}}
                          <span
                            v-if="hot.area_max"
                          >-</span>
                          {{parseInt(hot.area_max)}}m²
                        </p>
                        <h6>{{parseInt(hot.single_price)}}元/m²起</h6>
                      </div>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="panel">
            <div class="swiper-box-tui">
              <div class="swiper-wrapper hot-fang">
                <div class="swiper-slide" v-for="(hot,key) in tuis" :key="hot.id">
                  <router-link :to="'/'+pinyin+'/content/'+hot.id">
                    <div class="hua">
                      <div class="hf-pic">
                        <img :src="hot.img" alt />
                        <span>TOP{{key+1}}</span>
                        <p>
                          <img src="~/assets/indexhot.png" alt />
                          {{hot.num}}
                        </p>
                      </div>
                      <div class="hf-con">
                        <h1>{{hot.name}}</h1>
                        <p>
                          {{hot.country}}&nbsp;&nbsp;&nbsp;{{parseInt(hot.area_min)}}
                          <span
                            v-if="hot.area_max"
                          >-</span>
                          {{parseInt(hot.area_max)}}m²
                        </p>
                        <h6>{{parseInt(hot.single_price)}}元/m²起</h6>
                      </div>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="panel">
            <div class="swiper-box2">
              <div class="swiper-wrapper hot-fang">
                <div class="swiper-slide" v-for="(hot,key) in nows" :key="hot.id">
                  <router-link :to="'/'+pinyin+'/content/'+hot.id">
                    <div class="hua">
                      <div class="hf-pic">
                        <img :src="hot.img" alt />
                        <span>TOP{{key+1}}</span>
                        <p>
                          <img src="~/assets/indexsuc.png" alt />
                          {{hot.num}}
                        </p>
                      </div>
                      <div class="hf-con">
                        <h1>{{hot.name}}</h1>
                        <p>
                          {{hot.country}}&nbsp;&nbsp;&nbsp;{{parseInt(hot.area_min)}}
                          <span
                            v-if="hot.area_max"
                          >-</span>
                          {{parseInt(hot.area_max)}}m²
                        </p>
                        <h6>{{parseInt(hot.single_price)}}元/m²起</h6>
                      </div>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="line"></div>
      <!-- 动态 -->
      <div class="m-dong" v-if="dong">
        <h3>
          楼盘动态
          <router-link :to="'/' + pinyin + '/dynamic'">
            <span class="m-d-more" id="dynamic">
              共
              <i>{{dong.num}}</i>条
              <img src="~/assets/m-go.png" alt />
            </span>
          </router-link>
        </h3>
        <ul class="dong-t">
          <li>
            <h1>{{dong.name}}最新房源动态</h1>
            <p>{{dong.introduce}}</p>
            <h5>{{dong.time}}</h5>
          </li>
        </ul>
      </div>
      <!-- 房产楼讯 -->
      <div class="lou_dong">
        <div class="lou_dong_cen">
          <h1>房产资讯</h1>
          <div class="lou_dong_box">
            <div
              v-if="left_info"
              class="lou_dong_left"
              :data-v="left_info.id"
              :data-t="left_info.position"
              @click.self="ency($event)"
            >
              <router-link
                :to="'/'+pinyin+'/encyclopediaArticle/'+left_info.position+'/'+left_info.id"
              >
                <h2
                  :data-v="left_info.id"
                  :data-t="left_info.position"
                  @click.self="ency($event)"
                >{{left_info.title}}</h2>
                <p
                  v-if="left_info.description"
                  :data-v="left_info.id"
                  :data-t="left_info.position"
                  @click.self="ency($event)"
                >{{left_info.description}}</p>
              </router-link>
            </div>
            <div class="lou_dong_right">
              <div
                v-if="right_info1"
                class="yu_shou"
                :data-v="right_info1.id"
                :data-t="right_info1.position"
                @click.self="ency($event)"
              >
              <router-link :to="'/'+pinyin+'/encyclopediaArticle/'+right_info1.position+'/'+right_info1.id">
                <h2
                  :data-v="right_info1.id"
                  :data-t="right_info1.position"
                  @click.self="ency($event)"
                >{{right_info1.title}}</h2>
                <p
                  v-if="right_info1.description"
                  :data-v="right_info1.id"
                  :data-t="right_info1.position"
                  @click.self="ency($event)"
                >{{right_info1.description}}</p>
              </router-link>
              </div>
              <div
                v-if="right_info2"
                class="yao_hao"
                :data-v="right_info2.id"
                :data-t="right_info2.position"
                @click.self="ency($event)"
              >
              <router-link :to="'/'+pinyin+'/encyclopediaArticle/'+right_info2.position+'/'+right_info2.id">
                <h2
                  :data-v="right_info2.id"
                  :data-t="right_info2.position"
                  @click.self="ency($event)"
                >{{right_info2.title}}</h2>
                <p
                  :data-v="right_info2.id"
                  :data-t="right_info2.position"
                  @click.self="ency($event)"
                >{{right_info2.description}}</p>
              </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 新闻板块 -->
      <div class="nav">
        <div class="swiper-container1">
          <div class="swiper-wrapper">
            <div class="swiper-slide" @click="s1s">
              <div class="tegood">
                <p class="active">
                  楼盘导购
                  <i></i>
                </p>
              </div>
            </div>
            <div class="swiper-slide" @click="s2s">
              <div class="tegood">
                <p>
                  买房百科
                  <i></i>
                </p>
              </div>
            </div>
            <div class="swiper-slide" @click="s3s">
              <div class="tegood">
                <p>
                  本地楼市
                  <i></i>
                </p>
              </div>
            </div>
            <div class="swiper-slide" @click="s4s">
              <div class="tegood">
                <p>
                  房企咨询
                  <i></i>
                </p>
              </div>
            </div>
            <div class="swiper-slide" @click="s5s">
              <div class="tegood">
                <p>
                  热点新闻
                  <i></i>
                </p>
              </div>
            </div>
            <div class="swiper-slide" @click="s6s">
              <div class="tegood">
                <p>
                  成交报告
                  <i></i>
                </p>
              </div>
            </div>
            <div class="swiper-slide" @click="s7s">
              <div class="tegood">
                <p>
                  土拍成交
                  <i></i>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 房产导购 -->
      <ul class="lists s1" v-show="s1">
        <li v-for="s in s1_con" :key="s.id">
          <router-link :to="'/'+pinyin+'/encyclopediaArticle/'+s.position+'/'+s.id">
            <div class="list">
              <div class="left">
                <h5>{{s.title}}</h5>
                <p>{{s.source?s.source:'允家新房'}} &nbsp;{{s.time}}</p>
              </div>
              <div class="right">
                <img :src="s.img" alt />
              </div>
            </div>
          </router-link>
        </li>
      </ul>
      <!-- 百科 -->
      <ul class="lists s2" v-show="s2">
        <li v-for="s in s2_con" :key="s.id">
          <router-link :to="'/'+pinyin+'/encyclopediaArticle/'+s.position+'/'+s.id">
            <div class="list">
              <div class="left">
                <h5>{{s.title}}</h5>
                <p>{{s.source?s.source:'允家新房'}} &nbsp;{{s.time}}</p>
              </div>
              <div class="right">
                <img :src="s.img" alt />
              </div>
            </div>
          </router-link>
        </li>
      </ul>
      <!-- 本地楼市 -->
      <ul class="lists s3" v-show="s3">
        <li v-for="s in s3_con" :key="s.id">
          <router-link :to="'/'+pinyin+'/encyclopediaArticle/'+s.position+'/'+s.id">
            <div class="list">
              <div class="left">
                <h5>{{s.title}}</h5>
                <p>{{s.source?s.source:'允家新房'}} &nbsp;{{s.time}}</p>
              </div>
              <div class="right">
                <img :src="s.img" alt />
              </div>
            </div>
          </router-link>
        </li>
      </ul>
      <!-- 资讯 -->
      <ul class="lists s4" v-show="s4">
        <li v-for="s in s4_con" :key="s.id">
          <router-link :to="'/'+pinyin+'/encyclopediaArticle/'+s.position+'/'+s.id">
            <div class="list">
              <div class="left">
                <h5>{{s.title}}</h5>
                <p>{{s.source?s.source:'允家新房'}} &nbsp;{{s.time}}</p>
              </div>
              <div class="right">
                <img :src="s.img" alt />
              </div>
            </div>
          </router-link>
        </li>
      </ul>
      <!-- 热点新闻 -->
      <ul class="lists s5" v-show="s5">
        <li v-for="s in s5_con" :key="s.id">
          <router-link :to="'/'+pinyin+'/encyclopediaArticle/'+s.position+'/'+s.id">
            <div class="list">
              <div class="left">
                <h5>{{s.title}}</h5>
                <p>{{s.source?s.source:'允家新房'}} &nbsp;{{s.time}}</p>
              </div>
              <div class="right">
                <img :src="s.img" alt />
              </div>
            </div>
          </router-link>
        </li>
      </ul>
      <!-- 成交报告 -->
      <ul class="lists s6" v-show="s6">
        <li v-for="s in s6_con" :key="s.id">
          <router-link :to="'/'+pinyin+'/encyclopediaArticle/'+s.position+'/'+s.id">
            <div class="list">
              <div class="left">
                <h5>{{s.title}}</h5>
                <p>{{s.source?s.source:'允家新房'}} &nbsp;{{s.time}}</p>
              </div>
              <div class="right">
                <img :src="s.img" alt />
              </div>
            </div>
          </router-link>
        </li>
      </ul>
      <!-- 土拍 -->
      <ul class="lists s7" v-show="s7">
        <li v-for="s in s7_con" :key="s.id">
          <router-link :to="'/'+pinyin+'/encyclopediaArticle/'+s.position+'/'+s.id">
            <div class="list">
              <div class="left">
                <h5>{{s.title}}</h5>
                <p>{{s.source?s.source:'允家新房'}} &nbsp;{{s.time}}</p>
              </div>
              <div class="right">
                <img :src="s.img" alt />
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="line"></div>
    <!-- 楼盘问问 -->
    <div class="wen">
      <h4>
        楼盘问答
        <router-link :to="'/' + pinyin + '/questions'">
          <span id="question">
            更多问答
            <img src="~/assets/m-go.png" alt />
          </span>
        </router-link>
      </h4>
      <div class="wen-list" v-for="(q,key) in questions" :key="key">
        <h5>
          <span>问</span>
          {{q.question}}
        </h5>
        <span class="answer">答</span>
        <p class="wen-con">{{q.answer}}</p>
        <i class="wen-list-more" @click="getwens($event)">展开</i>
        <p>
          <span class="wen-time">{{q.time}}</span>
          <span class="Fabulous">
            <img
              :src="click"
              @click.stop="agree($event)"
              data-d="1"
              :data-v="q.id"
              :data-n="q.num"
              :type="q.my_like"
              alt
            />
            <span
              @click.stop="agrees($event)"
              data-d="1"
              :data-v="q.id"
              :data-n="q.num"
              :type="q.my_like"
            >有用({{q.num}})</span>
          </span>
        </p>
      </div>
    </div>
    <div class="line"></div>
    <!-- 帮我找房 -->
    <div class="help">
      <router-link :to="'/'+pinyin+'/help'">
        <img src="~/assets/m-help.jpg" alt />
      </router-link>
    </div>
    <div class="line"></div>
    <!-- 推荐楼盘 -->
    <div class="recommen" v-if="buildings.length>1">
      <h4>
        为你推荐
        <span>
          <i class="iconfont iconbroadcast"></i>
          为您找到{{count}}个
        </span>
      </h4>
      <div class="re-con">
        <div class="re-list" v-for="b in buildings" :key="b.id">
          <router-link :to="'/'+pinyin+'/content/'+b.id">
            <div class="re-con-left">
              <img :src="b.img" alt />
              <span>
                <i class="iconfont iconyanjing"></i>
                {{b.num}}
              </span>
            </div>
            <div class="re-con-right">
              <h5>
                {{b.name}}
                <span>{{b.status}}</span>
              </h5>
              <p class="price">
                <span>{{b.single_price}}</span>元/m²
              </p>
              <p class="area">
                <span>{{b.city}}-{{b.country}}</span>
                <span>建面</span>
                <span v-if="b.area_max">
                  {{parseInt(b.area_min)}}
                  <span id="arealine" v-if="b.area_max">-</span>
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
      <button class="more-res">查看更多房源</button>
    </div>
    <foot-view :pinyin="pinyin"></foot-view>
    <transition name="fade">
      <load v-if="isload"></load>
    </transition>
    <transition name="fade">
      <div class="search" id="s-nav" v-if="lll">
        <router-link :to="'/'+pinyin+'/address'">
          <span class="city">
            {{cityname}}
            <i class="iconfont iconbelow-s"></i>
          </span>
        </router-link>
        <router-link :to="'/'+pinyin+'/sou'">
          <button id="sea">
            <span class="iconfont iconmagnifier"></span>请输入楼盘名称、地域
          </button>
        </router-link>
        <router-link :to="'/'+pinyin+'/map'">
          <span class="s-nav-img">
            <img src="~/assets/s-nav-img.png" />地图
          </span>
        </router-link>
      </div>
    </transition>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
import { index_start, encyclopediaarticle_agree } from "~/api/api";
import Loadings from "@/components/loading";
import footView from "@/components/Foot.vue";
export default {
  name: "Index",
  components: {
    load: Loadings,
    "foot-view":footView
  },

  async asyncData(context) {
    let name = context.params.name;
    let ip = context.store.state.cookie.ip;
    let city = context.store.state.cookie.city;
    let token = context.store.state.cookie.token;
    let nn = context.store.state.pinyin;
    if (!city) {
      city = 0;
      context.store.commit("setcity", { city: city });
    }
    let [res] = await Promise.all([
      context.$axios
        .post("/api/first/index_mobile", {
          city: city,
          platform: 2,
          token: token,
          ip: ip
        })
        .then(resp => {
          let data = resp.data.data;
          let back = resp.data;
          let tel = data.phone;
          context.store.commit("setcall", { call: tel });

          if (Number(data.price_trend.rate) > 0) {
            data.price_trend.rate = "下跌" + data.price_trend.rate;
          } else {
            data.price_trend.rate = "涨幅" + Math.abs(data.price_trend.rate);
          }

          if (Number(data.price_trend.rate_lastyear) < 0) {
            data.price_trend.rate_lastyear =
              "下跌" + Math.abs(data.price_trend.rate_lastyear);
          } else {
            data.price_trend.rate_lastyear =
              "涨幅" + data.price_trend.rate_lastyear;
          }

          if (data.features.existing.length != 0) {
            data.existing1 = data.features.existing[0].img;
            data.existing2 = data.features.existing[1].img;
          }
          if (data.features.invest.length != 0) {
            data.invest1 = data.features.invest[0].img;
            data.invest2 = data.features.invest[1].img;
          }
          if (data.features.rigid_demand.length != 0) {
            data.rigid_demand1 = data.features.rigid_demand[0].img;
            data.rigid_demand2 = data.features.rigid_demand[1].img;
          }
          if (data.features.improve.length != 0) {
            data.improve1 = data.features.improve[0].img;
            if (data.features.improve[1]) {
              data.improve2 = data.features.improve[1].img;
            }
          }

          if (data.dynaminc.dynamic_list.length != 0) {
            data.dong = data.dynaminc.dynamic_list[0];
          }

          if (data.dong) {
            data.dong.num = data.dynaminc.dynamic_list_count;
          }
          data.left_info =
            data.article.focus_1.length > 0 ? data.article.focus_1[0] : null;
          data.right_info1 =
            data.article.focus_2.length > 0 ? data.article.focus_2[0] : null;
          data.right_info2 =
            data.article.focus_3.length > 0 ? data.article.focus_3[0] : null;

          for (let item of data.recommand.data) {
            if (item.railway) {
              item.railway = item.railway.split(",")[0];
            }
          }
          back.data = data;
          return back;
        })
    ]);
    return {
      trend_price: res.data.price_trend.price,
      trend_down: res.data.price_trend.rate,
      trend_up: res.data.price_trend.rate_lastyear,
      trend_mounth: res.data.price_trend.time,
      hots: res.data.tops.hot_search,
      questions: res.data.answer,
      buildings: res.data.recommand.data,
      count: res.data.recommand.count,
      tuis: res.data.tops.popular,
      nows: res.data.tops.finish_deal,
      trends: res.data.top_article,
      s1_con: res.data.article.guide,
      s5_con: res.data.article.hot_news,
      s6_con: res.data.article.daily,
      s7_con: res.data.article.land_auction,
      s3_con: res.data.article.local,
      s4_con: res.data.article.bulders,
      s2_con: res.data.article.weiki,
      existing1: res.data.existing1,
      existing2: res.data.existing2,
      invest1: res.data.invest1,
      invest2: res.data.invest2,
      rigid_demand1: res.data.rigid_demand1,
      rigid_demand2: res.data.rigid_demand2,
      improve1: res.data.improve1,
      improve2: res.data.improve2,
      dong: res.data.dong,
      left_info: res.data.left_info,
      right_info1: res.data.right_info1,
      right_info2: res.data.right_info2,
      title: res.data.title,
      description: res.data.description,
      keywords: res.data.keywords,
      pinyin: res.city.pinyin,
      tel: res.data.phone,
      cityname: res.city.name,
      city:res.city.id
    };
  },
  data() {
    return {
      kk: 0,
      lll: false,
      isload: true,
      pinyin: "",
      trends: [
        "That open was light. After also shall first rule third every place spirit light. Beginning together their hath, winged firmament.",
        "That creature his bring waters female morning place Give bearing in isnt from. Without his fowl void bearing. Blessed give.",
        "And also. Firmament and Give. Sea replenish gathered give in for whose tree their a said multiply abundantly give years."
      ],
      trend_price: "28907",
      trend_mounth: "9",
      trend_down: "1.04",
      trend_up: "2.07",
      hots: [
        {
          name: "绿地华家池印",
          img: require("~/assets/lou1.png"),
          num: "32323",
          isshou: "在售",
          price: "32000",
          city: "杭州",
          area_min: "62",
          areamax: "99"
        },
        {
          name: "绿地华家池印",
          img: require("~/assets/lou1.png"),
          num: "32323",
          isshou: "在售",
          price: "32000",
          city: "杭州",
          area_min: "62",
          areamax: "99"
        },
        {
          name: "绿地华家池印",
          img: require("~/assets/lou1.png"),
          num: "32323",
          isshou: "在售",
          price: "32000",
          city: "杭州",
          area_min: "62",
          areamax: "99"
        },
        {
          name: "绿地华家池印",
          img: require("~/assets/lou1.png"),
          num: "32323",
          isshou: "在售",
          price: "32000",
          city: "杭州",
          area_min: "62",
          areamax: "99"
        },
        {
          name: "绿地华家池印",
          img: require("~/assets/lou1.png"),
          num: "32323",
          isshou: "在售",
          price: "32000",
          city: "杭州",
          area_min: "62",
          areamax: "99"
        }
      ],
      tuis: [
        {
          name: "绿地华家池印",
          img: require("~/assets/lou1.png"),
          num: "32323",
          isshou: "在售",
          price: "32000",
          city: "杭州",
          area_min: "62",
          areamax: "99"
        },
        {
          name: "绿地华家池印",
          img: require("~/assets/lou1.png"),
          num: "32323",
          isshou: "在售",
          price: "32000",
          city: "杭州",
          area_min: "62",
          areamax: "99"
        },
        {
          name: "绿地华家池印",
          img: require("~/assets/lou1.png"),
          num: "32323",
          isshou: "在售",
          price: "32000",
          city: "杭州",
          area_min: "62",
          areamax: "99"
        },
        {
          name: "绿地华家池印",
          img: require("~/assets/lou1.png"),
          num: "32323",
          isshou: "在售",
          price: "32000",
          city: "杭州",
          area_min: "62",
          areamax: "99"
        },
        {
          name: "绿地华家池印",
          img: require("~/assets/lou1.png"),
          num: "32323",
          isshou: "在售",
          price: "32000",
          city: "杭州",
          area_min: "62",
          areamax: "99"
        }
      ],
      nows: [
        {
          name: "绿地华家池印",
          img: require("~/assets/lou1.png"),
          num: "32323",
          isshou: "在售",
          price: "32000",
          city: "杭州",
          area_min: "62",
          areamax: "99"
        },
        {
          name: "绿地华家池印",
          img: require("~/assets/lou1.png"),
          num: "32323",
          isshou: "在售",
          price: "32000",
          city: "杭州",
          area_min: "62",
          areamax: "99"
        },
        {
          name: "绿地华家池印",
          img: require("~/assets/lou1.png"),
          num: "32323",
          isshou: "在售",
          price: "32000",
          city: "杭州",
          area_min: "62",
          areamax: "99"
        },
        {
          name: "绿地华家池印",
          img: require("~/assets/lou1.png"),
          num: "32323",
          isshou: "在售",
          price: "32000",
          city: "杭州",
          area_min: "62",
          areamax: "99"
        },
        {
          name: "绿地华家池印",
          img: require("~/assets/lou1.png"),
          num: "32323",
          isshou: "在售",
          price: "32000",
          city: "杭州",
          area_min: "62",
          areamax: "99"
        }
      ],
      dong: {
        num: "2036",
        tit: "德信杭州之翼",
        msg:
          "中交财富中心7.20已盛大加推3号楼，现推出特价商铺6套，双地铁口，准现铺，面积81-191平~.",
        time: "2019-04-08"
      },
      left_info: {
        title: "中交财富中心7.20已",
        description: "最新土拍成交资讯，地块成交情况~.",
        id: "32"
      },
      right_info1: {
        title: "中国房地产行业集中",
        description: "超高层地标建筑于上海浦东崛起~."
      },
      right_info2: {
        title: "杭州浙港国际中心周",
        description: "超高层地标建筑于上海浦东崛起~."
      },
      s1: true,
      s2: false,
      s3: false,
      s4: false,
      s5: false,
      s6: false,
      s7: false,
      s1_con: [
        {
          tit: "房地产行业集中度进一步提高百强 房企市场份额升",
          img: require("~/assets/lou1.png"),
          time: "2020-01-06"
        },
        {
          tit: "房地产行业集中度进一步提高百强 房企市场份额升",
          img: require("~/assets/lou1.png"),
          time: "2020-01-06"
        },
        {
          tit: "房地产行业集中度进一步提高百强 房企市场份额升",
          img: require("~/assets/lou1.png"),
          time: "2020-01-06"
        }
      ],
      s2_con: [
        {
          tit: "房地产行业集中度进一步提高百强 房企市场份额升",
          img: require("~/assets/lou1.png"),
          time: "2020-01-06"
        },
        {
          tit: "房地产行业集中度进一步提高百强 房企市场份额升",
          img: require("~/assets/lou1.png"),
          time: "2020-01-06"
        },
        {
          tit: "房地产行业集中度进一步提高百强 房企市场份额升",
          img: require("~/assets/lou1.png"),
          time: "2020-01-06"
        }
      ],
      s3_con: [
        {
          tit: "房地产行业集中度进一步提高百强 房企市场份额升",
          img: require("~/assets/lou1.png"),
          time: "2020-01-06"
        },
        {
          tit: "房地产行业集中度进一步提高百强 房企市场份额升",
          img: require("~/assets/lou1.png"),
          time: "2020-01-06"
        },
        {
          tit: "房地产行业集中度进一步提高百强 房企市场份额升",
          img: require("~/assets/lou1.png"),
          time: "2020-01-06"
        }
      ],
      s4_con: [
        {
          tit: "房地产行业集中度进一步提高百强 房企市场份额升",
          img: require("~/assets/lou1.png"),
          time: "2020-01-06"
        },
        {
          tit: "房地产行业集中度进一步提高百强 房企市场份额升",
          img: require("~/assets/lou1.png"),
          time: "2020-01-06"
        },
        {
          tit: "房地产行业集中度进一步提高百强 房企市场份额升",
          img: require("~/assets/lou1.png"),
          time: "2020-01-06"
        }
      ],
      s5_con: [
        {
          tit: "房地产行业集中度进一步提高百强 房企市场份额升",
          img: require("~/assets/lou1.png"),
          time: "2020-01-06"
        },
        {
          tit: "房地产行业集中度进一步提高百强 房企市场份额升",
          img: require("~/assets/lou1.png"),
          time: "2020-01-06"
        },
        {
          tit: "房地产行业集中度进一步提高百强 房企市场份额升",
          img: require("~/assets/lou1.png"),
          time: "2020-01-06"
        }
      ],
      s6_con: [
        {
          tit: "房地产行业集中度进一步提高百强 房企市场份额升",
          img: require("~/assets/lou1.png"),
          time: "2020-01-06"
        },
        {
          tit: "房地产行业集中度进一步提高百强 房企市场份额升",
          img: require("~/assets/lou1.png"),
          time: "2020-01-06"
        },
        {
          tit: "房地产行业集中度进一步提高百强 房企市场份额升",
          img: require("~/assets/lou1.png"),
          time: "2020-01-06"
        }
      ],
      s7_con: [
        {
          tit: "房地产行业集中度进一步提高百强 房企市场份额升",
          img: require("~/assets/lou1.png"),
          time: "2020-01-06"
        },
        {
          tit: "房地产行业集中度进一步提高百强 房企市场份额升",
          img: require("~/assets/lou1.png"),
          time: "2020-01-06"
        },
        {
          tit: "房地产行业集中度进一步提高百强 房企市场份额升",
          img: require("~/assets/lou1.png"),
          time: "2020-01-06"
        }
      ],
      questions: [
        {
          tit: "现在外地人在杭州买房需要什么条件",
          msg: "纳税或社保连年，需要连续足额缴存24个月~.",
          time: "2020-01-08",
          num: 12,
          id: 30
        },
        {
          tit: "现在外地人在杭州买房需要什么条件",
          msg: "纳税或社保连年，需要连续足额缴存24个月~.",
          time: "2020-01-08",
          num: 12,
          id: 30
        }
      ],
      buildings: [
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
      invest1: "",
      invest2: "",
      rigid_demand1: "",
      rigid_demand2: "",
      improve1: "",
      improve2: "",
      existing1: "",
      existing2: "",
      click: require("~/assets/noclick.png"),
      cityname: "杭州",
      ip: "",
      count: 123,
      tel: "",
      city:0
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
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
  methods: {
    method1: function() {
      newsticker();
    },
    s1s: function() {
      this.s1 = true;
      this.s2 = false;
      this.s3 = false;
      this.s4 = false;
      this.s5 = false;
      this.s6 = false;
      this.s7 = false;
    },
    s2s: function() {
      this.s1 = false;
      this.s2 = true;
      this.s3 = false;
      this.s4 = false;
      this.s5 = false;
      this.s6 = false;
      this.s7 = false;
    },
    s3s: function() {
      this.s1 = false;
      this.s2 = false;
      this.s3 = true;
      this.s4 = false;
      this.s5 = false;
      this.s6 = false;
      this.s7 = false;
    },
    s4s: function() {
      this.s1 = false;
      this.s2 = false;
      this.s3 = false;
      this.s4 = true;
      this.s5 = false;
      this.s6 = false;
      this.s7 = false;
    },
    s5s: function() {
      this.s1 = false;
      this.s2 = false;
      this.s3 = false;
      this.s4 = false;
      this.s5 = true;
      this.s6 = false;
      this.s7 = false;
    },
    s6s: function() {
      this.s1 = false;
      this.s2 = false;
      this.s3 = false;
      this.s4 = false;
      this.s5 = false;
      this.s6 = true;
      this.s7 = false;
    },
    s7s: function() {
      this.s1 = false;
      this.s2 = false;
      this.s3 = false;
      this.s4 = false;
      this.s5 = false;
      this.s6 = false;
      this.s7 = true;
    },
    start_data() {
      let name = this.$route.params.name;
      let nn = localStorage.getItem("pinyin", name);     
      let token = localStorage.getItem("token");
      $cookies.set("token", token);
      // let ip = '111.121.72.100';
      let ip = returnCitySN["cip"];
      // console.log(ip)
      this.ip = ip;
      $cookies.set("ip", ip);
      localStorage.setItem("ip", ip);
      let pin = this.pinyin;
      let cityname = this.cityname;
      
      if (!localStorage.getItem("num")) {
        if (nn) {
        } else {
          let ll=[];
          index_start({ip:ip,city:0}).then(resp=>{
            ll=resp.data.city;
            let citys=ll.id;
            let pinyins=ll.pinyin;
            let name=ll.name;
            $cookies.set('city',citys,0);
            $cookies.set('pinyin',pinyins,0);
            if(name==cityname){
              localStorage.setItem("num", 1);
              localStorage.setItem("pinyin", pin);
              this.$router.push("/" + pinyins);
            }else{
              window.location.href="/"+pinyins
            }
          })
        }
      } else {
        if (pin != name) {
          localStorage.setItem("pinyin",pin);
          window.location.href="/"+pin
          // this.$router.push("/" + pin);
        }
      }
      let city=this.city;
      $cookies.set("city", city);
      localStorage.setItem('city',city)
      $cookies.set("cityname", cityname);
      localStorage.setItem("cityname", cityname);
      $cookies.set("pinyin", pin);
      let tel = this.tel;
      this.isload = false;
      localStorage.setItem("call", tel);
    },
    agree(e) {
      // console.log(e.target)
      let img = require("~/assets/clicked.png");
      let id = e.target.getAttribute("data-v");
      let ip = this.ip;
      let token = localStorage.getItem("token");
      let that = this;
      let num = e.target.getAttribute("data-n");
      encyclopediaarticle_agree({
        ip: ip,
        id: id,
        platform: 2,
        token: token,
        type: 1
      })
        .then(resp => {
          if (resp.data.code == 500) {
            that.$router.push("/" + that.pinyin + "/login");
            // window.location.href = "/login";
          } else {
            let type = e.target.getAttribute("type");
            let click = require("~/assets/noclick.png");
            if (type == 0) {
              num = parseInt(num) + 1;
              e.target.setAttribute("data-n", num);
              e.target.setAttribute("type", 1);
              e.target.setAttribute("src", img);
              e.target.nextElementSibling.innerHTML = `有用(${num})`;
            } else {
              num = parseInt(num) - 1;
              e.target.setAttribute("data-n", num);
              e.target.setAttribute("type", 0);
              e.target.setAttribute("src", click);
              e.target.nextElementSibling.innerHTML = `有用(${num})`;
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    agrees(e) {
      // console.log(e.target)
      let img = require("~/assets/clicked.png");
      let id = e.target.getAttribute("data-v");
      let ip = this.ip;
      let token = localStorage.getItem("token");
      let that = this;
      let num = e.target.getAttribute("data-n");
      encyclopediaarticle_agree({
        ip: ip,
        id: id,
        platform: 2,
        token: token,
        type: 1
      })
        .then(resp => {
          if (resp.data.code == 500) {
            that.$router.push("/" + that.pinyin + "/login");
            // window.location.href = "/login";
          } else {
            let type = e.target.getAttribute("type");
            let click = require("~/assets/noclick.png");
            if (type == 0) {
              num = parseInt(num) + 1;
              e.target.setAttribute("data-n", num);
              e.target.setAttribute("type", 1);
              e.target.previousElementSibling.setAttribute("src", img);
              e.target.innerHTML = `有用(${num})`;
            } else {
              num = parseInt(num) - 1;
              e.target.setAttribute("data-n", num);
              e.target.setAttribute("type", 0);
              e.target.previousElementSibling.setAttribute("src", click);
              e.target.innerHTML = `有用(${num})`;
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    ency(e) {
      let id = e.target.getAttribute("data-v");
      let t = e.target.getAttribute("data-t");
      this.$router.push(
        "/" + this.pinyin + "/encyclopediaArticle/" + t + "/" + id
      );
    },
    gosearch() {
      this.$router.push("/" + pinyin + "/search");
    },
    gobaike() {
      this.$router.push("/" + pinyin + "/encyclopedia");
    },
    gozixun() {
      this.$router.push("/" + pinyin + "/realinformations");
    },
    gojisuan() {
      this.$router.push("/" + pinyin + "/count");
    },
    gotop() {
      this.$router.push("/" + pinyin + "/top");
    },
    ready() {
      let ip = returnCitySN["cip"];
      this.ip = ip;
      localStorage.getItem("ip");
    },
    scroll() {
      let Y = window.scrollY;
      if (Y <= 130) {
        this.lll = false;
      } else {
        this.lll = true;
      }
    },
    getwens(e) {
      let n = e.target;
      n.style.display = "none";
      n.previousElementSibling.style.whiteSpace = "inherit";
    }
  },
  mounted() {
    let h = document.body.clientHeight;
    if (h < 700) {
      $("#Foot").css({ position: "fixed", bottom: "0", width: "100%" });
    } else if (h >= 700) {
      $("#Foot").css({ position: "relative", bottom: "0", width: "100%" });
    }
    this.ready();
    // 接口调用
    
    this.start_data();
    // setTimeout(() => {
    //   if(that.kk==0){
    //     that.kk=1;
    //     this.$router.go(0)
    //   }
    // }, 10);
    let that = this;
    let cityname = localStorage.getItem("cityname");
    if (cityname) {
      this.cityname = cityname;
    }
    var mySwiper = new Swiper(".swiper-container9", {
      direction: "vertical", // 垂直切换选项
      autoplay: true,
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true //修改swiper的父元素时，自动初始化swiper
    });
    var swiper05 = new Swiper(".swiper-container", {
      slidesPerView: 2.5,
      spaceBetween: 10,
      observer: true,
      slidesOffsetAfter: 12
    });
    var swiper01 = new Swiper(".swiper-box", {
      slidesPerView: 2.5,
      spaceBetween: 12,
      observer: true,
      slidesOffsetAfter: 15
    });
    var swiper02 = new Swiper(".swiper-box-tui", {
      slidesPerView: 2.5,
      spaceBetween: 12,
      observer: true,
      observeParents: true,
      slidesOffsetAfter: 15
    });
    var swiper03 = new Swiper(".swiper-box2", {
      slidesPerView: 2.5,
      spaceBetween: 12,
      observer: true,
      observeParents: true,
      slidesOffsetAfter: 15
    });

    //选项卡
    $("#menu li").click(function() {
      $(this).addClass("active");
      $(this)
        .siblings()
        .removeClass("active");
      $(".panel")
        .siblings()
        .removeClass("active");
      $(".panel")
        .eq($(this).index())
        .addClass("active");
    });

    // 路由
    $(".mine").on("click", function() {
      that.$router.push("/" + that.pinyin + "/myhome");
      // window.location.href = '/'+that.pinyin+"/myhome";
    });
    $("#sea").on("click", function() {
      that.$router.push("/" + that.pinyin + "/sou");
      // window.location.href = '/'+that.pinyin+"/sou";
    });
    $(".city").on("click", function() {
      that.$router.push("/" + that.pinyin + "/address");
      // window.location.href = '/'+that.pinyin+"/address";
    });

    var swiper05 = new Swiper(".swiper-container1", {
      // eslint-disable-line no-unused-vars
      slidesPerView: 4.5,
      spaceBetween: 1,
      pagination: {
        clickable: true
      },
      observer: true,
      observeParents: true
    });
    $(".tegood p").on("click", function() {
      $(this)
        .addClass("active")
        .parent()
        .parent()
        .siblings("div")
        .find("div")
        .find("p")
        .removeClass("active");
    });
    $(".more-res").on("click", function() {
      that.$router.push("/" + that.pinyin + "/search");
      // window.location.href = '/'+that.pinyin+"/search";
    });

    window.addEventListener("scroll", this.scroll);
  },
  watch: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  padding: 0;
  margin: 0;
}
[v-cloak] {
  display: none;
}
a {
  text-decoration: none;
}
li {
  list-style: none;
}
#arealine {
  margin: 0;
}
/* 悬浮导航栏 */
#s-nav {
  width: 100%;
  left: 0;
  border-radius: 0;
  box-shadow: 0 0 0 0 #fff;
  padding: 0;
  padding-left: 12px;
  line-height: 54px;
  position: fixed;
  top: 0;
  z-index: 10;
  height: 54px;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.05);
}
#s-nav #sea {
  width: 59.7%;
  height: 34px;
  border: 1px solid #ccd1d9;
  border-radius: 16px;
  text-align: left;
  padding-left: 2%;
}
#s-nav .s-nav-img {
  margin-left: 3.5%;
  color: #80818b;
}
#s-nav .s-nav-img img {
  width: 4%;
  margin-bottom: 2px;
  margin-right: 1%;
}
.header .index-logo {
  width: 11.3%;
  position: absolute;
  top: 1%;
  left: 4%;
}
/* 头部图片 */
.header {
  position: relative;
}
.header .bg {
  width: 100%;
  height: 150px;
}
.header .mine {
  width: 6.4%;
  position: absolute;
  top: 1%;
  right: 4%;
}
.search {
  width: 92%;
  height: 40px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  padding: 10px 12px;
  position: absolute;
  top: 130px;
  left: 4%;
}
.search .city {
  color: #80818b;
  font-size: 14px;
  margin-right: 13px;
}
.search .city i {
  font-size: 8px;
  margin-left: 6px;
}
.search #sea {
  height: 16px;
  color: #95969c;
  font-size: 14px;
  padding-left: 4.545%;
  border: 0;
  border-left: 0.5px solid #d5d5df;
  background-color: #fff;
  line-height: 16px;
}
.search #sea span {
  font-size: 15px;
  margin-right: 6px;
}

/* 真导航 */
.m-na {
  width: 100%;
  margin-top: 20px;
  border-bottom: 0.5px solid #f3f5fb;
}

.m-na ul {
  height: 100px;
  margin: 0;
  padding: 0;
}

.m-na ul li {
  height: 100px;
  float: left;
  width: 20%;
  text-align: center;
  list-style: none;
}

.m-na ul li img {
  width: 54%;
  margin-top: 26.66%;
  margin-bottom: 12%;
}

.m-na ul li p {
  font-size: 14px;
  color: #333333;
}

.banner .trend {
  width: 100%;
  height: 42px;
  padding: 10px 2% 10px 4%;
  display: flex;
}
.trend .trend-lead {
  background: linear-gradient(
    0deg,
    rgba(221, 244, 255, 1),
    rgba(241, 250, 255, 1)
  );
  width: 17.67%;
  height: 20px;
  border-radius: 0 8px 0 8px;
  color: #4db5ff;
  font-size: 11px;
  text-align: center;
  line-height: 20px;
  margin-right: 8px;
  display: inline-block;
}
.swiper-container9 {
  height: 20px;
}
.swiper-container9 >>> .swiper-wrapper {
  display: block;
}
.trend .trend-con {
  color: #5e6166;
  font-size: 13px;
  display: inline-block;
  line-height: 10px;
  width: 69%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 20px;
}
.trend .trend-con .swiper-slide {
  font-size: 13px;
  color: #5e6166;
  /* height: 20px!important; */
  line-height: 20px;
}

.trend button {
  color: #5e6166;
  font-size: 13px;
  border: 0;
  border-left: 0.5px solid #d5d5df;
  background-color: #fff;
  margin-left: 6px;
  padding-left: 6px;
}

.line {
  width: 100%;
  height: 10px;
  background-color: #f7f7f7;
}

/* 房价趋势 */
.drift {
  height: 88px;
  padding-left: 4%;
}
.drift h2 {
  color: #2e3033;
  font-size: 18px;
  margin-bottom: 12px;
  margin-top: 20px;
  font-weight: bold;
}
.drift h2 .cur-img {
  width: 16px;
  margin-left: 6px;
}
.drift h2 span {
  color: #919499;
  font-size: 14px;
  float: right;
}
.drift h2 span img {
  width: 18%;
  margin-left: 2%;
  margin-bottom: 2px;
}

.drift .drift-con .drift-list {
  display: inline-block;
  margin-right: 36px;
}
.drift .drift-con .lbom {
  margin-right: 0;
}
.drift .drift-con .drift-list h4 {
  color: #2e3033;
  font-size: 16px;
  margin-bottom: 6px;
}
.drift .drift-con .drift-list h4 span {
  color: #919499;
  font-size: 11px;
}
.drift .drift-con .drift-list p {
  color: #919499;
  font-size: 11px;
}

/* 标签栏 */
.m-jia {
  width: 100%;
  height: 182px;
  position: relative;
}

.m-jia h3 {
  color: #333333;
  font-size: 18px;
  font-weight: bold;
  padding-top: 5.339%;
  padding-left: 4%;
  padding-bottom: 4%;
  margin: 0;
  font-weight: bold;
}

.swiper-container {
  width: 100%;
}

.swiper-slide {
  font-size: 18px;
  background: #fff;
}

.m-jia .swiper-wrapper {
  left: 4%;
}

.m-jia .swiper-slide {
  width: 37.3% !important;
  border: 0.5px solid rgba(240, 241, 245, 1);
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  padding: 10px 9px 10px 9px;
}

.m-jia .swiper-slide h6 {
  color: #2e3033;
  font-size: 16px;
  margin-bottom: 6px;
}
.m-jia .swiper-slide p {
  color: #919499;
  font-size: 11px;
  margin-bottom: 10px;
  white-space: nowrap;
}
.m-jia .swiper-slide img {
  width: 47%;
  height: 40px;
  display: inline-block;
  border-radius: 2px;
}

/* 楼盘榜单 */
#box {
  width: 100%;
  height: 100%;
  margin-bottom: 10px;
}
#menu {
  overflow: hidden;
  display: flex;
  width: 92%;
  margin-left: 4%;
  margin-top: 20px;
}
#menu li {
  width: 22.8%;
  height: 28px;
  background: #fff;
  border-radius: 2px;
  font-size: 14px;
  font-family: "Microsoft YaHei";
  font-weight: 500;
  color: rgba(128, 128, 128, 1);
  line-height: 28px;
  text-align: center;
  margin-right: 15px;
  border: 0.5px solid rgba(242, 244, 247, 1);
  box-shadow: 0px 1.5px 5px 0px rgba(0, 0, 0, 0.05);
  border-radius: 2px;
}
#menu .active {
  position: relative;
  width: 22%;
  height: 28px;
  /* border: 2px solid #000; */
  margin-bottom: 6px;
  color: #fff;
  background: #4db5ff;
  border: 0;
}
#menu .active::before {
  /* background:#3AC869;
            color:#fff; */
  display: inline-block;
  content: "";
  position: absolute;
  border: 5px solid transparent;
}
#menu .active::before {
  left: 43%;
  top: 28px;
  border-top-color: #4db5ff;
}
#menu .active::after {
  left: 40%;
  bottom: 17px;
  border-top-color: #4db5ff;
}

#panel .panel {
  display: none;
  margin-bottom: 1.2rem;
  overflow: hidden;
  margin-top: 0.31rem;
  border: 0;
  box-shadow: 0 0 0 0 #fff;
}
#panel .active {
  display: block;
}
#panel .panel {
  padding-left: 4%;
}
#panel .panel .hot-fang {
  top: -12px;
}
#panel .panel .hot-fang a {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(255, 255, 255, 1);
  border-radius: 6px;
}
#panel .panel .hot-fang .hua {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  /* border:0.5px solid rgba(237,237,237,1);  */
  border-radius: 6px;
  box-shadow: 0px 3px 5px 2px rgba(0, 0, 0, 0.03);
}
#panel .panel .hot-fang .hua .hf-pic {
  position: relative;
  width: 100%;
  height: 70px;
}
.hot-fang .hua .hf-pic span {
  width: 28%;
  position: absolute;
  top: 0;
  left: 0;
  height: 18px;
  background: linear-gradient(
    270deg,
    rgba(255, 124, 72, 1),
    rgba(255, 66, 52, 1)
  );
  border-radius: 6px 0px 6px 0px;
  display: block;
  font-size: 12px;
  font-family: "Microsoft YaHei";
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 18px;
  text-align: center;
}
#panel .panel .hot-fang .hua .hf-pic p {
  color: #ffffff;
  font-size: 10px;
  position: absolute;
  bottom: 5px;
  right: 6px;
}
#panel .panel .hot-fang .hua .hf-pic p img {
  width: 12px;
  height: 12px;
}
#panel .panel .hot-fang .hua .hf-pic img {
  width: 100%;
  height: 70px;
  border-radius: 6px 6px 0px 0px;
  margin-bottom: 2px;
}
.panel .hot-fang .hf-con {
  padding-left: 4%;
}
.panel .hot-fang .hua {
  float: left;
}
.panel .hot-fang .hf-con h1 {
  font-size: 14px;
  font-family: "Microsoft YaHei";
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 16px;
  margin-top: 10px;
  margin-bottom: 8px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.panel .hot-fang .hf-con p {
  font-size: 12px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 15px;
  height: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.panel .hot-fang .hf-con h6 {
  font-size: 12px;
  font-family: "Microsoft YaHei";
  font-weight: 500;
  color: rgba(255, 106, 72, 1);
  line-height: 24px;
}

/* 楼盘动态 */
.m-dong {
  position: relative;
}

.m-dong h3 {
  color: #404040;
  font-size: 18px;
  margin-left: 4%;
  margin-top: 22px;
  font-weight: bold;
  margin-bottom: 16px;
}
.m-dong h3 span {
  color: #898989;
  font-size: 14px;
  float: right;
  margin-right: 2%;
}
.m-dong h3 span img {
  width: 18%;
  margin-bottom: 2px;
}
.m-dong h3 span i {
  font-style: normal;
}
.m-dong .m-d-con {
  margin-top: 18px;
  margin: 0 4% 38px;
  padding: 0 4%;
}
.m-dong .m-d-con h4 {
  color: #404040;
  font-size: 15px;
  margin-bottom: 14px;
}
.m-dong .m-d-con h4 img {
  width: 14%;
  margin-right: 4%;
}
.m-dong .m-d-con p {
  color: #989898;
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 7px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  height: 66px;
}
.m-dong .m-d-con .m-d-span {
  float: right;
  color: #676767;
  font-size: 12px;
}
.m-dong .m-d-o {
  width: 7px;
  height: 7px;
  background-color: #ededed;
  border-radius: 50%;
  position: absolute;
  left: 4%;
}
.m-dong .m-d-l {
  width: 0.5px;
  background-color: #ededed;
  position: absolute;
  left: 4.8%;
}
.m-dong .o1 {
  top: 37px;
}
.m-dong .o2 {
  top: 174px;
}
.m-dong .l1 {
  height: 137px;
  top: 37px;
}
.m-dong .l2 {
  height: 100px;
  top: 174px;
}

.m-dong .dong-t li {
  width: 92%;
  margin-left: 4%;
  height: 110px;
  border: 1px solid rgba(245, 245, 245, 1);
  border-radius: 6px;
  padding: 0 2.6%;
}
.m-dong .dong-t li h1 {
  font-size: 17px;
  font-family: "Microsoft YaHei";
  font-weight: bold;
  color: rgba(64, 64, 64, 1);
  line-height: 15px;
  margin-top: 17px;
  margin-bottom: 12px;
}
.m-dong .dong-t li p {
  font-size: 14px;
  font-family: "Microsoft YaHei";
  font-weight: 500;
  color: rgba(152, 152, 152, 1);
  line-height: 19px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin-bottom: 5px;
}
.m-dong .dong-t li h5 {
  font-size: 12px;
  font-family: "Microsoft YaHei";
  font-weight: 500;
  color: rgba(103, 103, 103, 1);
  line-height: 15px;
  text-align: right;
}

/* 楼市动态 */
.lou_dong {
  width: 100%;
  position: relative;
}
.lou_dong .lou_dong_cen {
  height: 284px;
  width: 100%;
  background: #fff;
}
.lou_dong .lou_dong_cen h1 {
  font-size: 18px;
  font-family: "Microsoft YaHei";
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 60px;
  padding-left: 15px;
  margin-top: 5px;
}
.lou_dong_cen .lou_dong_box {
  height: 191px;
  padding-left: 4%;
  padding-right: 4%;
}
.lou_dong_box .lou_dong_left {
  float: left;
  width: 48.4%;
  height: 191px;
  background: url(~assets/f_01.jpg) no-repeat;
  background-size: 100%;
  border-radius: 6px;
}
.lou_dong_left h2 {
  font-size: 15px;
  font-family: "Microsoft YaHei";
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  margin-left: 8%;
  margin-top: 20px;
  margin-bottom: 5px;
  height: 16px;
  line-height: 17px;
  overflow: hidden;
  margin-right: 8%;
}
.lou_dong_left p {
  font-size: 12px;
  font-family: "Microsoft YaHei";
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  opacity: 0.8;
  line-height: 18px;
  margin-left: 8%;
  margin-right: 8%;
  height: 36px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.lou_dong_box .lou_dong_right {
  float: left;
  width: 48.4%;
  height: 191px;
  margin-left: 2.9%;
}
.lou_dong_right .yu_shou h2,
.lou_dong_right .yao_hao h2 {
  font-size: 15px;
  font-family: "Microsoft YaHei";
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  margin-left: 8%;
  margin-bottom: 5px;
  margin-right: 8%;
  height: 18px;
  overflow: hidden;
  margin-top: 3px;
  line-height: 20px;
}

.lou_dong_right .yu_shou p,
.lou_dong_right .yao_hao p {
  font-size: 12px;
  font-family: "Microsoft YaHei";
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  opacity: 0.8;
  margin-left: 8%;
  margin-right: 8%;
  height: 36px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.lou_dong_right .yu_shou {
  width: 100%;
  height: 90px;
  background: url(~assets/f_02.jpg) no-repeat;
  margin-bottom: 11px;
  background-size: 100%;
  padding-top: 14px;
  border-radius: 6px;
}
.lou_dong_right .yao_hao {
  width: 100%;
  height: 90px;
  background: url(~assets/f_03.jpg) no-repeat;
  background-size: 100%;
  padding-top: 14px;
  border-radius: 6px;
}

/* 楼盘问问 */
.wen {
  padding-left: 4%;
  padding-top: 18px;
}
.wen h4 {
  color: #2e3033;
  font-size: 18px;
  margin-bottom: 24px;
  font-weight: bold;
}
.wen h4 span {
  color: #919499;
  font-size: 14px;
  float: right;
  margin-right: 2%;
}
.wen h4 span img {
  width: 18%;
  margin-bottom: 2px;
}
.wen .wen-list {
  border-bottom: 0.5px solid #f2f4f7;
  padding-left: 7.536%;
  margin-bottom: 16px;
  position: relative;
  width: 99%;
}
.wen .wen-list:nth-of-type(2) {
  border: 0;
}
.wen .wen-list h5 {
  color: #2e3033;
  font-size: 16px;
  font-weight: normal;
  margin-bottom: 22px;
  position: relative;
}
.wen .wen-list h5 span {
  width: 17px;
  height: 17px;
  background: rgba(250, 246, 235, 1);
  border-radius: 5px 0px 5px 0px;
  display: block;
  position: absolute;
  left: -26px;
  color: #b47438;
  font-size: 13px;
  display: block;
  text-align: center;
  line-height: 17px;
  top: 1px;
}
.wen .wen-list .wen-con {
  color: #919499;
  font-size: 15px;
  width: 86.95%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 16px;
  position: relative;
}
.wen .wen-list .wen-list-more {
  position: absolute;
  right: 4%;
  font-style: normal;
  color: #919499;
  top: 40px;
}
.wen .wen-list span.answer {
  width: 17px;
  height: 17px;
  background: rgba(235, 243, 250, 1);
  border-radius: 5px 0px 5px 0px;
  display: block;
  position: absolute;
  color: #5a7699;
  font-size: 13px;
  text-align: center;
  line-height: 17px;
  left: 0;
  top: 41px;
}
.wen .wen-list .wen-time {
  color: #919499;
  font-size: 12px;
  margin-bottom: 16px;
  display: inline-block;
}
.wen .wen-list .Fabulous {
  color: #919499;
  font-size: 11px;
  float: right;
  margin-right: 6%;
}
.wen .wen-list .Fabulous img {
  width: 16px;
  margin-bottom: 3px;
}
/* 帮我找房 */
.help {
  height: 80px;
}
.help img {
  width: 100%;
  height: 100%;
}

/* 推荐楼盘 */
.recommen {
  padding: 19px 15px 25px 15px;
}
.recommen h4 {
  color: #303033;
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: bold;
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
  margin-bottom: 25px;
}
.recommen .re-list {
  padding: 16px 0;
  border-bottom: 0.5px solid #f2f4f7;
}
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
  width: 65%;
  position: relative;
  top: 1px;
}
.recommen .re-list .re-con-right h5 {
  color: #2e3033;
  font-size: 17px;
  margin-bottom: 2px;
}
.recommen .re-list .re-con-right h5 span {
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
.lists {
  margin-top: 20px;
  padding: 0 4%;
}
.lists li {
  margin-bottom: 14px;
  width: 100%;
}
.lists .list {
  padding-bottom: 9px;
  height: 84px;
  border-bottom: 0.5px solid #f3f5fb;
}

.lists .list .left {
  float: left;
}
.lists .list .left h5 {
  color: #2e3033;
  font-size: 16px;
  margin-bottom: 15px;
  width: 225px;
  height: 45px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  line-height: 23px;
}
.lists .list .left p {
  color: #919499;
  margin-right: 4px;
  font-size: 11px;
}
.lists .list .right {
  float: right;
}
.lists .list .right img {
  width: 100px;
  height: 70px;
  border-radius: 5px;
}
.nav {
  margin-left: 4%;
  height: 30px;
  overflow: hidden;
}
.nav .swiper-container {
  height: 32px;
}
.tegood p {
  color: #919499;
  font-size: 16px;
  position: relative;
}
.tegood p.active {
  color: #2e3033;
  font-weight: bold;
}
.tegood p.active i {
  display: block;
  position: absolute;
  bottom: -7px;
  width: 31.5%;
  height: 2.5px;
  background-color: #40a2f4;
  left: 50%;
  margin-left: -21.75%;
}
</style>
