<template>
  <div id='bigbox'>
    <nuxt />
    <foot-view></foot-view>
  </div>
</template>

<script>
import footView from "@/components/Foot.vue";
export default {
  components: {
    "foot-view": footView
  },
  head() {
    return {
      title: "允家新房",
      meta: [
        {
          name: "description",
          content: "允家新房"
        },
        {
          name: "keywords",
          content: "允家新房"
        }
      ]
    };
  }
};
</script>

<style>
#bigbox{
  position: relative;
}
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

@keyframes big-in {
  0% {
    transform: scale(0.7);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes big-out {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.5);
  }
}

.change-enter,
.change-leave-active {
  opacity: 0;
  scale: 0.5;
}
.change-enter-active {
  transition: opacity 0.5s;
  animation: big-in 0.5s;
}
.change-leave-active {
  transition: opacity 0.5s;
  animation: big-out 0.5s;
}
</style>
