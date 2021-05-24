<template>
  <div id="sempage">
    <div class="headertop">
      <h2>
        <img class="top-ll" src="~/assets/return.png" alt @click="goback" />
        <img class="content-img" src="~/assets/content-logo.png" alt />
        <img
          class="topright tophome"
          src="~/assets/mapcai.png"
          alt
          @click="listtype = !listtype"
        />
        <ul class="cailist" v-if="listtype">
          <li class="cmn">
            <router-link :to="'/' + jkl">
              <i></i>
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
      </h2>
    </div>
    <img src="~/assets/sem/top.jpg" alt="" class="topimg" />
    <div class="toptxt" v-if="pros">
      <img src="~/assets/sem/toptxt.png" class="topimg" />
      <button
        @click="
          popup(
            '',
            '领取详细资料',
            '',
            12,
            header.title + '领取《钱杨新城》详细资料',
            1
          )
        "
      >
        领取《钱杨新城》详细资料
      </button>
    </div>
    <div class="content" v-if="pros">
      <template v-for="(item, key) in pros">
        <div :key="key" v-if="key < 3">
          <img
            src="~/assets/sem/01txt.png"
            alt=""
            class="conimg c1"
            v-if="key == 0"
          />
          <img
            src="~/assets/sem/02txt.png"
            alt=""
            class="conimg c1"
            v-if="key == 1"
          />
          <img
            src="~/assets/sem/03txt.png"
            alt=""
            class="conimg c1"
            v-if="key == 2"
          />
          <div class="box">
            <div class="protop">
              <img
                src="~/assets/sem/map.jpg"
                alt=""
                class="conimg"
                v-if="key == 0"
              />
              <img
                src="~/assets/sem/02img.jpg"
                alt=""
                class="conimg"
                v-if="key == 1"
              />
              <img
                src="~/assets/sem/03img.jpg"
                alt=""
                class="conimg"
                v-if="key == 2"
              />
              <p v-if="key == 0">带动发展 &nbsp;DRIVE</p>
              <p v-if="key == 1">钱杨新城 &nbsp;CHEAP</p>
              <p v-if="key == 2">配套规划 &nbsp;PLAN</p>
            </div>
            <div class="pro">
              <nuxt-link :to="'/' + jkl + '/content/' + item.id">
                <div class="top">
                  <div class="left">
                    <img :src="item.image" alt="" />
                  </div>
                  <div class="right">
                    <h3>{{ item.name }}</h3>
                    <p class="pri">{{ item.price }}<span>元/m²</span></p>
                    <p class="msg">
                      {{ item.type }} | {{ item.city }}-{{ item.country }} |
                      {{ item.area }}m²
                    </p>
                    <p class="icons">
                      <span class="icon">{{ item.decorate }}</span>
                      <span v-if="item.railway">{{
                        item.railway.substr(0, 3)
                      }}</span>
                      <span>{{ item.feature }}</span>
                    </p>
                  </div>
                </div>
              </nuxt-link>
              <div class="bottom">
                <button
                  @click="
                    popup(
                      item.id,
                      '咨询楼盘底价',
                      item.name,
                      3,
                      header.title + '咨询楼盘底价',
                      0
                    )
                  "
                >
                  询底价
                </button>
                <a :href="'tel:' + item.phone">
                  <button class="telbtn">电话咨询</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <img src="~/assets/sem/navimg.png" alt="" class="topimg"  @click="popup('', '领取分析资料', '', 12, header.title + '领取分析资料', 1)" v-if="pros"/>
    <div class="other" v-if="pros">
      <div class="other-con">
        <h2>推荐楼盘</h2>
        <template v-for="(item, key) in pros">
          <nuxt-link
            :to="'/' + $route.params.name + '/content/' + item.id"
            :key="'sdf' + key"
            v-if="key > 2"
          >
            <div class="pro">
              <div class="left">
                <img :src="item.image" alt="" />
              </div>
              <div class="right">
                <h3>
                  {{ item.name }} <span>{{ item.state }}</span>
                </h3>
                <p class="pri">{{ item.price }}<span>元/m²</span></p>
                <p class="msg">
                  {{ item.type }} | {{ item.city }}-{{ item.country }} |
                  {{ item.area }}m²
                </p>
                <p class="icons">
                  <span class="icon">{{ item.decorate }}</span>
                  <span v-if="item.railway">{{ item.railway }}</span>
                  <span>{{ item.feature }}</span>
                </p>
              </div>
            </div>
          </nuxt-link>
        </template>
      </div>
      <button @click="getmore" v-if="num > page">更多楼盘 ></button>
    </div>
    <div class="bomnav" v-if="pros">
      <button @click="popup('', '预约看房', '', 5, header.title + '预约看房', 0)">
        <img src="~/assets/navzixun.png" alt="" />
        预约看房
      </button>
      <a :href="'tel:' + header.phone">
        <button class="telbtn">
          <img src="~/assets/wxtel.png" alt />
          电话咨询
        </button>
      </a>
    </div>
    <div v-if="tan">
      <van-popup
        v-model="tan"
        :style="{ background: 'rgba(0,0,0,0)' }"
        @click-overlay="closefn"
      >
        <sign
          :txt="remark"
          :typenum="typenum"
          :id="id"
          :name="name"
          @close="cli"
          :typebtn="typebtn"
          :iswenjian="iswenjian"
          :proname="proname"
        ></sign>
      </van-popup>
    </div>
  </div>
