//铺满屏幕
var width = device.width
var height = device.height
//初始化
var x0 = width / 2;
var y0 = height / 2;
var x, y;
//存储要画的点的位置和数量
var px = new Array(6000);
var py = new Array(6000);
//左边的点存3000 右边的点从3001开始存
var i = 0;
var j = 3001;
//将  心  的坐标存入数组中
for (var t = -3; t <= 3; t = t + 0.001) {
  //坐标系的 x,y
  x = 16 * Math.pow(Math.sin(t), 3);
  y = 13 * Math.cos(t) - 5 * Math.cos(t * 2) - 2 * Math.cos(t * 3) - Math.cos(t * 4);
  //增大心
  x = x * 16;
  y = y * 16;
  //算出对于计算机的坐标 计算机左上角是0,0
  x = x0 + x;
  y = y0 - y;
  //存入数组
  if (x < x0) {
    px[i] = x;
    py[i] = y;
    i = i + 1;
  }
  if (x > x0) {
    px[j] = x;
    py[j] = y;
    j = j + 1;
  }
  //x等于0的点就无视了 不影响大局
}
points = px.map((value, index) => [Math.floor(value), Math.floor(py[index])]);
points.splice(3000, 1)
points.unshift(10000)
gesture.apply(null, points)
