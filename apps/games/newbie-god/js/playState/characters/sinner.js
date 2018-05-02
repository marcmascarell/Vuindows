function Sinner (game, x, y) {
  // call Phaser.Sprite constructor
  Phaser.Sprite.call(this, game, x, y, 'sinner')
  this.anchor.set(0.5, 0.5)

  this.animations.add('stop', [0]);
  this.animations.add('clap', [1, 2], 6, true);
  this.animations.add('cry', [3]);

  this.game.physics.enable(this)
  this.body.collideWorldBounds = true
}

// inherit from Phaser.Sprite
Sinner.prototype = Object.create(Phaser.Sprite.prototype)
Sinner.prototype.constructor = Sinner

Sinner.prototype.getHappy = function() {
  this.animations.play('clap')
  this.isHappy = true
}
module.exports = Sinner
