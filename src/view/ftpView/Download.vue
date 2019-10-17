<template>
  <div class="container">
    <Card :cardHeader="'文件名'">
      <div>描述</div>
      <button class="btn btn-primary">下载</button>
    </Card>
  </div>
</template>
<script>
import Card from "./Card.vue";

export default {
  components: {
    Card
  }
};
</script>