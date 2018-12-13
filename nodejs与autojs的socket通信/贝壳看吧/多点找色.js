requestScreenCapture();
var img = captureScreen();
var 第一个点的颜色 = '#cccccc'
// 数组的每个元素为[x, y, color]
var 剩下的点相对于第一个点的位置和颜色的数组 = [
  [  5,   -3, "#cccccc"],
  [  17,   -16, "#b9b9b9"],
  [  76,   -10, "#cccccc"],
  [  84,   -5, "#787878"]
]










var 找图区域 = [1, 1, 700, 1000]
var 左上角x = 找图区域[0]
var 左上角y = 找图区域[1]
var 右下角x = 找图区域[2]
var 右下角y = 找图区域[3]
var 宽度 = 右下角x - 左上角x
var 高度 = 右下角y - 左上角y
var 找色区域和颜色相似度 = {
  region: [左上角x, 左上角y, 宽度, 高度],
  threshold: 4
}
打印图片信息(img)
var p = images.findMultiColors(img, 第一个点的颜色, 剩下的点相对于第一个点的位置和颜色的数组, 找色区域和颜色相似度);
alert('p='+p.toString())

function 打印图片信息(img) {
  var 宽 = img.getWidth()
  var 高 = img.getHeight()
  console.log('img='+img)
  console.log('图片宽度=' + 宽)
  console.log('图片高度=' + 高)
}
