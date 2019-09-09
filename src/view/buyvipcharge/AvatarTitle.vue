<template>
  <div class="avatar-title">
    <div class="bg"></div>
    <div class="userinfo">
      <img :src="imgSrc" alt="avatar" class="avatar" />
      <div class="uid" v-if="uid">{{ uid }}</div>
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