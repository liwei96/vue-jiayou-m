<template>
  <div id="Talk">
    <div class="talk">
      <header>
        <img class="back" src="~/assets/goback.png" alt="" @click="back" />
        允家{{ staffname }}为您服务
        <div class="status doen" @click="golist" v-if="listtype">
          <img src="~/assets/talk-list.png" alt="" />
          <p v-if="totalnum">{{ totalnum }}</p>
        </div>
      </header>
      <div class="con">
        <p class="time">{{ time }}</p>
        <div class="conbox"></div>
      </div>
      <div class="nav">
        <div class="top">
          <p :class="txt ? 'active' : ''" @click="settxts">大家都在问</p>
          <a :href="'tel:' + stafftel">
            <p :class="teltype ? 'hid' : ''">电话咨询</p>
          </a>
        </div>
        <div class="bom">
          <input
            class="inu"
            type="text"
            v-model="talktxt"
            placeholder="在这输入内容"
          />
          <img src="~/assets/talk-icon.png" alt="" @click="seticons" />
          <img src="~/assets/talk-img.png" alt="" v-show="!msg" />
          <input type="file" id="upload" />
          <span v-if="msg" @click="send">发送</span>
        </div>
      </div>
      <div class="icons" v-if="icon">
        <img
          v-for="item in faces"
          :key="item.con"
          :src="item.img"
          alt
          @click="seticon(item.con)"
        />
      </div>
      <div class="words" v-if="txt">
        <div class="word">
          <div class="txt">
            <p
              v-if="type"
              class="showmsg"
              @click="settxt('您好，我想咨询项目详情？')"
            >
              您好，我想咨询项目详情？
            </p>
          </div>
          <div class="txt">
            <p
              v-if="type"
              class="showmsg"
              @click="settxt('您好，项目什么时候开盘？')"
            >
              您好，项目什么时候开盘？
            </p>
          </div>
          <div class="txt">
            <p v-if="type" class="showmsg" @click="settxt('首付大概是多少？')">
              首付大概是多少？
            </p>
          </div>
          <div class="txt">
            <p
              v-if="type"
              class="showmsg"
              @click="settxt('什么时候可以看房？')"
            >
              什么时候可以看房？
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="load" v-if="load">
      <p>正在发起聊天，请稍后...</p>
      <img src="~/assets/talk-load.gif" alt="" />
    </div>
    <van-popup
      v-model="show"
      position="center"
      :style="{ background: 'rgba(0,0,0,0)' }"
    >
      <div class="telboxs">
        <div class="top">
          <img src="~/assets/w-del.png" alt class="close" @click="ll" />
          <h5>免费领取资料</h5>
        </div>
        <div class="one" v-if="!isok">
          <input
            class="txt"
            type="text"
            placeholder="请输入手机号"
            v-model="tel"
          />
          <p class="xiyi">
            <input type="checkbox" v-model="check" />我已阅读并同意
            <nuxt-link :to="'/' + jkl + '/server'">《允家用户协议》</nuxt-link>
          </p>
          <button @click="sendmsg">确定</button>
        </div>
        <div class="two" v-if="isok">
          <p class="msg">验证码已发送到187****4376 请注意查看</p>
          <input
            class="txt"
            type="text"
            placeholder="请输入验证码"
            v-model="code"
          />
          <span @click="sendmsg">{{ message }}</span>
          <button @click="sure">确定</button>
        </div>
      </div>
    </van-popup>
    <van-popup
      v-model="show2"
      position="center"
      :style="{ background: 'rgba(0,0,0,0)' }"
    >
      <img style="width: 100vw" :src="bigimg" alt="" @click="show2 = false"
    /></van-popup>
  </div>
