<template>
  <div id="app">
    <loading :show="show"></loading>
    <div class="container">
      <div class="content">
        <div class="title">
          <p>我已充值: {{ money }}元</p>
          <btnClick :class="'btn'" :name="'去充值'" @clickBtn="goRecharge"></btnClick>
        </div>
        <div class="order-list-box">
          <orderList
            v-for="(data, index) in infos"
            :key="'orderList' + index"
            :info="data.gift"
            :ok="parseInt(data.money) < parseInt(money)"
            :money="parseInt(data.money)"
          ></orderList>
        </div>
      </div>
    </div>
    <div class="close" @click="closeWebview"></div>
  </div>
</template>
<script>
import orderList from "./orderList.vue";
import btnClick from "./btnClick.vue";
import liveapi from "../../modules/live.api";
import $ from "jquery";
import getQueryVariable from "../../modules/getQueryVariable";
import getApi from "../../modules/getApi";
import loading from '../page/loading.vue';

export default {
  data() {
    return {
      money: 0,
      infos: [],
      show: true
    };
  },
  methods: {
    goRecharge: liveapi.goRecharge,
    closeWebview: liveapi.closeWebview
  },
  components: {
    orderList,
    btnClick,
    loading
  },
  created() {
    getApi(
      "Draw.RewardAchieve",
      {
        uid: getQueryVariable("uid"),
        token: getQueryVariable("token")
      },
      res => {
        this.money = res.invest;
        this.infos = res.info;
      },
      err => {
        console.log(err);
      }
    );
    const iamgeDownload = new Image();
    iamgeDownload.src = 'http://alidown.zcdanbao.com/cdn/banner/images/everyday_order/content_bg.png';
    iamgeDownload.onload = () => {
      this.show = false;
    }
  }
};
</script>
<style lang="scss" src="./everyday_order.scss"></style>