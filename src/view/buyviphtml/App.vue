<template>
  <div id="app"></div>
</template>
<script>
import getApi from "../../modules/getApi";

export default {
  data() {
    return {};
  },
  methods: {
    getApi(type, data, resolve, reject) {
      $.ajax({
        url: `./index.php?g=appapi&m=Mall&a=${type}`,
        data,
        type: "GET",
        success(res) {
          res && res.data && res.data.info && resolve
            ? resolve(res.data.info)
            : reject(res);
        },
        error(e) {
          console.log(e);
        }
      });
      return this;
    },
    buyvip(type) {
      this.getApi(
        "buyvip",
        {
          uid: "25557",
          token: "1"
        },
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    }
  },
  created() {
    this.getApi(
      "vipindex",
      {
        uid: "25557"
      },
      res => {
        console.log(res);
      },
      err => {
        console.log(res);
      }
    );
  }
};
</script>