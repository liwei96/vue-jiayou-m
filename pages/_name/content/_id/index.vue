<template>
  <div class="Content">
    <no-ssr>
      <remote-js src="https://webapi.amap.com/maps?v=1.4.14&key=729ac4d779c7e625bc11bd5ba3ff3112"></remote-js>
    </no-ssr>
    <div class="container-fluid m" v-cloak>
      <div class="headertop">
        <h2>
          <img class="top-ll" src="~/assets/return.png" alt @click="goback" />
          <img class="content-img" src="~/assets/content-logo.png" alt />
          <img class="topright tophome" src="~/assets/top-house.png" alt />
          <img class="topright" src="~/assets/top-user.png" alt @click="gohome" />
        </h2>
      </div>

      <div class="m-lun visible-xs-block .visible-sm-block">
        <div class="zao"></div>
        <div class="m-luns">
          <div class="swiper-top">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(img,key) in topimgs" :key="key">
                <img :src="img" style="width:100%" />
              </div>
            </div>
            <div id="swiper-pagination1"></div>
          </div>
          <span id="lnum">共{{topnum}}张</span>
        </div>
      </div>
      <transition name="fade">
        <div class="fixs" v-if="fx">
          <img src="~/assets/return.png" alt @click="goback" />
          <ul>
            <li
              :class="fx1==key&&'active'"
              v-for="(item,key) in fxs"
              :key="key"
              @click="goto(key)"
            >{{item}}</li>
          </ul>
        </div>
      </transition>
      <div class="tuan-msg" v-if="tuan==1">
        <div class="tar">
          <div class="left">
            <h5>
              已售：
              <span>{{group_buy.saled_num}}</span>
              套&nbsp;&nbsp;距下一返期只差{{group_buy.remain_num}}套
            </h5>
            <p>(每多5套可优惠1000元最高优惠5000元)</p>
          </div>
          <div class="right">
            <h5>距离活动结束</h5>
            <p>
              {{day}}天
              <span>{{hour}}:{{min}}:{{second}}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="m-incro visible-xs-block .visible-sm-block">
        <h3>{{building.name}}</h3>
        <div class="m-ic-icons">
          <span class="m-zai">{{building.status}}</span>
          <span class="m-jing">{{building.decorate}}</span>
          <span v-if="building.railway">{{building.railway}}</span>
          <span>{{building.tag}}</span>
          <i class="m-ishou">
            <img src="~/assets/contrast.png" alt />
            <i class="m_shou01" @click="pks($event)" :data-v="id">楼盘PK</i>
          </i>
        </div>
        <ul class="m-jtop">
          <li>
            <p>
              <span>{{parseInt(building.total_price_min)}}</span>万起
            </p>
            <span>总价</span>
          </li>
          <li>
            <p class="lo">{{building.apartment}}</p>
            <span>户型</span>
          </li>
          <li>
            <p v-if="building.area_min">
              <span>{{parseInt(building.area_min)}}-{{parseInt(building.area_max)}}</span>/m²
            </p>
            <span>建面</span>
          </li>
        </ul>
        <div class="m-ibottom">
          <ul>
            <li>
              单价&nbsp;:&nbsp;
              <span class="m-pric">{{building.single_price}}元/m²起</span>
            </li>
            <li>
              装修&nbsp;:&nbsp;
              <span>{{building.decorate}}</span>
            </li>
          </ul>
          <ul>
            <li>
              类型&nbsp;:&nbsp;
              <span class="m-pric">{{building.type}}</span>
            </li>
            <li>
              开盘&nbsp;:&nbsp;
              <span>{{building.first_open_time}}</span>
            </li>
          </ul>
          <router-link :to="'/' + jkl + '/detail/' + id">
            <p id="moreinfro">
              详情
              <img src="~/assets/m-go.png" alt />
            </p>
          </router-link>
        </div>
        <div class="go-map">
          <img class="map-address" src="~/assets/blackaddress.png" alt />
          <span>{{building.address}}</span>
          <img class="map-go" src="~/assets/m-go.png" alt />
        </div>
        <div class="m-new">
          <div href="javascript:;" class="p1" data-v="变价通知">
            <img src="~/assets/force.png" />最新变价通知
          </div>
          <div href="javascript:;" class="p1" data-v="开盘通知">
            <img src="~/assets/horn.png" />最新开盘通知
          </div>
        </div>
      </div>

      <div class="m-image visible-xs-block .visible-sm-block">
        <a data-agl-cvt="2" :href="'tel:'+call">
          <img src="~/assets/mj-tell.png" alt />
        </a>
      </div>
      <div class="pin" v-if="tuan==1">
        <nav>
          <h3>拼团优惠</h3>
          <p>
            距离活动结束
            <span>{{day}}</span>天
            <span>{{hour}}</span>:
            <span>{{min}}</span>:
            <span>{{second}}</span>
          </p>
        </nav>
        <img src="~/assets/tuan-pin.png" alt />
        <div class="pin-bao" @click="xiang" v-if="!newimg">立享优惠</div>
        <img src="~/assets/tuna-hased.png" alt class="hased" v-if="newimg" />
        <div class="bom">
          <div class="trend-con1">
            <div class="swiper-container10">
              <div class="swiper-wrapper">
                <div
                  class="swiper-slide"
                  v-for="(trend,key) in group_buy.last_tels"
                  :key="key"
                >{{trend}}领取了优惠券</div>
              </div>
            </div>
          </div>
          <p>
            已有
            <span>{{group_buy.received_num}}</span>人领取了优惠券
          </p>
        </div>
      </div>
      <div class="m-line visible-xs-block .visible-sm-block" v-if="tuan==1"></div>
      <div class="m-dong visible-xs-block .visible-sm-block">
        <h3 id="m_dong">
          楼盘动态
          <router-link :to="'/' + jkl + '/contentdynamic/' + id">
            <span>
              共{{ds}}条
              <img src="~/assets/m-go.png" alt />
            </span>
          </router-link>
        </h3>

        <div class="m-tai m-d">
          <span>
            {{nowdong.time}}
            <i>最新</i>
          </span>
          <h4>{{building.name}}最新房源动态</h4>
          <p>{{nowdong.content}}</p>
        </div>
        <div class="m-jia m-d" v-if="tui.length==0?false:true">
          <span>
            {{tui.time}}
            <i>加推</i>
          </span>
          <h4>最新加推楼盘</h4>
          <p>{{tui.content}}</p>
        </div>

        <div class="t-o o1"></div>
        <div class="t-o o2" v-if="tui.length==0?false:true"></div>
        <div class="t-l l1"></div>
        <div class="t-l l2" v-if="tui.length==0?false:true"></div>
        <!-- <img style="margin-left: 10px;" :src="nd" alt /> -->
        <div class="d-pic">
          <img style="margin-left: 10px;" :src="nd" alt />
          <img :src="sk" alt />
          <img :src="jt" alt />
          <img :src="jf" alt />
          <div :class="ndss">
            <p>拿地</p>
            <span>{{ndtime}}</span>
          </div>
          <div :class="jtss">
            <p>加推</p>
            <span>{{jttime}}</span>
          </div>
          <div :class="skss">
            <span>{{sktime}}</span>
            <p>首开</p>
          </div>
          <div :class="jfss">
            <span>{{jftime}}</span>
            <p>交房</p>
          </div>
        </div>

        <button class="p1" data-v="最新动态">获取最新动态</button>
      </div>

      <div class="m-line visible-xs-block .visible-sm-block"></div>

      <div class="m-hu visible-xs-block .visible-sm-block">
        <h3>
          主力户型
          <router-link :to="'/' + jkl + '/morehus/' + id">
            <span class="m-h-more">
              更多户型
              <img src="~/assets/m-go.png" alt />
            </span>
          </router-link>
        </h3>
        <div class="h-c" v-for="(h,key) in hu" :key="key">
          <div class="col-xs-4 h-c-i">
            <router-link :to="'/'+jkl+'/HuAnalysis/'+h.id+'/'+building.id">
              <img :src="h.img" alt />
            </router-link>
          </div>
          <div class="col-xs-8 h-c-c">
            <div class="h-t">
              <h4>{{h.title}}</h4>
              <span class="h-t-z">{{h.status}}</span>
              <span class="h-t-m">
                <i>{{h.price}}</i>万起
              </span>
            </div>
            <div class="sp">特点：{{h.feature}}</div>
            <div class="sp">类型：{{h.type}}</div>
            <div class="sp sp-f">户型分析：{{h.analysis}}</div>
          </div>
        </div>

        <button class="p1" data-v="了解详细户型">了解详细户型</button>
      </div>
      <div class="m-line visible-xs-block .visible-sm-block"></div>
      <div class="m-you visible-xs-block .visible-sm-block">
        <img class="m-y-g p1" src="~/assets/new-yuyue.jpg" data-v="抢免费专车票" />
      </div>

      <div class="m-line visible-xs-block .visible-sm-block"></div>

      <!--对比分析资料 -->
      <div class="m-fen visible-xs-block .visible-sm-block">
        <h3>
          对比分析资料
          <router-link :to="'/' + jkl + '/analysis/' + id">
            <span class="m-more-fen">
              详细分析
              <img class="xiang-img" src="~/assets/m-go.png" alt />
            </span>
          </router-link>
        </h3>

        <!--对比分析资料 -->
        <div class="dui-zi">
          <div class="swiper-wrapper">
            <div class="swiper-slide dui-box">
              <router-link :to="'/'+jkl+'/analysis/'+id">
                <div class="tou-con">
                  <h4>投资分析</h4>
                  <p v-for="(v,key) in invest" :key="key">{{key+1}}、{{v}}</p>
                </div>
                <div class="tou-img">
                  <img src="~/assets/pc-db.png" alt />
                </div>
              </router-link>
            </div>
            <div class="swiper-slide dui-box">
              <router-link :to="'/'+jkl+'/analysis/'+id">
                <div class="tou-con">
                  <h4>宜居分析</h4>
                  <p v-for="(v,key) in live" :key="key">{{key+1}}、{{v}}</p>
                </div>
                <div class="tou-img">
                  <img src="~/assets/yiju.png" alt />
                </div>
              </router-link>
            </div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination2"></div>
        </div>

        <button class="p1" data-v="获取详细分析资料">获取详细分析资料</button>
      </div>
      <div class="m-line visible-xs-block .visible-sm-block" v-if="tuan==1"></div>
      <div class="tuan-qiang"  v-if="tuan==1">
        <img src="~/assets/tuan-qiang.png" alt />
        <div class="q-con">
          <h6>省钱买好房拼团享优惠</h6>
          <p>购房享1000元优惠最高5000元</p>
        </div>
        <div class="q-right">
          <button @click="xiang">马上抢</button>
          <p>{{group_buy.received_num}}已抢</p>
        </div>
      </div>
      <div class="m-line visible-xs-block .visible-sm-block"></div>
      <div class="m-ling visible-xs-block .visible-sm-block">
        <h3>
          楼盘资料免费领
          <span>
            已有
            <i>860</i>人领取
          </span>
        </h3>
        <img src="~/assets/new_map.png" alt />
        <div class="m-iright">
          <h4>为什么大家在准备买房的时候领 一份资料？</h4>
          <p>1.没领地图，许多人后悔买错了房子</p>
          <p>2.楼盘价格走势及商业分析报告资料</p>
        </div>
        <button class="p1" data-v="领取免费资料">我要领取地图</button>
      </div>
      <div class="m-line visible-xs-block .visible-sm-block"></div>
      <div class="m-huo visible-xs-block .visible-sm-block">
        <h3>
          查询真实最新成交价
          <p>
            已有
            <span>{{searchnum}}</span>人查询
          </p>
        </h3>
        <div id="chart" style="width:92%;height:250px;margin-left:4%"></div>
        <table>
          <tbody>
            <tr>
              <th>日期</th>
              <th>成交套数</th>
              <th>成交金额</th>
            </tr>
            <tr v-for="(dd,key) in chengjiao" :key="key">
              <td>{{dd.date}}</td>
              <td>{{dd.num}}套</td>
              <td>***万</td>
            </tr>
          </tbody>
        </table>
        <div class="m-btns">
          <button class="p1" data-v="最新成交价">获取成交详情</button>
        </div>
      </div>
      <div class="m-line visible-xs-block .visible-sm-block"></div>
      <div class="m-dai visible-xs-block .visible-sm-block">
        <h3>
          楼盘问答
          <router-link :to="'/' + jkl + '/question/' + id">
            <span>
              更多问答
              <img src="~/assets/m-go.png" alt />
            </span>
          </router-link>
        </h3>
        <p id="tishi" v-if="questions.length==0?true:false">暂无问答，快来提问吧</p>
        <div class="m-d-content">
          <div class="m-w-content" v-for="(q,key) in questions" :key="key">
            <h4>
              <span>问</span>
              <u>{{q.question}}</u>
            </h4>
            <p>
              <span>答</span>
              <i>
                {{q.answer.substr(0,30)}}{{q.answer.length>30?'~.':''}}
                <u
                  v-if="q.answer.length>30"
                  @click="chan($event)"
                >展开</u>
              </i>
              <i class="sl">{{q.answer}}</i>
            </p>
            <span class="time">{{q.time}}</span>
            <span class="giveup">
              <img
                id="answer"
                src="~/assets/giveup.png"
                :type="q.my_like"
                :data-v="q.id"
                :data-n="q.num"
                data-y="1"
                @click="agree($event)"
              />
              <span
                :type="q.my_like"
                :data-v="q.id"
                :data-n="q.num"
                data-y="1"
                @click="agrees($event)"
              >有用({{q.num}})</span>
            </span>
          </div>
          <button class="question">我要提问</button>
        </div>
      </div>
      <div class="m-line visible-xs-block .visible-sm-block"></div>

      <div class="m-zhou visible-xs-block .visible-sm-block">
        <h3>
          周边规划
          <span>
            详细规划
            <img src="~/assets/m-go.png" alt />
          </span>
        </h3>
        <router-link :to="'/' + jkl + '/Periphery/' + id + '/1'">
          <div class="m-continer" id="m-container"></div>
        </router-link>
        <div class="m-z-icons">
          <ul>
            <li @click="jiaotong">
              <img src="~/assets/icon_02.png" alt />
              交通
            </li>
            <li @click="jiaoyu">
              <img src="~/assets/icon_04.png" alt />
              教育
            </li>
            <li @click="yiliao">
              <img src="~/assets/icon_03.png" alt />
              医疗
            </li>
            <li @click="shenghuo">
              <img src="~/assets/icon_01.png" alt />
              生活
            </li>
          </ul>
        </div>
        <button class="p1" data-v="楼盘周边信息">获取周边信息</button>
      </div>
      <div class="m-line visible-xs-block .visible-sm-block"></div>
      <!-- 房价趋势 -->
      <div class="m-trend visible-xs-block .visible-sm-block">
        <h4>房价趋势</h4>
        <div id="pic"></div>
        <div class="m-mark">
          <i class="m-s1"></i>
          <span>{{building.name}}</span>
          <i class="m-s2"></i>
          <span>{{building.country}}</span>
          <i class="m-s3"></i>
          <span>{{building.city}}</span>
        </div>
        <p class="msg">
          <img src="~/assets/bell.png" alt />
          价格变动这么快？
          订阅最新变价通知，楼盘变价我们第一时间通知您
        </p>
        <button class="p1" data-v="变价通知">获取最新变价通知</button>
      </div>
      <div class="m-line visible-xs-block .visible-sm-block"></div>
      <!-- 楼盘对比 -->
      <div class="m-contrast">
        <h4>楼盘对比</h4>
        <div class="re-con" v-for="(c,key) in compares" :key="key">
          <template v-if="key<3?true:false">
            <input type="radio" name="pk" @click="pk($event)" :data-v="c.id" />
            <div class="re-list">
              <router-link :to="'/'+jkl+'/content/'+c.id">
                <div class="re-con-left">
                  <img :src="c.img" alt />
                </div>
                <div class="re-con-right">
                  <h5>{{c.name}}</h5>
                  <p class="price">
                    <span>{{parseInt(c.single_price)}}</span>元/m²
                  </p>
                  <p class="area">
                    <span>{{c.city}}-{{c.country}}</span>
                    <span v-if="c.area_min">
                      {{parseInt(c.area_min)}}
                      <span v-if="c.area_max">-</span>
                      {{parseInt(c.area_max)}}m²
                    </span>
                  </p>
                </div>
              </router-link>
            </div>
          </template>
        </div>
        <div class="warning" v-if="warn">请选择对比楼盘</div>
        <button class="pkbtn" @click="pkhref()">楼盘对比</button>
      </div>
      <div class="m-line visible-xs-block .visible-sm-block"></div>
      <!-- 楼盘点评 -->
      <div class="m-dian visible-xs-block .visible-sm-block">
        <h4>
          楼盘点评
          <router-link :to="'/' + jkl + '/morecomments/' + id">
            <span id="m_d_more">
              更多评论
              <img src="~/assets/m-go.png" alt />
            </span>
          </router-link>
        </h4>
        <p id="tishi" v-if="comments.length==0?true:false">暂无点评，快来点评吧</p>
        <ul>
          <li v-for="(v,key) in comments" :key="key">
            <div class="left">
              <img src="~/assets/jiapeo.png" alt />
            </div>
            <div class="right">
              <h6>
                {{v.mobile}}
                <van-rate
                  v-model="value"
                  :size="13"
                  color="#2E3033"
                  void-icon="star"
                  void-color="#E8EBED"
                  :readonly="read"
                />
              </h6>
              <p class="txt">{{v.content}}</p>
              <div class="btn">
                <span>{{v.time}}</span>
                <strong :data-v="v.id" @click="del($event)" v-if="tel==v.mobile">删除</strong>
                <p class="interaction">
                  <img
                    id="agree"
                    :data-v="v.id"
                    :type="v.my_like"
                    :data-n="v.like_num"
                    @click="agree($event)"
                    data-y="2"
                    src="~/assets/click.png"
                  />
                  <span
                    :data-v="v.id"
                    :type="v.my_like"
                    :data-n="v.like_num"
                    data-y="2"
                    @click="agrees($event)"
                  >点赞({{v.like_num}})</span>
                  <span @click="commitback(v.id)">回复({{v.answer_num}})</span>
                </p>
              </div>
            </div>
          </li>
        </ul>
        <router-link :to="'/'+jkl+'/comment/'+id">
          <button class="m-d-x">我要点评</button>
        </router-link>
      </div>
      <div class="m-line visible-xs-block .visible-sm-block"></div>
      <!-- 同价位、区位 -->
      <div class="m-tui visible-xs-block .visible-sm-block">
        <div class="m-nav">
          <p class="n-active" @click="n1s">
            同价位楼盘
            <i></i>
          </p>
          <p @click="n2s">
            同区位楼盘
            <i></i>
          </p>
        </div>
        <div class="re-con r1" v-show="n1">
          <div class="re-list" v-for="(list,key) in same_price" :key="key">
            <router-link :to="'/'+jkl+'/content/'+list.id">
              <div class="re-con-left">
                <img :src="list.img" alt />
                <span>
                  <i class="iconfont iconyanjing"></i>
                  {{list.num}}
                </span>
              </div>
              <div class="re-con-right">
                <h5>
                  {{list.name}}
                  <span>{{list.status}}</span>
                </h5>
                <p class="price">
                  <span>{{list.single_price}}</span>元/m²
                </p>
                <p class="area">
                  <span>{{list.city}}-{{list.country}}</span>
                  <span v-if="list.area_min">建面</span>
                  <span v-if="list.area_min">
                    {{parseInt(list.area_min)}}
                    <span v-if="list.area_max">-</span>
                    {{parseInt(list.area_max)}}m²
                  </span>
                </p>
                <p class="tabs">
                  <span class="strong">{{list.decorate}}</span>
                  <span v-if="list.railway">{{list.railway}}</span>
                  <span>{{list.type}}</span>
                </p>
              </div>
            </router-link>
          </div>
        </div>
        <div class="re-con r2" v-show="n2">
          <div class="re-list" v-for="(list,key) in same_area" :key="key">
            <router-link :to="'/'+jkl+'/content/'+list.id">
              <div class="re-con-left">
                <img :src="list.img" alt />
                <span>
                  <i class="iconfont iconyanjing"></i>
                  {{list.num}}
                </span>
              </div>
              <div class="re-con-right">
                <h5>
                  {{list.name}}
                  <span>{{list.status}}</span>
                </h5>
                <p class="price">
                  <span>{{list.single_price}}</span>元/m²
                </p>
                <p class="area">
                  <span>{{list.city}}-{{list.country}}</span>
                  <span>建面</span>
                  <span>
                    {{parseInt(list.area_min)}}
                    <span v-if="list.area_max">-</span>
                    {{parseInt(list.area_max)}}m²
                  </span>
                </p>
                <p class="tabs">
                  <span class="strong">{{list.decorate}}</span>
                  <span v-if="list.railway">{{list.railway}}</span>
                  <span>{{list.type}}</span>
                </p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="visible-xs-block .visible-sm-block m-ll"></div>
      <!-- 底部悬浮 -->
      <div class="m-botnav visible-xs-block .visible-sm-block">
        <p id="m_shou">
          <img id="fork" src="~/assets/forks.png" alt :data-v="id" @click="collections($event)" />
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
      <foot-view :pinyin="jkl"></foot-view>
      <div class="visible-xs-block .visible-sm-block">
        <div class="m-p-succ">
          <div class="p-c-top">
            <img src="~/assets/p-success.png" alt />
          </div>
          <div class="p-c-bottom">
            <p>评论成功</p>
            <button class="p-c-exc">我知道了</button>
          </div>
        </div>

        <div id="mpanel5"></div>
        <transition name="change">
          <div class="weiter ts" v-show="change">
            <div class="t-top">
              <h6>预约看房</h6>
              <p>一键预约看房免费小车上门接送，可带家人一起参观多个热门楼盘</p>
              <img id="w-esc" src="~/assets/w-del.png" alt @click="guanbi" />
            </div>
            <div class="t-bottom">
              <div class="t-b-first">
                <input class="l-p" type="text" placeholder="输入预约手机号码" v-model="baoming" />
                <p class="w-mg">
                  <input class="w-mg-c" type="checkbox" checked v-model="checks" />我已阅读并同意
                  <router-link :to="'/'+jkl+'/server'">
                    <a href="javasript:;">《允家新房用户协议》</a>
                  </router-link>
                </p>
                <p class="tishi">请勾选用户协议</p>
                <button class="t-b-btn t-b-btn2 bg_01" id="dingxue" @click="dingyue">立即订阅</button>
                <p class="w-tit">
                  <img src="~/assets/w-call.png" />允家严格保障您的信息安全
                </p>
              </div>
              <div class="t-b-second">
                <p>
                  验证码已发送到
                  <span id="ytel">187****4376</span>，请注意查看
                </p>
                <input type="text" placeholder="请输入验证码" v-model="ma" id="ma-ll" />
                <button class="port1" @click="check">确定</button>
                <input type="hidden" id="building_name" value />
                <input type="hidden" value />
                <button class="t-b-scode" @click="again">获取验证码</button>
              </div>
            </div>
          </div>
        </transition>
        <div class="m-chang"></div>
        <transition name="change">
          <div class="m-o-succ" v-show="succ">
            <img class="o-esc" src="~/assets/m-esc.png" alt @click="guanbi" />
            <img src="~/assets/m-success.png" alt class="o-success" />
            <p id="o_p">已成功订阅最新动态，我们会第一时间通过短信通知您！</p>
            <button id="o_btn" @click="guanbi">确定</button>
          </div>
        </transition>
        <div id="m_ti"></div>
        <div class="m-bigimgs">
          <img class="m_bigimgs" src alt />
        </div>
      </div>
      <div id="panel" style="display:none;"></div>
    </div>
    <transition name="fade">
      <my-loading v-if="load"></my-loading>
    </transition>
  </div>
