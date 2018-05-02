module.exports = function () {
  this.game.add.image(0, 0, 'background')

  this.sfx = {
    chop: this.game.add.audio('sfx:chop'),
    death: this.game.add.audio('sfx:death'),
    got: this.game.add.audio('sfx:got'),
    wrath: this.game.add.audio('sfx:wrath')
  };

  this.camera.flash('0x000000')

  this.world.setBounds(0, 0, 960, 1800)
  this._loadLevel()
}
