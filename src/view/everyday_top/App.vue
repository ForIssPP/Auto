<template>
  <div id="app">
    <loading :show="show"></loading>
    <timer></timer>
    <div class="top"></div>
    <div class="rule-box">
      <div class="text-ellipsis">
        <rule :title="title" :ruleTexts="ruleTexts"></rule>
      </div>
    </div>
    <TopBox :nowLists="noLists" :oldList="oldList" @toggleOnload="toggleOnload"></TopBox>
    <MonthTopBox :monthList="monthList"></MonthTopBox>
  </div>
</template>
<script>
import getApi from "../../modules/getApi";
import getQueryVariable from "../../modules/getQueryVariable";
import imageGetError from "../../modules/imageGetError";
import loading from "../page/loading.vue";
import rule from "./rule.vue";
import ruleJSON from "./rule.json";
import ellipsisRes from "./ellipsisRes";
import timer from "../page/timer.vue";
import TopBox from "./TopBox.vue";
import MonthTopBox from './MonthTopBox.vue';

export default {
  data() {
    return {
      noLists: [],
      monthList: [],
      oldList: [],
      show: true,
      title: ruleJSON.title,
      ruleTexts: ruleJSON.text
    };
  },
  methods: {
    getApi,
    imageGetError,
    toggleOnload() {
      const arr = this.noLists;
      this.noLists = this.oldList;
      this.oldList = arr;
    }
  },
  created() {
    const uid = getQueryVariable("uid");
    this.getApi(
      "Home.ProfitNewList",
      {
        uid,
        type: "day"
      },
      res => {
        this.noLists = ellipsisRes(res);
      },
      err => layer.msg(err.msg || "服务器请求错误，请稍后再试")
    )
      .getApi(
        "Home.ProfitNewList",
        {
          uid
        },
        res => (this.oldList = ellipsisRes(res)),
        err => console.log(err)
      )
      .getApi(
        "Home.ProfitNewList",
        {
          uid,
          type: "month"
        },
        res => (this.monthList = ellipsisRes(res)),
        err => console.log(err)
      );

    this.show = false;
  },
  components: {
    TopBox,
    loading,
    rule,
    MonthTopBox,
    timer
  }
};
</script>
<style lang="scss" src="./everydayTop.scss"></style>