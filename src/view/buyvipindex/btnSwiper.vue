<template>
  <div class="buy-box">
    <div class="text-box">
      <p v-for="text in texts" :key="text.id">{{ text }}</p>
    </div>
    <btnClick :className="'buy-btn'" :name="'开通骑士'" @clickBtn="$emit('clickBtn')"></btnClick>
  </div>
</template>
<script>
import btnClick from "../everyday_order/btnClick.vue";

export default {
  props: {
    texts: {
      type: Array,
    },
  },
  components: {
    btnClick
  }
};
</script>