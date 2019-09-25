<template>
  <div class="svga-box" ref="svgaBox"></div>
</template>
<script>
import SVGA from "svgaplayerweb";

export default {
  props: ["svgaSrc", "active"],
  mounted() {
    this.$watch(
      () => {
        return this.active;
      },
      function() {
        let player = new SVGA.Player(this.$refs.svgaBox);
        let parser = new SVGA.Parser(this.$refs.svgaBox);
        parser.load(this.svgaSrc, videoItem => {
          player.setVideoItem(videoItem);
          player.startAnimation();
          this.$emit("SVGAOnload", true);
        });
      }
    );
    if (this.active) {
      let player = new SVGA.Player(this.$refs.svgaBox);
      let parser = new SVGA.Parser(this.$refs.svgaBox);
      parser.load(this.svgaSrc, videoItem => {
        player.setVideoItem(videoItem);
        player.startAnimation();
        this.$emit("SVGAOnload", true);
      });
    }
  }
};
</script>