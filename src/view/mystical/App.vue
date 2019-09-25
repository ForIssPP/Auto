<template>
  <div id="app">
    <Loading :show="loading"></Loading>
    <div class="bg"></div>
    <TitleBox></TitleBox>
    <TextBox></TextBox>
    <AlertBox :show="show" :toggleMystical="toggleMystical" :logo="logo" :type="type"></AlertBox>
    <div class="bottom">
      <btnClick :name="type + '神秘人'" @click="show = true"></btnClick>
    </div>
  </div>
</template>
<script>
import AlertBox from "./AlertBox.vue";
import TextBox from "./TextBox.vue";
import TitleBox from "./TitleBox.vue";
import Loading from "../page/loading.vue";
import btnClick from "../page/btnClick.vue";
import query from "../../modules/getQueryVariable";
import getApi from "../../modules/getApi";
import onLoadImages from "../../modules/onLoadImages";

export default {
  data() {
    return {
      loading: true,
      show: false,
      logo: "",
      type: "开启"
    };
  },
  methods: {
    toggleMystical(show) {
      const uid = query("uid");
      const token = query("token");
      if (this.msg) {
        layer.msg(this.msg);
        this.show = false;
        return;
      }
      getApi(
        "User.SetMystical",
        {
          uid,
          token
        },
        res => {
          if (res.code === 1002) {
            this.msg = res.msg;
          }
          layer.msg(res.msg);
          this.show = false;
          this.type = res.msg.slice(0, 2) === "开启" ? "关闭" : "开启";
        },
        err => {
          console.log(err);
        }
      );
    }
  },
  components: {
    AlertBox,
    TextBox,
    btnClick,
    Loading,
    TitleBox
  },
  created() {
    const uid = query("uid");
    const token = query("token");
    if (uid === "630690") {
      layer.open({
        type: 0,
        title: "专属彩蛋",
        content: "你瞧, 我藏了个彩蛋！"
      })
    }
    getApi(
      "User.MysticalIndex",
      {
        uid,
        token
      },
      res => {
        console.log(res);
        if (res.isopen) {
          this.type = "关闭";
        }
      },
      err => {
        console.log(err);
      }
    );
    onLoadImages(
      "http://image.mjlive-app.com/page/mystical/mystical.png"
    ).onload(() => {
      this.logo = "http://image.mjlive-app.com/page/mystical/mystical.png";
      this.loading = false;
    });
  }
};
</script>
<style lang="scss" src="./index.scss"></style>