
var fn_index = async (ctx, next) => {
  ctx.cookies.set('userinfo',"unknown",{
    maxAge:1000*60*60*24
  })
  const users = [{ name: 'Dead Horse' }, { name: 'Jack' }, { name: 'Tom' }];
  await ctx.render('index', {   // 渲染content模板
    users
  });
};
// var fn_index = async (ctx, next) => {
//   ctx.response.body = `<h1>Index</h1>
//       <form action="/signin" method="post">
//           <p>Name: <input name="name" value="koa"></p>
//           <p>Password: <input name="password" type="password"></p>
//           <p><input type="submit" value="Submit"></p>
//       </form>`;
// };


// async (ctx) {
//   const users = [{ name: 'Dead Horse' }, { name: 'Jack' }, { name: 'Tom' }];
//   await ctx.render('content', {   // 渲染content模板
//     users
//   });
// }





var fn_signin = async (ctx, next) => {
  var userinfo=ctx.cookies.get('userinfo')
  console.log("userinfo:"+userinfo);

  var
      name = ctx.request.body.name || '',
      password = ctx.request.body.password || '';
  console.log(`signin with name: ${name}, password: ${password}`);
  if (name === 'autojs@qq.com' && password === '123') {

      const user = name
      ctx.cookies.set('userinfo',user,{
        maxAge:1000*60*60*24
      })



      await ctx.render('user', {   // 渲染content模板
        user
      });
  } else {
      ctx.response.body = `<h1>Login failed!</h1>
      <p><a href="/">Try again</a></p>`;
  }
};
var fn_getDirInfo = async (ctx, next) => {
  console.log('成功进入 fn_getDirInfo ...');

  let  fs = require('fs');
  let  join = require('path').join;
  let  path = require('path');
  /**
   *
   * @param startPath  起始目录文件夹路径
   * @returns {Array}
   */
  // function findSync(startPath) {
  //     let result=fs.readdirSync(startPath);
  //     return result;
  // }
  [
    { "text" : "Root node", "children" : [
        { "text" : "Child node 1" },
        { "text" : "Child node 2" }
      ]
    },
    { "text" : "Root node", "children" : [
        { "text" : "Child node 1" },
        { "text" : "Child node 2" }
      ]
    }
  ]
  function findSync(startPath) {
      let result=[];
      function finder(path) {
          let files=fs.readdirSync(path);
          files.forEach((val,index) => {


              let fPath=join(path,val);
              let stats=fs.statSync(fPath);
              if(stats.isDirectory()) {
                let 子文件数组=fs.readdirSync(fPath);
                for(let i=0;i<子文件数组.length;i++){
                  子文件数组[i]={
                    "text":子文件数组[i],
                    "icon":"../static/img/file.png",
                  }
                }

                result.push({
                  "text":val,
                  "icon":"../static/img/folder.png",
                  "children":子文件数组
                });
                子文件数组=fs.readdirSync(fPath);
                for(let i=0;i<子文件数组.length;i++){
                  let inFPath=fPath+"/"+子文件数组[i]
                  let stats=fs.statSync(inFPath);
                  if(stats.isDirectory()) {
                    finder(inFPath)
                  }
                }
              };
              if(stats.isFile()) {

                result.push({
                  "text":val,
                  "icon":"https://www.jstree.com/tree.png"
                });
              };
          });

      }
      finder(startPath);
      return result;
  }
  var dirInfo=null
  var root=""
  // path.join(__dirname, "./test.txt")
  var dir = ctx.request.body.dir || "../projectList"
  console.log('dir='+dir)
  if(dir == "../projectList"){
    //显示根目录的所有文件夹
    dir=path.join(__dirname, dir)
    dirInfo=findSync(dir);
  }else{
    //显示指定目录下的文件
    dir=path.join(__dirname, "../projectList/"+dir)
    dirInfo=findSync(dir);
  }
  console.log("dirInfo=")
  console.log(dirInfo)
  //数组
  if (dirInfo) {
      ctx.response.body = dirInfo;
  } else {
      ctx.response.body = `<h1>获取文件夹${dir}目录信息失败</h1>`;
  }
  // [
  //   { "text" : "Root node", "children" : [
  //       { "text" : "Child node 1" },
  //       { "text" : "Child node 2" }
  //     ]
  //   },
  //   { "text" : "Root node", "children" : [
  //       { "text" : "Child node 1" },
  //       { "text" : "Child node 2" }
  //     ]
  //   }
  // ]
  // ["script06.js","test","test2"]
  // ["F:\\koa2\\666666666666666666666666666666666666666666666666666666666666\\douban-trailer-mooc\\koa开始服务器编写\\projectList\\script06.js","F:\\koa2\\666666666666666666666666666666666666666666666666666666666666\\douban-trailer-mooc\\koa开始服务器编写\\projectList\\test\\index.js","F:\\koa2\\666666666666666666666666666666666666666666666666666666666666\\douban-trailer-mooc\\koa开始服务器编写\\projectList\\test\\script01.js","F:\\koa2\\666666666666666666666666666666666666666666666666666666666666\\douban-trailer-mooc\\koa开始服务器编写\\projectList\\test\\script02.js","F:\\koa2\\666666666666666666666666666666666666666666666666666666666666\\douban-trailer-mooc\\koa开始服务器编写\\projectList\\test2\\script04.js","F:\\koa2\\666666666666666666666666666666666666666666666666666666666666\\douban-trailer-mooc\\koa开始服务器编写\\projectList\\test2\\script05.js"]
};
var fn_hello = async (ctx, next) => {
  var name = ctx.params.name;
  ctx.response.body = `<h1>Hello, ${name}!</h1>`;
};


module.exports = {
  'GET /': fn_index,
  'POST /signin': fn_signin,
  'POST /getDirInfo': fn_getDirInfo,
  'GET /hello/:name': fn_hello
};
