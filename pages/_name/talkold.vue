<template>
  <div class="talk">
    <h2>
      <!-- <router-link :to="'/'+pinyin+'/content/'+id"> -->
      <img class="back" src="~/assets/backtalklist.png" alt @click="go" />
      <!-- </router-link> -->
      <span @click="clear">允家咨询师-{{staffname}}为您服务</span>
      <img class="morepeo" src="~/assets/talklist.png" alt @click="golist" />
      <i v-if="t3"></i>
    </h2>
    <div class="con" id="Con" @click="clearall">
      <p class="time">{{time}}</p>
      <div class="pro" v-if="buildtype">
        <div class="pro-right">
          <img src="~/assets/talkpeo.png" alt />
        </div>
        <div class="pro-left">
          <img :src="building.img" alt />
          <h5>{{building.name}}</h5>
          <span class="status">在售</span>
          <p>{{building.country}} {{building.area}}/m²</p>
          <p>
            均价
            <span>
              <i>{{building.price}}</i>元/m²
            </span>
          </p>
        </div>
      </div>
      <div :class="item.className+' alltxt'" v-for="(item,val) in cons" :key="val">
        <div :class="item.name1">
          <img :src="item.img" alt />
        </div>
        <div :class="item.name2">
          <p class="alltxt" v-html="item.con"></p>
          <span></span>
        </div>
      </div>
    </div>
    <div class="write">
      <div class="write-top">
        <span
          :class="promptnum == val ? 'active' : ''"
          v-for="(item,val) in prompt"
          :key="val"
          @click="setprompt(val)"
        >{{item}}</span>
      </div>
      <div class="write-bom">
        <input type="text" placeholder="输入您咨询内容" v-model="msg" />
        <img src="~/assets/icons.png" alt @click="seticonstag" />
        <img src="~/assets/imgs.png" alt v-if="!msg" />
        <input type="file" id="upload" v-show="!msg" />
        <span v-if="msg" @click="sendmsg">发送</span>
      </div>
    </div>
    <ul class="prompt" v-if="prompttag">
      <li @click="setmsg(item)" v-for="(item,val) in wens" :key="val">{{item}}</li>
    </ul>
    <div class="icons" v-if="iconstag">
      <img
        v-for="(item,key) in faces"
        :key="key"
        :src="item.img"
        alt
        @click="seticon(item.con,key)"
      />
    </div>
    <p class="tishi" v-if="tishi" @click="tishi = false">请上传小于2M的图片</p>
    <p class="tishi" v-if="t2">正在为您联系咨询师，请稍候....</p>
  </div>
