<template>
  <div id="app">
    <loading :show="loading"></loading>
    <div class="top"></div>
    <div class="content">
      <div class="swiper-content">
        <div class="title-box">
          <div id="titleSwiper" class="swiper-container">
            <div class="swiper-wrapper">
              <div v-for="(name, index) in vipNameList" :key="index" class="swiper-slide">
                <p>{{ name }}</p>
              </div>
            </div>
          </div>
        </div>
        <div id="contentSwiper" class="swiper-container">
          <div class="swiper-wrapper">
            <div v-for="(slide, index) in vipGift" :key="index" class="swiper-slide">
              <imgBox :gift="slide.gift" :name="slide.name" :id="'vipRuleList' + (index + 1)"></imgBox>
            </div>
          </div>
        </div>
        <div class="content">
          <div class="title">
            <img src="http://alidown.zcdanbao.com/cdn/other/vip/title_img.png" />
            <span>贵族专属权益</span>
            <img src="http://alidown.zcdanbao.com/cdn/other/vip/title_img.png" />
          </div>
          <div class="rule">
            <rule
              v-for="(slideProps, index) in vipRuleConentList"
              :key="index"
              :imgSrc="slideProps && slideProps.imgSrc"
              :text="slideProps && slideProps.text"
              :title="slideProps && slideProps.title"
            ></rule>
          </div>
        </div>
      </div>
    </div>
    <div class="buy">
      <btnSwiper :texts="buyTexts.slice(0, 2)" @clickBtn="buyvip(buyTexts[2])"></btnSwiper>
    </div>
  </div>
</template>
<script>
import btnSwiper from "./btnSwiper.vue";
import vipRule from "./vip_rule.json";
import rule from "./rule.vue";
import imgBox from "./imgBox.vue";
import Swiper from "swiper";
import vipGift from "./vip_gift.json";
import getQueryVariable from "../../modules/getQueryVariable";
import imageGetError from "../../modules/imageGetError";
import loading from "../page/loading.vue";
import getApi from "./getApiFromBuyVipIndex";
import SVGA from "svgaplayerweb";
import OnLoadImages from "../../modules/onLoadImages";
// 贵族中心
export default {
  data() {
    return {
      vipGift,
      loading: true,
      vipRuleList: [],
      vipNameList: [],
      vipBuyTextsList: [],
      vipRuleConentList: [],
      buyTexts: ["1万魔法币/月 赠送0.8万魔法币", "续费可获得1万魔法币"]
    };
  },
  components: {
    rule,
    imgBox,
    loading,
    btnSwiper
  },
  methods: {
    getApi,
    buyvip(id) {
      if (window) {
        window.location.href = `/index.php?g=appapi&m=Mall&a=buyvipcharge&uid=${getQueryVariable(
          "uid"
        )}&token=${getQueryVariable("token")}&chose=${id}`;
      }
    }
  },
  created() {
    document.body.style.overflow = "hide";
    let imgs = [];
    vipRule.forEach(e => {
      imgs.push(e.imgSrc);
    });
    this.getApi(
      "vipindex",
      {
        uid: "25557"
      },
      res => {
        // vip名字
        this.vipNameList = res.info.list.map(e => {
          return e.name;
        });

        // vip规则列表
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

        // vip购买展示内容
        this.vipBuyTextsList = res.info.list.map(e => {
          let coin =
            e.coin / 1e4 >= 100 ? e.coin / 1e6 + "百万" : e.coin / 1e4 + "万";
          let coin_zs =
            (e.coin * 0.8) / 1e4 >= 100
              ? (e.coin * 0.8) / 1e6 + "百万"
              : (e.coin * 0.8) / 1e4 + "万";
          return [
            `${coin}魔法币/月 赠送${coin_zs}魔法币`,
            `续费可获得${e.coin / 1e4}万魔法币`,
            e.id
          ];
        });

        // Frist 特权列表
        this.vipRuleConentList = this.vipRuleList[0].reverse();

        this.$nextTick(() => {
          new OnLoadImages(...imgs).onload(() => {
            this.loading = false;
            document.body.style.overflow = "auto";
          });

          let thar = this;

          let contentSwiper = new Swiper("#contentSwiper", {
            // 开启滑动参数
            watchSlidesProgress: true,
            slidesPerView: "auto",
            slideToClickedSlide: true,
            centeredSlides: true,
            on: {
              progress(progress) {
                const len = this.slides.length;

                for (let index = 0; index < len; index++) {
                  const slide = this.slides.eq(index);
                  const pro = this.slides[index].progress;
                  let modify = 1;

                  if (Math.abs(pro) > 1) {
                    modify = (Math.abs(pro) - 1) * 0.3 + 1;
                  }

                  const scale = 1 - Math.abs(pro) / 5;
                  slide.transform(`scale(${scale})`);
                }
              },
              setTransition(transition) {
                for (var i = 0; i < this.slides.length; i++) {
                  var slide = this.slides.eq(i);
                  slide.transition(transition);
                }
              }
            }
          });

          let titleSwiper = new Swiper("#titleSwiper", {
            slidesPerView: "auto",
            centeredSlides: true,
            slideToClickedSlide: true,
            controller: {
              control: contentSwiper
            },
            on: {
              slideChangeTransitionEnd() {
                thar.buyTexts = thar.vipBuyTextsList[this.realIndex];
                let list = JSON.parse(
                  JSON.stringify(thar.vipRuleList[this.realIndex])
                ).reverse();
                if (list.length % 3) {
                  list.length += 3 - (list.length % 3);
                }
                thar.vipRuleConentList = list;
              }
            }
          });
          // 双重控制
          contentSwiper.controller.control = titleSwiper;
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