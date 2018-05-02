const preload = function () {
  this.game.load.image('background', 'assets/images/background.png')
  this.game.load.image('interactArea', 'assets/images/interactArea.png')
  this.game.load.image('bullet', 'assets/images/bullet.png')
  this.game.load.image('platform', 'assets/images/platform.png')
  this.game.load.image('platform-grass', 'assets/images/platform-grass.png')
  this.game.load.image('tree', 'assets/images/tree.png')
  this.game.load.image('world', 'assets/images/world.png')
  this.game.load.image('world-grass', 'assets/images/world-grass.png')
  this.game.load.image('mountain', 'assets/images/mountain.png')
  this.game.load.image('snow', 'assets/images/snow.png')
  this.game.load.image('water', 'assets/images/water.png')
  this.game.load.image('axe', 'assets/images/axe.png')
  this.game.load.image('cloud1', 'assets/images/cloud1.png')
  this.game.load.image('cloud2', 'assets/images/cloud2.png')

  this.game.load.audio('sfx:chop', 'assets/sound/chop.wav')
  this.game.load.audio('sfx:death', 'assets/sound/death.wav')
  this.game.load.audio('sfx:got', 'assets/sound/got.wav')
  this.game.load.audio('sfx:wrath', 'assets/sound/wrath.wav')

  this.game.load.spritesheet('waterfall', 'assets/images/waterfall.png', 846, 328)
  this.game.load.spritesheet('god', 'assets/images/god.png', 99, 168)
  this.game.load.spritesheet('lumberjack', 'assets/images/lumberjack.png', 72, 123)
  this.game.load.spritesheet('sinner', 'assets/images/sinner.png', 60, 141)
  this.game.load.spritesheet('cat', 'assets/images/cat.png', 42, 39)
  this.game.load.spritesheet('inventory', 'assets/images/inventory.png', 213, 70)
}

module.exports = preload
