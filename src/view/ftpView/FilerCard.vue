<template>
  <Card :cardHeader="filerName">
    <slot></slot>
    <div>{{ description }}</div>
    <button class="btn btn-primary" @click="download">下载</button>
  </Card>
</template>
<script>
import Card from "./Card.vue";

export default {
  props: {
    filerName: {
      type: String,
      default: "文件名"
    },
    description: {
      type: String,
      default: "描述"
    },
    download: {
      type: Function,
      default: () => console.log("Download Begin....")
    }
  }
};
</script>