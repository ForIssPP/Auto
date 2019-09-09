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
    <div class="box">
      <div class="order">
        <div class="title-box">
          <h1 :class="{active: !view}" @click="toggle(0)">每日幸运榜单</h1>
          <h1 :class="{active: view}" @click="toggle(1)">昨日幸运榜单</h1>
        </div>
        <ul v-if="noLists.length > 0">
          <li v-for="(nolist, index) in noLists" :key="nolist.id">
            <i class="no">{{ index + 1 }}</i>
            <img class="portrait" :src="nolist.avatar" @error="imageGetError($event)" />
            <p class="user-name">{{ nolist.user_nicename }}</p>
            <p>
              <span></span>
              {{ nolist.totalcoin }}
            </p>
          </li>
        </ul>
        <ul v-else>
          <li style="margin-top: 1rem">暂时无人上榜，敬请期待~！</li>
        </ul>
      </div>
    </div>
    <div class="box month">
      <div class="order">
        <ul v-if="monthList.length > 0">
          <li v-for="(list, index) in monthList" :key="index">
            <img :src="list.avatar" alt="user-avatar" @error="imageGetError($event)" />
            <p class="user-name">{{ list.user_nicename }}</p>
            <p>
              <span></span>
              {{ list.totalcoin }}
            </p>
          </li>
        </ul>
        <ul v-else>
          <li style="margin-top: 1rem">暂时无人上榜，敬请期待~！</li>
        </ul>
      </div>
    </div>
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
import timer from '../page/timer.vue';

export default {
  data() {
    return {
      noLists: [],
      monthList: [],
      oldList: [],
      view: 0,
      show: true,
      title: ruleJSON.title,
      ruleTexts: ruleJSON.text
    };
  },
  methods: {
    getApi,
    imageGetError,
    toggle(index) {
      if (this.view !== index) {
        this.view = index;
        const arr = this.noLists;
        this.noLists = this.oldList;
        this.oldList = arr;
      }
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
        this.show = false;
      },
      err => {
        layer.msg(err.msg || "服务器请求错误，请稍后再试");
      }
    )
      .getApi(
        "Home.ProfitNewList",
        {
          uid
        },
        res => {
          this.oldList = ellipsisRes(res);
        },
        err => {
          console.log(err);
        }
      )
      .getApi(
        "Home.ProfitNewList",
        {
          uid,
          type: "month"
        },
        res => {
          this.monthList = ellipsisRes(res);
        },
        err => {
          console.log(err);
        }
      );
  },
  components: {
    loading,
    rule,
    timer
  }
};
</script>
<style lang="scss" src="./everydayTop.scss"></style>