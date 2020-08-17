<template>
  <div class="Comment">
    <h3>
      <img src="~/assets/return.png" @click="goback" />楼盘点评
    </h3>
    <div class="con">
      <textarea name id="txt" cols="30" rows="10" placeholder="输入您精彩评论" v-model="content"></textarea>
      <button @click="put">发表</button>
    </div>
    <foot-view :pinyin="jkl"></foot-view>
  </div>
</template>
<script>
import footView from "@/components/Foot.vue";
import {commentBack} from '~/api/api'
export default {
  name: "Comment",
  asyncData (context) {
    let jkl = context.store.state.cookie.pinyin;
    return {
      jkl:jkl
    }
  },
  data(){
    return{
      id:'',
      ip:'',
      status:'1',
      content:'',
      num:'3',
      n:'',
      jkl:''
    }
  },
  head() {
    return {
      title:  "允家新房-楼盘点评",
      meta: [
        {
          name: "description",
          content:  '允家新房'
        },
        {
          name: "keywords",
          content:  '允家新房'
        }
      ]
    };
  },
  components: {
    "foot-view": footView
  },
  methods: {
    
    put(){
      if (localStorage.getItem("token") == null) {
        let n=localStorage.getItem('pinyin')
        this.$router.push('/'+n+"/login")
        // window.location.href="/login"
      }
      else{
        let i=this.$route.params.id;
        let c=this.content
        let token=localStorage.getItem('token');
        let where={token:token,content:c,id:i}
        commentBack(where).then(resp=>{
            if(resp.data.code==200){
                this.$router.go(-1);
            }
        }).catch(error=>{
          console.log(error)
        })
      }
    },
    getip(){
      let ip = ip_arr["ip"];
          // let ip = returnCitySN["cip"];
      this.ip=ip;
      localStorage.getItem('ip');
    },
    goback(){
      this.$router.go(-1)
    }
  },
  mounted() { 
    
  }
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
}
#Foot {
  width:100%;
  position: fixed!important;
  bottom: 0!important
}
h3 {
  color: #333333;
  text-align: center;
  height: 44px;
  line-height: 44px;
  font-weight: bold;
  border-bottom: 1px solid #f2f2f2;
  position: relative;
  font-size: 16px;
}
h3 img {
  position: absolute;
  width: 5%;
  margin-top: 14px;
  left: 5.33%;
}
#txt{
    margin-top:20px;
}
#Foot{
    position: relative;
    bottom:0
}
.con {
  padding: 0 4%;
}
.con h5 {
  color: #2e3033;
  font-size: 16px;
  margin-bottom: 16px;
  padding-top: 18px;
}
.con p {
  margin-bottom: 18px;
}
.con p .ti {
  color: #919499;
  font-size: 14px;
  margin-right: 2.9%;
}

.con p .btn {
  color: #919499;
  font-size: 14px;
  padding: 3px 8px;
  border-radius: 2px;
  display: inline-block;
  margin-right: 2.6%;
  border: 0.5px solid #d6d7e2;
}
.con p .tab {
  display: inline-block;
  color: #fff;
  font-size: 14px;
  padding: 3px 8px;
  background-color: #59c1ff;
  border-radius: 2px;
  margin-right: 2.6%;
  border: 0;
}
.con .score {
  margin-bottom: 30px;
}
.rating-stars .rating-stars-container .rating-star {
  display: inline-block;
  font-size: 18px;
  color: #e8ebed;
  cursor: pointer;
  padding-right: 3px;
}

.rating-stars .rating-stars-container .rating-star.is--active,
.rating-stars .rating-stars-container .rating-star.is--hover {
  color: #59c1ff;
}
.rating-stars {
  display: inline-block;
  margin-left: 10px;
}
.con .score p {
  color: #919499;
  font-size: 14px;
  margin-right: 5.5%;
  display: inline-block;
  margin-bottom: 0;
}
.con .score p span {
  color: #ff6a48;
  font-size: 30px;
  font-weight: bold;
}
.con textarea {
  width: 100%;
  height: 150px;
  border-radius: 4px;
  padding: 15px 4%;
  background-color: #f2f4f7;
  border: 0;
  color: #919499;
  font-size: 16px;
  margin-bottom: 40px;
}

::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #999;
  font-size: 16px;
}

::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #999;
  font-size: 16px;
}

:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #999;
  font-size: 16px;
}

button {
  width: 100%;
  height: 44%;
  border-radius: 4px;
  background: linear-gradient(
    270deg,
    rgba(102, 207, 255, 1),
    rgba(76, 181, 255, 1)
  );
  line-height: 44px;
  text-align: center;
  color: #fff;
  font-size: 16px;
  border: 0;
}
</style>