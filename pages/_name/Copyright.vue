<template>
  <div id="Exemption">
    <h3>
      <img src="~/assets/return.png" @click="goback" />版权申明
    </h3>
    <div class="con">
      <h5>允家新房版权声明</h5>
      <p>1、允家新房转载的或者任何信息发布人通过允家新房平台发布的信息或内容，并不代表允家新房的意见及观点，也不意味着本网赞同其观点或证实其内容的真实性。</p>
      <p>2、允家新房转载的或者任何通过允家新房平台发布的信息、文字、图片、音视频等资料均由本网站用户提供，其真实性、准确性和合法性由信息发布人负责。允家新房不提供任何保证，并不承担任何法律责任。若任何人发现上述内容中存在任何侵犯第三方合法权益情形的，允家新房随时接受用户反馈，并愿意为用户维权提供便利条件。</p>
      <p>3、允家新房所转载的或者任何通过允家新房平台发布的信息、文字、图片、音视频等资料，如果侵犯了第三方的知识产权或其他权利，责任由信息发布者或转载者本人承担，本网站对此不承担责任。</p>
      <p>4、对本网版权所有之内容，已经本网书面许可的单位或个人，在使用时必须注明“稿件来源：允家新房”，并标明本网网址www.jy8006 .com，违者本网将依法追究其相关法律责任。</p>
      <p>5、转载或引用本网内容必须是以新闻性或资料性公共免费信息服务为目的的合理、善意使用，不得对本网内容原意进行曲解、修改，同时必须保留本网注明的“稿件来源”，并自负版权等法律责任。</p>
      <p>6、凡本网注明“来源：XXX ”的文/图等资料，本网转载出于传递更多信息之目的，并不意味着赞同其观点或证实其内容的真实性。</p>
      <p>7、转载或引用本网其他版权所有之内容须注明“转自（或引自）允家新房”字样，并标明本网网址www.jy8006 .com。转载或引用本网中的署名文章，请按规定向作者支付稿酬。</p>
      <p>8、除注明“来源：允家新房”或“来源：允家新房××（频道）”的内容外，本网以下内容亦不可任意转载：</p>
      <p>A、本网所指向的非本网内容的相关链接内容；</p>
      <p>B、已作出不得转载或未经许可不得转载声明的内容；</p>
      <p>C、未由本网署名或本网引用、转载的他人作品等非本网版权内容；</p>
      <p>D、本网中特有的图形、标志、页面风格、编排方式、程序等；</p>
      <p>E、本网中必须具有特别授权或具有注册用户资格方可知晓的内容；</p>
      <p>F、其他法律不允许或本网认为不适合转载的内容。</p>
      <p>9、转载或引用本网内容不得进行如下活动：</p>
      <p>A、损害本网、他人或其他社会群体利益的行为；</p>
      <p>B、任何违反法律法规的行为。</p>
      <p>10、对于不当转载或引用本网内容而引起的纷争等或因纠纷等造成的任何损失，本网不承担相关法律责任。</p>
      <p>11、对不遵守本声明的用户或其他违法、恶意使用本网内容者，本网保留追究其法律责任的权利。</p>
      <p>12、本声明未涉及的问题请参见国允家关法律法规，当本声明与国允家关法律法规冲突时，以国家法律法规为准。</p>
      <p>13、本网站相关声明版权及其修改权、更新权和解释权均属允家新房所有。</p>
    </div>
    <foot-view :pinyin="jkl"></foot-view>
  </div>
</template>
<script>
import footView from "@/components/Foot.vue";
export default {
  name: "Exemption",
  asyncData (context) {
    let jkl = context.store.state.cookie.pinyin;
    return {
      jkl:jkl
    }
  },
  head() {
    return {
      title: "关于我们-允家新房",
      meta: [
        {
          name: "description",
          content:
            "允家新房是专注于新房购买的O2O平台,为买房人提供一对一新房房产咨询服务和新楼盘信息，包括新楼盘价格走势和最新房源"
        },
        {
          name: "Keywords",
          content: "关于我们"
        }
      ]
    };
  },
  data(){
    return {
      jkl:''
    }
  },
  components: {
    "foot-view": footView
  },
  methods: {
    goback() {
      this.$router.go(-1);
    }
  },
  mounted(){
    let h = $("#Exemption").height();
    if (h < 700) {
      $("#Foot").css({ position: "fixed", bottom: "0", width: "100%" });
    } else if (h >= 700) {
      $("#Foot").css({ position: "relative", bottom: "0", width: "100%" });
    }
  }
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
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
.con {
  padding: 18px 4% 0 4%;
}
.con h5 {
  color: #2e3033;
  font-size: 18px;
  margin-bottom: 14px;
  font-weight: bold;
}
.con p {
  font-size: 13px;
  line-height: 20px;
  color: rgba(69, 72, 77, 1);
}
.con h6 {
  font-size: 13px;
  line-height: 22px;
  color: rgba(69, 72, 77, 1);
}
</style>