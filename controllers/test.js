let  fs = require('fs');
let  join = require('path').join;
let  path = require('path');
function finder(filePath) {
  console.log("finder(filePath)  filePath="+filePath)
  var result=[]
  // let fPath=join(path,val);
  let stats=fs.statSync(filePath);
  if(stats.isDirectory()) {
    console.log(filePath+"是文件夹")
    var children=[]
    let files=fs.readdirSync(filePath);
    files.forEach((val,index) => {
      var inpath=filePath+"/"+val
      children.push(finder(inpath))
    })

    result.push({
      "text":path.basename(filePath),
      "icon":"../static/img/file.png",
      "children":children
    });
  }
  if(stats.isFile()) {
    console.log(filePath+"是文件")
    result.push({
      "text":path.basename(filePath),
      "icon":"../static/img/file.png"
    });
  };
  console.table(result)
  return result
}
startPath="F:/koa2/666666666666666666666666666666666666666666666666666666666666/douban-trailer-mooc/koa开始服务器编写/projectList"
finder(startPath);
