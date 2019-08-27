<template>
  <div>
    <button @click="goLogin">登录</button>
  </div>
</template>
<script>
export default {
  methods: {
    goLogin() {
      FB.login(
        function(response) {
          if (response.status === "connected") {
            FB.api("/me", function(response) {
              console.log("Successful login for: " + response.name);
            });
          } else {
            console.log("该用户没有登录");
          }
        },
        { scope: "public_profile,email" }
      );
    }
  }
};
</script>