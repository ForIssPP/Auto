/**
 * 打开背包方法
 * 
 * @param {any} msg 交互信息
 */
export function goBag(msg) {
  try {
    window.mobile ? mobile.goBag(msg || null) : window.webkit.messageHandlers.webRefreshEnable.postMessage(msg || null);
  } catch (e) {
    console.log(e)
  }
}
/**
 * 关闭视图方法
 * 
 * @param {any} msg 交互信息
 */
export function closeWebview(msg) {
  try {
    window.mobile ? mobile.close() : window.webkit.messageHandlers.closeWebview.postMessage(msg || null);
  } catch (e) {
    console.log(e)
  }
}
/**
 * 切换至充值页面
 * 
 * @param {any} msg 交互信息
 */
export function goRecharge(msg) {
  try {
    window.mobile ? mobile.recharge() : window.webkit.messageHandlers.goRecharge.postMessage(msg || null);
  } catch (e) {
    console.log(e)
  }
}

