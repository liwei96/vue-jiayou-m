<template>
  <bm-overlay
    ref="customOverlay"
    :class="{sample: true, active}"
    pane="labelPane"
    @draw="draw">
    <div v-html="text" @click="handleClick"></div>
  </bm-overlay>
</template>

<script>
export default {
  props: ['text', 'position', 'active'],
  watch: {
    position: {
      handler () {
        this.$refs.customOverlay.reload()
      },
      deep: true
    }
  },
  methods: {
    handleClick () {
    },
    draw ({el, BMap, map}) {
      const {lng, lat} = this.position
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))
      el.style.left = pixel.x - 45 + 'px'
      el.style.top = pixel.y - 45 + 'px'
    }
  }
}
</script>

<style>
.sample {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: rgba(64, 162, 244, 0.9);
  overflow: hidden;
  color: #fff;
  text-align: center;
  position: absolute;
}
</style>