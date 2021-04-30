<template>
  <div id="searchari">
    <div class="input">
      <img src="~/assets/goback.png" alt class="back" @click="back" />
      <input
        type="text"
        placeholder="搜搜你想要了解的房产知识吧"
        v-model="name"
      />
      <img class="search" src="~/assets/search.png" alt />
      <span>搜索</span>
    </div>
    <!-- <div class="type" v-if="!isnull">
      <h3>热门关键词</h3>
      <p>
        <span>新房</span>
        <span>买房能力</span>
        <span>新房</span>
        <span>买房能力</span>
        <span>新房</span>
        <span>买房能力</span>
        <span>新房</span>
        <span>买房能力</span>
        <span>新房</span>
        <span>买房能力</span>
      </p>
    </div>-->
    <div class="con" v-if="!isnull">
      <h3>猜你喜欢</h3>
      <template v-for="(item, key) in recommends">
        <nuxt-link :to="'/' + jkl + '/encyclopediaArticle/56/' + item.id" :key="key" v-if="key<4">
          <div class="pro">
            <div class="left">
              <h5>{{ item.title }}</h5>
              <p>
                <span v-for="(val, k) in item.tags" :key="k">{{ val }}</span>
              </p>
            </div>
            <div class="right">
              <img :src="item.img ? item.img : img" alt />
            </div>
          </div>
        </nuxt-link>
      </template>
    </div>
    <div class="con list" v-show="isnull">
      <div id="kk">
        <p class="tit">
          共为您搜索到
          <span>{{ num }}</span
          >条关于“ <span>{{ name }}</span
          >”的知识
        </p>
        <template v-for="(item, key) in list">
          <nuxt-link :to="'/' + jkl + '/encyclopediaArticle/56/' + item.id" :key="key">
            <div class="pro">
              <div class="left">
                <h5 v-html="item.replace.title.indexOf('span')!=-1?item.replace.title:item.replace.description"></h5>
                <p v-if="item.tags.length">
                    <span v-for="(val, k) in item.tags" :key="k">{{
                      val
                    }}</span>
                  </p>
                  <p v-if="!item.tags.length">
                    {{ item.source }} &nbsp;&nbsp;&nbsp;{{ item.time }}
                  </p>
              </div>
              <div class="right">
                <img :src="item.img ? item.img : img" alt />
              </div>
            </div>
          </nuxt-link>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { souari } from "@/api/api";
