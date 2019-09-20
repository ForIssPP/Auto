<template>
  <div class="img-box">
    <div class="gift">
      <img v-if="!SVGAOnload" :src="gift" />
      <SvgaBox v-show="SVGAOnload" :svgaSrc="vipSvga[id]" :active="active" @SVGAOnload="svgaPlayer"></SvgaBox>
    </div>
    <div class="name">
      <img :src="name" />
    </div>
  </div>
</template>
<script>
import SVGA from "svgaplayerweb";
import vipSvga from "./vip_svga.json";
import SvgaBox from "./SVGA.vue";

export default {
  data() {
    return {
      SVGAOnload: false,
      vipSvga
    };
  },
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
      type: Number,
      default: 0
    },
    active: {
      type: Number,
      default: 2
    }
  },
  components: {
    SvgaBox
  },
  methods: {
    svgaPlayer(ok) {
      if (ok) {
        this.SVGAOnload = ok;
        return;
      }
    }
  }
};
</script>