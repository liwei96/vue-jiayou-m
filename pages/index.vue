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
      title: "允家新房",
      meta: [
        {
          name: "description",
          content:
            "允家新房是专注于新房购买的O2O平台,为买房人提供一对一新房房产咨询服务和新楼盘信息，包括新楼盘价格走势和最新房源"
        },
        {
          name: "keywords",
          content: "允家新房"
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