</template>
<script>
import sign from "~/components/tan.vue";
import { temore } from "~/api/api";
export default {
  async asyncData(context) {
    try {
      let jkl = context.params.name;
      let type = context.params.type;
      let other = context.store.state.cookie.other
        ? context.store.state.cookie.other
        : "";
      if (context.query.other != other && context.query.other) {
        other = context.query.other;
        context.store.state.cookie.other = context.query.other;
      }
      let [res] = await Promise.all([
        context.$axios
          .request({
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            method: "post",
            url: "/yunjia/area/buidlings",
            params: {
              type: type,
              other: other,
              page: 1,
            },
          })
          .then((resp) => {
            let data = resp.data.data;
            if (!data) {
              data = {
                header: {}
              }
            }
            return data;
          }),
      ]);
      return {
        pros: res.data,
        current: res.city,
        header: res.header,
        jkl: jkl,
        other: other,
        total: res.count,
      };
    } catch (err) {
      console.log("errConsole========:", err);
      context.error({ statusCode: 404, message: "页面未找到或无数据" });
    }
  },
  head() {
    return {
      title: this.header.title || "允家新房",
      meta: [
        {
          name: "description",
          content: this.header.description || "允家新房",
        },
        {
          name: "Keywords",
          content: this.header.keywords || "允家新房",
        },
      ],
    };
  },
  components: {
    sign,
  },
  data() {
    return {
      iswenjian: 0,
      remark: "",
      typenum: "",
      id: 0,
      name: "",
      proname: "",
      typebtn: 0,
      tan: false,
      listtype: false,
      page: 2,
      ting: true,
      num: 1,
    };
  },
  methods: {
    closefn() {
      this.typebtn = 0
      this.iswenjian = 0
    },
    goback() {
      this.$router.push("/" + this.current.pinyin);
    },
    cli() {
      this.tan = false;
    },
    popup(id, name, proname, position, remark, wj) {
      this.typebtn = 1;
      this.typenum = position;
      this.name = name;
      this.id = id;
      this.proname = proname;
      this.remark = remark;
      this.tan = true;
      this.iswenjian = wj
    },
    getmore() {
      if (!this.ting) {
        return;
      }
      this.ting = false;
      temore({
        other: this.other,
        type: this.$route.params.type,
        page: this.page,
      }).then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          this.page = this.page + 1;
          this.pros = this.pros.concat(res.data.data.data);
          this.ting = true;
        }
      });
    },
  },
  mounted() {
    this.tan = false;
    if (this.pros) {
      $cookies.set("other", this.$route.query.other);
      let url = window.location.href;
      let pp = {
        controller: "Info",
        action: "register",
        params: {
          city: this.current.id,
          project: "",
          ip: localStorage.getItem("ip"),
          url: url,
          uuid: localStorage.getItem("uuid"),
          host: this.$store.state.hostname,
        },
      };
      this.$store.state.ws.send(JSON.stringify(pp));
      this.$store.commit("setcity", this.current.id);
      $cookies.set("city", this.current.id);
      localStorage.setItem("cityname", this.current.name);
      this.num = Math.ceil(this.total / 10);
    }
  },
};
</script>
<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
#sempage {
  background-color: #f5f5f5;
  padding-bottom: 4.25rem;
}
.topimg {
  width: 100%;
}
.toptxt {
  padding: 0 1.25rem;
  padding-top: 2.125rem;
  padding-bottom: 2.25rem;
  background-color: #fff;
  button {
    width: 100%;
    height: 2.875rem;
    border-radius: 0.5rem;
    text-align: center;
    line-height: 2.875rem;
    background: linear-gradient(270deg, #ff4b2d, #ffb753);
    color: #ffffff;
    font-size: 1rem;
    font-weight: bold;
    border: 0;
    outline: none;
    margin-top: 1rem;
  }
}
.content {
  padding: 0 1.25rem;
  background: url(~assets/sem/bg.jpg);
  background-repeat: no-repeat;
  background-size: 104%;
  padding-bottom: 0.9375rem;
  .conimg {
    width: 100%;
  }
  .c1 {
    margin-top: 2.125rem;
    margin-bottom: 1.25rem;
  }
  .box {
    border-radius: 0.5rem;
    overflow: hidden;
  }
  .protop {
    position: relative;
    p {
      position: absolute;
      width: 7.5rem;
      height: 1.5rem;
      text-align: center;
      line-height: 1.5rem;
      background: linear-gradient(-270deg, #24a4d4, #f5f5f5);
      color: #ffffff;
      font-size: 0.6875rem;
      right: 0;
      bottom: 0;
    }
  }
  .pro {
    padding: 1.125rem 0.9375rem 0.625rem 0.9375rem;
    background-color: #fff;
    margin-bottom: 2.125rem;
    .top {
      display: flex;
      margin-bottom: 0.625rem;
      .left {
        margin-right: 0.75rem;
        img {
          width: 6.875rem;
          height: 5rem;
          border-radius: 0.25rem;
        }
      }
      .right {
        padding-bottom: 0.75rem;
        border-bottom: 0.03125rem solid #f2f2f2;
        h3 {
          color: #12181f;
          font-size: 1rem;
        }
        .pri {
          color: #ff6040;
          font-size: 1rem;
          font-weight: 800;
          span {
            font-size: 0.8125rem;
          }
        }
        .msg {
          color: #646566;
          font-size: 0.75rem;
          margin-bottom: 0.2rem;
        }
        .icons {
          span {
            color: #7d7e80;
            font-size: 0.6875rem;
            padding: 0.1875rem 0.375rem;
            border-radius: 0.1875rem;
            background: #f7f7f7;
            margin-right: 0.375rem;
          }
          .icon {
            background: #edf3fa;
            color: #628bb9;
          }
        }
      }
    }
    .bottom {
      display: flex;
      button {
        width: 9.125rem;
        height: 2.125rem;
        border-radius: 0.25rem;
        text-align: center;
        line-height: 2.125rem;
        border: 0;
        outline: none;
        color: #ffffff;
        background: linear-gradient(-90deg, #348aff, #6accff);
        font-size: 0.875rem;
      }
      .telbtn {
        background: linear-gradient(270deg, #ff4b2d, #ffb753);
        margin-left: 0.75rem;
      }
    }
  }
  .pro:nth-last-of-type(1) {
    margin-bottom: 0;
  }
}
.other {
  padding: 0.9375rem;
  .other-con {
    background-color: #fff;
    padding: 0.9375rem;
    border-radius: 0.5rem;
    h2 {
      color: #17181a;
      font-size: 1.0625rem;
      margin-bottom: 1rem;
    }
    a {
      display: block;
      margin-bottom: 1.875rem;
    }
    .pro {
      display: flex;
      .left {
        margin-right: 0.75rem;
        img {
          width: 6.875rem;
          height: 5rem;
          border-radius: 0.25rem;
        }
      }
      .right {
        flex: 1;
        h3 {
          color: #12181f;
          font-size: 1rem;
          span {
            color: #20c657;
            font-size: 0.6875rem;
            padding: 0.1875rem 0.375rem;
            border-radius: 0.1875rem;
            background: #ebf7f0;
            float: right;
          }
          .null {
            color: #ff7519;
            background: #fff7f2;
          }
        }
        .pri {
          color: #ff6040;
          font-size: 1rem;
          font-weight: 800;
          span {
            font-size: 0.8125rem;
          }
        }
        .msg {
          color: #646566;
          font-size: 0.75rem;
          margin-bottom: 0.2rem;
        }
        .icons {
          span {
            color: #7d7e80;
            font-size: 0.6875rem;
            padding: 0.1875rem 0.375rem;
            border-radius: 0.1875rem;
            background: #f7f7f7;
            margin-right: 0.375rem;
          }
          .icon {
            background: #edf3fa;
            color: #628bb9;
          }
        }
      }
    }
    a:nth-last-of-type(1) {
      margin-bottom: 0;
    }
  }
  button {
    width: 100%;
    height: 2.875rem;
    border-radius: 0.5rem;
    text-align: center;
    line-height: 2.875rem;
    border: 0;
    outline: none;
    background: linear-gradient(270deg, #24a4d4, #9adaf1);
    color: #ffffff;
    font-weight: bold;
    font-size: 1rem;
    margin-top: 0.9375rem;
  }
}
.bomnav {
  position: fixed;
  bottom: 0;
  z-index: 10;
  width: 100%;
  height: 4.25rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    width: 10.3125rem;
    height: 3rem;
    border-radius: 0.375rem;
    text-align: center;
    line-height: 3rem;
    border: 0;
    outline: none;
    background: linear-gradient(-90deg, #348aff, #6accff);
    color: #ffffff;
    font-size: 1rem;
    font-weight: bold;
    img {
      width: 1.125rem;
      margin-right: 0.25rem;
    }
  }
  .telbtn {
    background: linear-gradient(270deg, #ff4b2d, #ffb753);
    margin-left: 0.9375rem;
  }
}
.headertop {
  height: 44px;
}
.headertop img {
  width: 5.4%;
}
.headertop h2 {
  font-size: 1.125rem;
  color: #2e3033;
  line-height: 44px;
}
.headertop h2 span {
  width: 58%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
}
.headertop .content-img {
  width: 14%;
  float: left;
  margin-top: 2.6%;
  margin-left: 30%;
}
.headertop .top-ll {
  margin: 0 4%;
  float: left;
  margin-top: 3%;
}
.headertop .topright {
  float: right;
  margin-top: 12px;
  margin-right: 4%;
}
h2 .cailist {
  width: 9.375rem;
  background: rgba(41, 41, 41, 0.9);
  position: absolute;
  top: 2.625rem;
  border-radius: 0.375rem;
  z-index: 230;
  right: 4%;
}
h2 .cailist li {
  position: relative;
  color: #e6e6e6;
  font-size: 0.9375rem;
  line-height: 3.125rem;
  border: 0;
}
h2 .cailist li a {
  width: 100%;
  display: flex;
  color: #e6e6e6;
  align-items: center;
}
h2 .cailist li.cmn i {
  display: block;
  border: 0.4375rem solid transparent;
  border-bottom-color: rgba(41, 41, 41, 0.9);
  position: absolute;
  top: -0.875rem;
  right: 0.625rem;
}
h2 .cailist li p {
  border-bottom: 0.5px solid #545454;
  flex: 1;
}
h2 .cailist li img {
  width: 1.125rem;
  margin: 0;
  margin-left: 0.8rem;
  margin-right: 0.875rem;
  height: 1.125rem;
}
</style>