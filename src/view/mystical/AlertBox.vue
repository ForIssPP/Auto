<template>
  <div class="chose-box" :class="{'show': show}">
    <div class="chose-title">
      <img :src="logo" alt="title-logo" />
    </div>
    <p>{{ type }}神秘人模式</p>
    <p>进入属于自己的时间</p>
    <btnClick @click="toggleMystical"></btnClick>
  </div>
</template>
<script>
import btnClick from "../page/btnClick.vue";
export default {
  props: ["show", "toggleMystical", "logo", "type"],
  components: {
    btnClick
  }
};
</script>