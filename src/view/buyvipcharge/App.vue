<template>
  <div id="app">
    <div class="title-box">
      <AvatarTitle :imgSrc="imgSrc" :username="name" :uid="uid" :other="usevip"></AvatarTitle>
      <div class="bar">
        <h2>魔法币支付</h2>
        <p>
          当前余额：
          <span>{{ money }}</span>魔法币
        </p>
      </div>
    </div>
    <div class="list-box">
      <div class="bar">
        <h2>选择开通/续费项目</h2>
        <p>使用有效期{{ day }}天</p>
      </div>
      <div v-if="!choseList.length">暂时未开通VIP购买功能</div>
      <ChoseBox
        v-else
        :choses="choseList"
        @choseCharge="choseCharge"
        :activeChose="chose"
        :len="len"
      ></ChoseBox>
    </div>
    <div class="buy">
      <div
        v-if="endTimer"
        class="red-bar"
      >开通奖励{{ reward }}魔法币{{ endTimer ? '，预计到期时间' + endTimer : '。' }}</div>
      <btnClick
        :className="'btn'"
        :name="`${reward / 0.8 / 1e4}万魔法币 立即支付`"
        @click="buyvip(chose + 1)"
      ></btnClick>
    </div>
  </div>
</template>
<script>
import getQueryVariable from "../../modules/getQueryVariable";
import AvatarTitle from "./AvatarTitle.vue";
import rule from "./rule.json";
import getApi from "../buyvipindex/getApiFromBuyVipIndex";
import btnClick from "../page/btnClick.vue";
import ChoseBox from "./ChoseBox.vue";

export default {
  data() {
    return {
      chose: 0,
      money: 0,
      day: rule.day,
      imgSrc: "",
      name: "",
      uid: getQueryVariable("uid") || "10000",
      usevip: ["暂未开通"],
      reward: 8000,
      endTimer: "",
      choseList: [],
      len: 0,
      info: []
    };
  },
  components: {
    AvatarTitle,
    btnClick,
    ChoseBox
  },
  methods: {
    getApi,
    choseCharge(index) {
      if (index > 6) {
        return;
      }
      this.chose = index;
      this.reward = this.info.list[index].coin * 0.8;
    },
    buyvip(vipid) {
      this.getApi(
        "buyvip",
        {
          uid: this.uid,
          token: getQueryVariable("token"),
          vipid: vipid
        },
        res => {
          console.log(res);
          if (res.code === 1024) {
            this.goRecharge();
          } else {
            this.money = parseInt(res.info.coin);
            this.usevip = ["已经开通" + this.info.list[parseInt(vipid) - 1].name];
            layer.msg(res.msg);
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  },
  mounted() {
    this.getApi(
      "vipindex",
      {
        uid: this.uid
      },
      res => {
        const now = new Date().getTime();
        const info = res.info;
        if (parseInt(info.endtime) * 1e3 > now) {
          const endDate = new Date(parseInt(info.endtime) * 1e3);
          this.endTimer = endDate.toLocaleDateString().replace(/\//g, "-");
        }
        // 项目类型列表
        this.len = info.list.length - 1;
        this.choseList = info.list.map((e, index) => {
          return {
            title: `开通${e.name}贵族`,
            name: `${e.coin / 1e4}万魔法币`,
            imgSrc: rule.choseListImagesSrc[index]
          };
        });
        this.choseList.length = this.len + 3 - (this.len % 3);
        // 获取初始选择页面
        const choseVar = parseInt(getQueryVariable("chose")) - 1 || 0;
        this.chose = choseVar;
        this.reward = info.list[choseVar].coin * 0.8;
        // 保存数据
        this.info = info;
        if (parseInt(info.uservip) > 0) {
          this.usevip = [
            "已经开通" + info.list[parseInt(info.uservip) - 1].name
          ];
        }
      },
      err => {
        console.log(err);
      }
    ).getApi(
      // 获取用户信息
      "getUserInfoToBuyVipThemes",
      {
        uid: this.uid,
        token: getQueryVariable("token")
      },
      res => {
        const info = res.info;
        this.imgSrc = info.avatar;
        this.money = info.coin;
        this.name = info.user_nicename;
      },
      err => {
        console.log(err);
      }
    );
    getQueryVariable("chose")
      ? (this.chose = getQueryVariable("chose"))
      : (this.chose = 1);
  }
};
</script>
<style lang="scss" src="./index.scss"></style>