<template>
  <div class="error">
    <img src="~/assets/404.jpg" alt />
    <button @click="gohome">返回首页</button>
  </div>
</template>
<script>
export default {
    methods:{
        gohome(){
            this.$router.push('/')
        }
    }
}
</script>
<style scoped>
.error {
    width: 100%;
    height: 100vh;
    background: linear-gradient(
    0deg,
    rgba(52, 138, 255, 1),
    rgba(106, 204, 255, 1)
  );
}
img {
  width: 100%;
}
button {
  width: 17.8125rem;
  height: 2.75rem;
  background: linear-gradient(
    270deg,
    rgba(52, 138, 255, 1),
    rgba(106, 204, 255, 1)
  );
  box-shadow: 0px 2.5px 6px 0px rgba(78, 169, 255, 0.3);
  border-radius: 0.375rem;
  position: relative;
  margin-top: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  border: 0;
  font-size: 0.875rem;
  color: #fff;

}
</style>