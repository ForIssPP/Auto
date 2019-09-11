<template>
  <div id="app">
    <loading :show="show"></loading>
    <div class="top"></div>
    <div class="reward-img"></div>
    <div class="reward-rule-img"></div>
    <div class="box-title-img"></div>
    <div class="box">
      <div class="title">
        <p v-for="(name, index) in titleList" :key="index">{{ name }}</p>
      </div>
      <div class="order">
        <ul v-if="tops.length > 0">
          <li v-for="(top, index) in tops" :key="top.id">
            <i class="no">{{ index + 1 }}</i>
            <img class="portrait" :src="top.avatar" @error="imageGetError($event)" />
            <p class="user-name">{{ top.user_nicename }}</p>
            <p>{{ top.uid }}</p>
            <p>{{ top.money }}</p>
          </li>
        </ul>
        <ul v-else>
          <li style="margin-top: 1rem">暂时无人上榜，敬请期待~！</li>
        </ul>
      </div>
    </div>
    <div class="received">
      <div class="img-box">
        <div class="bg"></div>
        <img :src="'https://iph.href.lu/160x140'" alt="reward" />
      </div>
      <p class="received-text">{{ rewardText }}</p>
      <p class="received-money">我的魔法币账户累计： {{ money / 1e4 }}万</p>
      <btnClick :name="''" :className="'received-btn'" @btnClist="received"></btnClick>
    </div>
    <div id="rule">
      <div class="rule-box">
        <div class="text-ellipsis">
          <rule :title="rewardTitle" :ruleTexts="rewardTextList"></rule>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import getApi from "../../modules/getApi";
import loading from "../page/loading.vue";
import rule from "../everyday_top/rule.vue";
import ruleJSON from "./rule.json";
import rewardJSON from "./rule_reward.json";
import query from "../../modules/getQueryVariable";
import imageGetError from "../../modules/imageGetError";
import btnClick from "../page/btnClick.vue";

export default {
  data() {
    return {
      show: false,
      ruleTitle: ruleJSON.title,
      ruleTexts: ruleJSON.text,
      rewardTitle: rewardJSON.title,
      rewardTextList: rewardJSON.text,
      tops: [],
      titleList: ["排行", "头像", "名字", "ID", "魔法值"],
      rewardText: "暂无可领取奖励",
      money: 0
    };
  },
  methods: {
    getApi,
    imageGetError,
    received() {
      console.log("%c received", "color: red");
    }
  },
  components: {
    loading,
    rule,
    btnClick
  },
  created() {
    this.getApi(
      "Activity.midAutumnData",
      null,
      res => {
        console.log("res", res);
        this.tops = res;
      },
      err => {
        console.log("err", err);
      }
    ).getApi(
      "Activity.midPrizeInit",
      {
        uid: query("uid") || 10000,
        token: query("tolen") || 1234567
      },
      res => {
        console.log('res 2', res);
      },
      err => {
        console.log(err);
      }
    );
  }
};
</script>
<style lang="scss" src="./MidAutumnTop.scss"></style>