export default {
  async asyncData(context) {
    let id = context.params.id;
    let token = context.store.state.cookie.token;
    let city = context.store.state.city;
    let jkl = context.params.name;
    let other = context.query.other;
    let [res,res1] = await Promise.all([
      context.$axios
        .get("/jy/article/recommends", {
          params: {
            city: city,
            token: token,
            limit: 10,
            page: 1,
          },
        })
        .then((resp) => {
          let data = resp.data;
          return data;
        }),
      context.$axios
        .get("/jy/phone/head/foot", {
          params: {
            city: city,
            token: token,
          },
        })
        .then((resp) => {
          let data = resp.data;
          return data;
        }),
    ]);
    return {
      jkl: jkl,
      id: id,
      recommends: res.recommends,
      title:res1.common.header.title,
      description:res1.common.header.description,
      keywords:res1.common.header.keywords
    };
  },
  head() {
    return {
      title: this.title || "家园新房-文章搜索",
      meta: [
        {
          name: "description",
          content: this.description || "家园新房",
        },
        {
          name: "Keywords",
          content: this.keywords || "家园新房",
        },
      ],
    };
  },
  data() {
    return {
      list: [],
      jkl: "",
      id: 0,
      name: "",
      isnull: false,
      num: 0,
      recommends: [],
      img: require("~/assets/default.jpg"),
      isok:true,
      page:2
    };
  },
  methods: {
    sou() {
      let that = this;
      let name = this.name;
      if (name) {
        this.isnull = true;
        souari({ name: name, page: 1, limit: 10 }).then((res) => {
          if (res.data.code == 200) {
            that.list = res.data.data;
            that.num = res.data.total;
          }
        });
      } else {
        this.isnull = false;
      }
    },
    back() {
      this.$router.go(-1);
    },
    getmore() {
      let that = this;
      var scrollTop = window.scrollY;
      var scrollHeight = window.screen.availHeight;
      var windowHeight = document.body.scrollHeight;
      if (scrollTop + scrollHeight >= windowHeight) {
        if (that.isok &&that.name) {
          that.isok = false;
          souari({ name: that.name, page: that.page, limit: 10 }).then((res) => {
            that.isok = true;
            that.list = that.list.concat(res.data.data);
            that.page = that.page+1
          });
        }
      }
    },
  },
  mounted(){
    window.addEventListener("scroll", this.getmore);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.getmore);
  },
  watch: {
    name(val) {
      this.sou();
    },
  },
};
</script>
<style lang="less" scoped>
li {
  list-style: none;
}
.input {
  height: 2.5rem;
  padding: 0.25rem 0 0.25rem 4%;
  position: relative;

  input {
    border: 0;
    outline: none;
    width: 15rem;
    height: 2rem;
    margin-top: 0.25rem;
    border-radius: 0.25rem;
    background-color: rgba(245, 245, 245, 1);
    padding-left: 2rem;
  }
  ::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #959799;
    font-size: 0.875rem;
  }

  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #959799;
    font-size: 0.875rem;
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #959799;
    font-size: 0.875rem;
  }
  .search {
    width: 1rem;
    position: absolute;
    top: 0.9rem;
    left: 3.4rem;
  }
  .back {
    width: 1.25rem;
    margin-right: 0.625rem;
  }
  span {
    color: #181819;
    font-size: 1rem;
    margin-left: 1.25rem;
  }
}
.type {
  padding: 0 4%;
  margin-bottom: 1.4rem;
  margin-top: 1.75rem;
  h3 {
    color: #101314;
    font-size: 0.9375rem;
    margin-bottom: 1.375rem;
  }
  p {
    span {
      color: #626466;
      font-size: 0.8125rem;
      padding: 0.4375rem 1rem;
      background-color: #f7f7f7;
      border-radius: 0.1875rem;
      margin-right: 0.75rem;
      margin-bottom: 0.75rem;
      display: inline-block;
    }
    span:nth-of-type(4n) {
      margin-right: 0;
    }
  }
}
.con {
  padding: 0 4%;
  margin-top: 1.875rem;
  h3 {
    color: #101314;
    font-size: 1rem;
    margin-bottom: 1.375rem;
  }
  .tit {
    color: #2f3133;
    font-size: 0.875rem;
    margin-bottom: 1.5rem;
    span {
      color: #ff3f3f;
    }
  }
  .pro {
    display: flex;
    height: 4.375rem;
    margin-bottom: 0.625rem;
    /deep/.left {
      position: relative;
      margin-right: 1.25rem;
      width: 14.0625rem;
      h5 {
        color: #2f3133;
        font-size: 0.875rem;
        line-height: 1.3125rem;
        font-weight: 400;
        position: relative;
        top: -0.25rem;
        height: 2.625rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        em {
          font-style: normal;
          color: #ff3f3f;
        }
      }
      p {
        position: absolute;
        bottom: 0.2rem;
        color: #626466;
        font-size: 0.625rem;
        margin-bottom: 0;
        span {
          padding: 0.15625rem 0.3125rem 0.1875rem 0.3125rem;
          border-radius: 0.125rem;
          background-color: #f5f5f5;
          color: #626466;
          font-size: 0.625rem;
          margin-right: 0.5rem;
        }
      }
    }
    .right {
      img {
        width: 6.25rem;
        height: 4.375rem;
        border-radius: 0.1875rem;
      }
    }
  }
}
.list {
  margin-top: 1.875rem;
}
</style>