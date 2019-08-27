<template>
  <div id="app">
    <loading :show="show"></loading>
    <!-- <div class="top"></div> -->
    <!-- <div class="rule"></div> -->
    <div class="box">
      <div class="order">
        <div class="title">
          <p>排行</p>
          <p>头像</p>
          <p>名字</p>
          <p>ID</p>
          <p>魔法值</p>
        </div>
        <ul>
          <li v-for="(nolist, index) in noLists" :key="nolist.id">
            <i class="no">{{ index + 1 }}</i>
            <img class="portrait" :src="nolist.avatar" @error="imageGetError($event)" />
            <p class="user-name">{{ nolist.user_nicename }}</p>
            <p class="uid">{{ nolist.uid }}</p>
            <p>{{ nolist.totalcoin }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import getApi from "../../modules/getApi";
import getQueryVariable from "../../modules/getQueryVariable";
import imageGetError from "../../modules/imageGetError";
import loading from "../page/loading.vue";

export default {
  data() {
    return {
      noLists: [],
      show: true
    };
  },
  methods: {
    getApi,
    imageGetError
  },
  created() {
    this.getApi(
      "Home.ConsumeList",
      {
        uid: getQueryVariable("uid")
      },
      res => {
        this.noLists = res;
        this.show = false;
      },
      err => {
        console.log(err);
      }
    );
  },
  components: {
    loading
  }
};
</script>
<style lang="scss" src="./everydayTop.scss"></style>