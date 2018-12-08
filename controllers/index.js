
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

function getPath(nodeData){
  var nodePath=""
  // if(nodeData.node.parent=="#"){
  //   console.log("这个是根目录下的文件");

  //   nodePath=nodePath.old
  //   console.log('nodePath=')
  //   console.log(nodePath)
  // }else{
  //   console.log("这个不是根目录下的文件,他的父文件夹们=");
  //   console.tabletable(nodePath.node.parents)

  // }
  return nodePath
}



var fn_jstree = async (ctx, next) => {
  var jstreeInfo=ctx.request.query
  console.log("jstreeInfo:");
  console.log(jstreeInfo);
  // // { operation: 'rename_node', id: 'j1_2', text: '111111111' }
  // ctx.body={"id":jstreeInfo.id}
  // // var nodeData=jstreeInfo.nodeData
  // console.log("nodeData=")
  // console.table(nodeData)

  // //重命名这个文件
  // //首先获取该节点的路径
  // var nodePath=getPath(nodeData)
  //   console.log('nodePath=')
  //   console.log(nodePath)



};

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

      function finder(filePath) {
        console.log("finder(filePath)  filePath="+filePath)
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

          return {
            "text":path.basename(filePath),
            "icon":"../static/img/folder.png",
            "children":children
          }
        }
        if(stats.isFile()) {
          console.log(filePath+"是文件")
          return {
            "text":path.basename(filePath),
            "icon":"../static/img/file.png"
          }
        };
      }

      return finder(startPath);
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
  'GET /signin': fn_jstree,
  'POST /getDirInfo': fn_getDirInfo,
  'GET /hello/:name': fn_hello
};
// http://localhost:3000/signin?operation=rename_node&id=j1_1&text=11111 405 (Method Not Allowed)
