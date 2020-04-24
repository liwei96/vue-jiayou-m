<template>
    <div class="loading">加载中....</div>
</template>
<script>
export default {
    name:'Loading'
}
</script>
<style scoped>
.loading{
    position: fixed;
    top:0;
    left:0;
    background: url('~assets/loading.gif')   no-repeat #fff;
    background-position-y:38vh;
    background-position-x: center;
    background-size: 30%;
    width:100vw;
    height: 100vh;
    z-index: 1000;
    font-size: 14px;
    color: black;
    text-align: center;
    line-height: 110vh;

}
</style>