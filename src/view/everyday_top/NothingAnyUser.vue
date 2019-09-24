<template>
  <div>{{ other || text }}</div>
</template>
<script>
export default {
  props: ["other"],
  data() {
    return {
      text: "暂时无人上榜，敬请期待~！"
    };
  }
};
</script>