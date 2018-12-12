var GameManager = (function () {
  var singleton;
  function Construct() {
      //定义一些属性
      this.grid_x = 18;//x网格数量
      this.grid_y = 11;//y网格数量
      this.grideSize = 100;//网格大小
      this.xOffset = 40;// 场景偏移量
      this.yOffset = 40;// 场景偏移量
      this.playing = true;
      this.starMapArray = [];
      //。。。
      log('初始化一次')
  }
  singleton = new Construct();
  return singleton;
})();

/**定义一些方法 */
GameManager.someFunction = function () {
      console.log("Hello World");
}


module.exports = GameManager
