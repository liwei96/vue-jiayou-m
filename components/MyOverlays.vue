<template>
  <bm-overlay
    ref="customOverlay"
    :class="{samples: true, active}"
    pane="labelPane"
    @draw="draw"
    >
    <div v-html="text"  ></div>
  </bm-overlay>
</template>

<script>
export default {
  props: ['text', 'position', 'active','projectid'],
  watch: {
    // position: {
    //   handler () {
    //     this.$refs.customOverlay.reload()
    //   },
    //   deep: true
    // }
  },
  methods: {
    draw ({el, BMap, map}) {
      const {lng, lat} = this.position
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))
      el.style.left = pixel.x - 62 + 'px'
      el.style.top = pixel.y - 22 + 'px'
    }
  }
}
</script>

<style>
.samples {
  width: 125px;
  height: 44px;
  border-radius: 1px;
  position: absolute;
  box-shadow:0px 0px 2.5px 0px rgba(0, 0, 0, 0.3);
}
.samples::after{
  display: inline-block;
  content:'';
  position: absolute;
  left:50%;
  margin-left: -10px;
  bottom:-55%;
  border-width:12px;
  border-style:solid dashed dashed dashed;
  border-color:#fff transparent transparent transparent;
}
</style>