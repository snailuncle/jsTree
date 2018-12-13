

function 打开(){
  // 打开飞行模式
shell("settings put global airplane_mode_on 1", true);

}

function 关闭(){
//关闭飞行模式
shell("settings put global airplane_mode_on 0", true);

}










circle={
  打开:打开,
  关闭:关闭
}
module.exports=circle
