// Endstate
module.exports = {
  preload: function() {
    this.game.load.spritesheet('button', 'assets/images/button.png', 244, 59);
  },
  init: function (score) {
    this.game.score = score
  },

  create: function () {
    const textStyle = {
      font: '40px Amatica SC',
      fill: '#58a4b0',
      fontWeight: 'bold',
      boundsAlignH: 'center',
      boundsAlignV: 'middle'
    }

    const gameOver = this.game.add.text(0, 0, ' Game Over ', Object.assign({}, textStyle, {
      font: '80px Amatica SC'
    }))
    gameOver.setTextBounds(0, 150, 960, 100)

    const scoreTextContent = {
      line1: '',
      line2: ''
    }

    if (this.game.score === 'evil') {
      scoreTextContent.line1 = 'You are a cruel god.'
      scoreTextContent.line2 = 'There\'s no one left to worship you.'
    } else if (this.game.score === 'awesome') {
      scoreTextContent.line1 = 'You are a benign god.'
      scoreTextContent.line2 = 'Your tiny world will flourish.'
    } else {
      scoreTextContent.line1 = 'You are a strange god.'
      scoreTextContent.line2 = 'Your believers don\'t know what to expect of you'
    }

    const scoreTextLine1 = this.game.add.text(0, 0, scoreTextContent.line1, textStyle)
    scoreTextLine1.setTextBounds(0, 250, 960, 100)

    const scoreTextLine2 = this.game.add.text(0, 0, scoreTextContent.line2, textStyle)
    scoreTextLine2.setTextBounds(0, 300, 960, 100)

    const button = this.game.add.button(480, 450, 'button', this.startOver, this, 1, 0);
    button.anchor.set(0.5, 0.5)

  },

  startOver: function() {
    this.game.state.start('play', true, false)
  }
}