</template>
<script>
import ReconnectingWebSocket from "reconnecting-websocket";
export default {
  data() {
    return {
      t3: false,
      t2: false,
      msg: "",
      lockReconnect: false,
      ws: "",
      heartCheck: {},
      prompt: ["大家都在问"],
      promptnum: 0,
      prompttag: false,
      tishi: false,
      iconstag: false,
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
      request: {},
      cons: [],
      db: {},
      store: {},
      building: {},
      buildtype: false,
      time: "",
      staffname: "",
      wens: [
        "您好，我想咨询项目详情？",
        "您好，项目什么时候开盘？",
        "首付大概是多少？",
        "现在有优惠吗？",
        "请问是毛坯还是精装？",
        "什么时候可以看房？",
      ],
      isover: true,
      txt: "",
      pinyin: "",
      id: "",
      img: require("~/assets/workerman.png"),
      timeover: false,
      timeout: "",
    };
  },
  head() {
    return {
      title: this.title || "允家新房-允家咨询师",
      meta: [
        {
          name: "description",
          content: this.description || "允家新房-允家咨询师",
        },
        {
          name: "keywords",
          content: this.keywords || "允家新房-允家咨询师",
        },
      ],
    };
  },
  methods: {
    // 172.26.185.173
    sendmsg() {
      let that = this;
      if (sessionStorage.getItem(sessionStorage.getItem("projectid"))) {
        if (!that.t2) {
          let img = require("~/assets/talkpeo.png");
          let msg = this.msg;

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
          dv.className = "usermsg";
          dv.innerHTML = `<div class="user-right">
                            <img src="${img}" alt="">
                        </div>
                        <div class="user-left"><p>${msg}</p><span></span></div>`;
          // that.request.onsuccess = function(e) {
          let db = that.request.result;
          console.log(db);
          let sid = sessionStorage.getItem(sessionStorage.getItem("projectid"));
          let transaction = db.transaction("staff" + sid, "readwrite");
          let store = transaction.objectStore("staff" + sid);
          // console.log(that.store.add({con:'1321'}))
          let addPersonRequest = store.add({
            className: "usermsg",
            con: msg,
            img: img,
            name1: "user-right",
            name2: "user-left",
          });
          addPersonRequest.onsuccess = function (e) {
            console.log(e.target.result);
          };
          // }

          $(".con").append(dv);
          dv.scrollIntoView();
          this.send(this.msg);
          this.msg = "";
        }
      } else {
        if (that.timeover) {
          let img = require("~/assets/talkpeo.png");
          let msg = this.msg;
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
          let dv = document.createElement("div");
          dv.className = "usermsg";
          dv.innerHTML = `<div class="user-right">
                            <img src="${img}" alt="">
                        </div>
                        <div class="user-left"><p>${msg}</p><span></span></div>`;

          $(".con").append(dv);
          dv.scrollIntoView();
          this.send(this.msg);
          this.msg = "";
        } else {
          this.t2 = true;
        }
      }
    },
    createwebsocket() {
      try {
        if ("WebSocket" in window) {
          this.ws = new ReconnectingWebSocket("ws://39.98.227.114:9501");
        } else if ("MozWebSocket" in window) {
          this.ws = new ReconnectingWebSocket("ws://39.98.227.114:9501");
        }
        localStorage.setItem("connectws", 1);
        this.init();
      } catch (e) {
        console.log(e);
      }
    },
    suiJiNum(digit) {
      if (digit == "" || isNaN(digit)) {
        console.log("请输入数字");
      } else {
        var sourceStr = "0,1,2,3,4,5,6,7,8,9";
        var arrStr = sourceStr.split(",");
        var result = ""; //定义变量并初始化
        var index = 0;
        for (let i = 0; i < digit; i++) {
          index = parseInt(Math.random() * arrStr.length);
          result += arrStr[index];
        }
        return result;
        console.log(result);
      }
    },
    init() {
      let that = this;
      //连接成功建立的回调方法
      this.ws.onopen = function (event) {
        // console.log(event)
        if (!localStorage.getItem("wskey")) {
          let key = that.suiJiNum(7);
          let ip = ip_arr["ip"];
          localStorage.setItem("wskey", key);
          let sign = ip + ":" + key;
          let actions = {
            //要发送的数据
            class: "Connect",
            action: "register",
            content: { sign: sign },
          };
          that.ws.send(JSON.stringify(actions));
          // console.log(key);
        }
        let peomsg = {
          //要发送的数据
          class: "Staff",
          action: "online_staffs",
        };
        if (localStorage.getItem("wskey")) {
          that.ws.send(JSON.stringify(peomsg));
        }
        //心跳检测重置
        that.heartCheck.reset().start();
      };

      //接收到消息的回调方法
      this.ws.onmessage = function (event) {
        // console.log("ws:收到一条消息", event.data);
        if (event.data != "connect success") {
          let data = JSON.parse(event.data);
          if (data.code != 500) {
            if (data.action == "talk") {
              let sid = sessionStorage.getItem(
                sessionStorage.getItem("projectid")
              );
              if (sid) {
                if (sid == data.content.id) {
                  that.t2 = false;
                  let img = data.content.avatar;
                  img = decodeURIComponent(img);
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
                  let dv = document.createElement("div");
                  dv.className = "worker";
                  dv.innerHTML = `<div class="worker-left">
                      <img src="${img}" alt />
                    </div>
                    <div class="worker-right">
                      <p>${msg}</p>
                      <span></span>
                    </div>`;
                  $(".con").append(dv);
                  sessionStorage.setItem("lastone", msg);
                  let db = that.request.result;
                  let transaction = db.transaction("staff" + sid, "readwrite");
                  let store = transaction.objectStore("staff" + sid);
                  let addPersonRequest = store.add({
                    className: "worker",
                    con: msg,
                    img: img,
                    name1: "worker-left",
                    name2: "worker-right",
                  });
                  addPersonRequest.onsuccess = function (e) {
                    console.log(e.target.result);
                  };
                  dv.scrollIntoView();
                } else {
                  // let other = [];
                  // other.push(data.content);
                  // other = JSON.stringify(other);
                  var indexedDB =
                    window.indexedDB ||
                    window.webkitIndexedDB ||
                    window.mozIndexedDB ||
                    window.msIndexedDB;
                  let request = indexedDB.open("staffmsg", 2);
                  request.onupgradeneeded = function (e) {
                    let db = e.target.result;
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
                      objectStore.createIndex("projectid", "projectid", {
                        unique: false,
                      });
                      objectStore.createIndex("txt", "txt", {
                        unique: false,
                      });
                      objectStore.createIndex("type", "type", {
                        unique: false,
                      });
                      objectStore.createIndex("num", "num", {
                        unique: false,
                      });
                    }
                  };
                  request.onsuccess = function (e) {
                    let db = request.result;
                    let transaction = db.transaction("staffmsg", "readwrite");
                    let store = transaction.objectStore("staffmsg");
                    var index = store.index("sid");
                    var search = index.get(data.content.id);
                    let img = data.content.avatar;
                    img = decodeURIComponent(img);
                    search.onsuccess = function (e) {
                      let result = e.target.result;
                      if (result) {
                        let time = new Date().toLocaleTimeString();
                        let timenum = Date.parse(new Date());
                        that.t3 = true;
                        result.txt = data.content.content;
                        result.type = 1;
                        result.time = time;
                        result.num = timenum;
                        let response = store.put(result);
                        response.onsuccess = function () {
                          var index =
                            window.indexedDB ||
                            window.webkitIndexedDB ||
                            window.mozIndexedDB ||
                            window.msIndexedDB;
                          let req = index.open("staff" + data.content.id, 2);
                          req.onupgradeneeded = function (e) {
                            let db = e.target.result;
                            if (
                              !db.objectStoreNames.contains(
                                "staff" + data.content.id
                              )
                            ) {
                              let objectStore = db.createObjectStore(
                                "staff" + data.content.id,
                                {
                                  keyPath: "id",
                                  autoIncrement: true,
                                }
                              );
                              objectStore.createIndex(
                                "classname",
                                "classname",
                                {
                                  unique: true,
                                }
                              );
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
                            console.log("store is created");
                          };
                          req.onsuccess = function (e) {
                            let db = req.result;
                            let tran = db.transaction(
                              "staff" + data.content.id,
                              "readwrite"
                            );
                            let store = tran.objectStore(
                              "staff" + data.content.id
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
                            let addPersonRequest = store.add({
                              className: "worker",
                              con: msg,
                              img: img,
                              name1: "worker-left",
                              name2: "worker-right",
                            });
                          };
                        };
                        response.onerror = function (e) {
                          console.log("数据更新失败");
                        };
                      } else {
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
                              !db.objectStoreNames.contains(
                                "staff" + data.content.id
                              )
                            ) {
                              let objectStore = db.createObjectStore(
                                "staff" + data.content.id,
                                {
                                  keyPath: "id",
                                  autoIncrement: true,
                                }
                              );
                              objectStore.createIndex(
                                "classname",
                                "classname",
                                {
                                  unique: true,
                                }
                              );
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
                            console.log("store is created");
                          };
                          req.onsuccess = function (e) {
                            let db = req.result;
                            let tran = db.transaction(
                              "staff" + data.content.id,
                              "readwrite"
                            );
                            let store = tran.objectStore(
                              "staff" + data.content.id
                            );

                            let addPersonRequest = store.add({
                              className: "worker",
                              con: data.content.content,
                              img: img,
                              name1: "worker-left",
                              name2: "worker-right",
                            });
                          };
                        };
                      }
                    };
                  };
                }
              } else {
                that.t2 = false;
                let img = data.content.avatar;
                img = decodeURIComponent(img);
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
                let dv = document.createElement("div");
                dv.className = "worker";
                dv.innerHTML = `<div class="worker-left">
                      <img src="${img}" alt />
                    </div>
                    <div class="worker-right">
                      <p>${msg}</p>
                      <span></span>
                    </div>`;
                $(".con").append(dv);
                sessionStorage.setItem("lastone", msg);
                dv.scrollIntoView();
              }
            } else if (data.action == "register") {
              localStorage.setItem("wstoken", data.content.token);
              if (sessionStorage.getItem("projectid")) {
                that.getpro();
              }
              if (
                !sessionStorage.getItem(sessionStorage.getItem("projectid"))
              ) {
                console.log("I have sid");
                let actions;
                if (localStorage.getItem("projectid")) {
                  actions = {
                    //要发送的数据
                    class: "Info",
                    action: "distribute",
                    content: {
                      token: localStorage.getItem("wstoken"),
                      project: localStorage.getItem("projectid"),
                    },
                  };
                } else {
                  actions = {
                    //要发送的数据
                    class: "Info",
                    action: "distribute",
                    content: {
                      token: localStorage.getItem("wstoken"),
                      city: localStorage.getItem("city"),
                    },
                  };
                }
                if (!sessionStorage.getItem("scid")) {
                  that.ws.send(JSON.stringify(actions));
                }
              }
            } else if (data.action == "online_staffs") {
              // $cookies.set("staffs", data.content);
              if (
                data.content.indexOf(
                  sessionStorage.getItem(sessionStorage.getItem("projectid"))
                ) == -1 &&
                sessionStorage.getItem(sessionStorage.getItem("projectid"))
              ) {
                that.t2 = false;
                that.send("客户已经上线");
              }
              if (
                data.content.indexOf(
                  sessionStorage.getItem(sessionStorage.getItem("projectid"))
                ) != -1 &&
                sessionStorage.getItem(sessionStorage.getItem("projectid"))
              ) {
                that.t2 = false;
              }
              if (sessionStorage.getItem(sessionStorage.getItem("projectid"))) {
                that.test(
                  sessionStorage.getItem(sessionStorage.getItem("projectid"))
                );
              }
            } else if (data.content.action == "connect") {
              sessionStorage.setItem("fd", data.content.fd);
              if (
                !sessionStorage.getItem(sessionStorage.getItem("projectid"))
              ) {
                console.log("I have sid");
                let actions;
                if (localStorage.getItem("projectid")) {
                  actions = {
                    //要发送的数据
                    class: "Info",
                    action: "distribute",
                    content: {
                      token: localStorage.getItem("wstoken"),
                      project: localStorage.getItem("projectid"),
                    },
                  };
                } else {
                  actions = {
                    //要发送的数据
                    class: "Info",
                    action: "distribute",
                    content: {
                      token: localStorage.getItem("wstoken"),
                      city: localStorage.getItem("city"),
                    },
                  };
                }
                that.ws.send(JSON.stringify(actions));
              }
            } else if (data.action == "project" && data.code == 200) {
              let img = require("~/assets/talkpeo.png");
              let msg = data.content;
              let dv = document.createElement("div");
              dv.className = "pro";
              dv.innerHTML = `<div class="pro-right">
                  <img src="${img}" alt />
                </div>
                <div class="pro-left">
                  <img src="${msg.img}" alt />
                  <h5>${msg.name}</h5>
                  <span class="status">在售</span>
                  <p>${msg.country} ${msg.area}/m²</p>
                  <p>
                    均价
                    <span>
                      <i>${msg.price}</i>元/m²
                    </span>
                  </p>
                </div>`;
              // $(".con").prepend(dv);
              // $('.time').after(dv)
              sessionStorage.setItem("buildname", msg.name);
              that.building = msg;
              that.buildtype = true;
            } else if (data.action == "online") {
              if (
                sessionStorage.getItem(sessionStorage.getItem("projectid")) ==
                data.content.sid
              ) {
                that.t2 = false;
              }
              if (
                !sessionStorage.getItem(sessionStorage.getItem("projectid"))
              ) {
                that.t2 = false;
                let sid = data.content.sid;
                let img = data.content.staff.head_img;
                img = decodeURIComponent(img);
                sessionStorage.setItem("staff" + sid, img);
                sessionStorage.setItem("sid", sid);
                sessionStorage.setItem(
                  sessionStorage.getItem("projectid"),
                  sid
                );
                // console.log(sid, img, decodeURIComponent(img));
                let name = "小" + data.content.staff.name.substr(0, 1);
                sessionStorage.setItem("staffname", name);
                that.staffname = sessionStorage.getItem("staffname");
                that.test(sid);
              }
            } else if (data.action == "send") {
              let img = that.img;
              let msg = data.content;
              let dv = document.createElement("div");
              dv.className = "worker";
              dv.innerHTML = `<div class="worker-left">
                  <img src="${img}" alt />
                </div>
                <div class="worker-right">
                  <p>${msg}</p>
                  <span></span>
                </div>`;
              $(".con").append(dv);
              dv.scrollIntoView();
            }
          } else {
            let key = localStorage.getItem("wskey");
            let ip = ip_arr["ip"];
            let sign = ip + ":" + key;
            let actions = {
              //要发送的数据
              class: "Connect",
              action: "register",
              content: { sign: sign },
            };
            that.ws.send(JSON.stringify(actions));
          }
        }
        that.heartCheck.reset().start();
      };

      //连接发生错误的回调方法
      // this.ws.onerror = function(event) {
      //   // console.log("ws:发生错误");
      //   that.reconnect();
      // };

      // //连接关闭的回调方法
      // this.ws.onclose = function(event) {
      //   // console.log("ws:已关闭");
      //   // that.heartCheck.reset(); //心跳检测
      //   // that.reconnect();
      // };

      // //监听窗口关闭事件，当窗口关闭时，主动去关闭ws连接，防止连接还没断开就关闭窗口，server端会抛异常。
      // window.onbeforeunload = function() {
      //   this.ws.close();
      // };

      // //关闭连接
      // function closews() {
      //   this.ws.close();
      // }

      // //发送消息
      // function send(message) {
      //   this.ws.send(message);
      // }
    },
    reconnect() {
      var tt;
      if (this.lockReconnect) {
        return;
      }
      this.lockReconnect = true;
      tt && clearTimeout(tt);
      let that = this;
      tt = setTimeout(function () {
        console.log("重连中...");
        that.lockReconnect = false;
        that.createwebsocket();
      }, 5000);
    },
    send(msg) {
      let token = localStorage.getItem("wstoken");
      let sid = sessionStorage.getItem(sessionStorage.getItem("projectid"))
        ? sessionStorage.getItem(sessionStorage.getItem("projectid"))
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
    setprompt(key) {
      // if (this.promptnum == key) {
      //   this.prompttag = false;
      // } else {
      //   this.promptnum = key;
      //   this.prompttag = true;
      // }
      if (this.prompttag) {
        this.prompttag = false;
        $(".write").css({ position: "fixed", bottom: "0" });
      } else {
        $(".write").css({ position: "fixed", bottom: "14.25rem" });
        this.prompttag = true;
      }
      this.iconstag = false;
    },
    clearall() {
      this.prompttag = false;
      this.iconstag = false;
      $(".write").css({ position: "fixed", bottom: "0" });
    },
    setmsg(item) {
      this.msg = item;
      this.prompttag = false;
      $(".write").css({ position: "fixed", bottom: "0" });
    },
    seticonstag() {
      if (this.iconstag) {
        this.iconstag = false;
        $(".write").css({ position: "fixed", bottom: "0" });
      } else {
        this.iconstag = true;
        $(".write").css({ position: "fixed", bottom: "14.25rem" });
      }
      this.prompttag = false;
    },
    seticon(con, key) {
      this.msg = this.msg + "face" + con;
      this.iconstag = false;
      $(".write").css({ position: "fixed", bottom: "0" });
    },
    getpro() {
      let options = {
        //要发送的数据
        class: "Info",
        action: "project",
        content: {
          token: localStorage.getItem("wstoken"),
          Id: sessionStorage.getItem("projectid"),
        },
      };
      this.ws.send(JSON.stringify(options));
    },
    go() {
      // this.$router.push("/" + this.$route.params.name + "/talklist");
      let id = sessionStorage.getItem("projectid");
      let k = $cookies.get("pinyin");
      this.pinyin = k;
      this.id = id;
      if (sessionStorage.getItem("reconnect")) {
        window.location.href = sessionStorage.getItem("reconnect")+'?token='+localStorage.getItem('wstoken');
      } else {
        if (sessionStorage.getItem("wxurl")) {
          let kk = sessionStorage.getItem("wxurl");
          this.$router.push(`/${k}/content/${id}?${kk}`);
        } else {
          // this.$router.push(`/${k}/content/${id}`);
          window.location.href=`/${k}/content/${id}`
        }
      }

      // window.location.href = `/${k}/content/${id}`;
    },
    golist() {
      this.$router.push("/" + this.$route.params.name + "/talklist");
      // let name = this.$route.params.name
      // window.location.href=`/${name}/talklist`
    },
    test(id) {
      let that = this;
      let indexedDB =
        window.indexedDB ||
        window.webkitIndexedDB ||
        window.mozIndexedDB ||
        window.msIndexedDB;
      let db;
      if (!indexedDB) {
        alert("不支持");
      }
      let request = indexedDB.open("staff" + id, 2);
      this.request = request;
      request.onupgradeneeded = function (e) {
        db = e.target.result;
        if (!db.objectStoreNames.contains("staff" + id)) {
          let objectStore = db.createObjectStore("staff" + id, {
            keyPath: "id",
            autoIncrement: true,
          });
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
        console.log("store is created");
      };
      request.onsuccess = function (e) {
        db = request.result;
        let transaction = db.transaction("staff" + id, "readwrite");
        let store = transaction.objectStore("staff" + id);
        // 取出所有数据
        let all = store.getAll();
        all.onsuccess = function () {
          that.cons = all.result;
        };
      };
      request.onerror = function (e) {
        console.log("false");
      };
    },
    clear() {
      if (sessionStorage.getItem("clearnum")) {
        if (sessionStorage.getItem("clearnum") > 2) {
          localStorage.clear();
          sessionStorage.setItem("clearnum", 1);
        } else {
          sessionStorage.setItem(
            "clearnum",
            Number(sessionStorage.getItem("clearnum")) + 1
          );
        }
      } else {
        sessionStorage.setItem("clearnum", 1);
      }
    },
  },
  updated() {
    let dds = document.getElementsByClassName("alltxt");
    let dd = dds[dds.length - 1];
    if (dd) {
      dd.scrollIntoView();
    }
  },
  mounted() {
    let url = window.location.href;
    url = url.split("?")[1];
    if (url && url.indexOf("reconnect") != -1) {
      console.log(decodeURIComponent(url.split("=")[1]));
      let arr = decodeURIComponent(url.split("=")[1]).split("?");
      sessionStorage.setItem("reconnect", arr[0]);
      console.log(arr[1]);
      sessionStorage.setItem("projectid", arr[1].split("&")[0].split("=")[1]);
      localStorage.setItem("projectid", arr[1].split("&")[0].split("=")[1]);
      sessionStorage.setItem("bulidname", arr[1].split("&")[1].split("=")[1]);
    }
    let that = this;
    that.t2 = true;
    this.timeout = setTimeout(() => {
      if (that.t2) {
        that.timeover = true;
        that.t2 = false;
        // let img = this.img;
        // let msg =
        //   "暂时无业务员在线，请拨打电话400-966-9995咨询,或者回复您的电话，业务员会尽快联系您";
        // let dv = document.createElement("div");
        // dv.className = "worker";
        // dv.innerHTML = `<div class="worker-left">
        //           <img src="${img}" alt />
        //         </div>
        //         <div class="worker-right">
        //           <p>${msg}</p>
        //           <span></span>
        //         </div>`;
        // $(".con").append(dv);
        // dv.scrollIntoView();
        that.send("客户已上线");
      }
    }, 10000);
    this.pinyin = $cookies.get("pinyin");
    this.id = sessionStorage.getItem("projectid");
    if (sessionStorage.getItem(sessionStorage.getItem("projectid"))) {
      this.staffname = sessionStorage.getItem("staffname");
    }
    if (
      localStorage.getItem("projectid") &&
      !sessionStorage.getItem("projectid")
    ) {
      sessionStorage.setItem("projectid", localStorage.getItem("projectid"));
    }

    // if (sessionStorage.getItem("sid")) {
    //   this.test(sessionStorage.getItem("sid"));
    // }
    var myDate = new Date();
    this.time = myDate.toLocaleTimeString();
    sessionStorage.setItem("talktime", myDate.toLocaleTimeString());
    let timenum = Date.parse(new Date());
    for (let val in that.faces) {
      that.faces[val] = {
        img: require(`~/assets/${val}.gif`),
        con: that.faces[val],
      };
    }
    setTimeout(() => {
      if (localStorage.getItem("projectid")) {
        that.getpro();
      }
    }, 300);
    document.getElementById("upload").addEventListener("change", function (e) {
      var file = event.currentTarget.files[0];
      if ((file.size / 1000).toFixed(0) < 2000) {
        let r = new FileReader(); //本地预览
        r.onload = function (e) {
          var imgFile = e.target.result; //或e.target都是一样的
          let img = require("~/assets/talkpeo.png");
          let dv = document.createElement("div");
          dv.className = "usermsg";
          dv.innerHTML = `<div class="user-right">
                                <img src="${img}" alt="">
                            </div>
                            <div class="user-left"><img src=${imgFile}><span></span></div>`;
          let ig = ``;
          $(".con").append(dv);
          dv.scrollIntoView();
          let db = that.request.result;
          let sid = sessionStorage.getItem("sid");
          let transaction = db.transaction("staff" + sid, "readwrite");
          let store = transaction.objectStore("staff" + sid);
          let addPersonRequest = store.add({
            className: "usermsg",
            con: `<img src=${imgFile}>`,
            img: img,
            name1: "user-right",
            name2: "user-left",
          });

          that.send(`img[${imgFile}]`);
        };
        let base = r.readAsDataURL(file);
      } else {
        that.tishi = true;
        setTimeout(function () {
          that.tishi = false;
        }, 1500);
      }
    });

    //resize：屏幕的大小发生改变就触发监听事件resetrem
    // let height = document.querySelector("html").getBoundingClientRect().height;
    // localStorage.setItem("height", height);
    // window.addEventListener("resize", resetrem);
    // function resetrem() {
    //   var html = document.querySelector("html"); //获取到html元素
    //   var width = html.getBoundingClientRect().height; //获取屏幕的宽度
    //   if (width == localStorage.getItem("height")) {
    //     $(".write").css({ position: "relative", bottom: "0" });
    //   } else {
    //     $(".write").css({ position: "fixed", bottom: "0" });
    //   }
    // }
    this.heartCheck = {
      timeout: 5000,
      timeoutObj: null,
      serverTimeoutObj: null,
      reset: function () {
        clearTimeout(this.timeoutObj);
        clearTimeout(this.serverTimeoutObj);
        return this;
      },
      start: function () {
        var self = this;
        this.timeoutObj && clearTimeout(this.timeoutObj);
        this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
        this.timeoutObj = setTimeout(function () {
          //这里发送一个心跳，后端收到后，返回一个心跳消息，
          //onmessage拿到返回的心跳就说明连接正常
          if (that.isover) {
            that.ws.send("PING");
            // console.log("ping");
            self.serverTimeoutObj = setTimeout(function () {
              // 如果超过一定时间还没重置，说明后端主动断开了
              // console.log("关闭服务");
              // that.reconnect(); //如果onclose会执行reconnect，我们执行 websocket.close()就行了.如果直接执行 reconnect 会触发onclose导致重连两次
            }, self.timeout);
          }
        }, this.timeout);
      },
    };

    this.createwebsocket();
    function test(id) {
      var indexedDB =
        window.indexedDB ||
        window.webkitIndexedDB ||
        window.mozIndexedDB ||
        window.msIndexedDB;
      var db;
      if (!indexedDB) {
        alert("不支持");
      }
      let request = indexedDB.open("staff" + id, 2);
      that.request = request;
      console.log(request, that.request);
      request.onupgradeneeded = function (e) {
        db = e.target.result;
        that.db = db;
        console.log(that.db);
        if (!db.objectStoreNames.contains("staff" + id)) {
          var objectStore = db.createObjectStore("staff" + id, {
            keyPath: "id",
            autoIncrement: true,
          });
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
        console.log("store is created");
      };
      request.onsuccess = function (e) {
        db = request.result;
        that.db = request.result;
        var transaction = db.transaction("staff" + id, "readwrite");
        var store = transaction.objectStore("staff" + id);
        that.store = store;
        // 取出所有数据
        var all = store.getAll();
        all.onsuccess = function () {
          console.log(all.result);
          that.cons = all.result;
        };
      };
      request.onerror = function (e) {
        console.log("false");
      };
    }
  },
  watch: {
    msg(val) {
      console.log(val);
    },
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
    if (sessionStorage.getItem("sid")) {
      let that = this;
      this.isover = false;
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
          objectStore.createIndex("projectid", "projectid", {
            unique: false,
          });
          objectStore.createIndex("txt", "txt", {
            unique: false,
          });
          objectStore.createIndex("type", "type", {
            unique: false,
          });
          objectStore.createIndex("num", "num", {
            unique: false,
          });
        }
      };
      request.onsuccess = function (e) {
        db = request.result;
        var transaction = db.transaction("staffmsg", "readwrite");
        var store = transaction.objectStore("staffmsg");
        var index = store.index("sid");
        let sid = sessionStorage.getItem(sessionStorage.getItem("projectid"));
        // sessionStorage.removeItem("sid");
        let name = sessionStorage.getItem("staffname");
        var myDate = new Date();
        let time = myDate.toLocaleTimeString();
        let timenum = Date.parse(new Date());
        // sessionStorage.removeItem("staffname");
        // sessionStorage.removeItem("talktime");
        var search = index.get(sid);
        search.onsuccess = function (e) {
          let result = e.target.result;
          if (result) {
            let txt = sessionStorage.getItem("lastone");
            result.txt = txt;
            result.time = time;
            result.type = 0;
            result.num = timenum;
            store.put(result);
          } else {
            let staff = {};
            staff.name = name;
            staff.sid = sid;
            staff.img = sessionStorage.getItem("staff" + sid);
            staff.time = time;
            staff.buildname = sessionStorage.getItem("buildname");
            staff.projectid = sessionStorage.getItem("projectid");
            staff.txt = sessionStorage.getItem("lastone");
            staff.type = 0;
            staff.num = timenum;
            // 添加
            var addPersonRequest = store.add(staff);
            addPersonRequest.onsuccess = function (e) {
              console.log(e.target.result);
            };
          }
        };
      };
      request.onerror = function (e) {
        console.log("false");
      };
      this.ws.close();
    }
  },
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
}
.talk {
  height: 100vh;
}
.talk >>> p {
  margin-bottom: 0;
}
.talk {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
h2 {
  height: 2.933333rem;
  width: 100%;
  text-align: center;
  position: fixed;
  background-color: #fff;
  z-index: 10;
}
h2 .back {
  float: left;
  margin: 3.4% 0 0 4%;
  width: 5.4%;
}
h2 span {
  color: #303033;
  font-size: 1.2rem;
  line-height: 2.933333rem;
}
h2 .morepeo {
  width: 6.4%;
  margin: 2.6% 4% 0 0;
  float: right;
}
h2 i {
  position: absolute;
  display: block;
  width: 0.8125rem;
  height: 0.8125rem;
  border-radius: 50%;
  text-align: center;
  line-height: 0.8125rem;
  font-size: 0.625rem;
  color: #fff;
  background-color: #f34f4f;
  top: 0.5rem;
  right: 0.75rem;
  font-style: normal;
}
.con {
  background-color: #f5f5f5;
  /* flex: 1; */
  height: 100vh;
  width: 100%;
  overflow-y: auto;
}
.write {
  width: 100%;
  height: 6.533333rem;
  background-color: #fff;
  position: fixed;
  bottom: 0;
}
.write .write-top {
  padding: 0.666667rem 4% 0 4%;
  overflow: hidden;
}
.write .write-top span {
  color: #7d7d80;
  font-size: 0.82rem;
  float: left;
  padding: 0.466667rem 0.533333rem;
  border: 0.5px solid #d9d9d9;
  border-radius: 1.3rem;
  margin-left: 2.1%;
}
.write .write-top span:nth-of-type(1) {
  margin-left: 0;
}
.write .write-top span.active {
  color: #3fa1f2;
  border: 1px solid #3fa1f2;
}
.write .write-bom {
  padding: 0 4%;
  margin-top: 10px;
  position: relative;
}
.write .write-bom input[type="text"] {
  width: 69.333%;
  height: 2.5rem;
  border: 0;
  background-color: #f2f2f5;
  padding-left: 0.933333rem;
  border-radius: 0.266667rem;
  color: #646466;
  font-size: 1rem;
}
.write .write-bom input[type="file"] {
  position: absolute;
  right: 5%;
  bottom: 0.375rem;
  width: 1.875rem;
  height: 1.875rem;
  overflow: hidden;
  opacity: 0;
}
.write-bom img {
  width: 1.733333rem;
  margin-left: 4.8%;
}
.write-bom span {
  display: inline-block;
  width: 2.5rem;
  height: 2.125rem;
  border-radius: 0.25rem;
  line-height: 2.125rem;
  text-align: center;
  color: #fff;
  font-size: 0.875rem;
  background-color: #3fa1f2;
  margin-left: 0.6875rem;
}
.con {
  padding: 2.933333rem 0 6.533333rem 0;
}
.con .time {
  width: 100%;
  text-align: center;
  color: #afafb3;
  font-size: 0.8rem;
  padding: 1.333333rem 0;
}
.con >>> .pro {
  margin-bottom: 1.666667rem;
  display: flex;
  flex-direction: row-reverse;
  padding-right: 4%;
}
.con >>> .pro .pro-left {
  width: 58.667%;
  border-radius: 0.533333rem;
  overflow: hidden;
  box-shadow: 0px 2.5px 6px 0px rgba(0, 0, 0, 0.05);
  position: relative;
  padding-bottom: 0.4rem;
  background-color: #fff;
}
.con >>> .pro .pro-left img {
  width: 100%;
  height: 8.375rem;
}
.con >>> .pro .pro-left h5 {
  color: #545557;
  font-size: 1.133333rem;
  width: 7.6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: bold;
  margin-top: 0.8rem;
  padding-left: 0.666667rem;
  margin-bottom: 0.5rem;
}
.con >>> .pro .pro-left .status {
  display: block;
  width: 2rem;
  height: 1.066667rem;
  text-align: center;
  line-height: 1.066667rem;
  border-radius: 0.133333rem;
  background-color: #29cc72;
  color: #fff;
  font-size: 0.8rem;
  position: absolute;
  right: 0.666667rem;
  top: 9.46666667rem;
}
.con >>> .pro .pro-left p {
  color: #969699;
  font-size: 0.8rem;
  padding-left: 0.666667rem;
  margin-bottom: 0.1875rem;
}
.con >>> .pro .pro-left p span {
  color: #ff6a48;
}
.con >>> .pro .pro-left p span i {
  font-style: normal;
  font-size: 1rem;
  font-weight: bold;
}
.con >>> .pro .pro-right {
  margin-left: 0.625rem;
  width: 2.5rem;
}
.con >>> .pro .pro-right img {
  width: 100%;
}
.con >>> .usermsg {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: row-reverse;
  padding-right: 4%;
}
.con >>> .usermsg .user-right {
  width: 2.5rem;
  margin-left: 0.8125rem;
}
.con >>> .usermsg .user-right img {
  width: 100%;
}
.con >>> .usermsg .user-left {
  color: #f2f2f2;
  font-size: 0.875rem;
  background-color: #3fa1f2;
  border-radius: 0.1875rem;
  max-width: 14.75rem;
  padding: 0.5625rem 0.625rem;
  position: relative;
  margin-top: 0.625rem;
}
.con >>> .usermsg .user-left img {
  max-width: 100%;
}
.con >>> .usermsg .user-left p {
  line-height: 1.3125rem;
}
.con >>> .usermsg .user-left span {
  display: block;
  position: absolute;
  border: 0.375rem solid transparent;
  border-top-color: #3fa1f2;
  top: 0;
  right: -0.3125rem;
}
.con >>> .worker {
  display: flex;
  margin-bottom: 1.5rem;
  padding-left: 4%;
}
.con >>> .worker .worker-left {
  width: 2.5rem;
  margin-right: 0.8125rem;
}
.con >>> .worker .worker-left img {
  width: 100%;
  height: 2.5rem;
  border-radius: 50%;
}
.con >>> .worker .worker-right {
  color: #646466;
  font-size: 0.875rem;
  background-color: #ffffff;
  border-radius: 0.1875rem;
  max-width: 14.75rem;
  padding: 0.5625rem 0.625rem;
  position: relative;
  margin-top: 0.625rem;
}
.con >>> .worker .worker-right p {
  line-height: 1.3125rem;
}
.con >>> .worker .worker-right span {
  position: absolute;
  left: -0.1875rem;
  top: 0;
  display: block;
  border: 0.375rem solid transparent;
  border-top-color: #fff;
}
.prompt {
  padding: 0 4%;
  height: 14.25rem;
  overflow-y: auto;
  border-top: 0.03125rem solid #f2f2f2;
  position: fixed;
  bottom: 0;
  background-color: #fff;
  width: 100%;
}
.prompt li {
  color: #646466;
  font-size: 0.875rem;
  border-bottom: 0.5px solid #f7f7f7;
  height: 2.9375rem;
  line-height: 2.9375rem;
}
.tishi {
  position: fixed;
  width: 62vw;
  height: 4vh;
  background: rgba(0, 0, 0, 0.6);
  text-align: center;
  line-height: 4vh;
  border-radius: 2vw;
  top: 48vh;
  left: 19vw;
  color: #fff;
}
.icons {
  height: 14.25rem;
  background-color: #fff;
  padding: 0 1.25rem 0.75rem 1.25rem;
  overflow-y: auto;
  position: fixed;
  bottom: 0;
}
.icons >>> img {
  margin-top: 1.25rem;
  margin-right: 1.16rem;
  width: 2rem;
  height: 2rem;
}

.icons >>> img:nth-of-type(7n) {
  margin-right: 0;
}
</style>