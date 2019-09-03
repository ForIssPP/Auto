<template>
  <div id="app">
    <loading :show="show"></loading>
    <div class="top"></div>
    <div class="rule-box">
      <div class="text-ellipsis">
        <rule :title="ruleTitle" :ruleTexts="ruleTexts"></rule>
      </div>
    </div>
    <div class="rule-box">
      <div class="text-ellipsis">
        <rule :title="rewardTitle" :ruleTexts="rewardText"></rule>
      </div>
    </div>
  </div>
</template>
<script>
import getApi from "../../modules/getApi";
import loading from "../page/loading.vue";
import rule from "../everyday_top/rule.vue";
import ruleJSON from "./rule.json";
import rewardJSON from './rule_reward.json';

export default {
  data() {
    return {
      show: false,
      ruleTitle: ruleJSON.title,
      ruleTexts: ruleJSON.text,
      rewardTitle: rewardJSON.title,
      rewardText: rewardJSON.text
    };
  },
  methods: {
    getApi,
  },
  created() {
   
  },
  components: {
    loading,
    rule
  }
};
</script>
<style lang="scss" src="./MidAutumnTop.scss"></style>