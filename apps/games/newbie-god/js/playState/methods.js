const God = require('./characters/god')
const Sinner = require('./characters/sinner')
const Lumberjack = require('./characters/lumberjack')

// Playstate functions
const PlayState = {}

PlayState._loadLevel = function (data) {
  this.bgDecoration = this.game.add.group()

  this.inventory = this.bgDecoration.create(727, 10, 'inventory')
  this.inventory.animations.add('gotAxe', [1])
  this.inventory.fixedToCamera = true

  this.cloud1 = this.bgDecoration.create(110, 140, 'cloud1')
  this.cloud2 = this.bgDecoration.create(630, 430, 'cloud2')

  this.game.add.tween(this.cloud1).to({ y: '+30' }, 2500, Phaser.Easing.Linear.None, true, 0, -1, true)
  this.game.add.tween(this.cloud2).to({ y: '-20' }, 2500, Phaser.Easing.Linear.None, true, 0, -1, true)

  this.mountain = this.bgDecoration.create(100, 1278, 'mountain')
  this.game.physics.enable(this.mountain)
  this.mountain.body.allowGravity = false
  this.mountain.body.immovable = true
  this.waterfall = this.bgDecoration.create(100, 1278, 'waterfall')
  this.waterfall.alpha = 0
  this.waterfall.animations.add('flowing', [0, 0, 0, 1, 1, 1], 8, true);

  this.snow = this.bgDecoration.create(340, 1273, 'snow')
  this.game.physics.enable(this.snow)
  this.snow.body.allowGravity = false
  this.snow.body.immovable = true

  this.world = this.bgDecoration.create(10, 1560, 'world')
  this.game.physics.enable(this.world)
  this.world.body.allowGravity = false
  this.world.body.immovable = true
  this.bgDecoration.create(10, 1548, 'world-grass')

  this.water = this.bgDecoration.create(355, 1566, 'water')
  this.game.physics.enable(this.water)
  this.water.body.allowGravity = false
  this.water.body.immovable = true
  this.water.alpha = 0

  this.platform = this.bgDecoration.create(50, 1010, 'platform')
  this.game.physics.enable(this.platform)
  this.platform.body.allowGravity = false
  this.platform.body.immovable = true
  this.grass = this.bgDecoration.create(50, 995, 'platform-grass')
  this.game.physics.enable(this.grass)
  this.game.add.tween(this.platform).to({ y: '+20' }, 2500, Phaser.Easing.Linear.None, true, 0, -1, true)


  this.tree = this.bgDecoration.create(100, 700, 'tree')
  this.game.physics.enable(this.tree)

  this.cat = this.bgDecoration.create(150, 600, 'cat')
  this.cat.animations.add('stop', [1, 1, 0], 2, true);
  this.cat.animations.add('standing', [2]);
  this.cat.animations.play('stop')
  this.game.physics.enable(this.cat)

  this._spawnCharacters()
  this._spawnWrath()
  this._spawnCharacterAreas()
  this._spawnText()
}

PlayState._handleCollisions = function () {
  this.game.physics.arcade.collide(this.platform, this.sinner)
  this.game.physics.arcade.collide(this.platform, this.tree)
  this.game.physics.arcade.collide(this.platform, this.cat)
  this.game.physics.arcade.collide(this.platform, this.grass)
  this.game.physics.arcade.collide(this.tree, this.cat)
  this.game.physics.arcade.collide(this.lumberjack, this.world)

  // surrounding characters areas
  this.game.physics.arcade.overlap(this.god, this.sinnerArea, this.onGodVsSinner, null, this)
  this.game.physics.arcade.overlap(this.god, this.lumberjackArea, this.onGodVsLumberjack, null, this)

  // bullets
  this.game.physics.arcade.collide(this.wrath.bullets, this.lumberjack, this.onBulletVsCharacter, null, this)
  this.game.physics.arcade.collide(this.wrath.bullets, this.sinner, this.onBulletVsCharacter, null, this)
  this.game.physics.arcade.collide(this.wrath.bullets, this.cat, this.onBulletVsCat, null, this)

  // melt snow
  this.game.physics.arcade.collide(this.wrath.bullets, this.snow, this.onBulletVsSnow, null, this)

  this.game.physics.arcade.collide(this.axe, this.world)

  this.game.physics.arcade.collide(this.god, this.axe, this.onGodVsAxe, null, this)

  // cut down tree
  this.game.physics.arcade.overlap(this.god, this.tree, this.onGodVsTree, null, this)
}

PlayState._handleInput = function () {
  let x = 0
  let y = 0
  // if(!this.god.floatTween.isRunning) {
  //   this.god.doTween()
  // }


  if (this.keys.left.isDown) {
    x = -1
    this.god.facing = 'left'
  }
  else if (this.keys.right.isDown) {
    x = 1
    this.god.facing = 'right'
  }

  if (this.keys.up.isDown) {
    // this.god.floatTween.stop()
    y = -1
  }
  else if (this.keys.down.isDown) {
    // this.god.floatTween.stop()
    y = 1
  }
  this.god.float(x, y)

  if (this.keys.wrath.isDown) {
    let direction = 0
    if (this.god.facing === 'right') {
      direction = 960
    }

    const fire = this.wrath.fire(null, direction, this.god.position.y)
    if(fire){
      this.sfx.wrath.play();
    }
  }
}

