<template>
  <div class="card">
    <loading :show="!show"></loading>
    <img :src="src" :alt="alt" class="card-img-top" />
    <div class="card-body">
      <slot></slot>
    </div>
    <div v-if="cardFooter" class="card-footer" v-html="cardFooter"></div>
  </div>
</template>
<script>
import onLoadImages from "../../modules/onLoadImages";
import loading from "../page/loading.vue";

export default {
  props: {
    src: {},
    alt: {
      type: String,
      default: "Image"
    },
    cardFooter: {
      type: String
    }
  },
  data() {
    return {
      show: true
    };
  },
  created() {
    // onLoadImages(this.src).onload(() => (this.show = true));
  },
  components: {
    loading
  }
};
</script>