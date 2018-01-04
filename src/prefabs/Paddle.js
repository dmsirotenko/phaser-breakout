import Phaser from 'phaser'

class Paddle extends Phaser.Sprite {
  constructor (game, x, y) {
    super(game, x, y, 'paddle')

    this.game.physics.arcade.enableBody(this)
    this.anchor.setTo(0.5, 0.5)
    this.body.immovable = true
  }

  update () {
    if (this.game.input.x === 0) {
      return
    }

    this.x = this.game.input.x

    let pedalCenter = this.width / 2

    if (this.x < pedalCenter) {
      this.x = pedalCenter
    } else if (this.x > this.game.width - pedalCenter) {
      this.x = this.game.width - pedalCenter
    }
  }
}

export default Paddle
