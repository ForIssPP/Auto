<template>
  <div class="img-box">
    <div class="gift">
      <img :src="gift" />
      <!-- <div :id="id" class="svga-box" ref="svgaBox"></div> -->
    </div>
    <div class="name">
      <img :src="name" />
    </div>
  </div>
</template>
<script>
// import SVGA from "svgaplayerweb";

export default {
  props: {
    gift: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: ""
    }
  },
  methods: {
    // svgaPlayer(el) {
    //   try {
    //     let player = new SVGA.Player(el);
    //     let parser = new SVGA.Parser(el);
    //     parser.load(this.gift, videoItem => {
    //       player.setVideoItem(videoItem);
    //       player.startAnimation();
    //     });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  },
  mounted() {
    // this.svgaPlayer(`#${this.id}`);
  }
};
</script>