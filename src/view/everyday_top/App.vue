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
        <div class="title-box">
          <h1 :class="{active: view === 0}">每日幸运榜单</h1>
          <h1 :class="{active: view === 1}">昨日幸运榜单</h1>
        </div>
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
      view: 0,
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
      "Home.Profitlist",
      {
        uid: getQueryVariable("uid")
      },
      res => {
        this.noLists = res.map(e => {
          const totalcoin = e.totalcoin;
          if (1e8 > totalcoin && totalcoin > 1e6) {
            e.totalcoin = Math.ceil(totalcoin / 1e3) / 10 + '万'
          } else if (1e8 < totalcoin) {
            e.totalcoin = Math.ceil(totalcoin / 1e7) / 10 + '亿'
          }
          return e
        });
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