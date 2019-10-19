<template>
  <Card :cardFooter="tips">
    <form action="/updata">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">文件名(可自定义):</span>
        </div>
        <input class="form-control" v-model="fileName" type="text" placeholder="文件名" />
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">描述:</span>
        </div>
        <input class="form-control" v-model="description" type="text" placeholder="文件描述" />
      </div>
      <div v-show="fileSize" class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">文件大小:</span>
        </div>
        <input class="form-control" v-model="fileSize" type="text" disabled />
      </div>
      <div v-show="fileType" class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">文件类型:</span>
        </div>
        <input class="form-control" v-model="fileType" type="text" disabled />
      </div>
      <div class="custom-file offset-sm-6 col-sm-6 mb-3">
        <label class="custom-file-label" for="customFile">{{ fileType ? "重新选择" : "选择文件" }}</label>
        <input @change="choseFile($event)" class="custom-file-input" type="file" />
      </div>
      <div v-show="fileType" class="updata offset-sm-6 col-sm-6 btn-group">
        <button class="btn btn-primary" @click.prevent="updataFile">提交</button>
        <button class="btn btn-secondary" @click.prevent="cancel">取消</button>
      </div>
    </form>
    <loading :show="loadingShow"></loading>
  </Card>
</template>
<script>
import Card from "./Card.vue";
import fileSize from "../../modules/fileSize";
import printLog from "../../modules/printLog";
import readFormDate from "../../modules/readFormDate";
import loading from "../page/loading.vue";

export default {
  data() {
    return {
      tips: '<span class=" text-warning">请勿多次上传同一文件</span>',
      fileName: "",
      description: "",
      fileType: "",
      fileSize: 0,
      updata: "",
      loadingShow: false
    };
  },
  methods: {
    choseFile(event) {
      const postEl = event.target;
      const postFile = postEl.files[0];
      printLog("file", postFile);

      if (postFile) {
        const { name, size, lastModified } = postFile;
        // 获取文件名
        this.fileName = name;
        // 获取文件类型
        this.fileType = name.slice(name.lastIndexOf(".") + 1).toUpperCase();
        // 获取文件大小
        this.fileSize = fileSize(size);
        // 获取文件信息
        this.updata = readFormDate([postFile]);
        this.updata.append("name", name);
        this.updata.append("description", this.description);
      }
    },
    cancel() {
      this.fileName = "";
      this.fileSize = 0;
      this.description = "";
      this.fileType = "";
    },
    updataFile() {
      this.loadingShow = true;
      $.ajax({
        type: "post",
        url: "/updata",
        data: this.updata,
        async: false,
        contentType: false,
        processData: false,
        dataType: "JSON"
      }).done(res => {
        if (res.code === 200) {
          this.loadingShow = false;
          layer.msg(res.msg);
        }
      });
    }
  },
  components: {
    Card,
    loading
  }
};
</script>