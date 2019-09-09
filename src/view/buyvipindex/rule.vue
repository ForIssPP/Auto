<template>
  <div class="rule-box">
    <img v-if="imgSrc" :src="imgSrc" />
    <h3>{{ title }}</h3>
    <p>{{ text }}</p>
  </div>
</template>
<script>
export default {
  props: {
    imgSrc: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    }
  }
};
</script>
<style lang="scss">
@import "../../scss/mixins/mixin";

%fc {
  @include flexCenter;
}

%fs {
  @include createFlexBox(center, flex-start, row);
}

%fss {
  @include createFlexBox(flex-start, flex-start, row);
}

%fcs {
  @include createFlexBox(center, flex-start);
}

%fcc {
  @include flexColumnCenter;
}

.rule-box {
  @extend %fcc;
  @include createBox(2rem, 3.2rem);

  img {
    margin-bottom: 0.3rem;
    @include createBox(1.6rem, 1.4rem);
  }

  h3 {
    margin: 0 0 0.1rem;
    @include cfz_fw(#746965, 0.3rem, 500);
  }

  p {
    @include cfzta_fw(#999999, 0.24rem, center, 500);
    @include textOverFlow(2rem);
  }
}
</style>