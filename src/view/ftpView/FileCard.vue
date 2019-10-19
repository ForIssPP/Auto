<template>
  <ImageCard :src="src">
    <slot></slot>
    <h6 class="card-title" :title="filerName">{{ filerName }}</h6>
    <div class="card-text">{{ description }}</div>
    <button class="btn btn-primary" @click="() => download()">下载</button>
  </ImageCard>
</template>
<script>
import ImageCard from "./ImageCard.vue";
import printLog from "../../modules/printLog";

export default {
  props: {
    src: {
      type: String
    },
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
      default: () => printLog("Download-Click => ", "Download Handler....")
    }
  },
  components: {
    ImageCard
  }
};
</script>