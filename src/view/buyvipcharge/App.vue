<template>
  <div id="app">
    <div class="title-box">
      <AvatarTitle></AvatarTitle>
      <div class="bar">
        <h2>魔法币支付</h2>
        <p>
          当前余额：
          <span>{{ money }}</span>魔法币
        </p>
      </div>
    </div>
    <div class="chose-box">
      <div class="bar">
        <h2>选择开通/续费项目</h2>
        <p>使用有效期{{ day }}天</p>
      </div>
    </div>
    <div class="buy">
      <btnClick :name="'1万魔法币 立即支付'"></btnClick>
    </div>
  </div>
</template>
<script>
import getQueryVariable from "../../modules/getQueryVariable";
import AvatarTitle from "./AvatarTitle.vue";
import rule from "./rule.json";
import getApi from "../buyvipindex/getApiFromBuyVipIndex";
import btnClick from "../page/btnClick.vue";

export default {
  data() {
    return {
      chose: 1,
      money: 0,
      day: rule.day
    };
  },
  components: {
    AvatarTitle,
    btnClick
  },
  methods: {
    getQueryVariable,
    getApi
  },
  created() {
    getQueryVariable("chose")
      ? (this.chose = getQueryVariable("chose"))
      : (this.chose = 1);
  }
};
</script>
<style lang="scss" src="./index.scss"></style>