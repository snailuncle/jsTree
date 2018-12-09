function renamePromise(oldfile,newfile)
{
  var fs = require('fs');

  return new Promise(function (resolve, reject) {
    fs.rename(oldfile, newfile, function(err,data){
      if (err) {
        reject(err);
      } else {
        resolve('success move file');
      }
    });
  });
}

function createFolder(filePath) {
  var fs = require('fs');
  console.log("创建目录 " + filePath);
  fs.mkdir(filePath, function (err) {
    if (err) {
      return console.error(err);
    }
    console.log("目录创建成功。" + filePath);
  });
}

function createFile(filePath) {
  var fs = require('fs');
  fs.writeFile(filePath, "", function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("文件创建成功。!" + filePath);
  });
}

function createFolderOrFile(icon, filePath) {
  if (icon == 'folder') {
    createFolder(filePath)
  }
  if (icon == 'file') {
    createFile(filePath)
  }
}
var fn_index = async (ctx, next) => {
  ctx.cookies.set('userinfo', "unknown", {
    maxAge: 1000 * 60 * 60 * 24
  })
  const users = [{
    name: 'Dead Horse'
  }, {
    name: 'Jack'
  }, {
    name: 'Tom'
  }];
  await ctx.render('index', { // 渲染content模板
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
function getPath(nodeData) {
  var nodePath = ""
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
// function getNode(nodeID){
//   var $ = require("jquery");
//   var jstreeID = 'jstree';
//   var node = $('#' + jstreeID).jstree("get_node", nodeID);
//   console.log("getNode(nodeID)  node=")
//   console.table(node)
//   return node
// }
var fn_jstree = async (ctx, next) => {
  // // 'id': data.node.id,
  // // 'text': data.text,
  // // 'parent': data.node.parent,
  // // 'parents': data.node.parents,
  var jstreeInfo = ctx.request.query
  console.log("jstreeInfo:");
  console.log(jstreeInfo);
  var operation = jstreeInfo.operation
  if (operation == 'rename_node') {
    var id = jstreeInfo.id
    var text = jstreeInfo.text
    var icon = jstreeInfo.icon
    var parentFileName = jstreeInfo.parentFileName
    var parentsFileName = jstreeInfo.parentsFileName
    var oldFileName = jstreeInfo.oldFileName
    console.log("text=" + text)
    console.log("oldFileName=" + oldFileName)
    text = text.replace(/\s\s*/, '')
    oldFileName = oldFileName.replace(/\s\s*/, '')
    console.log("text=" + text)
    console.log("oldFileName=" + oldFileName)
    ctx.body = {
      "id": id
    }
    console.log("parentsFileName=" + parentsFileName)
    let join = require('path').join;
    let path = require('path');
    var fs = require('fs');
    // path.join(__dirname, "./test.txt")
    var 旧绝对路径 = path.join(__dirname, '../' + parentsFileName)
    let stats = fs.statSync(旧绝对路径);
    if (stats.isFile()) {
      旧绝对路径 = path.join(旧绝对路径, '../' + oldFileName)
    };
    if (stats.isDirectory()) {
      旧绝对路径 = path.join(__dirname, '../' + parentsFileName) + "/" + oldFileName
    }
    var 新绝对路径 = path.join(__dirname, '../' + parentsFileName)
    stats = fs.statSync(新绝对路径);
    if (stats.isFile()) {
      新绝对路径 = path.join(新绝对路径, '../' + text)
    };
    if (stats.isDirectory()) {
      新绝对路径 = path.join(__dirname, '../' + parentsFileName) + "/" + text
    }
    console.log("旧绝对路径=" + 旧绝对路径);
    console.log("新绝对路径=" + 新绝对路径);
    var fs = require('fs');
    fs.exists(旧绝对路径, function (exists) { 
      if (exists) {    
        console.log("文件存在")
        fs.rename(旧绝对路径, 新绝对路径, function (err) {
          if (err) {
            throw err;
            // alert(err)
          }
          console.log('done!');
        }) 
      }   
      if (!exists) {      
        console.log("文件不存在")
        //创建文件(夹)
        var 选中的文件路径 = 新绝对路径
        console.log("选中的文件路径=" + 选中的文件路径)
        let stats = fs.statSync(选中的文件路径);
        // "folder"
        // "file"
        createFolderOrFile(icon, filePath)
        if (stats.isFile()) {
          //是文件就在文件同层级别新建文件或者文件夹
          let join = require('path').join;
          let filePath = join(选中的文件路径, "../" + 文件名称);
          createFolderOrFile(icon, filePath)
        };   
      } 
    })
  }
  if (operation == 'delete_node') {
    // var id = jstreeInfo.id
    var text = jstreeInfo.text
    // var parentFileName = jstreeInfo.parentFileName
    var parentsFileName = jstreeInfo.parentsFileName
    // var oldFileName = jstreeInfo.oldFileName
    // console.log("parentsFileName=" + parentsFileName)
    // let join = require('path').join;
    // let path = require('path');
    // // path.join(__dirname, "./test.txt")
    // var 旧绝对路径 = path.join(__dirname, '../' + parentsFileName) + "/" + oldFileName
    let path = require('path');
    var 新绝对路径 = path.join(__dirname, '../' + parentsFileName) + "/" + text
    // console.log("旧绝对路径=" + 旧绝对路径);
    console.log("新绝对路径=" + 新绝对路径);

    function delDir(path) {
      var fs = require('fs');
      let stats = fs.statSync(path);
      if (stats.isDirectory()) {
        let files = [];
        if (fs.existsSync(path)) {
          files = fs.readdirSync(path);
          files.forEach((file, index) => {
            let curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) {
              delDir(curPath); //递归删除文件夹
            } else {
              fs.unlinkSync(curPath); //删除文件
            }
          });
          fs.rmdirSync(path);
        }
      }
      if (stats.isFile()) {
        fs.unlinkSync(path);
      };
    }
    delDir(新绝对路径)
    ctx.body = '删除成功' + 新绝对路径
    // var fs = require('fs');
    // fs.rename(旧绝对路径, 新绝对路径, function (err) {
    //   if (err) {
    //     throw err;
    //     // alert(err)
    //   }
    //   console.log('done!');
    // })
  }
  if (operation == 'create_node') {
    console.log("(operation == 'create_node') jstreeInfo.parentsFileName=")
    console.log(jstreeInfo.parentsFileName)
    jstreeInfo.parentsFileName = (jstreeInfo.parentsFileName).replace(/\s\s*/, '')
    var 文件名称 = jstreeInfo.text + Date.now()
    文件名称 = 文件名称.replace(/\s\s*/, '')
    var icon = jstreeInfo.icon
    // "folder"
    // "file"
    let path = require('path');
    var fs = require('fs');
    var 新绝对路径 = path.join(__dirname, '../' + jstreeInfo.parentsFileName)
    var 选中的文件路径 = 新绝对路径
    console.log("选中的文件路径=" + 选中的文件路径)
    let stats = fs.statSync(选中的文件路径);
    // "folder"
    // "file"
    if (stats.isDirectory()) {
      //是文件夹就在文件夹里新建文件或者文件夹
      var filePath = 选中的文件路径 + "/" + 文件名称
      createFolderOrFile(icon, filePath)
    }
    if (stats.isFile()) {
      //是文件就在文件同层级别新建文件或者文件夹
      let join = require('path').join;
      let filePath = join(选中的文件路径, "../" + 文件名称);
      createFolderOrFile(icon, filePath)
    };
    ctx.body = {
      "id": jstreeInfo.text
    }
  }
  if (operation == 'move_node') {
    ctx.response.body="success file"

    var 从哪里来=jstreeInfo.from
    var 到哪里去=jstreeInfo.to
    var id=jstreeInfo.id
    console.log('后端接收的参数 move_node')
    console.log("从哪里来=");
    console.log(从哪里来)
    console.log("到哪里去=");
    console.log(到哪里去)
    // 从哪里来=
    // projectList/33333/6666
    // 到哪里去=
    // projectList/33333
    //移动文件到指定文件(夹)
    let path = require('path');
    var fs = require('fs');
    var 目标文件 = path.join(__dirname, '../' + 到哪里去)
    stats = fs.statSync(目标文件);
    var 要移动的文件=path.join(__dirname, '../' + 从哪里来)
    var 要移动的文件的文件名=path.basename(要移动的文件)
    if (stats.isFile()) {
      //移动文件到目标文件的同级目录
      console.log('目标文件是文件')
      var 要移动到那个文件夹=path.resolve(目标文件, '..');


// 这是通用函数，异步读文件


      renamePromise(要移动的文件,path.join(要移动到那个文件夹,要移动的文件的文件名))
      .then(function (info){
        console.log(info);
        ctx.response.body="success move file"

      }
      ).catch( function (err) {
        console.log(err);
      });




      // fs.rename(要移动的文件,path.join(要移动到那个文件夹,要移动的文件的文件名), function(err){
      //   if(err){
      //    throw err;
      //   }
      //   console.log('移动文件done!');
      //   console.log('oldpath=')
      //   console.log(要移动的文件)

      //   console.log('newpath=')
      //   console.log(path.join(要移动到那个文件夹,要移动的文件的文件名))
      //   ctx.response.body="success file"
      //   // ctx.body = {
      //   //   "info": "move file done",
      //   //   "id":id
      //   // }
      //  })




    };
    if (stats.isDirectory()) {
      console.log('目标文件是文件夹')


      renamePromise(要移动的文件,path.join(目标文件,要移动的文件的文件名))
      .then(function (info){
        console.log(info);
        ctx.response.body="success move folder"

      }
      ).catch( function (err) {
        console.log(err);
      });



      // // 移动文件到文件夹里面
      // fs.rename(要移动的文件,path.join(目标文件,要移动的文件的文件名), function(err){
      //   if(err){
      //    throw err;
      //   }
      //   console.log('移动文件done!');
      //   console.log('oldpath=')
      //   console.log(要移动的文件)

      //   console.log('newpath=')
      //   console.log(path.join(目标文件,要移动的文件的文件名))
      //   ctx.response.body="success dir"
      //   // ctx.body = {
      //   //   "info": "move file done",
      //   //   "id":id
      //   // }
      //   console.log("ctx.body=")
      //   console.log(ctx.body)
      //   console.table(ctx.body)
      //  })
    }


  }
};
var fn_signin = async (ctx, next) => {
  var userinfo = ctx.cookies.get('userinfo')
  console.log("userinfo:" + userinfo);
  var
    name = ctx.request.body.name || '',
    password = ctx.request.body.password || '';
  console.log(`signin with name: ${name}, password: ${password}`);
  if (name === 'autojs@qq.com' && password === '123') {
    const user = name
    ctx.cookies.set('userinfo', user, {
      maxAge: 1000 * 60 * 60 * 24
    })
    await ctx.render('user', { // 渲染content模板
      user
    });
  } else {
    ctx.response.body = `<h1>Login failed!</h1>
      <p><a href="/">Try again</a></p>`;
  }
};
var fn_getDirInfo = async (ctx, next) => {
  console.log('成功进入 fn_getDirInfo ...');
  let fs = require('fs');
  let join = require('path').join;
  let path = require('path');
  /**
   *
   * @param startPath  起始目录文件夹路径
   * @returns {Array}
   */
  // function findSync(startPath) {
  //     let result=fs.readdirSync(startPath);
  //     return result;
  // }
  [{
      "text": "Root node",
      "children": [{
          "text": "Child node 1"
        },
        {
          "text": "Child node 2"
        }
      ]
    },
    {
      "text": "Root node",
      "children": [{
          "text": "Child node 1"
        },
        {
          "text": "Child node 2"
        }
      ]
    }
  ]

  function findSync(startPath) {
    function finder(filePath) {
      console.log("finder(filePath)  filePath=" + filePath)
      // let fPath=join(path,val);
      let stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        console.log(filePath + "是文件夹")
        var children = []
        let files = fs.readdirSync(filePath);
        files.forEach((val, index) => {
          var inpath = filePath + "/" + val
          children.push(finder(inpath))
        })
        return {
          "text": path.basename(filePath),
          "icon": "../static/img/folder.png",
          "children": children
        }
      }
      if (stats.isFile()) {
        console.log(filePath + "是文件")
        return {
          "text": path.basename(filePath),
          "icon": "../static/img/file.png"
        }
      };
    }
    return finder(startPath);
  }
  var dirInfo = null
  var root = ""
  // path.join(__dirname, "./test.txt")
  var dir = ctx.request.body.dir || "../projectList"
  console.log('dir=' + dir)
  if (dir == "../projectList") {
    //显示根目录的所有文件夹
    dir = path.join(__dirname, dir)
    dirInfo = findSync(dir);
  } else {
    //显示指定目录下的文件
    dir = path.join(__dirname, "../projectList/" + dir)
    dirInfo = findSync(dir);
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
