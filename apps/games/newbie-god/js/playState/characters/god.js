function God (game, x, y) {
  // call Phaser.Sprite constructor
  Phaser.Sprite.call(this, game, x, y, 'god')
  this.anchor.set(0.5, 0.5)

  this.animations.add('left', [0]);
  this.animations.add('right', [1]);

  this.facing = 'left'

  this.game.physics.enable(this)
  this.body.collideWorldBounds = true
  // this.doTween()
}

// inherit from Phaser.Sprite
God.prototype = Object.create(Phaser.Sprite.prototype)
God.prototype.constructor = God

God.prototype.float = function (x, y) {
  this.x += x * 5
  this.y += y * 5
}

God.prototype.doTween = function () {
  this.floatTween = this.game.add.tween(this).to({
    y: this.position.y - 50
  }, 1500, Phaser.Easing.Linear.None, true, 0, 0, true).loop(true)
}

God.prototype._getAnimationName = function () {

  if (this.facing === 'right') {
    return 'right'
  } else {
    return 'left'
  }

  return name;
};

God.prototype.update = function () {
  const animationName = this._getAnimationName();

  if (this.animations.name !== animationName) {
    this.animations.play(animationName);
  }
};

module.exports = God
