<template>
  <div class="order-list">
    <div class="title">
      <h3>
        每日充值{{ money }}元礼包
        <span>{{ ok ? '已达到' : '未达到' }}</span>
      </h3>
    </div>
    <div class="images-box">
      <imgInfo v-for="(gift, index) in info" :key="'images' + index" :info="gift"></imgInfo>
    </div>
  </div>
</template>
<script>
import imgInfo from "./imageInfo.vue";

export default {
  props: {
    ok: {
      type: Boolean,
      default: false
    },
    info: {
      type: Array,
      required: true
    },
    money: {
      type: Number,
      default: "100"
    }
  },
  components: {
    imgInfo
  }
};
</script>