</template>
<script>
import { send, check, put } from "@/api/api";
export default {
  async asyncData(context) {
    let token = context.store.state.cookie.token;
    let jkl = context.params.name;
    return {
      jkl: jkl,
    };
  },
  head() {
    return {
      title: "允家新房",
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
      show2: false,
      bigimg: "",
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
      icon: false,
      type: true,
      txt: false,
      show: false,
      addtxt: "",
      addtxtnum: 0,
      teltype: false,
      cardtype: false,
      status: false,
      msg: false,
      talktxt: "",
      load: false,
      isok: false,
      tel: "",
      code: "",
      check: true,
      ws: "",
      page: 1,
      list: [],
      time: "",
      total: 0,
      userimg: "",
      staffimg: "",
      isover: true,
      staffname: "",
      totalnum: 0,
      usernum: 0,
      looknum: 0,
      rate: 0,
      stafftel: "400-718-6686",
      listtype: true,
      proid: 0,
      isnull: true,
      staffid: "",
      isonce: 0,
      message: "获取验证码",
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    settxt(k) {
      this.talktxt = k;
      this.txt = false;
    },
    send() {
      let img = require("~/assets/talk-peo.png");
      let msg = this.talktxt;
      let ll = this.talktxt;
      let that = this;
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
      let id = this.staffid || 152;
      let pp = {
        controller: "chat",
        action: "send",
        params: { content: ll, username: id },
      };
      this.ws.send(JSON.stringify(pp));
      let dv = document.createElement("div");
      dv.className = "peo alltxt";
      dv.innerHTML = `
          <img src="${img}" alt="" />
              <p class="txt">
                ${msg}
              </p>
        `;
      $(".con").append(dv);
      dv.scrollIntoView();
      this.talktxt = "";
    },
    seticon(con) {
      this.talktxt = this.talktxt + "face" + con;
      this.icon = false;
    },
    sendmsg() {
      if (!this.tel) {
        this.$toast("手机号不能为空");
        // this.toast("手机号不能为空");
        return;
      }
      let that = this;
      let pattern_phone = /^1[3-9][0-9]{9}$/;
      if (!pattern_phone.test(that.tel)) {
        this.$toast("手机号不正确");
        return;
      }
      if (!that.check) {
        this.$toast("请勾选用户协议");
        return;
      }
      if (!that.isnull) {
        return;
      }
      let ip = ip_arr["ip"];
      let city = $cookies.get("city");
      let txt = "聊天界面进客";
      let id = this.proid;
      let kid = sessionStorage.getItem("kid");
      let other = sessionStorage.getItem("other");
      put({
        ip: ip,
        page: 4,
        city: city,
        project: id,
        tel: that.tel,
        position: 32,
        page: 3,
        type: 9,
        kid: kid,
        other: other,
        source: "线上推广2",
        platform: 2,
        staff_id: sessionStorage.getItem("staffid"),
      }).then((res) => {
        console.log(res);
      });
      send({ phone: that.tel, channel: 2, ip: ip }).then((res) => {
        if (res.data.code == 200) {
          // that.isok = true;
          that.show = false;
          that.$toast("报名成功");
          let num = 60;
          that.isnull = false;
          let time = setInterval(() => {
            num--;
            if (num <= 0) {
              clearInterval(time);
              that.message = "获取验证码";
              that.isnull = true;
            } else {
              that.message = num + "秒后重发";
            }
          }, 1000);
        }
        console.log(res);
      });
    },
    sure() {},
    ll() {
      this.show = false;
    },
    golist() {
      this.$router.push("/" + this.jkl + "/talklist");
    },
    record(id, staffid) {
      let page = this.page;
      let pp = {
        controller: "chat",
        action: "history",
        params: { mine: id, customer: staffid, page: page, limit: 100 },
      };
      this.ws.send(JSON.stringify(pp));
    },
    loadbox(id, staffid = 0) {
      let pp = {
        controller: "chat",
        action: "index",
        params: { staff: staffid, customer: id, type: 0 },
      };
      this.ws.send(JSON.stringify(pp));
    },
    autotalk(id) {
      let pp = {
        controller: "chat",
        action: "auto",
        params: { uuid: id },
      };
      this.ws.send(JSON.stringify(pp));
    },
    putcard() {
      let id = this.staffid;
      let pp = {
        controller: "Staff",
        action: "info",
        params: { uuid: id },
      };
      if (id) {
        this.ws.send(JSON.stringify(pp));
      }
    },
    compare(key) {
      return function (value1, value2) {
        var val1 = value1[key];
        var val2 = value2[key];
        return val1 - val2;
      };
    },
    settxts() {
      this.txt = !this.txt;
      this.icon = false;
    },
    seticons() {
      this.icon = !this.icon;
      this.txt = false;
    },
  },
  created() {
    let that = this;
    for (let val in that.faces) {
      that.faces[val] = {
        img: require(`~/assets/${val}.gif`),
        con: that.faces[val],
      };
    }
  },
  mounted() {
    let that = this;
    this.load = true;
    $(".con").on("click", ".mfbtn", function () {
      that.show = true;
    });
    if (sessionStorage.getItem("islist")) {
      this.listtype = false;
    }
    if (sessionStorage.getItem("total")) {
      this.totalnum = parseInt(sessionStorage.getItem("total"));
    }
    this.ws = this.$store.state.ws;
    let id = localStorage.getItem("uuid");
    let proid = this.$route.params.id;
    that.staffid =
      sessionStorage.getItem(proid) || sessionStorage.getItem("staffid") || 0;
    setTimeout(() => {
      that.load = false;
      that.autotalk(id);
    }, 2000);
    this.ws.onopen = function () {
      that.loadbox(id, that.staffid);
      that.putcard();
    };
    if (this.ws.readyState == 1) {
      that.loadbox(id, that.staffid);
      that.putcard();
      if (that.staffid) {
      }
    }
    that.ws.onmessage = function (event) {
      // 0 5 0 1 11
      let data = JSON.parse(event.data);
      if (data.action == 305) {
        that.load = false;
        that.userimg = require("~/assets/talk-peo.png");
        that.staffimg = data.staff.head_img;
        that.staffname = data.staff.name;
        let pro = data.project_info;
        that.promsg = pro;
        if (pro.length !== 0) {
          that.proid = pro.id;
          $(".conbox").html("");
          that.record(id, that.staffid);
          this.load = true;
        }
      } else if (data.action == 303) {
        that.load = false;
        $(".conbox").html("");
        that.isover = true;
        let nn = 0;
        if (that.list.length == 0) {
          that.list = data.data.reverse();
          // that.list = data.data.reverse();
        } else {
          let list = data.data.reverse();
          // let list = data.data.reverse();
          nn = list.length - 1;
          // that.list = list;
          that.list = list.concat(that.list);
        }
        let dd = new Date();
        if (that.list[0]) {
          dd = new Date(that.list[0].createtime.replace(/\-/g, "/"));
        }
        let date = new Date();
        let time = date - dd;
        if (time / 1000 < 3600 * 24) {
          that.time =
            (dd.getHours() >= 10 ? dd.getHours() : "0" + dd.getHours()) +
            ":" +
            (dd.getMinutes() >= 10 ? dd.getMinutes() : "0" + dd.getMinutes());
        } else {
          that.time =
            dd.getFullYear() +
            "-" +
            (dd.getMonth() + 1 >= 10
              ? dd.getMonth() + 1
              : "0" + (dd.getMonth() + 1)) +
            "-" +
            (dd.getDate() >= 10 ? dd.getDate() : "0" + dd.getDate());
        }
        that.page = that.page + 1;
        that.total = data.total;
        that.list = that.list.reduce((cur, next) => {
          obj[next.id] ? "" : (obj[next.id] = true && cur.push(next));
          return cur;
        }, []);
        that.list.sort(that.compare("id"));
        for (let val of that.list) {
          let msg = val.content;
          if (msg == "%get your phone%") {
            let img = that.staffimg;
            let mm = require("~/assets/talk-tel.jpg");
            let dv = document.createElement("div");
            dv.className = "gettel alltxt";
            dv.innerHTML = `
            <div class="left">
              <img src="${img}" alt="" class="peoimg" />
            </div>
            <div class="telbox">
              <img src="${mm}" alt="" />
              <div class="telbox-bom">
                <p class="tit">为您制定专属分析报告</p>
                <p class="msg">
                  向咨询师免费领取专属分析报告,内附有购房 流程全盘解读
                </p>
                <button class="mfbtn">免费领取</button>
              </div>
            </div>
            `;
            $(".conbox").append(dv);
          } else if (msg == "%put my card%") {
            let img = that.staffimg;
            let dv = document.createElement("div");
            dv.className = "putcard alltxt";
            dv.innerHTML = `
            <div class="left">
              <img src="${img}" alt="" class="peoimg" />
            </div>
            <div class="cardbox">
              <div class="top">
                <div class="top-left">
                  <img src="${img}" alt="" />
                </div>
                <div class="top-right">
                  <h5>${that.staffname} <span>新房咨询</span></h5>
                  <p>从业咨询服务6年</p>
                </div>
              </div>
              <div class="bom">
                <div class="txt">
                  <p class="num"><span>${that.usernum}</span>人</p>
                  <p class="type">服务客户</p>
                </div>
                <div class="txt">
                  <p class="num"><span>${that.looknum}</span>次</p>
                  <p class="type">带看客户</p>
                </div>
                <div class="txt">
                  <p class="num"><span>${that.rate}</span>%</p>
                  <p class="type">好评率</p>
                </div>
              </div>
              <a href="tel:${that.stafftel}">
              <button>电话咨询</button>
              </a>
            </div>
            `;
            $(".conbox").append(dv);
          } else if (msg.indexOf("project_card") !== -1) {
            msg = JSON.parse(msg);
            let txt = `
                <img src="${that.userimg}" alt="" />
              <div class="pro">
                <img src="${msg.img}" alt="" />
                <div class="pro-msg">
                  <p class="name">${msg.name}</p>
                  <p class="area">建面 ${msg.area}/m²</p>
                  <p class="price">
                    均价<span><i>${msg.price}</i>元/m²</span>
                  </p>
                </div>
              </div>
              `;
            let dv = document.createElement("div");
            dv.innerHTML = txt;
            dv.className = "peo-pro alltxt";
            $(".conbox").append(dv);
          } else {
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
            let dv = document.createElement("div");
            if (val.from == id) {
              if (msg.indexOf("img:") !== -1) {
                let img = msg.substr(4);
                let kk = require("~/assets/talk-peo.png");
                dv.className = "imgbox alltxt";
                dv.innerHTML = `
                  <div class="left">
                  <img src="${kk}" alt="" class="peoimg" />
                </div>
                  <div class="right">
                    <img class="bigimg" src="${img}" alt="" />
                  </div>
                `;
              } else {
                let img = require("~/assets/talk-peo.png");
                dv.className = "peo alltxt";
                dv.innerHTML = `
                    <img src="${img}" alt="" />
                        <p class="txt">
                          ${msg}
                        </p>
                  `;
              }
            } else {
              if (msg.indexOf("img:") !== -1) {
                let img = msg.substr(4);
                let kk = that.staffimg;
                dv.className = "imgs alltxt";
                dv.innerHTML = `
                  <div class="left">
                  <img src="${kk}" alt="" class="peoimg" />
                </div>
                  <div class="right">
                    <img class="bigimg" src="${img}" alt="" />
                  </div>
                `;
              } else {
                let img = that.staffimg;
                dv.className = "you alltxt";
                dv.innerHTML = `
                      <div class="left">
                        <img src="${img}" alt="" />
                      </div>
                        <p class="txt">
                          ${msg}
                        </p>
                  `;
              }
            }
            $(".conbox").append(dv);
          }
        }
        let kk;
        let dds = document.getElementsByClassName("alltxt");
        if (that.page == 2) {
          kk = dds[dds.length - 1];
        } else {
          kk = dds[nn];
        }

        if (kk) {
          kk.scrollIntoView();
        }
      } else if (data.action == 301) {
        if (data.fromUserName.length < 10) {
          that.load = false;
        }
        if (
          (data.fromUserName == that.staffid ||
            !sessionStorage.getItem(that.proid)) &&
          String(data.fromUserName).length < 10
        ) {
          if (
            !sessionStorage.getItem(that.proid) &&
            data.fromUserName.length < 10 &&
            data.fromUserName !== that.staffid
          ) {
            sessionStorage.setItem("staffid", data.fromUserName);
            sessionStorage.setItem(that.proid, data.fromUserName);
            that.staffid = data.fromUserName;
            that.loadbox(id, that.staffid);
            that.page = 1;
          }
          console.log(data);
          let img = that.staffimg || require("~/assets/people.png");
          let msg = data.content;
          if (msg == "%get your phone%") {
            let mm = require("~/assets/talk-tel.jpg");
            let dv = document.createElement("div");
            dv.className = "gettel alltxt";
            dv.innerHTML = `
            <div class="left">
              <img src="${img}" alt="" class="peoimg" />
            </div>
            <div class="telbox">
              <img src="${mm}" alt="" />
              <div class="telbox-bom">
                <p class="tit">为您制定专属分析报告</p>
                <p class="msg">
                  向咨询师免费领取专属分析报告,内附有购房 流程全盘解读
                </p>
                <button class="mfbtn">免费领取</button>
              </div>
            </div>
            `;
            $(".conbox").append(dv);
            dv.scrollIntoView();
          } else if (msg == "%put my card%") {
            let mm = require("~/assets/talk-tel.jpg");
            let dv = document.createElement("div");
            dv.className = "putcard alltxt";
            dv.innerHTML = `
            <div class="left">
              <img src="${img}" alt="" class="peoimg" />
            </div>
            <div class="cardbox">
              <div class="top">
                <div class="top-left">
                  <img src="${img}" alt="" />
                </div>
                <div class="top-right">
                  <h5>${that.staffname} <span>新房咨询</span></h5>
                  <p>从业咨询服务6年</p>
                </div>
              </div>
              <div class="bom">
                <div class="txt">
                  <p class="num"><span>${that.usernum}</span>人</p>
                  <p class="type">服务客户</p>
                </div>
                <div class="txt">
                  <p class="num"><span>${that.looknum}</span>次</p>
                  <p class="type">带看客户</p>
                </div>
                <div class="txt">
                  <p class="num"><span>${that.rate}</span>%</p>
                  <p class="type">好评率</p>
                </div>
              </div>
              <a href="tel:${that.stafftel}">
              <button>电话咨询</button>
              </a>
            </div>
            `;
            $(".conbox").append(dv);
            dv.scrollIntoView();
          } else if (data.content.indexOf("img:") !== -1) {
            let dv = document.createElement("div");
            let img = data.content.substr(4);
            let kk = that.staffimg;
            dv.className = "imgs alltxt";
            dv.innerHTML = `
                <div class="left">
                  <img src="${kk}" alt="" class="peoimg" />
                </div>
                <div class="right">
                  <img class="bigimg" src="${img}" alt="" />
                </div>
              `;
            $(".conbox").append(dv);
            dv.scrollIntoView();
          } else if (data.content.indexOf("project_card") !== -1) {
            let msg = JSON.parse(data.content);
            let txt = `
                <img src="${that.userimg}" alt="" />
              <div class="pro">
                <img src="${msg.img}" alt="" />
                <div class="pro-msg">
                  <p class="name">${msg.name}</p>
                  <p class="area">建面 ${msg.area}/m²</p>
                  <p class="price">
                    均价<span><i>${msg.price}</i>元/m²</span>
                  </p>
                </div>
              </div>
              `;
            let dv = document.createElement("div");
            dv.innerHTML = txt;
            dv.className = "peo-pro alltxt";
            $(".conbox").append(dv);
            dv.scrollIntoView();
          } else {
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
            let dv = document.createElement("div");
            dv.className = "you alltxt";
            dv.innerHTML = `
              <div class="left">
                <img src="${img}" alt="" />
              </div>
                <p class="txt">
                  ${msg}
                  </p>
            `;
            $(".conbox").append(dv);
            dv.scrollIntoView();
          }
        } else {
          if (data.fromUserName.length < 10) {
            if (sessionStorage.getItem(data.fromUserName)) {
              sessionStorage.setItem(
                data.fromUserName,
                parseInt(sessionStorage.getItem(data.fromUserName)) + 1
              );
            } else {
              sessionStorage.setItem(data.fromUserName, 1);
            }
            if (
              sessionStorage.getItem("total") &&
              sessionStorage.getItem("total") != "NaN"
            ) {
              sessionStorage.setItem(
                "total",
                parseInt(sessionStorage.getItem("total")) + 1
              );
              that.totalnum = that.totalnum + 1;
            } else {
              sessionStorage.setItem("total", 1);
              that.totalnum = 1;
            }
          }
        }
      } else if (data.action == 206) {
        that.usernum = data.num.user_num;
        that.looknum = data.num.look_num;
        that.rate = data.num.rate;
        that.stafftel = data.staff.tel;
      }
    };
    $(".con").on("click", ".bigimg", function () {
      that.bigimg = $(this).attr("src");
      that.show2 = true;
    });

    let dds = document.getElementsByClassName("alltxt");
    let dd = dds[dds.length - 1];
    if (dd) {
      dd.scrollIntoView();
    }
    $("#foott").css("display", "none");
    this.$nextTick(() => {
      document
        .getElementById("upload")
        .addEventListener("change", function (e) {
          var file = event.currentTarget.files[0];
          if ((file.size / 1000).toFixed(0) < 800) {
            let r = new FileReader(); //本地预览
            r.onload = function (e) {
              var imgFile = e.target.result; //或e.target都是一样的
              let img = require("~/assets/talk-peo.png");
              let dv = document.createElement("div");
              dv.className = "imgbox alltxt";
              dv.innerHTML = `
                <img src="${img}" alt="" class="peoimg" />
                <div class="right">
                  <img class="bigimg" src="${imgFile}" alt="">
                </div>
              `;
              let ig = ``;
              $(".con").append(dv);
              dv.scrollIntoView();
              let ll = `img:${imgFile}`;
              let pp = {
                controller: "chat",
                action: "send",
                params: { content: ll, username: that.staffid },
              };
              that.ws.send(JSON.stringify(pp));
            };
            let base = r.readAsDataURL(file);
          } else {
            alert("请不要上传超过1M的图片");
          }
        });
    });
    $(".con").on("scroll", function () {
      if ($(this).scrollTop() == 0) {
        console.log(100 * that.page);
        if (that.isover && Math.ceil(that.total / 100) >= that.page) {
          that.isover = false;
          that.record(id, that.staffid);
        }
      }
    });
  },
  watch: {
    talktxt(val) {
      if (val.length > 0) {
        this.msg = true;
      } else {
        this.msg = false;
      }
    },
  },
  beforeDestroy() {
    sessionStorage.removeItem("islist");
  },
};
</script>
<style lang="less" scoped>
* {
  margin: 0;
}
.talk {
  display: flex;
  flex-direction: column;
  height: 100vh;
  /deep/ h5 {
    margin: 0;
  }
}
header {
  height: 2.75rem;
  line-height: 2.75rem;
  text-align: center;
  color: #19191a;
  font-size: 1.125rem;
  position: relative;
  z-index: 1;
  .back {
    width: 1.5rem;
    position: absolute;
    left: 1rem;
    margin-top: 0.5625rem;
  }
  .status {
    position: absolute;
    color: #191919;
    font-size: 0.8125rem;
    display: flex;
    align-items: center;
    top: 0;
    right: 1rem;
    p {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      background-color: #49e641;
      margin-right: 0.25rem;
    }
  }
  .doen {
    img {
      width: 1.5rem;
      height: 1.5rem;
      margin-top: 0.6rem;
    }
    p {
      background-color: #ff4040;
      width: 0.8125rem;
      height: 0.8125rem;
      border-radius: 50%;
      position: absolute;
      text-align: center;
      line-height: 0.8125rem;
      color: #fff;
      font-size: 0.625rem;
      top: 0.375rem;
      right: -0.375rem;
    }
  }
}

.con {
  flex: 1;
  width: 100%;
  padding: 0 4%;
  background-color: #f5f7f7;
  overflow-y: auto;
  .time {
    margin-top: 1.125rem;
    font-size: 0.75rem;
    text-align: center;
    color: #afafb3;
    margin-bottom: 1.25rem;
  }
  /deep/.you {
    display: flex;
    flex-direction: row;
    margin-bottom: 1.5rem;
    .left {
      width: 2.5rem;
      margin-right: 1rem;
      height: 2.5rem;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 2.5rem;
      }
    }
    .txt {
      color: #fff;
      font-size: 0.875rem;
      padding: 0.75rem 0.625rem;
      border-radius: 0.1875rem 0 0.1875rem 0.1875rem;
      background-color: #52c2cc;
      position: relative;
      bottom: -0.625rem;
      max-width: 14.5rem;
      display: flex;
      align-items: center;
      word-break: break-all;
      img {
        width: 1rem;
        height: 1rem;
        margin: 0 0.25rem;
      }
    }
    .txt::after {
      content: "";
      display: block;
      position: absolute;
      border: 0.375rem solid transparent;
      border-top-color: #52c2cc;
      top: 0;
      left: -0.1875rem;
    }
  }
  /deep/.peo {
    display: flex;
    flex-direction: row-reverse;
    margin-bottom: 1.5rem;
    img {
      width: 2.5rem;
      margin-left: 1rem;
      height: 2.5rem;
    }
    .txt {
      color: #323233;
      font-size: 0.875rem;
      padding: 0.75rem 0.625rem;
      border-radius: 0.1875rem 0 0.1875rem 0.1875rem;
      background-color: #e8eded;
      position: relative;
      bottom: -0.625rem;
      max-width: 14.5rem;
      img {
        width: 1rem;
        height: 1rem;
        margin: 0 0.25rem;
      }
    }
    .txt::after {
      content: "";
      display: block;
      position: absolute;
      border: 0.375rem solid transparent;
      border-top-color: #e8eded;
      top: 0;
      right: -0.1875rem;
    }
  }
  /deep/.peo-pro {
    display: flex;
    flex-direction: row-reverse;
    margin-bottom: 1.5rem;
    img {
      width: 2.5rem;
      margin-left: 1rem;
      height: 2.5rem;
    }
    .pro {
      width: 13.75rem;
      height: 12.5rem;
      border-radius: 0.375rem;
      overflow: hidden;
      background-color: #fff;
      img {
        width: 100%;
        height: 7.375rem;
        margin: 0;
      }
      .pro-msg {
        padding-left: 0.875rem;
        .name {
          color: #19191a;
          font-size: 0.9375rem;
          margin-bottom: 0.25rem;
          margin-top: 0.25rem;
        }
        .area {
          color: #969699;
          font-size: 0.75rem;
          margin-bottom: 0.25rem;
        }
        .price {
          color: #969699;
          font-size: 0.75rem;
          span {
            color: #ff5454;
            font-size: 0.625rem;
            i {
              font-style: normal;
              font-weight: bold;
              font-size: 1rem;
            }
          }
        }
      }
    }
  }
  /deep/.gettel {
    display: flex;
    flex-direction: row;
    margin-bottom: 1.5rem;
    .left {
      width: 2.5rem;
      margin-right: 1rem;
      height: 2.5rem;
      border-radius: 50%;
      overflow: hidden;
      .peoimg {
        width: 2.5rem;
      }
    }
    .telbox {
      width: 15rem;
      height: 14.375rem;
      border-radius: 0.375rem;
      overflow: hidden;
      background-color: #fff;
      img {
        width: 100%;
      }
      .telbox-bom {
        padding: 0 0.9375rem;
        .tit {
          color: #323232;
          font-size: 0.9375rem;
          margin-bottom: 0.375rem;
          margin-top: 0.25rem;
        }
        .msg {
          color: #999999;
          font-size: 0.6875rem;
          line-height: 0.9375rem;
        }
        button {
          margin-top: 0.625rem;
          width: 100%;
          height: 1.875rem;
          border-radius: 0.25rem;
          border: 0;
          outline: none;
          text-align: center;
          line-height: 1.875rem;
          background-color: #52c2cc;
          font-size: 0.75rem;
          color: #fff;
          font-weight: bold;
        }
      }
    }
  }
  /deep/.putcard {
    display: flex;
    flex-direction: row;
    margin-bottom: 1.5rem;
    .left {
      width: 2.5rem;
      margin-right: 1rem;
      height: 2.5rem;
      border-radius: 50%;
      overflow: hidden;
      .peoimg {
        width: 2.5rem;
      }
    }
    p {
      margin: 0;
    }
    .cardbox {
      width: 15rem;
      height: 10rem;
      border-radius: 0.375rem;
      background-color: #fff;
      padding: 0.9375rem;
      .top {
        display: flex;
        margin-bottom: 1rem;
        .top-left {
          width: 2.25rem;
          height: 2.25rem;
          margin-right: 0.625rem;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 2.25rem;
          }
        }
        .top-right {
          h5 {
            color: #1f1f1f;
            font-size: 0.875rem;
            font-weight: bold;
            position: relative;
            top: -0.125rem;
            span {
              color: #52c2cc;
              font-size: 0.6875rem;
              padding: 0.125rem 0.25rem;
              font-weight: 400;
              border-radius: 0.09375rem;
              background-color: #ebf9fa;
              margin-left: 0.3125rem;
            }
          }
          p {
            color: #646466;
            font-size: 0.75rem;
            margin-top: 0.125rem;
          }
        }
      }
      .bom {
        display: flex;
        margin-bottom: 0.75rem;
        .txt {
          width: 33%;
          .num {
            color: #121212;
            font-size: 0.625rem;
            padding-bottom: 0.25rem;
            border-right: 0.03125rem solid #f0f0f2;
            span {
              font-size: 1rem;
              font-weight: bold;
            }
          }
          .type {
            color: #646466;
            font-size: 0.6875rem;
            position: relative;
          }
        }
        .txt:nth-of-type(2) {
          text-align: center;
          width: 40%;
        }
        .txt:nth-of-type(3) {
          text-align: right;
          width: 27%;
          border: 0;
        }
      }
      button {
        width: 100%;
        height: 1.875rem;
        background-color: #52c2cc;
        text-align: center;
        line-height: 1.875rem;
        border-radius: 0.25rem;
        color: #fff;
        font-weight: bold;
        font-size: 0.75rem;
        border: 0;
        outline: none;
      }
    }
  }
  /deep/.imgbox {
    display: flex;
    flex-direction: row-reverse;
    margin-bottom: 1.5rem;
    .peoimg {
      width: 2.5rem;
      margin-left: 1rem;
      height: 2.5rem;
      border-radius: 50%;
    }
    .right {
      img {
        max-width: 7.5rem;
      }
    }
  }
  /deep/.imgs {
    display: flex;
    flex-direction: row;
    margin-bottom: 1.5rem;
    .peoimg {
      width: 2.5rem;
      margin-right: 1rem;
      height: 2.5rem;
      border-radius: 50%;
    }
    .right {
      img {
        max-width: 7.5rem;
      }
    }
  }
}
.nav {
  width: 100%;
  height: 6.625rem;
  background-color: #fff;
  padding: 0 4%;
  .top {
    color: #646466;
    font-size: 0.8125rem;
    display: flex;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    p {
      color: #646466;
      padding: 0.375rem 1rem;
      border-radius: 0.9375rem;
      border: 0.03125rem solid #cccccc;
      margin-right: 0.625rem;
    }
    .active {
      border-color: #51c1cb;
      color: #51c1cb;
    }
    .hid {
      border-color: #d9d9d9;
      color: #d9d9d9;
    }
  }
  .bom {
    display: flex;
    align-items: center;
    position: relative;
    .inu {
      background-color: #ebeded;
      width: 16.875rem;
      height: 2.5rem;
      border-radius: 0.25rem;
      border: 0;
      outline: none;
      padding-left: 0.9375rem;
      margin-right: 0.9375rem;
      font-size: 0.9375rem;
    }
    img {
      width: 1.75rem;
      height: 1.75rem;
    }
    img:nth-of-type(2) {
      margin-left: 1rem;
    }
    #upload {
      width: 1.75rem;
      height: 1.75rem;
      opacity: 0;
      position: absolute;
      right: 0;
    }
    span {
      width: 2.5rem;
      height: 2.125rem;
      border-radius: 0.25rem;
      line-height: 2.125rem;
      text-align: center;
      color: #fff;
      font-size: 0.875rem;
      background-color: #52c2cc;
      margin-left: 0.5rem;
      position: relative;
      z-index: 10;
    }
  }
}
.icons {
  padding: 1.5rem 4%;
  border-top: 0.03125rem solid #f2f2f2;
  height: 11.25rem;
  overflow-y: auto;
  img {
    width: 1.625rem;
    height: 1.625rem;
    margin-right: 1.1875rem;
    margin-bottom: 1.375rem;
  }
  img:nth-of-type(8n) {
    margin-right: 0;
  }
}
.words {
  padding: 0 4%;
  height: 13.75rem;
  .word {
    height: 13.25rem;
    overflow-y: auto;
    .txt {
      color: #313133;
      font-size: 0.8125rem;
      border-bottom: 0.03125rem solid #f2f2f2;
      .ll {
        display: flex;
        align-items: center;
      }
      .showmsg {
        padding: 1.25rem 0;
      }
      .tt {
        border: 0;
        outline: none;
        color: #313133;
        line-height: 1.1875rem;
        width: 19.5rem;
        font-size: 13px;
        padding: 1.25rem 0;
      }
      img {
        width: 1.5rem;
        height: 1.5rem;
      }
    }
  }
}
.addtxt {
  width: 19.6875rem;
  height: 17.5rem;
  border-radius: 0.375rem;
  box-shadow: 0px 0px 0.5625rem 0px rgba(51, 70, 87, 0.24);
  background-color: #fff;
  position: relative;
  img {
    position: absolute;
    width: 1rem;
    top: 1rem;
    right: 1rem;
  }
  h2 {
    color: #323233;
    font-size: 1.25rem;
    text-align: center;
    padding-top: 1.5rem;
    margin-bottom: 1.2rem;
  }
  textarea {
    width: 15.3125rem;
    height: 5.625rem;
    border-radius: 0.25rem;
    background-color: #f7f7f7;
    border: 0;
    outline: none;
    margin-left: 1.25rem;
    padding: 0.9375rem;
    margin-bottom: 1.4rem;
  }
  button {
    font-size: 0.9375rem;
    font-weight: bold;
    color: #fff;
    text-align: center;
    background-color: #51c1cb;
    border: 0;
    outline: none;
    width: 17.1875rem;
    height: 2.5rem;
    border-radius: 0.25rem;
    line-height: 2.5rem;
    margin-left: 1.25rem;
  }
  p {
    color: #7c7e7f;
    font-size: 0.75rem;
    position: absolute;
    right: 1.5rem;
    bottom: 6rem;
  }
}
.delmsg {
  width: 17.1875rem;
  height: 9.875rem;
  border-radius: 0.625rem;
  background-color: #fff;
  .tit {
    color: #333333;
    font-size: 1.125rem;
    text-align: center;
    padding-top: 1.25rem;
    margin-bottom: 1.125rem;
  }
  .msg {
    color: #7c7e7f;
    font-size: 1rem;
    text-align: center;
    margin-bottom: 1.5rem;
  }
  .bom {
    border-top: 0.03125rem solid #f7f7f7;
    display: flex;
    padding-top: 0.375rem;
    p {
      width: 50%;
      font-size: 1rem;
      color: #7d7d7f;
      text-align: center;
      line-height: 2.375rem;
    }
    .btn {
      border-left: 0.03125rem solid #f2f2f2;
      color: #51c1cb;
    }
  }
}
.load {
  width: 13.75rem;
  height: 6.25rem;
  border-radius: 0.375rem;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  left: 50%;
  margin-left: -6.875rem;
  top: 35vh;
  p {
    text-align: center;
    color: #fff;
    font-size: 1rem;
    padding-top: 1.375rem;
    margin-bottom: 1.125rem;
  }
  img {
    width: 2.25rem;
    position: relative;
    left: 50%;
    margin-left: -1.125rem;
  }
}
.telboxs {
  width: 18.125rem;
  height: 13.75rem;
  border-radius: 0.25rem;
  background-color: #fff;
  text-align: center;
  position: relative;
  .close {
    width: 0.875rem;
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
  h5 {
    color: #333333;
    font-size: 1.375rem;
    padding-top: 1.125rem;
    margin-bottom: 1.125rem;
  }
  .txt {
    width: 15rem;
    height: 3.125rem;
    border-radius: 0.25rem;
    border: 0;
    outline: none;
    background-color: #f7f7f7;
    margin-bottom: 0.625rem;
    padding-left: 0.625rem;
  }
  .xiyi {
    color: #626466;
    font-size: 0.6875rem;
    margin-bottom: 1.5rem;
    text-align: left;
    padding-left: 1.25rem;
    input {
      width: 0.6875rem;
      height: 0.6875rem;
      -webkit-appearance: none;
      border: 0.03125rem solid #e6e6e6;
      margin-right: 0.3125rem;
    }
    input:checked {
      background: url("~assets/checkbox_icon.png") no-repeat 50%;
      background-size: 90%;
    }
    a {
      color: #7495bd;
    }
  }
  button {
    width: 15.625rem;
    height: 2.5rem;
    border-radius: 0.25rem;
    text-align: center;
    line-height: 2.5rem;
    border: 0;
    background-color: #2ac66d;
    color: #fff;
    font-size: 0.875rem;
    font-weight: bold;
  }
  .msg {
    color: #999999;
    font-size: 0.6875rem;
    text-align: left;
    padding-left: 1.25rem;
    margin-bottom: 0.75rem;
  }
  .two {
    position: relative;
    .txt {
      margin-bottom: 1.3rem;
    }
    span {
      color: #7495bd;
      font-size: 1rem;
      position: absolute;
      right: 2rem;
      top: 2.5625rem;
    }
  }
}
</style>