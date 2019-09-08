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
            <div v-for="(slide, index) in vipRuleList" :key="index" class="swiper-slide">
              <imgBox :gift="slide[index].gift" :name="slide[index].name"></imgBox>
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
import getApi from "../../modules/getApi";
import { goRecharge } from "../../modules/live.api";
import btnSwiper from "./btnSwiper.vue";
import vipRule from "./vip_rule.json";
import rule from "./rule.vue";
import imgBox from "./imgBox.vue";
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import getQueryVariable from "../../modules/getQueryVariable";
import loading from "../page/loading.vue";

export default {
  data() {
    return {
      loading: true,
      vipRuleList: [],
      vipNameList: [],
      vipBuyTextsList: [],
      vipRuleConentList: [],
      buyTexts: ["100/月 赠送8000魔法币", "续费可获得1w魔法币"]
    };
  },
  components: {
    rule,
    imgBox,
    loading,
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
          uid: getQueryVariable("uid"),
          token: getQueryVariable("token"),
          vipid: vipid
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
    document.body.style.overflow = "hide";
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
          let coin = e.coin / 100 > 9999 ? e.coin / 1e6 + "w" : e.coin / 100;
          return [
            `${coin}/月 赠送8000魔法币`,
            `续费可获得${e.coin / 1e4}w魔法币`,
            e.id
          ];
        });

        // Frist 特权列表
        this.vipRuleConentList = this.vipRuleList[0].reverse();

        console.log(this.vipRuleList);
        this.$nextTick(() => {
          let thar = this;

          let contentSwiper = new Swiper("#contentSwiper", {
            loop: true,
            // 开启滑动参数
            watchSlidesProgress: true,
            slidesPerView: "auto",
            centeredSlides: true,
            loopedSlides: 6,
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
            loop: true,
            slidesPerView: "auto",
            centeredSlides: true,
            slideToClickedSlide: true,
            loopedSlides: 6,
            controller: {
              control: contentSwiper
            },
            on: {
              slideChangeTransitionEnd() {
                thar.buyTexts = thar.vipBuyTextsList[this.realIndex];
                let list = JSON.parse(
                  JSON.stringify(thar.vipRuleList[this.realIndex].reverse())
                );
                if (list.length % 3) {
                  list.length += 3 - (list.length % 3);
                }
                thar.vipRuleConentList = list;
              }
            }
          });

          contentSwiper.controller.control = titleSwiper;

          document.body.style.overflow = "auto";
          this.loading = false;
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