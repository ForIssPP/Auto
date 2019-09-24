<template>
  <div>
    <div class="bg"></div>
    <div class="alert-dom" v-show="show">
      <img :src="avatar" />
      <div class="user-info">
        <p>{{ name }}</p>
        <img :src="sex" />
      </div>
      <div class="level">
        <img class="anchor" :src="level_anchor" />
        <img class="user" :src="level" />
      </div>
      <div class="number">
        <img src="https://mjliveapp.com/public/appapi/banner/images/number.png" />
        <p>{{ uid }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    show: Boolean,
    userinfo: {
      default() {
        return {
          avatar: "",
          user_nicename: "",
          uid: "",
          level_anchor: "",
          sex: ""
        };
      }
    }
  },
  data() {
    const {
      avatar,
      level_anchor,
      uid,
      level,
      sex,
      name: user_nicename = "用户1900"
    } = this.userinfo;

    console.log(this.userinfo);

    return {
      avatar,
      level_anchor,
      uid,
      level,
      sex,
      name
    };
  }
};
</script>
<style lang="scss" scoped>
</style>