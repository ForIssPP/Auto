<template>
  <div class="image-info" @click="info.callback || function(){}">
    <img :src="info.img" alt="images" />
    <p>{{ info.word }}</p>
  </div>
</template>
<script>
export default {
  props: {
    info: {
      type: Object,
      required: true
    }
  }
};
</script>