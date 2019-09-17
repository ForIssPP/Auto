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
        <img v-if="receivedImageSrc" :src="receivedImageSrc" alt="reward" />
      </div>
      <p class="received-text">{{ rewardText }}</p>
      <p class="received-money">我的魔法币账户累计： {{ money / 1e4 }}万</p>
      <btnClick :name="''" :className="btnActive" @click="received"></btnClick>
    </div>
    <div id="ruleBtn">
      <btnClick :name="''" @click="openRuleDom"></btnClick>
    </div>
    <div id="alert">
      <img :src="alertSrc" />
    </div>
    <div id="ruleDom">
      <div class="bg"></div>
      <rule :title="ruleTitle" :ruleTexts="ruleTexts"></rule>
      <footer>
        <p>注意事项：</p>
        <p>1、用户奖励需在活动结束三天内在H5页面领取，过期作废。</p>
        <p>2、上班主播每日开播时长需≥3小时</p>
      </footer>
      <btnClick :name="''" @click="closeRuleDom" :className="'close-layer'"></btnClick>
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
      show: true,
      ruleTitle: ruleJSON.title,
      ruleTexts: ruleJSON.text,
      rewardTitle: rewardJSON.title,
      rewardTextList: rewardJSON.text,
      tops: [],
      titleList: ["排行", "头像", "名字", "ID", "月光值"],
      rewardText: "暂无可领取奖励",
      lock: true,
      btnActive: "received-btn ok",
      receivedType: 0,
      receivedImageSrc: "",
      receivedMsg: "",
      alertSrc: rewardJSON.receivedImagesSrc[4],
      money: 0,
      layerIndex: 0
    };
  },
  methods: {
    getApi,
    imageGetError,
    received() {
      if (this.lock) {
        return;
      }
      if (this.receivedMsg) {
        return layer.msg(this.receivedMsg);
      }
      this.getApi(
        "Activity.getPrizeMid",
        {
          uid: query("uid") || "10000",
          token: query("token") || "1234567",
          type: this.receivedType
        },
        res => {
          if (this.receivedType) {
            this.receivedType = 0;
            this.rewardText = "坐骑扫帚(7天) x 1";
          } else if (res.code !== 1005) {
            this.receivedMsg = res.msg;
            this.btnActive = "received-btn";
            this.rewardText = "已领取所有奖励";
          }

          layer.open({
            title: "",
            type: 1,
            area: ["5.4rem", "3.2rem"],
            content: $("#alert"),
            cancel() {
              layer.msg(res.msg);
            }
          });
        },
        err => {
          console.log(err);
        }
      );
    },
    openRuleDom() {
      this.layerIndex = layer.open({
        title: "",
        type: 1,
        content: $("#ruleDom"),
        area: ["6.9rem", "9.84rem"],
        closeBtn: 0
      });
    },
    closeRuleDom() {
      layer.close(this.layerIndex);
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
        this.tops = res;
        this.show = false;
      },
      err => {
        console.log("err", err);
      }
    )
      .getApi(
        "Activity.midAutumnMoney",
        {
          uid: query("uid") || "10000",
          token: query("token") || "1234567"
        },
        res => {
          this.money = parseInt(res[0].money);
        },
        err => {
          console.log(err);
        }
      )
      .getApi(
        "Activity.midPrizeInit",
        {
          uid: query("uid") || "10000",
          token: query("token") || "1234567"
        },
        res => {
          console.log(res);
          if (res.prize) {
            this.lock = false;
            if (res.prize.coinPrize) {
              this.rewardText = "VIP(7天) x 1";
              this.receivedImageSrc =
                rewardJSON.receivedImagesSrc[
                  this.money < 1e6 ? 0 : this.money < 2e6 ? 1 : 2
                ];
              this.receivedType = 1;
            } else if (res.prize.signPrize) {
              this.rewardText = "坐骑扫帚(3天) x 1";
              this.receivedImageSrc = rewardJSON.receivedImagesSrc[3];
            } else {
              this.btnActive = "received-btn";
              this.rewardText = "";
            }
          } else {
            this.btnActive = "received-btn";
            this.rewardText = "";
          }
        },
        err => {
          console.log(err);
        }
      );
  }
};
</script>
<style lang="scss" src="./MidAutumnTop.scss"></style>