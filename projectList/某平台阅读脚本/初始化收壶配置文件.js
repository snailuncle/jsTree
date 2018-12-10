function 初始化配置文件(){
  log(arguments.callee.name+"开始")
  //默认1是从百度贴吧获取邀请码
  var 手机编号=3
  var 无极ip框1=[108,740,972,875]
  var 无极ip框2=[108,746,972,881]
  var 无极ip框3=[108,740,972,875]
  var 无极ip框4=[108,746,972,881]

  var 无极ip框5=[108,746,972,881]
  var 无极ip框6=[72,497,648,587]


  var 无极ip框7=[108,734,972,869]
  var 无极ip框8=[108,746,972,881]
  var 无极ip框10=[108,734,972,869]
  var 无极ip框11=[108,734,972,869]
  var 无极ip框12=[72,493,648,583]


  var 无极ip框13=[72,499,648,589]

  //邀请码路径
  var 父目录=files.cwd()
  // files.join(parent, child)
  var 第几个分身文件名="第几个分身文件名.txt"
  var 第几个分身路径=files.join(父目录, 第几个分身文件名)
  log("第几个分身路径=",第几个分身路径)
  if(files.exists(第几个分身路径)){
  }else{
    files.createWithDirs(第几个分身路径)
    files.write(第几个分身路径, "0");
  }
  var 获取当前日期 = require("./获取当前日期")
  var 当前日期 = 获取当前日期.获取当前日期()

  var 保存今日完成阅读任务的app名字的文件名=当前日期+"保存今日完成阅读任务的app名字.txt"
  var 保存今日完成阅读任务的app名字的路径=files.join(父目录, 保存今日完成阅读任务的app名字的文件名)
  files.createWithDirs(保存今日完成阅读任务的app名字的路径)

  配置文件名="收壶配置文件.js"
  var 配置文件路径=files.join(父目录, 配置文件名)
  log("配置文件路径=",配置文件路径)
  files.createWithDirs(配置文件路径)








  var 配置文件内容 = files.read(配置文件路径)
  var coors = {};

  coors.第几个分身路径 = 第几个分身路径;
  coors.保存今日完成阅读任务的app名字的路径 = 保存今日完成阅读任务的app名字的路径;

  coors.手机编号 = 手机编号;

  coors.无极ip框1=无极ip框1
  coors.无极ip框2=无极ip框2
  coors.无极ip框3=无极ip框3
  coors.无极ip框4=无极ip框4

  coors.无极ip框5=无极ip框5
  coors.无极ip框6=无极ip框6
  coors.无极ip框7=无极ip框7
  coors.无极ip框8=无极ip框8
  coors.无极ip框10=无极ip框10
  coors.无极ip框11=无极ip框11
  coors.无极ip框12=无极ip框12

  coors.无极ip框13=无极ip框13




  if (!配置文件内容){
    files.write(配置文件路径, JSON.stringify(coors));
  }else{
    //检查一下配置文件是否完备
    获取配置文件内容=require("./获取收壶配置文件内容")
    配置文件内容=获取配置文件内容.获取配置文件内容()

    // var 获取当前日期=require("./获取当前日期")
    // var 当前日期=获取当前日期.获取当前日期()

    //遍历json对象的每个key/value对,p为key
    for(var k in coors){
      if(配置文件内容[k]){
        if(配置文件内容[k]==coors[k]){
        }else{
          配置文件内容[k]=coors[k]
          files.write(配置文件路径, JSON.stringify(配置文件内容));
        }
      }else{
        配置文件内容[k]=coors[k]
        files.write(配置文件路径, JSON.stringify(配置文件内容));
      }
    }
  }
  log(arguments.callee.name+"结束")
}

// 初始化配置文件()

var circle = {};
circle.初始化配置文件 = 初始化配置文件
module.exports = circle;



