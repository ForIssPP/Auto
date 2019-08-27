export default {
  goBag(msg) {
    try {
      window.mobile ? mobile.goBag(msg) : window.webkit.messageHandlers.webRefreshEnable.postMessage(msg || null)
    } catch (e) {
      console.log(e)
    }
  },
  closeWebview(msg) {
    try {
      window.mobile ? mobile.close(msg) : window.webkit.messageHandlers.closeWebview.postMessage(msg || null)
    } catch (e) {
      console.log(e)
    }
  },
  goRecharge(msg) {
    try {
      window.mobile ? mobile.recharge(msg) : window.webkit.messageHandlers.goRecharge.postMessage(msg || null)
    } catch (e) {
      console.log(e)
    }
  }
}