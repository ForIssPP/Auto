<template>
  <div id="app">
    <div id="login_container">
      <img v-if="avatar" :src="avatar" @error="imageGetError($event)" />
      <p>{{ name }}</p>
    </div>
    <div id="mobileLogin" v-if="show">
      <div class="from-gruop">
        <label for="country-code">区号</label>
        <select name="区号" id="countryCode" v-model.lazy="countryCode">
          <option value="086">086</option>
          <option value="886">886</option>
          <option value="852">852</option>
        </select>
      </div>
      <div class="from-gruop">
        <label for="phone-number">电话号码</label>
        <input v-model="phoneNumber" type="text" />
      </div>
      <div class="from-gruop">
        <label for="phone-number">验证码</label>
        <input v-model="code" type="text" />
      </div>
      <div class="from-gruop">
        <btnClick :name="'发送验证码'" @click="sendMobileCode"></btnClick>
        <btnClick :className="'mobile-login-btn'" :name="'登录'" @click="goMobileLogin"></btnClick>
      </div>
    </div>
    <btnClick :name="'微信登录'" @click="goWxLogin"></btnClick>
    <btnClick :name="'FB登录'" @click="goFBLogin"></btnClick>
    <btnClick :name="'手机登录'" @click="openMobile"></btnClick>
  </div>
</template>
<script>
import btnClick from "../page/btnClick.vue";
import getQueryVariable from "../../modules/getQueryVariable";
import imageGetError from "../../modules/imageGetError";
import "../FB/fb.init";

export default {
  data() {
    return {
      show: false,
      avatar: "",
      name: "",
      phoneNumber: "",
      countryCode: "086",
      code: ""
    };
  },
  components: {
    btnClick
  },
  methods: {
    imageGetError,
    getQueryVariable,
    goWxLogin() {
      try {
        let wx = new WxLogin({
          self_redirect: false,
          id: "login_container",
          appid: "wxc28657982564c9a3",
          scope: "snsapi_login",
          redirect_uri:
            "https%3a%2f%2fm.mjlive-app.com%2findex.php%3fg%3dAppapi%26m%3dLogin%26a%3dtestlogin"
          // redirect_uri: "http%3a%2f%2fm.mjlive-app.com%2f"
        });
      } catch (err) {
        console.log(err);
      }
    },
    goFBLogin() {
      try {
        FB.login(
          function(response) {
            if (response.status === "connected") {
              FB.api("/me", function(response) {
                $.ajax({
                  url:
                    "/api/public/appapi/?service=Login.UserLoginByThird&source=loginIndex",
                  data: {
                    openid: response.id,
                    type: "facebook",
                    nicename: response.name
                  },
                  success: res => {
                    let { avatar, user_nicename } = res.data.info[0];
                    this.avatar = avatar;
                    this.name = user_nicename;
                    alert(this.avatar);
                    alert(this.name);
                  },
                  error(e) {
                    alert(e);
                  }
                });
              });
            } else {
              console.log("该用户没有登录");
            }
          },
          { scope: "public_profile,email" }
        );
      } catch (err) {
        console.log(err);
      }
    },
    openMobile() {
      this.show = true;
    },
    goMobileLogin() {
      if (this.phoneNumber.length < 8) {
        layer.msg("请输入正确的手机号码!");
        return;
      }
      if (this.code.length !== 6) {
        layer.msg("请输入正确的验证码!");
        return;
      }
      $.get({
        url: "/api/public/?service=Login.UserLoginByMobile",
        data: {
          country_code: this.countryCode,
          mobile: this.phoneNumber,
          code: this.code,
          source: "pc"
        },
        success: res => {
          if (!res.data.code) {
            layer.msg("登录成功");
            this.avatar = res.data.info[0].avatar;
            this.name = res.data.info[0].user_nicename;
            console.log(res.data.info);
          } else {
            layer.msg(res.data.msg || "服务器错误");
          }
        }
      });
    },
    sendMobileCode() {
      if (this.phoneNumber.length < 8) {
        layer.msg("请输入正确的手机号码!");
        return;
      }
      $.get({
        url: "/api/public/?service=Login.GetLoginCode",
        data: {
          country_code: this.countryCode,
          mobile: this.phoneNumber,
          sign: "12346"
        },
        success(res) {
          if (!res.data.code) {
            layer.msg("发送成功");
          } else {
            layer.msg(res.data.msg || "服务器错误");
          }
        }
      });
    }
  },
  created() {
    $.getScript(
      "https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"
    );
  },
  mounted() {
    if (getQueryVariable("code")) {
      const code = getQueryVariable("code");
      $.ajax({
        type: "GET",
        url: "https://m.mjlive-app.com:10141",
        data: {
          code
        },
        dataType: "json",
        success: res => {
          if (res.errorCode) {
            layer.msg(res.msg);
          }
          this.avatar = res.info.avatar;
          this.name = res.info.user_nicename;
        }
      });
    }
  }
};
</script>
<style lang="scss">
@import "../../scss/mixins/mixin";
@import "../../scss/mixins/deletstyle";
@import "../../scss/mixins/responsive";

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
  height: 1rem;
  @include cfz_fw(#ddd, 30px, 500);
  background-color: #000;
}

#login_container {
  margin: 0 auto;
  @extend %fcc;

  img {
    @include roundBox(2.5rem);
  }

  p {
    @include cfz_fw(rgb(0, 158, 250), 0.3rem, 500);
  }
}
.mobile-login-btn {
  background-color: red;
}

#mobileLogin {
  @extend %fcc;
  .from-gruop {
    width: 100%;
    margin: 0.5rem 0;
    @extend %fc;

    select,
    input {
      display: block;
      width: 3rem;
      height: 34px;
      text-indent: 10px;
      font-size: 14px;
      line-height: 1.42857143;
      color: #555;
      background-color: #fff;
      background-image: none;
      border: 1px solid #ccc;
      border-radius: 4px;
      -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
      transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;

      &:focus {
        border-color: #66afe9;
        outline: 0;
        -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
          0 0 8px rgba(102, 175, 233, 0.6);
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
          0 0 8px rgba(102, 175, 233, 0.6);
      }
    }
  }
}

label {
  display: inline-block;
  width: 0.6rem;
  margin-bottom: 5px;
  font-weight: 700;
}

@include rem(750);
</style>