PlayState._spawnCharacters = function () {
  // spawn lumberjack
  this.lumberjack = new Lumberjack(this.game, 850, 1500)
  this.game.add.existing(this.lumberjack)

  // spawn sinner
  this.sinner = new Sinner(this.game, 350, 900)
  this.game.add.existing(this.sinner)

  // spawn god
  this.god = new God(this.game, 450, 150)
  this.game.add.existing(this.god)
  this.camera.follow(this.god)
  this.god.body.allowGravity = false
}

PlayState._spawnCharacterAreas = function () {
  this.sinnerArea = this.bgDecoration.create(350, 950, 'interactArea')
  this.sinnerArea.anchor.set(0.5, 0.5)
  this.game.physics.enable(this.sinnerArea)
  this.sinnerArea.body.immovable = true
  this.sinnerArea.body.allowGravity = false

  this.lumberjackArea = this.bgDecoration.create(850, 1500, 'interactArea')
  this.lumberjackArea.anchor.set(0.5, 0.5)
  this.game.physics.enable(this.lumberjackArea)
  this.lumberjackArea.body.immovable = true
  this.lumberjackArea.body.allowGravity = false
}

PlayState._spawnText = function(data) {
  const textStyle = {
    font: '30px Amatica SC',
    fill: '#58a4b0',
    fontWeight: 'bold',
    boundsAlignH: 'center',
    boundsAlignV: 'middle'
  }

  const texts = {
    start: 'Go down to earth and check how your people are doing',
    help: 'Hold SPACEBAR to interact',
    sinner: 'Oh god, my cat is in that tree\nand I can\'t get her down!',
    lumberjack: 'Oh god, I don\'t wanna be \na lumberjack anymore,\nthere are no trees!\n I want to be a fisherman,\nbut there\'s no water either!'
  }
  this.sinnerText = this.game.add.text(0, 0, texts.sinner, textStyle);
  this.lumberjackText = this.game.add.text(0, 0, texts.lumberjack, textStyle);
  this.helpText = this.game.add.text(0, 0, texts.help, textStyle);
  this.startText = this.game.add.text(0, 0, texts.start, textStyle);

  this.sinnerText.setTextBounds(150, 700, 600, 200)
  this.sinnerText.lineSpacing = 1
  this.sinnerText.visible = false

  this.lumberjackText.setTextBounds(500, 1150, 600, 300)
  this.lumberjackText.lineSpacing = 1
  this.lumberjackText.visible = false

  this.helpText.setTextBounds(0, 550, 960, 50)
  this.helpText.lineSpacing = 1
  this.helpText.visible = false
  this.helpText.fixedToCamera = true

  this.startText.setTextBounds(0, 550, 960, 50)
  this.startText.lineSpacing = 1
  this.startText.fixedToCamera = true
}

PlayState._spawnWrath = function () {
  this.wrath = this.game.add.weapon(1, 'bullet')
  this.wrath.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS

  this.wrath.trackSprite(this.god, 0, 0, true)
  this.wrath.bulletSpeed = 600
  this.wrath.bulletGravity.y = -1000
}

PlayState._spawnAxe = function () {
  this.axe = this.bgDecoration.create(850, 1500, 'axe')
  this.game.physics.enable(this.axe)
}

PlayState.onBulletVsCharacter = function (character, bullet) {
  character.isDead = true
  character.kill()
  bullet.kill()
  this.sfx.death.play()
  if (this.lumberjack.isDead) {
    this._spawnAxe()
  }
}

PlayState.onBulletVsSnow = function (character, bullet) {
  this.onBulletVsCharacter(character, bullet)
  this.game.add.tween(this.waterfall).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true)
  this.game.add.tween(this.water).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true)
  // this.water.alpha = 1
  this.waterfall.animations.play('flowing')
  if (!this.lumberjack.isDead) {
    this.lumberjack.goFish()
    this._spawnAxe()
  }
}

PlayState.onBulletVsCat = function (character, bullet) {
  this.onBulletVsCharacter(character, bullet)
  this.sinner.animations.play('cry')
  this.sinner.isSad = true
  this.sinnerArea.kill()
}

PlayState.onGodVsAxe = function (god, axe) {
  god.hasAxe = true
  this.inventory.animations.play('gotAxe')
  this.sfx.got.play();
  axe.kill()
}

PlayState.onGodVsTree = function (god, tree) {
  if (god.hasAxe) {
    this.helpText.visible = true

    this.keys.action.onDown.add(function () {
      const _this = this
      this.sfx.chop.play(null, 0, 1, true)
      setTimeout(() => {
        _this.tree.kill()
        _this.sinner.getHappy()
        this.sfx.chop.stop()
        this.cat.animations.play('standing')
      }, 1000)
    }, this)
  }
}

PlayState.onGodVsSinner = function () {
  if (!this.sinner.isDead && !this.sinner.isHappy) {
    this.helpText.visible = true

    if(this.keys.action.isDown) {
      this.sinnerText.visible = true
      this.helpText.visible = false
    } else {
      this.sinnerText.visible = false
      this.helpText.visible = true
    }
  }
}

PlayState.onGodVsLumberjack = function () {
  if (!this.lumberjack.isDead && !this.lumberjack.isHappy) {
    this.helpText.visible = true

    if(this.keys.action.isDown) {
      this.lumberjackText.visible = true
      this.helpText.visible = false
      this.inventory.visible = false
    } else {
      this.lumberjackText.visible = false
      this.helpText.visible = true
      this.inventory.visible = true
    }
  }
}

module.exports = PlayState
