<template>
  <li>
    <i v-show="index" class="no">{{ index }}</i>
    <img class="portrait" :src="avatar" @error="imageGetError($event)" />
    <p class="user-name">{{ name }}</p>
    <p>
      <span></span>
      {{ totalcoin }}
    </p>
  </li>
</template>
<script>
import imageGetError from "../../modules/imageGetError";

export default {
  props: {
    index: Number,
    avatar: String,
    name: String,
    totalcoin: [String, Number]
  },
  methods: {
    imageGetError
  }
};
</script>