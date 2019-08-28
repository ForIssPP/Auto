export default {
  goBag(msg) {
    try {
      window.mobile ? mobile.goBag(msg || null) : window.webkit.messageHandlers.webRefreshEnable.postMessage(msg || null);
    } catch (e) {
      console.log(e)
    }
  },
  closeWebview(msg) {
    try {
      window.mobile ? mobile.close() : window.webkit.messageHandlers.closeWebview.postMessage(msg || null);
    } catch (e) {
      console.log(e)
    }
  },
  goRecharge(msg) {
    try {
      window.mobile ? mobile.recharge() : window.webkit.messageHandlers.goRecharge.postMessage(msg || null);
    } catch (e) {
      console.log(e)
    }
  }
}