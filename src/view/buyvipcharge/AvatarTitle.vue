<template>
  <div class="avatar-title">
    <div class="avatar">
      <div class="bg"></div>
      <img v-if="imgSrc" :src="imgSrc" alt="avatar" />
    </div>
    <div class="userinfo">
      <p v-if="username" class="username">{{ username }}</p>
      <p v-for="(item, index) in other" :key="index">{{ item }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    imgSrc: {
      type: String,
      default: ""
    },
    uid: {
      type: String,
      default: ""
    },
    username: {
      type: String,
      default: ""
    },
    other: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>