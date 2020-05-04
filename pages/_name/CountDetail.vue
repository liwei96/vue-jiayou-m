<template>
  <div id="CountDetail">
    <div class="top">
      <img src="~/assets/return.png" @click="goback" />
      <ul id="nav">
        <li class="active fir" data-v="1">
          等额本息
          <i></i>
        </li>
        <li data-v="2">
          等额本金
          <i></i>
        </li>
      </ul>
    </div>
    <div class="header">
      <ul class="msg">
        <li>
          <p>总贷款</p>
          <strong>{{total}}</strong>
        </li>
        <li>
          <p>总利息</p>
          <strong>{{total_interest}}</strong>
        </li>
        <li>
          <p>月均还款</p>
          <strong>{{month_avg}}元</strong>
        </li>
        <li>
          <p>贷款月数</p>
          <strong>{{month}}月({{year}}年)</strong>
        </li>
      </ul>
      <ul class="tit">
        <li>月份</li>
        <li>月供</li>
        <li>月供本金</li>
        <li>月供利息</li>
        <li>剩余</li>
      </ul>
    </div>
    <div class="con">
      <div class="list">
        <ul v-for="(item,key) in lists" :key="key">
          <li class="year">第{{key}}年</li>
          <li v-for="(val,key) in item" :key="key">
            <span class="list-top">{{val.month}}</span>
            <span>{{val.total}}</span>
            <span>{{val.interest}}</span>
            <span>{{val.principal}}</span>
            <span>{{val.rest.toFixed(2)}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { ip, countdetail_data } from "~/api/api";
export default {
  name: "CountDetail",
  data() {
    return {
      lists: [],
      total: "",
      total_interest: "",
      month: 360,
      year: 30,
      month_avg: "",
      p:'1'
    };
  },
  methods: {
    start() {
      let that = this;
      let msg=$cookies.get('sum');
      let ip=returnCitySN['cip'];
      this.ip=ip;
      localStorage.getItem('ip');
      // let msg=sessionStorage.getItem('sum')
      countdetail_data(msg)
        .then(resp => {
          that.lists = resp.data.data.data;
          that.month = resp.data.data.month;
          that.month_avg = resp.data.data.month_avg;
          that.total = resp.data.data.loan_10thousand;
          that.total_interest = resp.data.data.totalInterest_10thousand;
          that.year = resp.data.data.year;
        })
        .catch(error => {
          console.log(error);
        });
    },
    get(p){
      let that = this;
      let msg=$cookies.get('sum');
      msg.payway=p;
      // let msg=sessionStorage.getItem('sum')
      countdetail_data(msg)
        .then(resp => {
          that.lists = resp.data.data.data;
          that.month = resp.data.data.month;
          that.month_avg = resp.data.data.month_avg;
          that.total = resp.data.data.loan_10thousand;
          that.total_interest = resp.data.data.totalInterest_10thousand;
          that.year = resp.data.data.year;
        })
        .catch(error => {
          console.log(error);
        });
    },
    goback(){
      this.$router.go(-1)
    }
  },
  mounted() {
    $("#Foot").css({ position: "relative", bottom: "0", width: "100%" });
    this.start();
    let that=this;
    $("#nav li").on("click", function() {
      $(this)
        .addClass("active")
        .siblings("li")
        .removeClass("active");
        let p=$(this).attr('data-v');
        that.get(p)
    });
  }
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
}
li {
  list-style: none;
}
.top {
  width: 100%;
  height: 48px;
  border-bottom: 0.5px solid #f7f7f7;
}
.top img {
  width: 4.4%;
  margin-left: 6.6667%;
  margin-top: 16px;
  float: left;
  margin-right: 17%;
}
.top ul {
  display: inline-block;
  height: 48px;
  line-height: 48px;
  width: 60%;
}
.top ul li {
  float: left;
  color: #919499;
  font-size: 16px;
  margin-right: 9.6%;
}
.top ul li.fir {
  margin-right: 31%;
}
.top ul li.active {
  color: #2e3033;
  font-size: 16px;
  position: relative;
}
.top ul li.active i {
  width: 25px;
  height: 2.5px;
  background-color: #40a2f4;
  position: absolute;
  bottom: 4px;
  left: 50%;
  margin-left: -12.5px;
}
.header {
  padding-bottom: 20px;
  box-shadow: 0px 2.5px 5px 0px rgba(6, 0, 1, 0.03);
}
.msg {
  margin-top: 20px;
  margin-bottom: 30px;
}
.msg li {
  width: 23%;
  border-right: 0.5px solid #edeff2;
  display: inline-block;
  text-align: center;
}
.msg li:last-child {
  border: 0;
}
.msg li p {
  color: #919499;
  font-size: 13px;
  margin-bottom: 15px;
}
.msg li strong {
  color: #2e3033;
  font-size: 14px;
  font-weight: normal;
}
.tit {
  padding: 0 8%;
}
.tit li {
  display: inline-block;
  margin-right: 8.3%;
  font-size: 13px;
  color: #919499;
}
.tit li:last-child {
  margin-right: 0;
}
.list ul li {
  padding: 8px 2% 8px 6%;
  border-bottom: 0.5px solid #edeff2;
  font-size: 12px;
  color: #5e6166;
}
.list ul li span {
  margin-right: 7%;
}
.list ul li span:last-child {
  margin: 0;
}
.list ul li span.list-top {
  width: 10%;
  text-align: center;
  margin-right: 2.6%;
  display: inline-block;
}
</style>