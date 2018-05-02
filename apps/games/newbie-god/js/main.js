const PlayState = require('./playState')
const EndState = require('./endState')

// load
function start () {
  document.getElementById('startScreen').style.display = 'none'

  const game = new Phaser.Game(960, 600, Phaser.AUTO, 'game')

  game.state.add('play', PlayState)
  game.state.add('end', EndState)

  game.state.start('play', true, false)
}

window.onload = function () {
  document.getElementById('play')
    .addEventListener('click', function (e) {
      e.preventDefault()
      start()
    })
}
