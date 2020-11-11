<template>
  <div id="talklist">
    <header>
      <img class="back" src="~/assets/goback.png" alt="" @click="back" />
      在线咨询
    </header>
    <ul class="con">
      <li @click="gotalk(item.id)" v-for="item in list" :key="item.id">
        <div class="left">
          <img :src="item.img" alt="" />
          <p v-if="item.num">{{ item.num }}</p>
        </div>
        <div class="right">
          <div class="top">
            {{ item.name }}
            <p class="pro">{{ item.project }}</p>
            <span class="time">{{ item.time }}</span>
          </div>
          <p class="txt">{{ item.content }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  async asyncData(context) {
    let token = context.store.state.cookie.token;
    let jkl = context.params.name;
    return {
      jkl: jkl,
    };
  },
  data() {
    return {
      ws: "",
      list: [],
    };
  },
  methods: {
    gotalk(id) {
      sessionStorage.setItem("staffid", id);
      let n = parseInt(sessionStorage.getItem(id));
      let total = parseInt(sessionStorage.getItem("total"));
      total = total - n;
      if (total != 0) {
        sessionStorage.setItem("total", total);
      } else {
        sessionStorage.removeItem("total");
      }
      sessionStorage.removeItem(id);
      sessionStorage.setItem("islist", 1);
      this.$router.push("/" + this.jkl + "/talk");
    },
    back() {
      this.$router.go(-1);
    },
    getlist(id) {
      let pp = {
        controller: "Staff",
        action: "lists",
        params: { uuid: id },
      };
      this.ws.send(JSON.stringify(pp));
    },
  },
  mounted() {
    let that = this;
    console.log(this.$store.state.ws);
    this.ws = this.$store.state.ws;
    let id = localStorage.getItem("uuid");
    this.ws.onopen = function () {
      that.getlist(id);
    };
    if (this.ws.readyState == 1) {
      that.getlist(id);
    }
    that.ws.onmessage = function (event) {
      let data = JSON.parse(event.data);
      if (data.action == 105) {
        let date = new Date();
        for (let val of data.data) {
          let dd = new Date(val.time.replace(/\-/g, '/'));
          let time = date - dd;
          if (time / 1000 < 3600 * 24) {
            val.time =
              (dd.getHours() >= 10 ? dd.getHours() : "0" + dd.getHours()) +
              ":" +
              (dd.getMinutes() >= 10 ? dd.getMinutes() : "0" + dd.getMinutes());
          } else {
            val.time =
              dd.getFullYear() +
              "-" +
              (dd.getMonth() + 1 >= 10
                ? dd.getMonth() + 1
                : "0" + (dd.getMonth() + 1)) +
              "-" +
              (dd.getDate() >= 10 ? dd.getDate() : "0" + dd.getDate());
          }
          console.log(time);
          if (sessionStorage.getItem(val.id)) {
            console.log(sessionStorage.getItem(val.id));
            val.num = sessionStorage.getItem(val.id);
          }
          if(val.content.indexOf('%get your phone%')!== -1) {
            val.content = '请您报备电话'
          }else if(val.content.indexOf('%put my card%')!== -1) {
            val.content = '这是我的名片'
          }else if(val.content.indexOf('project_card')!== -1) {
            let msg = JSON.parse(val.content)
            val.content = '我浏览了'+msg.name
          }else if(val.content.length>300) {
            val.content = '我发送了一张图片'
          }
        }
        that.list = data.data;
        console.log(that.list);
      }
    };
    $("#foott").css("display", "none");
  },
  beforeDestroy(){
    sessionStorage.removeItem('staffid')
  }
};
</script>
<style lang="less" scoped>
header {
  height: 2.75rem;
  line-height: 2.75rem;
  text-align: center;
  color: #19191a;
  font-size: 1.125rem;
  position: relative;
  z-index: 1;
  border-bottom: 0.03125rem solid #f7f7f7;
  .back {
    width: 1.5rem;
    position: absolute;
    left: 1rem;
    margin-top: 0.5625rem;
  }
}
.con {
  padding: 0 4%;
  li {
    display: flex;
    height: 4.875rem;
    align-items: center;
    .left {
      display: flex;
      position: relative;
      width: 3rem;
      height: 3rem;
      overflow: hidden;
      border-radius: 50%;
      img {
        width: 3rem;
        // height: 3rem;
        position: absolute;
      }
      p {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        text-align: center;
        line-height: 1rem;
        font-size: 0.6875rem;
        color: #fff;
        background-color: #f24949;
        position: absolute;
        right: 0;
        top: -0.125rem;
      }
    }
    .right {
      margin-left: 0.9375rem;
      flex: 1;
      display: flex;
      height: 100%;
      flex-direction: column;
      justify-content: center;
      border-bottom: 0.03125rem solid #f2f2f2;
      .top {
        color: #19191a;
        font-size: 1rem;
        margin-bottom: 0.625rem;
        display: flex;
        .pro {
          padding: 0.125rem 0.3125rem 0.15625rem 0.3125rem;
          color: #52c2cc;
          font-size: 0.6875rem;
          background-color: #ebf9fa;
          margin-left: 0.5rem;
          max-width: 6.5625rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .time {
          color: #afafb3;
          font-size: 0.75rem;
          float: right;
          margin-top: 0.25rem;
          margin-left: auto;
        }
      }
      .txt {
        color: #7d7d80;
        font-size: 0.8125rem;
        width: 15.875rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>