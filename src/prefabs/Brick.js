import Phaser from 'phaser'

class Brick extends Phaser.Sprite {
  constructor (game, x, y) {
    super(game, x, y, 'brick')

    this.height = 27
    this.width = 54

    this.game.physics.arcade.enableBody(this)
    this.body.immovable = true
  }
}

export default Brick
