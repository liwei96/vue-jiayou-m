<template>
  <div class="Content" id="conll">
    <!-- <no-ssr>
      <remote-js src="https://webapi.amap.com/maps?v=1.4.14&key=729ac4d779c7e625bc11bd5ba3ff3112"></remote-js>
    </no-ssr>-->
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
          <img :src="topimg?topimg:defaultimg" :alt="building.name" :title="building.name" />
          <!-- <div class="swiper-top">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(img,key) in topimgs" :key="key">
                <img :src="img" style="width:100%" />
              </div>
            </div>
            <div id="swiper-pagination1"></div>
          </div>-->
          <span id="lnum">共{{topnum}}张</span>
        </div>
      </div>
      <transition name="fade">
        <div class="fixs" v-show="fx">
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
      <div class="tuan-msg" v-show="tuan==1">
        <div class="tar">
          <div class="left">
            <!-- <h5>
              已售：
              <span>{{group_buy.saled_num}}</span>
              套&nbsp;&nbsp;&nbsp;距下一期优惠差{{group_buy.remain_num}}套
            </h5>
            <p>(每多5套可优惠1000元最高优惠5000元)</p>-->
            <img src="~/assets/tar-left.png" alt />
          </div>
          <div class="right">
            <h5>距结束仅剩</h5>
            <p>
              {{day}}天
              <span>{{hour}}</span>:
              <span>{{min}}</span>:
              <span>{{second}}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="m-incro visible-xs-block .visible-sm-block">
        <h3>{{building.name}}</h3>

        <div class="m-ic-icons">
          <span class="m-zai">{{building.status}}</span>
          <span class="m-jing">{{building.decorate}}</span>
          <span v-show="building.railway">{{building.railway}}</span>
          <span>{{building.features[0]}}</span>
          <strong v-show="tuan==1">限时优惠</strong>
          <div class="build-icons" v-show="!iswx">
            <div class="icons-left">
              <img src="~/assets/contrast.png" alt @click="pks($event)" :data-v="id" />
              PK
            </div>
            <div>
              <img
                id="fork"
                src="~/assets/forks.png"
                alt
                :data-v="id"
                @click="collections($event)"
                v-show="forknum === 0"
              />
              <img
                id="forked"
                src="~/assets/heart.gif"
                :data-v="id"
                @click="collections($event)"
                v-show="forknum === 1"
              />
              收藏
            </div>
          </div>
          <div class="wxshare" v-show="iswx" @click="goshare">
            <img src="~/assets/wxshare.png" alt />
            分享
          </div>
          <!-- <i class="m-ishou">
            <img src="~/assets/contrast.png" alt />
            <i class="m_shou01" @click="pks($event)" :data-v="id">楼盘PK</i>
          </i>-->
        </div>
        <ul class="m-jtop">
          <li>
            <p>
              <span>{{parseInt(building.single_price)}}</span>元/m²
            </p>
            <span>参考单价</span>
          </li>
          <li>
            <p class="lo">
              <span>{{parseInt(building.total_price)}}</span>万起
            </p>
            <span>参考总价</span>
          </li>
          <li>
            <p v-show="building.area">
              <span>{{building.area}}</span>/m²
            </p>
            <span>建筑面积</span>
          </li>
        </ul>
        <div class="m-ibottom">
          <ul>
            <li>
              户型：
              <span class="m-pric">{{building.house}}</span>
            </li>
            <li>
              装修：
              <span>{{building.decorate}}</span>
            </li>
          </ul>
          <ul>
            <li>
              类型：
              <span class="m-pric">{{building.type}}</span>
            </li>
            <li>
              开盘：
              <span>{{building.timeline.first_open_time}}</span>
            </li>
          </ul>
          <nuxt-link :to="'/' + jkl + '/detail/' + id">
            <p id="moreinfro">
              详情
              <img src="~/assets/m-go.png" alt />
            </p>
          </nuxt-link>
        </div>
        <div class="go-map">
          <!-- <img class="map-address" src="~/assets/blackaddress.png" alt /> -->
          <span class="map-address">地址：</span>
          <span class="map-msg">{{building.address}}</span>
          <img class="map-go" src="~/assets/map-address.png" alt />
        </div>
        <div class="m-new">
          <div href="javascript:;" class="p1" data-v="最新变价通知">
            <img src="~/assets/newforce.png" />最新变价通知
          </div>
          <div href="javascript:;" class="p1" data-v="最新开盘通知">
            <img src="~/assets/newhorn.png" />最新开盘通知
          </div>
        </div>
      </div>

      <div class="m-image visible-xs-block .visible-sm-block">
        <!-- <a data-agl-cvt="2" :href="'tel:'+call" v-show="!iswxsid">
          <img src="~/assets/mj-tell.png" alt />
        </a>-->
        <div class="wxtel" v-show="!iswxsid">
          <a :href="'tel:'+call">
            <p>{{callmsg}}</p>
            <img src="~/assets/wxtel.jpg" alt />
          </a>
        </div>
        <div class="wxtel" v-show="iswxsid">
          <a :href="share.staff?'tel:'+share.staff.tel:call">
            <p>{{share.staff?share.staff.tel:''}}</p>
            <img src="~/assets/wxtel.jpg" alt />
          </a>
        </div>
      </div>
      <div class="pin">
        <nav>
          <h3>优惠信息</h3>
          <!-- <p v-show="tuan==1">
            参团活动结束
            <span>{{day}}</span>天
            <span>{{hour}}</span>:
            <span>{{min}}</span>:
            <span>{{second}}</span>
          </p>-->
          <button @click="huomsg = true">活动规则</button>
        </nav>
        <div class="top" v-show="tuan==1">
          <img src="~/assets/newtuan-pin.jpg" alt />
          <div class="pin-bao" @click="xiangs(22)" v-show="!newimg">立即参团</div>
          <p class="pin-msg">已有{{group_buy.saled_num}}人加入</p>
          <img src="~/assets/tuna-hased.jpg" alt class="hased" v-show="newimg" />
          <div class="bom">
            <div class="trend-con1">
              <div class="swiper-container10">
                <div class="swiper-wrapper">
                  <div
                    class="swiper-slide"
                    v-for="(trend,key) in group_buy.joined_tels"
                    :key="key"
                  >{{trend}}领取了优惠券</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bomm">
          <div class="pin-bao y1" v-show="!newimg" @click="xiang(28)">抢优惠券</div>
          <p class="pin-msg ym">{{sign.num}}人已抢到</p>
          <p class="pin-time">有效期：{{starttime}}-{{endtime}}</p>
          <img src="~/assets/youhui.jpg" alt />
          <div class="bom">
            <div class="trend-con1">
              <div class="swiper-container10">
                <div class="swiper-wrapper">
                  <div
                    class="swiper-slide"
                    v-for="(trend,key) in sign.info"
                    :key="key"
                  >{{trend}}领取了优惠券</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="huo-msg" v-show="huomsg">
        <div class="msg-con">
          <h4>活动规则</h4>
          <img @click="huomsg = false" src="~/assets/w-del.png" alt />
          <div>
            <p>1、本次团购活动以分档累计补发的方案执行，通过家园网站成交该项目具体团购费用如下所示：</p>
            <p>0-5套---------每套1000元</p>
            <p>6-10套--------每套2000元</p>
            <p>11-15套-------每套3000元</p>
            <p>16-20套-------每套4000元</p>
            <p>21套以上------每套5000元</p>
            <p>2、结算时间：网签成功后次月20号发放。补发费用待该范围内的最后一套网签成功后次月20号发放</p>
            <p>3、核算方式：由开发商或代理公司判定为家园平台客户即可享受这个优惠</p>
            <p>4、结算方式：提供已实名的支付宝账户给与您对接的家园咨询师，规定时间内会将优惠费用打至该账户</p>
            <p>
              详细活动方案请致电允家客服电话：
              <span>400-718-6686</span> 注：活动最终解释权归家园所有
            </p>
          </div>
        </div>
      </div>
      <div class="m-line visible-xs-block .visible-sm-block"></div>
      <div class="top-num" v-show="false">
        <img src="~/assets/content-top.png" alt class="content-top" />
        <span>刚需楼盘榜第4名</span>
        <img class="totop" src="~/assets/m-go.png" alt />
      </div>

      <div class="banner" v-if="banner.length != 0" @click="gobanner">
        <img :src="banner.img" alt />
      </div>
      <div class="m-line" v-if="banner.length != 0"></div>
      <div class="m-dong visible-xs-block .visible-sm-block">
        <h3 id="m_dong">
          楼盘动态
          <nuxt-link :to="'/' + jkl + '/contentdynamic/' + id">
            <span>
              共{{ds}}条
              <img src="~/assets/m-go.png" alt />
            </span>
          </nuxt-link>
        </h3>

        <div class="m-tai m-d">
          <span>
            {{nowdong.time}}
            <i>最新</i>
          </span>
          <h4>最新房源动态</h4>
          <p>{{nowdong.introduce}}</p>
        </div>
        <div class="m-jia m-d" v-show="tui">
          <span>
            {{tui.time}}
            <i>加推</i>
          </span>
          <h4>最新加推楼盘</h4>
          <p>{{tui.introduce}}</p>
        </div>

        <div class="t-o o1"></div>
        <div class="t-o o2" v-show="tui"></div>
        <div class="t-l l1"></div>
        <div class="t-l l2" v-show="tui"></div>
        <div class="dynamic-hd">
          <div class="swiper-dynamic">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <div :class="ndss">
                  <h5>拿地</h5>
                  <p>{{ndtime}}</p>
                  <div></div>
                </div>
              </div>
              <div class="swiper-slide">
                <div :class="jtss">
                  <h5>首开</h5>
                  <p>{{jttime}}</p>
                  <div></div>
                </div>
              </div>
              <div class="swiper-slide">
                <div :class="skss">
                  <h5>加推</h5>
                  <p>{{sktime}}</p>
                  <div></div>
                </div>
              </div>
              <div class="swiper-slide">
                <div :class="jfss">
                  <h5>交房</h5>
                  <p>{{jftime}}</p>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button class="p1" data-v="订阅最新动态">获取最新动态</button>
      </div>

      <div class="m-line visible-xs-block .visible-sm-block" v-show="hu"></div>

      <div class="m-hu visible-xs-block .visible-sm-block" v-show="hu">
        <h3>
          主力户型
          <nuxt-link :to="'/' + jkl + '/morehus/' + id">
            <span class="m-h-more">
              更多户型
              <img src="~/assets/m-go.png" alt />
            </span>
          </nuxt-link>
        </h3>
        <div class="swiper-house">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(h,key) in hu" :key="key">
              <div class="tegood">
                <nuxt-link :to="'/'+jkl+'/HuAnalysis/'+h.id+'/'+building.id">
                  <div class="top">
                    <img
                      :src="h.small?h.small:defaultimg"
                      :alt="building.name+'户型图'"
                      :title="building.name+'户型图'"
                    />
                  </div>
                  <h5>
                    {{h.title}}
                    <span>{{h.status}}</span>
                  </h5>
                  <p class="jian">建面 {{h.area}}&nbsp;&nbsp;&nbsp;类型 {{h.type}}</p>
                  <p class="red">
                    约
                    <span>{{h.price}}</span>万起
                  </p>
                </nuxt-link>
                <button class="p1" data-v="咨询详细户型">咨询详细户型</button>
              </div>
            </div>
          </div>
        </div>
        <!-- <button class="p1" data-v="了解详细户型">了解详细户型</button> -->
      </div>
      <div class="m-line visible-xs-block .visible-sm-block"></div>
      <div class="m-you visible-xs-block .visible-sm-block">
        <img class="m-y-g" src="~/assets/new-yuyue1.png" />
        <button class="p1" data-v="预约看房">预约看房</button>
        <span>876人已领取</span>
      </div>

      <div class="m-line visible-xs-block .visible-sm-block"></div>

      <!--对比分析资料 -->
      <div class="m-fen visible-xs-block .visible-sm-block">
        <h3>
          项目分析资料
          <nuxt-link :to="'/' + jkl + '/analysis/' + id">
            <span class="m-more-fen">
              详细分析
              <img class="xiang-img" src="~/assets/m-go.png" alt />
            </span>
          </nuxt-link>
        </h3>

        <!--对比分析资料 -->
        <div class="dui-zi">
          <div class="swiper-wrapper">
            <div class="swiper-slide dui-box">
              <nuxt-link :to="'/'+jkl+'/analysis/'+id">
                <div class="tou-con">
                  <h4>投资分析</h4>
                  <p v-for="(v,key) in invest" :key="key">{{key+1}}、{{v}}</p>
                </div>
                <div class="tou-img">
                  <img src="~/assets/pc-db.png" alt />
                </div>
              </nuxt-link>
            </div>
            <div class="swiper-slide dui-box">
              <nuxt-link :to="'/'+jkl+'/analysis/'+id">
                <div class="tou-con">
                  <h4>宜居分析</h4>
                  <p v-for="(v,key) in live" :key="key">{{key+1}}、{{v}}</p>
                </div>
                <div class="tou-img">
                  <img src="~/assets/yiju.png" alt />
                </div>
              </nuxt-link>
            </div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination2"></div>
        </div>
        <button class="p1" data-v="获取楼盘分析资料">获取楼盘分析资料</button>
      </div>
      <div class="m-line visible-xs-block .visible-sm-block" v-show="tuan==1"></div>
      <!-- <div class="tuan-qiang" v-show="tuan==1">
        <img src="~/assets/tuan-qiang.png" alt />
        <div class="q-con">
          <h6>省钱买好房拼团享优惠</h6>
          <p>购房享1000元优惠最高5000元</p>
        </div>
        <div class="q-right">
          <button @click="xiang(25)">马上抢</button>
          <p>{{group_buy.snatched_num}}已抢</p>
        </div>
      </div>
      <div class="m-line visible-xs-block .visible-sm-block"></div>-->
      <div class="m-ling visible-xs-block .visible-sm-block">
        <h3>
          领取免费地图
          <span>
            已有
            <i>860</i>人领取
          </span>
        </h3>
        <img src="~/assets/new-map1.jpg" alt />
        <div class="m-iright">
          <h4>为什么大家在准备买房的时候领 一份资料？</h4>
          <p>1.优质地段、优质楼盘一图囊括</p>
          <p class="ling-ssd">
            <i>
              2.电子地图、快捷分享、多人收益
              <em v-show="ling">...</em>
            </i>
            <i>3.高效率看房、更多楼盘三维对比</i>
            <i>4.提供精准的价格、商业分析</i>
          </p>
          <span @click="lingbtn($event)">展开</span>
        </div>
        <button class="p1" data-v="领取免费地图">我要领取地图</button>
      </div>
      <div class="m-line visible-xs-block .visible-sm-block"></div>
      <div class="m-huo visible-xs-block .visible-sm-block">
        <h3>
          查询最新成交价
          <p>
            已有
            <span>{{searchnum}}</span>人查询
          </p>
        </h3>
        <div id="chart" style="width:100%;height:250px"></div>
        <div class="table">
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
          <div class="huo-more">
            <img src="~/assets/huo-down.png" alt />
          </div>
        </div>
        <div class="m-btns">
          <button class="p1" data-v="获取最新成交价">获取最新成交价</button>
        </div>
      </div>
      <div class="m-line visible-xs-block .visible-sm-block"></div>
      <div class="m-dai visible-xs-block .visible-sm-block">
        <h3>
          楼盘问答
          <nuxt-link :to="'/' + jkl + '/question/' + id">
            <span>
              更多问答
              <img src="~/assets/m-go.png" alt />
            </span>
          </nuxt-link>
        </h3>
        <p id="tishi" v-show="questions.length==0?true:false">暂无问答，快来提问吧</p>
        <div class="m-d-content">
          <template v-show="questions.length==0?false:true">
            <div class="m-w-content" v-for="(q,key) in questions" :key="key">
              <nuxt-link :to="'/'+jkl+'/questions/'+q.id">
                <h4>
                  <span>问</span>
                  <u>{{q.question}}</u>
                </h4>
              </nuxt-link>
              <p>
                <span>答</span>
                <img src="~/assets/people.png" alt />
                <em class="peoname">杨涛</em>
                <em class="peowork">允家咨询师</em>
              </p>
              <p>
                <i>
                  {{q.answer.substr(0,19)}}{{q.answer.length>20?'...':''}}
                  <u
                    v-show="q.answer.length>19"
                    @click="chan(q.id)"
                  >展开</u>
                </i>
                <i class="sl">{{q.answer}}</i>
              </p>
              <span class="time">{{q.time}}</span>
              <span class="giveup">
                <img
                  id="answer"
                  :src="q.my_like == 0 ? beforeck : cked"
                  :type="q.my_like"
                  :data-v="q.id"
                  :data-n="q.like_num"
                  data-y="1"
                  @click="agree($event)"
                />
                <span
                  :type="q.my_like"
                  :data-v="q.id"
                  :data-n="q.like_num"
                  data-y="1"
                  @click="agrees($event)"
                >有用({{q.like_num ? q.like_num : 0}})</span>
              </span>
            </div>
          </template>
          <button class="question">我要提问</button>
        </div>
      </div>
      <div class="m-line visible-xs-block .visible-sm-block"></div>

      <div class="m-zhou visible-xs-block .visible-sm-block">
        <h3>
          周边配套
          <span>
            详细配套
            <img src="~/assets/m-go.png" alt />
          </span>
        </h3>
        <nuxt-link :to="'/' + jkl + '/Periphery/' + id + '/1'">
          <div class="m-continer" id="m-container"></div>
        </nuxt-link>
        <div class="m-z-icons">
          <div class="swiper-map">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <div :class="mapnum === 0 ? 'tegood active' : 'tegood'" @click="setmap(0, '公交')">
                  公交
                  <i></i>
                </div>
              </div>
              <div class="swiper-slide">
                <div :class="mapnum === 1 ? 'tegood active' : 'tegood'" @click="setmap(1 ,'地铁')">
                  地铁
                  <i></i>
                </div>
              </div>
              <div class="swiper-slide">
                <div :class="mapnum === 2 ? 'tegood active' : 'tegood'" @click="setmap(2, '教育')">
                  教育
                  <i></i>
                </div>
              </div>
              <div class="swiper-slide">
                <div :class="mapnum === 3 ? 'tegood active' : 'tegood'" @click="setmap(3, '医院')">
                  医院
                  <i></i>
                </div>
              </div>
              <div class="swiper-slide">
                <div :class="mapnum === 4 ? 'tegood active' : 'tegood'" @click="setmap(4, '购物')">
                  购物
                  <i></i>
                </div>
              </div>
              <div class="swiper-slide">
                <div :class="mapnum === 5 ? 'tegood active' : 'tegood'" @click="setmap(5, '美食')">
                  美食
                  <i></i>
                </div>
              </div>
              <div class="swiper-slide">
                <div :class="mapnum === 6 ? 'tegood active' : 'tegood'" @click="setmap(6, '娱乐')">
                  娱乐
                  <i></i>
                </div>
              </div>
            </div>
          </div>
          <div class="map-con">
            <ul class="con"></ul>
            <p class="msg" v-show="isnull">附近没有{{mapname}}，您可以看看其他信息</p>
          </div>
        </div>
        <button class="p1" data-v="获取详细周边配套">获取详细周边配套</button>
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
          <span>{{building.country_name}}</span>
          <i class="m-s3"></i>
          <span>{{building.city_name}}</span>
        </div>
        <p class="msg">
          <img src="~/assets/bell.png" alt />
          价格变动这么快？
          订阅最新变价通知，楼盘变价我们第一时间通知您
        </p>
        <button class="p1" data-v="最新房价趋势解读">最新房价趋势解读</button>
      </div>
      <div class="m-line visible-xs-block .visible-sm-block"></div>
      <!-- 楼盘对比 -->
      <div class="m-contrast">
        <h4>楼盘对比</h4>
        <div class="swiper-pk">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(c,key) in compares" :key="key">
              <div class="tegood">
                <div class="img">
                  <img :src="c.img?c.img:defaultimg" :alt="c.name" :title="c.name" />
                  <p>相似楼盘</p>
                </div>
                <h5>{{c.name}}</h5>
                <p class="llk">
                  {{c.country}}&nbsp;&nbsp;
                  <span v-show="c.area">{{c.area}}m²</span>
                </p>
                <p class="red">{{parseInt(c.price)}}元/m²</p>
                <button @click="pkhref(c.id)">加入对比</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="m-line visible-xs-block .visible-sm-block"></div>
      <!-- 楼盘点评 -->
      <div class="m-dian visible-xs-block .visible-sm-block" id="dianping">
        <h4>
          楼盘点评
          <nuxt-link :to="'/' + jkl + '/morecomments/' + id">
            <span id="m_d_more">
              更多评论
              <img src="~/assets/m-go.png" alt />
            </span>
          </nuxt-link>
        </h4>
        <p id="tishi" v-show="comments.length==0?true:false">暂无点评，快来点评吧</p>
        <ul>
          <li v-for="(v,key) in comments" :key="key">
            <div class="left">
              <img src="~/assets/jiapeo.png" alt />
            </div>
            <div class="right">
              <h6>
                {{v.mobile}}
                <span class="attitude">有兴趣</span>
                <p class="interaction">
                  <img
                    id="agree"
                    :data-v="v.id"
                    :type="v.my_like"
                    :data-n="v.like_num"
                    @click="agree($event)"
                    data-y="2"
                    :src="v.my_like == 0 ? beforeck : cked"
                  />
                  <span
                    :data-v="v.id"
                    :type="v.my_like"
                    :data-n="v.like_num"
                    data-y="2"
                    @click="agrees($event)"
                  >有用({{v.like_num}})</span>
                </p>
              </h6>
              <div class="btn">
                <van-rate
                  v-model="v.score"
                  :size="8"
                  color="#3DABEF"
                  void-icon="star"
                  void-color="#E8EBED"
                  :readonly="read"
                />
                <span>{{v.time}}</span>
                <strong :data-v="v.id" @click="del($event)" v-show="tel==v.mobile">删除</strong>
              </div>
              <p class="txt">{{v.content}}</p>
            </div>
          </li>
        </ul>
        <!-- <nuxt-link :to="'/'+jkl+'/comment/'+id"> -->
        <button class="m-d-x" @click="gocomment">我要点评</button>
        <!-- </nuxt-link> -->
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
            <nuxt-link :to="'/'+jkl+'/content/'+list.id">
              <div class="re-con-left">
                <img :src="list.img?list.img:defaultimg" :alt="list.name" :title="list.name" />
                <!-- <span>
                  <i class="iconfont iconyanjing"></i>
                  {{list.num}}
                </span>-->
              </div>
              <div class="re-con-right">
                <h5>
                  {{list.name}}
                  <span>{{list.status}}</span>
                </h5>
                <p class="price">
                  <span>{{list.price}}</span>元/m²
                </p>
                <p class="area">
                  <span>{{list.type}}</span>
                  |
                  <span>{{list.city.substr(0,2)}}-{{list.country.substr(0,2)}}</span>
                  |
                  <span v-show="list.area">{{list.area}}m²</span>
                </p>
                <p class="tabs">
                  <span class="strong">{{list.decorate}}</span>
                  <span v-show="list.railway">{{list.railway}}</span>
                  <span>{{list.features[0]}}</span>
                </p>
              </div>
            </nuxt-link>
          </div>
        </div>
        <div class="re-con r2" v-show="n2">
          <div class="re-list" v-for="(list,key) in same_area" :key="key">
            <nuxt-link :to="'/'+jkl+'/content/'+list.id">
              <div class="re-con-left">
                <img :src="list.img?list.img:defaultimg" :alt="list.name" :title="list.name" />
                <!-- <span>
                  <i class="iconfont iconyanjing"></i>
                  {{list.num}}
                </span>-->
              </div>
              <div class="re-con-right">
                <h5>
                  {{list.name}}
                  <span>{{list.status}}</span>
                </h5>
                <p class="price">
                  <span>{{list.price}}</span>元/m²
                </p>
                <p class="area">
                  <span>{{list.type}}</span>
                  |
                  <span>{{list.city.substr(0,2)}}-{{list.country.substr(0,2)}}</span>
                  |
                  <span v-show="list.area">{{list.area}}m²</span>
                </p>
                <p class="tabs">
                  <span class="strong">{{list.decorate}}</span>
                  <span v-show="list.railway">{{list.railway}}</span>
                  <span>{{list.features[0]}}</span>
                </p>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="visible-xs-block .visible-sm-block m-ll"></div>
      <!-- 微信环境的浏览记录 -->
      <div class="wxlu" v-show="iswxsid">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,key) in share.visitors" :key="key">
            <div class="wxlu-con">
              <img :src="item.head_img?item.head_img:wximage" alt />
              <div class="wxlumsg">
                <h5>{{item.nickname?item.nickname:'匿名'}}</h5>
                <p>{{item.min?item.min:5}}分钟前浏览</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 底部悬浮 -->
      <div class="m-botnav visible-xs-block .visible-sm-block" v-show="!iswxsid">
        <p id="m_shou" @click="gotalk">
          <!-- <img
            id="fork"
            src="~/assets/forks.png"
            alt
            :data-v="id"
            @click="collections($event)"
            v-show="forknum === 0"
          />
          <img
            id="forked"
            src="~/assets/heart.gif"
            :data-v="id"
            @click="collections($event)"
            v-show="forknum === 1"
          />收藏-->
          <img src="~/assets/talkimg.png" alt />
          在线咨询
          <span v-show="wsshow">{{wsnum}}</span>
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
      <div class="wxwork" v-show="iswxsid">
        <div class="wximg" @click="gotalk">
          <img :src="share.staff?share.staff.head_img:nolmalimg" alt />
          <p>咨询</p>
          <span v-show="wsshow">{{wsnum}}</span>
        </div>
        <div class="wxmsg">
          <h5>{{share.staff?share.staff.name:''}}</h5>
          <p>咨询分析师</p>
        </div>
        <button class="wxyue p1" data-v="预约看房">
          <img src="~/assets/wxtime.png" alt />
          预约看房
        </button>
        <a :href="share.staff?'tel:'+share.staff.tel:''">
          <button class="wxtel">
            <img src="~/assets/wxtel.png" alt />
            电话咨询
          </button>
        </a>
      </div>
      <!-- <van-popup v-model="showpop" position="bottom" closeable
      close-icon="arrow-left" close-icon-position="top-left" close-icon-color="#969699"><talk></talk></van-popup>-->
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
                <input
                  class="l-p"
                  type="tel"
                  placeholder="输入预约手机号码"
                  v-model="baoming"
                  maxlength="11"
                />
                <p class="w-mg">
                  <input class="w-mg-c" type="checkbox" checked v-model="checks" />我已阅读并同意
                  <nuxt-link :to="'/'+jkl+'/server'">
                    <a href="javasript:;">《允家新房用户协议》</a>
                  </nuxt-link>
                </p>

                <button class="t-b-btn t-b-btn2 bg_01" id="dingxue" @click="dingyue">立即订阅</button>
                <p class="w-tit">
                  <!-- <img src="~/assets/w-call.png" />允家严格保障您的信息安全 -->
                  提交后将有咨询师与您取得联系并提供服务
                </p>
              </div>
              <div class="t-b-second">
                <p>
                  验证码已发送到
                  <span id="ytel">187****4376</span>，请注意查看
                </p>
                <input type="tel" placeholder="请输入验证码" v-model="ma" id="ma-ll" />
                <button class="port1" @click="check">确定</button>
                <input type="hidden" id="building_name" value />
                <input type="hidden" value />
                <button class="t-b-scode" @click="again">获取验证码</button>
              </div>
            </div>
            <p class="tishi">请勾选用户协议</p>
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
        <transition name="change">
          <div class="hengda" v-show="ishengda">
            <img class="del" src="~/assets/w-del.png" alt @click="guanbi"/>
            <img src="~/assets/hengda.png" alt class="topimg" />
            <input type="text" placeholder="输入身份证号后6位" maxlength="6" v-model="IDcode" />
            <p class="zhu">注: 根据本楼盘售楼处规定，实地看房需先提前报备 身份证后6位</p>
            <button @click="hengda">申请报备</button>
          </div>
        </transition>
        <div id="m_ti"></div>
        <div class="m-bigimgs">
          <img class="m_bigimgs" src alt />
        </div>
      </div>
      <div id="panel" style="display:none;"></div>
    </div>

    <div class="swp" v-show="tu">
      <slide-verify
        :l="20"
        :r="5"
        :w="240"
        :h="160"
        :imgs="imgs"
        @success="onSuccess"
        @fail="onFail"
        @refresh="onRefresh"
        :slider-text="text"
      ></slide-verify>
    </div>
    <div class="iscookie" v-show="iscookie">
      <p>为了更好的体验，请在浏览器设置中打开cookie</p>
    </div>
    <div class="pingbox" v-show="shouping" @click="shouping = false"></div>
    <transition name="change">
      <div class="shouping" v-show="shouping">
        <img class="esc" @click="shouping = false" src="~/assets/pingesc.png" alt />
        <img class="img" :src="shoupingimg" alt />
        <input type="text" placeholder="请输入您手机号" v-model="baoming" />
        <button @click="shou">领取优惠</button>
        <p class="peonum">187人已领取</p>
        <p class="show-msg">
          活动说明：领取成功后优惠编码将与您手机号绑定，会有工
          作人员与您联系，此优惠不与参团优惠叠加使用
        </p>
        <p class="zhu">注：活动最终解释权归允家所有</p>
        <span v-show="warningbtn">{{warning}}</span>
      </div>
    </transition>
    <div class="tsmsg" v-show="tstype">{{tsmsg}}</div>
  </div>
