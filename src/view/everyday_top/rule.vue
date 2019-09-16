<template>
  <div class="rule">
    <h1 class="title" v-html="title"></h1>
    <p class="rule-text" v-for="ruleText in ruleTexts" :key="ruleText.id" v-html="ruleText"></p>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    ruleTexts: {
      type: Array,
      default: []
    }
  }
};
</script>