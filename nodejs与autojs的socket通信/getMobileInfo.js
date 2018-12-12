function getMobileInfo() {
  var mobileInfo = {
    "屏幕宽度": device.width,
    "屏幕高度": device.height,
    "buildId": device.buildId,
    "主板": device.board,
    "制造商": device.brand,
    "型号": device.model,
    "产品名称": device.product,
    "硬件名称": device.hardware,
    "唯一标识码": device.fingerprint,
    "AndroidId": device.getAndroidId(),
    "API": device.sdkInt
  }
  // return mobileInfo
  return "thisIsMobileInfo"+JSON.stringify(mobileInfo)
}
module.exports = getMobileInfo
