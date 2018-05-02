function Lumberjack (game, x, y) {
  // call Phaser.Sprite constructor
  Phaser.Sprite.call(this, game, x, y, 'lumberjack')
  this.anchor.set(0.5, 0.5)

  this.animations.add('stop', [0]);
  this.animations.add('go', [1]);
  this.animations.add('fishing', [2]);

  this.game.physics.enable(this)
  this.body.collideWorldBounds = true
}

// inherit from Phaser.Sprite
Lumberjack.prototype = Object.create(Phaser.Sprite.prototype)
Lumberjack.prototype.constructor = Lumberjack

Lumberjack.prototype.goFish = function (direction) {
  this.animations.play('go');

  const tween = this.game.add.tween(this).to({ x: '-160' }, 1500, Phaser.Easing.Elastic.InOut, true)

  tween.onComplete.add(() => {
    this.animations.play('fishing');
    this.isHappy = true
  })

}

module.exports = Lumberjack
