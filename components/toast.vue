<template>
    <div id="toast">{{msg}}</div>
</template>
<script>
export default {
    data(){
        return{
            msg:''
        }
    }
}
</script>
<style lang="less" scoped>
#toast {
    width: 11.25rem;
    height: 3.75rem;
    border-radius: 0.375rem;
    text-align: center;
    line-height: 3.75rem;
    background: rgba(0,0,0,0.8);
    color: #CDCDCD;
    font-size: 1rem;
    position: fixed;
    left: 50%;
    top:45%;
    margin-left: -5.625rem;
    z-index: 999999;
}
</style>