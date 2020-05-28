<template>
  <div></div>
</template>

<script>
import { index_start } from "~/api/api";
export default {
  // asyncData({ redirect }) {
  //   redirect('/hangzhou')
  // },
  head() {
    return {
      title: "杭州房产网_杭州买房新房_杭州新开楼盘-允家新房",
      meta: [
        {
          name: "description",
          content:
            "允家新房杭州站提供真实房源的房产信息平台、为杭州买房、杭州新房购买以及杭州一手房购买的用户提供便捷服务,允家新房为你找一个新家"
        },
        {
          name: "keywords",
          content: "杭州买房,杭州新房,杭州新楼盘 ,杭州房产网"
        }
      ]
    };
  },
  methods:{
    start_data() {
          let ll = [];
          let ip = returnCitySN["cip"];
          index_start({ ip: ip, city: 0 }).then(resp => {
            ll = resp.data.city;
            let citys = ll.id;
            let pinyins = ll.pinyin;
            $cookies.set("city", citys, 0);
            $cookies.set("pinyin", pinyins, 0);
            $cookies.set('ip',ip,0)
            window.location.href = "/" + pinyins;
          });
    },
  },
  beforeMount(){
    this.start_data()
  }
}
</script>