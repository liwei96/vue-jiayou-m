<template>
    <div id="Foot">
        <ul>
            <router-link to="/"><li>首页</li></router-link>
            <router-link :to="'/'+n+'/encyclopedia'"><li>买房百科</li></router-link>
            <router-link :to="'/'+n+'/realinformations'"><li>房产资讯</li></router-link>
            <router-link :to="'/'+n+'/myhome'"><li>个人中心</li></router-link>
            <router-link :to="'/'+n+'/participate'"><li>城市加盟</li></router-link>
            <router-link :to="'/'+n+'/privacy'"><li>隐私政策</li></router-link>
        </ul>
        <p><img src="~/assets/f-logo.png">杭州易得房科技有限公司版权所有 </p>
        <p class="f-tel">电话：400-966-9995</p>
        <p>网络经营许可证：<a href="http://www.beian.miit.gov.cn/"><span>浙ICP备18057005号</span></a></p>
    </div>
</template>
<script>
export default {
    name:'Foot',
    data(){
        return {
            n:''
        }
    },
    mounted(){
        this.n=localStorage.getItem('pinyin');
    }
}
</script>
<style scoped>
#Foot{
    height: 110px;
    background-color: #F2F3F5;
    padding-top:11px
}
#Foot ul{
    margin-bottom: 10px;
}
#Foot ul li{
    display: inline-block;
    color:#929AA7;
    font-size: 12px;
    width:14.6%;
    text-align: center;
}
#Foot p{
    text-align: left;
    color:#929AA7;
    font-size: 11px;
    margin-bottom: 1px;
    margin-left: 4%;
}
#Foot p img{
    width:8%;
    margin-right: 2%;
}
#Foot p.f-tel{
    margin-bottom: 4px;
}
#Foot p span{
    color:#6A7B97;
    text-decoration: underline;
}
</style>