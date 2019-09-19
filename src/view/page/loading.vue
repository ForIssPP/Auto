<template>
  <div class="loading" v-show="show">
    <div class="three-bounce">
      <div class="child bounce1"></div>
      <div class="child bounce2"></div>
      <div class="child bounce3"></div>
      <noscript>您的浏览器不支持JavaScript脚本或未开启JavaScript脚本</noscript>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: true
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../scss/mixins/mixin";

%fc {
  @include flexCenter;
}

.loading {
  position: absolute;
  top: 0;
  left: 0;
  @include bgcBox(#fff, 100%, 100%);
  z-index: 999999;

  @keyframes three-bounce {
    0%,
    80%,
    100% {
      transform: scale(0);
    }

    40% {
      transform: scale(1);
    }
  }

  .three-bounce {
    position: absolute;
    @extend %fc;
    @include createBox(100%, 100%);

    .child {
      @include bgc_radiusBox(rgb(157, 130, 229), 50%, 20px, 20px);
      animation: three-bounce 1.4s ease-in-out 0s infinite both;
    }

    .bounce1 {
      animation-delay: -0.32s;
    }

    .bounce2 {
      animation-delay: -0.16s;
    }
  }
}
</style>