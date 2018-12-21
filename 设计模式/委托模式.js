function Cat(name) {
  this.name = name
  this.enemy = []
  this.shout = () => {
    console.log('喵,我是%s', this.name)
    this.catShoutEventHandler(this)
  }
  this.addEnemy = (mouse) => {
    this.enemy.push(mouse)
  }
  this.removeEnemy = (mouse) => {
    var mouseNum = null
    for (let i = 0; i < this.enemy.length; i++) {
      log('this.enemy[' + i + ']=' + this.enemy[i])
      log('mouse=' + mouse)
      if (this.enemy[i] == mouse) {
        mouseNum = i
        break
      }
    }
    log('mouseNum=' + mouseNum)
    log('slice before this.enemy=' + this.enemy)
    this.enemy.splice(mouseNum, 1)
    log('slice after this.enemy=' + this.enemy)
  }
  this.catShoutEventHandler = (cat) => {
    this.enemy.map((mouse) => {
      mouse.run(cat)
    })
  }
}

function Mouse(name) {
  this.name = name
  this.run = (cat) => {
    console.log(cat.name + '来了,快跑%s', this.name)
  }
}
cat = new Cat('tony')
cat2 = new Cat("tony's brother")
mouse1 = new Mouse('mouse1')
mouse2 = new Mouse('mouse2')
mouse3 = new Mouse('mouse3')
mouse4 = new Mouse('mouse4')
cat2.addEnemy(mouse1)
cat2.addEnemy(mouse2)
cat2.addEnemy(mouse3)
cat2.addEnemy(mouse4)
cat2.removeEnemy(mouse2)
cat.shout()
