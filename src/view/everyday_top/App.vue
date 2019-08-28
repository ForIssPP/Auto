<template>
  <div id="app">
    <loading :show="show"></loading>
    <div class="top"></div>
    <div class="rule-box">
      <div class="text-ellipsis">
        <rule :title="title" :ruleTexts="ruleTexts"></rule>
      </div>
    </div>
    <div class="box">
      <div class="order">
        <h1>活动排行</h1>
        <ul>
          <li v-for="(nolist, index) in noLists" :key="nolist.id">
            <i class="no">{{ index + 1 }}</i>
            <img class="portrait" :src="nolist.avatar" @error="imageGetError($event)" />
            <p class="user-name">{{ nolist.user_nicename }}</p>
            <p>
              <span></span>
              {{ nolist.totalcoin }}
            </p>
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
import rule from "./rule.vue";
import ruleJSON from "./rule.json";

export default {
  data() {
    return {
      noLists: [],
      show: true,
      title: ruleJSON.title,
      ruleTexts: ruleJSON.text
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
        layer.msg(err.msg || "服务器请求错误，请稍后再试");
      }
    );
  },
  components: {
    loading,
    rule
  }
};
</script>
<style lang="scss" src="./everydayTop.scss"></style>