</template>
<script>
// import talk from '@/components/talk.vue'
import footView from "@/components/Foot.vue";
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
// import { echarts } from "./static/js/echarts.min.js";
import axios from "axios";
import Loading from "@/components/loading.vue";
import ReconnectingWebSocket from "reconnecting-websocket";
import {
  content_data,
  ip,
  collection,
  msg,
  verification,
  trend_put,
  PK,
  encyclopediaarticle_agree,
  comment_del,
  getsdk,
  getsid,
  putmap,
  hengda,
} from "~/api/api";
export default {
  name: "Content",
  components: {
    "my-loading": Loading,
    "foot-view": footView,
    // "talk": talk,
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
  validate({ params }) {
    // 必须是number类型
    let match = params.id.match(/\d+/);
    if (match) {
      params.id = match[0];
      return params.id;
    } else {
      return false;
    }
  },
  async asyncData(context) {
    // console.log(context.query)
    // console.log(timestamp);

    let id = context.params.id;
    let token = context.store.state.cookie.token;
    let uuid = context.store.state.uuid;
    if (!token) {
      token = null;
    }
    let ip = context.store.state.cookie.ip;
    if (!ip) {
      ip = null;
    }
    let kid = context.store.state.cookie.kid
      ? context.store.state.cookie.kid
      : "";
    let other = context.store.state.cookie.other
      ? context.store.state.cookie.other
      : "";
    if (context.query.kid != kid && context.query.kid) {
      kid = context.query.kid;
      context.store.state.cookie.kid = context.query.kid;
    }
    if (context.query.other != other && context.query.other) {
      other = context.query.other;
      context.store.state.cookie.other = context.query.other;
    }
    let data = {
      platform: 2,
      id: id,
      ip: ip,
      token: token,
      kid: kid,
      other: other,
      uuid: context.store.state.cookie.uuid,
    };
    let url = context.route.fullPath;
    if (url) {
      url = url.split("?")[1];
      if (url && url.indexOf("scid") !== -1) {
        let sid = url.split("=")[1];
        data.scid = sid;
      } else if (
        context.store.state.cookie &&
        context.store.state.cookie.scid
      ) {
        data.scid = context.store.state.cookie.scid;
      }
    }

    let jkl = context.params.name;
    let [res1] = await Promise.all([
      context.$axios.post("/api/detail/mobile", data).then((res) => {
        if (res) {
          if (res.data.code === 200) {
            let data = res.data;
            data.topimg = data.info.constant.img;
            let times = [];
            for (let item of data.info.constant.deals) {
              times.push(item.date.replace(/-/g, "/").substr(5));
            }
            let prices = [];
            for (let item of data.info.constant.deals) {
              prices.push(item.money);
            }
            data.prices = prices;
            data.times = times;
            let trend = data.info.constant.avg_prices;
            let p1 = [];
            let p2 = [];
            let p3 = [];
            let t = [];
            for (let item in trend) {
              p1.unshift(Number(trend[item]["city"]).toFixed(0));
              p2.unshift(Number(trend[item]["country"]).toFixed(0));
              p3.unshift(Number(trend[item]["project"]).toFixed(0));
              let d = trend[item]["time"].replace(/-/g, "/");
              t.unshift(d);
            }
            data.p1 = p1;
            data.p2 = p2;
            data.p3 = p3;
            data.t = t;
            let date = new Date();
            let now = date.getTime();

            if (
              new Date(
                data.info.constant.timeline.get_land_time.replace(/-/g, "/")
              ).getTime() < now
            ) {
              data.jfss = "tegood";
              data.ndss = "dactive tegood";
            } else {
              data.ndss = "tegood";
            }
            if (
              new Date(
                data.info.constant.timeline.add_push_time.replace(/-/g, "/")
              ).getTime() < now
            ) {
              data.jtss = "dactive tegood";
              data.jfss = "tegood";
              data.ndss = "tegood";
              data.skss = "tegood";
            } else {
              data.jtss = "tegood";
            }
            if (
              new Date(
                data.info.constant.timeline.first_open_time.replace(/-/g, "/")
              ).getTime() < now
            ) {
              data.skss = "dactive tegood";
              data.jfss = "tegood";
              data.ndss = "tegood";
              data.jtss = "tegood";
            } else {
              data.skss = "tegood";
            }
            if (
              new Date(
                data.info.constant.timeline.give_time.replace(/-/g, "/")
              ).getTime() < now
            ) {
              data.jfss = "dactive tegood";
              data.jtss = "tegood";
              data.ndss = "tegood";
              data.skss = "tegood";
            } else {
              data.jfss = "tegood";
            }
            data.nowdong = {};
            data.tui = {};
            if (data.info.varialble.dynamics.length != 0) {
              data.nowdong = data.info.varialble.dynamics[0];
              if (data.info.varialble.dynamics.length === 2) {
                data.tui = data.info.varialble.dynamics[1];
              }
            }
            let p = parseInt(data.info.constant.single_price / 10000);
            data.max = p + 3;

            if (!data.hasOwnProperty("head")) {
              data.head.phone = "400-718-6686";
              data.head.title = "允家新房";
              data.head.description = "允家新房";
              data.head.keywords = "允家新房";
              data.head.open = 0;
            }
            if (Object.keys(data.share_info).length == 0) {
              data.share_info = {
                staff: {
                  tel: 123,
                  name: "456",
                  head_img: require("~/assets/jiapeo.png"),
                },
                visitors: [],
              };
            }

            return data;
          }
        }
      }),
    ]);
    return {
      jkl: res1.head.city_data.pinyin,
      call: res1.head.phone,
      la: res1.info.constant.location.latitude,
      ln: res1.info.constant.location.longitude,
      topnum: res1.info.constant.img_count,
      building: res1.info.constant,
      tit: res1.info.constant.name,
      ds: res1.info.varialble.dynamics_count,
      phone: res1.head.phone,
      nowdong: res1.nowdong,
      tui: res1.tui,
      hu: res1.info.constant.apartments,
      live: res1.info.constant.analysis.live,
      invest: res1.info.constant.analysis.invest,
      searchnum: res1.info.varialble.num.search_num,
      chengjiao: res1.info.constant.deals,
      times: res1.times,
      prices: res1.prices,
      questions: res1.info.varialble.questions,
      location: res1.info.constant.location,
      compares: res1.info.varialble.compares,
      comments: res1.info.varialble.comments,
      same_price: res1.info.constant.same_price,
      same_area: res1.info.constant.same_area,
      trend_time: res1.t,
      trend_price1: res1.p1,
      trend_price2: res1.p2,
      trend_price3: res1.p3,
      ndtime: res1.info.constant.timeline.get_land_time,
      jftime: res1.info.constant.timeline.give_time,
      sktime: res1.info.constant.timeline.first_open_time,
      jttime: res1.info.constant.timeline.add_push_time,
      ndss: res1.ndss,
      jtss: res1.jtss,
      skss: res1.skss,
      jfss: res1.jfss,
      title: res1.head.title,
      description: res1.head.description,
      keywords: res1.head.keywords,
      collect: res1.info.varialble.collect,
      checks: true,
      city: res1.info.constant.city,
      tuan: res1.activity.group.flag,
      group_buy: res1.activity.group.info,
      sign: res1.activity.sign,
      open: res1.head.open,
      topimg: res1.topimg,
      max: res1.max,
      ws: false,
      share: res1.share_info,
      banner: res1.banner,
      uuid: uuid,
    };
  },
  data() {
    return {
      IDcode: "",
      ishengda: false,
      tstype: false,
      uuid: "",
      tsmsg: "请不要重复报名",
      banner: [],
      last_log_id: "",
      wxlat: "",
      wxlng: "",
      share: {
        staff: {
          tel: 123,
          name: "456",
          head_img: require("~/assets/jiapeo.png"),
        },
      },
      iswxsid: false,
      iswx: false,
      wsnum: "",
      cons: [],
      sids: [],
      ws: {},
      wsshow: false,
      showpop: false,
      oldUrl: "",
      sp: true,
      forknum: 0,
      shouping: false,
      warning: "请输入手机号",
      warningbtn: false,
      max: 0,
      ditie: "?",
      gongjiao: "?",
      jiaoyus: "?",
      yiyuan: "?",
      gouwu: "?",
      meishi: "?",
      yule: "?",
      sign: {},
      topimg: "",
      ling: true,
      mapnum: 0,
      imgs: [require("~/assets/lou1.png"), require("~/assets/lou2.png")],
      img1: require("~/assets/lou1.png"),
      img2: require("~/assets/lou2.png"),
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
      tongjia: [],
      tongqu: [],
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
      over: true,
      title: "",
      keywords: "",
      description: "",
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
      ones: 0,
      open: 0,
      tu: false,
      text: "向右滑",
      msg: "",
      iscookie: false,
      isnull: false,
      mapname: "公交",
      pois: [],
      mapimg: require("~/assets/path.png"),
      huomsg: false,
      ws: false,
      faces: [
        "[微笑]",
        "[嘻嘻]",
        "[哈哈]",
        "[可爱]",
        "[可怜]",
        "[挖鼻]",
        "[吃惊]",
        "[害羞]",
        "[挤眼]",
        "[闭嘴]",
        "[鄙视]",
        "[爱你]",
        "[泪]",
        "[偷笑]",
        "[亲亲]",
        "[生病]",
        "[太开心]",
        "[白眼]",
        "[右哼哼]",
        "[左哼哼]",
        "[嘘]",
        "[衰]",
        "[委屈]",
        "[吐]",
        "[哈欠]",
        "[抱抱]",
        "[怒]",
        "[疑问]",
        "[馋嘴]",
        "[拜拜]",
        "[思考]",
        "[汗]",
        "[困]",
        "[睡]",
        "[钱]",
        "[失望]",
        "[酷]",
        "[色]",
        "[哼]",
        "[鼓掌]",
        "[晕]",
        "[悲伤]",
        "[抓狂]",
        "[黑线]",
        "[阴险]",
        "[怒骂]",
        "[互粉]",
        "[心]",
        "[伤心]",
        "[猪头]",
        "[熊猫]",
        "[兔子]",
        "[ok]",
        "[耶]",
        "[good]",
        "[NO]",
        "[赞]",
        "[来]",
        "[弱]",
        "[草泥马]",
        "[神马]",
        "[囧]",
        "[浮云]",
        "[给力]",
        "[围观]",
        "[威武]",
        "[奥特曼]",
        "[礼物]",
        "[钟]",
        "[话筒]",
        "[蜡烛]",
        "[蛋糕]",
      ],
      isagree: true,
      isagrees: true,
      beforeck: require("~/assets/giveup.png"),
      cked: require("~/assets/clicked.png"),
      starttime: "",
      endtime: "",
      wximage: require("~/assets/head_icon.png.png"),
      nolmalimg: require("~/assets/jiapeo.png"),
      timename: {},
      defaultimg: require("~/assets/default.jpg"),
      shoupingimg: require("~/assets/shouping.png"),
      callmsg: "",
    };
  },
  head() {
    return {
      title: this.title || "允家新房",
      meta: [
        {
          name: "description",
          content: this.description,
        },
        {
          name: "keywords",
          content: this.keywords,
        },
      ],
    };
  },
  beforeRouteEnter(to, from, next) {
    if (
      from.path.indexOf("talk") == -1 &&
      process.server == false &&
      from.path !== "/"
    ) {
      $cookies.set("old", from.path);
    }
    next();
  },
  methods: {
    gotalk() {
      // this.showpop = true
      let k = $cookies.get("pinyin");
      if (sessionStorage.getItem(this.building.id)) {
        sessionStorage.setItem("sid", sessionStorage.getItem(this.building.id));
      }
      sessionStorage.setItem("projectid", this.building.id);
      sessionStorage.setItem("ws" + this.building.id, true);
      // this.$router.push(`/${k}/talk`);
      window.location.href = `/${k}/talk`;
    },
    shou() {
      let tel = this.baoming;
      let that = this;
      var pattern_tel = /^1[3-9][0-9]{9}$/;
      if (tel == "") {
        this.warning = "请输入手机号";
        this.warningbtn = true;
        setTimeout(() => {
          that.warningbtn = false;
        }, 1500);
        return;
      } else if (!pattern_tel.test(tel)) {
        this.warning = "请输入正确的手机号";
        this.warningbtn = true;
        setTimeout(() => {
          that.warningbtn = false;
        }, 1500);
        return;
      }
      let ip = ip_arr["ip"];
      let c = localStorage.getItem("city");
      let p = that.page;
      let id = that.id;
      let kid = sessionStorage.getItem("kid");
      let other = sessionStorage.getItem("other");
      let url = window.location.href;
      url = url.split("?")[1];
      let op = {};
      if (url && url.indexOf("scid") !== -1) {
        let wx = {
          platform: 2,
          city: c,
          ip: ip,
          tel: tel,
          position: 32,
          page: 3,
          project: id,
          source: "微信分享2",
          kid: kid,
          staff_id: that.share.staff.sid,
          other: other,
        };
        op = wx;
      } else {
        let normal = {
          ip: ip,
          tel: tel,
          city: c,
          position: 32,
          page: 3,
          type: 9,
          project: id,
          kid: kid,
          other: other,
          source: "线上推广2",
          platform: 2,
        };
        op = normal;
      }

      trend_put(op).then((res) => {
        if (res.data.code == 200) {
          that.warning = "领取成功";
          that.warningbtn = true;
          setTimeout(() => {
            that.warningbtn = false;
            that.shouping = false;
            if (that.building.name.indexOf("恒大") !== -1) {
              that.ishengda = true;
              $('.m-chang').show()
            }
          }, 1500);
        } else if (resp.data.code == 500) {
          this.tsmsg = "请不要重复报名";
          this.tstype = true;
          setTimeout(() => {
            that.tstype = false;
          }, 1000);
        }
      });
    },
    xiang(id) {
      this.position = id;
      $(".m-chang").show();
      this.change = true;
      this.ones = 1;
      $(".weiter .t-top h6").html("抢优惠券");
      $(".weiter .t-top p").html("专享限时优惠折扣，允家专场推出，早抢早优惠");
      $("#dingxue").html("立即抢券");
    },
    xiangs(id) {
      this.position = id;
      $(".m-chang").show();
      this.change = true;
      this.ones = 1;
      $(".weiter .t-top h6").html("参团优惠");
      $(".weiter .t-top p").html(
        "领取团购限时优惠券！优惠编码将与您手机号绑定"
      );
      $("#dingxue").html("立即抢券");
    },
    method1: function () {
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
      if (url && url.indexOf("kid") !== -1) {
        url = url.split("&");
        let kid = url[0].split("=")[1];
        let other = url[1].split("=")[1];
        if (sessionStorage.getItem("kid")) {
        } else {
          sessionStorage.setItem("kid", kid);
          sessionStorage.setItem("other", other);
          $cookies.set("kid", kid);
          $cookies.set("other", other);
          window.location.reload();
        }
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
      let ip = ip_arr["ip"];
      // let ip = returnCitySN["cip"];
      $cookies.set("ip", ip);
      // this.ip = ip;
      let collect = this.collect;
      localStorage.setItem(id, collect);
      if (collect == 0) {
        this.forknum = 0;
        // $("#fork").show();
        // $(".m-fork").show();
        // $(".fed").hide();
        // $("#forked").hide();
      } else if (collect == 1) {
        this.forknum = 1;
        // $("#fork").hide();
        // $("#forked").show();
        // $(".m-fork").hide();
        // $(".fed").show();
        // $("#forked").css("display", "block");
      }
    },
    top() {
      /*头部轮播*/
      // var swiper = new Swiper(".swiper-top", {
      //   // eslint-disable-line no-unused-vars
      //   spaceBetween: 0,
      //   pagination: {
      //     el: "#swiper-pagination1",
      //     clickable: true
      //   }
      // });
    },
    drawline() {
      // 初始化图表标签
      var myChart = this.$echarts.init(document.getElementById("chart"));
      let that = this;
      var options = {
        //定义一个标题
        legend: {
          data: ["AI"],
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
                fontSize: "10px",
              },
            },
            axisLabel: {
              interval: 0,
              show: true,
              textStyle: {
                color: "rgba(153,153,153,1)", //这里用参数代替了
              },
            },
          },
        ],
        yAxis: [
          {
            name: "单位：万",
            scale: true,
            axisLabel: {
              show: true,
              textStyle: {
                color: "rgba(153,153,153,1)", //这里用参数代替了
              },
            },
            axisLine: {
              lineStyle: {
                color: "rgba(153,153,153,1)",
              },
            },
          },
        ],
        series: [
          {
            name: "销量",
            data: that.prices,
            type: "bar",
            barWidth: 18,
          },
        ],
      };
      myChart.setOption(options);
    },
    priceline() {
      // 房价趋势
      var chart = this.$echarts.init(document.getElementById("pic"));
      let that = this;
      var option = {
        color: ["rgba(77,181,255,1)"],
        backgroundColor: "#fff",
        tooltip: {
          trigger: "axis",
          formatter: function (params) {
            return (
              params[0].seriesName +
              params[0].data +
              "元" +
              "<br>" +
              params[1].seriesName +
              params[1].data +
              "元" +
              "<br>" +
              params[2].seriesName +
              params[2].data +
              "元"
            );
          },
        },
        legend: {
          data: "房价",
        },
        grid: {
          x: "45px",
          y: "10px",
          x2: "18px",
          y2: "20px",
        },
        calculable: true,
        xAxis: [
          {
            axisLabel: {
              rotate: 30,
              interval: 0,
            },
            axisLine: {
              lineStyle: {
                color: "#919499",
              },
            },

            boundaryGap: false,
            data: (function () {
              var list = that.trend_time;
              return list;
            })(),
            axisLabel: {
              rotate: 0,
            },
          },
        ],
        yAxis: [
          {
            name: "单位：万",
            type: "value",
            scale: true,
            // max: that.max,
            min: 0,
            splitNumber: 5,
            axisLine: {
              lineStyle: {
                color: "#919499",
              },
              show: false,
              formatter: "{value}万",
            },
            splitLine: {
              shwo: true,
              lineStyle: {
                type: "dashed",
              },
            },
          },
        ],
        series: [
          {
            name: that.building.name + "&nbsp;&nbsp;均价",
            type: "line",
            symbol: "none",
            smooth: 0.2,
            color: ["#40A2F4"],
            data: that.trend_price3,
          },
          {
            name: that.building.country_name + "&nbsp;&nbsp;均价",
            type: "line",
            symbol: "none",
            smooth: 0.2,
            color: ["#29CC72"],
            data: that.trend_price2,
          },
          {
            name: that.building.city_name + "&nbsp;&nbsp;均价",
            type: "line",
            symbol: "none",
            smooth: 0.2,
            color: ["#A3AACC"],
            data: that.trend_price1,
          },
        ],
      };
      chart.setOption(option);
    },
    mmap() {
      this.over = false;
      let name = this.mapname;
      let that = this;
      let baidu = [that.ln, that.la];
      let img = require("~/assets/mappro.png");
      let pro = this.building.name;
      let add = this.building.address;
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
              let img = that.mapimg;
              if (JSON.stringify(result) == "{}") {
                that.isnull = true;
                that.setzhou(name, 0);
              } else {
                that.isnull = false;
                that.setzhou(name, result.poiList.pois.length);
                $.each(result.poiList.pois, function (i, e) {
                  if (i <= 2) {
                    var p2 = [e.location.lng, e.location.lat];
                    var s = AMap.GeometryUtil.distance(cpoint, p2) / 1000;
                    s = s.toFixed(1);
                    ht += `
                    <li>
                      <h5>${e.name}</h5>
                      <p>${e.address} <span><img src="${img}">${s}km</span></p>
                    </li>
                    `;
                  }
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
    again() {
      let tel = this.baoming;
      let ip = ip_arr["ip"];
      // let ip = returnCitySN["cip"];
      let id = this.id;
      let data = { channel: 2, phone: tel, ip: ip };
      msg(data)
        .then((resp) => {
          let code = resp.data.code;
          if (code == 200) {
            let city = localStorage.getItem("city");
            if (!city) {
              city = 1;
              localStorage.setItem("city", 1);
            }
            var time = 60;
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
          }
        })
        .catch((error) => {
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
        .then((resp) => {
          if (resp.data.code == 200) {
            if (that.forknum == 0) {
              that.forknum = 1;
              $("#forked").css("display", "block");
            } else {
              that.forknum = 0;
            }
          } else {
            that.$router.push("/" + that.n + "/login");
          }
        })
        .then((error) => {
          console.log(error);
        });
    },
    sendmsg(t) {
      let that = this;
      // let ip = this.ip;
      // let ip = this.$store.state.cookie.ip;
      let ip = ip_arr["ip"];
      let tel = that.baoming;
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
        page: 3,
        type: 9,
        project: id,
        kid: kid,
        other: other,
        platform: 2,
      };
      let tuan = {
        platform: 2,
        city: c,
        ip: ip,
        tel: tel,
        position: po,
        page: 3,
        project: id,
        remark: "团购2",
        kid: kid,
        other: other,
      };
      let options = {};
      let url = window.location.href;
      url = url.split("?")[1];
      if (url && url.indexOf("scid") !== -1) {
        let wx = {
          platform: 2,
          city: c,
          ip: ip,
          tel: tel,
          position: po,
          page: 3,
          project: id,
          source: "微信分享2",
          kid: kid,
          staff_id: that.share.staff.sid,
          other: other,
        };
        options = wx;
      } else {
        if (this.ones == 1) {
          options = tuan;
        } else {
          options = normal;
        }
      }

      trend_put(options)
        .then((resp) => {
          // console.log(resp)
          if (resp.data.code == 200) {
            msg({ phone: t, channel: 2, ip: ip })
              .then((resp) => {
                if (resp.data.code == 200) {
                  $(".t-b-first").hide();
                  $(".t-b-second").show();

                  var time = 60;
                  var tels = t.substr(0, 3) + "****" + t.substr(7, 11);
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
                  $("#ytel").html(tels);
                }
              })
              .catch((error) => {
                console.log(error);
              });
          } else if (resp.data.code == 500) {
            this.tsmsg = "请不要重复报名";
            this.tstype = true;
            setTimeout(() => {
              that.tstype = false;
            }, 1000);
          } else {
            $(".l-p").val("");
            $(".l-p").attr("placeholder", "报名失败");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    check() {
      let m = this.ma;
      if (!m) {
        this.tishi("验证码不能为空");
        return;
      }
      let tel = this.baoming;
      let that = this;
      verification({ phone: tel, code: m, channel: 2 })
        .then((resp) => {
          if (resp.data.code == 200) {
            if (this.ones == 1) {
              this.li = 1;
              if (this.li == 1) {
                this.newimg = true;
              }
            }
            $("#o_p").text("已成功订购服务，我们会第一时间通过电话联系您");
            if (that.building.name.indexOf("恒大") !== -1) {
              that.ishengda = true;
            } else{
              that.succ = true;
            }
              that.change = false;
            
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
      let tel = this.baoming
      let that = this
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
              that.guanbi()
            }, 1000);
          }
        });
      }
    },
    pk(e) {
      let id = e.target.getAttribute("data-v");
      let ids = id + "," + this.id;
      this.ids = ids;
    },
    pkhref(num) {
      let ids = num + "," + this.id;
      this.ids = ids;
      let id = this.id;
      if (ids) {
        this.$router.push("/" + this.n + "/pkdetail/" + ids + "/" + id);
      } else {
        this.warn = true;
        let that = this;
        setTimeout(function () {
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
        .then((resp) => {
          if (resp.data.code == 200) {
            $(".fk").hide();
            $(".fed").css("display", "block");
          }
        })
        .then((error) => {
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
      if (this.isagree) {
        this.isagree = false;
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
          type: y,
        })
          .then((resp) => {
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
              that.isagree = true;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    agrees(e) {
      if (this.isagrees) {
        this.isagrees = false;
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
          type: y,
        })
          .then((resp) => {
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
              that.isagrees = true;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    gobanner() {
      let url = window.location.href;
      url = url.split("?")[1];
      if (url) {
        window.location.href = this.banner.url + "?" + url;
      } else {
        window.location.href = this.banner.url;
      }
    },
    del(e) {
      let id = e.target.getAttribute("data-v");
      if (!localStorage.getItem("token")) {
        this.$router.push("/" + that.n + "/login");
        // window.location.href = "/login";
      } else {
        let token = localStorage.getItem("token");
        comment_del({ token: token, id: id })
          .then((resp) => {
            if (resp.data.code == 200) {
              location.reload();
            }
          })
          .catch((error) => {
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
      if (window.history.length >= 1) {
        this.$router.go(-1);
        return false;
      } else {
        // console.log($cookies.get('old'))
        if ($cookies.get("old")) {
          this.$router.push($cookies.get("old"));
        } else {
          this.$router.push("/" + this.jkl + "/search");
        }
      }
    },
    ready() {
      let ip = ip_arr["ip"];
      // let ip = returnCitySN["cip"];
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
    chan(id) {
      this.$router.push(`/${this.jkl}/questions/${id}`);
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
            var timer = setInterval(function () {
              window.scrollBy(0, -10);
              if (window.scrollY <= 100) {
                clearInterval(timer);
              }
            }, 0.01);
          } else {
            var timer = setInterval(function () {
              window.scrollBy(0, 10);
              if (window.scrollY >= 100) {
                clearInterval(timer);
              }
            }, 1);
          }
        } else if (key == 1) {
          if (Y > 1100) {
            var timer = setInterval(function () {
              window.scrollBy(0, -10);
              if (window.scrollY <= 1100) {
                clearInterval(timer);
              }
            }, 0.01);
          } else {
            var timer = setInterval(function () {
              window.scrollBy(0, 10);
              if (window.scrollY >= 1100) {
                clearInterval(timer);
              }
            }, 1);
          }
        } else if (key == 2) {
          if (Y > 2700) {
            var timer = setInterval(function () {
              window.scrollBy(0, -10);
              if (window.scrollY <= 2700) {
                clearInterval(timer);
              }
            }, 0.01);
          } else {
            var timer = setInterval(function () {
              window.scrollBy(0, 10);
              if (window.scrollY >= 2700) {
                clearInterval(timer);
              }
            }, 1);
          }
        } else if (key == 3) {
          if (Y > 3200) {
            var timer = setInterval(function () {
              window.scrollBy(0, -10);
              if (window.scrollY <= 3200) {
                clearInterval(timer);
              }
            }, 0.01);
          } else {
            var timer = setInterval(function () {
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
      let check = this.checks;
      if (!check) {
        this.tishi("请勾选用户协议");
        return;
      }

      let phone = this.baoming;
      var pattern_phone = /^1[3-9][0-9]{9}$/;
      if (phone == "") {
        this.tishi("手机号不能为空");
        return;
      } else if (!pattern_phone.test(phone)) {
        this.tishi("请输入正确手机号");
        return;
      }
      if (this.open == 1) {
        this.tu = true;
      } else {
        this.sendmsg(phone);
      }
    },
    tishi(msg) {
      $(".tishi").html(msg);
      $(".tishi").show();
      setTimeout(() => {
        $(".tishi").hide();
      }, 1500);
    },
    guanbi() {
      this.ones = 0;
      this.change = false;
      $(".m-chang").hide();
      $(".t-b-first").show();
      $(".t-b-second").hide();
      this.succ = false;
      this.tu = false;
      this.ishengda=false
    },
    // 倒计时
    countTime() {
      // 获取当前时间
      let date = new Date();
      let now = date.getTime();
      // 设置截止时间
      let endDate = new Date(this.group_buy.endline.replace(/-/g, "/")); // this.curStartTime需要倒计时的日期
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
    },
    onSuccess() {
      var phone = this.baoming;
      this.sendmsg(phone);
      this.tu = false;
    },
    onFail() {
      this.msg = "";
    },
    onRefresh() {
      this.msg = "";
    },
    lingbtn(e) {
      this.ling = false;
      $(".ling-ssd").css({ whiteSpace: "inherit", height: "auto" });
      e.target.style.display = "none";
    },
    setmap(id, name) {
      this.mapnum = id;
      this.mapname = name;
      this.mmap();
    },
    gocomment() {
      if (localStorage.getItem("token")) {
        this.$router.push("/" + this.jkl + "/comment/" + this.id);
      } else {
        sessionStorage.setItem("comment", `/${this.jkl}/comment/${this.id}`);
        this.$router.push("/" + this.jkl + "/login");
      }
    },
    createwebsocket() {
      try {
        if ("WebSocket" in window) {
          this.ws = new ReconnectingWebSocket("ws://39.98.227.114:9501");
        } else if ("MozWebSocket" in window) {
          this.ws = new ReconnectingWebSocket("ws://39.98.227.114:9501");
        }
        this.init();
      } catch (e) {
        console.log(e);
      }
    },
    init() {
      let that = this;
      this.ws.onopen = function (event) {
        let options = {
          //要发送的数据
          class: "Info",
          action: "project",
          content: {
            token: localStorage.getItem("wstoken"),
            Id: that.building.id,
          },
        };
        that.ws.send(JSON.stringify(options));
      };
      this.ws.onmessage = function (event) {
        if (event.data != "connect success") {
          let data = JSON.parse(event.data);
          if (data.code != 500) {
            if (data.action == "talk") {
              that.wsshow = true;
              that.wsnum = Number(that.wsnum) + 1;
              sessionStorage.setItem(that.building.id, data.content.id);
              let name = "小" + data.content.username.substr(0, 1);
              sessionStorage.setItem("staffname", name);
              if (that.sids.indexOf(data.content.id) != -1) {
                var transaction = that.db.transaction("staffmsg", "readwrite");
                var store = transaction.objectStore("staffmsg");
                var index = store.index("sid");
                var search = index.get(data.content.id);
                var myDate = new Date();
                let time = myDate.toLocaleTimeString();
                let timenum = Date.parse(new Date());
                search.onsuccess = function (e) {
                  let result = e.target.result;
                  if (result) {
                    result.txt = data.content.content;
                    result.time = time;
                    result.num = timenum;
                    result.type = 1;
                    store.put(result);
                  }
                };

                var indexedDB =
                  window.indexedDB ||
                  window.webkitIndexedDB ||
                  window.mozIndexedDB ||
                  window.msIndexedDB;
                var db;
                if (!indexedDB) {
                  alert("不支持");
                }
                let img = data.content.avatar;
                img = decodeURIComponent(img);
                let request = indexedDB.open("staff" + data.content.id, 2);
                request.onsuccess = function (e) {
                  db = request.result;
                  let transaction = db.transaction(
                    "staff" + data.content.id,
                    "readwrite"
                  );
                  let msg = data.content.content;
                  if (msg.split("face").length !== 0) {
                    let index = msg.indexOf("face");
                    while (index != -1) {
                      var reg = /face\[[\u4e00-\u9fa5_a-zA-Z]+\]/s;
                      var match = msg.match(reg);
                      if (match) {
                        var title = match[0].replace("face", "");
                      }
                      for (let val in that.faces) {
                        if (that.faces[val].con == title) {
                          let img = require(`~/assets/${val}.gif`);
                          let h = `<img src="${img}">`;
                          msg = msg.replace(`face${title}`, h);
                        }
                      }
                      index = msg.indexOf("face", index + 4);
                    }
                  }
                  let store = transaction.objectStore(
                    "staff" + data.content.id
                  );
                  sessionStorage.setItem("lastone", msg);
                  let addPersonRequest = store.add({
                    className: "worker",
                    con: msg,
                    img: img,
                    name1: "worker-left",
                    name2: "worker-right",
                  });
                };
              } else {
                var transaction = that.db.transaction("staffmsg", "readwrite");
                var store = transaction.objectStore("staffmsg");
                let img = data.content.avatar;
                img = decodeURIComponent(img);
                var myDate = new Date();
                let time = myDate.toLocaleTimeString();
                let timenum = Date.parse(new Date());
                let staff = {};
                staff.name = "小" + data.content.username.substr(0, 1);
                staff.sid = data.content.id;
                staff.img = img;
                staff.time = time;
                staff.buildname = sessionStorage.getItem("buildname");
                staff.projectid = sessionStorage.getItem("projectid");
                staff.txt = data.content.content;
                staff.type = 1;
                staff.num = timenum;
                let otheradd = store.add(staff);
                otheradd.onsuccess = function () {
                  var index =
                    window.indexedDB ||
                    window.webkitIndexedDB ||
                    window.mozIndexedDB ||
                    window.msIndexedDB;
                  let req = index.open("staff" + data.content.id, 2);
                  req.onupgradeneeded = function (e) {
                    let db = e.target.result;
                    if (
                      !db.objectStoreNames.contains("staff" + data.content.id)
                    ) {
                      let objectStore = db.createObjectStore(
                        "staff" + data.content.id,
                        {
                          keyPath: "id",
                          autoIncrement: true,
                        }
                      );
                      objectStore.createIndex("classname", "classname", {
                        unique: true,
                      });
                      objectStore.createIndex("con", "con", {
                        unique: false,
                      });
                      objectStore.createIndex("img", "img", {
                        unique: false,
                      });
                      objectStore.createIndex("name1", "name1", {
                        unique: false,
                      });
                      objectStore.createIndex("name2", "name2", {
                        unique: false,
                      });
                    }
                  };
                  req.onsuccess = function (e) {
                    let db = req.result;
                    let tran = db.transaction(
                      "staff" + data.content.id,
                      "readwrite"
                    );
                    let store = tran.objectStore("staff" + data.content.id);

                    let addPersonRequest = store.add({
                      className: "worker",
                      con: data.content.content,
                      img: img,
                      name1: "worker-left",
                      name2: "worker-right",
                    });
                    addPersonRequest.onsuccess = function () {
                      that.wsstart();
                    };
                  };
                };
              }
            }
          }
        }
      };
    },
    send(msg) {
      let token = localStorage.getItem("wstoken");
      let sid = sessionStorage.getItem(sessionStorage.getItem("projectid"))
        ? sessionStorage.getItem("sid")
        : 0;
      let id = sessionStorage.getItem("projectid");
      let actions = {
        //要发送的数据
        class: "Chat",
        action: "send",
        content: { staff_id: sid, msg: msg, token: token, project: id },
      };
      sessionStorage.setItem("lastone", msg);
      let dd = JSON.stringify(actions);
      this.ws.send(dd);
    },
    getpro(id) {
      let options = {
        //要发送的数据
        class: "Info",
        action: "project",
        content: {
          token: localStorage.getItem("wstoken"),
          Id: id,
        },
      };
      this.ws.send(JSON.stringify(options));
    },
    wsstart() {
      let that = this;
      for (let val in that.faces) {
        that.faces[val] = {
          img: require(`~/assets/${val}.gif`),
          con: that.faces[val],
        };
      }
      this.sids = [];

      var indexedDB =
        window.indexedDB ||
        window.webkitIndexedDB ||
        window.mozIndexedDB ||
        window.msIndexedDB;
      var db;
      if (!indexedDB) {
        alert("不支持");
      }
      let request = indexedDB.open("staffmsg", 2);
      request.onupgradeneeded = function (e) {
        db = e.target.result;
        if (!db.objectStoreNames.contains("staffmsg")) {
          var objectStore = db.createObjectStore("staffmsg", {
            keyPath: "id",
            autoIncrement: true,
          });
          objectStore.createIndex("sid", "sid", {
            unique: true,
          });
          objectStore.createIndex("con", "con", {
            unique: false,
          });
          objectStore.createIndex("img", "img", {
            unique: false,
          });
          objectStore.createIndex("name", "name", {
            unique: false,
          });
          objectStore.createIndex("time", "time", {
            unique: false,
          });
          objectStore.createIndex("buildname", "buildname", {
            unique: false,
          });
        }
      };
      request.onsuccess = function (e) {
        db = request.result;
        that.db = request.result;
        var transaction = db.transaction("staffmsg", "readwrite");
        var store = transaction.objectStore("staffmsg");
        // 取出所有数据
        var all = store.getAll();
        all.onsuccess = function () {
          that.cons = all.result;
          for (let val of that.cons) {
            that.sids.push(val.sid);
          }
        };
      };
      request.onerror = function (e) {
        console.log("false");
      };
    },
    get() {
      let that = this;
      let url = encodeURIComponent(window.location.href);
      const jsApiList = [
        "onMenuShareAppMessage",
        "onMenuShareTimeline",
        "onMenuShareQQ",
        "onMenuShareWeibo",
        "updateAppMessageShareData",
        "updateTimelineShareData",
        "getLocation",
      ];

      getsdk(url).then((res) => {
        // console.log(res);
        let that = this;
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.data.data.appId, // 必填，公众号的唯一标识
          timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
          signature: res.data.data.signature, // 必填，签名
          jsApiList: jsApiList, // 必填，需要使用的JS接口列表
        });
        wx.ready(function () {
          if (that.iswxsid) {
            if (wx.onMenuShareAppMessage) {
              wx.onMenuShareAppMessage({
                title: that.share.config.title, // 分享标题
                desc: that.share.config.description, // 分享描述
                link: window.location.href, // 分享链接
                imgUrl: that.share.config.img, // 分享图标
                type: "", // 分享类型,music、video或link，不填默认为link
                dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                  // 用户确认分享后执行的回调函数
                  // alert('1.01')
                },
                cancel: function () {
                  // 用户取消分享后执行的回调函数
                },
              });
              wx.onMenuShareTimeline({
                title: that.share.config.title, // 分享标题
                link: window.location.href, // 分享链接
                imgUrl: that.share.config.img, // 分享图标
                success: function () {
                  // 用户点击了分享后执行的回调函数
                },
              });
            } else {
              wx.updateAppMessageShareData({
                title: that.share.config.title, // 分享标题
                desc: that.share.config.description, // 分享描述
                link: window.location.href, // 分享链接
                imgUrl: that.share.config.img, // 分享图标
                success: function () {
                  // 设置成功
                  // alert('1.40')
                },
              });
              wx.updateTimelineShareData({
                title: that.share.config.title, // 分享标题
                link: window.location.href, // 分享链接
                imgUrl: that.share.config.img, // 分享图标
                success: function () {
                  // 设置成功
                },
              });
            }
            if (that.iswxsid) {
              wx.getLocation({
                type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                  that.wxlat = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                  that.wxlng = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                  let url = window.location.href;
                  url = url.split("?")[1];
                  url = url.split("&")[1];
                  if (url) {
                    let id = url.split("=")[1];
                    putmap({
                      lat: res.latitude,
                      long: res.longitude,
                      id: id,
                    }).then((res) => {
                      console.log(res);
                    });
                  }
                },
              });
            }
          } else {
            if (wx.onMenuShareAppMessage) {
              wx.onMenuShareAppMessage({
                title: that.title, // 分享标题
                desc: that.keywords, // 分享描述
                link: window.location.href, // 分享链接
                imgUrl: that.building.img, // 分享图标
                type: "", // 分享类型,music、video或link，不填默认为link
                dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                  // 用户确认分享后执行的回调函数
                  // alert('1.01')
                },
                cancel: function () {
                  // 用户取消分享后执行的回调函数
                },
              });
            } else {
              wx.updateAppMessageShareData({
                title: that.title, // 分享标题
                desc: that.keywords, // 分享描述
                link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: that.building.img, // 分享图标
                success: function () {
                  // 设置成功
                  // alert('1.40')
                },
              });
              wx.updateTimelineShareData({
                title: that.title, // 分享标题
                link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: that.building.img, // 分享图标
                success: function () {
                  // 设置成功
                },
              });
            }
          }
        });
        wx.error((res) => {
          // alert(res);
        });
      });
    },
    goshare() {
      let that = this;
      let sid = sessionStorage.getItem("wxstaff");
      window.location.href = `http://ll.edefang.net/front/share/config?staff=${sid}&project=${that.building.id}`;
    },
    settime() {
      var now = new Date(); //当前日期
      var nowDayOfWeek = now.getDay(); //今天本周的第几天
      var nowDay = now.getDate(); //当前日
      var nowMonth = now.getMonth(); //当前月
      var nowYear = now.getYear(); //当前年
      nowYear += nowYear < 2000 ? 1900 : 0; //
      let weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
      this.starttime = this.formatDate(weekStartDate);
      let weekEndDate = new Date(
        nowYear,
        nowMonth,
        nowDay + (6 - nowDayOfWeek)
      );
      this.endtime = this.formatDate(weekEndDate);
      // console.log(this.starttime, this.endtime);
    },
    formatDate(date) {
      var myyear = date.getFullYear();
      var mymonth = date.getMonth() + 1;
      var myweekday = date.getDate();
      if (mymonth < 10) {
        mymonth = "0" + mymonth;
      }
      if (myweekday < 10) {
        myweekday = "0" + myweekday;
      }
      return myyear + "-" + mymonth + "-" + myweekday;
    },
  },
  beforeMount() {
    let ul = window.location.href;
    ul = ul.split("?")[1];
    if (this.$route.params.name != this.jkl) {
      this.$router.push(
        "/" + this.jkl + "/content/" + this.$route.params.id + "?" + ul
      );
    }
    let that = this;
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      let url = window.location.href;
      url = url.split("?")[1];
      if (url && url.indexOf("scid") !== -1) {
        let sid = this.$route.query.scid;

        $cookies.set("scid", sid);
        that.iswx = false;
        that.iswxsid = true;
        if (!sessionStorage.getItem("wxscid")) {
          window.location.href = `http://ll.edefang.net/front/user/getcode_front?scid=${sid}`;
          sessionStorage.setItem("wxscid", sid);
        }
      } else {
        if (localStorage.getItem("gowx")) {
          if (url && url.indexOf("staff_id") !== -1) {
            let sid = url.split("=")[1];
            sessionStorage.setItem("wxstaff", sid);
            if (sid) {
              that.iswx = true;
            }
          } else if (url && url.indexOf("scid") !== -1) {
            let sid = url.split("=")[1];
            sessionStorage.setItem("wxscid", sid);
            $cookies.set("scid", sid);
            if (!sessionStorage.getItem("wxscid")) {
              window.location.href = `http://ll.edefang.net/front/user/getcode_front?scid=${sid}&${ul}`;
            } else {
              that.iswx = false;
              that.iswxsid = true;
              sessionStorage.setItem(
                "wxurl",
                window.location.href.split("?")[1]
              );
              sessionStorage.setItem(that.building.id, that.share.staff.sid);
              sessionStorage.setItem("staffname", that.share.staff.name);
              sessionStorage.setItem(
                "staff" + that.share.staff.sid,
                that.share.staff.head_img
              );
            }
          } else {
            window.location.href = `http://ll.edefang.net/front/user/getcode_transfer?silent=0&id=${that.building.id}`;
          }
        } else {
          localStorage.setItem("gowx", 1);
          window.location.href = `http://ll.edefang.net/front/user/getcode_transfer?silent=0&id=${that.building.id}&${ul}`;
        }
      }
    }
  },
  mounted() {
    $cookies.set("cityname", this.building.city_fullname);
    $cookies.set("uuid", this.uuid);
    localStorage.setItem("uuid", this.uuid);
    localStorage.setItem("call", this.call);
    if (this.call.split(",")[1]) {
      this.callmsg = this.call.split(",")[0] + "转" + this.call.split(",")[1];
    } else {
      this.callmsg = this.call;
    }
    this.settime();
    this.$nextTick(() => {
      if (sessionStorage.getItem("comment")) {
        setTimeout(() => {
          $("body,html").animate(
            { scrollTop: $("#dianping").offset().top },
            500
          );
          sessionStorage.removeItem("comment");
        }, 500);
      }
    });
    let that = this;
    sessionStorage.setItem("ip", ip_arr["ip"]);
    $cookies.set("ip", ip_arr["ip"]);
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      this.get();
      // console.log(this.share);
      if (Object.keys(that.share).length !== 0) {
        let ci = that.share.visitors;
        if (ci) {
          for (let val of ci) {
            let time = new Date(val.read_time).getTime();
            let now = new Date().getTime();
            let min = Math.floor(((now - time) / 1000 / 60) % 60);
            val.min = min;
          }
        }
      } else {
        that.share = {
          staff: {
            tel: 123,
            name: "456",
            head_img: require("~/assets/jiapeo.png"),
          },
          visitors: [],
        };
      }
    }

    this.wsstart();
    this.createwebsocket();
    setTimeout(() => {
      if (!sessionStorage.getItem("ws" + this.building.id)) {
        this.wsshow = true;
      }
    }, 7000);

    $cookies.set("name", this.building.name);
    $cookies.set("address", this.building.address);
    this.staffname = sessionStorage.getItem("staffname");
    if (!sessionStorage.getItem(that.building.id + "kk")) {
      setTimeout(() => {
        sessionStorage.setItem(that.building.id + "kk", 1);
        that.shouping = true;
      }, 2000);
      setTimeout(() => {
        if (this.sp) {
          that.shouping = false;
        }
      }, 20000);
    }

    $(".huo-more").on("click", function () {
      $(this).hide();
      $(".table").css("height", "auto");
    });
    var swiper08 = new Swiper(".swiper-map", {
      slidesPerView: 4.8,
      spaceBetween: 10,
      observer: true,
      slidesOffsetAfter: 12,
      resistanceRatio: 0.1,
      slidesOffsetBefore: 14,
    });
    var swiper05 = new Swiper(".swiper-dynamic", {
      slidesPerView: 3.8,
      spaceBetween: 0,
      observer: true,
      slidesOffsetBefore: 20,
      resistanceRatio: 0.1,
      slidesOffsetAfter: -10,
    });
    var swiper06 = new Swiper(".swiper-house", {
      slidesPerView: 2.08,
      spaceBetween: 10,
      observer: true,
      slidesOffsetAfter: 2,
      resistanceRatio: 0.1,
      slidesOffsetBefore: 14,
    });
    var swiper07 = new Swiper(".swiper-pk", {
      slidesPerView: 2.4,
      spaceBetween: 10,
      observer: true,
      resistanceRatio: 0.1,
      slidesOffsetAfter: 1,
      slidesOffsetBefore: 14,
    });
    if (navigator.cookieEnabled != true) {
      this.load = false;
      this.iscookie = true;
    }
    this.newimg = localStorage.getItem("newimg");
    if (this.tuan == 1) {
      this.countTime();
    }
    this.tel = localStorage.getItem("tel");
    let h = document.body.clientHeight;

    $("#Foot").css({
      position: "relative",
      bottom: "0",
      width: "100%",
      marginBottom: "56px",
    });
    that.baoming = localStorage.getItem("phone");
    let id = this.$route.params.id;
    localStorage.setItem("projectid", id);
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

    $(".go-map").on("click", function () {
      that.$router.push("/" + that.n + "/Periphery/" + that.id + "/1");
    });
    //同价位楼盘
    $(".m-nav p").on("click", function () {
      let txt = $(this).text();
      $(this).addClass("n-active").siblings("p").removeClass("n-active");
    });
    jQuery.fn.ratingStars = function (e) {
      var r = {
          selectors: {
            starsSelector: ".rating-stars",
            starSelector: ".rating-star",
            starActiveClass: "is--active",
            starHoverClass: "is--hover",
            starNoHoverClass: "is--no-hover",
            targetFormElementSelector: ".rating-value",
          },
        },
        t = $.extend({}, r, e),
        s = {
          init: function (e) {
            s.registerEvents(e), s.loadDefaultValue(e);
          },
          loadDefaultValue: function (e) {
            var r = $(e).children(t.selectors.targetFormElementSelector).val(),
              s = 0;
            $.each(
              $(e).children(t.starsSelector).children(t.starSelector),
              function (e, a) {
                s <= r - 1 && $(a).addClass(t.selectors.starActiveClass), s++;
              }
            );
          },
          registerEvents: function (e) {
            var r = this;
            $.each(
              $(e).children(t.starsSelector).children(t.starSelector),
              function (t, s) {
                $(s).on("mouseenter", $.proxy(r.onStarEnter, r, s, e)),
                  $(s).on("mouseleave", $.proxy(r.onStarLeave, r, s, e)),
                  $(s).on(
                    "click touchstart",
                    $.proxy(r.onStarSelected, r, s, e)
                  );
              }
            );
          },
          onStarEnter: function (e, r) {
            var s = $(e).index(),
              a = 0;
            $.each(
              $(r).children(t.starsSelector).children(t.starSelector),
              function (e, r) {
                a <= s
                  ? $(r).addClass(t.selectors.starHoverClass)
                  : $(r).addClass(t.selectors.starNoHoverClass),
                  a++;
              }
            ),
              $(r).trigger("ratingOnEnter", { ratingValue: s + 1 });
          },
          onStarLeave: function (e, r) {
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
          onStarSelected: function (e, r) {
            var s = $(e).index();
            $(r)
              .children(t.starsSelector)
              .children(t.starSelector)
              .removeClass(t.selectors.starActiveClass);
            var a = 0;
            $.each(
              $(r).children(t.starsSelector).children(t.starSelector),
              function (e, r) {
                a <= s && $(r).addClass(t.selectors.starActiveClass), a++;
              }
            ),
              $(r)
                .children(t.selectors.targetFormElementSelector)
                .val(s + 1),
              $(r).trigger("ratingChanged", { ratingValue: s + 1 });
          },
        };
      return this.each(function () {
        s.init($(this));
      });
    };
    $(".question").on("click", function () {
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
      observeParents: true, //修改swiper的父元素时，自动初始化swiper
    });
    /*对比分析资料轮播*/
    var swiper = new Swiper(".dui-zi", {
      // eslint-disable-line no-unused-vars
      spaceBetween: 20,
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true, //修改swiper的父元素时，自动初始化swiper
      resistanceRatio: 0.1,
      pagination: {
        el: ".swiper-pagination2",
      },
    });
    /*微信浏览记录轮播*/
    this.$nextTick(function () {
      var swiper = new Swiper(".wxlu", {
        // eslint-disable-line no-unused-vars
        spaceBetween: 20,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        resistanceRatio: 0.1,
        loop: true,
        autoplay: true,
      });
    });

    /*推荐楼盘轮播*/
    var swiper = new Swiper(".swiper-box", {
      // eslint-disable-line no-unused-vars
      slidesPerView: 1.8,
      spaceBetween: 30,
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true, //修改swiper的父元素时，自动初始化swiper
    });

    var swiper = new Swiper(".swiper-top", {
      loop: true, // 循环模式选项
      slidesPerView: "auto",
      spaceBetween: 0,
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true, //修改swiper的父元素时，自动初始化swiper
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      resistanceRatio: 0.1,
    });

    $(document).ready(function () {
      var h = $(".h-c-c").height();
      $(".h-c-i img").css("height", h + "px");

      var cnm = 1;

      $(".p-c-exc").on("click", function () {
        $(".m-p-succ").hide();
        $(".m-chang").hide();
      });
      $("#m_sc_esc").on("click", function () {
        $("#m_sc_box").hide();
        $(".m-chang").hide();
      });
      $(".m-c-content input").focus(function () {
        $(".m-c-content").css("margin-top", "80px");
      });
      $(".m-c-content input").blur(function () {
        $(".m-c-content").css("margin-top", "170px");
      });
      // 验证码
      $(".m-c-btn").on("click", function () {
        var tel = $(this).prev().prev().prev().prev().prev().prev().val();
        var pattern_tel = /^1[3-9][0-9]{9}$/;
        if (tel == "") {
          $(this).prev().prev().prev().prev().prev().prev().val("");
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
          $(this).prev().prev().prev().prev().prev().prev().val("");
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

      $(".tophome").on("click", function () {
        that.$router.push("/" + that.n);
      });

      $(".m-listen").on("click", function () {
        $(".m-chang").show();
        $("#m_a_box").show(300);
      });
      $("#m_a_esc").on("click", function () {
        $(".m-chang").hide();
        $("#m_a_box").hide();
      });

      $("#m_want").on("click", function () {
        $(".m-chang").show();
        $("#m_sc_box").show(150);
      });

      $("#m_look").on("click", function () {
        $(".m-chang").show();
        $("#m_y_box").show(300);
      });
      $("#m_fen").on("click", function () {
        $(".m-chang").show();
        $("#m_f_box").show(300);
      });
      $(".m-y").on("click", function () {
        $(".m-chang").show();
        $("#m_y_box").show(300);
      });
      $("#m_f_esc").on("click", function () {
        $(".m-chang").hide();
        $("#m_f_box").hide();
      });
    });

    // 点击顶部图片跳转
    $(".zao").on("click", function () {
      that.$router.push("/" + that.n + "/album/" + that.id);
    });
    // 周边规划跳转
    $(".m-zhou h3 span").on("click", function () {
      that.$router.push("/" + that.n + "/Periphery/" + that.id + "/1");
    });

    document.addEventListener("touchmove", function (e) {
      var h = document.body.scrollTop;
      if (h >= 2279) {
        $(".m-3").addClass("m-active").siblings("span").removeClass("m-active");
      } else if (h >= 1538) {
        $(".m-2").addClass("m-active").siblings("span").removeClass("m-active");
      } else if (h >= 170) {
        $(".m-tnav").show();
        $(".m-1").addClass("m-active").siblings("span").removeClass("m-active");
      } else {
        $(".m-tnav").hide();
      }
    });

    $(".m-1").on("click", function () {
      document.body.scrollTop = 170;
      $(".m-1").addClass("m-active").siblings("span").removeClass("m-active");
    });
    $(".m-2").on("click", function () {
      document.body.scrollTop = 1538;
      $(".m-2").addClass("m-active").siblings("span").removeClass("m-active");
    });
    $(".m-3").on("click", function () {
      document.body.scrollTop = 2279;
      $(".m-3").addClass("m-active").siblings("span").removeClass("m-active");
    });
    $(".m-bian").on("click", function () {
      $("#m_c_box").show(150);
      $(".m-chang").show();
    });
    $("#m_c_esc").on("click", function () {
      $("#m_c_box").hide();
      $(".m-chang").hide();
    });
    $(".m-chang").on("click", function () {
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
      that.tu = false;
    });

    $(".p1").on("click", function () {
      window.type = $(this).attr("data-v");

      if (type == "最新变价通知") {
        that.position = 3;
        $(".weiter .t-top h6").html(type);
        $(".weiter .t-top p").html(
          "价格变动这么快？订阅楼盘变价通知，楼盘变价我们将第一时间通知您"
        );
      } else if (type == "最新开盘通知") {
        that.position = 29;
        $(".weiter .t-top h6").html(type);
        $(".weiter .t-top p").html(
          "一键订阅最新开盘通知，我们会第一时间通知,不再错过开盘时间"
        );
      } else if (type == "预约看房") {
        that.position = 5;
        $(".weiter .t-top h6").html(type);
        $(".weiter .t-top p").html(
          "提前预约看房，我们将提供免费专车接送和专业楼盘讲解"
        );
      } else if (type == "我要优惠") {
        $(".weiter .t-top h6").html("报名获取考察旅游名额");
        $(".weiter .t-top p").html("一键获取亚热带三天两夜游的名额！");
      } else if (type == "咨询服务") {
        $(".weiter .t-top h6").html(type);
        $(".weiter .t-top p").html("立即报名，专业人员为你解惑!");
      } else if (type == "订阅最新动态") {
        that.position = 10;
        $(".weiter .t-top h6").html(type);
        $(".weiter .t-top p").html(
          "订阅最新动态，楼盘最新情报抢先知道，帮您找准买房好时机"
        );
      } else if (type == "获取详细周边配套") {
        that.position = 15;
        $(".weiter .t-top h6").html("获取详细周边配套");
        $(".weiter .t-top p").html(
          "附近有学区或商业街吗？想了解更多周边配套信息？立即获取全面周边配套详解"
        );
      } else if (type == "最新预售许可证") {
        $(".weiter .t-top h6").html("了解最新预售许可证");
        $(".weiter .t-top p").html("向售楼人员咨询最新许可证");
      } else if (type == "获取最新成交价") {
        that.position = 14;
        $(".weiter .t-top h6").html("获取最新成交价");
        $(".weiter .t-top p").html(
          "获取最新成交价格，看看房友都是什么价格买的房"
        );
      } else if (type == "咨询详细户型") {
        that.position = 11;
        $(".weiter .t-top h6").html("咨询详细户型");
        $(".weiter .t-top p").html(
          "好楼盘户型是关键，咨询详细户型信息，安安心心买房"
        );
      } else if (type == "领取免费资料") {
        that.position = 13;
        $(".weiter .t-top h6").html("获取详细楼盘资料");
        $(".weiter .t-top p").html(
          "一键订阅最新详细楼盘资料，获取更多楼盘分析资料"
        );
      } else if (type == "领取免费地图") {
        that.position = 13;
        $(".weiter .t-top h6").html("领取免费地图");
        $(".weiter .t-top p").html(
          "领取电子楼盘地图，优质地段、快捷交通、一眼明了"
        );
      } else if (type == "最新房价趋势解读") {
        that.position = 11;
        $(".weiter .t-top h6").html("最新房价趋势解读");
        $(".weiter .t-top p").html("获取最近房价行情，抓住买房投资好时机");
      } else if (type == "获取高清配套图") {
        $(".weiter .t-top h6").html(type);
        $(".weiter .t-top p").html("一键领取高清图，楼盘图片清晰看！");
      } else if (type == "获取楼盘分析资料") {
        that.position = 12;
        $(".weiter .t-top h6").html("详细楼盘分析资料");
        $(".weiter .t-top p").html(
          "最新楼盘分析资料，看看房产专家对楼盘的投资分析和宜居分析解读"
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

    $(".t-b-scode").on("click", function () {
      var phone = $(this).prev().val();
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
      var fn = function () {
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
        phone: phone,
      };
    });

    $("#s_esc").on("click", function () {
      $(".succ").hide();
      $(".zhao").hide();
    });
    $(".s-btn").on("click", function () {
      $(".succ").hide();
      $(".zhao").hide();
    });
    $("#find").on("click", function () {
      $("#bname").submit();
    });

    $("#a-esc").on("click", function () {
      $(".addre").hide();
      $(".zhao").hide();
    });
    $("#l-esc").on("click", function () {
      $(".login").hide();
      $(".zhao").hide();
    });
    $(".zhao").on("click", function () {
      $(this).hide();
      $(".login").hide();
      $(".weiter").hide();
      $(".succ").hide();
      $(".addre").hide();
      $(".pings").hide();
      $("#mpanel5").hide();
      $(".ts").css("z-index", "20001");
    });
    $(".register").on("click", function () {
      $(".zhao").show();
      $(".login").show(150);
    });
    $(".m-get").on("click", function () {
      var phone = $(this).prev().prev().val();
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
      var fn = function () {
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
        phone: phone,
      };
    });

    // 验证码
    $(".m-getcode").on("click", function () {
      var tel = $(this).prev().val();

      var pattern_tel = /^1[3-9][0-9]{9}$/;
      if (tel == "") {
        $(this).prev().val("");
        $(this).prev().attr("placeholder", "手机号码不能为空");
        return;
      } else if (!pattern_tel.test(tel)) {
        $(this).prev().val("");
        $(this).prev().attr("placeholder", "手机号码不合法");
        return;
      }
      var type = $(this).next().val();
      var building_name = $(this).next().next().val();
      var data = {
        phone: tel,
        type: type,
        building_name: building_name,
      };
      $.post("{:url('home/content/port1')}", data, function (res) {}, "json");
      var time = 3;
      var fn = function () {
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

    $("#o_btn").on("click", function () {
      that.succ = false;
      $(".m-chang").hide();
    });
    $(".o-esc").on("click", function () {
      that.succ = false;
      $(".m-chang").hide();
    });

    //楼盘问答---查看全文
    var flag = true;
    $(".m-w-all").click(function () {
      if (flag == true) {
        $(this).prev().children("i").css({
          "-webkit-line-clamp": "inherit",
        });
        $(this).html("点击收起");
        flag = false;
      } else {
        $(this).prev().children("i").css({
          "-webkit-line-clamp": "3",
        });
        $(this).html("查看全文");
        flag = true;
      }
    });
    //点击按钮出现hover
    $(function () {
      function changeColor(id, class1, class2) {
        $("#" + id).on("touchstart", function () {
          $(this).attr("class", class1);
        });
        $("#" + id).on("touchend", function () {
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
    baoming(val) {
      if (val) {
        this.sp = false;
      }
    },
    times(val) {
      this.drawline();
    },
    trend_time(val) {
      this.priceline();
    },

    nowHeight: function () {
      if (this.defaultHeight != this.nowHeight) {
        $(".weiter").css("top", "100px");
      } else {
        $(".weiter").css("top", "220px");
      }
    },
    $route() {
      this.$router.go(0);
    },
  },
  updated() {
    if (this.over) {
      this.$nextTick(() => {
        this.timename = setTimeout(() => {
          this.mmap();
        }, 600);
      });
    }
  },
  destroyed() {
    clearTimeout(this.timename);
    localStorage.removeItem("map");
    this.ws.close();
  },
};
</script>
<style scoped>
@import url("~/static/css/c-index.css");
@import url("~/static/css/c-index1.2.css");
* {
  font-family: "Microsoft YaHei";
  -webkit-overflow-scrolling: touch;
}
html {
  height: 100%;
  overflow: hidden;
}
body {
  height: 100%;
  overflow: auto;
}
[v-cloak] {
  display: none;
}
.iscookie {
  position: fixed;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  top: 0;
}
.iscookie p {
  width: 80vw;
  height: 10vh;
  text-align: center;
  position: absolute;
  left: 10vw;
  top: 45vh;
}
/* 首屏弹框 */
.pingbox {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  z-index: 100000;
}
.shouping {
  width: 100vw;
  position: fixed;
  top: 0;
  z-index: 21474836470;
  text-align: center;
  top: 20%;
}
.shouping .esc {
  position: absolute;
  width: 2.333333rem;
  top: -10%;
  right: 5%;
}
.shouping .img {
  width: 80%;
}
.shouping input {
  width: 70%;
  height: 2.75rem;
  border-radius: 0.625rem;
  position: absolute;
  top: 65%;
  left: 15%;
  border: 0;
  padding-left: 0.8rem;
  color: #999999;
  font-size: 1rem;
}
.shouping button {
  width: 24%;
  height: 2.75rem;
  border-radius: 0.625rem;
  text-align: center;
  line-height: 2rem;
  position: absolute;
  top: 65%;
  right: 15%;
  background: linear-gradient(
    0deg,
    rgba(255, 198, 22, 1),
    rgba(255, 235, 83, 1)
  );
  box-shadow: 0px 0.5px 0.5px 0px rgba(6, 0, 1, 0.1);
  border: 0;
  font-size: 0.9375rem;
  color: #ff3922;
}
.shouping .peonum {
  position: absolute;
  top: 78%;
  right: 4.25rem;
  color: #ffdeda;
  font-size: 0.6875rem;
  line-height: 0.933333rem;
}
.shouping .show-msg {
  color: #ffb2a6;
  font-size: 0.625rem;
  position: absolute;
  width: 70%;
  left: 15%;
  top: 84%;
  line-height: 0.8125rem;
}
.shouping .zhu {
  position: absolute;
  color: #ffb2a6;
  font-size: 0.625rem;
  width: 100%;
  text-align: center;
  top: 94%;
}
.shouping span {
  display: block;
  width: 11.333333rem;
  height: 4rem;
  border-radius: 0.4rem;
  position: absolute;
  left: 50%;
  margin-left: -5.666667rem;
  top: 50%;
  margin-top: -2rem;
  z-index: 231313213;
  background: rgba(0, 0, 0, 0.8);
  text-align: center;
  line-height: 4rem;
  color: #cdcdcd;
}

.swp {
  position: fixed;
  left: 18%;
  top: 40%;
  z-index: 20002;
  background-color: #fff;
}
.swp .slide-verify {
  width: 240px;
}
.swp >>> .slide-verify-slider {
  width: 100%;
  height: 30px;
  margin-top: 0;
  line-height: 30px;
}
.swp >>> .slide-verify-slider .slide-verify-slider-mask-item {
  width: 29px;
  height: 29px;
}
.swp >>> .slide-verify-slider-mask {
  height: 29px !important;
}
.swp >>> .slide-verify-slider-mask-item-icon {
  top: 10px;
  left: 6px;
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
  font-size: 1.0625rem;
  font-weight: bold;
  margin-bottom: 9px;
  margin-top: 7px;
}
.tuan-qiang .q-con p {
  color: #4d4d4d;
  font-size: 0.8125rem;
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
  font-size: 0.8125rem;
  text-align: center;
  line-height: 25px;
  margin-bottom: 9px;
  border: 0;
  margin-top: 8px;
}
.tuan-qiang .q-right p {
  color: #fe582f;
  font-size: 0.75rem;
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
  color: #cdcdcd;
  font-size: 1rem;
  display: none;
  position: absolute;
  width: 170px;
  height: 60px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.8);
  text-align: center;
  line-height: 60px;
  left: 50%;
  margin-left: -85px;
  top: 150px;
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
  font-size: 0.875rem;
  display: inline-block;
  position: relative;
  margin-left: 6%;
  text-align: center;
  height: 44px;
  line-height: 44px;
}

.m-imgs ul li.m-active {
  color: #333333;
  font-size: 1rem;
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

.swiper-dynamic {
  margin-right: -4%;
}

.m-huo .m-btns button {
  width: 92%;
  height: 44px;
  background-color: #edf5f9;
  color: #3dabef;
  font-size: 1rem;
  text-align: center;
  line-height: 44px;
  margin-left: 4%;
  border: 0px;
  border-radius: 4px;
  margin-bottom: 5px;
  position: inherit;
  margin-top: 25px;
}

#m_sc_box {
  display: none;
}
/* .m-incro .go-map {
  background: url(~assets/addressmap.png) no-repeat;
  background-size: 100%;
  background-position: left;
} */
.m-incro .m-ic-icons strong {
  color: #fe582f;
  font-size: 0.6875rem;
  font-weight: 400;
  padding: 2px 4px 1px 4px;
  /* border: 0.5px solid #fe582f; */
  border-radius: 2px;
  background-color: #ffede5;
}
.m-incro .m-ic-icons .build-icons {
  position: absolute;
  right: 2%;
  top: 0%;
  display: flex;
  color: #999999;
  font-size: 0.6875rem;
  text-align: center;
}
.m-incro .m-ic-icons .build-icons .icons-left {
  border-right: 0.5px solid #d9d9d9;
}
.m-incro .m-ic-icons .build-icons img {
  width: 1.375rem;
  display: block;
  margin: 0 0.875rem 0.125rem 0.875rem;
}
.m-incro .m-ic-icons .wxshare {
  width: 3.75rem;
  height: 1.625rem;
  border-radius: 0.8125rem 0px 0px 0.8125rem;
  background-color: #ecf9ff;
  color: #3eacf0;
  font-size: 0.875rem;
  text-align: center;
  line-height: 1.625rem;
  position: absolute;
  right: 0;
  top: 0;
}
.m-incro .m-ic-icons .wxshare img {
  width: 1rem;
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
  width: 86%;
  position: fixed;
  left: 7%;
  top: 24%;
  border-radius: 12px;
  z-index: 1001;
  background-color: #fff;
}

.weiter .t-top {
  width: 100%;
  background-color: #fff;
  border-radius: 12px 12px 0 0;
  padding-top: 42px;
}

.weiter .t-top h6 {
  color: #323233;
  font-size: 1.25rem;
  text-align: center;
  margin-bottom: 24px;
  font-weight: bold;
}

.weiter .t-top p {
  color: #787980;
  font-size: 1rem;
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
  height: 248px;
  background-color: #fff;
  border-radius: 0 0 12px 12px;
}

.weiter .t-bottom .t-b-first {
  height: 100%;
  display: block;
}
.weiter .t-bottom .t-b-first .w-tit {
  color: #a8a8ab;
  font-size: 0.75rem;
  padding-left: 7%;
  padding-top: 8px;
}
.weiter .t-bottom .t-b-first .w-tit img {
  width: 5%;
  margin-right: 2%;
  margin-bottom: 2px;
}

.weiter .t-bottom .t-b-first .w-mg {
  font-size: 0.6875rem;
}
.weiter .t-bottom .t-b-first .w-mg a {
  color: #498de1;
}

.weiter .t-bottom .t-b-first input {
  width: 87.69%;
  height: 55px;
  border: 1.5px solid #c6c6cc;
  margin-top: 32px;
  margin-bottom: 10px;
  margin-left: 6.15%;
  padding-left: 5%;
  font-size: 0.9375rem;
  border-radius: 6px;
}

.weiter .t-bottom .t-b-first .w-mg-c {
  width: 10px;
  height: 10px;
  margin: 0;
  margin-left: 6.15%;
  margin-bottom: 37px;
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
  width: 87.69%;
  height: 44px;
  border: 0;
  border-radius: 6px;
  color: #fff;
  font-size: 1rem;
  text-align: center;
  line-height: 40px;
  margin-left: 6.15%;
  box-shadow: 0px 2.5px 6px 0px rgba(78, 169, 255, 0.3);
}

.weiter .t-bottom .t-b-first .bg_01 {
  background: linear-gradient(
    -270deg,
    rgba(52, 138, 255, 1),
    rgba(106, 204, 255, 1)
  );
}

.weiter .t-bottom .t-b-first .bg_02 {
  background: linear-gradient(
    -270deg,
    rgba(52, 138, 255, 1),
    rgba(106, 204, 255, 1)
  );
}

.weiter .t-bottom .t-b-second {
  height: 100%;
  display: none;
  padding-top: 20px;
}

.weiter .t-bottom .t-b-second p {
  margin-top: 10px;
  color: #808080;
  font-size: 0.75rem;
  width: 85%;
  margin-left: 7.5%;
  margin-bottom: 10px;
}

.weiter .t-bottom .t-b-second input {
  width: 85%;
  height: 55px;
  border-radius: 6px;
  border: 1.5px solid #c6c6cc;
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
  font-size: 1rem;
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
  font-size: 0.8125rem;
  position: absolute;
  right: 10%;
  top: 54%;
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
  font-size: 1rem;
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
  font-size: 1rem;
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

.m-lun .m-luns img {
  height: 210px;
  width: 100%;
}

.m-lun .m-luns #lnum {
  width: 13.3333%;
  background: rgba(0, 0, 0, 0.8);
  height: 20px;
  font-size: 0.625rem;
  color: #fff;
  line-height: 1.25rem;
  text-align: center;
  border-radius: 0.625rem;
  opacity: 0.6;
  position: absolute;
  right: 4%;
  bottom: 15px;
  z-index: 200;
}

.swiper-top .swiper-slide img {
  height: 210px !important;
}

.tuan-msg {
  position: relative;
  margin-top: -4px;
  z-index: 10;
}
.tar {
  display: flex;
  border-radius: 6px 6px 0 0;
  overflow: hidden;
}
.tar .left {
  width: 70%;
  height: 50px;
  background: linear-gradient(90deg, rgba(255, 1, 91, 1), rgba(255, 69, 29, 1));
}
.tar .left img {
  width: 100%;
}
.tar .left h5 {
  color: #fff;
  font-size: 0.9375rem;
  margin-left: 14px;
  margin-top: 9px;
  margin-bottom: 5px;
}
.tar .left h5 span {
  font-size: 0.9375rem;
}
.tar .left p {
  margin-left: 14px;
  color: #ffcacd;
  font-size: 0.625rem;
}
.tar .right {
  height: 50px;
  width: 30%;
  background: rgba(255, 233, 214, 1);
  text-align: center;
}
.tar .right h5 {
  color: #ff3e24;
  font-size: 0.8125rem;
  margin-bottom: 3px;
  padding-top: 10px;
  margin-left: 2px;
}
.tar .right p {
  color: #ff3e24;
  font-size: 0.625rem;
}
.tar .right span {
  font-size: 0.625rem;
  color: #fff;
  display: inline-block;
  width: 0.875rem;
  height: 0.875rem;
  border-radius: 0.125rem;
  text-align: center;
  line-height: 0.875rem;
  background-color: #ff3e24;
  margin: 0 0.125rem;
}
.pin {
  padding: 0 0 8px 0;
  position: relative;
}
.pin nav {
  padding: 1.5625rem 0 0 4%;
  overflow: hidden;
  margin-bottom: 24px;
}
.pin nav h3 {
  float: left;
  color: #121212;
  font-size: 1.0625rem;
  font-weight: bold;
}
.pin nav button {
  border: 0;
  background-color: #ffebe1;
  color: #f14329;
  font-size: 0.75rem;
  text-align: center;
  line-height: 1.5rem;
  height: 1.5rem;
  border-radius: 0.75rem 0 0 0.75rem;
  float: right;
  width: 4.1875rem;
  margin-top: -2px;
}
.pin nav p {
  float: right;
  color: #323232;
  font-size: 0.625rem;
}
.pin nav p span {
  color: black;
  font-size: 0.6875rem;
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-left: 4px;
  margin-right: 4px;
  background: #f1f1f1;
  border-radius: 2px;
  text-align: center;
  line-height: 16px;
}
.pin-bao {
  position: absolute;
  width: 70px;
  height: 26px;
  background: linear-gradient(
    180deg,
    rgba(248, 195, 61, 1),
    rgba(255, 238, 187, 1)
  );
  border-radius: 13px;
  color: #ef2b31;
  font-size: 0.8125rem;
  text-align: center;
  line-height: 28px;
  right: 8%;
  top: 14%;
}
.pin .pin-msg {
  position: absolute;
  right: 8%;
  top: 45%;
  color: #ffd4ce;
  font-size: 0.75rem;
}
.pin .pin-time {
  position: absolute;
  color: #ffeae5;
  font-size: 0.625rem;
  top: 49%;
  left: 22%;
}
.pin .top,
.pin .bomm {
  position: relative;
}
.pin .top {
  margin-bottom: 4px;
}
.pin .y1 {
  top: 14%;
}
.pin .ym {
  top: 45%;
}
.pin img {
  width: 92%;
  margin-bottom: 9px;
  margin-left: 4%;
}
.pin .bom {
  padding: 0 4%;
}
.huo-msg {
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  z-index: 300;
}
.huo-msg .msg-con {
  width: 86%;
  position: fixed;
  top: 25vh;
  left: 7%;
  border-radius: 0.75rem;
  padding: 1.5625rem;
  background-color: #fff;
  z-index: 300;
}
.huo-msg .msg-con div {
  max-height: 280px;
  overflow-x: auto;
}
.huo-msg h4 {
  color: #2f3133;
  font-size: 1.25rem;
  text-align: center;
  margin-bottom: 1.25rem;
  font-weight: bold;
}
.huo-msg p {
  color: #626466;
  font-size: 0.8125rem;
  line-height: 1.1875rem;
  margin-bottom: 0.625rem;
}
.huo-msg p span {
  font-weight: bold;
}
.huo-msg img {
  width: 1rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
}
.top-num {
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #646466;
  font-size: 0.9375rem;
}
.top-num img {
  margin-bottom: 3px;
}
.top-num .totop {
  width: 4.5%;
  margin-right: 4%;
  float: right;
  margin-top: 4.2%;
}
.top-num .content-top {
  width: 18px;
  height: 18px;
  margin-left: 4%;
  margin-right: 3.4%;
}
.trend-con1 {
  display: inline-block;
  line-height: 20px;
  width: 44%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 20px;
  font-size: 0.625rem;
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
  font-size: 0.8125rem;
}
.pin .bom p span {
  color: #fe582f;
}
.wxwork {
  width: 100%;
  height: 3.75rem;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  z-index: 999;
}
.wxwork .wximg {
  position: relative;
  margin-left: 0.9375rem;
}
.wxwork .wximg img {
  width: 2.5rem;
  border-radius: 50%;
  height: 2.5rem;
}
.wxwork .wximg p {
  width: 2.25rem;
  height: 0.8125rem;
  background: linear-gradient(
    0deg,
    rgba(247, 214, 126, 1),
    rgba(254, 233, 173, 1)
  );
  border-radius: 0.375rem;
  color: #8b6232;
  font-size: 0.625rem;
  text-align: center;
  line-height: 0.8125rem;
  text-align: center;
  position: absolute;
  bottom: -0.125rem;
  left: 0.125rem;
}
.wxwork .wximg span {
  width: 0.8125rem;
  height: 0.8125rem;
  border-radius: 50%;
  background-color: #f34f4f;
  color: #fff;
  font-size: 0.625rem;
  text-align: center;
  line-height: 0.8125rem;
  position: absolute;
  display: block;
  top: 0;
  right: 0;
}
.wxwork .wxmsg {
  margin: 0 0.75rem 0 0.375rem;
}
.wxwork .wxmsg h5 {
  color: #222324;
  font-size: 1rem;
  margin-bottom: 0.3125rem;
  margin-top: 0.25rem;
}
.wxwork .wxmsg p {
  color: #696a6d;
  font-size: 0.6875rem;
}
.wxwork button {
  width: 6.875rem;
  height: 2.5rem;
  border-radius: 0.1875rem;
  text-align: center;
  line-height: 2.5rem;
  font-size: 0.9375rem;
  border: 0;
}
.wxwork button img {
  width: 0.9rem;
}
.wxwork .wxyue {
  background: linear-gradient(
    0deg,
    rgba(247, 214, 126, 1),
    rgba(254, 233, 173, 1)
  );
  color: #8b6232;
  margin-right: 0.625rem;
}
.wxwork .wxtel {
  background: linear-gradient(
    0deg,
    rgba(45, 47, 49, 1),
    rgba(153, 153, 153, 1)
  );
  color: #fce5a0;
}
.wxlu {
  position: fixed;
  width: 100%;
  bottom: 6rem;
  z-index: 200;
}
.wxlu .wxlu-con {
  width: 8.75rem;
  height: 2.5rem;
  background: rgba(255, 248, 237, 0.9);
  border-radius: 1.25rem;
  display: flex;
  align-items: center;
  margin-left: 4%;
}
.wxlu .wxlu-con img {
  width: 2.125rem;
  border-radius: 50%;
  margin-right: 0.4375rem;
  margin-left: 0.25rem;
}
.wxlu .wxlu-con .wxlumsg h5 {
  color: #725e46;
  font-size: 0.9375rem;
  margin-bottom: 0.125rem;
}
.wxlu-con .wxlumsg p {
  color: #9e815f;
  font-size: 0.75rem;
}
.wxtel {
  position: relative;
}
.wxtel p {
  color: #333333;
  font-size: 1.5rem;
  position: absolute;
  left: 9%;
  top: 5%;
}
.banner {
  width: 100%;
  height: 5rem;
}
.banner img {
  width: 100%;
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