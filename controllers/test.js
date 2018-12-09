let  fs = require('fs');
let  join = require('path').join;
let  path = require('path');
function finder() {
  oldpath='f:/koa2/666666666666666666666666666666666666666666666666666666666666/douban-trailer-mooc/koa开始服务器编写/projectList/33333/6666'
  newpath='f:/koa2/666666666666666666666666666666666666666666666666666666666666/douban-trailer-mooc/koa开始服务器编写/projectList/6666'
  fs.rename(oldpath,newpath, function(err){
    if(err){
     throw err;
    }
    console.log('移动文件done!');
   })
}

// finder();
