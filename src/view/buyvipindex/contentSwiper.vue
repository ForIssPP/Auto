<template>
  <div class="swiper-content">
    <div class="title-box">
      <div id="titleSwiper" class="swiper-container">
        <div class="swiper-wrapper">
          <div v-for="(name, index) in nameList" :key="index" class="swiper-slide">
            <p>{{ name }}</p>
          </div>
        </div>
      </div>
      <div id="imgSwiper" class="swiper-container">
        <div class="swiper-wrapper">
          <div v-for="(slideProps, index) in imgList" :key="index" class="swiper-slide">
            <imgBox :gift="slideProps.gift" :name="slideProps.name"></imgBox>
          </div>
        </div>
      </div>
    </div>

    <div id="contentSwiper" class="swiper-container">
      <div class="swiper-wrapper">
        <div v-for="(slide, index) in contentList" :key="index" class="swiper-slide">
          <div class="title">
            <img src="http://alidown.zcdanbao.com/cdn/other/vip/title_img.png" />
            <span>贵族专属权益</span>
            <img src="http://alidown.zcdanbao.com/cdn/other/vip/title_img.png" />
          </div>
          <div class="content">
            <div class="rule">
              <rule
                v-for="(slideProps, index) in slide"
                :key="index"
                :imgSrc="slideProps.imgSrc"
                :text="slideProps.text"
                :title="slideProps.title"
              ></rule>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import rule from "./rule.vue";
import imgBox from "./imgBox.vue";

// http://alidown.zcdanbao.com/cdn/other/vip/title_img.png

export default {
  props: {
    contentList: {
      type: Array,
      default() {
        return [];
      }
    },
    nameList: {
      type: Array,
      default() {
        return [];
      }
    },
    imgList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  mounted() {
    let contentSwiper = new Swiper("#contentSwiper", {
      loop: true
    });

    let imgSwiper = new Swiper("#imgSwiper", {
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

            const scale = 1 - Math.abs(pro) / 7;
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
    });
  },
  components: {
    rule,
    imgBox
  }
};
</script>