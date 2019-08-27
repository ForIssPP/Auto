<template>
  <div class="text-box">
    <h3>{{ info.title }}</h3>
    <p class="frist-txt">
      魔法币加
      <img
        :src="`http://alidown.zcdanbao.com/cdn/banner/images/fristCharge/mfb_${info.mfb}.png`"
        alt="mfb"
      />
    </p>
    <div class="content-txt">
      <p v-for="content in info.liveContents" :key="content.id">{{ content }}</p>
    </div>
    <btnClick :name="''" @clickBtn="goRecharge"></btnClick>
  </div>
</template>
<script>
import btnClick from "../everyday_order/btnClick.vue";
import liveapi from "../../modules/live.api";

export default {
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  components: {
    btnClick
  },
  methods: {
    goRecharge: liveapi.goRecharge
  }
};
</script>