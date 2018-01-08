import Phaser from 'phaser'
import globals from './globals/index.js'
import { clone } from 'lodash'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    let text = this.add.text(
      this.game.width / 2, 
      this.game.height / 2,
      `Game Over :(\n\nYou've reached level ${this.game.global.level} with score ${this.game.global.score}`,
      {
        font: '24px Arial, sans-serif',
        fill: '#fff',
        align: 'center'
      }
    )

    text.anchor.set(0.5)

    this.input.onDown.add(this.restartGame, this)
  }

  restartGame () {
    this.resetGlobalVariables()
    this.game.state.start('Game')
  }

  resetGlobalVariables () {
    this.game.global = clone(globals)
  }
}
