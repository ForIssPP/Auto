<template>
  <div class="card">
    <div v-if="cardHeader" class="card-header" v-html="cardHeader"></div>
    <div class="card-body">
      <slot></slot>
    </div>
    <div v-if="cardFooter" class="card-footer" v-html="cardFooter"></div>
  </div>
</template>
<script>
export default {
  props: ["cardHeader", "cardFooter"]
};
</script>