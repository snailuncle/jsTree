var fs = require('fs'); // 引入fs模块

var 手机唯一标识码='aaaaaaaaaa;aabbbbbbbc;ccccccccc;aaaddccccccc'
手机唯一标识码=手机唯一标识码.split(';')

var 手机唯一标识码json={
  "手机唯一标识码":手机唯一标识码
}
手机唯一标识码json=JSON.stringify(手机唯一标识码json)
console.log(手机唯一标识码json)

var filename='./mobileCode.json'
var data=手机唯一标识码json
fs.writeFileSync(filename,data)
