<template>
  <div id="app">
    <div class="content">
      <contentSwiper :contentList="vipRuleList" :imgList="vipimgList" :nameList="vipNameList"></contentSwiper>
    </div>
    <div class="buy">
      <btnSwiper :texts="buyTexts" @clickBtn="function() { console.log(1) }"></btnSwiper>
    </div>
  </div>
</template>
<script>
import getApi from "../../modules/getApi";
import { goRecharge } from "../../modules/live.api";
import contentSwiper from "./contentSwiper.vue";
import btnSwiper from "./btnSwiper.vue";
import vipRule from "./vip_rule.json";
import vipimgList from "./vip_info.json";

export default {
  data() {
    return {
      vipRuleList: [],
      vipNameList: [],
      vipimgList,
      buyTexts: ["100/月 赠送8000魔法币", "续费可获得1w魔法币"]
    };
  },
  components: {
    contentSwiper,
    btnSwiper
  },
  methods: {
    goRecharge,
    getApi(type, data, resolve, reject) {
      $.ajax({
        url: `./index.php?g=appapi&m=Mall&a=${type}`,
        data,
        type: "GET",
        dataType: "json",
        success(res) {
          res && resolve ? resolve(res) : reject(res);
        },
        error(e) {
          console.log(e);
        }
      });
      return this;
    },
    buyvip(vipid) {
      this.getApi(
        "buyvip",
        {
          uid: "25557",
          token: "1",
          vipid
        },
        res => {
          console.log(res);
          if (res.code === 1024) {
            this.goRecharge();
          } else {
            layer.msg(res.msg);
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  },
  created() {
    this.getApi(
      "vipindex",
      {
        uid: "25557"
      },
      res => {
        this.vipNameList = res.info.list.map(e => {
          return e.name;
        });
        this.vipRuleList = res.info.list.map(e => {
          let obj = JSON.parse(JSON.stringify(vipRule[3]));
          obj.text = obj.text.replace(
            /..身份专属勋章/,
            e.name + "身份专属勋章"
          );
          let reList = vipRule.slice(0, e.canuse);
          reList[3] = obj;
          return reList;
        });
      },
      err => {
        console.log(err);
      }
    );
  }
};
</script>
<style src="./buyvipindex.scss" lang="scss"></style>