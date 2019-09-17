<template>
  <div id="app">
    <div id="demo"></div>
  </div>
</template>
<script>
import SVGA from "svgaplayerweb";
import testSVGA from "./test.svga";

export default {
  data() {
    return {};
  },
  mounted() {
    let player = new SVGA.Player("#demo");
    let parser = new SVGA.Parser("#demo");
    parser.load(testSVGA, videoItem => {
      player.setVideoItem(videoItem);
      player.startAnimation();
    });
  }
};
</script>
<style lang="scss">
body {
  background-color: #000;
}
#demo {
  width: 100px;
  height: 100%;
}
</style>