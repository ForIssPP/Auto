<template>
  <div class="img-box">
    <div class="gift">
      <img :src="gift" />
    </div>
    <div class="name">
      <img :src="name" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    gift: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    }
  }
};
</script>