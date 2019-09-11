<template>
  <div id="app">
    <div id="login_container"></div>
    <btnClick :name="'微信登录'" @btnClick="goWxLogin"></btnClick>
    <btnClick :name="'FB登录'" @btnClick="goFBLogin"></btnClick>
  </div>
</template>
<script>
import btnClick from "../page/btnClick.vue";
import getQueryVariable from "../../modules/getQueryVariable";
import '../FB/fb.init';

export default {
  data() {
    return {};
  },
  components: {
    btnClick
  },
  methods: {
    goWxLogin() {
      if (WxLogin) {
        // ae19aacb00eb05bcd996073403fb85b4
        let wx = new WxLogin({
          self_redirect: false,
          id: "login_container",
          appid: "wxc28657982564c9a3",
          scope: "snsapi_login",
          redirect_uri: "http://m.mjlive-app.com"
        });
      }
    },
    goFBLogin() {
      FB.login(
        function(response) {
          if (response.status === "connected") {
            FB.api("/me", function(response) {
              console.log("Successful login for: " + response.name);
              console.log(response);
            });
          } else {
            console.log("该用户没有登录");
          }
        },
        { scope: "public_profile,email" }
      );
    },
    getQueryVariable
  },
  mounted() {
    if (getQueryVariable("code")) {
      const code = getQueryVariable("code");
      $.ajax({
        type: "get",
        url: "http://m.mjlive-app.com:10141",
        data: {
          code
        },
        dataType: "json",
        success: function(response) {
          layer.msg(response.msg);
          console.log(response)
        }
      });
    }
  }
};
</script>
<style lang="scss">
@import "../../scss/mixins/mixin";

%fc {
  @include flexCenter;
}

%fs {
  @include createFlexBox(center, flex-start, row);
}

%fss {
  @include createFlexBox(flex-start, flex-start, row);
}

%fcs {
  @include createFlexBox(center, flex-start);
}

%fcc {
  @include flexColumnCenter;
}

button {
  width: 100%;
  height: 100px;
  @include cfz_fw(#ddd, 30px, 500);
  background-color: #000;
}
</style>