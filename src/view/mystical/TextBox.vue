<template>
  <div class="rule-text">
    <div class="title">{{ ruleText.title }}</div>
    <div class="text-box">
      <p v-for="(text, index) in ruleText.texts" :key="index">{{ text }}</p>
    </div>
  </div>
</template>
<script>
import ruleText from "./rule.json";
export default {
  data() {
    return {
      ruleText
    };
  }
};
</script>