<template>
  <div id="app">
    <div class="title">
      <p>今日充值: {{ money }}元</p>
      <btnClick :name="'去充值'" @btnClick="goRecharge"></btnClick>
    </div>
    <div class="order-list">
      <orderList
        v-for="(data, index) in infos"
        :key="'orderList' + index"
        :info="data.gift"
        :ok="parseInt(data.money) < parseInt(money)"
        :money="parseInt(data.money)"
      ></orderList>
    </div>
  </div>
</template>
<script>
import orderList from "./orderList.vue";
import btnClick from "./btnClick.vue";
import liveapi from "js/module/live.api";
import $ from "jquery";
import getQueryVariable from "../../modules/getQueryVariable";
import getApi from "../../modules/getApi";

export default {
  data() {
    return {
      money: 0,
      infos: []
    };
  },
  methods: {
    goRecharge: liveapi.goRecharge
  },
  components: {
    orderList,
    btnClick
  },
  created() {
    getApi("Draw.RewardAchieve", {
      uid: getQueryVariable("uid"),
      token: getQueryVariable("token")
    }, res => {
      this.money = res.invest;
      this.infos = res.info;
    }, err => {
      console.log(err);
    });
  }
};
</script>