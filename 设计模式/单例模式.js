//单例模式抽象，分离创建对象的函数和判断对象是否已经创建
var getSingle = function (fn) {
  var result;
  return function () {
    return result || (result = fn.apply(this, arguments));
  }
};
function Girl(name){
  this.name=name
  console.log('已对'+name+'起名')
}
g1=getSingle(Girl('lili'))
g2=getSingle(Girl('lucy'))
g2=getSingle(Girl('rose'))
