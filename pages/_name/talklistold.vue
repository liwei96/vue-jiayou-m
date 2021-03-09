<template>
  <div class="talklist">
    <h3>
      <img src="~/assets/backtalklist.png" alt class="backimg" @click="gocontent" />
      <img class="bluemsg" src="~/assets/bluemsg.png" alt />在线资讯
      <!-- <img class="all-esc" src="~/assets/w-del.png" alt @click="gocontent"/> -->
    </h3>
    <ul class="conlist">
      <li v-for="(item,val) in cons" :key="val" @click="gotalk(item.sid,item.projectid,item.name)">
        <img :src="item.img" alt />
        <div class="con">
          <em v-if="item.type==1"></em>
          <h5>
            {{item.name}}
            <span>{{item.buildname}}</span>
            <i>{{item.time}}</i>
          </h5>
          <p>{{item.txt}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import ReconnectingWebSocket from "reconnecting-websocket";
export default {
  data() {
    return {
      cons: [],
      ws: "",
      db: {},
      sids: [],
      num: "",
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
        "[蛋糕]"
      ]
    };
  },
  head() {
    return {
      title: this.title || "允家新房-允家咨询师",
      meta: [
        {
          name: "description",
          content: this.description || "允家新房-允家咨询师"
        },
        {
          name: "Keywords",
          content: this.keywords || "允家新房-允家咨询师"
        }
      ]
    };
  },
  methods: {
    gotalk(id, pid, name) {
      sessionStorage.setItem("sid", id);
      sessionStorage.setItem("projectid", pid);
      sessionStorage.setItem(pid, id);
      sessionStorage.setItem("staffname", name);
      let k = $cookies.get("pinyin");
      // this.$router.push(`/${k}/talk`);
      window.location.href = `/${k}/talk`;
    },
    gocontent() {
      // let id = sessionStorage.getItem('projectid');
      // let k = $cookies.get('pinyin');
      // this.$router.push(`/${k}/content/${id}`)
      this.$router.go(-1);
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
      this.ws.onopen = function(event) {
        let peomsg = {
          //要发送的数据
          class: "Staff",
          action: "online_staffs"
        };
        that.ws.send(JSON.stringify(peomsg));
      };
      this.ws.onmessage = function(event) {
        if (event.data != "connect success") {
          let data = JSON.parse(event.data);
          if (data.code != 500) {
            if (data.action == "talk") {
              if (that.sids.indexOf(data.content.id) != -1) {
                var transaction = that.db.transaction("staffmsg", "readwrite");
                var store = transaction.objectStore("staffmsg");
                var index = store.index("sid");
                var search = index.get(data.content.id);
                var myDate = new Date();
                let time = myDate.toLocaleTimeString();
                let timenum = Date.parse(new Date());
                search.onsuccess = function(e) {
                  let result = e.target.result;
                  if (result) {
                    result.txt = data.content.content;
                    result.time = time;
                    result.num = timenum;
                    result.type = 1;
                    store.put(result);
                    that.start();
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
                request.onsuccess = function(e) {
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
                          let h = `<img src="${that.faces[val].img}">`;
                          msg = msg.replace(`face${title}`, h);
                        }
                      }
                      index = msg.indexOf("face", index + 4);
                    }
                  }
                  let store = transaction.objectStore(
                    "staff" + data.content.id
                  );
                  console.log(msg+'777')
                  sessionStorage.setItem("lastone", msg);
                  let addPersonRequest = store.add({
                    className: "worker",
                    con: msg,
                    img: img,
                    name1: "worker-left",
                    name2: "worker-right"
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
                otheradd.onsuccess = function() {
                  var index =
                    window.indexedDB ||
                    window.webkitIndexedDB ||
                    window.mozIndexedDB ||
                    window.msIndexedDB;
                  let req = index.open("staff" + data.content.id, 2);
                  req.onupgradeneeded = function(e) {
                    let db = e.target.result;
                    if (
                      !db.objectStoreNames.contains("staff" + data.content.id)
                    ) {
                      let objectStore = db.createObjectStore(
                        "staff" + data.content.id,
                        {
                          keyPath: "id",
                          autoIncrement: true
                        }
                      );
                      objectStore.createIndex("classname", "classname", {
                        unique: true
                      });
                      objectStore.createIndex("con", "con", {
                        unique: false
                      });
                      objectStore.createIndex("img", "img", {
                        unique: false
                      });
                      objectStore.createIndex("name1", "name1", {
                        unique: false
                      });
                      objectStore.createIndex("name2", "name2", {
                        unique: false
                      });
                    }
                    console.log("store is created");
                  };
                  req.onsuccess = function(e) {
                    let db = req.result;
                    let tran = db.transaction(
                      "staff" + data.content.id,
                      "readwrite"
                    );
                    let store = tran.objectStore("staff" + data.content.id);
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
                    console.log(msg+'555')
                    let addPersonRequest = store.add({
                      className: "worker",
                      con: msg,
                      img: img,
                      name1: "worker-left",
                      name2: "worker-right"
                    });
                    addPersonRequest.onsuccess = function() {
                      that.start();
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
        content: { staff_id: sid, msg: msg, token: token, project: id }
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
          Id: id
        }
      };
      this.ws.send(JSON.stringify(options));
    },
    start() {
      let that = this;
      
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
      request.onupgradeneeded = function(e) {
        db = e.target.result;
        if (!db.objectStoreNames.contains("staffmsg")) {
          var objectStore = db.createObjectStore("staffmsg", {
            keyPath: "id",
            autoIncrement: true
          });
          objectStore.createIndex("sid", "sid", {
            unique: true
          });
          objectStore.createIndex("con", "con", {
            unique: false
          });
          objectStore.createIndex("img", "img", {
            unique: false
          });
          objectStore.createIndex("name", "name", {
            unique: false
          });
          objectStore.createIndex("time", "time", {
            unique: false
          });
          objectStore.createIndex("buildname", "buildname", {
            unique: false
          });
        }
      };
      request.onsuccess = function(e) {
        db = request.result;
        that.db = request.result;
        var transaction = db.transaction("staffmsg", "readwrite");
        var store = transaction.objectStore("staffmsg");
        // 取出所有数据
        var all = store.getAll();
        all.onsuccess = function() {
          that.cons = all.result;
          for (let i = 0; i < that.cons.length - 1; i++) {
            for (let j = 0; j < that.cons.length - i - 1; j++) {
              if (that.cons[j].num < that.cons[j + 1].num) {
                let swp = that.cons[j];
                that.cons[j] = that.cons[j + 1];
                that.cons[j + 1] = swp;
              }
            }
          }
          for (let val of that.cons) {
            that.getpro(val.projectid);
            that.sids.push(val.sid);
          }
        };
      };
      request.onerror = function(e) {
        console.log("false");
      };
    }
  },
  created() {},
  mounted() {
    this.start();
    this.createwebsocket();
    let that = this
    for (let val in that.faces) {
      that.faces[val] = {
        img: require(`~/assets/${val}.gif`),
        con: that.faces[val]
      };
    }
  },
  beforeDestroy() {
    this.ws.close();
  }
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
}
h3 {
  color: #303033;
  font-size: 1.125rem;
  text-align: center;
  line-height: 2.75rem;
  border-bottom: 0.03125rem solid #f2f2f2;
  position: relative;
}
h3 .backimg {
  float: left;
  margin: 3.4% 0 0 4%;
  width: 5.4%;
}
h3 .bluemsg {
  width: 1.25rem;
  margin-right: 0.25rem;
}
h3 .all-esc {
  width: 0.9375rem;
  position: absolute;
  top: 0.875rem;
  right: 1rem;
}
.conlist {
  padding: 0 4%;
}
.conlist li {
  display: flex;
  padding: 0.625rem 0;
  border-bottom: 0.03125rem solid #f5f5f5;
}
.conlist li img {
  width: 3rem;
  margin-right: 0.875rem;
  height: 3rem;
}
.conlist li .con {
  width: 100%;
}
.conlist li .con h5 {
  color: #303033;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  position: relative;
  padding-top: 0.25rem;
  min-height: 1.3125rem;
}
.conlist li .con h5 span {
  display: block;
  color: #646566;
  font-size: 0.6875rem;
  padding: 0.1875rem 0.3125rem;
  border-radius: 0.09375rem;
  background-color: #f7f7f7;
  position: absolute;
  top: 0.25rem;
  left: 3.2rem;
}
.conlist li .con h5 i {
  font-style: normal;
  font-size: 0.75rem;
  color: #afafb3;
  float: right;
}
.conlist li .con p {
  color: #969699;
  font-size: 0.8125rem;
  height: 1.25rem;

  overflow: hidden;
}
.con {
  position: relative;
}
.con em {
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
  top: 2rem;
  right: 0.75rem;
  font-style: normal;
}
</style>