</template>
<script>
import footView from "@/components/Foot.vue";
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
// import { echarts } from "./static/js/echarts.min.js";
import axios from "axios";
import Loading from "@/components/loading.vue";
import {
  content_data,
  ip,
  collection,
  msg,
  verification,
  trend_put,
  PK,
  encyclopediaarticle_agree,
  comment_del
} from "~/api/api";
export default {
  name: "Content",
  transition: "change",
  components: {
    "my-loading": Loading,
    "foot-view": footView,
    "remote-js": {
      render(createElement) {
        return createElement("script", {
          attrs: { type: "text/javascript", src: this.src }
        });
      },
      props: {
        src: { type: String, required: true }
      }
    }
  },

  async asyncData(context) {
    let id = context.params.id;
    let token = context.store.state.cookie.token;
    let ip = context.store.state.cookie.ip;
    let jkl = context.params.name;
    let [res] = await Promise.all([
      context.$axios
        .post("/api/project/detail", {
          platform: 2,
          id: id,
          ip: ip,
          token: token
        })
        .then(res => {
          let dd = res.data;
          let data = res.data.data;
          let p = data.phone;
          context.store.commit("setcall", { call: p });
          if (data.building.tag) {
            data.building.tag = data.building.tag.split(",")[0];
          }
          if (data.building.railway) {
            data.building.railway = data.building.railway.split(",")[0];
          }
          let prices = [];
          for (let item of data.deals) {
            prices.unshift(item.price);
          }
          let times = [];
          for (let item of data.deals) {
            times.unshift(item.date);
          }
          data.prices = prices;
          data.times = times;
          for (let m = 0; m < data.same_price.length; m++) {
            if (data.same_price[m].railway) {
              data.same_price[m].railway = data.same_price[m].railway.split(
                ","
              )[0];
            }
          }
          for (let m = 0; m < data.same_area.length; m++) {
            if (data.same_area[m].railway) {
              data.same_area[m].railway = data.same_area[m].railway.split(
                ","
              )[0];
            }
          }
          let trend = data.price_trend;
          let p1 = [];
          let p2 = [];
          let p3 = [];
          let t = [];
          for (let item in trend) {
            p1.unshift((trend[item][data.building.city] / 10000).toFixed(1));
            p2.unshift((trend[item][data.building.country] / 10000).toFixed(1));
            p3.unshift((trend[item][data.building.name] / 10000).toFixed(1));
            t.unshift(item);
          }
          data.nd =
            data.timeline["拿地"]["1"] == 1
              ? require("~/assets/topchoose.png")
              : require("~/assets/notopchoose.png");
          data.ndss =
            data.timeline["拿地"]["1"] == 1 ? "dactive dtop dt1" : "dtop dt1";
          data.jtss =
            data.timeline["加推"]["1"] == 1 ? "dactive dtop dt2" : "dtop dt2";
          data.jt =
            data.timeline["加推"]["1"] == 1
              ? require("~/assets/topchoose.png")
              : require("~/assets/notopchoose.png");
          data.sk =
            data.timeline["首开"]["1"] == 1
              ? require("~/assets/bomchoose.png")
              : require("~/assets/nobomchoose.png");
          data.skss =
            data.timeline["首开"]["1"] == 1 ? "dbom dactive dt3" : "dbom dt3";
          data.jf =
            data.timeline["交房"]["1"] == 0
              ? require("~/assets/nobomchoose.png")
              : require("~/assets/bomchoose.png");
          data.jfss =
            data.timeline["交房"]["1"] == 1 ? "dbom dactive dt4" : "dbom dt4";
          data.p = p;
          data.p1 = p1;
          data.p2 = p2;
          data.p3 = p3;
          data.t = t;
          if (dd.group_buy.length!=0) {
            dd.tuan = 1;
          } else {
            dd.tuan = 0;
          }
          return dd;
        })
    ]);
    return {
      jkl: jkl,
      call: res.data.p,
      la: res.data.building.latitude,
      ln: res.data.building.longitude,
      topimgs: res.data.top_imgs.img,
      topnum: res.data.top_imgs.num,
      building: res.data.building,
      tit: res.data.building.name,
      ds: res.data.dynamic_count,
      phone: res.data.phone,
      nowdong: res.data.last_dynamic,
      tui: res.data.dynamic_add_push,
      timeline: res.data.timeline,
      hu: res.data.apartments,
      live: res.data.analysis.live,
      invest: res.data.analysis.invest,
      searchnum: res.data.search_num,
      chengjiao: res.data.deals,
      times: res.data.times,
      prices: res.data.prices,
      questions: res.data.questions,
      location: res.data.location,
      compares: res.data.compare,
      comments: res.data.comments,
      same_price: res.data.same_price,
      same_area: res.data.same_area,
      trend_time: res.data.t,
      trend_price1: res.data.p1,
      trend_price2: res.data.p2,
      trend_price3: res.data.p3,
      ndtime: res.data.timeline["拿地"][0],
      jftime: res.data.timeline["交房"][0],
      sktime: res.data.timeline["首开"][0],
      jttime: res.data.timeline["加推"][0],
      nd: res.data.nd,
      ndss: res.data.ndss,
      jtss: res.data.jtss,
      jt: res.data.jt,
      sk: res.data.sk,
      skss: res.data.skss,
      jf: res.data.jf,
      jfss: res.data.jfss,
      title: res.data.title,
      collect: res.data.collect,
      checks: true,
      city: res.city.id,
      tuan: res.tuan,
      group_buy: res.group_buy
    };
  },
  data() {
    return {
      li: 0,
      warn: false,
      baoming: "",
      jkl: "",
      change: false,
      fxs: ["楼盘", "户型", "问答", "周边"],
      fx: false,
      fx1: 0,
      succ: false,
      defaultHeight: "0",
      nowHeight: "0",
      in: require("~/assets/topchoose.png"),
      out: require("~/assets/notopchoose.png"),
      load: true,
      isload: false,
      value: 4,
      show: false,
      read: true,
      n1: true,
      n2: false,
      id: "",
      tongjia: [
        {
          name: "绿地华家池印",
          img: require("~/assets/lou1.png"),
          num: "32323",
          isshou: "在售",
          price: "32000",
          city: "杭州市",
          area: "萧山区",
          area_min: "62",
          area_max: "99",
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
          area_max: "99",
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
          area_max: "99",
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
          area_max: "99",
          zhuangxiu: "精装",
          ditie: "地铁沿线",
          tese: "繁华地段"
        }
      ],
      tongqu: [
        {
          name: "绿地华家池印",
          img: require("~/assets/lou1.png"),
          num: "32323",
          isshou: "在售",
          price: "32000",
          city: "杭州市",
          area: "萧山区",
          area_min: "62",
          area_max: "99",
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
          area_max: "99",
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
          area_max: "99",
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
          area_max: "99",
          zhuangxiu: "精装",
          ditie: "地铁沿线",
          tese: "繁华地段"
        }
      ],
      id: "",
      topimgs: [],
      topnum: "",
      building: {},
      phone: "",
      nowdong: {},
      timeline: {},
      hu: [],
      invest: [],
      live: [],
      searchnum: "",
      chengjiao: [],
      prices: [],
      times: [],
      questions: [],
      location: [],
      compares: [],
      comments: [],
      same_price: [],
      same_area: [],
      trend_time: [],
      trend_price1: [],
      trend_price2: [],
      trend_price3: [],
      ip: "",
      la: "",
      ln: "",
      position: "",
      ids: "",
      collect: 0,
      call: "",
      n: "",
      tui: {},
      ds: "",
      nd: "",
      sk: "",
      jt: "",
      jf: "",
      ndss: "",
      skss: "",
      jtss: "",
      jfss: "",
      ndtime: "",
      sktime: "",
      jttime: "",
      jftime: "",
      tit: "",
      over: false,
      title: "",
      checks: true,
      tel: "",
      city: "",
      ma: "",
      tuan: 0,
      group_buy: [],
      day: "",
      min: "",
      hour: "",
      second: "",
      newimg: false,
      ones: 0
    };
  },
  head() {
    return {
      title: this.title || "允家新房"
    };
  },
  methods: {
    xiang() {
      $(".m-chang").show();
      this.change = true;
      this.ones = 1;
      $(".weiter .t-top h6").html('限时优惠');
        $(".weiter .t-top p").html(
          "临取团购限时优惠金！优惠金将与您手机号绑定"
        );
    },
    method1: function() {
      echarts();
      ratingStar();
    },
    n1s() {
      this.n1 = true;
      this.n2 = false;
    },
    n2s() {
      this.n1 = false;
      this.n2 = true;
    },
    start() {
      let url = window.location.href;
      url = url.split("?")[1];
      if (url) {
        url = url.split("&");
        let kid = url[0].split("=")[1];
        let other = url[1].split("=")[1];
        sessionStorage.setItem("kid", kid);
        sessionStorage.setItem("other", other);
      }
      let pinyin = this.$route.params.name;
      localStorage.setItem("pinyin", pinyin);
      $cookies.set("pinyin", pinyin);
      let city = this.city;
      $cookies.set("city", city);
      let ids = localStorage.getItem("ids");
      if (ids) {
        let dds = ids.split(",");
        for (let i = 0; i < dds.length; i++) {
          if (!dds[i]) {
            dds.splice(i, 1);
          }
        }
        ids = dds.join(",");
        localStorage.setItem("ids", ids);
      }
      this.n = this.$route.params.name;
      let id = this.$route.params.id;
      this.id = id;
      this.over = true;
      this.load = false;
      this.isload = true;
      let ip = returnCitySN["cip"];
      $cookies.set("ip", ip);
      this.ip = ip;
      let collect = this.collect;
      localStorage.setItem(id, collect);
      if (collect == 0) {
        $("#fork").show();
        $(".m-fork").show();
        $(".fed").hide();
        $("#forked").hide();
      } else if (collect == 1) {
        $("#fork").hide();
        $("#forked").show();
        $(".m-fork").hide();
        $(".fed").show();
        $("#forked").css("display", "block");
      }
    },
    top() {
      /*头部轮播*/
      var swiper = new Swiper(".swiper-top", {
        // eslint-disable-line no-unused-vars
        spaceBetween: 0,
        pagination: {
          el: "#swiper-pagination1",
          clickable: true
        }
      });
    },
    drawline() {
      // 初始化图表标签
      var myChart = this.$echarts.init(document.getElementById("chart"));
      let that = this;
      var options = {
        //定义一个标题
        legend: {
          data: ["AI"]
        },
        color: ["rgba(77,181,255,1)"],
        //X轴设置
        xAxis: [
          {
            type: "category",
            data: that.times,
            axisLine: {
              lineStyle: {
                color: "rgba(153,153,153,1)",
                fontSize: "10px"
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "rgba(153,153,153,1)" //这里用参数代替了
              }
            }
          }
        ],

        yAxis: [
          {
            name: "单位：万",
            axisLabel: {
              show: true,
              textStyle: {
                color: "rgba(153,153,153,1)" //这里用参数代替了
              }
            },
            axisLine: {
              lineStyle: {
                color: "rgba(153,153,153,1)"
              }
            }
          }
        ],
        series: [
          {
            name: "销量",
            data: that.prices,
            type: "bar",
            barWidth: 18
          }
        ]
      };
      myChart.setOption(options);
    },
    priceline() {
      // 房价趋势
      var chart = this.$echarts.init(document.getElementById("pic"));
      let that = this;
      var option = {
        legend: {
          data: ["AI"]
        },
        color: ["rgba(77,181,255,1)"],
        backgroundColor: "#fff",
        tooltip: {
          trigger: "axis",
          formatter: function(params) {
            return (
              params[0].seriesName +
              params[0].data +
              "万" +
              "<br>" +
              params[1].seriesName +
              params[1].data +
              "万" +
              "<br>" +
              params[2].seriesName +
              params[2].data +
              "万"
            );
          }
        },
        legend: {
          data: "房价"
        },
        grid: {
          x: "18px",
          y: "10px",
          x2: "18px",
          y2: "20px"
        },
        calculable: true,

        xAxis: [
          {
            axisLabel: {
              rotate: 30,
              interval: 0
            },
            axisLine: {
              lineStyle: {
                color: "#919499"
              }
            },

            boundaryGap: false,
            data: (function() {
              var list = that.trend_time;
              return list;
            })(),
            axisLabel: {
              rotate: 0
            }
          }
        ],
        yAxis: [
          {
            name: "单位：万",
            type: "value",
            scale: true,
            max: 10,
            min: 0,
            splitNumber: 5,
            axisLine: {
              lineStyle: {
                color: "#919499"
              },
              show: false,
              formatter: "{value}万"
            },
            splitLine: {
              shwo: true,
              lineStyle: {
                type: "dashed"
              }
            }
          }
        ],
        series: [
          {
            name: that.building.name + "&nbsp;&nbsp;均价",
            type: "line",
            symbol: "none",
            smooth: 0.2,
            color: ["#40A2F4"],
            data: that.trend_price3
          },
          {
            name: that.building.country + "&nbsp;&nbsp;均价",
            type: "line",
            symbol: "none",
            smooth: 0.2,
            color: ["#29CC72"],
            data: that.trend_price2
          },
          {
            name: that.building.city + "&nbsp;&nbsp;均价",
            type: "line",
            symbol: "none",
            smooth: 0.2,
            color: ["#A3AACC"],
            data: that.trend_price1
          }
        ]
      };
      chart.setOption(option);
    },
    mmap() {
      if (!localStorage.getItem("map")) {
        localStorage.setItem("map", 1);
        let that = this;
        let baidu = [that.ln, that.la];
        var la = "";
        var ln = "";
        AMap.convertFrom(baidu, "baidu", function(status, result) {
          if (result.info === "ok") {
            var lnglats = result.locations; // Array.<LngLat>
            la = lnglats[0].lat;
            ln = lnglats[0].lng;
            var map = new AMap.Map("m-container", {
              zoom: 14, //初始化地图层级
              center: [ln, la], //初始化地图中心点
              zoomEnable: false,
              dragEnable: false
            });
          }
        });
        console.log([ln, la]);
      }
    },
    again() {
      let tel = this.baoming;
      let ip = returnCitySN["cip"];
      let id = this.id;
      let data = { channel: 2, phone: tel, ip: ip };
      msg(data)
        .then(resp => {
          let code = resp.data.code;
          if (code == 200) {
            let city = localStorage.getItem("city");
            if (!city) {
              city = 1;
              localStorage.setItem("city", 1);
            }
            var time = 60;
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
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    collections(e) {
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
          }
        })
        .then(error => {
          console.log(error);
        });
    },
    sendmsg(t) {
      this.phone = t;
      let that = this;
      msg({ phone: t, channel: 2 })
        .then(resp => {
          if (resp.data.code == 200) {
            let tel = that.phone;
            let ip = that.ip;
            let c = localStorage.getItem("city");
            let p = that.page;
            let po = that.position;
            let id = that.id;
            let kid = sessionStorage.getItem("kid");
            let other = sessionStorage.getItem("other");
            let normal = {
              ip: ip,
              tel: tel,
              city: c,
              position: po,
              page: 2,
              type: 9,
              project: id,
              kid: kid,
              other: other
            };
            let tuan = {
              city: c,
              ip: ip,
              tel: tel,
              position: 23,
              page: 3,
              project: id,
              remark: "团购2"
            };
            let options = {};
            if (this.ones == 1) {
              options = tuan;
            } else {
              options = normal;
            }
            trend_put(options)
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
            var tels = t.substr(0, 3) + "****" + t.substr(7, 11);
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
            $("#ytel").html(tels);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    check() {
      let m = this.ma;
      if (!m) {
        $("#ma-ll").attr("placeholder", "不能为空");
        return;
      }
      let tel = this.phone;
      let that = this;
      verification({ phone: tel, code: m, channel: 2 })
        .then(resp => {
          if (resp.data.code == 200) {
            if (this.ones == 1) {
              this.li = 1;
              if (this.li == 1) {
                this.newimg = true;
              }
            }

            that.change = false;
            that.succ = true;
            $("#o_p").text("已成功订购服务，我们会第一时间通过电话联系您");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    pk(e) {
      let id = e.target.getAttribute("data-v");
      let ids = id + "," + this.id;
      this.ids = ids;
    },
    pkhref() {
      let ids = this.ids;
      let id = this.id;
      if (ids) {
        this.$router.push("/" + this.n + "/pkdetail/" + ids + "/" + id);
      } else {
        this.warn = true;
        let that = this;
        setTimeout(function() {
          that.warn = false;
        }, 1500);
      }
    },
    fork(e) {
      let id = e.target.getAttribute("data-v");
      let token = localStorage.getItem("token");
      if (!token) {
        this.$router.push("/" + this.n + "/login");
      }
      collection({ project: id, token: token })
        .then(resp => {
          if (resp.data.code == 200) {
            $(".fk").hide();
            $(".fed").css("display", "block");
          }
        })
        .then(error => {
          console.log(error);
        });
    },
    part() {
      let token = localStorage.getItem("token");
      if (token) {
        this.$router.push("/" + this.n + "/appointment");
      } else {
        this.$router.push("/" + this.n + "/login");
      }
    },
    agree(e) {
      // console.log(e.target)
      let img = require("~/assets/clicked.png");
      let id = e.target.getAttribute("data-v");
      let ip = this.ip;
      let token = localStorage.getItem("token");
      let that = this;
      let num = e.target.getAttribute("data-n");
      let y = e.target.getAttribute("data-y");
      encyclopediaarticle_agree({
        ip: ip,
        id: id,
        platform: 2,
        token: token,
        type: y
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
      let y = e.target.getAttribute("data-y");
      encyclopediaarticle_agree({
        ip: ip,
        id: id,
        platform: 2,
        token: token,
        type: y
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
    del(e) {
      let id = e.target.getAttribute("data-v");
      if (localStorage.getItem("token") == null) {
        this.$router.push("/" + that.n + "/login");
        // window.location.href = "/login";
      } else {
        let token = localStorage.getItem("token");
        comment_del({ token: token, id: id })
          .then(resp => {
            if (resp.data.code == 200) {
              location.reload();
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    pks(e) {
      let id = e.target.getAttribute("data-v");
      let ids = localStorage.getItem("ids");
      let ds = [];
      if (ids) {
        ds = ids.split(",");
      }
      ds.push(id);
      ids = ds.join(",");
      localStorage.setItem("ids", ids);
      this.$router.push("/" + this.n + "/pk/" + ids + "/" + id);
    },
    goback() {
      this.$router.go(-1);
    },
    ready() {
      let ip = returnCitySN["cip"];
      this.ip = ip;
      localStorage.getItem("ip");
    },
    jiaotong() {
      this.$router.push("/" + this.n + "/Periphery/" + this.id + "/1");
    },
    jiaoyu() {
      this.$router.push("/" + this.n + "/Periphery/" + this.id + "/2");
    },
    yiliao() {
      this.$router.push("/" + this.n + "/Periphery/" + this.id + "/3");
    },
    shenghuo() {
      this.$router.push("/" + this.n + "/Periphery/" + this.id + "/4");
    },
    chan(e) {
      let dd = e.target;
      dd.parentNode.style.display = "none";
      dd.parentNode.nextElementSibling.style.display = "block";
    },
    gohome() {
      this.$router.push("/" + this.n + "/myhome");
    },
    gosearch() {
      this.$router.push("/" + this.n + "/sou");
    },
    handleScroll() {
      let Y = window.scrollY;
      if (Y > 100 && Y <= 1050) {
        this.fx = true;
        this.fx1 = 0;
      } else if (Y > 1050 && Y <= 2600) {
        this.fx = true;
        this.fx1 = 1;
      } else if (Y > 2600 && Y <= 3000) {
        this.fx = true;
        this.fx1 = 2;
      } else if (Y > 3100 && Y <= 3700) {
        this.fx = true;
        this.fx1 = 3;
      } else if (Y <= 100) {
        this.fx = false;
      }
    },
    goto(key) {
      if (process.client) {
        let Y = window.scrollY;
        if (key == 0) {
          if (Y > 100) {
            var timer = setInterval(function() {
              window.scrollBy(0, -10);
              if (window.scrollY <= 100) {
                clearInterval(timer);
              }
            }, 0.01);
          } else {
            var timer = setInterval(function() {
              window.scrollBy(0, 10);
              if (window.scrollY >= 100) {
                clearInterval(timer);
              }
            }, 1);
          }
        } else if (key == 1) {
          if (Y > 1100) {
            var timer = setInterval(function() {
              window.scrollBy(0, -10);
              if (window.scrollY <= 1100) {
                clearInterval(timer);
              }
            }, 0.01);
          } else {
            var timer = setInterval(function() {
              window.scrollBy(0, 10);
              if (window.scrollY >= 1100) {
                clearInterval(timer);
              }
            }, 1);
          }
        } else if (key == 2) {
          if (Y > 2700) {
            var timer = setInterval(function() {
              window.scrollBy(0, -10);
              if (window.scrollY <= 2700) {
                clearInterval(timer);
              }
            }, 0.01);
          } else {
            var timer = setInterval(function() {
              window.scrollBy(0, 10);
              if (window.scrollY >= 2700) {
                clearInterval(timer);
              }
            }, 1);
          }
        } else if (key == 3) {
          if (Y > 3200) {
            var timer = setInterval(function() {
              window.scrollBy(0, -10);
              if (window.scrollY <= 3200) {
                clearInterval(timer);
              }
            }, 0.01);
          } else {
            var timer = setInterval(function() {
              window.scrollBy(0, 10);
              if (window.scrollY >= 3200) {
                clearInterval(timer);
              }
            }, 1);
          }
        }
      }
    },
    commitback(id) {
      this.$router.push("/" + this.jkl + "/commentback/" + id);
    },
    dingyue() {
      console.log(123);
      let check = this.checks;
      if (!check) {
        $(".tishi").show();
        return;
      } else {
        $(".tishi").hide();
      }

      let phone = this.baoming;
      var pattern_phone = /^1[3-9][0-9]{9}$/;
      if (phone == "") {
        $(".l-p").attr("placeholder", "手机号不能为空");
        return;
      } else if (!pattern_phone.test(phone)) {
        $(".l-p").val("");
        $(".l-p").attr("placeholder", "手机号码不合法");
        return;
      }
      this.sendmsg(phone);
    },
    guanbi() {
      this.ones = 0;
      this.change = false;
      $(".m-chang").hide();
      $(".t-b-first").show();
      $(".t-b-second").hide();
      this.succ = false;
    },
    // 倒计时
    countTime() {
      // 获取当前时间
      let date = new Date();
      let now = date.getTime();
      // 设置截止时间
      let endDate = new Date(this.group_buy.endline); // this.curStartTime需要倒计时的日期
      let end = endDate.getTime();
      // 时间差
      let leftTime = end - now;
      // 定义变量 d,h,m,s保存倒计时的时间
      if (leftTime >= 0) {
        // 天
        let day = Math.floor(leftTime / 1000 / 60 / 60 / 24);
        this.day = day < 10 ? "0" + day : day;
        // 时
        let h = Math.floor((leftTime / 1000 / 60 / 60) % 24);
        this.hour = h < 10 ? "0" + h : h;
        // 分
        let m = Math.floor((leftTime / 1000 / 60) % 60);
        this.min = m < 10 ? "0" + m : m;
        // 秒
        let s = Math.floor((leftTime / 1000) % 60);
        this.second = s < 10 ? "0" + s : s;
      } else {
        this.day = 0;
        this.hour = "00";
        this.min = "00";
        this.second = "00";
      }
      // 等于0的时候不调用
      if (
        Number(this.hour) === 0 &&
        Number(this.day) === 0 &&
        Number(this.min) === 0 &&
        Number(this.second) === 0
      ) {
        return;
      } else {
        // 递归每秒调用countTime方法，显示动态时间效果,
        setTimeout(this.countTime, 1000);
      }
    }
  },
  mounted() {
    if (this.tuan == 1) {
      this.countTime();
    }
    this.tel = localStorage.getItem("tel");
    let h = document.body.clientHeight;
    if (h < 700) {
      $("#Foot").css({ position: "fixed", bottom: "0", width: "100%" });
    } else if (h >= 700) {
      $("#Foot").css({
        position: "relative",
        bottom: "0",
        width: "100%",
        marginBottom: "56px"
      });
    }
    let that = this;
    that.baoming = localStorage.getItem("phone");
    let id = this.$route.params.id;
    this.id = id;
    this.$nextTick(() => {
      this.start();
      setTimeout(() => {
        this.drawline();
        this.priceline();
      }, 10);
    });
    //获取默认高度
    this.defaultHeight = $(window).height();
    window.onresize = () => {
      return (() => {
        this.nowHeight = $(window).height();
      })();
    };

    $(".go-map").on("click", function() {
      that.$router.push("/" + that.n + "/Periphery/" + that.id + "/1");
    });
    //同价位楼盘
    $(".m-nav p").on("click", function() {
      let txt = $(this).text();
      $(this)
        .addClass("n-active")
        .siblings("p")
        .removeClass("n-active");
    });
    jQuery.fn.ratingStars = function(e) {
      var r = {
          selectors: {
            starsSelector: ".rating-stars",
            starSelector: ".rating-star",
            starActiveClass: "is--active",
            starHoverClass: "is--hover",
            starNoHoverClass: "is--no-hover",
            targetFormElementSelector: ".rating-value"
          }
        },
        t = $.extend({}, r, e),
        s = {
          init: function(e) {
            s.registerEvents(e), s.loadDefaultValue(e);
          },
          loadDefaultValue: function(e) {
            var r = $(e)
                .children(t.selectors.targetFormElementSelector)
                .val(),
              s = 0;
            $.each(
              $(e)
                .children(t.starsSelector)
                .children(t.starSelector),
              function(e, a) {
                s <= r - 1 && $(a).addClass(t.selectors.starActiveClass), s++;
              }
            );
          },
          registerEvents: function(e) {
            var r = this;
            $.each(
              $(e)
                .children(t.starsSelector)
                .children(t.starSelector),
              function(t, s) {
                $(s).on("mouseenter", $.proxy(r.onStarEnter, r, s, e)),
                  $(s).on("mouseleave", $.proxy(r.onStarLeave, r, s, e)),
                  $(s).on(
                    "click touchstart",
                    $.proxy(r.onStarSelected, r, s, e)
                  );
              }
            );
          },
          onStarEnter: function(e, r) {
            var s = $(e).index(),
              a = 0;
            $.each(
              $(r)
                .children(t.starsSelector)
                .children(t.starSelector),
              function(e, r) {
                a <= s
                  ? $(r).addClass(t.selectors.starHoverClass)
                  : $(r).addClass(t.selectors.starNoHoverClass),
                  a++;
              }
            ),
              $(r).trigger("ratingOnEnter", { ratingValue: s + 1 });
          },
          onStarLeave: function(e, r) {
            var s = $(e).index();
            $(r)
              .children(t.starsSelector)
              .children(t.starSelector)
              .removeClass(t.selectors.starHoverClass),
              $(r)
                .children(t.starsSelector)
                .children(t.starSelector)
                .removeClass(t.selectors.starNoHoverClass),
              $(r).trigger("ratingOnLeave", { ratingValue: s + 1 });
          },
          onStarSelected: function(e, r) {
            var s = $(e).index();
            $(r)
              .children(t.starsSelector)
              .children(t.starSelector)
              .removeClass(t.selectors.starActiveClass);
            var a = 0;
            $.each(
              $(r)
                .children(t.starsSelector)
                .children(t.starSelector),
              function(e, r) {
                a <= s && $(r).addClass(t.selectors.starActiveClass), a++;
              }
            ),
              $(r)
                .children(t.selectors.targetFormElementSelector)
                .val(s + 1),
              $(r).trigger("ratingChanged", { ratingValue: s + 1 });
          }
        };
      return this.each(function() {
        s.init($(this));
      });
    };
    $(".question").on("click", function() {
      let token = localStorage.getItem("token");
      if (token) {
        that.$router.push("/" + that.jkl + "/leavequestion/" + that.id);
      } else {
        that.$router.push("/" + that.jkl + "/login");
      }
    });
    var mySwiper = new Swiper(".swiper-container10", {
      direction: "vertical", // 垂直切换选项
      autoplay: true,
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true //修改swiper的父元素时，自动初始化swiper
    });
    /*对比分析资料轮播*/
    var swiper = new Swiper(".dui-zi", {
      // eslint-disable-line no-unused-vars
      spaceBetween: 20,
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true, //修改swiper的父元素时，自动初始化swiper
      pagination: {
        el: ".swiper-pagination2"
      }
    });
    /*推荐楼盘轮播*/
    var swiper = new Swiper(".swiper-box", {
      // eslint-disable-line no-unused-vars
      slidesPerView: 1.8,
      spaceBetween: 30,
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true //修改swiper的父元素时，自动初始化swiper
    });

    var swiper = new Swiper(".swiper-top", {
      loop: true, // 循环模式选项
      slidesPerView: "auto",
      spaceBetween: 0,
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true, //修改swiper的父元素时，自动初始化swiper
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      resistanceRatio: 0.1
    });

    $(document).ready(function() {
      var h = $(".h-c-c").height();
      $(".h-c-i img").css("height", h + "px");

      var cnm = 1;

      $(".p-c-exc").on("click", function() {
        $(".m-p-succ").hide();
        $(".m-chang").hide();
      });
      $("#m_sc_esc").on("click", function() {
        $("#m_sc_box").hide();
        $(".m-chang").hide();
      });
      $(".m-c-content input").focus(function() {
        $(".m-c-content").css("margin-top", "80px");
      });
      $(".m-c-content input").blur(function() {
        $(".m-c-content").css("margin-top", "170px");
      });
      // 验证码
      $(".m-c-btn").on("click", function() {
        var tel = $(this)
          .prev()
          .prev()
          .prev()
          .prev()
          .prev()
          .prev()
          .val();
        var pattern_tel = /^1[3-9][0-9]{9}$/;
        if (tel == "") {
          $(this)
            .prev()
            .prev()
            .prev()
            .prev()
            .prev()
            .prev()
            .val("");
          $(this)
            .prev()
            .prev()
            .prev()
            .prev()
            .prev()
            .prev()
            .attr("placeholder", "手机号码不能为空");
          return;
        } else if (!pattern_tel.test(tel)) {
          $(this)
            .prev()
            .prev()
            .prev()
            .prev()
            .prev()
            .prev()
            .val("");
          $(this)
            .prev()
            .prev()
            .prev()
            .prev()
            .prev()
            .prev()
            .attr("placeholder", "手机号码不合法");
          return;
        }
      });

      $(".tophome").on("click", function() {
        that.$router.push("/" + that.n);
      });

      $(".m-listen").on("click", function() {
        $(".m-chang").show();
        $("#m_a_box").show(300);
      });
      $("#m_a_esc").on("click", function() {
        $(".m-chang").hide();
        $("#m_a_box").hide();
      });

      $("#m_want").on("click", function() {
        $(".m-chang").show();
        $("#m_sc_box").show(150);
      });

      $("#m_look").on("click", function() {
        $(".m-chang").show();
        $("#m_y_box").show(300);
      });
      $("#m_fen").on("click", function() {
        $(".m-chang").show();
        $("#m_f_box").show(300);
      });
      $(".m-y").on("click", function() {
        $(".m-chang").show();
        $("#m_y_box").show(300);
      });
      $("#m_f_esc").on("click", function() {
        $(".m-chang").hide();
        $("#m_f_box").hide();
      });
    });

    // 点击顶部图片跳转
    $(".zao").on("click", function() {
      that.$router.push("/" + that.n + "/album/" + that.id);
    });
    // 周边规划跳转
    $(".m-zhou h3 span").on("click", function() {
      that.$router.push("/" + that.n + "/Periphery/" + that.id + "/1");
    });

    document.addEventListener("touchmove", function(e) {
      var h = document.body.scrollTop;
      if (h >= 2279) {
        $(".m-3")
          .addClass("m-active")
          .siblings("span")
          .removeClass("m-active");
      } else if (h >= 1538) {
        $(".m-2")
          .addClass("m-active")
          .siblings("span")
          .removeClass("m-active");
      } else if (h >= 170) {
        $(".m-tnav").show();
        $(".m-1")
          .addClass("m-active")
          .siblings("span")
          .removeClass("m-active");
      } else {
        $(".m-tnav").hide();
      }
    });

    $(".m-1").on("click", function() {
      document.body.scrollTop = 170;
      $(".m-1")
        .addClass("m-active")
        .siblings("span")
        .removeClass("m-active");
    });
    $(".m-2").on("click", function() {
      document.body.scrollTop = 1538;
      $(".m-2")
        .addClass("m-active")
        .siblings("span")
        .removeClass("m-active");
    });
    $(".m-3").on("click", function() {
      document.body.scrollTop = 2279;
      $(".m-3")
        .addClass("m-active")
        .siblings("span")
        .removeClass("m-active");
    });
    $(".m-bian").on("click", function() {
      $("#m_c_box").show(150);
      $(".m-chang").show();
    });
    $("#m_c_esc").on("click", function() {
      $("#m_c_box").hide();
      $(".m-chang").hide();
    });
    $(".m-chang").on("click", function() {
      $(".m-p-succ").hide();
      $(".m-chang").hide();
      $("#m_c_box").hide();
      $("#m_d_box").hide();
      $("#m_g_box").hide();
      $("#m_y_box").hide();
      $("#m_k_box").hide();
      $("#m_h_box").hide();
      $("#m_l_box").hide();
      $("#m_w_box").hide();
      $("#m_z_box").hide();
      $("#m_a_box").hide();
      $("#m_ti").hide();
      $("#m_f_box").hide();
      $(".m-p-succ").hide();
      $("#m_sc_box").hide();
      $("#m_p_box").hide();
      that.change = false;
      that.succ = false;
      $(".t-b-first").show();
      $(".t-b-second").hide();
      that.ones = 0;
    });

    $(".p1").on("click", function() {
      window.type = $(this).attr("data-v");

      if (type == "变价通知") {
        that.position = 8;
        $(".weiter .t-top h6").html(type);
        $(".weiter .t-top p").html(
          "一键订阅最新变价通知，不再错过变价信息哦！"
        );
      } else if (type == "开盘通知") {
        that.position = 9;
        $(".weiter .t-top h6").html(type);
        $(".weiter .t-top p").html("一键订阅最新开盘通知,不再错过开盘信息哦！");
      } else if (type == "预约看房") {
        that.position = 5;
        $(".weiter .t-top h6").html(type);
        $(".weiter .t-top p").html(
          "一键预约看房免费小车上门接送，可带家人一起参观多个热门楼盘 "
        );
      } else if (type == "我要优惠") {
        $(".weiter .t-top h6").html("报名获取考察旅游名额");
        $(".weiter .t-top p").html("一键获取亚热带三天两夜游的名额！");
      } else if (type == "咨询服务") {
        $(".weiter .t-top h6").html(type);
        $(".weiter .t-top p").html("立即报名，专业人员为你解惑!");
      } else if (type == "最新动态") {
        that.position = 10;
        $(".weiter .t-top h6").html(type);
        $(".weiter .t-top p").html("一键订阅楼盘动态,最新动态抢先知！");
      } else if (type == "楼盘周边信息") {
        that.position = 15;
        $(".weiter .t-top h6").html("获取楼盘周边信息");
        $(".weiter .t-top p").html("立即向售楼人员咨询楼盘周边信息");
      } else if (type == "最新预售许可证") {
        $(".weiter .t-top h6").html("了解最新预售许可证");
        $(".weiter .t-top p").html("向售楼人员咨询最新许可证");
      } else if (type == "最新成交价") {
        that.position = 14;
        $(".weiter .t-top h6").html("获取最新成交价");
        $(".weiter .t-top p").html("向售楼人员咨询最新成交价");
      } else if (type == "详细楼盘户型") {
        that.position = 11;
        $(".weiter .t-top h6").html("获取详细楼盘户型");
        $(".weiter .t-top p").html(
          "获取详细楼盘户型，在买房之前了解更多楼盘户型"
        );
      } else if (type == "领取免费资料") {
        that.position = 13;
        $(".weiter .t-top h6").html("获取详细楼盘资料");
        $(".weiter .t-top p").html(
          "一键订阅最新详细楼盘资料，获取更多楼盘分析资料"
        );
      } else if (type == "免费领取地图") {
        that.position = 13;
        $(".weiter .t-top h6").html("获取详细楼盘资料");
        $(".weiter .t-top p").html(
          "一键订阅最新详细楼盘资料，获取更多楼盘分析资料"
        );
      } else if (type == "了解详细户型") {
        that.position = 11;
        $(".weiter .t-top h6").html("获取详细楼盘户型");
        $(".weiter .t-top p").html(
          "获取详细楼盘户型，在买房之前了解更多楼盘户型"
        );
      } else if (type == "获取高清配套图") {
        $(".weiter .t-top h6").html(type);
        $(".weiter .t-top p").html("一键领取高清图，楼盘图片清晰看！");
      } else if (type == "获取详细分析资料") {
        that.position = 12;
        $(".weiter .t-top h6").html("获取分析资料");
        $(".weiter .t-top p").html(
          "一键订阅最新项目深度分析资料，了解更多投资分析和宜居分析"
        );
      } else if (type == "抢免费专车票") {
        that.position = 12;
        $(".weiter .t-top h6").html("抢免费专车票");
        $(".weiter .t-top p").html("精准匹配房源，免费接送一次看完好房");
      }
      $(".weiter").css("z-index", "20001");
      $(".m-chang").show();
      that.change = true;
    });

    $(".t-b-scode").on("click", function() {
      var phone = $(this)
        .prev()
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

      var time = 60;
      var fn = function() {
        time--;
        if (time > 0) {
          $(".t-b-scode").html("重发" + time + "s");
          $(".t-b-scode").attr("disabled", true);
        } else {
          clearInterval(interval);
          $(".t-b-scode").html("获取验证码");
          $(".t-b-scode").attr("disabled", false);
        }
      };
      fn();
      var interval = setInterval(fn, 1000);
      var data = {
        phone: phone
      };
      $.post(
        "{:url('home/user/login')}",
        data,
        function(res) {
          if (res.code == 100) {
            alert("发送成功");
          } else {
            alert(res.msg);
          }
        },
        "json"
      );
    });

    $("#s_esc").on("click", function() {
      $(".succ").hide();
      $(".zhao").hide();
    });
    $(".s-btn").on("click", function() {
      $(".succ").hide();
      $(".zhao").hide();
    });
    $("#find").on("click", function() {
      $("#bname").submit();
    });

    $("#a-esc").on("click", function() {
      $(".addre").hide();
      $(".zhao").hide();
    });
    $("#l-esc").on("click", function() {
      $(".login").hide();
      $(".zhao").hide();
    });
    $(".zhao").on("click", function() {
      $(this).hide();
      $(".login").hide();
      $(".weiter").hide();
      $(".succ").hide();
      $(".addre").hide();
      $(".pings").hide();
      $("#mpanel5").hide();
      $(".ts").css("z-index", "20001");
    });
    $(".register").on("click", function() {
      $(".zhao").show();
      $(".login").show(150);
    });
    $(".m-get").on("click", function() {
      var phone = $(this)
        .prev()
        .prev()
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

      var time = 60;
      var fn = function() {
        time--;
        if (time > 0) {
          $(".m-get").html("重新发送" + time + "s");
          $(".m-get").attr("disabled", true);
        } else {
          clearInterval(interval);
          $(".m-get").html("获取验证码");
          $(".m-get").attr("disabled", false);
        }
      };
      fn();
      var interval = setInterval(fn, 1000);
      var data = {
        phone: phone
      };
      $.post(
        "{:url('home/user/login')}",
        data,
        function(res) {
          if (res.code == 100) {
            alert("发送成功");
          } else {
            alert(res.msg);
          }
        },
        "json"
      );
    });

    // 验证码
    $(".m-getcode").on("click", function() {
      var tel = $(this)
        .prev()
        .val();

      var pattern_tel = /^1[3-9][0-9]{9}$/;
      if (tel == "") {
        $(this)
          .prev()
          .val("");
        $(this)
          .prev()
          .attr("placeholder", "手机号码不能为空");
        return;
      } else if (!pattern_tel.test(tel)) {
        $(this)
          .prev()
          .val("");
        $(this)
          .prev()
          .attr("placeholder", "手机号码不合法");
        return;
      }
      var type = $(this)
        .next()
        .val();
      var building_name = $(this)
        .next()
        .next()
        .val();
      var data = {
        phone: tel,
        type: type,
        building_name: building_name
      };
      $.post("{:url('home/content/port1')}", data, function(res) {}, "json");
      var time = 3;
      var fn = function() {
        time--;
        if (time > 0) {
          $(".m-getcode").html("重新发送" + time + "s");
          $(".m-getcode").attr("disabled", true);
        } else {
          clearInterval(interval);
          $(".m-getcode").html("获取验证码");
          $(".m-getcode").attr("disabled", false);
        }
      };
      fn();
      var interval = setInterval(fn, 1000);
    });

    $(".m-c-port1").on("click", function() {
      var building_name = $(this)
        .prev()
        .val();
      var ma = $(this)
        .prev()
        .prev()
        .val();
      var name = $(this)
        .prev()
        .prev()
        .prev()
        .prev()
        .val();
      var tel = $(this)
        .prev()
        .prev()
        .prev()
        .prev()
        .prev()
        .val();
      var type = $(this)
        .prev()
        .prev()
        .prev()
        .val();
      var pattern_tel = /^1[3-9][0-9]{9}$/;
      if (tel == "") {
        $(this)
          .prev()
          .prev()
          .prev()
          .prev()
          .prev()
          .val("");
        $(this)
          .prev()
          .prev()
          .prev()
          .prev()
          .prev()
          .attr("placeholder", "手机号码不能为空");
        return;
      } else if (!pattern_tel.test(tel)) {
        $(this)
          .prev()
          .prev()
          .prev()
          .prev()
          .prev()
          .val("");
        $(this)
          .prev()
          .prev()
          .prev()
          .prev()
          .prev()
          .attr("placeholder", "手机号码不合法");
        return;
      }

      var brower = getBrowserInfo();
      var qu = qudao();

      var data = {
        phone: tel,
        type: type,
        name: name,
        building_name: building_name,
        brower: brower,
        qu: qu,
        ma: ma
      };

      var that = $(this);
      $.post(
        "{:url('home/content/port1')}",
        data,
        function(res) {
          if (res.code == 100) {
            that.parent().hide();
            if (type == "变价通知") {
              $("#o_p").text(
                "已成功订阅变价通知，我们会第一时间通过短信通知您"
              );
              $(".m-o-succ").show();
            } else if (type == "开盘通知") {
              $("#o_p").text(
                "已成功订阅开盘通知，我们会第一时间通过短信通知您"
              );
              $(".m-o-succ").show();
            } else if (type == "预约看房") {
              $("#o_p").text("已预约成功，我们会第一时间与您联系");
              $(".m-o-succ").show();
            } else if (type == "我要优惠") {
              $("#o_p").text("已成功报名，我们会第一时间把优惠楼盘推送给您");
              $(".m-o-succ").show();
            } else if (type == "最新动态") {
              $("#o_p").text(
                "已成功订阅最新动态，我们会第一时间把楼盘动态推送给您"
              );
              $(".m-o-succ").show();
            } else if (type == "获取最低成交价") {
              $("#o_p").text(
                "已成功订阅最低成交价，我们会第一时间把最低成交价推送给您"
              );
              $(".m-o-succ").show();
            }
          }
        },
        "json"
      );
    });
    $(".m-c-port2").on("click", function() {
      var building_name = $(this)
        .prev()
        .val();
      var type = $(this)
        .prev()
        .prev()
        .prev()
        .val();
      var tel = $(this)
        .prev()
        .prev()
        .prev()
        .prev()
        .val();
      var address = $(this)
        .prev()
        .prev()
        .prev()
        .prev()
        .prev()
        .val();
      var name = $(this)
        .prev()
        .prev()
        .prev()
        .prev()
        .prev()
        .prev()
        .val();
      var ma = $(this)
        .prev()
        .prev()
        .val();
      var pattern_tel = /^1[3-9][0-9]{9}$/;
      if (tel == "") {
        $(this)
          .prev()
          .prev()
          .prev()
          .val("");
        $(this)
          .prev()
          .prev()
          .prev()
          .attr("placeholder", "手机号码不能为空");
        return;
      } else if (!pattern_tel.test(tel)) {
        $(this)
          .prev()
          .prev()
          .prev()
          .val("");
        $(this)
          .prev()
          .prev()
          .prev()
          .attr("placeholder", "手机号码不合法");
        return;
      }
      var brower = getBrowserInfo();
      var qu = qudao();
      var data = {
        phone: tel,
        type: type,
        name: name,
        address: address,
        name: name,
        building_name: building_name,
        brower: brower,
        qu: qu,
        ma: ma
      };
      var that = $(this);
      $.post(
        "{:url('home/content/port2')}",
        data,
        function(res) {
          if (res.code == 100) {
            that.parent().hide();
            if (type == "领取户型图") {
              $("#o_p").text("已成功领取，我们会第一时间将资料送给您");
              $(".m-o-succ").show();
            } else if (type == "领取免费相册资料") {
              $("#o_p").text("已成功领取，我们会第一时间将资料送给您");
              $(".m-o-succ").show();
            } else if (type == "楼盘周边信息") {
              $("#o_p").text("已成功获取，我们会第一时间与您沟通");
              $(".m-o-succ").show();
            } else if (type == "领取免费资料") {
              $("#o_p").text("已成功领取，我们会第一时间将资料送给您");
              $(".m-o-succ").show();
            }
          }
        },
        "json"
      );
    });

    $("#o_btn").on("click", function() {
      that.succ = false;
      $(".m-chang").hide();
    });
    $(".o-esc").on("click", function() {
      that.succ = false;
      $(".m-chang").hide();
    });

    //楼盘问答---查看全文
    var flag = true;
    $(".m-w-all").click(function() {
      if (flag == true) {
        $(this)
          .prev()
          .children("i")
          .css({
            "-webkit-line-clamp": "inherit"
          });
        $(this).html("点击收起");
        flag = false;
      } else {
        $(this)
          .prev()
          .children("i")
          .css({
            "-webkit-line-clamp": "3"
          });
        $(this).html("查看全文");
        flag = true;
      }
    });
    //点击按钮出现hover
    $(function() {
      function changeColor(id, class1, class2) {
        $("#" + id).on("touchstart", function() {
          $(this).attr("class", class1);
        });
        $("#" + id).on("touchend", function() {
          $(this).attr("class", class2);
        });
      }
      changeColor("dingxue", "bg_02", "bg_01");
    });
    // 滚动高度
    window.addEventListener("scroll", this.handleScroll);
  },
  watch: {
    topimgs(val) {
      this.top();
    },
    times(val) {
      this.drawline();
    },
    trend_time(val) {
      this.priceline();
    },

    nowHeight: function() {
      if (this.defaultHeight != this.nowHeight) {
        $(".weiter").css("top", "100px");
      } else {
        $(".weiter").css("top", "220px");
      }
    },
    $route() {
      this.$router.go(0);
    }
  },
  updated() {
    if (this.over) {
      setTimeout(() => {
        this.mmap();
      }, 400);
    }
  },
  destroyed() {
    localStorage.removeItem('map')
  },
};
</script>
<style scoped>
@import "http://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css";
@import url("~/static/css/c-index.css");
@import url("~/static/css/c-index1.2.css");
* {
  font-family: "Microsoft YaHei";
  -webkit-overflow-scrolling: touch;
}

[v-cloak] {
  display: none;
}
#Foot {
  margin-bottom: 64px;
}
.m-dai .m-d-content .m-w-content p i.sl {
  display: none;
}
.headertop .content-img {
  width: 14%;
  float: left;
  margin-top: 2.6%;
  margin-left: 30%;
}
.warning {
  width: 40%;
  height: 30px;
  line-height: 30px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 6px;
  position: fixed;
  top: 48vh;
  left: 30%;
  z-index: 2;
  color: #fff;
  text-align: center;
}
.tuan-qiang {
  display: flex;
  height: 80px;
  width: 100%;
  padding-top: 12px;
  padding-left: 4%;
}
.tuan-qiang img {
  width: 16%;
  height: 7vh;
  margin-right: 4%;
}
.tuan-qiang .q-con {
  margin-right: 8%;
}
.tuan-qiang .q-con h6 {
  color: #333333;
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 5px;
}
.tuan-qiang .q-con p {
  color: #4d4d4d;
  font-size: 13px;
}
.tuan-qiang .q-right button {
  width: 64px;
  height: 25px;
  background: linear-gradient(
    -90deg,
    rgba(255, 133, 60, 1),
    rgba(255, 67, 47, 1)
  );
  box-shadow: 0px 2px 7.5px 0px rgba(255, 36, 0, 0.2);
  border-radius: 12.5px;
  color: #fff;
  font-size: 13px;
  text-align: center;
  line-height: 25px;
  margin-bottom: 8px;
  border: 0;
  margin-top: 5px;
}
.tuan-qiang .q-right p {
  color: #fe582f;
  font-size: 12px;
  text-align: center;
}
.zao {
  position: absolute;
  width: 100%;
  height: 210px;
  background: rgba(0, 0, 0, 0.2);
  z-index: 10;
}
.m-home {
  width: 6.4%;
  position: absolute;
  top: 20px;
  right: 4.6%;
  z-index: 200;
}
.tishi {
  color: red;
  font-size: 10px;
  display: none;
}
.m-imgs .swiper-container {
  width: 100%;
  margin-left: 4%;
}

.m-imgs div {
  margin-bottom: 0px;
}

.re-con input[type="radio"]:checked {
  background: url(~assets/checkbox_icon.png) no-repeat center;
  background-size: 90%;
}

.m-imgs .swiper-slide {
  width: 160px !important;
  height: 120px;
  margin-right: 5%;
}

.m-imgs .swiper-slide img {
  width: 100%;
  height: 100px;
  border-radius: 4px;
}

.m-imgs ul {
  margin-bottom: 7px;
}

.m-imgs ul li {
  color: #999999;
  font-size: 14px;
  display: inline-block;
  position: relative;
  margin-left: 6%;
  text-align: center;
  height: 44px;
  line-height: 44px;
}

.m-imgs ul li.m-active {
  color: #333333;
  font-size: 16px;
}

.m-imgs ul li.m-active i {
  width: 25px;
  height: 3px;
  background-color: #1cb64f;
  position: absolute;
  top: 80%;
  left: 25%;
}

.swiper-container {
  overflow: initial;
}

.m-bigimgs {
  position: fixed;
  display: none;
  top: 230px;
  width: 100%;
  z-index: 300000;
}

.m-bigimgs img {
  width: 100%;
}
.h-c {
  width: 92%;
  margin-left: 4%;
}

.m-huo .m-btns button {
  width: 92%;
  height: 44px;
  background-color: #f0f2f5;
  color: #4db5ff;
  font-size: 16px;
  text-align: center;
  line-height: 44px;
  margin-left: 4%;
  border: 0px;
  border-radius: 4px;
  margin-bottom: 5px;
  position: inherit;
  margin-top: 25px;
  font-weight: bold;
}

#m_sc_box {
  display: none;
}
.m-incro .go-map {
  background: url(~assets/addressmap.png) no-repeat;
  background-size: 100%;
  background-position: left;
}
/* 改版1.2css */
/* 留言 */
.m-xuan img {
  height: 44px;
  position: fixed;
  right: 15px;
  bottom: 130px;
  z-index: 10000;
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

/*轮播图*/
.swiper-box {
  height: 210px;
  margin-bottom: 25px;
  margin-left: 4%;
}

#swiper-pagination1 {
  height: 20px;
  position: absolute;
  z-index: 100;
  text-align: center;
}

.swiper-pagination2 {
  height: 20px;
  text-align: center;
}

.swiper-pagination2 .swiper-pagination-bullet {
  width: 12px;
  height: 3px;
  border-radius: 0;
}

.swiper-pagination2 .swiper-pagination-bullet-active {
  background: #4db5ff;
}

.swiper-box .swiper-slide {
  width: 54.3% !important;
  height: 210px !important;
  margin-right: 3.7% !important;
}

.m-lun .m-luns #lnum {
  width: 13.3333%;
  background: rgba(0, 0, 0, 0.8);
  height: 20px;
  font-size: 10px;
  color: #fff;
  line-height: 20px;
  text-align: center;
  border-radius: 10px;
  opacity: 0.6;
  position: absolute;
  right: 4%;
  bottom: 15px;
  z-index: 200;
}

.swiper-top .swiper-slide img {
  height: 210px !important;
}

.tar {
  display: flex;
}
.tar .left {
  width: 70%;
  height: 50px;
  background: linear-gradient(
    90deg,
    rgba(255, 133, 60, 1),
    rgba(255, 67, 47, 1)
  );
}

.tar .left h5 {
  color: #fff;
  font-size: 14px;
  margin-left: 14px;
  margin-top: 3px;
}
.tar .left h5 span {
  font-size: 24px;
}
.tar .left p {
  margin-left: 14px;
  color: #fff;
  font-size: 10px;
}
.tar .right {
  height: 50px;
  width: 30%;
  background: rgba(248, 217, 110, 1);
  padding-left: 14px;
}
.tar .right h5 {
  color: #ff432f;
  font-size: 14px;
  margin-bottom: 6px;
  padding-top: 4px;
}
.tar .right span {
  font-size: 14px;
  color: #5e3a13;
  margin-left: 2px;
}
.pin {
  padding: 20px 0 10px 0;
  position: relative;
}
.pin nav {
  padding: 0 4%;
}
.pin nav h3 {
  float: left;
  color: #121212;
  font-size: 17px;
  padding-left: 6px;
  border-left: 2.5px solid #3eacf0;
  font-weight: bold;
}
.pin nav p {
  float: right;
  color: #646466;
  font-size: 13px;
}
.pin nav p span {
  color: black;
  font-size: 13px;
  font-weight: bold;
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-left: 4px;
  margin-right: 4px;
  background: #d6d6d6;
  border-radius: 2px;
  text-align: center;
  line-height: 20px;
  margin-bottom: 10px;
}
.pin-bao {
  position: absolute;
  width: 44.4px;
  height: 44.4px;
  background: linear-gradient(
    -90deg,
    rgba(255, 133, 60, 1),
    rgba(255, 67, 47, 1)
  );
  border-radius: 5px;
  color: #fff;
  font-size: 13px;
  word-wrap: break-word;
  padding: 6px 8px 0 8px;
  right: 10%;
  top: 40%;
}
.pin img {
  width: 100%;
  margin-bottom: 10px;
}
.pin .bom {
  padding: 0 4%;
}
.trend-con1 {
  display: inline-block;
  line-height: 20px;
  width: 44%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 20px;
  font-size: 12px;
  color: #ff5650;
}
.trend-con1 .swiper-container10 {
  height: 20px;
}
.pin .hased {
  position: absolute;
  width: 14%;
  top: 39%;
  right: 9%;
}
.pin .bom p {
  float: right;
  color: #646466;
  font-size: 13px;
}
.pin .bom p span {
  color: #fe582f;
}
</style>