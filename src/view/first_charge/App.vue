<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <textBox v-for="(info, index) in infos" :key="`textBox-${index}`" :info="info"></textBox>
      </div>
      <div class="btn-box">
        <btnClick :name="'放弃离开'" @clickBtn="closeWebview"></btnClick>
      </div>
    </div>
  </div>
</template>
<script>
import textBox from "./textBox.vue";
import btnClick from "../everyday_order/btnClick.vue";
import liveapi from "../../modules/live.api";
import getQueryVariable from "../../modules/getQueryVariable";
import CHARGE_CONFIG from "./charge.config.json";
import CHARGE_APPSTORE_CONFIG from "./charge_appstore.config.json";

export default {
  data() {
    return {
      infos: CHARGE_CONFIG
    };
  },
  methods: {
    closeWebview() {
      $.ajax({
        type: "GET",
        url: "./api/public/appapi/?service=Live.CloseFirstCharge",
        data: {
          uid: getQueryVariable("uid"),
          token: getQueryVariable("token")
        },
        dataType: "JSON",
        success: function(response) {
          console.log(response);
          liveapi.closeWebview();
        },
        error(e) {
          console.log(e);
        }
      });
    },
    goRecharge: liveapi.goRecharge
  },
  components: {
    textBox,
    btnClick
  },
  created() {
    if (getQueryVariable("type") === "appstore") {
      this.infos = CHARGE_APPSTORE_CONFIG;
    }
  }
};
</script>
<style lang="scss" src="./frist_charge.scss"></style>