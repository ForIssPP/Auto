<template>
  <div class="container download">
    <div class="row justify-content-center">
      <div
        class="col-lg-3 col-md-4 col-sm-6 col-8"
        v-for="({fileName, fileTypeSrc, description, downloadId}, index) in fileInfoList"
        :key="index"
      >
        <FileCard
          :filerName="fileName"
          :src="fileTypeSrc"
          :description="description"
          :download="downloadHandle(downloadId)"
        ></FileCard>
      </div>
    </div>
    <iframe v-show="false" :src="openIframeSrc"></iframe>
  </div>
</template>
<script>
import FileCard from "./FileCard.vue";
import getApi from "./getApi";

export default {
  data() {
    return {
      fileInfoList: [],
      openIframeSrc: ""
    };
  },
  methods: {
    downloadHandle(fileId) {
      return () => {
        this.openIframeSrc = "/" + fileId;
      };
    },
    getFileInfoList() {
      getApi("fileList").done(res => {
        if (res.code === 200) {
          this.fileInfoList = res.data;
        }
      });
    }
  },
  components: {
    FileCard
  },
  created() {
    this.getFileInfoList();
  }
};
</script>