export default (function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");
window.fbAsyncInit = function () {
  FB.init({
    appId: "304655050450749",
    cookie: true, // 启用cookie
    xfbml: true, // 解析此页面上的社交插件
    version: "v2.8" // 使用图形api 2.8版本
  });
};