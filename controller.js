const fs = require('fs');

function addMapping(router, mapping) {
  console.log('addMapping(router, mapping)  mapping=');
  console.log(mapping);
  // addMapping(router, mapping)  mapping=
  // { 'GET /': [AsyncFunction: fn_index],
  //   'POST /signin': [AsyncFunction: fn_signin],
  //   'GET /hello/:name': [AsyncFunction: fn_hello] }
  // register URL mapping: GET /
  // register URL mapping: POST /signin
  // register URL mapping: GET /hello/:name
  for (var url in mapping) {
      if (url.startsWith('GET ')) {
          var path = url.substring(4);
          router.get(path, mapping[url]);    //(path,fn)
          console.log(`register URL mapping: GET ${path}`);
      } else if (url.startsWith('POST ')) {
          var path = url.substring(5);
          router.post(path, mapping[url]);
          console.log(`register URL mapping: POST ${path}`);
      } else {
          console.log(`invalid URL: ${url}`);
      }
  }
}

function addControllers(router) {
  var files = fs.readdirSync(__dirname + '/controllers');
  var js_files = files.filter((f) => {
      return f.endsWith('.js');
  });

  for (var f of js_files) {
      console.log("var f of js_files  f->"+f);

      console.log(`process controller: ${f}...`);
      let mapping = require(__dirname + '/controllers/' + f);
      addMapping(router, mapping);
  }
}

module.exports = function (dir) {
    let
        controllers_dir = dir || 'controllers', // 如果不传参数，扫描目录默认为'controllers'
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
};
